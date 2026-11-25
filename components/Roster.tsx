import { roster } from "@/lib/data";

const tone = { ok: "bg-[#E3F5E2] text-[#14532D]", late: "bg-[#FAF2CE] text-[#6B5A00]" };

export default function Roster() {
  return (
    <ul>
      {roster.map((r) => (
        <li key={r.init} className="mt-3 flex items-center gap-3 border-t border-ink/10 pt-3 text-sm">
          <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold ${r.bg}`}>{r.init}</span>
          <span className="flex-1 leading-snug"><b>{r.role}</b><br /><small className="font-semibold text-muted">{r.where}</small></span>
          <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${tone[r.tone]}`}>{r.status}</span>
        </li>
      ))}
    </ul>
  );
}
