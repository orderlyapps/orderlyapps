import { Label } from '../shadcn/source/label';
import { Input as Inp } from '../shadcn/source/input';

export const Input = ({
  label,
  type,
  placeholder,
  onChange,
}: {
  label?: string;
  type?: string;
  placeholder: string;
  onChange: (e: { value: string; name: string }) => void;
}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {label && <Label htmlFor={label}>{label}</Label>}
      <Inp
        type={type}
        id={label}
        name={label}
        placeholder={placeholder}
        onChange={(e) =>
          onChange({ value: e.target.value, name: label ? label : placeholder })
        }
      />
    </div>
  );
};
