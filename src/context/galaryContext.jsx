import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const GalleryContext = createContext();

const getToken = () => {
  const tokenData = JSON.parse(localStorage.getItem("authToken"));
  if (!tokenData) return null;

  const { token, expiration } = tokenData;
  const now = new Date();

  if (new Date(expiration) > now) {
    return token;
  } else {
    localStorage.removeItem("authToken");
    return null;
  }
};

const fetchCollections = async () => {
  const response = await fetch(
    "https://sport-production-f4dc.up.railway.app/assiutmotorsport/api/gallery"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const createCollection = async (newCollection) => {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to create a collection");
  }
  const response = await fetch(
    "https://sport-production-f4dc.up.railway.app/assiutmotorsport/api/gallery",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newCollection),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
};

const uploadCollectionImages = async (id, formData) => {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to to create a collection");
  }

  const response = await fetch(
    "https://sport-production-f4dc.up.railway.app/assiutmotorsport/api/gallery/" +
      id,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
};

const deleteSingleImage = async ({ id, url }) => {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to delete an image");
  }

  const response = await fetch(
    "https://sport-production-f4dc.up.railway.app/assiutmotorsport/api/gallery/deleteSingleImage/" +
      id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url }),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
};

const deleteCollection = async (id) => {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to delete a collection");
  }
  const response = await fetch(
    "https://sport-production-f4dc.up.railway.app/assiutmotorsport/api/gallery/deleteGallery/" +
      id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
};

export const GalleryProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: fetchCollections,
  });

  const mutationCreate = useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries("collections");
    },
  });

  const mutationUpload = useMutation({
    mutationFn: uploadCollectionImages,
    onSuccess: () => {
      queryClient.invalidateQueries("collections");
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteSingleImage,
    onSuccess: () => {
      queryClient.invalidateQueries("collections");
    },
  });

  const mutationDeleteCollection = useMutation({
    mutationFn: deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries("collections");
    },
  });

  const value = {
    collections: data,
    error,
    isLoading,
    createCollection: mutationCreate.mutate,
    createStatus: mutationCreate,
    deleteSingleImage: mutationDelete.mutate,
    deleteSingleStatus: mutationDelete,
    uploadCollectionImages: mutationUpload.mutate,
    uploadStatus: mutationUpload,
    deleteCollection: mutationDeleteCollection.mutate,
    deleteCollectionStatus: mutationDeleteCollection,
  };

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
};

GalleryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
