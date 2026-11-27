import Hero from "../../assets/Home.png";
import Staties from "../../components/common/Staties";
import { Search, MapPin, BriefcaseBusiness, User, Users } from "lucide-react";

const HeroSection = () => {
  const data = [
    {
      icon: <BriefcaseBusiness />,
      people: "10K+",
      title: "Job Opening",
    },
    {
      icon: <Users />,
      people: "5K+",
      title: "Companies",
    },
    {
      icon: <User />,
      people: "1M+",
      title: "Job Seekers",
    },
  ];
  return (
    <section className="w-full min-h-137.5 bg-linear-to-br from-sky-50 via-white to-blue-50 overflow-hidden">
      <div className="max-w-350 mx-auto px-5 md:px-10 lg:px-16 py-12 lg:py-16 my-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-5 items-center">
          {/* LEFT CONTENT */}

          <div className="w-full flex flex-col gap-5">
            {/* Badge */}

            <div>
              <span className="inline-flex items-center gap-2 bg-blue-100 text-sky-700 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
                🎯 #1 Job Portal for Freshers & Professionals
              </span>
            </div>

            {/* Heading */}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 leading-[1.15] tracking-tight">
              Find Your <span className="text-sky-500">Dream</span>
              <br />
              Job Today
            </h1>

            {/* Description */}

            <p className="text-zinc-400 text-sm sm:text-base leading-7 max-w-xl">
              Discover thousands of job opportunities from top companies. Create
              your profile, apply easily, and take the next step in your career.
            </p>

            {/* Search Bar */}

            <div className="w-full max-w-2xl bg-white p-2 rounded-xl shadow-lg shadow-blue-100 border border-slate-100 flex flex-col sm:flex-row gap-2">
              {/* Job Search */}

              <div className="flex items-center gap-3 px-3 py-3 flex-1">
                <Search size={21} className="text-slate-500 shrink-0" />

                <input
                  type="search"
                  placeholder="Job title, skills or company"
                  className="w-full outline-none text-sm text-slate-700 placeholder:text-slate-400"
                />
              </div>

              {/* Divider */}

              <div className="hidden sm:block w-px bg-slate-200 my-2"></div>

              {/* Location */}

              <div className="flex items-center gap-3 px-3 py-3 flex-1">
                <MapPin size={21} className="text-slate-500 shrink-0" />

                <input
                  type="search"
                  placeholder="Location"
                  className="w-full outline-none text-sm text-slate-700 placeholder:text-slate-400"
                />
              </div>

              {/* Search Button */}

              <button className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 transition-all duration-300 text-white font-semibold px-6 py-3 rounded-lg text-sm">
                Search Jobs
                <Search size={17} />
              </button>
            </div>

            {/* Statistics */}

            <div className="mt-3 flex justify-evenly">
              {data.map((item, index) => {
                return <Staties item={item} key={index} />;
              })}
            </div>
          </div>

          {/* RIGHT CONTENT */}

          <div className="w-full flex justify-center items-center">
            <img
              src={Hero}
              alt="Find your dream job"
              className="w-full rounded-md max-w-145 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
