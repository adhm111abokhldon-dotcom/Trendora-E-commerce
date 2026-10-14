import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { searchProducts } from "@/api/products";
import flattenProductPages from "@/utils/flattenProductPages";
import LoadMoreButton from "@/components/ui/LoadMoreButton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useI18n } from "@/i18n";

type SearchLayProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SearchLay = ({ isOpen, setIsOpen }: SearchLayProps) => {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [isDebouncing, setIsDebouncing] = useState(false);
  const { t } = useI18n();

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

  // Debounce the query. The query key includes the term, so changing the
  // search resets accumulated results — batches from a previous term are
  // never appended to the new one.
  useEffect(() => {
    const trimmed = input.trim();
    if (!trimmed) {
      setDebouncedInput("");
      setIsDebouncing(false);
      return;
    }
    if (trimmed === debouncedInput) {
      setIsDebouncing(false);
      return;
    }
    setIsDebouncing(true);
    const timer = setTimeout(() => setDebouncedInput(trimmed), 400);
    return () => clearTimeout(timer);
  }, [input, debouncedInput]);

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["searchProducts", debouncedInput],
    queryFn: ({ pageParam }) =>
      searchProducts(debouncedInput, { page: pageParam, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    enabled: isOpen && debouncedInput.length > 0,
  });

  const products = flattenProductPages(data?.pages);
  const isLoadingResults = isDebouncing || isLoading;

  useEffect(() => {
    if (!isOpen) {
      setInput("");
      setDebouncedInput("");
      setIsDebouncing(false);
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
                <button className="text-base-text dark:text-dark-text me-2" aria-label={t("nav.search")}>
                  <AiOutlineSearch className="text-lg" />
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  placeholder={t("nav.searchPlaceholder")}
                  aria-label={t("nav.searchPlaceholder")}
                  className="text-sm bg-transparent flex-1 focus:outline-none
                   text-base-text dark:text-dark-text"
                />

                {isLoadingResults && (
                  <span
                    className="absolute end-4 top-full mt-3 text-xs
                   text-accent animate-pulse"
                  >
                    {t("nav.searching")}
                  </span>
                )}

                {/*  */}
                {!isLoadingResults && products.length > 0 && (
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
                        key={item._id}
                        className="px-4 gap-2 flex py-3 hover:text-accent-trendora dark:hover:bg-border-dark
                        transition text-sm text-base-text dark:text-dark-text"
                      >
                        <img
                          src={item.images[0]}
                          className="w-6 h-full object-cover"
                          alt={item.title}
                        />
                        <Link
                          to={`/products/${item._id}`}
                          className="block w-full truncate "
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                    {(hasNextPage || isFetchingNextPage || isError) && (
                      <li className="px-2 list-none">
                        <LoadMoreButton
                          compact
                          hasMore={hasNextPage}
                          isLoading={isFetchingNextPage}
                          isError={isError}
                          onFetch={() => fetchNextPage()}
                          showEndMessage={false}
                        />
                      </li>
                    )}
                  </motion.ul>
                )}

                {!isLoadingResults && input.trim() && products.length === 0 && (
                  isError ? (
                    <div className="absolute top-full start-4 mt-2">
                      <LoadMoreButton
                        compact
                        hasMore={false}
                        isLoading={false}
                        isError={true}
                        onFetch={() => refetch()}
                        showEndMessage={false}
                      />
                    </div>
                  ) : (
                    <p className="absolute top-full start-4 mt-2 text-xs text-danger">
                      {t("nav.noResults")}
                    </p>
                  )
                )}
              </motion.div>

              <button
                onClick={() => setIsOpen(false)}
                className=" text-base-text dark:text-dark-text 
                hover:text-accent-trendora ms-2 transition flex items-center 
                 justify-center"
                aria-label={t("nav.close")}
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
