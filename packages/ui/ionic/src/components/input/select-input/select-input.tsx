import type { ComponentProps, Ref } from "react";

import { SelectLayout } from "../../layout/select-layout/select-layout.tsx";

type SelectLayoutProps = ComponentProps<typeof SelectLayout>;

export type SelectInputProps = SelectLayoutProps & {
  ref?: Ref<HTMLIonSelectElement>;
};

export function SelectInput(props: SelectInputProps) {
  return <SelectLayout {...props} />;
}
