import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Product } from "@/types/ecommerce";

type SearchLayProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SearchLay = ({ isOpen, setIsOpen }: SearchLayProps) => {
  const [input, setInput] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const variants = {
    initial: { y: "-10%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-10%", opacity: 0 },
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    if (!input.trim()) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(() => {
      fetch(`https://dummyjson.com/products/search?q=${input}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products || []);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setProducts([]);
        })
        .finally(() => setIsLoading(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [input]);

  //
  useEffect(() => {
    if (!isOpen) {
      setInput("");
      setProducts([]);
    }
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop layer */}
          <div
            className="fixed inset-0 h-screen bg-slate-900/40 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="fixed shadow-2xl overflow-visible px-6 z-50 top-0 left-0 w-full h-auto
             min-h-[40vh] bg-base-bg dark:bg-dark-bg border-b border-border-light dark:border-border-dark pb-8"
          >
            <div className="flex pt-4 w-full justify-between items-center max-w-7xl mx-auto">
              <h2
                className="max-sm:hidden bg-linear-to-r from-slate-900 to-amber-600 dark:from-white 
        dark:via-slate-700 dark:to-amber-600 bg-clip-text text-transparent
               text-2xl font-bold"
              >
                Trendora
              </h2>

              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex h-10 relative flex-1 sm:mx-8 max-w-xl items-center border
                 border-border-light dark:border-border-dark focus-within:border-accent-trendora 
                 transition duration-300 rounded-full bg-base-bg dark:bg-dark-surface
                  px-3"
              >
                <button className="text-base-text dark:text-dark-text mr-2">
                  <AiOutlineSearch className="text-lg" />
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  placeholder="Search for products..."
                  className="text-sm bg-transparent flex-1 focus:outline-none
                   text-base-text dark:text-dark-text"
                />

                {/*  */}
                {isLoading && (
                  <span
                    className="absolute right-4 top-full mt-3 text-xs
                   text-accent animate-pulse"
                  >
                    Searching...
                  </span>
                )}

                {/*  */}
                {!isLoading && products.length > 0 && (
                  <motion.ul
                    initial={{ y: "10%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "10%", opacity: 0 }}
                    className="absolute flex flex-col top-full left-0 
                    mt-2 w-full max-h-60 overflow-y-auto bg-base-bg dark:bg-dark-surface border
                     border-slate-100 rounded-2xl shadow-xl divide-y divide-slate-50 z-50"
                  >
                    {products.map((item) => (
                      <li
                        key={item.id}
                        className="px-4 gap-2 flex py-3 hover:text-accent-trendora dark:hover:bg-border-dark
                        transition text-sm text-base-text dark:text-dark-text"
                      >
                        <img
                          src={item.images[0]}
                          className="w-6 h-full object-cover"
                          alt={item.title}
                        />
                        <Link
                          to={`/products/${item.id}`}
                          className="block w-full truncate "
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}

                {/*  */}
                {!isLoading && input && products.length === 0 && (
                  <p className="absolute top-full left-4 mt-2 text-xs text-danger">
                    No products found.
                  </p>
                )}
              </motion.div>

              <button
                onClick={() => setIsOpen(false)}
                className=" text-base-text dark:text-dark-text 
                hover:text-accent-trendora ms-2 transition flex items-center 
                 justify-center"
              >
                <IoClose className="text-4xl" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default SearchLay;
