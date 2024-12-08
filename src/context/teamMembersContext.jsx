import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const TeamMembersContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useTeamMembers = () => {
  const context = useContext(TeamMembersContext);
  if (!context) {
    throw new Error("useTeamMembers must be used within a TeamMembersProvider");
  }
  return context;
};

export const TeamMembersProvider = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial data from localStorage
  useEffect(() => {
    try {
      const storedMembers = localStorage.getItem("teamMembers");
      if (storedMembers) {
        setTeamMembers(JSON.parse(storedMembers));
      }
    } catch (err) {
      setError("Failed to load team members from storage", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save to localStorage whenever teamMembers changes
  useEffect(() => {
    try {
      localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
    } catch (err) {
      setError("Failed to save team members to storage", err);
    }
  }, [teamMembers]);

  // Add a new team member
  const addTeamMember = (newMember) => {
    try {
      setLoading(true);
      // Validate required fields
      if (!newMember.name || !newMember.role) {
        throw new Error("Name and role are required fields");
      }
      // Generate unique ID if not provided
      const memberWithId = {
        ...newMember,
        id: newMember.id || Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setTeamMembers((prev) => [...prev, memberWithId]);
      setError(null);
      return memberWithId;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Remove a team member
  const removeTeamMember = (memberId) => {
    try {
      setLoading(true);
      if (!memberId) {
        throw new Error("Member ID is required");
      }
      setTeamMembers((prev) => {
        const filtered = prev.filter((member) => member.id !== memberId);
        if (filtered.length === prev.length) {
          throw new Error("Member not found");
        }
        return filtered;
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a team member
  const updateTeamMember = (memberId, updatedData) => {
    try {
      setLoading(true);
      if (!memberId) {
        throw new Error("Member ID is required");
      }
      setTeamMembers((prev) => {
        const updated = prev.map((member) =>
          member.id === memberId
            ? {
                ...member,
                ...updatedData,
                updatedAt: new Date().toISOString(),
              }
            : member
        );
        if (JSON.stringify(updated) === JSON.stringify(prev)) {
          throw new Error("Member not found");
        }
        return updated;
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get a specific team member
  const getTeamMember = (memberId) => {
    try {
      if (!memberId) {
        throw new Error("Member ID is required");
      }
      const member = teamMembers.find((member) => member.id === memberId);
      if (!member) {
        throw new Error("Member not found");
      }
      return member;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Clear all errors
  const clearError = () => setError(null);

  const value = {
    teamMembers,
    loading,
    error,
    addTeamMember,
    removeTeamMember,
    updateTeamMember,
    getTeamMember,
    clearError,
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
