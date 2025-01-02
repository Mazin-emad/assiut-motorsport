import { FaTrophy, FaUsers, FaCog, FaRocket } from "react-icons/fa";
import aboutImage from "../../../assets/images/team.jpg";
import { motion } from "framer-motion";

const achievements = [
  {
    icon: <FaTrophy className="w-8 h-8 text-yellow-500" />,
    title: "Competition",
    count: "",
    description: " Ever, Formula student Uk, F1TINTH, YLF",
  },
  {
    icon: <FaCog className="w-8 h-8 text-green-500" />,
    title: "Projects",
    count: "",
    description: "Electric Vehicles, IC Vehicles, Autonomous Vehicles",
  },
  {
    icon: <FaUsers className="w-8 h-8 text-blue-600" />,
    title: "Team Members",
    count: "+80",
    description: "Passionate Engineers",
  },
  {
    icon: <FaRocket className="w-8 h-8 text-red-600" />,
    title: "Years of Experience",
    count: "+6",
    description: "Of Excellence",
  },
];

const About = () => {
  return (
    <section id="about" className="bg-bgSection py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl font-bold text-textPrimary mb-4"
          >
            About Our Team
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-24 h-1 bg-border mx-auto  mb-4"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-textSecondary"
          >
            We are a passionate team of engineering students dedicated to
            pushing the boundaries of automotive innovation.
          </motion.p>
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
            <h3 className="text-2xl font-semibold mb-6 text-textPrimary">
              Our Achievements
            </h3>
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-gray-700 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-textPrimary text-2xl flex-shrink-0">
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-white">
                      {achievement.title}
                    </h4>
                    <strong className="text-white inline">
                      {achievement.count}{" "}
                    </strong>
                    <p className="text-textPrimary inline">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
