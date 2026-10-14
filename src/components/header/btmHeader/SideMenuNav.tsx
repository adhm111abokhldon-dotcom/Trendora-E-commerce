import { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";

type SideMenuNavProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  menuData: { to: string; title: string; isRoute: boolean }[];
};

const SideMenuNav = ({ isOpen, setIsOpen, menuData }: SideMenuNavProps) => {
  const { t } = useI18n();
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
            ${isOpen ? "start-0" : "-start-full"}`}
      >
        <li className="absolute top-4 end-4 text-2xl">
          <IoClose
            onClick={() => setIsOpen(false)}
            aria-label={t("nav.close")}
            className="cursor-pointer text-base-text
             dark:text-dark-text
             hover:text-accent-trendora transition"
          />
        </li>
        {menuData.map((item, index) =>
          item.isRoute ? (
            <li
              className="w-full cursor-pointer border-b font-medium border-border-light
             dark:border-border-dark  px-5 py-4
             text-base-text hover:text-accent-trendora dark:text-dark-text bg-base-bg
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
          ) : (
            <li
              className="w-full cursor-pointer border-b font-medium border-border-light
             dark:border-border-dark  px-5 py-4
             text-base-text hover:text-accent-trendora dark:text-dark-text bg-base-bg
             hover:bg-slate-100
             dark:bg-dark-surface dark:hover:bg-border-dark"
              key={index}
            >
              <a
                onClick={() => setIsOpen(false)}
                className="block w-full"
                href={item.to}
              >
                {item.title}
              </a>
            </li>
          ),
        )}
      </ul>
    </>,
    document.body,
  );
};

export default SideMenuNav;
