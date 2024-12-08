import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import demoImage from "../../../assets/images/logo.jpg";
import demoImage2 from "../../../assets/images/logo-background-removed.png";
import CollectionEdit from "./CollectionEdit";

const dummyCollections = [
  {
    id: 1,
    title: "2023 Competition",
    imageCount: 15,
    coverImage: demoImage,
  },
  {
    id: 2,
    title: "2099 Competition",
    imageCount: 8,
    coverImage: demoImage2,
  },
  {
    id: 3,
    title: "2022 Competition",
    imageCount: 9,
    coverImage: demoImage,
  },
  {
    id: 4,
    title: "6666 Competition",
    imageCount: 66,
    coverImage: demoImage2,
  },
];
const CollectionList = () => {
  const [collections, setCollections] = useState(dummyCollections);
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
    setCollections(collections.filter((collection) => collection.id !== id));
  };

  return (
    <div className="mt-6 bg-text dark:bg-gray-800 rounded-lg p-6">
      <div className="sm:flex text-center mb-4">
        <input
          type="search"
          placeholder="Search collections"
          className="flex-grow px-4 py-2 mr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleAddNew}
          className="mt-4 sm:mt-0 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
        >
          Add Collection
        </button>
      </div>

      {!collections || collections.length === 0 ? (
        <div className="mt-6 text-center py-8 bg-gray-700 rounded-lg">
          <h2 className="text-xl text-gray-300 font-medium">
            No Collections yet
          </h2>
          <p className="text-gray-400  mt-2">
            Click &ldquo;Add Collection&rdquo; to create your first gallery
            collection
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto overflow-y-auto max-h-[360px]">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Collection
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Images
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {collections.map((collection) => (
                <tr
                  key={collection.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600"
                >
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
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {collection.title}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {collection.imageCount} images
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-secondary hover:text-secondary/80 mr-3"
                      onClick={() => handleEditClick(collection)}
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      className="text-primary hover:text-primary/80"
                      onClick={() => handleDeleteClick(collection.id)}
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
