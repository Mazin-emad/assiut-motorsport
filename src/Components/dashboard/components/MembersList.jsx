import { FaEdit, FaTrash } from "react-icons/fa";
import logo from "../../../assets/images/logo.jpg";
import NewMemberAdder from "./NewMemberAdder";
import { useState } from "react";
import { useTeamMembers } from "../../../context/teamMembersContext";

const MembersList = () => {
  const { data, deleteTeamMember, deleteTeamMemberStatus, error, isLoading } =
    useTeamMembers();
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
    deleteTeamMember(id);
  };

  return (
    <div className="mt-6 bg-bgSection rounded-lg p-6">
      <div className="sm:flex text-center mb-4">
        <input
          type="search"
          placeholder="Search for member"
          className="flex-grow outline-none text-bgMain bg-textPrimary px-4 py-2 border rounded-lg mr-4 focus:outline-none focus:ring-2 focus:ring-textSecondary"
        />
        <button
          type="button"
          onClick={handleAddNew}
          className="mt-4 sm:mt-0  px-4 py-2 bg-textPrimary text-bgMain rounded-lg hover:shadow-md hover:shadow-textSecondary transition-colors"
        >
          Add Member
        </button>
      </div>
      {error && !isLoading && <p className="text-red-500">{error}</p>}

      {(!data || data?.data?.length === 0) && !isLoading && !error ? (
        <div className="mt-6 text-center py-8 bg-bgSection rounded-lg">
          <h2 className="text-xl text-gray-300 font-medium">
            No Team Members yet
          </h2>
          <p className="text-gray-400 mt-2">
            Click &ldquo;Add Member&rdquo; to add your first team member
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto overflow-y-auto max-h-[340px]">
          <table className="min-w-full divide-y divide-bgMain">
            <thead className="bg-textPrimary sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-bgMain uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bgMain uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-bgMain uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-bgMain divide-y divide-bgSection">
              {data?.data?.map((member) => (
                <tr key={member._id} className="hover:bg-bgSection">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={member.profileImage || logo}
                          alt={member.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-textPrimary">
                          {member.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-textSecondary">
                      {member.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-textSecondary hover:text-textPrimary mr-3"
                      onClick={() => handleEditClick(member)}
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      className={`text-red-500 hover:text-red-400 ${
                        deleteTeamMemberStatus.isPending &&
                        "opacity-50 cursor-not-allowed"
                      }`}
                      disabled={deleteTeamMemberStatus.isPending}
                      onClick={() => handleDeleteClick(member._id)}
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading && (
            <p className="text-white text-center font-bold bg-bgSection w-full">
              Loading...
            </p>
          )}
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
