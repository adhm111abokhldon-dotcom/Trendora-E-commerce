import { useI18n } from "@/i18n";

type LoadMoreButtonProps = {
  /** Whether another batch exists (from the API `hasMore` flag). */
  hasMore: boolean;
  /** A "load more" request is currently in flight. */
  isLoading: boolean;
  /** The "load more" request failed (initial load errors are handled by the page). */
  isError: boolean;
  /** Fetch the next batch (also used as retry). */
  onFetch: () => void;
  /** Show the localized end-of-results message once everything is loaded. */
  showEndMessage?: boolean;
  /** Smaller variant for constrained UI such as the search dropdown. */
  compact?: boolean;
};

const pillClasses =
  "bg-accent-trendora hover:bg-accent-hover text-base-text px-6 py-3 rounded-full\n  font-semibold text-sm md:text-base shadow-md transition active:scale-95\n  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover\n  focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const LoadMoreButton = ({
  hasMore,
  isLoading,
  isError,
  onFetch,
  showEndMessage = true,
  compact = false,
}: LoadMoreButtonProps) => {
  const { t } = useI18n();

  if (isError) {
    return (
      <div
        className={`flex flex-col items-center gap-3 ${compact ? "py-3" : "pt-8 pb-2"}`}
        role="alert"
      >
        <p className="text-sm text-danger font-medium text-center">
          {t("state.loadMoreError")}
        </p>
        <button
          type="button"
          onClick={onFetch}
          className={`${pillClasses} ${compact ? "!px-4 !py-2 text-xs" : ""}`}
        >
          {t("state.retry")}
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={`flex-center gap-2 text-base-text-muted ${compact ? "py-3" : "pt-8 pb-2"}`}
        aria-live="polite"
      >
        <span
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
        <span className="text-sm font-medium">{t("state.loadingMore")}</span>
      </div>
    );
  }

  if (hasMore) {
    return (
      <div className={`flex-center ${compact ? "py-2" : "pt-8 pb-2"}`}>
        <button
          type="button"
          onClick={onFetch}
          className={`${pillClasses} ${compact ? "!px-4 !py-2 text-xs" : ""}`}
        >
          {t("state.loadMore")}
        </button>
      </div>
    );
  }

  if (!showEndMessage) return null;

  return (
    <p
      className={`text-center text-sm text-base-text-faint ${compact ? "py-3" : "pt-8 pb-2"}`}
      role="status"
    >
      {t("state.noMore")}
    </p>
  );
};

export default LoadMoreButton;
