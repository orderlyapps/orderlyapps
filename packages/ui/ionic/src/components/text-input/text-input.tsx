import type { ComponentProps, Ref } from "react";

import { InputLayout } from "../input-layout/input-layout.tsx";

type InputLayoutProps = ComponentProps<typeof InputLayout>;

export type TextInputProps = Omit<InputLayoutProps, "type"> & {
  ref?: Ref<HTMLIonInputElement>;
};

export function TextInput(props: TextInputProps) {
  return <InputLayout type="text" {...props} />;
}
