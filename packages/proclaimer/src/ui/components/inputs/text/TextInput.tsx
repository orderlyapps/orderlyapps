import type { BaseInputProps } from "../base/BaseInput.tsx";
import { BaseInput } from "../base/BaseInput.tsx";

export type TextInputProps = Omit<BaseInputProps, "type">;

export function TextInput(props: TextInputProps) {
  return <BaseInput type="text" {...props} />;
}
