import Image from "next/image";


const SocialBanger = () => {
    return <div className="relative mb-10 group w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40">
              <div className="absolute -inset-2 sm:-inset-3 rounded-full bg-gradient-to-tr from-blue-500 via-pink-400 to-cyan-400 blur-2xl opacity-40 group-hover:scale-110 transition-transform duration-500"></div>
          <Image 
            src="/profile.jpg"
            alt="Avatar dev"
            width={160}
            height={160}
            className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-2xl group-hover:rotate-12 group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badge ultra propre, centré et responsive */}
          <span
            className="
              absolute left-1/2 bottom-[-18px] sm:bottom-[-22px] -translate-x-1/2
              px-3 py-[2px] sm:px-4 sm:py-1 text-xs sm:text-sm font-semibold
              rounded-full bg-gradient-to-r from-blue-600 via-fuchsia-500 to-cyan-400
              text-white shadow-lg ring-2 ring-white/30 backdrop-blur-sm border border-white/20
              z-20 animate-bounce whitespace-nowrap select-none
              "
          >
            OPEN TO WORK
          </span>
        </div>
}

export default SocialBanger;