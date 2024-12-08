import { FaEdit, FaTrash } from "react-icons/fa";
import logo from "../../../assets/images/logo.jpg";
import NewMemberAdder from "./NewMemberAdder";
import { useState } from "react";

const teamMembers = [
  {
    id: 1,
    name: "Ziad",
    title: "Backend developer",
    bio: " Iam the best team member",
    image: logo,
  },
  {
    id: 2,
    name: "Mazin",
    title: "web developer",
    bio: " Iam the 2'nd best team member",
    image: logo,
  },
  {
    id: 3,
    name: "Ziad",
    title: "Backend developer",
    bio: " Iam the best team member",
    image: logo,
  },
  {
    id: 4,
    name: "Mazin",
    title: "web developer",
    bio: " Iam the 2'nd best team member",
    image: logo,
  },
  {
    id: 5,
    name: "Ziad",
    title: "Backend developer",
    bio: " Iam the best team member",
    image: logo,
  },
  {
    id: 6,
    name: "Mazin",
    title: "web developer",
    bio: " Iam the 2'nd best team member",
    image: logo,
  },
];
const MembersList = () => {
  const [members, setMembers] = useState(teamMembers);
  const [isNew, setIsNew] = useState(false);
  const [editMember, setEditMember] = useState(null);

  const handleEditClick = (member) => {
    setEditMember(member);
    setIsNew(false);
  };

  const handleAddNew = () => {
    setEditMember({});
    setIsNew(true);
  };

  const handleDeleteClick = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  return (
    <div className="mt-6 bg-text dark:bg-gray-800 rounded-lg p-6">
      <div className="sm:flex text-center mb-4">
        <input
          type="search"
          placeholder="Search for member"
          className="flex-grow outline-none bg-gray-700 px-4 py-2 border rounded-lg mr-4 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <button
          type="button"
          onClick={handleAddNew}
          className="mt-4 sm:mt-0  px-4 py-2 bg-secondary  text-white rounded-lg hover:bg-secondary/80 transition-colors"
        >
          Add Member
        </button>
      </div>
      {!members || members.length === 0 ? (
        <div className="mt-6 text-center py-8 bg-gray-700 rounded-lg">
          <h2 className="text-xl text-gray-300 font-medium">
            No Team Members yet
          </h2>
          <p className="text-gray-400 mt-2">
            Click &ldquo;Add Member&rdquo; to add your first team member
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto overflow-y-auto max-h-[340px]">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {members?.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={member.image}
                          alt={member.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {member.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {member.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-secondary hover:text-secondary/80 mr-3"
                      onClick={() => handleEditClick(member)}
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      className="text-primary hover:text-primary/80"
                      onClick={() => handleDeleteClick(member.id)}
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {editMember && (
        <NewMemberAdder
          onClose={() => setEditMember(null)}
          member={editMember}
          isNew={isNew}
        />
      )}
    </div>
  );
};

export default MembersList;
