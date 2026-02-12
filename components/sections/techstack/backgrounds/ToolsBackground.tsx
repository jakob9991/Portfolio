export const ToolsBackground = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(249,115,22,0.3) 0px, transparent 1px, transparent 3px)",
        backgroundSize: "100% 3px",
      }}
    />
  );
};
