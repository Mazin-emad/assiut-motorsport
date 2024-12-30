import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { FaTrash, FaPlus, FaImage } from "react-icons/fa";
import { useGallery } from "../../../context/galaryContext";
import { useUpdateGallery } from "../../../context/updatGallery";

const CollectionEdit = ({ collection, onClose, isNew = false }) => {
  const [title, setTitle] = useState(isNew ? "" : collection.title);
  const [description, setDescription] = useState(
    isNew ? "" : collection.description
  );
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(
    isNew ? null : collection.coverImage
  );
  const [images, setImages] = useState(isNew ? [] : collection.images);
  const [newImages, setNewImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const multipleFileInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

  const {
    deleteSingleImage,
    deleteSingleStatus,
    createCollection,
    createStatus,
    uploadCollectionImages,
    uploadStatus,
  } = useGallery();

  const {
    updateCollection,
    updateCollectionStatus,
    updateCollectionCover,
    updateCollectionCoverStatus,
  } = useUpdateGallery();

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setCoverImage(file);
        setCoverImagePreview(URL.createObjectURL(file));
      } else {
        setError("Please select an image file for the cover");
      }
    }
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length !== files.length) {
      setError("Some files were skipped as they were not images");
    }

    const newImagePreviews = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewImages((prev) => [...prev, ...newImagePreviews]);
  };

  const handleDeleteNewImage = (previewUrl) => {
    setNewImages((prev) => prev.filter((img) => img.preview !== previewUrl));
  };

  const handleDeleteImage = (image) => {
    if (isNew) {
      setImages((prev) => prev.filter((img) => img !== image));
    } else {
      deleteSingleImage({ id: collection._id, url: image });
      setImages((prev) => prev.filter((img) => img !== image));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!title || !description) {
        throw new Error("Title and description are required");
      }

      if (isNew) {
        if (!coverImage) {
          throw new Error("Cover image is required for new collections");
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("coverImage", coverImage);

        // Create collection first
        const collectionData = await createCollection(formData);

        // If there are new images, upload them
        if (newImages.length > 0) {
          const imagesFormData = new FormData();
          newImages.forEach((img) => {
            imagesFormData.append("images", img.file);
          });
          await uploadCollectionImages({
            id: collectionData._id,
            formData: imagesFormData,
          });
        }
      } else {
        // Update existing collection
        await updateCollection({
          id: collection._id,
          updatedCollection: { title, description },
        });

        if (coverImage) {
          const coverFormData = new FormData();
          coverFormData.append("coverImage", coverImage);
          await updateCollectionCover({
            id: collection._id,
            formData: coverFormData,
          });
        }

        if (newImages.length > 0) {
          const imagesFormData = new FormData();
          newImages.forEach((img) => {
            imagesFormData.append("images", img.file);
          });
          await uploadCollectionImages({
            id: collection._id,
            formData: imagesFormData,
          });
        }
      }

      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">
            {isNew ? "Create New Collection" : "Edit Collection"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose className="w-6 h-6" />
          </button>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Collection Title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows="3"
                placeholder="Collection Description"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              <div className="flex items-center space-x-4">
                {coverImagePreview && (
                  <div className="relative w-32 h-32">
                    <img
                      src={coverImagePreview}
                      alt="Cover Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImage(null);
                        setCoverImagePreview(null);
                      }}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => coverImageInputRef.current?.click()}
                  className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <FaImage className="mr-2" />
                  {coverImagePreview ? "Change Cover" : "Add Cover"}
                </button>
                <input
                  type="file"
                  ref={coverImageInputRef}
                  onChange={handleCoverImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Collection Images
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {images.map((image) => (
                  <div
                    key={image}
                    className="relative group rounded-lg overflow-hidden"
                  >
                    <img
                      src={image}
                      alt="Collection"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(image)}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      disabled={deleteSingleStatus.isPending}
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {newImages.map((image) => (
                  <div
                    key={image.preview}
                    className="relative group rounded-lg overflow-hidden"
                  >
                    <img
                      src={image.preview}
                      alt="New Collection"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteNewImage(image.preview)}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => multipleFileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                >
                  <FaPlus className="w-8 h-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">Add Images</span>
                </button>
              </div>
              <input
                type="file"
                ref={multipleFileInputRef}
                onChange={handleImagesUpload}
                multiple
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 text-white rounded-lg ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-bgMain hover:bg-bgSection"
                }`}
              >
                {loading ? "Saving..." : isNew ? "Create" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CollectionEdit.propTypes = {
  collection: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    coverImage: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};

export default CollectionEdit;
