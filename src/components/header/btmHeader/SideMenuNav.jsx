import React from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const SideMenuNav = ({ isOpen, setIsOpen }) => {
  const menuData = [
    { to: "/", title: "Home" },
    { to: "/categories", title: "Categories" },
    { to: "/contact-us", title: "Contact Us" },
    { to: "/shop", title: "Shop All" },
  ];
  return createPortal(
    <>
      {/* Overlay behind side menu */}
      {isOpen && (
        <div
          className="fixed inset-0 top-0 h-screen w-screen
           bg-slate-900/30 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <ul
        className={`fixed top-0 bottom-0 z-50 h-screen w-72 max-w-[80vw]
           bg-base-bg dark:bg-dark-bg pt-16 flex flex-col shadow-2xl transition-all 
           duration-300 md:hidden
            ${isOpen ? "left-0" : "-left-full"}`}
      >
        <li className="absolute top-4 right-4 text-2xl">
          <IoClose
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-base-text
             dark:text-dark-text
             hover:text-accent transition"
          />
        </li>
        {menuData.map((item, index) => (
          <li
            className="w-full cursor-pointer border-b font-medium border-border-light
             dark:border-border-dark  px-5 py-4
             text-base-text hover:text-accent dark:text-dark-text bg-base-bg
             hover:bg-slate-100
             dark:bg-dark-surface dark:hover:bg-border-dark"
            key={index}
          >
            <Link
              onClick={() => setIsOpen(false)}
              className="block w-full"
              to={item.to}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>,
    document.body,
  );
};

export default SideMenuNav;
