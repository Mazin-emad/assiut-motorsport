import { useParams } from "react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const getOneCollection = async (id) => {
  const response = await fetch(
    "https://sport-production-f4dc.up.railway.app/assiutmotorsport/api/gallery/" +
      id
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
};
const Collection = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["collection", id],
    queryFn: () => getOneCollection(id),
  });

  return (
    <div className="min-h-screen bg-bgSection py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold text-textPrimary mb-4"
        >
          {data?.data?.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="lg:text-lg w-11/12 sm:w-3/4 lg:w-1/2 mx-auto text-center text-textSecondary"
        >
          {data?.data?.description}
        </motion.p>
      </div>
      <div className="columns-[300px] gap-2">
        {data?.data?.images.map((image) => (
          <img
            key={image}
            src={image}
            alt={data?.data?.title}
            className="w-full mb-2"
          />
        ))}
      </div>
      {isLoading ? (
        <div className="text-xl lg:text-2xl text-textSecondary text-center">
          Loading...
        </div>
      ) : (
        <div className="text-xl lg:text-2xl text-red-500 text-center">
          {error?.message}
        </div>
      )}
    </div>
  );
};

export default Collection;
