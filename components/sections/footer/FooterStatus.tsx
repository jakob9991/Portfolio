import { FooterMeta } from "./types";

type FooterStatusProps = {
  meta: FooterMeta;
};

export const FooterStatus = ({ meta }: FooterStatusProps) => {
  return (
    <div className="system-info flex items-center justify-center gap-3 text-xs text-gray-500">
      <div className="system-info-line flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-green-400">{meta.availability_text}</span>
      </div>
    </div>
  );
};

