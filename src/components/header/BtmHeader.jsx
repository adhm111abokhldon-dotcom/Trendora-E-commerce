import React, { useEffect, useState } from "react";

import { MdMenu as MenuIcon } from "react-icons/md";
import SearchLay from "./SearchLay";
import { AiOutlineSearch } from "react-icons/ai";
import SideMenuNav from "./SideMenuNav";
import { Link } from "react-router-dom";

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
     px-6 sm:px-15 max-w-7xl mx-auto h-12 sticky top-0 left-0 z-40 border-b border-border-light
      dark:border-border-dark"
    >
      <div className="max-md:hidden">
        <ul
          className="flex gap-6 h-full text-sm font-medium
         text-base-text dark:text-dark-text"
        >
          {NavData.map((item, index) => (
            <li className="hover:text-accent transition">
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
          className="flex max-md:hidden h-9 w-48 items-center border
         border-border-light dark:border-border-dark hover:border-accent transition
          duration-300 rounded-full bg-base-bg dark:bg-dark-surface px-2 cursor-pointer"
        >
          <button className="text-base-text dark:text-dark-text p-1">
            <AiOutlineSearch className="text-lg" />
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-xs text-base-text dark:text-dark-text focus:outline-none
           w-full cursor-pointer"
            readOnly
          />
        </div>

        {/* Mobile Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="rounded-full md:hidden flex items-center justify-center
         hover:bg-accent  transition h-9 w-9 text-base-text dark:text-dark-text"
        >
          <AiOutlineSearch className="text-xl" />
        </button>

        <SearchLay isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
        <SideMenuNav isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
        <button
          onClick={() =>
            theme === "light" ? setTheme("dark") : setTheme("light")
          }
          className="flex text-base-text dark:text-dark-text"
        >
          Swith Mode
        </button>
      </div>
    </div>
  );
};

export default BtmHeader;
