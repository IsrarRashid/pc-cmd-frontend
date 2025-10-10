import React from "react";

interface ProgressBarProps {
  /** A number between 0 and 100 */
  value: number;
  /** Direction of the progress fill. Defaults to "ltr" (left-to-right) */
  direction?: "ltr" | "rtl";
  /** Optional additional classes */
  className?: string;
  /**
   * Alignment for the label overlay.
   * If not provided, defaults to "start" for LTR and "end" for RTL.
   */
  labelAlignment?: "start" | "center" | "end";
  /** Optional label text; defaults to the value with a "%" suffix */
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  direction = "ltr",
  className = "",
  labelAlignment = "start",
  label,
}) => {
  // Determine the effective alignment based on prop or direction
  const effectiveAlignment =
    labelAlignment || (direction === "ltr" ? "start" : "end");

  // Map alignment to Tailwind text alignment classes
  const textAlignClass =
    effectiveAlignment === "start"
      ? "text-left"
      : effectiveAlignment === "center"
      ? "text-center"
      : "text-right";

  return (
    <div className="relative w-full p-1">
      {/* Progress Bar Container */}
      <div
        className={`flex ${
          direction === "rtl" ? "justify-end" : "justify-start"
        } w-full bg-gray-300 rounded-full h-4 overflow-hidden ${className}`}
      >
        <div
          className="bg-[var(--accent-9)] h-full transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
      {/* Label Overlay */}
      <div className="absolute inset-0 flex items-center px-2">
        <span
          className={`w-full ${textAlignClass} text-sm font-medium text-white`}
        >
          {label || `${value}%`}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
