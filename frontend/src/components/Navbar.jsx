import ashokLogo from "../assets/ashok_stambh.png";
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Main navbar */}
      <div className="bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-300 text-white shadow-md">
        <div className="mx-auto max-w-screen-xl px-4 py-3 lg:py-5 grid grid-cols-12 gap-4 items-center h-30">
          {/* Brand */}
          <div className="col-span-12 md:col-span-4 flex items-center gap-3">
            <img src={ashokLogo} alt="Ashoka Stambh" className="h-24 w-25 object-contain -my-2" /> {/* LOGO placeholder */}
            <div className="leading-tight">
              <div className="text-sm tracking-wide opacity-90">West Bengal</div>
              <div className="text-xl font-bold">eSahayak</div>
            </div>
          </div>

          {/* Search */}
          <div className="col-span-12 md:col-span-5">
            <label className="sr-only" htmlFor="search">Search</label>
            <div className="flex rounded-full bg-white/95 overflow-hidden shadow-inner">
              <span className="px-3 py-2 text-slate-500">
                {/* search icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21l-4.3-4.3m1.3-5.2a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                id="search"
                placeholder="Search Service or Scheme"
                className="flex-1 px-2 py-2 text-slate-800 outline-none placeholder-slate-500"
              />
              <button className="px-4 text-white bg-sky-600 hover:bg-sky-700">
                Search
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="col-span-12 md:col-span-3 flex md:justify-end gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-white text-sky-700 font-semibold hover:bg-slate-100"
            >
              LOGIN / SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}