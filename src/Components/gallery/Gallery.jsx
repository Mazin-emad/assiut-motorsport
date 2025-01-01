import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useGallery } from "../../context/galaryContext";

const Gallery = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGallery();

  return (
    <div className="min-h-screen bg-bgSection py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold text-textPrimary mb-4"
        >
          Our Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg text-textSecondary max-w-2xl mx-auto"
        >
          Explore our collection of memorable moments from races, practice
          sessions, and special events
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="text-xl lg:text-2xl text-textSecondary text-center">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.data.map((collection) => (
              <div
                className="group relative overflow-hidden rounded-xl bg-bgMain shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/gallery/${collection._id}`)}
                key={collection._id}
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={collection.coverImage}
                    alt={collection.title}
                    className="aspect-square w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-textPrimary text-lg font-semibold">
                      {collection.title}
                    </h3>
                    <p className="text-textSecondary text-sm">
                      Click to See Collection
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!isLoading && error && (
          <div className="text-xl lg:text-2xl text-red-500 text-center">
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
