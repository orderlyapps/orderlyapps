import type { ComponentProps, Ref } from "react";

import { InputLayout } from "../../layout/input-layout/input-layout.tsx";

type InputLayoutProps = ComponentProps<typeof InputLayout>;

export type EmailInputProps = Omit<InputLayoutProps, "type" | "inputmode"> & {
  ref?: Ref<HTMLIonInputElement>;
};

export function EmailInput(props: EmailInputProps) {
  return <InputLayout type="email" inputmode="email" {...props} />;
}
