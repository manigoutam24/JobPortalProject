import React from "react";
import JobCard from "../common/JobCard";
import featuredJobs from "../../assets/data/featuredJobsData";

const FeatureJobs = () => {
  const homeJobs = featuredJobs.slice(0, 8);
  return (
    <section className="w-full px-5 md:px-10 lg:px-16 py-5 pb-10">
      <div className="max-w-350 mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10 flex justify-between mx-5">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Featured <span className="text-sky-500">Jobs</span>
            </h2>

            <p className="text-slate-500 mt-2">
              Handpicked job oppurtunities from top companies
            </p>
          </div>

          <div className="hidden md:block">
            <button className="px-5 py-1 bg-sky-500 rounded-md text-sm text-zinc-100">
              View more
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {homeJobs.map((item, idx) => (
            <JobCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureJobs;
