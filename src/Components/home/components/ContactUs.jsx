import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
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
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.text === "OK") {
        setSuccess(true);
        form.current.reset();
      }
    } catch (error) {
      setError("Failed to send message. Please try again later.");
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    {
      icon: <FaFacebook />,
      url: "https://www.facebook.com/Assiut.Motorsport",
      label: "Facebook",
    },
    {
      icon: <FaTwitter />,
      url: "https://x.com/AssiutMotorSPT",
      label: "Twitter",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/assiutmotorsporteg?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      label: "Instagram",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/company/assiut-motorsport",
      label: "LinkedIn",
    },
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
            <motion.form
              ref={form}
              onSubmit={sendEmail}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-textPrimary font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    required
                    className="bg-textSecondary text-textPrimary w-full px-4 py-2 outline-none rounded-lg focus:ring-2 focus:ring-border focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-textPrimary font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    required
                    className="bg-textSecondary text-textPrimary w-full px-4 py-2 outline-none rounded-lg focus:ring-2 focus:ring-border focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-textPrimary font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  className="bg-textSecondary text-textPrimary w-full px-4 py-2 border outline-none rounded-lg focus:ring-2 focus:ring-border focus:border-transparent resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>

              {error && <p className="text-red-500 text-center">{error}</p>}

              {success && (
                <p className="text-green-500 text-center">
                  Message sent successfully!
                </p>
              )}

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className={`mx-auto block md:w-[350px] px-6 py-3 bg-textPrimary text-bgSection rounded-lg transition-colors ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-md hover:shadow-textSecondary"
                  }`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>
              </div>
            </motion.form>
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
                  target="_blank"
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
