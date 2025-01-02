import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getToken } from "./localstorageAPI";

const TeamMembersContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useTeamMembers = () => {
  const context = useContext(TeamMembersContext);
  if (!context) {
    throw new Error("useTeamMembers must be used within a TeamMembersProvider");
  }
  return context;
};

const fetchTeamMembers = async () => {
  const response = await fetch(import.meta.env.VITE_TEAM_BASE);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const createTeamMember = async (formData) => {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to create a team member");
  }

  const response = await fetch(import.meta.env.VITE_TEAM_CREATE, {
    method: "POST",
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

const updateTeamMemberText = async ({ id, name, title, description }) => {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to update a team member");
  }

  const response = await fetch(
    `${import.meta.env.VITE_TEAM_UPDATE_TEXT}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        title,
        description,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
};

const updateTeamMemberImage = async ({ id, formData }) => {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to update a team member's image");
  }

  const response = await fetch(
    `${import.meta.env.VITE_TEAM_UPDATE_IMAGE}/${id}`,
    {
      method: "PUT",
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

const deleteTeamMember = async (id) => {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to delete a team member");
  }

  const response = await fetch(`${import.meta.env.VITE_TEAM_DELETE}/${id}`, {
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
  // return response.json();
};

export const TeamMembersProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: fetchTeamMembers,
  });

  const mutationCreate = useMutation({
    mutationFn: createTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries("teamMembers");
    },
  });

  const mutationUpdateText = useMutation({
    mutationFn: updateTeamMemberText,
    onSuccess: () => {
      queryClient.invalidateQueries("teamMembers");
    },
  });

  const mutationUpdateImage = useMutation({
    mutationFn: updateTeamMemberImage,
    onSuccess: () => {
      queryClient.invalidateQueries("teamMembers");
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries("teamMembers");
    },
  });

  const value = {
    data,
    error,
    isLoading,
    createTeamMember: mutationCreate.mutate,
    createTeamMemberStatus: mutationCreate,
    updateTeamMemberText: mutationUpdateText.mutate,
    updateTeamMemberTextStatus: mutationUpdateText,
    updateTeamMemberImage: mutationUpdateImage.mutate,
    updateTeamMemberImageStatus: mutationUpdateImage,
    deleteTeamMember: mutationDelete.mutate,
    deleteTeamMemberStatus: mutationDelete,
  };

  return (
    <TeamMembersContext.Provider value={value}>
      {children}
    </TeamMembersContext.Provider>
  );
};

TeamMembersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
