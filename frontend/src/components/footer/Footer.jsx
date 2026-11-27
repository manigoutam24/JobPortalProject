import React from "react";

// Lucide Icons
import {
  BriefcaseBusiness,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

// React Icons
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-sky-500 text-white mt-16">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <BriefcaseBusiness size={30} />

              <h2 className="text-2xl font-bold">JobPortal</h2>
            </div>

            <p className="text-sm leading-7 text-sky-50 mb-5">
              Find your dream job and build your future with the best companies.
              Your next career opportunity starts here.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-5">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-sky-200 transition"
              >
                <FaFacebookF size={20} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-sky-200 transition"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-sky-200 transition"
              >
                <FaLinkedinIn size={20} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-sky-200 transition"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-5">Quick Links</h3>

            <ul className="space-y-3 text-sm text-sky-50">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/jobs" className="hover:text-white transition">
                  Find Jobs
                </a>
              </li>

              <li>
                <a href="/companies" className="hover:text-white transition">
                  Companies
                </a>
              </li>

              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-lg font-bold mb-5">For Job Seekers</h3>

            <ul className="space-y-3 text-sm text-sky-50">
              <li>
                <a href="/jobs" className="hover:text-white transition">
                  Browse Jobs
                </a>
              </li>

              <li>
                <a href="/register" className="hover:text-white transition">
                  Create Account
                </a>
              </li>

              <li>
                <a href="/login" className="hover:text-white transition">
                  Login
                </a>
              </li>

              <li>
                <a href="/companies" className="hover:text-white transition">
                  Browse Companies
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-5">Contact Us</h3>

            <ul className="space-y-4 text-sm text-sky-50">
              <li className="flex items-start gap-3">
                <MapPin size={19} className="shrink-0" />
                <span>India</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={19} className="shrink-0" />
                <span>support@jobportal.com</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={19} className="shrink-0" />
                <span>+91 98765 43210</span>
              </li>
            </ul>

            <button className="mt-6 flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all">
              Explore Jobs
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-sky-400">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-sky-50">
          <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>

          <div className="flex gap-5">
            <a href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </a>

            <a href="/terms" className="hover:text-white transition">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
