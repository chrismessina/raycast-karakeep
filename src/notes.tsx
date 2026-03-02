import { Icon, List } from "@raycast/api";
import { logger } from "@chrismessina/raycast-logger";
import { BookmarkList } from "./components/BookmarkList";
import { useGetAllBookmarks } from "./hooks/useGetAllBookmarks";
import { useTranslation } from "./hooks/useTranslation";

const log = logger.child("[Notes]");

export default function Notes() {
  const { t } = useTranslation();
  const { isLoading, bookmarks, revalidate, pagination } = useGetAllBookmarks({ type: "text" });

  log.log("Notes view loaded", { count: bookmarks.length });

  if (isLoading && bookmarks.length === 0) {
    return (
      <List>
        <List.EmptyView title={t("loading")} icon={Icon.Document} description={t("pleaseWait")} />
      </List>
    );
  }

  return (
    <BookmarkList
      bookmarks={bookmarks}
      isLoading={isLoading}
      onRefresh={revalidate}
      pagination={pagination}
      searchBarPlaceholder={t("notes.searchPlaceholder")}
      emptyViewTitle={t("notes.empty.title")}
      emptyViewDescription={t("notes.empty.description")}
      itemLabel={t("notes.title")}
    />
  );
}
