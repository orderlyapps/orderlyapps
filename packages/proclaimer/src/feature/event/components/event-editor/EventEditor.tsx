import { EventFormFields } from "../event-form-fields/EventFormFields.tsx";
import type { EventFormState } from "../../hooks/use-event-edit.ts";
import type { CircuitVisitFormDetails } from "../event-form-fields/types.ts";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import { SaveTextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/save/SaveTextButton";
import { DeleteTextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/delete/DeleteTextButton";

interface EventEditorProps {
  can_edit: boolean;
  is_new: boolean;
  form: EventFormState;
  on_change: (field: string, value: string | boolean) => void;
  on_details_change: (field: keyof CircuitVisitFormDetails, value: string) => void;
  on_save: () => void;
  on_delete: () => void;
}

export function EventEditor({
  can_edit,
  is_new,
  form,
  on_change,
  on_details_change,
  on_save,
  on_delete,
}: EventEditorProps) {
  if (!can_edit) return null;

  return (
    <>
      <EventFormFields {...form} on_change={on_change} on_details_change={on_details_change} />
      <Space size="lg" />
      <SaveTextButton
        variant={is_new ? "save" : "update"}
        disabled={!form.name || !form.start_date}
        on_click={on_save}
      />
      {!is_new && (
        <>
          <Space size="sm" />
          <DeleteTextButton on_click={on_delete} />
        </>
      )}
    </>
  );
}
