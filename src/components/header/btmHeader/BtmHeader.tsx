import { Dispatch, SetStateAction, useState } from "react";

import { MdMenu as MenuIcon } from "react-icons/md";
import SearchLay from "./SearchLay";
import { AiOutlineSearch } from "react-icons/ai";
import SideMenuNav from "./SideMenuNav";
import { Link } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { useI18n } from "@/i18n";

type BtmHeaderProps = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const BtmHeader = ({ theme, setTheme }: BtmHeaderProps) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useI18n();
  const NavData = [
    { to: "/", title: t("nav.home"), isRoute: true },
    { to: "/categories", title: t("nav.categories"), isRoute: true },
    { to: "#contact-us", title: t("nav.contact"), isRoute: false },
  ];
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
          {NavData.map((item, index) =>
            item.isRoute ? (
              <li key={index} className="hover:text-accent-trendora transition">
                <Link to={item.to}>{item.title}</Link>
              </li>
            ) : (
              <li key={index} className="hover:text-accent-trendora transition">
                <a href={item.to}>{item.title}</a>
              </li>
            ),
          )}
        </ul>
      </div>

      <button
        onClick={() => setIsSideMenuOpen(true)}
        className="md:hidden hover:text-accent-trendora text-base-text dark:text-dark-text text-2xl"
        aria-label={t("nav.menu")}
        aria-expanded={isSideMenuOpen}
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
          <button className="text-base-text dark:text-dark-text p-1" aria-label={t("nav.search")}>
            <AiOutlineSearch className="text-2xl" />
          </button>
          <input
            type="text"
            placeholder={t("nav.searchShort")}
            className="bg-transparent  text-base-text dark:text-dark-text focus:outline-none
           w-full text-lg cursor-pointer"
            readOnly
            aria-label={t("nav.search")}
          />
        </div>

        {/* Mobile Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="rounded-full md:hidden flex items-center justify-center
         hover:bg-accent-trendora  transition  text-base-text dark:text-dark-text"
          aria-label={t("nav.search")}
        >
          <AiOutlineSearch className="text-xl" />
        </button>

        <SearchLay isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
        <SideMenuNav
          isOpen={isSideMenuOpen}
          setIsOpen={setIsSideMenuOpen}
          menuData={NavData}
        />
        {/* Mood */}
        <button
          className="rounded-full flex-center text-base-text text-lg md:text-3xl dark:text-dark-text 
           p-1 border border-border-light dark:border-border-dark"
          onClick={() =>
            theme === "light" ? setTheme("dark") : setTheme("light")
          }
          aria-label={t("nav.theme.toggle")}
        >
          {theme === "light" ? <FaMoon></FaMoon> : <IoIosSunny></IoIosSunny>}
        </button>
      </div>
    </div>
  );
};

export default BtmHeader;
