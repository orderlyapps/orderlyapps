import type { BaseInputProps } from "../base/BaseInput.tsx";
import { BaseInput } from "../base/BaseInput.tsx";

export type NumberInputProps = Omit<BaseInputProps, "type">;

export function NumberInput(props: NumberInputProps) {
  return <BaseInput type="number" {...props} />;
}
