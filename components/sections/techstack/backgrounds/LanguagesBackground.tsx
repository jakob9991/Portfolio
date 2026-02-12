const keywords = [
  "if", "for", "return", "class", "const", "while",
  "import", "async", "=>", "fn",
];

export const LanguagesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {keywords.map((kw, i) => (
        <span
          key={i}
          className="absolute font-mono text-yellow-500/[0.08] text-sm select-none floating-kw"
          style={{
            left: `${(i * 9.5) % 90}%`,
            top: `${(i * 17) % 75}%`,
            animationDelay: `${i * -1.2}s`,
            animationDuration: `${10 + (i % 4) * 3}s`,
          }}
        >
          {kw}
        </span>
      ))}
    </div>
  );
};
