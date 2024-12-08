import { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../assets/images/logo.jpg";
import logo2 from "../../assets/images/heroBackGroundCar.jpg";

const dummyCollections = [
  {
    id: 1,
    title: "2023 Competition",
    imageCount: 15,
    coverImage: logo,
  },
  {
    id: 2,
    title: "2099 Competition",
    imageCount: 8,
    coverImage: logo2,
  },
  {
    id: 3,
    title: "2022 Competition",
    imageCount: 9,
    coverImage: logo,
  },
  {
    id: 4,
    title: "6666 Competition",
    imageCount: 66,
    coverImage: logo,
  },
  {
    id: 5,
    title: "2022 Competition",
    imageCount: 9,
    coverImage: logo2,
  },
  {
    id: 6,
    title: "7 Competition",
    imageCount: 66,
    coverImage: logo,
  },
];

const Gallery = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState(dummyCollections);

  return (
    <div className="min-h-screen bg-text py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
          Our Gallery
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Explore our collection of memorable moments from races, practice
          sessions, and special events
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/gallery/${collection.id}`)}
              key={collection.id || index}
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={collection.coverImage}
                  alt={collection.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-secondary text-lg font-semibold">
                    {collection.title}
                  </h3>
                  <p className="text-gray-300 text-sm">Click to view details</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
