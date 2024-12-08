import PropTypes from "prop-types";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const NewMemberAdder = ({ onClose, member, isNew = false }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState(member?.name);
  const [title, setTitle] = useState(member?.title);
  const [bio, setBio] = useState(member?.bio);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-text dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300"
        >
          <IoClose className="w-6 h-6" />
        </button>

        <h1 className="text-2xl font-bold text-primary dark:text-secondary mb-4">
          {isNew ? "Add New Member" : "Edit Member"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              id="title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="add bio"
              id="bio"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Profile Image
            </label>
            <input
              type="file"
              onChange={handleChange}
              id="image"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
              accept="image/*"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-primary rounded-lg text-gray-700 hover:bg-primary dark:text-gray-300 dark:hover:bg-primary/90 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors dark:bg-secondary dark:hover:bg-secondary/90"
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
    bio: PropTypes.string,
  }),
  isNew: PropTypes.bool,
};
export default NewMemberAdder;
