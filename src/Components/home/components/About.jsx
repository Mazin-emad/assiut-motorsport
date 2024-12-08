import { FaTrophy, FaUsers, FaCog, FaRocket } from "react-icons/fa";
import aboutImage from "../../../assets/images/team.jpg";

const achievements = [
  {
    icon: <FaTrophy className="w-8 h-8 text-yellow-500" />,
    title: "Competition",
    count: "",
    description: " Ever, Formula student Uk, F1TINTH, YLF",
  },
  {
    icon: <FaCog className="w-8 h-8 text-gray-500" />,
    title: "Projects",
    count: "",
    description: "Electric Vehicles, IC Vehicles, Autonomous Vehicles",
  },
  {
    icon: <FaUsers className="w-8 h-8 text-blue-500" />,
    title: "Team Members",
    count: "+80",
    description: "Passionate Engineers",
  },
  {
    icon: <FaRocket className="w-8 h-8 text-red-500" />,
    title: "Years Experience",
    count: "+6",
    description: "Of Excellence",
  },
];

const About = () => {
  return (
    <div className="bg-text py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary mb-4">
            About Our Team
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto  mb-4"></div>
          <p className="text-lg text-gray-400">
            We are a passionate team of engineering students dedicated to
            pushing the boundaries of automotive innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={aboutImage}
              alt="Team at work"
              className="rounded-lg shadow-xl w-full"
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-primary">
              Our Achievements
            </h3>
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-secondary text-2xl flex-shrink-0">
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-text">
                      {achievement.title}
                    </h4>
                    <strong className="text-secondary inline">
                      {achievement.count}{" "}
                    </strong>
                    <p className="text-gray-600 inline">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
