import { BriefcaseBusiness } from "lucide-react";
import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full h-15 fixed left-0 bg-white shadow-lg top-0 z-50">
      <div className="relative flex items-center justify-between p-5 mx-5">
        {/* Link */}
        <h6 className="text-2xl font-semibold flex gap-2 items-center lg:ml-24 ml-0.5">
          <BriefcaseBusiness className="text-sky-500" />
          Job<span className="text-sky-500">Portal</span>
        </h6>

        <nav className="flex gap-10 font-semibold text-sm">
          <div className="hidden lg:flex lg:gap-10 md:gap-5 gap-4">
            {" "}
            <p>Home</p>
            <p>Find Jobs</p>
            <p>Companies</p>
            <button className="px-5 py-1 text-center outline-2 outline-zinc-400 rounded-md text-black font-semibold">
              Login
            </button>
            <button className="px-5 py-1 bg-sky-500 rounded-md outline-2 outline-sky-500 text-zinc-100 font-semibold">
              Signup
            </button>
          </div>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden md:mr-5 font-semibold md:text-[16px]"
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <nav className="absolute top-full left-0 w-full lg:hidden bg-white">
          <div className="lg:hidden flex flex-col gap-1.5 mb-3">
            <p>Home</p>
            <p>Find Jobs</p>
            <p>Companies</p>
            <button className="px-5 mb-1.5 w-20 py-1 text-center outline-2 outline-zinc-400 rounded-md text-black font-semibold">
              Login
            </button>
            <button className="px-5 w-20 text-center py-1 bg-sky-500 rounded-md outline-2 outline-sky-500 text-zinc-100 font-semibold">
              Sign
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
