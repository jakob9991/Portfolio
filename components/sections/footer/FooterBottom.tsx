import { FooterMeta } from "./types";

type FooterBottomProps = {
  meta: FooterMeta;
};

export const FooterBottom = ({ meta }: FooterBottomProps) => {
  return (
    <div className="text-center font-mono">
      <div className="bg-[#0f1219]/40 backdrop-blur-xl border border-white/5 rounded-lg p-4 space-y-3">
        <p className="text-xs text-gray-600">
          Copyright {new Date().getFullYear()} {meta.brand_name} | {meta.legal_text}
        </p>
      </div>
    </div>
  );
};

