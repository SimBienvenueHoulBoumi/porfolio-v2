import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Contact: React.FC = () => {
  return (
      <div className="max-w-4xl w-full justify-center text-center bg-gray-500 text-white p-2 rounded-lg shadow-md">
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/SimBienvenueHoulBoumi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors text-3xl md:text-4xl"
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
            className="text-red-400 hover:text-red-500 transition-colors text-3xl md:text-4xl"
          >
            <FaEnvelope />
          </a>
        </div>
    </div>
  );
};

export default Contact;
