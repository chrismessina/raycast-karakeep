import { Action, ActionPanel, Form, Icon, closeMainWindow, useNavigation } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { logger } from "@chrismessina/raycast-logger";
import { fetchCreateList } from "./apis";
import { useGetAllLists } from "./hooks/useGetAllLists";
import { useTranslation } from "./hooks/useTranslation";
import { isEmoji } from "./utils/formatting";
import { runWithToast } from "./utils/toast";

const log = logger.child("[CreateList]");

interface ListFormValues {
  name: string;
  icon: string;
  description: string;
  parentId: string;
  type: "manual" | "smart";
  query: string;
}

export default function CreateListView() {
  const { pop } = useNavigation();
  const { t } = useTranslation();
  const { lists } = useGetAllLists();

  const { handleSubmit, itemProps, values } = useForm<ListFormValues>({
    initialValues: { name: "", icon: "", description: "", parentId: "", type: "manual", query: "" },
    validation: {
      name: (value) => (!value?.trim() ? t("list.listName") + " is required" : undefined),
      icon: (value) => (!isEmoji(value || "") ? "Must be a valid emoji" : undefined),
      query: (value, allValues) =>
        allValues?.type === "smart" && !value?.trim() ? t("list.listQuery") + " is required" : undefined,
    },
    async onSubmit(values) {
      log.info("Creating list", { name: values.name, type: values.type });

      try {
        await runWithToast({
          loading: { title: t("list.toast.create.loading") },
          success: { title: t("list.toast.create.success") },
          failure: { title: t("list.toast.create.error") },
          action: async () => {
            await fetchCreateList({
              name: values.name.trim(),
              icon: values.icon.trim() || undefined,
              description: values.description.trim() || undefined,
              parentId: values.parentId || undefined,
              type: values.type,
              query: values.type === "smart" ? values.query.trim() : undefined,
            });
            log.info("List created", { name: values.name });
          },
        });

        pop();
        await closeMainWindow({ clearRootSearch: true });
      } catch (error) {
        log.error("Failed to create list", { name: values.name, error });
      }
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
      <Form.TextField {...itemProps.icon} title={t("list.listIcon")} placeholder={t("list.listIconPlaceholder")} />
      <Form.TextField
        {...itemProps.description}
        title={t("list.listDescription")}
        placeholder={t("list.listDescriptionPlaceholder")}
      />
      <Form.Dropdown {...itemProps.parentId} title={t("list.listParent")}>
        <Form.Dropdown.Item value="" title={t("list.listParentNone")} />
        {(lists || []).map((l) => (
          <Form.Dropdown.Item key={l.id} value={l.id} title={l.icon ? `${l.icon} ${l.name}` : l.name} />
        ))}
      </Form.Dropdown>
      <Form.Dropdown {...itemProps.type} title={t("list.listType")}>
        <Form.Dropdown.Item value="manual" title={t("list.listTypeManual")} />
        <Form.Dropdown.Item value="smart" title={t("list.listTypeSmart")} />
      </Form.Dropdown>
      {values.type === "smart" && (
        <Form.TextField {...itemProps.query} title={t("list.listQuery")} placeholder={t("list.listQueryPlaceholder")} />
      )}
    </Form>
  );
}
