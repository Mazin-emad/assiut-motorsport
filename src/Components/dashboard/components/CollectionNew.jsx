import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { FaTrash, FaPlus, FaImage } from "react-icons/fa";
import { useGallery } from "../../../context/galaryContext";

const CollectionNew = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const multipleFileInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

  const {
    createCollection,
    createStatus,
    uploadCollectionImages,
    uploadStatus,
  } = useGallery();

  useEffect(() => {
    if (createStatus.isPending || uploadStatus.isPending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [createStatus.isPending, uploadStatus.isPending]);

  useEffect(() => {
    if (createStatus.error || uploadStatus.error) {
      setError(createStatus.error.message || uploadStatus.error.message);
    } else {
      setError(null);
    }
  }, [createStatus.error, uploadStatus.error]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!title || !description) {
        throw new Error("Title and description are required");
      }

      if (!coverImage) {
        throw new Error("Cover image is required for new collections");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("coverImage", coverImage);

      const collectionData = await createCollection(formData);

      if (newImages.length > 0) {
        const imagesFormData = new FormData();
        newImages.forEach((img) => {
          imagesFormData.append("images", img.file);
        });
        const collectionId = collectionData.data._id;
        await uploadCollectionImages({
          id: collectionId,
          formData: imagesFormData,
        });
      }

      // setLoading(false);

      if (!loading && !error) {
        onClose();
      }
    } catch (error) {
      setError("Failed to create collection" + error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex flex-col ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Create New Collection</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

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
              <p className="block text-lg font-medium text-red-500 mb-2">
                Please upload 5 images a time, JUST 5
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
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
                {loading ? "Creating..." : "Create Collection"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CollectionNew.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CollectionNew;
