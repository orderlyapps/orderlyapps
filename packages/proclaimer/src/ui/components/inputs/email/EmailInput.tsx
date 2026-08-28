import type { BaseInputProps } from "../base/BaseInput.tsx";
import { BaseInput } from "../base/BaseInput.tsx";

export type EmailInputProps = Omit<BaseInputProps, "type" | "max_length">;

export function EmailInput(props: EmailInputProps) {
  return <BaseInput type="email" {...props} />;
}
