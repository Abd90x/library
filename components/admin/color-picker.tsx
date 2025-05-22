import { HexColorInput, HexColorPicker } from "react-colorful";
import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Pipette } from "lucide-react";

interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, onPickerChange }: Props) => {
  return (
    <>
      <div
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "h-14 relative "
        )}
        style={{ backgroundColor: value }}
      >
        <div className="flex flex-row items-center font-semibold uppercase text-stroke text-white">
          <p>#</p>
          <HexColorInput
            color={value}
            onChange={onPickerChange}
            className="hex-input text-shadow-2xl text-stroke uppercase"
          />
        </div>
        <Popover>
          <PopoverTrigger>
            <Button
              type="button"
              size="icon"
              className="border bg-white hover:bg-border text-admin absolute end-2.5 top-2.5 "
            >
              <Pipette />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <HexColorPicker
              color={value}
              onChange={onPickerChange}
              className="!w-full"
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default ColorPicker;
