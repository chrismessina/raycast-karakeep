import { Action, ActionPanel, confirmAlert, Detail, Form, Icon, List, useNavigation } from "@raycast/api";
import { useCachedPromise, useForm } from "@raycast/utils";
import { logger } from "@chrismessina/raycast-logger";
import { fetchCreateHighlight, fetchDeleteHighlight, fetchGetAllHighlights, fetchUpdateHighlight } from "./apis";
import { useTranslation } from "./hooks/useTranslation";
import { Highlight } from "./types";
import { runWithToast } from "./utils/toast";

const log = logger.child("[Highlights]");

async function deleteHighlight(id: string, t: (key: string) => string, onSuccess: () => void) {
  if (
    await confirmAlert({
      title: t("highlights.deleteHighlight"),
      message: t("highlights.deleteConfirm"),
    })
  ) {
    log.info("Deleting highlight", { highlightId: id });
    await runWithToast({
      loading: { title: t("highlights.toast.delete.loading") },
      success: { title: t("highlights.toast.delete.success") },
      failure: { title: t("highlights.toast.delete.error") },
      action: async () => {
        await fetchDeleteHighlight(id);
        onSuccess();
        log.info("Highlight deleted", { highlightId: id });
      },
    });
  }
}

function useGetAllHighlights() {
  const { isLoading, data, error, revalidate } = useCachedPromise(async () => {
    const result = await fetchGetAllHighlights();
    return result.highlights || [];
  });

  return { isLoading, highlights: data || [], error, revalidate };
}

interface HighlightFormValues {
  bookmarkId: string;
  text: string;
  startOffset: string;
  endOffset: string;
  note: string;
  color: string;
}

function CreateHighlightForm({ onCreated }: { onCreated: () => void }) {
  const { pop } = useNavigation();
  const { t } = useTranslation();

  const { handleSubmit, itemProps } = useForm<HighlightFormValues>({
    initialValues: { bookmarkId: "", text: "", startOffset: "0", endOffset: "0", note: "", color: "" },
    validation: {
      bookmarkId: (v) => (!v?.trim() ? t("highlights.bookmarkId") + " is required" : undefined),
      text: (v) => (!v?.trim() ? t("highlights.highlightText") + " is required" : undefined),
      startOffset: (v) => (isNaN(Number(v)) ? "Must be a number" : undefined),
      endOffset: (v) => (isNaN(Number(v)) ? "Must be a number" : undefined),
    },
    async onSubmit(values) {
      log.info("Creating highlight", { bookmarkId: values.bookmarkId });
      const result = await runWithToast({
        loading: { title: t("highlights.toast.create.loading") },
        success: { title: t("highlights.toast.create.success") },
        failure: { title: t("highlights.toast.create.error") },
        action: async () => {
          await fetchCreateHighlight({
            bookmarkId: values.bookmarkId.trim(),
            text: values.text.trim(),
            startOffset: Number(values.startOffset),
            endOffset: Number(values.endOffset),
            note: values.note.trim() || undefined,
            color: values.color.trim() || undefined,
          });
          onCreated();
          log.info("Highlight created");
        },
      });
      if (result !== undefined) pop();
    },
  });

  return (
    <Form
      navigationTitle={t("highlights.createHighlight")}
      actions={
        <ActionPanel>
          <Action.SubmitForm title={t("highlights.createHighlight")} onSubmit={handleSubmit} icon={Icon.Plus} />
        </ActionPanel>
      }
    >
      <Form.TextField
        {...itemProps.bookmarkId}
        title={t("highlights.bookmarkId")}
        placeholder={t("highlights.bookmarkIdPlaceholder")}
        autoFocus
      />
      <Form.TextArea
        {...itemProps.text}
        title={t("highlights.highlightText")}
        placeholder={t("highlights.highlightTextPlaceholder")}
      />
      <Form.TextField {...itemProps.startOffset} title={t("highlights.startOffset")} placeholder="0" />
      <Form.TextField {...itemProps.endOffset} title={t("highlights.endOffset")} placeholder="0" />
      <Form.TextField {...itemProps.note} title={t("highlights.note")} placeholder={t("highlights.notePlaceholder")} />
      <Form.TextField
        {...itemProps.color}
        title={t("highlights.color")}
        placeholder={t("highlights.colorPlaceholder")}
      />
    </Form>
  );
}

function EditHighlightForm({ highlight, onUpdated }: { highlight: Highlight; onUpdated: () => void }) {
  const { pop } = useNavigation();
  const { t } = useTranslation();

  const { handleSubmit, itemProps } = useForm<Pick<HighlightFormValues, "text" | "note" | "color">>({
    initialValues: { text: highlight.text, note: highlight.note || "", color: highlight.color || "" },
    validation: {
      text: (v) => (!v?.trim() ? t("highlights.highlightText") + " is required" : undefined),
    },
    async onSubmit(values) {
      log.info("Updating highlight", { highlightId: highlight.id });
      const result = await runWithToast({
        loading: { title: t("highlights.toast.update.loading") },
        success: { title: t("highlights.toast.update.success") },
        failure: { title: t("highlights.toast.update.error") },
        action: async () => {
          await fetchUpdateHighlight(highlight.id, {
            text: values.text.trim(),
            note: values.note.trim() || undefined,
            color: values.color.trim() || undefined,
          });
          onUpdated();
          log.info("Highlight updated", { highlightId: highlight.id });
        },
      });
      if (result !== undefined) pop();
    },
  });

  return (
    <Form
      navigationTitle={t("highlights.editHighlight")}
      actions={
        <ActionPanel>
          <Action.SubmitForm title={t("highlights.editHighlight")} onSubmit={handleSubmit} icon={Icon.Pencil} />
        </ActionPanel>
      }
    >
      <Form.TextArea
        {...itemProps.text}
        title={t("highlights.highlightText")}
        placeholder={t("highlights.highlightTextPlaceholder")}
        autoFocus
      />
      <Form.TextField {...itemProps.note} title={t("highlights.note")} placeholder={t("highlights.notePlaceholder")} />
      <Form.TextField
        {...itemProps.color}
        title={t("highlights.color")}
        placeholder={t("highlights.colorPlaceholder")}
      />
    </Form>
  );
}

function HighlightDetail({ highlight, onRefresh }: { highlight: Highlight; onRefresh: () => void }) {
  const { pop, push } = useNavigation();
  const { t } = useTranslation();

  const handleDelete = () =>
    deleteHighlight(highlight.id, t, () => {
      onRefresh();
      pop();
    });

  const markdown = [
    `### ${highlight.text}`,
    highlight.note ? `\n**Note:** ${highlight.note}` : "",
    highlight.color ? `\n**Color:** ${highlight.color}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <Detail
      markdown={markdown}
      navigationTitle={t("highlights.title")}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title={t("highlights.metadata.bookmarkId")} text={highlight.bookmarkId} />
          <Detail.Metadata.Separator />
          {highlight.note && (
            <>
              <Detail.Metadata.Label title={t("highlights.metadata.note")} text={highlight.note} />
              <Detail.Metadata.Separator />
            </>
          )}
          {highlight.color && (
            <>
              <Detail.Metadata.Label title={t("highlights.metadata.color")} text={highlight.color} />
              <Detail.Metadata.Separator />
            </>
          )}
          {highlight.createdAt && (
            <Detail.Metadata.Label
              title={t("highlights.metadata.createdAt")}
              text={new Date(highlight.createdAt).toLocaleString()}
            />
          )}
        </Detail.Metadata>
      }
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.CopyToClipboard
              content={highlight.text}
              title={t("highlights.actions.copyText")}
              shortcut={{ modifiers: ["cmd"], key: "c" }}
            />
            {highlight.note && (
              <Action.CopyToClipboard
                content={highlight.note}
                title={t("highlights.actions.copyNote")}
                shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
              />
            )}
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action
              title={t("highlights.actions.edit")}
              icon={Icon.Pencil}
              onAction={() => push(<EditHighlightForm highlight={highlight} onUpdated={onRefresh} />)}
              shortcut={{ modifiers: ["cmd"], key: "e" }}
            />
            <Action
              title={t("highlights.actions.delete")}
              icon={Icon.Trash}
              style={Action.Style.Destructive}
              onAction={handleDelete}
              shortcut={{ modifiers: ["ctrl"], key: "x" }}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}

export default function Highlights() {
  const { push } = useNavigation();
  const { t } = useTranslation();
  const { isLoading, highlights, revalidate } = useGetAllHighlights();

  const handleCreateHighlight = () => {
    push(<CreateHighlightForm onCreated={revalidate} />);
  };

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder={t("highlights.searchPlaceholder")}
      actions={
        <ActionPanel>
          <Action
            title={t("highlights.createHighlight")}
            onAction={handleCreateHighlight}
            icon={Icon.Plus}
            shortcut={{ modifiers: ["cmd"], key: "n" }}
          />
        </ActionPanel>
      }
    >
      {!isLoading && highlights.length === 0 && (
        <List.EmptyView
          title={t("highlights.empty.title")}
          description={t("highlights.empty.description")}
          icon={Icon.Highlight}
          actions={
            <ActionPanel>
              <Action
                title={t("highlights.createHighlight")}
                onAction={handleCreateHighlight}
                icon={Icon.Plus}
                shortcut={{ modifiers: ["cmd"], key: "n" }}
              />
            </ActionPanel>
          }
        />
      )}
      {highlights.map((highlight) => (
        <List.Item
          key={highlight.id}
          icon={Icon.Highlight}
          title={highlight.text.slice(0, 80)}
          subtitle={highlight.note}
          accessories={highlight.color ? [{ text: highlight.color }] : []}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <Action
                  title={t("bookmarkItem.actions.viewDetail")}
                  icon={Icon.Sidebar}
                  onAction={() => push(<HighlightDetail highlight={highlight} onRefresh={revalidate} />)}
                  shortcut={{ modifiers: ["cmd"], key: "return" }}
                />
                <Action
                  title={t("highlights.actions.edit")}
                  icon={Icon.Pencil}
                  onAction={() => push(<EditHighlightForm highlight={highlight} onUpdated={revalidate} />)}
                  shortcut={{ modifiers: ["cmd"], key: "e" }}
                />
                <Action
                  title={t("highlights.createHighlight")}
                  onAction={handleCreateHighlight}
                  icon={Icon.Plus}
                  shortcut={{ modifiers: ["cmd"], key: "n" }}
                />
              </ActionPanel.Section>
              <ActionPanel.Section>
                <Action.CopyToClipboard
                  content={highlight.text}
                  title={t("highlights.actions.copyText")}
                  shortcut={{ modifiers: ["cmd"], key: "c" }}
                />
                {highlight.note && (
                  <Action.CopyToClipboard
                    content={highlight.note}
                    title={t("highlights.actions.copyNote")}
                    shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
                  />
                )}
              </ActionPanel.Section>
              <ActionPanel.Section>
                <Action
                  title={t("highlights.actions.delete")}
                  icon={Icon.Trash}
                  style={Action.Style.Destructive}
                  onAction={() => deleteHighlight(highlight.id, t, revalidate)}
                  shortcut={{ modifiers: ["ctrl"], key: "x" }}
                />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
