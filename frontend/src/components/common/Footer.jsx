/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-transparent to-background/60">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-indigo-600 flex items-center justify-center text-white">RX</div>
            <div>
              <div className="text-lg font-bold">Work Xplore</div>
              <div className="text-sm text-muted-foreground">Find top talent or your next role.</div>
            </div>
          </Link>
          <div className="mt-4 text-sm text-muted-foreground">© {new Date().getFullYear()} Work Xplore. All rights reserved.</div>
        </div>

        <div className="flex justify-between md:justify-center">
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><Link to="/jobs" className="hover:text-primary">Jobs</Link></li>
              <li><Link to="/browse" className="hover:text-primary">Browse</Link></li>
              <li><Link to="/recruiter/companies" className="hover:text-primary">Companies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><Link to="/plans" className="hover:text-primary">Pricing</Link></li>
              <li><a href="mailto:contact@workxplore.com" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <h4 className="font-semibold mb-3">Stay updated</h4>
          <form className="flex w-full md:w-64" onSubmit={(e)=>e.preventDefault()}>
            <input aria-label="Email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-l-md border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 text-sm" />
            <button className="px-4 py-2 rounded-r-md bg-indigo-600 text-white">Subscribe</button>
          </form>

          <div className="mt-4 flex items-center gap-3">
            <a href="#" aria-label="facebook" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"><Facebook size={16} /></a>
            <a href="#" aria-label="twitter" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"><Twitter size={16} /></a>
            <a href="#" aria-label="linkedin" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"><Linkedin size={16} /></a>
            <a href="mailto:contact@workxplore.com" aria-label="email" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"><Mail size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
