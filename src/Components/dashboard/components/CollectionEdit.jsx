import { useState } from "react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import demoImage from "../../../assets/images/logo.jpg";
import demoImage2 from "../../../assets/images/logo-background-removed.png";
import demoImage3 from "../../../assets/images/heroBackGroundCar.jpg";
import demoImage4 from "../../../assets/images/team.jpg";

const CollectionEdit = ({ collection, onClose, isNew = false }) => {
  const [title, setTitle] = useState(collection?.title || "");
  const [description, setDescription] = useState(collection?.description || "");
  const [images, setImages] = useState(
    collection?.images || [
      { id: 1, url: demoImage },
      { id: 2, url: demoImage2 },
      { id: 3, url: demoImage3 },
      { id: 4, url: demoImage4 },
      { id: 5, url: demoImage },
      { id: 6, url: demoImage },
      { id: 7, url: demoImage2 },
      { id: 8, url: demoImage3 },
      { id: 9, url: demoImage4 },
    ]
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Here you would typically upload the file to your server
      // For now, we'll just create a local URL
      const newImage = {
        id: images.length + 1,
        url: URL.createObjectURL(file),
      };
      setImages([...images, newImage]);
    }
  };

  const handleDeleteImage = (imageId) => {
    setImages(images.filter((img) => img.id !== imageId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save changes to your backend
    console.log("Saving collection:", {
      title,
      description,
      images,
      isNew,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-text dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary hover:text-primary/80"
        >
          <IoClose className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-primary dark:text-secondary mb-4">
          {isNew ? "Add New Collection" : `Edit ${collection.title}`}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-secondary mb-2"
            >
              Collection Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
              required
              placeholder="Enter collection title"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-secondary mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
              placeholder="Enter collection description"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center w-full h-32 border-2 border-dashed border-secondary rounded-lg cursor-pointer hover:border-secondary/50 transition-colors"
            >
              <div className="text-center">
                <FaPlus className="w-8 h-8 mx-auto text-secondary" />
                <span className="mt-2 block text-sm text-secondary">
                  Add New Image
                </span>
              </div>
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group rounded-lg overflow-hidden"
              >
                <img
                  src={image.url}
                  alt="Collection"
                  className="w-full h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(image.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-primary rounded-md text-white hover:bg-primary/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors"
            >
              {isNew ? "Create Collection" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CollectionEdit.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        url: PropTypes.string,
      })
    ),
  }),
  onClose: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};

export default CollectionEdit;
