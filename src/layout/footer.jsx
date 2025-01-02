import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Assiut.Motorsport",
    icon: <FaFacebook className="w-5 h-5" />,
  },
  {
    name: "Twitter",
    href: "https://x.com/AssiutMotorSPT",
    icon: <FaTwitter className="w-5 h-5" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/assiutmotorsporteg?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: <FaInstagram className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/assiut-motorsport/",
    icon: <FaLinkedin className="w-5 h-5" />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-bgMain text-textPrimary py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-textSecondary text-sm">
              &copy; {new Date().getFullYear()} Assiut Motorsport.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-textSecondary hover:text-textPrimary"
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
            <p className="text-textSecondary text-sm">
              Made by{" "}
              <span className="font-semibold">
                <a href="#" className="hover:text-textPrimary">
                  Zeyad
                </a>{" "}
                &amp;{" "}
                <a
                  target="_blank"
                  href="https://mazin-emad.github.io/profile/"
                  className="hover:text-textPrimary"
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
