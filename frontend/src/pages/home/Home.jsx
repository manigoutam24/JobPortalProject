import React from "react";
import HeroSection from "../../components/home/HeroSection";
import PopularCategories from "../../components/home/PopularCategories";
import FeatureJobs from "../../components/home/FeatureJobs";
import TopMnc from "../../components/common/TopMnc";
import TopCompanies from "../../components/home/TopCompanies";
import CTA from "../../components/home/CTA";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <>
      <HeroSection />;
      <PopularCategories />;
      <FeatureJobs />
      <TopCompanies />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
