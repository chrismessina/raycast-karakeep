import { Action, ActionPanel, confirmAlert, Icon, List, open } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { logger } from "@chrismessina/raycast-logger";
import { fetchCreateBackup, fetchDeleteBackup, fetchGetAllBackups, fetchGetBackupDownloadUrl } from "./apis";
import { useTranslation } from "./hooks/useTranslation";
import { runWithToast } from "./utils/toast";

const log = logger.child("[Backups]");

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

export default function Backups() {
  const { t } = useTranslation();
  const { isLoading, data, revalidate } = useCachedPromise(async () => {
    log.log("Fetching backups");
    const result = await fetchGetAllBackups();
    log.info("Backups fetched", { count: result.backups?.length ?? 0 });
    return result.backups || [];
  });

  const backups = data || [];

  async function handleCreate() {
    await runWithToast({
      loading: { title: t("backups.toast.create.loading") },
      success: { title: t("backups.toast.create.success") },
      failure: { title: t("backups.toast.create.error") },
      action: async () => {
        await fetchCreateBackup();
        log.info("Backup created");
        await revalidate();
      },
    });
  }

  async function handleDelete(id: string) {
    if (
      await confirmAlert({
        title: t("backups.deleteBackup"),
        message: t("backups.deleteConfirm"),
      })
    ) {
      await runWithToast({
        loading: { title: t("backups.toast.delete.loading") },
        success: { title: t("backups.toast.delete.success") },
        failure: { title: t("backups.toast.delete.error") },
        action: async () => {
          await fetchDeleteBackup(id);
          log.info("Backup deleted", { backupId: id });
          await revalidate();
        },
      });
    }
  }

  async function handleDownload(id: string) {
    const url = await fetchGetBackupDownloadUrl(id);
    await open(url);
  }

  const createAction = (
    <Action
      title={t("backups.createBackup")}
      icon={Icon.Plus}
      onAction={handleCreate}
      shortcut={{ modifiers: ["cmd"], key: "n" }}
    />
  );

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder={t("backups.searchPlaceholder")}
      actions={<ActionPanel>{createAction}</ActionPanel>}
    >
      {!isLoading && backups.length === 0 && (
        <List.EmptyView
          title={t("backups.empty.title")}
          description={t("backups.empty.description")}
          icon={Icon.HardDrive}
          actions={<ActionPanel>{createAction}</ActionPanel>}
        />
      )}
      {backups.map((backup) => {
        const date = new Date(backup.createdAt).toLocaleString();
        const accessories: List.Item.Accessory[] = [{ text: date, icon: Icon.Clock }];
        if (backup.size) accessories.unshift({ text: formatBytes(backup.size) });
        if (backup.status) accessories.unshift({ tag: backup.status });

        return (
          <List.Item
            key={backup.id}
            icon={Icon.HardDrive}
            title={date}
            subtitle={backup.size ? formatBytes(backup.size) : undefined}
            accessories={accessories}
            actions={
              <ActionPanel>
                <ActionPanel.Section>
                  <Action
                    title={t("backups.downloadBackup")}
                    icon={Icon.Download}
                    onAction={() => handleDownload(backup.id)}
                  />
                  {createAction}
                </ActionPanel.Section>
                <ActionPanel.Section>
                  <Action
                    title={t("backups.deleteBackup")}
                    icon={Icon.Trash}
                    style={Action.Style.Destructive}
                    onAction={() => handleDelete(backup.id)}
                    shortcut={{ modifiers: ["ctrl"], key: "x" }}
                  />
                </ActionPanel.Section>
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
