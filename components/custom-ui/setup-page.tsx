import React, { ReactNode } from "react";

const themeColors: Record<
  string,
  {
    text: string;
    focusRing: string;
    shadow: string;
    buttonGradient: string;
  }
> = {
  blue: {
    text: "text-blue-400",
    focusRing: "focus:ring-blue-500/50",
    shadow: "shadow-blue-500/20",
    buttonGradient:
      "from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500",
  },
  cyan: {
    text: "text-cyan-400",
    focusRing: "focus:ring-cyan-500/50",
    shadow: "shadow-cyan-500/20",
    buttonGradient:
      "from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500",
  },
  teal: {
    text: "text-teal-400",
    focusRing: "focus:ring-teal-500/50",
    shadow: "shadow-teal-500/20",
    buttonGradient:
      "from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500",
  },
  purple: {
    text: "text-purple-400",
    focusRing: "focus:ring-purple-500/50",
    shadow: "shadow-purple-500/20",
    buttonGradient:
      "from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500",
  },
  orange: {
    text: "text-orange-400",
    focusRing: "focus:ring-orange-500/50",
    shadow: "shadow-orange-500/20",
    buttonGradient:
      "from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500",
  },
};

interface SetupPageProps {
  title: ReactNode;
  onCancel?: () => void;
  themeColor: keyof typeof themeColors;
  children?: ReactNode;
  actionButtonText?: string;
  onAction?: () => void;
  actionDisabled?: boolean;
}

export function SetupPage({
  title,
  onCancel,
  themeColor,
  children,
  actionButtonText,
  onAction,
  actionDisabled,
}: SetupPageProps) {
  const theme = themeColors[themeColor] || themeColors.blue;

  return (
    <div className="pt-12 max-w-3xl mx-auto px-6 pb-12 animate-in fade-in slide-in-from-bottom-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-black text-white drop-shadow-lg">
          {title}
        </h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-neutral-400 hover:text-white transition"
          >
            Cancel
          </button>
        )}
      </div>
      <div
        className={`bg-neutral-900/60 backdrop-blur-md p-8 rounded-3xl border border-neutral-800 space-y-6 shadow-2xl relative overflow-hidden ${theme.shadow}`}
      >
        {children}

        {actionButtonText && onAction && (
          <button
            onClick={onAction}
            disabled={actionDisabled}
            className={`w-full py-4 bg-gradient-to-r ${theme.buttonGradient} text-white rounded-xl font-bold text-lg transition shadow-lg mt-4 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50`}
          >
            {actionButtonText}
          </button>
        )}
      </div>
    </div>
  );
}
