import {
  Select as Sel,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shadcn/source/select';

export function Select({
  placeholder,
  options,
  onValueChange,
}: {
  placeholder: string;
  options: { value?: any; label: string | React.ReactNode }[];
  onValueChange: (value: any) => void;
}) {
  return (
    <Sel onValueChange={onValueChange}>
      <SelectTrigger className={`w-[280px]`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => {
          return (
            <SelectItem
              value={option.value ? option.value : index}
              key={option.value ? option.value : index}
            >
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Sel>
  );
}
