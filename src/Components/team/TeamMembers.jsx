// import { useTeamMembers } from "../../context/teamMembersContext";
import logo from "../../assets/images/logo.jpg";

const teamMembers = [
  {
    id: 1,
    name: "Ziad Emam",
    title: "Backend developer",
    bio: " Iam the best team member best team member best team member",
    image: logo,
  },
  {
    id: 2,
    name: "Mazin Emad",
    title: "web developer",
    bio: " Iam the 2'nd best team member",
    image: logo,
  },
  {
    id: 3,
    name: "Ziad",
    title: "Backend developer",
    bio: " Iam the best team mest team mest team mest team mest team member",
    image: logo,
  },
  {
    id: 4,
    name: "Mazin",
    title: "web developer",
    bio: " st team mest team mest team mest team mest team mest team mest team mest team mest team mest team mer",
    image: logo,
  },
  {
    id: 5,
    name: "Ziad",
    title: "Backend developer",
    bio: " Iam the best team member",
    image: logo,
  },
  {
    id: 6,
    name: "Mazin Emad Aldeen",
    title: "web developer",
    bio: " Iam the 2'nd best team member",
    image: logo,
  },
  {
    id: 7,
    name: "Ziad",
    title: "Backend developer",
    bio: " Iam the best team member",
    image: logo,
  },
  {
    id: 8,
    name: "Mazin",
    title: "Leader",
    bio: " Iam the 2'nd best team memberIam the 2'nd best team memberIam the 2'nd best team memberIam the 2'nd best team member",
    image: logo,
  },
  {
    id: 9,
    name: "saad elmoald beeh",
    title: "Backend developer",
    bio: " Iam the best team member",
    image: logo,
  },
  {
    id: 10,
    name: "Mazin",
    title: "web developer",
    bio: " Iam the 2'nd best team member",
    image: logo,
  },
];

const TeamMembers = () => {
  // const { teamMembers } = useTeamMembers();

  return (
    <div className="min-h-screen bg-text py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
          Our Amazing Team
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Meet the talented individuals behind our success! Our team is composed
          of passionate professionals dedicated to innovation and excellence.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="rounded-lg overflow-hidden flex flex-col"
          >
            <div className="relative h-40 flex justify-center items-center">
              <img
                src={member.image}
                alt={member.name}
                className="h-32 w-32 object-cover rounded-full"
              />
            </div>
            <div className="flex-grow flex flex-col justify-between text-center">
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  {member.name}
                </h3>
                <p className="mt-3 text-sm text-gray-300">{member.title}</p>
                <p className="mt-2 text-sm text-gray-400">{member.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
