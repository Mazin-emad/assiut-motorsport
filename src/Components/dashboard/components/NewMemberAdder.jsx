import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useTeamMembers } from "../../../context/teamMembersContext";

const NewMemberAdder = ({ onClose, member, isNew = false }) => {
  const {
    createTeamMember,
    createTeamMemberStatus,
    updateTeamMemberText,
    updateTeamMemberTextStatus,
    updateTeamMemberImage,
    updateTeamMemberImageStatus,
  } = useTeamMembers();
  const [loading, setLoading] = useState(
    createTeamMemberStatus.isPending ||
      updateTeamMemberTextStatus.isPending ||
      updateTeamMemberImageStatus.isPending
  );

  useEffect(() => {
    setLoading(
      createTeamMemberStatus.isPending ||
        updateTeamMemberTextStatus.isPending ||
        updateTeamMemberImageStatus.isPending
    );
  }, [
    createTeamMemberStatus.isPending,
    updateTeamMemberTextStatus.isPending,
    updateTeamMemberImageStatus.isPending,
  ]);
  const [error, setError] = useState(
    createTeamMemberStatus.error ||
      updateTeamMemberTextStatus.error ||
      updateTeamMemberImageStatus.error
  );
  useEffect(() => {
    if (createTeamMemberStatus.error) {
      setError(createTeamMemberStatus.error);
    } else if (updateTeamMemberTextStatus.error) {
      setError(updateTeamMemberTextStatus.error);
    } else if (updateTeamMemberImageStatus.error) {
      setError(updateTeamMemberImageStatus.error);
    }
  }, [
    createTeamMemberStatus.error,
    updateTeamMemberTextStatus.error,
    updateTeamMemberImageStatus.error,
  ]);

  const [image, setImage] = useState(null);
  const [name, setName] = useState(member?.name ? member.name : "");
  const [title, setTitle] = useState(member?.title ? member.title : "");
  const [bio, setBio] = useState(member?.description ? member.description : "");

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNew) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("title", title);
      formData.append("description", bio);
      formData.append("profileImage", image);
      createTeamMember(formData);
    } else {
      updateTeamMemberText({
        id: member._id,
        name,
        title,
        description: bio,
      });
      if (image) {
        const formData = new FormData();
        formData.append("profileImage", image);
        updateTeamMemberImage({ id: member._id, formData });
      }
    }
    if (!loading && !error) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-textPrimary p-6 rounded-lg shadow-md max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-bgMain hover:text-bgSection"
        >
          <IoClose className="w-6 h-6" />
        </button>

        <h1 className="text-2xl font-bold text-bgMain mb-4">
          {isNew ? "Add New Member" : "Edit Member"}
        </h1>

        {!loading && error && (
          <div className="text-red-500 mb-4">{error.message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-bold text-bgMain"
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              id="name"
              className="bg-textSecondary text-bgMain placeholder-textPrimary w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-textSecondary"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-bold text-bgMain"
            >
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              id="title"
              className="bg-textSecondary text-bgMain placeholder-textPrimary w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-textSecondary"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="bio"
              className="block text-sm font-bold text-bgMain"
            >
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="add bio"
              id="bio"
              className="bg-textSecondary text-bgMain placeholder-textPrimary w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-textSecondary"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="image"
              className="block text-sm font-bold text-bgMain"
            >
              Profile Image
            </label>
            <input
              type="file"
              onChange={handleChange}
              id="image"
              className="w-full bg-textSecondary text-bgMain placeholder-textPrimary px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bgMain"
              accept="image/*"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-bgMain rounded-lg text-bgMain hover:bg-bgMain hover:text-textPrimary transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-bgMain text-textPrimary rounded-lg hover:bg-bgSection transition-colors"
            >
              {isNew ? "Add Member" : "Edit Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

NewMemberAdder.propTypes = {
  onClose: PropTypes.func.isRequired,
  member: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }),
  isNew: PropTypes.bool,
};
export default NewMemberAdder;
