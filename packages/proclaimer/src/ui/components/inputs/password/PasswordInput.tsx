import type { BaseInputProps } from "../base/BaseInput.tsx";
import { BaseInput } from "../base/BaseInput.tsx";

export type PasswordInputProps = Omit<BaseInputProps, "type" | "max_length">;

export function PasswordInput(props: PasswordInputProps) {
  return <BaseInput type="password" {...props} />;
}
