import { useHistory } from "react-router-dom";
import { EventFormFields, useEventEdit } from "@amodeo/proclaimer/feature/event";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { SaveTextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/save/SaveTextButton";
import { DeleteTextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/delete/DeleteTextButton";

interface EditEventContentProps {
  event_id?: string;
}

export function EditEventContent({ event_id }: EditEventContentProps) {
  const history = useHistory();
  const { form, can_edit, is_new, handleFieldChange, handleDetailsChange, saveEvent, deleteEvent } =
    useEventEdit(event_id);

  function handleSave() {
    if (saveEvent()) {
      history.push("/home/events");
    }
  }

  function handleDelete() {
    if (deleteEvent()) {
      history.push("/home/events");
    }
  }

  if (!can_edit) {
    return null;
  }

  return (
    <>
      <EventFormFields
        {...form}
        on_change={handleFieldChange}
        on_details_change={handleDetailsChange}
      />
      <Space size="lg" />
      <SaveTextButton
        variant={is_new ? "save" : "update"}
        disabled={!form.name || !form.start_date}
        on_click={handleSave}
      />
      {!is_new && (
        <>
          <Space size="sm" />
          <DeleteTextButton on_click={handleDelete} />
        </>
      )}
    </>
  );
}
