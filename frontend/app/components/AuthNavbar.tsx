export default function AuthNavbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-10 py-5 flex justify-between items-center">

        {/* Left Side */}
        <div className="flex items-center gap-4">

          <img
            src="/library-logo.png"
            alt="Library Logo"
            className="w-12 h-12 rounded-full object-cover bg-white"
          />

          <h1 className="text-3xl font-bold tracking-wide text-white">
            Library
          </h1>

        </div>

        {/* Right Side */}
        <div className="flex gap-8 text-lg text-white">

          <a
            href="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </a>

          <a
            href="/#about"
            className="hover:text-blue-400 transition"
          >
            About
          </a>

        </div>

      </div>

    </nav>
  );
}