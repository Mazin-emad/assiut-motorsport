import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: <FaFacebook className="w-5 h-5" />,
  },
  {
    name: "Twitter",
    href: "#",
    icon: <FaTwitter className="w-5 h-5" />,
  },
  {
    name: "Instagram",
    href: "#",
    icon: <FaInstagram className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: <FaLinkedin className="w-5 h-5" />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} Assiut Motorsport.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-left">
            <p className="text-gray-300 text-sm">
              Made by{" "}
              <span className="font-semibold">
                <a href="#" className="hover:text-secondary">
                  Zeyad
                </a>{" "}
                &amp;{" "}
                <a
                  target="_blank"
                  href="https://mazin-emad.github.io/profile/"
                  className="hover:text-secondary"
                >
                  Mazin
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
