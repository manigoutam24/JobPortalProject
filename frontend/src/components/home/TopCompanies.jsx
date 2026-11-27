import React from "react";
import mncCompany from "../../assets/data/mncCompanies";
import TopMnc from "../common/TopMnc";

const TopCompanies = () => {
  const topCompanies = mncCompany.slice(0, 4);
  return (
    <div className="w-full px-5 md:px-10 lg:px-16 py-3 pb-10">
      <div className="max-w-350 mx-auto">
        <div className="text-center mb-5 flex justify-between mx-5">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Top <span className="text-sky-500">Companies</span>
            </h2>

            <p className="text-slate-500 mt-2">
              Discover jobs from leading companies
            </p>
          </div>

          <div className="hidden md:block">
            <button className="px-5 py-1 bg-sky-500 rounded-md text-sm text-zinc-100">
              View more
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mb-5">
          {topCompanies.map((item, idx) => (
            <TopMnc item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCompanies;
