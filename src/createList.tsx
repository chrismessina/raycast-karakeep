import { Action, ActionPanel, Form, Icon, useNavigation, closeMainWindow } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { logger } from "@chrismessina/raycast-logger";

const log = logger.child("[CreateList]");
import { fetchCreateList } from "./apis";
import { useTranslation } from "./hooks/useTranslation";
import { runWithToast } from "./utils/toast";
import { LIST_ICON_EMOJI_OPTIONS, isEmoji } from "./utils/formatting";

interface ListFormValues {
  name: string;
  icon: string;
}

function getIconOptions() {
  return LIST_ICON_EMOJI_OPTIONS;
}

export default function CreateListView() {
  const { pop } = useNavigation();
  const { t } = useTranslation();

  const { handleSubmit, itemProps } = useForm<ListFormValues>({
    initialValues: { name: "", icon: "📁" },
    validation: {
      name: (value) => (!value?.trim() ? t("list.listName") + " is required" : undefined),
      icon: (value) => (!isEmoji(value || "") ? "Must be a valid emoji" : undefined),
    },
    async onSubmit(values) {
      log.info("Creating list", { name: values.name });

      try {
        await runWithToast({
          loading: { title: t("list.toast.create.loading") },
          success: { title: t("list.toast.create.success") },
          failure: { title: t("list.toast.create.error") },
          action: async () => {
            await fetchCreateList({
              name: values.name.trim(),
              icon: values.icon.trim(),
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
      <Form.Dropdown {...itemProps.icon} title={t("list.listIcon")}>
        {getIconOptions().map((option) => (
          <Form.Dropdown.Item key={option.value} value={option.value} title={option.title} icon={option.value} />
        ))}
      </Form.Dropdown>
    </Form>
  );
}
