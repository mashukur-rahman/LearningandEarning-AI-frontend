interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <section
      className={`relative mx-auto mt-8 w-full max-w-7xl overflow-hidden rounded-lg px-4 py-16 sm:px-6 lg:px-8 ${className}`}
    >
      {/* Dark Mesh Gradient Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base dark background - slightly lighter than black for gradient effect */}
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-br from-black via-gray-950 to-black" />
        
        {/* Primary mesh gradient points - dark vibrant colors */}
        <div className="absolute right-0 top-0 h-[700px] w-[700px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-blue-950/60 via-indigo-950/50 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[700px] w-[700px] translate-y-1/2 -translate-x-1/2 rounded-full bg-gradient-to-tr from-purple-950/60 via-fuchsia-950/50 to-transparent blur-3xl" />
        
        {/* Secondary mesh points for depth and richness */}
        <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-950/50 to-transparent blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-[450px] w-[450px] rounded-full bg-gradient-to-br from-cyan-950/40 to-transparent blur-3xl" />
        <div className="absolute left-1/4 bottom-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-pink-950/40 to-transparent blur-3xl" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
        {/* Title */}
        <h1 className="mb-2 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          Hire Fresh Talents
        </h1>
        <h3 className="mb-8 text-xl font-medium leading-tight text-gray-300 sm:text-2xl md:text-3xl">
          Curated by Our AI
        </h3>

        {/* Buttons */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700">
            Get Started
          </button>
          <button className="rounded-lg border-2 border-white/20 bg-white/10 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
            Learn More
          </button>
        </div>

        {/* Dashboard Screenshot Placeholder */}
        <div className="w-full max-w-5xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-black shadow-2xl">
            {/* Placeholder content */}
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mb-4 text-6xl">📊</div>
                <p className="text-lg font-medium text-gray-400">
                  Dashboard Screenshot Placeholder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

