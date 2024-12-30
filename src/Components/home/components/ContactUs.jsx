import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const socialLinks = [
    { icon: <FaFacebook />, url: "#", label: "Facebook" },
    { icon: <FaTwitter />, url: "#", label: "Twitter" },
    { icon: <FaInstagram />, url: "#", label: "Instagram" },
    { icon: <FaLinkedin />, url: "#", label: "LinkedIn" },
  ];

  return (
    <section id="contact" className="py-20 bg-bgSection">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl font-bold text-textPrimary mb-4"
          >
            Contact Us
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-24 h-1 bg-border mx-auto mb-4"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-textSecondary"
          >
            Get in touch with us for any inquiries or collaboration
            opportunities
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-textPrimary mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-textSecondary text-textPrimary w-full px-4 py-2 outline-none rounded-lg focus:ring-2 focus:ring-border focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-textPrimary mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-textSecondary text-textPrimary w-full px-4 py-2 outline-none rounded-lg focus:ring-2 focus:ring-border focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-textPrimary mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-textSecondary text-textPrimary w-full px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-border focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-textPrimary mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="bg-textSecondary text-textPrimary w-full px-4 py-2 border outline-none rounded-lg focus:ring-2 focus:ring-border focus:border-transparent"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="mx-auto block md:w-[350px] px-6 py-3 bg-textPrimary text-bgSection rounded-lg hover:shadow-md hover:shadow-textSecondary transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8 lg:mt-10">
            <div className="flex items-start p-4 bg-bgMain rounded-lg">
              <div className="flex-shrink-0 p-3 bg-border text-bgSection rounded-lg">
                <FaMapMarkerAlt className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-textPrimary">
                  Our Location
                </h4>
                <p className="text-textSecondary mt-1">
                  Faculty of Engineering, Assiut University, Assiut, Egypt
                </p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-bgMain rounded-lg">
              <div className="flex-shrink-0 p-3 bg-border text-bgMain rounded-lg">
                <FaEnvelope className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-textPrimary">
                  Email Address
                </h4>
                <p className="text-textSecondary mt-1">
                  assiut.motorsport@gmail.com
                </p>
              </div>
            </div>

            <div className="flex justify-around space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="p-3 bg-bgMain text-textSecondary rounded-lg hover:bg-border hover:text-bgMain transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactUs;
