import type { ComponentProps, Ref } from "react";

import { InputLayout } from "../../layout/input-layout/input-layout.tsx";

type InputLayoutProps = ComponentProps<typeof InputLayout>;

export type NumberInputProps = Omit<InputLayoutProps, "type" | "inputmode"> & {
  ref?: Ref<HTMLIonInputElement>;
};

export function NumberInput(props: NumberInputProps) {
  return <InputLayout type="number" inputmode="decimal" {...props} />;
}
