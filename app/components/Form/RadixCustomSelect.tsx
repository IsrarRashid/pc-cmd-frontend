"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import * as Select from "@radix-ui/react-select";
import { Badge, TextField } from "@radix-ui/themes";
import { IoClose } from "react-icons/io5";
import { FaCheck, FaChevronDown } from "react-icons/fa";

export type OptionType = { value: string; label: string };

interface RadixCustomSelectProps {
  options: OptionType[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isMulti?: boolean;
  isClearable?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const RadixCustomSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  isSearchable = true,
  isMulti = false,
  isClearable = false,
  disabled = false,
  id,
  className = "",
}: RadixCustomSelectProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    isMulti
      ? Array.isArray(value)
        ? value
        : []
      : value
      ? [value as string]
      : []
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && isSearchable && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen, isSearchable]);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  // Handle value change
  const handleValueChange = (newValue: string) => {
    if (isMulti) {
      const newSelectedValues = selectedValues.includes(newValue)
        ? selectedValues.filter((v) => v !== newValue)
        : [...selectedValues, newValue];

      setSelectedValues(newSelectedValues);
      onChange?.(newSelectedValues);
    } else {
      setSelectedValues([newValue]);
      onChange?.(newValue);
      setIsOpen(false);
    }
  };

  // Handle clear
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValues([]);
    onChange?.(isMulti ? [] : "");
    setSearchQuery("");
  };

  // Remove single item in multi-select
  const handleRemoveItem = (valueToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newValues = selectedValues.filter((v) => v !== valueToRemove);
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  // Get display text
  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;

    if (isMulti) {
      return null; // We'll show badges instead
    }

    const selectedOption = options.find(
      (opt) => opt.value === selectedValues[0]
    );
    return selectedOption?.label || placeholder;
  };

  // Single Select Component
  if (!isMulti) {
    return (
      <Select.Root
        value={selectedValues[0] || ""}
        onValueChange={handleValueChange}
        disabled={disabled}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <Select.Trigger
          id={id}
          className={`inline-flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium bg-white border border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed transition-all duration-200 w-full ${className}`}
          aria-label={placeholder}
        >
          <Select.Value placeholder={placeholder}>
            {getDisplayText()}
          </Select.Value>
          <div className="flex items-center gap-1">
            {isClearable && selectedValues[0] && (
              <button
                onClick={handleClear}
                className="hover:bg-gray-100 rounded p-0.5 transition-colors"
                type="button"
              >
                <IoClose className="w-3.5 h-3.5 text-gray-500" />
              </button>
            )}
            <Select.Icon>
              <FaChevronDown className="w-4 h-4 text-gray-500" />
            </Select.Icon>
          </div>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200 z-[100000]"
            position="popper"
            sideOffset={5}
          >
            {isSearchable && (
              <div className="p-2 border-b border-gray-200">
                <TextField.Root
                  ref={searchInputRef}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="!text-sm"
                  size="2"
                />
              </div>
            )}

            <Select.Viewport className="p-2 max-h-[300px] overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 text-center">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="relative flex items-center px-8 py-2.5 text-sm rounded-lg outline-none select-none hover:bg-gray-100 focus:bg-blue-50 data-[highlighted]:bg-blue-50 data-[state=checked]:bg-blue-100 transition-colors"
                  >
                    <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                      <FaCheck className="w-4 h-4 text-blue-600" />
                    </Select.ItemIndicator>
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))
              )}
            </Select.Viewport>

            <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white cursor-default">
              <FaChevronDown />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }

  // Multi-Select Component
  return (
    <div className={`relative ${className}`}>
      <button
        id={id}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="inline-flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium bg-white border border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-full min-h-[42px]"
      >
        <div className="flex flex-wrap gap-1.5 flex-1 items-center">
          {selectedValues.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            selectedValues.map((val) => {
              const option = options.find((opt) => opt.value === val);
              return (
                <Badge
                  key={val}
                  color="blue"
                  variant="soft"
                  className="!px-2 !py-1 flex items-center gap-1"
                >
                  <span className="text-xs">{option?.label}</span>
                  <button
                    onClick={(e) => handleRemoveItem(val, e)}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                    type="button"
                  >
                    <IoClose className="w-3 h-3" />
                  </button>
                </Badge>
              );
            })
          )}
        </div>
        <div className="flex items-center gap-1 ml-2">
          {isClearable && selectedValues.length > 0 && (
            <button
              onClick={handleClear}
              className="hover:bg-gray-100 rounded p-0.5 transition-colors"
              type="button"
            >
              <IoClose className="w-3.5 h-3.5 text-gray-500" />
            </button>
          )}
          <FaChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[99998]"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-[99999] max-h-[320px] flex flex-col">
            {isSearchable && (
              <div className="p-2 border-b border-gray-200">
                <TextField.Root
                  ref={searchInputRef}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="!text-sm"
                  size="2"
                />
              </div>
            )}

            <div className="p-2 overflow-y-auto flex-1">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 text-center">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleValueChange(option.value)}
                      className={`relative flex items-center w-full px-8 py-2.5 text-sm rounded-lg outline-none select-none hover:bg-gray-100 focus:bg-blue-50 transition-colors text-left ${
                        isSelected ? "bg-blue-100" : ""
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute left-2 inline-flex items-center">
                          <FaCheck className="w-4 h-4 text-blue-600" />
                        </span>
                      )}
                      <span>{option.label}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RadixCustomSelect;
