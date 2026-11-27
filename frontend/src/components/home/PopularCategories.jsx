import React from "react";
import categories from "../../assets/data/categoriesData";

const PopularCategories = () => {
  const homeCategories = categories.slice(0, 6);
  return (
    <section className="w-full px-5 md:px-10 lg:px-16 py-16">
      <div className="max-w-350 mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10 flex justify-between mx-5">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Popular <span className="text-sky-500">Categories</span>
            </h2>

            <p className="text-slate-500 mt-2">
              Explore jobs from top categories
            </p>
          </div>
          <div className="hidden md:block">
            <button className="px-5 py-1 bg-sky-500 rounded-md text-sm text-zinc-100">
              View more
            </button>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {homeCategories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.id}
                className="group flex flex-col items-center text-center gap-3 p-7 border border-slate-200 rounded-2xl bg-white hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100 transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-sky-100 text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                  <Icon size={32} strokeWidth={2} />
                </div>

                <h3 className="text-base font-bold text-slate-900 min-h-12 flex items-center justify-center">
                  {category.name}
                </h3>

                <p className="text-sm text-slate-500">{category.jobs} Jobs</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
