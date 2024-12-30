import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import CollectionEdit from "./CollectionEdit";
import { useGallery } from "../../../context/galaryContext";

const CollectionList = () => {
  const {
    collections,
    error,
    isLoading,
    deleteCollection,
    deleteCollectionStatus,
  } = useGallery();

  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isNewCollection, setIsNewCollection] = useState(false);

  const handleEditClick = (collection) => {
    setSelectedCollection(collection);
    setIsNewCollection(false);
  };

  const handleAddNew = () => {
    setSelectedCollection({});
    setIsNewCollection(true);
  };

  const handleDeleteClick = (id) => {
    deleteCollection(id);
  };

  return (
    <div className="mt-6 bg-bgSection rounded-lg p-6">
      <div className="sm:flex text-center mb-4">
        <input
          type="search"
          placeholder="Search collections"
          className="flex-grow px-4 py-2 mr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-textPrimary"
        />
        <button
          onClick={handleAddNew}
          className="mt-4 sm:mt-0  px-4 py-2 bg-textPrimary text-bgMain rounded-lg hover:shadow-md hover:shadow-textSecondary transition-colors"
        >
          Add Collection
        </button>
      </div>

      {!collections || collections?.data?.length === 0 ? (
        <div className="mt-6 text-center py-8 bg-bgSection rounded-lg">
          <h2 className="text-xl text-textPrimary font-medium">
            No Collections yet
          </h2>
          <p className="text-textSecondary  mt-2">
            Click &ldquo;Add Collection&rdquo; to create your first gallery
            collection
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto overflow-y-auto max-h-[360px]">
          <table className="min-w-full divide-y divide-bgMain">
            <thead className="bg-textPrimary sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-bgMain uppercase tracking-wider">
                  Collection
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-bgMain uppercase tracking-wider">
                  Images
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-bgMain uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-bgMain divide-y divide-bgMain">
              {collections?.data?.map((collection) => (
                <tr key={collection._id} className="hover:bg-bgMain">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-16 w-24 flex-shrink-0">
                        <img
                          className="h-16 w-24 rounded-lg object-cover"
                          src={collection.coverImage}
                          alt={collection.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-textPrimary">
                          {collection.title}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-textSecondary">
                      {collection.imageCount} images
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-textSecondary hover:text-textPrimary mr-3"
                      onClick={() => handleEditClick(collection)}
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      className={`text-red-500 hover:text-red-400 ${
                        deleteCollectionStatus.isPending &&
                        "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() => handleDeleteClick(collection._id)}
                      disabled={deleteCollectionStatus.isPending}
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {isLoading && <p className="text-textSecondary mt-4">Loading...</p>}
        </div>
      )}
      {selectedCollection && (
        <CollectionEdit
          collection={selectedCollection}
          onClose={() => setSelectedCollection(null)}
          isNew={isNewCollection}
        />
      )}
    </div>
  );
};

export default CollectionList;
