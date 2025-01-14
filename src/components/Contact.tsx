import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-md">
        {/* Container principal */}
        <h1 className="text-2xl font-bold text-blue-400 mb-2">
          Contactez-moi
        </h1>

        {/* Social Media Links */}
        <div className="mt-4 flex justify-center space-x-6">
          <a
            href="https://github.com/SimBienvenueHoulBoumi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition-colors text-3xl md:text-4xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/sim-bienvenue-houl-boumi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition-colors text-3xl md:text-4xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:brhulla@gmail.com"
            className="text-blue-400 hover:text-blue-500 transition-colors text-3xl md:text-4xl"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
