import { useTeamMembers } from "../../context/teamMembersContext";
import { useState, useEffect } from "react";
import NewMemberAdder from "./components/NewMemberAdder";
import MembersList from "./components/MembersList";
import CollectionList from "./components/CollectionList";

const Dashboard = () => {
  const { teamMembers, loading, error } = useTeamMembers();

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-2xl text-gray-600 dark:text-white">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-xl text-red-600 dark:text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary dark:text-secondary mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-4">
              Team Members
            </h2>

            <MembersList />
          </section>
          <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-4">
              Gallery Collections
            </h2>
            <CollectionList />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
