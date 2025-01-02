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
  const response = await fetch(
    "https://sport-production-f4dc.up.railway.app/assiutmotorsport/api/teammember"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const createTeamMember = async (formData) => {
  const token = getToken();
  if (!token) {
    throw new Error("Token is required");
  }
  const response = await fetch(
    "https://sport-production-f4dc.up.railway.app/assiutmotorsport/api/teammember/createTeamMember",
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

const updateTeamMemberText = async ({ id, name, title, description }) => {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to update a collection");
  }
  const response = await fetch(
    "https://sport-production-f4dc.up.railway.app/assiutmotorsport/api/teammember/updateTextData/" +
      id,
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
    throw new Error("Token is required");
  }
  const response = await fetch(
    "https://sport-production-f4dc.up.railway.app/assiutmotorsport/api/teammember/updateTeamMemberProfileImage/" +
      id,
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
    throw new Error("Token is required");
  }
  const response = await fetch(
    "https://sport-production-f4dc.up.railway.app/assiutmotorsport/api/teammember/deleteTeamMember/" +
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
