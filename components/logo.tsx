import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "dark" | "light";
}

export const ElephantLogo: React.FC<LogoProps> = ({
  className = "",
  showText = true,
  size = "md",
  variant = "dark",
}) => {
  const dimensions = {
    xs: { logoSize: "w-8 h-8", textSize: "text-xs", subSize: "text-[8px]" },
    sm: { logoSize: "w-10 h-10", textSize: "text-base", subSize: "text-[10px]" },
    md: { logoSize: "w-12 h-12 md:w-14 md:h-14", textSize: "text-base md:text-lg", subSize: "text-[10px] md:text-xs" },
    lg: { logoSize: "w-16 h-16 md:w-20 md:h-20", textSize: "text-xl md:text-2xl", subSize: "text-xs md:text-sm" },
    xl: { logoSize: "w-24 h-24 md:w-28 md:h-28", textSize: "text-2xl md:text-3xl", subSize: "text-sm md:text-base" },
  }[size];

  const mainTextColor = variant === "light" ? "text-white" : "text-slate-900 dark:text-white";
  const elephantColor = variant === "light" ? "text-sky-400" : "text-[#29A3DD] dark:text-sky-400";
  const subTextColor = "text-[#FDB813]";

  return (
    <div className={`flex items-center gap-3 font-sans select-none ${className}`}>
      {/* Official Elephant Face Logo */}
      <div className={`relative shrink-0 ${dimensions.logoSize} flex items-center justify-center`}>
        <img
          src="/logo.png"
          alt="Elephant Chess Academy Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center leading-tight">
          <span className={`font-[1000] tracking-tight uppercase ${mainTextColor} ${dimensions.textSize}`}>
            <span className={elephantColor}>ELEPHANT</span> CHESS
          </span>
          <span className={`font-black tracking-[0.2em] uppercase ${subTextColor} ${dimensions.subSize}`}>
            ACADEMY
          </span>
        </div>
      )}
    </div>
  );
};

export const ModernKnightLogo = ElephantLogo;
export default ElephantLogo;
