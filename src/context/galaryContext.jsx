import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getToken } from "./localstorageAPI";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const GALLERY_BASE_ENDPOINT = `${API_BASE_URL}${
  import.meta.env.VITE_GALLERY_BASE
}`;
const GALLERY_CREATE_ENDPOINT = `${API_BASE_URL}${
  import.meta.env.VITE_GALLERY_CREATE
}`;
const GALLERY_UPLOAD_IMAGES_ENDPOINT = `${API_BASE_URL}${
  import.meta.env.VITE_GALLERY_UPLOAD_IMAGES
}`;
const GALLERY_DELETE_IMAGE_ENDPOINT = `${API_BASE_URL}${
  import.meta.env.VITE_GALLERY_DELETE_IMAGE
}`;
const GALLERY_DELETE_ENDPOINT = `${API_BASE_URL}${
  import.meta.env.VITE_GALLERY_DELETE
}`;

const GalleryContext = createContext();

const fetchCollections = async () => {
  const response = await fetch(GALLERY_BASE_ENDPOINT);
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

  const response = await fetch(GALLERY_CREATE_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: newCollection,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
};

const uploadCollectionImages = async ({ id, formData }) => {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to to create a collection");
  }

  const response = await fetch(`${GALLERY_UPLOAD_IMAGES_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
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

  const response = await fetch(`${GALLERY_DELETE_IMAGE_ENDPOINT}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ gallery: url }),
  });
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
  const response = await fetch(`${GALLERY_DELETE_ENDPOINT}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
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
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });

  const mutationUpload = useMutation({
    mutationFn: uploadCollectionImages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteSingleImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });

  const mutationDeleteCollection = useMutation({
    mutationFn: deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });

  const value = {
    data,
    error,
    isLoading,
    createCollection: mutationCreate.mutateAsync,
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
