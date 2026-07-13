import React, { useEffect, useState } from "react";

import { MdMenu as MenuIcon } from "react-icons/md";
import SearchLay from "./SearchLay";
import { AiOutlineSearch } from "react-icons/ai";
import SideMenuNav from "./SideMenuNav";
import { Link } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";

const BtmHeader = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const NavData = [
    { to: "/", title: "Home" },
    { to: "/categories", title: "Categories" },
    { to: "/contact-us", title: "Contact Us" },
    { to: "/shop", title: "Shop All" },
  ];
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  return (
    <div
      className="bg-base-bg/80 dark:bg-dark-bg backdrop-blur-md flex justify-between items-center
     px-6 sm:px-15 max-w-7xl mx-auto h-12 md:h-15 sticky top-0 left-0 z-40 border-b border-border-light
      dark:border-border-dark"
    >
      <div className="max-md:hidden">
        <ul
          className="flex gap-6 h-full text-base lg:text-xl 
          font-medium
         text-base-text dark:text-dark-text"
        >
          {NavData.map((item, index) => (
            <li className="hover:text-accent-trendora transition">
              <Link to={item.to}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => setIsSideMenuOpen(true)}
        className="md:hidden hover:text-accent text-base-text dark:text-dark-text text-2xl"
      >
        <MenuIcon />
      </button>

      <div className="flex items-center gap-2">
        {/* Desktop Search Bar */}
        <div
          onClick={() => setIsSearchOpen(true)}
          className="flex max-md:hidden h-12 w-60 items-center border
         border-border-light dark:border-border-dark hover:border-accent-trendora transition
          duration-300 rounded-full bg-base-bg dark:bg-dark-surface px-2 cursor-pointer"
        >
          <button className="text-base-text dark:text-dark-text p-1">
            <AiOutlineSearch className="text-2xl" />
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent  text-base-text dark:text-dark-text focus:outline-none
           w-full text-lg cursor-pointer"
            readOnly
          />
        </div>

        {/* Mobile Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="rounded-full md:hidden flex items-center justify-center
         hover:bg-accent-trendora  transition  text-base-text dark:text-dark-text"
        >
          <AiOutlineSearch className="text-xl" />
        </button>

        <SearchLay isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
        <SideMenuNav isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
        {/* Mood */}
        <button
          className="rounded-full flex-center text-base-text text-lg md:text-3xl dark:text-dark-text 
           p-1 border border-accent-trendora"
          onClick={() =>
            theme === "light" ? setTheme("dark") : setTheme("light")
          }
        >
          {theme === "light" ? <FaMoon></FaMoon> : <IoIosSunny></IoIosSunny>}
        </button>
      </div>
    </div>
  );
};

export default BtmHeader;
