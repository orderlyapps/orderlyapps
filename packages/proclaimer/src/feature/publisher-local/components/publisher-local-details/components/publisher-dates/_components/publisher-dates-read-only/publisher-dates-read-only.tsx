import { LabelValueItem } from "../../../../../../../../ui/components/display/data/label-value/LabelValueItem.tsx";
import { getYearsMonthsSince } from "@amodeo/utils";

interface Props {
  birth_date: string;
  baptism_date: string;
}

export function PublisherDatesReadOnly({ birth_date, baptism_date }: Props) {
  return (
    <>
      <LabelValueItem
        label="Date of Birth"
        value={
          birth_date
            ? new Date(birth_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : ""
        }
        value_2={birth_date ? getYearsMonthsSince(birth_date) : undefined}
        value_2_color="medium"
      />
      <LabelValueItem
        label="Baptism Date"
        value={
          baptism_date
            ? new Date(baptism_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : ""
        }
        value_2={
          baptism_date
            ? `${getYearsMonthsSince(baptism_date)}${
                birth_date ? ` (Age: ${getYearsMonthsSince(birth_date, baptism_date)})` : ""
              }`
            : undefined
        }
        value_2_color="medium"
      />
    </>
  );
}
