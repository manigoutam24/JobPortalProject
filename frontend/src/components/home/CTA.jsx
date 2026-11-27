import React from "react";
import { BriefcaseBusiness, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="w-[90%] mx-auto my-10">
      <div className="w-full min-h-32 bg-sky-500 rounded-2xl px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Icon */}
        <div className="flex items-center gap-5">
          <div className="text-white">
            <BriefcaseBusiness size={55} strokeWidth={1.5} />
          </div>

          <div className="hidden md:block h-16 w-px bg-sky-300"></div>

          {/* Heading & Description */}
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl lg:text-3xl text-white font-bold">
              Ready to Find Your Dream Job?
            </h2>

            <p className="text-xs md:text-sm text-sky-100 mt-2">
              Create your profile, get noticed by top companies, and start your
              career journey today.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button className="flex items-center gap-3 px-6 py-3 bg-white text-sky-600 font-semibold rounded-xl hover:bg-sky-50 transition-all duration-300 whitespace-nowrap">
          Register Now
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default CTA;
