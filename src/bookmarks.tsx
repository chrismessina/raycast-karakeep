import { Icon, List } from "@raycast/api";
import { useCallback } from "react";
import { logger } from "@chrismessina/raycast-logger";
import { BookmarkList } from "./components/BookmarkList";

const log = logger.child("[Bookmarks]");
import { useGetAllBookmarks } from "./hooks/useGetAllBookmarks";
import { useTranslation } from "./hooks/useTranslation";
import { runWithToast } from "./utils/toast";

export default function BookmarksList() {
  const { t } = useTranslation();
  const { isLoading, bookmarks, revalidate, pagination } = useGetAllBookmarks();

  const handleRefresh = useCallback(async () => {
    await runWithToast({
      loading: { title: t("refreshingBookmarks"), message: t("pleaseWait") },
      success: { title: t("bookmarksRefreshed") },
      failure: { title: t("refreshError") },
      action: async () => {
        try {
          log.log("Refreshing bookmarks");
          await revalidate();
          log.info("Bookmarks refreshed");
        } catch (error) {
          log.error("Failed to refresh bookmarks", { error });
          throw error;
        }
      },
    });
  }, [t, revalidate]);

  if (isLoading && bookmarks.length === 0) {
    return (
      <List>
        <List.EmptyView title={t("loading")} icon={Icon.Bookmark} description={t("pleaseWait")} />
      </List>
    );
  }

  return (
    <BookmarkList
      bookmarks={bookmarks}
      isLoading={isLoading}
      onRefresh={handleRefresh}
      pagination={pagination}
      searchBarPlaceholder={t("searchBookmarks")}
      emptyViewTitle={t("bookmarkList.emptySearch.title")}
      emptyViewDescription={t("bookmarkList.emptySearch.description")}
    />
  );
}
