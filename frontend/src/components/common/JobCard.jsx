import React from "react";
import { Bookmark, MapPin, ArrowRight } from "lucide-react";

const JobCard = ({ item }) => {
  return (
    <div className="group w-full max-w-70 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-lg hover:shadow-sky-100 hover:border-sky-300 transition-all duration-300">
      {/* Logo & Bookmark */}
      <div className="flex justify-between items-center mb-3">
        <img
          src={item.logo}
          alt={item.company}
          className="w-10 h-10 object-contain"
        />

        <button className="text-slate-500 hover:text-sky-500 transition-colors">
          <Bookmark size={20} />
        </button>
      </div>

      {/* Job Details */}
      <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">
        {item.title}
      </h3>

      <p className="text-sm text-slate-500 mb-3">{item.company}</p>

      {/* Location */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
        <MapPin size={15} />
        <span>{item.location}</span>
        <span>•</span>
        <span>{item.jobType}</span>
      </div>

      {/* Salary & Job Type */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-bold text-slate-900">₹{item.salary}</p>

        <span className="text-[10px] font-semibold text-sky-700 bg-sky-100 px-2 py-1 rounded-md">
          {item.jobType}
        </span>
      </div>

      {/* Apply Button */}
      <button className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300">
        Apply Now
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default JobCard;
