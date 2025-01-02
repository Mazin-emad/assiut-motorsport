import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "./localstorageAPI";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const GALLERY_UPDATE_ENDPOINT = `${API_BASE_URL}${
  import.meta.env.VITE_GALLERY_UPDATE
}`;
const GALLERY_UPDATE_COVER_ENDPOINT = `${API_BASE_URL}${
  import.meta.env.VITE_GALLERY_UPDATE_COVER
}`;

const UpdateGalleryContext = createContext();

const updateCollectionText = async ({ id, updatedCollection }) => {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to update a collection");
  }
  const response = await fetch(`${GALLERY_UPDATE_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedCollection),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const updateCollectionCoverImage = async ({ id, formData }) => {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to update a collection");
  }
  const response = await fetch(`${GALLERY_UPDATE_COVER_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const UpdateGalleryProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const mutationUpdate = useMutation({
    mutationFn: updateCollectionText,
    onSuccess: () => {
      queryClient.invalidateQueries("collections");
    },
  });

  const mutationUpdateCover = useMutation({
    mutationFn: updateCollectionCoverImage,
    onSuccess: () => {
      queryClient.invalidateQueries("collections");
    },
  });

  const value = {
    updateCollection: mutationUpdate.mutate,
    updateCollectionStatus: mutationUpdate,
    updateCollectionCover: mutationUpdateCover.mutate,
    updateCollectionCoverStatus: mutationUpdateCover,
  };

  return (
    <UpdateGalleryContext.Provider value={value}>
      {children}
    </UpdateGalleryContext.Provider>
  );
};

UpdateGalleryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUpdateGallery = () => {
  const context = useContext(UpdateGalleryContext);
  if (!context) {
    throw new Error(
      "useUpdateGallery must be used within an UpdateGalleryProvider"
    );
  }
  return context;
};
