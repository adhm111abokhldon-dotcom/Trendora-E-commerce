import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const EmptyState = ({ icon, title, desc }) => {
  return (
    <section className="custom-container section-padding bg-base-bg dark:bg-dark-surface">
      <div
        className="min-h-[60vh] flex flex-col pb-10 items-center justify-center text-center 
       "
      >
        <div className="bg-gray-100 dark:bg-zinc-800 p-6 rounded-full mb-4 text-gray-400">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-base-text dark:text-dark-text mb-2">
          {title}
        </h2>
        <p className="text-base-text-faint mb-6 max-w-sm">{desc}</p>
        <Link
          to="/"
          className="bg-accent-trendora hover:bg-accent-hover text-base-text dark:text-dark-text px-6 py-3 
          rounded-full font-medium transition flex items-center gap-2 shadow-md active:scale-95"
        >
          <FaArrowLeft size={14} /> Continue Shopping
        </Link>
      </div>
    </section>
  );
};

export default EmptyState;
