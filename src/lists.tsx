import { Action, ActionPanel, confirmAlert, Form, Icon, List, showToast, Toast, useNavigation } from "@raycast/api";
import { useForm } from "@raycast/utils";
import React, { useCallback, useMemo } from "react";
import { logger } from "@chrismessina/raycast-logger";
import { fetchCreateList, fetchDeleteList, fetchUpdateList } from "./apis";
import { BookmarkList } from "./components/BookmarkList";
import { useConfig } from "./hooks/useConfig";
import { useGetAllBookmarks } from "./hooks/useGetAllBookmarks";
import { useGetAllLists } from "./hooks/useGetAllLists";
import { useGetListsBookmarks } from "./hooks/useGetListsBookmarks";
import { useTranslation } from "./hooks/useTranslation";
import { LIST_ICON_EMOJI_OPTIONS, isEmoji } from "./utils/formatting";
import { runWithToast } from "./utils/toast";

const log = logger.child("[Lists]");

interface ListWithCount {
  id: string;
  name: string;
  icon: string;
  parentId: string | null;
  count: number;
  children?: ListWithCount[];
}

function buildHierarchy(lists: ListWithCount[]): ListWithCount[] {
  const listMap = new Map(lists.map((list) => [list.id, { ...list, children: [] as ListWithCount[] }]));
  const rootLists: ListWithCount[] = [];

  lists.forEach((list) => {
    if (list.parentId === null) {
      rootLists.push(listMap.get(list.id)!);
    } else {
      const parent = listMap.get(list.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(listMap.get(list.id)!);
      }
    }
  });

  return rootLists;
}

function ListBookmarksView({ listId, listName }: { listId: string; listName: string }) {
  const { bookmarks, isLoading, revalidate, pagination } = useGetListsBookmarks(listId);
  const { t } = useTranslation();

  const handleRefresh = async () => {
    await runWithToast({
      loading: { title: t("refreshingLists"), message: t("pleaseWait") },
      success: { title: t("listsRefreshed") },
      failure: { title: t("refreshError") },
      action: async () => {
        try {
          log.log("Refreshing list bookmarks", { listId, listName });
          await revalidate();
          log.info("List bookmarks refreshed", { listId });
        } catch (error) {
          log.error("Failed to refresh list bookmarks", { listId, listName, error });
          throw error;
        }
      },
    });
  };

  return (
    <BookmarkList
      bookmarks={bookmarks}
      isLoading={isLoading}
      onRefresh={handleRefresh}
      pagination={pagination}
      searchBarPlaceholder={t("list.searchInList", { name: listName })}
      emptyViewTitle={t("list.noBookmarks.title")}
      emptyViewDescription={t("list.noBookmarks.description")}
    />
  );
}

function ArchivedBookmarks() {
  const { bookmarks, isLoading, revalidate, pagination } = useGetAllBookmarks({
    archived: true,
  });
  const { t } = useTranslation();

  return (
    <BookmarkList
      bookmarks={bookmarks}
      isLoading={isLoading}
      onRefresh={revalidate}
      pagination={pagination}
      searchBarPlaceholder={t("list.searchInArchived")}
      emptyViewTitle={t("list.noArchived.title")}
      emptyViewDescription={t("list.noArchived.description")}
    />
  );
}

function FavoritedBookmarks() {
  const { bookmarks, isLoading, revalidate, pagination } = useGetAllBookmarks({
    favourited: true,
  });
  const { t } = useTranslation();
  return (
    <BookmarkList
      bookmarks={bookmarks}
      isLoading={isLoading}
      onRefresh={revalidate}
      pagination={pagination}
      searchBarPlaceholder={t("list.searchInFavorites")}
      emptyViewTitle={t("list.noFavorites.title")}
      emptyViewDescription={t("list.noFavorites.description")}
    />
  );
}

interface ListFormValues {
  name: string;
  icon: string;
}

function getIconOptions(currentIcon?: string) {
  const normalizedIcon = currentIcon?.trim();
  if (!normalizedIcon || LIST_ICON_EMOJI_OPTIONS.some((option) => option.value === normalizedIcon)) {
    return LIST_ICON_EMOJI_OPTIONS;
  }

  return [{ value: normalizedIcon, title: `${normalizedIcon} (Current)` }, ...LIST_ICON_EMOJI_OPTIONS];
}

function CreateListForm({ onCreated }: { onCreated: () => void }) {
  const { pop } = useNavigation();
  const { t } = useTranslation();

  const { handleSubmit, itemProps } = useForm<ListFormValues>({
    initialValues: { name: "", icon: "" },
    validation: {
      name: (value) => (!value?.trim() ? t("list.listName") + " is required" : undefined),
      icon: (value) => (!isEmoji(value || "") ? "Must be a valid emoji" : undefined),
    },
    async onSubmit(values) {
      log.info("Creating list", { name: values.name });
      await runWithToast({
        loading: { title: t("list.toast.create.loading") },
        success: { title: t("list.toast.create.success") },
        failure: { title: t("list.toast.create.error") },
        action: async () => {
          await fetchCreateList({ name: values.name.trim(), icon: values.icon.trim() || undefined });
          onCreated();
          log.info("List created", { name: values.name });
        },
      });
      pop();
    },
  });

  return (
    <Form
      navigationTitle={t("list.createList")}
      actions={
        <ActionPanel>
          <Action.SubmitForm title={t("list.createList")} onSubmit={handleSubmit} icon={Icon.Plus} />
        </ActionPanel>
      }
    >
      <Form.TextField
        {...itemProps.name}
        title={t("list.listName")}
        placeholder={t("list.listNamePlaceholder")}
        autoFocus
      />
      <Form.Dropdown {...itemProps.icon} title={t("list.listIcon")}>
        <Form.Dropdown.Item value="" title={t("list.noIcon")} />
        {getIconOptions().map((option) => (
          <Form.Dropdown.Item key={option.value} value={option.value} title={option.title} icon={option.value} />
        ))}
      </Form.Dropdown>
    </Form>
  );
}

function EditListForm({ list, onUpdated }: { list: ListWithCount; onUpdated: () => void }) {
  const { pop } = useNavigation();
  const { t } = useTranslation();

  const { handleSubmit, itemProps } = useForm<ListFormValues>({
    initialValues: { name: list.name, icon: list.icon || "" },
    validation: {
      name: (value) => (!value?.trim() ? t("list.listName") + " is required" : undefined),
      icon: (value) => (!isEmoji(value || "") ? "Must be a valid emoji" : undefined),
    },
    async onSubmit(values) {
      log.info("Updating list", { listId: list.id, name: values.name });
      await runWithToast({
        loading: { title: t("list.toast.update.loading") },
        success: { title: t("list.toast.update.success") },
        failure: { title: t("list.toast.update.error") },
        action: async () => {
          await fetchUpdateList(list.id, { name: values.name.trim(), icon: values.icon.trim() || undefined });
          onUpdated();
          log.info("List updated", { listId: list.id });
        },
      });
      pop();
    },
  });

  return (
    <Form
      navigationTitle={t("list.editList")}
      actions={
        <ActionPanel>
          <Action.SubmitForm title={t("list.editList")} onSubmit={handleSubmit} icon={Icon.Pencil} />
        </ActionPanel>
      }
    >
      <Form.TextField
        {...itemProps.name}
        title={t("list.listName")}
        placeholder={t("list.listNamePlaceholder")}
        autoFocus
      />
      <Form.Dropdown {...itemProps.icon} title={t("list.listIcon")}>
        <Form.Dropdown.Item value="" title={t("list.noIcon")} />
        {getIconOptions(list.icon).map((option) => (
          <Form.Dropdown.Item key={option.value} value={option.value} title={option.title} icon={option.value} />
        ))}
      </Form.Dropdown>
    </Form>
  );
}

const getDashboardListsPage = (apiUrl: string, listId: string) => `${apiUrl}/dashboard/lists/${listId}`;

interface ListItemProps {
  list: ListWithCount;
  level: number;
  apiUrl: string;
  onOpen: (list: ListWithCount) => void;
  onEdit: (list: ListWithCount) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  t: (key: string) => string;
}

function ListItem({ list, level, apiUrl, onOpen, onEdit, onCreate, onDelete, t }: ListItemProps) {
  return (
    <List.Item
      key={list.id}
      icon={list.icon}
      title={`${"  ".repeat(level)}${list.name} (${list.count})`}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action
              title={t("list.openList")}
              onAction={() => onOpen(list)}
              icon={Icon.List}
              shortcut={{ modifiers: ["cmd"], key: "return" }}
            />
            <Action
              title={t("list.editList")}
              onAction={() => onEdit(list)}
              icon={Icon.Pencil}
              shortcut={{ modifiers: ["cmd"], key: "e" }}
            />
            <Action
              title={t("list.createList")}
              onAction={onCreate}
              icon={Icon.Plus}
              shortcut={{ modifiers: ["cmd"], key: "n" }}
            />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action.OpenInBrowser url={getDashboardListsPage(apiUrl, list.id)} title={t("common.viewInBrowser")} />
            <Action.CopyToClipboard
              title={t("common.copyId")}
              content={list.id}
              shortcut={{ modifiers: ["cmd"], key: "." }}
            />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action
              title={t("list.deleteList")}
              icon={Icon.Trash}
              style={Action.Style.Destructive}
              onAction={() => onDelete(list.id)}
              shortcut={{ modifiers: ["ctrl"], key: "x" }}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}

export default function Lists() {
  const { isLoading, lists, revalidate } = useGetAllLists();
  const { push } = useNavigation();
  const { config } = useConfig();
  const { t } = useTranslation();
  const { apiUrl } = config;

  const handleDeleteList = useCallback(
    async (id: string) => {
      const list = lists?.find((list) => list.id === id);
      const listName = list?.name;

      if (
        await confirmAlert({
          title: t("list.deleteList"),
          message: t("list.deleteConfirm", { name: listName || "" }),
        })
      ) {
        await runWithToast({
          loading: { title: t("common.deleting") },
          success: { title: t("common.deleteSuccess") },
          failure: { title: t("common.deleteFailed") },
          action: async () => {
            try {
              log.info("Deleting list", { listId: id, listName });
              await fetchDeleteList(id);
              await revalidate();
              log.info("List deleted", { listId: id });
            } catch (error) {
              log.error("Failed to delete list", { listId: id, listName, error });
              throw error;
            }
          },
        });
      } else {
        await showToast({
          title: t("common.deleteCancel"),
          style: Toast.Style.Failure,
        });
      }
    },
    [lists, revalidate, t],
  );

  const handleShowFavoritedBookmarks = useCallback(() => {
    push(<FavoritedBookmarks />);
  }, [push]);

  const handleShowArchivedBookmarks = useCallback(() => {
    push(<ArchivedBookmarks />);
  }, [push]);

  const handleCreateList = useCallback(() => {
    push(<CreateListForm onCreated={revalidate} />);
  }, [push, revalidate]);

  const hierarchicalLists = useMemo(() => (lists ? buildHierarchy(lists as ListWithCount[]) : []), [lists]);

  const renderListItems = useCallback(
    (items: ListWithCount[], level = 0): React.ReactElement[] => {
      return items.flatMap((list) => {
        const result: React.ReactElement[] = [
          <ListItem
            key={list.id}
            list={list}
            level={level}
            apiUrl={apiUrl}
            onOpen={(l) => push(<ListBookmarksView listId={l.id} listName={l.name} />)}
            onEdit={(l) => push(<EditListForm list={l} onUpdated={revalidate} />)}
            onCreate={handleCreateList}
            onDelete={handleDeleteList}
            t={t}
          />,
        ];
        if (list.children?.length) {
          result.push(...renderListItems(list.children, level + 1));
        }
        return result;
      });
    },
    [apiUrl, push, revalidate, handleCreateList, handleDeleteList, t],
  );

  return (
    <List
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action
            title={t("list.createList")}
            onAction={handleCreateList}
            icon={Icon.Plus}
            shortcut={{ modifiers: ["cmd"], key: "n" }}
          />
        </ActionPanel>
      }
    >
      {!isLoading && lists.length === 0 && (
        <List.EmptyView
          title={t("list.empty.title")}
          description={t("list.empty.description")}
          icon={Icon.List}
          actions={
            <ActionPanel>
              <Action
                title={t("list.createList")}
                onAction={handleCreateList}
                icon={Icon.Plus}
                shortcut={{ modifiers: ["cmd"], key: "n" }}
              />
            </ActionPanel>
          }
        />
      )}
      <List.Item
        icon="⭐️"
        title={t("list.favorites")}
        actions={
          <ActionPanel>
            <Action
              title={t("list.openFavorites")}
              onAction={handleShowFavoritedBookmarks}
              icon={Icon.List}
              shortcut={{ modifiers: ["cmd"], key: "return" }}
            />
            <Action.OpenInBrowser url={`${apiUrl}/dashboard/favourites`} title={t("common.viewInBrowser")} />
            <Action
              title={t("list.createList")}
              onAction={handleCreateList}
              icon={Icon.Plus}
              shortcut={{ modifiers: ["cmd"], key: "n" }}
            />
          </ActionPanel>
        }
      />
      <List.Item
        icon="📦"
        title={t("list.archived")}
        actions={
          <ActionPanel>
            <Action
              title={t("list.openArchived")}
              onAction={handleShowArchivedBookmarks}
              icon={Icon.List}
              shortcut={{ modifiers: ["cmd"], key: "return" }}
            />
            <Action.OpenInBrowser url={`${apiUrl}/dashboard/archive`} title={t("common.viewInBrowser")} />
            <Action
              title={t("list.createList")}
              onAction={handleCreateList}
              icon={Icon.Plus}
              shortcut={{ modifiers: ["cmd"], key: "n" }}
            />
          </ActionPanel>
        }
      />
      {renderListItems(hierarchicalLists)}
    </List>
  );
}
