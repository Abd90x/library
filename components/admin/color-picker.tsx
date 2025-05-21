import { HexColorInput, HexColorPicker } from "react-colorful";
import React from "react";

interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, onPickerChange }: Props) => {
  return (
    <div className="relative w-full">
      <div className="flex flex-row items-center">
        <p>#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="hex-input"
        />
      </div>
      <HexColorPicker
        color={value}
        onChange={onPickerChange}
        className="!w-full"
      />
    </div>
  );
};

export default ColorPicker;
