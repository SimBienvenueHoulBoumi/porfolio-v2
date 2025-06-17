import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi"; // flèche animée

const Banner = () => {
  return (
    <div className="relative flex flex-col items-center z-20 mt-2 mb-16">
      {/* Icônes sociales */}
      <div
        className="
          flex gap-6 sm:gap-8 px-4 sm:px-8 py-6
          rounded-2xl
          transition-all duration-300
          fade-in
          animate-[fadeInUp_1s_ease]
        "
        style={{
          animationDelay: "1.2s",
          animationFillMode: "both",
        }}
      >
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/sim-bienvenue-houl-boumi/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group relative
            flex items-center justify-center
            text-blue-400 hover:text-blue-600
            bg-gradient-to-tr from-blue-500/10 via-white/0 to-fuchsia-400/10
            rounded-full
            shadow-xl
            p-3 sm:p-4
            transition-all duration-200
            focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/40
          "
          aria-label="LinkedIn"
        >
          <FiLinkedin size={34} />
          <span className="absolute -inset-2 rounded-full border-2 border-blue-400 opacity-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300 pointer-events-none"></span>
          <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-blue-700 text-white text-xs px-2 py-1 rounded-lg pointer-events-none transition-all duration-200 whitespace-nowrap shadow-lg z-30">
            LinkedIn
          </span>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/SimBienvenueHoulBoumi"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group relative
            flex items-center justify-center
            text-gray-300 hover:text-white
            bg-gradient-to-tr from-gray-500/10 via-white/0 to-blue-400/10
            rounded-full
            shadow-xl
            p-3 sm:p-4
            transition-all duration-200
            focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/40
          "
          aria-label="GitHub"
        >
          <FiGithub size={34} />
          <span className="absolute -inset-2 rounded-full border-2 border-gray-400 opacity-0 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300 pointer-events-none"></span>
          <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg pointer-events-none transition-all duration-200 whitespace-nowrap shadow-lg z-30">
            GitHub
          </span>
        </a>

        {/* Email */}
        <a
          href="mailto:houlboumi.sim.bienevenue@gmail.com"
          className="
            group relative
            flex items-center justify-center
            text-pink-400 hover:text-white
            bg-gradient-to-tr from-pink-400/10 via-white/0 to-blue-400/10
            rounded-full
            shadow-xl
            p-3 sm:p-4
            transition-all duration-200
            focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-200/40
          "
          aria-label="E-mail"
        >
          <FiMail size={34} />
          <span className="absolute -inset-2 rounded-full border-2 border-pink-400 opacity-0 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300 pointer-events-none"></span>
          <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-pink-600 text-white text-xs px-2 py-1 rounded-lg pointer-events-none transition-all duration-200 whitespace-nowrap shadow-lg z-30">
            Email
          </span>
        </a>
      </div>

    </div>
  );
};

export default Banner;
