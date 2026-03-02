import { Detail, Icon } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { logger } from "@chrismessina/raycast-logger";
import { fetchGetUserStats } from "./apis";
import { useTranslation } from "./hooks/useTranslation";

const log = logger.child("[Stats]");

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

export default function Stats() {
  const { t } = useTranslation();
  const {
    isLoading,
    data: stats,
    error,
  } = useCachedPromise(async () => {
    log.log("Fetching user stats");
    const result = await fetchGetUserStats();
    log.info("User stats fetched");
    return result;
  });

  if (isLoading) {
    return <Detail isLoading navigationTitle={t("stats.title")} markdown="" />;
  }

  if (error || !stats) {
    return (
      <Detail
        navigationTitle={t("stats.title")}
        markdown={`# ${t("stats.empty.title")}\n\n${t("stats.empty.description")}`}
      />
    );
  }

  const topDomains = (stats.topDomains || []).slice(0, 10);
  const topTags = (stats.tagUsage || []).slice(0, 10);

  const markdown = [
    `# ${t("stats.title")}`,
    "",
    `## ${t("stats.overview")}`,
    "",
    `| | |`,
    `|---|---|`,
    `| ${t("stats.bookmarks")} | **${stats.numBookmarks}** |`,
    `| ${t("stats.favorites")} | **${stats.numFavorites}** |`,
    `| ${t("stats.archived")} | **${stats.numArchived}** |`,
    `| ${t("stats.tags")} | **${stats.numTags}** |`,
    `| ${t("stats.lists")} | **${stats.numLists}** |`,
    `| ${t("stats.highlights")} | **${stats.numHighlights}** |`,
    "",
    `## ${t("stats.byType")}`,
    "",
    `| | |`,
    `|---|---|`,
    `| ${t("stats.links")} | **${stats.bookmarksByType?.link ?? 0}** |`,
    `| ${t("stats.notes")} | **${stats.bookmarksByType?.text ?? 0}** |`,
    `| ${t("stats.assets")} | **${stats.bookmarksByType?.asset ?? 0}** |`,
    "",
    `## ${t("stats.activity")}`,
    "",
    `| | |`,
    `|---|---|`,
    `| ${t("stats.thisWeek")} | **${stats.bookmarkingActivity?.thisWeek ?? 0}** |`,
    `| ${t("stats.thisMonth")} | **${stats.bookmarkingActivity?.thisMonth ?? 0}** |`,
    `| ${t("stats.thisYear")} | **${stats.bookmarkingActivity?.thisYear ?? 0}** |`,
    ...(topDomains.length > 0
      ? [
          "",
          `## ${t("stats.topDomains")}`,
          "",
          `| Domain | Count |`,
          `|---|---|`,
          ...topDomains.map((d) => `| ${d.domain} | ${d.count} |`),
        ]
      : []),
    ...(topTags.length > 0
      ? [
          "",
          `## ${t("stats.topTags")}`,
          "",
          `| Tag | Count |`,
          `|---|---|`,
          ...topTags.map((tag) => `| ${tag.name} | ${tag.count} |`),
        ]
      : []),
    ...(stats.totalAssetSize > 0
      ? [
          "",
          `## ${t("stats.storage")}`,
          "",
          `| | |`,
          `|---|---|`,
          `| ${t("stats.totalAssetSize")} | **${formatBytes(stats.totalAssetSize)}** |`,
          ...(stats.assetsByType || []).map((a) => `| ${a.type} | ${a.count} files · ${formatBytes(a.totalSize)} |`),
        ]
      : []),
  ].join("\n");

  return (
    <Detail
      isLoading={isLoading}
      navigationTitle={t("stats.title")}
      markdown={markdown}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title={t("stats.bookmarks")} text={String(stats.numBookmarks)} icon={Icon.Bookmark} />
          <Detail.Metadata.Label title={t("stats.favorites")} text={String(stats.numFavorites)} icon={Icon.Star} />
          <Detail.Metadata.Label title={t("stats.archived")} text={String(stats.numArchived)} icon={Icon.Tray} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label
            title={t("stats.links")}
            text={String(stats.bookmarksByType?.link ?? 0)}
            icon={Icon.Link}
          />
          <Detail.Metadata.Label
            title={t("stats.notes")}
            text={String(stats.bookmarksByType?.text ?? 0)}
            icon={Icon.Document}
          />
          <Detail.Metadata.Label
            title={t("stats.assets")}
            text={String(stats.bookmarksByType?.asset ?? 0)}
            icon={Icon.Image}
          />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label title={t("stats.tags")} text={String(stats.numTags)} icon={Icon.Tag} />
          <Detail.Metadata.Label title={t("stats.lists")} text={String(stats.numLists)} icon={Icon.List} />
          <Detail.Metadata.Label
            title={t("stats.highlights")}
            text={String(stats.numHighlights)}
            icon={Icon.Highlight}
          />
          {stats.totalAssetSize > 0 && (
            <>
              <Detail.Metadata.Separator />
              <Detail.Metadata.Label
                title={t("stats.totalAssetSize")}
                text={formatBytes(stats.totalAssetSize)}
                icon={Icon.HardDrive}
              />
            </>
          )}
        </Detail.Metadata>
      }
    />
  );
}
