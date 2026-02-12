export const getStatColorClasses = (colorName: string) => {
  switch (colorName.toLowerCase()) {
    case "cyan":
      return { border: "hover:border-cyan-500/30", text: "text-cyan-400" };
    case "emerald":
      return { border: "hover:border-emerald-500/30", text: "text-emerald-400" };
    case "purple":
      return { border: "hover:border-purple-500/30", text: "text-purple-400" };
    default:
      return { border: "hover:border-sky-500/30", text: "text-sky-400" };
  }
};

