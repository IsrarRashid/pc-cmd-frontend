import React from "react";
import { Box, Text, Select } from "@radix-ui/themes";

type Option = {
  label: string;
  value: string | number;
};

type CustomSelectProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  options: Option[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  error?: string;
  disabled?: boolean;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  placeholder = "Select an option",
  options,
  value,
  onChange,
  disabled = false,
  error,
  ...rest
}) => {
  return (
    <Box>
      {label && (
        <Text as="div" size="2" mb="1" weight="bold" className="text-white">
          {label}
        </Text>
      )}
      <Select.Root
        value={value !== undefined ? String(value) : ""}
        onValueChange={(val) => {
          if (disabled) return;
          const matchedOption = options.find(
            (opt) => String(opt.value) === val
          );
          onChange?.(matchedOption?.value ?? val);
        }}
        open={disabled ? false : undefined}
      >
        <Select.Trigger
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
          className={`!w-full focus:outline-none !bg-white !rounded-full !h-10`}
        />
        <Select.Content className="w-[93%] ml-[6%]">
          {options.map((opt) => (
            <Select.Item key={opt.value} value={String(opt.value)}>
              {opt.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      {error && <Text className="text-red-500 text-xs block">{error}</Text>}
    </Box>
  );
};

export default CustomSelect;
