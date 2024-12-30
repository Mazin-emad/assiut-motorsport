import { motion } from "framer-motion";
import { useTeamMembers } from "../../context/teamMembersContext";

const TeamMembers = () => {
  const { data, isLoading, error } = useTeamMembers();
  return (
    <div className="min-h-screen bg-bgSection py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold text-textPrimary mb-4"
        >
          Our Amazing Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg text-textSecondary max-w-2xl mx-auto"
        >
          Meet the talented individuals behind our success! Our team is composed
          of passionate Engineers dedicated to innovation and excellence.
        </motion.p>
      </div>
      {isLoading ? (
        <div className=" text-xl lg:text-2xl text-textSecondary text-center">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.data?.map((member) => (
            <div
              key={member._id}
              className="rounded-lg overflow-hidden flex flex-col"
            >
              <div className="relative h-40 flex justify-center items-center">
                <img
                  src={member.profileImage}
                  alt={member.name}
                  className="h-32 w-32 object-cover rounded-full"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between text-center">
                <div>
                  <h3 className="text-lg font-semibold text-textPrimary">
                    {member.name}
                  </h3>
                  <p className="mt-3 text-sm text-textPrimary">
                    {member.title}
                  </p>
                  <p className="mt-2 text-sm text-textSecondary">
                    {member.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {error && !isLoading && (
            <div className=" text-xl lg:text-2xl text-center text-red-600">
              {error.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
