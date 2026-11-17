import { useEffect, useRef, useState } from "react";
import { eq, useLiveQuery } from "@tanstack/react-db";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItemDivider,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@amodeo/proclaimer/ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/close/CloseIconButton";
import { AddIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/add/AddIconButton";
import { DeleteIconButton } from "@amodeo/proclaimer/ui/components/inputs/button/icon/delete/DeleteIconButton";
import { SaveTextButton } from "@amodeo/proclaimer/ui/components/inputs/button/text/save/SaveTextButton";
import { TextInput } from "@amodeo/proclaimer/ui/components/inputs/text/TextInput";
import { TimeInput } from "@amodeo/proclaimer/ui/components/inputs/time/TimeInput";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";
import {
  MINISTRY_SCHEDULE_DAYS,
  ministryScheduleCollection,
} from "@amodeo/proclaimer/feature/ministry";
import { useStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { makeCompositeKey } from "@amodeo/proclaimer/database/util/composite-key";

interface ScheduleEditModalProps {
  is_open: boolean;
  on_dismiss: () => void;
}

type EditableRow = {
  local_id: string;
  id: string | null;
  day_of_week: number;
  start_time: string;
  location: string;
  conductor: string;
  details: string;
};

export function ScheduleEditModal({ is_open, on_dismiss }: ScheduleEditModalProps) {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const { data: schedule_rows } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ ms: ministryScheduleCollection })
            .where(({ ms }) => eq(ms.congregation_id, congregation_id))
            .orderBy(({ ms }) => ms.day_of_week)
        : undefined,
    [congregation_id],
  );

  const [rows, set_rows] = useState<EditableRow[]>([]);
  const was_open = useRef(false);
  const loaded_for = useRef<string | undefined>(undefined);

  const existing_by_id = new Map((schedule_rows ?? []).map((row) => [row.id, row]));

  useEffect(() => {
    if (!is_open) {
      was_open.current = false;
      loaded_for.current = undefined;
      return;
    }
    if (
      schedule_rows !== undefined &&
      (!was_open.current || loaded_for.current !== congregation_id)
    ) {
      const sorted = [...schedule_rows].sort(
        (a, b) => a.day_of_week - b.day_of_week || a.sort_order - b.sort_order,
      );
      set_rows((prev) => [
        ...sorted.map((row) => ({
          local_id: crypto.randomUUID(),
          id: row.id,
          day_of_week: row.day_of_week,
          start_time: row.start_time.slice(0, 5),
          location: row.location,
          conductor: row.conductor,
          details: row.details,
        })),
        // Preserve unsaved rows added before the data finished loading.
        ...prev.filter((row) => row.id === null),
      ]);
      loaded_for.current = congregation_id;
    }
    was_open.current = true;
  }, [is_open, schedule_rows, congregation_id]);

  function updateRow(local_id: string, changes: Partial<EditableRow>) {
    set_rows((prev) =>
      prev.map((row) => (row.local_id === local_id ? { ...row, ...changes } : row)),
    );
  }

  function addRow(day_of_week: number) {
    set_rows((prev) => [
      ...prev,
      {
        local_id: crypto.randomUUID(),
        id: null,
        day_of_week,
        start_time: "",
        location: "",
        conductor: "",
        details: "",
      },
    ]);
  }

  function getSortOrder(target: EditableRow) {
    return rows
      .filter((row) => row.day_of_week === target.day_of_week && row.start_time)
      .findIndex((row) => row.local_id === target.local_id);
  }

  function isDirty(row: EditableRow) {
    if (!row.id) return true;
    const existing = existing_by_id.get(row.id);
    if (!existing) return true;
    return (
      row.start_time !== existing.start_time.slice(0, 5) ||
      row.location.trim() !== existing.location ||
      row.conductor.trim() !== existing.conductor ||
      row.details.trim() !== existing.details ||
      getSortOrder(row) !== existing.sort_order
    );
  }

  function saveRow(row: EditableRow) {
    if (!congregation_id || !row.start_time) return;
    if (row.id && schedule_rows === undefined) return;
    const existing = row.id ? existing_by_id.get(row.id) : undefined;
    // Row belongs to a different congregation (stale state after a switch).
    if (existing && existing.congregation_id !== congregation_id) return;
    const payload = {
      congregation_id,
      day_of_week: row.day_of_week,
      start_time: row.start_time,
      location: row.location.trim(),
      conductor: row.conductor.trim(),
      details: row.details.trim(),
      sort_order: getSortOrder(row),
    };
    if (existing) {
      ministryScheduleCollection.update(makeCompositeKey(row.id!, congregation_id), (draft) => {
        Object.assign(draft, payload);
      });
    } else {
      const id = row.id ?? crypto.randomUUID();
      const tx = ministryScheduleCollection.insert({ id, ...payload });
      set_rows((prev) => prev.map((r) => (r.local_id === row.local_id ? { ...r, id } : r)));
      tx.isPersisted.promise.catch(() => {
        set_rows((prev) =>
          prev.map((r) => (r.local_id === row.local_id && r.id === id ? { ...r, id: null } : r)),
        );
      });
    }
  }

  function removeRow(row: EditableRow) {
    if (row.id && !congregation_id) return;
    const index = rows.findIndex((r) => r.local_id === row.local_id);
    set_rows((prev) => prev.filter((r) => r.local_id !== row.local_id));
    if (!row.id || !congregation_id) return;
    const congregation = congregation_id;
    const renumber = rows
      .filter(
        (r) =>
          r.local_id !== row.local_id && r.day_of_week === row.day_of_week && r.start_time && r.id,
      )
      .map((r, sort_order) => ({ id: r.id!, sort_order }))
      .filter(({ id, sort_order }) => existing_by_id.get(id)?.sort_order !== sort_order);
    const tx = ministryScheduleCollection.delete(makeCompositeKey(row.id, congregation));
    tx.isPersisted.promise
      .then(() => {
        for (const { id, sort_order } of renumber) {
          ministryScheduleCollection.update(makeCompositeKey(id, congregation), (draft) => {
            draft.sort_order = sort_order;
          });
        }
      })
      .catch(() => {
        set_rows((prev) => {
          const next = [...prev];
          if (index >= 0 && index <= next.length) {
            next.splice(index, 0, row);
          } else {
            next.push(row);
          }
          return next;
        });
      });
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Schedule</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton
              on_click={on_dismiss}
              skip_confirmation={
                !rows.some(
                  (row) =>
                    isDirty(row) &&
                    (row.id !== null ||
                      row.start_time !== "" ||
                      row.location.trim() !== "" ||
                      row.conductor.trim() !== "" ||
                      row.details.trim() !== ""),
                )
              }
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {MINISTRY_SCHEDULE_DAYS.map(({ day_of_week, label }) => {
            const day_rows = rows.filter((row) => row.day_of_week === day_of_week);
            return (
              <div key={day_of_week}>
                <IonItemDivider>
                  <IonLabel>
                    <strong>{label}</strong>
                  </IonLabel>
                  <AddIconButton slot="end" on_click={() => addRow(day_of_week)} />
                </IonItemDivider>
                {day_rows.map((row) => (
                  <div key={row.local_id}>
                    <TimeInput
                      label="Time"
                      value={row.start_time}
                      minute_step={5}
                      on_change={(value) => updateRow(row.local_id, { start_time: value })}
                    />
                    <TextInput
                      label="Location"
                      value={row.location}
                      on_change={(value) => updateRow(row.local_id, { location: value })}
                    />
                    <TextInput
                      label="Conductor"
                      value={row.conductor}
                      on_change={(value) => updateRow(row.local_id, { conductor: value })}
                    />
                    <TextInput
                      label="Details"
                      value={row.details}
                      on_change={(value) => updateRow(row.local_id, { details: value })}
                    />
                    {isDirty(row) && (
                      <div className="ion-padding-horizontal">
                        <SaveTextButton
                          variant={row.id && existing_by_id.has(row.id) ? "update" : "save"}
                          size="small"
                          skip_confirmation
                          disabled={!row.start_time}
                          on_click={() => saveRow(row)}
                        />
                      </div>
                    )}
                    <div className="ion-text-end">
                      <DeleteIconButton on_click={() => removeRow(row)} />
                    </div>
                    <Space size="sm" />
                  </div>
                ))}
              </div>
            );
          })}
        </IonList>
        <Space size="lg" />
      </IonContent>
    </ResponsiveModal>
  );
}
