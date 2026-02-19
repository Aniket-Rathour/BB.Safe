import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/40 backdrop-blur-xl h-28 flex items-center">
      <div className="container mx-auto max-w-7xl px-10 flex justify-between items-center">
        
        <Link
          to="/"
          className="text-2xl font-black tracking-[-0.05em] text-gray-900"
        >
          BB<span className="text-rose-400">.</span>SAFE
        </Link>

        <nav className="hidden md:flex items-center gap-14">
          {[
            { name: "Home", path: "/" },
            { name: "Features", path: "/features" },
            { name: "Smart Route", path: "/smart-route" },
            { name: "Emergency", path: "/emergency", color: "text-rose-500" },
          ].map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                text-[13px] font-bold uppercase tracking-[0.2em] transition-all duration-500
                ${isActive ? (link.color || "text-indigo-600") : "text-gray-400 hover:text-gray-900"}
              `}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-10">
          <button 
            onClick={() => navigate('/login')}
            className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="h-12 px-8 bg-gray-900 text-white text-[11px] font-black uppercase tracking-[0.25em] rounded-full hover:bg-indigo-600 transition-all duration-500 shadow-2xl shadow-gray-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
