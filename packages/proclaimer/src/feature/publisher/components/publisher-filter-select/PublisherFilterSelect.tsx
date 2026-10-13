import { IonChip, IonCol, IonGrid, IonRow } from "@ionic/react";
import { AlertMultiSelect } from "@amodeo/proclaimer/ui/components/inputs/alert-multi-select/AlertMultiSelect";
import { publisherSchema, type Publisher } from "../../schemas/publisher.ts";

export interface PublisherFilter {
  gender: "all" | Publisher["gender"];
  standing: "all" | Publisher["standing"][];
  type: "all" | Publisher["type"][];
  archived: "all" | "exclude" | "only";
}

export function filterPublishers(publishers: Publisher[], filter: PublisherFilter): Publisher[] {
  return publishers.filter((publisher) => {
    if (filter.gender !== "all" && publisher.gender !== filter.gender) {
      return false;
    }
    if (filter.standing !== "all" && !filter.standing.includes(publisher.standing)) {
      return false;
    }
    if (filter.type !== "all" && !filter.type.includes(publisher.type)) {
      return false;
    }
    if (filter.archived === "exclude" && publisher.archived_at) {
      return false;
    }
    if (filter.archived === "only" && !publisher.archived_at) {
      return false;
    }
    return true;
  });
}

type ArchivedValue = "active" | "archived";

function formatLabel(value: string) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const genderOptions = publisherSchema.shape.gender.options.map((value) => ({
  label: formatLabel(value),
  value,
}));

const standingOptions = publisherSchema.shape.standing.options.map((value) => ({
  label: formatLabel(value),
  value,
}));

const typeOptions = publisherSchema.shape.type.options.map((value) => ({
  label: formatLabel(value),
  value,
}));

const archivedOptions: { label: string; value: ArchivedValue }[] = [
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
];

function renderChips<T extends string>(
  show_all: boolean,
  selected: T[],
  options: readonly { label: string; value: T }[],
) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        gap: "4px",
      }}
    >
      {show_all ? (
        <IonChip key="all">All</IonChip>
      ) : (
        options
          .filter((o) => selected.includes(o.value))
          .map((o) => <IonChip key={o.value}>{o.label}</IonChip>)
      )}
    </div>
  );
}

interface PublisherFilterSelectProps {
  filter: PublisherFilter;
  disabled?: boolean;
  on_change: (filter: PublisherFilter) => void;
}

export function PublisherFilterSelect({
  filter,
  disabled = false,
  on_change,
}: PublisherFilterSelectProps) {
  const col_sizes = { size: "12", sizeMd: "6", sizeLg: "3" };

  return (
    <IonGrid className="ion-no-padding">
      <IonRow>
        <IonCol {...col_sizes}>
          <AlertMultiSelect
            label="Gender"
            options={genderOptions}
            selected={filter.gender === "all" ? [] : [filter.gender]}
            disabled={disabled}
            on_change={(values) =>
              on_change({
                ...filter,
                gender: values.length === 1 ? (values[0] as Publisher["gender"]) : "all",
              })
            }
            render_selected={(sel, opts) => renderChips(filter.gender === "all", sel, opts)}
          />
        </IonCol>
        <IonCol {...col_sizes}>
          <AlertMultiSelect
            label="Standing"
            options={standingOptions}
            selected={filter.standing === "all" ? [] : filter.standing}
            disabled={disabled}
            on_change={(values) =>
              on_change({
                ...filter,
                standing: values.length === 0 ? "all" : (values as Publisher["standing"][]),
              })
            }
            render_selected={(sel, opts) => renderChips(filter.standing === "all", sel, opts)}
          />
        </IonCol>
        <IonCol {...col_sizes}>
          <AlertMultiSelect
            label="Service Type"
            options={typeOptions}
            selected={filter.type === "all" ? [] : filter.type}
            disabled={disabled}
            on_change={(values) =>
              on_change({
                ...filter,
                type: values.length === 0 ? "all" : (values as Publisher["type"][]),
              })
            }
            render_selected={(sel, opts) => renderChips(filter.type === "all", sel, opts)}
          />
        </IonCol>
        <IonCol {...col_sizes}>
          <AlertMultiSelect<ArchivedValue>
            label="Archived"
            options={archivedOptions}
            selected={
              filter.archived === "all"
                ? []
                : filter.archived === "exclude"
                  ? ["active"]
                  : ["archived"]
            }
            disabled={disabled}
            on_change={(values) =>
              on_change({
                ...filter,
                archived:
                  values.length !== 1 ? "all" : values[0] === "archived" ? "only" : "exclude",
              })
            }
            render_selected={(sel, opts) => renderChips(filter.archived === "all", sel, opts)}
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
