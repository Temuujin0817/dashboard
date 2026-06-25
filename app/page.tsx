"use client"
import  { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Search, Users, Layers, Wallet, TrendingUp, AlertTriangle, X } from "lucide-react";

/* ---------------- DATA (linkээс уншсан — 04–06 сар хэсэгчилсэн) ---------------- */
const MONTHS = ["1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар"];
const RAW = [
["PADA1-04_2025_9","Думанбек","95411155","dumanbek18@gmail.com",[0,0,0,0,0,0]],
["PADA1-04_2025_9","Гантулга","88328224","odonbymbagantulga@gmail.com",[0,0,0,0,0,0]],
["PADA1-04_2025_9","Тод-Эрхэс","80070788","m.moogii82@gmail.com",[0,0,0,0,0,0]],
["PADA1-04_2025_9","Нандин","91999800","s.bayarmaa05@gmail.com",[0,0,0,0,0,0]],
["PADA1-04_2025_9","Адьяа","99409330","adiyatsolmonbaatar@gmail.com",[0,0,0,0,0,0]],
["PADA1-04_2025_9","Амартүвшин","80098076","damdindorjotgonbaatar93@gmail.com",[1466000,0,0,0,0,0]],
["PADA1-05_2025_11","Г.Энх-Орчлон","99934038","bayerbadmaarag@gmail.com",[0,1384000,0,0,0,0]],
["PADA1-05_2025_11","Ариунсэлэнгэ","95563130","baasansurenbatdorj2@gmail.com",[-700000,0,0,0,0,0]],
["PADA1-05_2025_11","Хангэрэл","95720723","Khangerel7q@gmail.com",[1380000,0,0,0,0,0]],
["PADA1-05_2025_11","Амаржаргал","","amkaamarsaikhan@gmail.com",[0,0,0,0,0,0]],
["PADA1-05_2025_11","Батхүрэл","99996635","bathurel.sanjaa27@gmail.com",[0,0,0,0,0,0]],
["PADA1-05_2025_11","Нурсултан","95427460","nasaa1423@gmail.com",[0,1380000,0,0,0,0]],
["PADA1-05_2025_11","Хаш-Эрдэнэ","99877632","hhashka39@gmail.com",[0,0,0,0,0,0]],
["PADA1-05_2025_11","Соёмбо","99748240","soyombojaaya@gmail.com",[0,0,0,0,0,0]],
["PADA1-05_2025_11","Цалгиун","99244800","Montotulga@gmail.com",[0,0,0,0,0,0]],
["PADA1-05_2025_11","Мөнхтөр","95589588","monkhtorqq@gmail.com",[2000000,0,0,0,0,0]],
["PADA1-05_2025_11","Ишжамц","89897585","moogii0028@gmail.com",[0,0,0,0,0,0]],
["PADA1-05_2025_11","Шаравдорж","","fkos3567@gmail.com",[0,2767000,0,0,0,0]],
["PADA1-05_2025_11","Номин","91252543","ishigxen11@gmail.com",[754000,754000,0,0,0,0]],
["PADA1-06_2025_12","С.Бадам-Очир","99882318","badamochir80147689@gmail.com",[1383000,0,1384000,0,0,0]],
["PADA1-06_2025_12","Б.Тэнгис","94545464","",[0,0,0,0,2766000,0]],
["PADA1-06_2025_12","Г.Билгүүн","89087052","begunftn@icloud.com",[1383000,0,0,0,0,0]],
["PADA1-06_2025_12","Ү.Үжин","96022222","naruushdelgermaa@gmail.com",[1383000,0,1383000,0,0,0]],
["PADA1-06_2025_12","Б.Чинзориг","80129954","",[-2250000,0,0,0,0,0]],
["PADA1-06_2025_12","М.Учрал","86063215","Munkhboold@gmail.com",[0,0,0,0,0,0]],
["PADA1-06_2025_12","Б.Мандахбаяр","60233223","mandakhbayarbatbold@gmail.com",[1000000,1000000,1383000,0,0,0]],
["PADA1-06_2025_12","Б.Маргад","99991679","madmargad94@gmail.com",[0,0,0,0,0,0]],
["PADA1-06_2025_12","А.Элбэгсайхан","88813247","akhureltogoo@gmail.com",[0,0,0,0,0,0]],
["PADA1-06_2025_12","Б.Бямба-Очир","90337791","aaa684694@gmail.com",[470000,970000,0,0,970000,0]],
["PADA1-06_2025_12","Баттулга","90008090","tuyatsetseg910@gmail.com",[0,1383000,0,1383000,0,0]],
["PADA1-06_2025_12","Түшиг","99131020","erdenesanaa.kh@gmail.com",[0,0,0,0,0,0]],
["PADA1-06_2025_12","Б.Болд-Эрдэнэ","94887109","baatarbolderdene7@gmail.com",[2766000,0,0,0,0,0]],
["PADA1-06_2025_12","Амарболд","","mdelgerdalai@gmail.com",[0,0,0,0,0,0]],
["BACK-2_2025_9","Батзориг","94321654","ekzorigoo@gmail.com",[0,1181250,0,2362500,0,0]],
["BACK-2_2025_9","Төмөртулга","85393735","tumruu1999@gmail.com",[0,3468750,0,0,0,0]],
["BACK-2_2025_9","Отгонбаяр","85121269","kaobuuu30@gmail.com",[2700000,0,1350000,0,1350000,1350000]],
["BACK-2_2025_9","Түвшинзаяа","99894389","tuvshuurt@gmail.com",[1350000,1350000,1350000,1350000,0,0]],
["BACK-2_2025_9","Чингүн","99252026","chingun0829@gmail.com",[1206250,1206250,1206250,1206250,0,1206250]],
["BACK-2_2025_9","Эрдэнэбилэг","90169196","Tsogoomunkhtuya@gmail.com",[0,0,0,0,2362000,0]],
["BACK-2_2025_9","Эрдэнэчимэг","89970951","chimgee.erka@gmail.com",[0,1181250,1181250,1181250,0,0]],
["BACK-2_2025_9","Баттөгс","90117778","tuuk7788@gmail.com",[0,0,800000,0,0,0]],
["BACK-2_2025_9","Ачтөгөлдөр","88166811","otgoo0603@gmail.com",[0,0,2000000,3150000,0,0]],
["BACK-2_2025_9","Өсөх-Ирээдүй","94116737","usuhireedui41@gmail.com",[0,0,0,0,0,0]],
["BACK-2_2025_9","Дөлгөөн","88450442","bdulguun0114@gmail.com",[0,0,0,0,0,0]],
["BACK-2_2025_9","Баттулга","80770412","blessyou100x@gmail.com",[0,1012500,0,0,4700000,0]],
["PADA1-07_2026_02","Ганхүлэг","93058585","budaa1002luyaa@gmail.com",[0,0,0,0,0,0]],
["PADA1-07_2026_02","Мөнхбаяр","99951500","moogiiban14@gmail.com",[0,0,0,0,0,0]],
["PADA1-07_2026_02","Өнөмөнх","86255268","unumunkh.ganhuyg@gmail.com",[100000,1283000,1383000,1383000,0,0]],
["PADA1-07_2026_02","Солонго","96989090","sundevsolongo@gmail.com",[660000,2840000,0,0,0,0]],
["PADA1-07_2026_02","Мягмардорж","95487995","myagaaa535@gmail.com",[4150000,0,0,0,0,0]],
["PADA1-07_2026_02","Хангэрэл","95720723","Khangerel7q@gmail.com",[0,0,1380000,0,0,0]],
["PADA1-07_2026_02","Эрдэммөнх","","",[2166000,0,0,0,0,0]],
["PADA1-07_2026_02","Таттенбек","99978647","tattenbyekkhuatbyek@gmail.com",[1383000,0,0,0,0,0]],
["PADA1-07_2026_02","Хатанбаяр","80860840","khatanaab@gmail.com",[1200000,1383000,0,0,0,0]],
["KAMI1-01_2026_03","Тулга","95888058","otgoo_phone@yahoo.com",[0,0,500000,500000,350000,0]],
["KAMI1-01_2026_03","Болормаа","95888058","otgoo_phone@yahoo.com",[0,0,500000,500000,350000,0]],
["KAMI1-01_2026_03","(нэр дутуу)","88001167","",[0,0,750000,0,0,0]],
["KAMI1-01_2026_03","Цэрэндэмчиг","88117260","",[0,0,750000,0,0,0]],
["KAMI1-01_2026_03","Энх-Эрдэнэ","88009551","udval.lawyer@gmail.com",[0,0,750000,0,750000,0]],
["KAMI1-01_2026_03","Гэгээ-Оюу","99008172","aidersuren@gmail.com",[0,0,750000,0,0,0]],
["KAMI1-01_2026_03","Энхмөнх","99190033","kheegii33@gmail.com",[0,0,750000,0,750000,0]],
["KAMI1-01_2026_03","Мичид","88117615","",[0,0,750000,0,0,0]],
["KAMI1-01_2026_03","Түвшинбаяр","86079812","badamkhorloo2023@gmail.com",[0,0,200000,0,0,0]],
["KAMI1-01_2026_03","Оргил","88062008","bnandia88@gmail.com",[0,0,300000,1200000,0,0]],
["KAMI1-01_2026_03","Тэмүүлэн","99010331","jazulaa03@gmail.com",[0,0,750000,750000,0,0]],
["KAMI1-01_2026_03","Баттулга","99678899","mnz127@gmail.com",[0,0,750000,0,750000,0]],
["KAMI1-01_2026_03","Ариунбаяр","99093304","",[0,0,750000,0,0,0]],
["KAMI1-01_2026_03","Хулан","95950470","ochkhuubatbayar@gmail.com",[0,0,750000,0,750000,0]],
["KAMI1-01_2026_03","Эрхэм","90509022","",[0,0,750000,0,0,0]],
["KAMI1-02_2026_04","Ажиндуш","96882022","lkhagvasuren.bayartsetseg@yahoo.com",[0,0,100000,700000,700000,0]],
["KAMI1-02_2026_04","Дуулга","80111150","nomikogroup@gmail.com",[0,0,750000,0,750000,0]],
["KAMI1-02_2026_04","Буяннэмэх","89906589","",[0,0,0,100000,400000,0]],
["KAMI1-02_2026_04","Рагчаабазар","99092797","badmaaragitgel@gmail.com",[0,0,0,100000,0,0]],
["KAMI1-02_2026_04","Тэмүүлэн","99998606","munkhe@gmail.com",[0,0,0,100000,0,0]],
["KAMI1-02_2026_04","Билгүүжин","80007902","usukhuu.1420@gmail.com",[0,0,0,750000,0,0]],
["KAMI1-02_2026_04","Тоган-Ачу","88118627","leslagerel@gmail.com",[0,0,0,1800000,0,0]],
["KAMI1-02_2026_04","Гэгүүнээ","88118627","leslagerel@gmail.com",[0,0,0,0,0,0]],
["KAMI1-02_2026_04","Билигт","93333336","",[0,0,0,150000,0,0]],
["PADA-08_2026_04","Ананд","99093272","",[0,0,500000,0,0,0]],
["PADA-08_2026_04","Сансарбаатар","88860052","sansarbaatara@gmail.com",[0,0,0,1383000,0,0]],
["PADA-08_2026_04","Гарьд","94949488","enhzayaerhbilguun1019@gmail.com",[0,0,500000,100000,0,0]],
["PADA-08_2026_04","Пүрэвбаяр","85813043","purevbayrpurevbayr20@gmail.com",[0,0,0,300000,500000,0]],
["PADA-08_2026_04","Энхжин","80866068","crystaljerry0816@gmail.com",[0,0,0,300000,500000,0]],
["PADA-08_2026_04","Баясгалан","88055257","bays051918@gmail.com",[0,0,0,400000,0,0]],
["PADA-08_2026_04","Жонатан","94956229","booothybooothy@gmail.com",[0,0,0,1000000,0,0]],
["JED1-01_2026_05","Анар","88265858","bulgan.d@uss.mn",[0,0,0,6000000,0,0]],
["JED1-01_2026_05","Тэмүүлэн","99086654","",[0,0,0,3000000,0,3000000]],
];

const students = RAW.map((r, i) => ({
  id: i + 1, cohort: r[0], name: r[1], phone: r[2], email: r[3],
  months: r[4], total: r[4].reduce((a, b) => a + b, 0),
}));

const COHORT_ORDER = [...new Set(students.map((s) => s.cohort))];
const PALETTE = ["#1F3864", "#2E75B6", "#0E7C86", "#5B8C5A", "#B07A2E", "#7E5BA6", "#C2575B", "#3E7CB1", "#6B7280"];
const cohortColor = (c) => PALETTE[COHORT_ORDER.indexOf(c) % PALETTE.length];
const startOf = (c) => { const p = c.split("_"); return p.length >= 3 ? `${p[p.length - 2]}-${p[p.length - 1].padStart(2, "0")}` : ""; };

const fmt = (n) => (n < 0 ? "(" + Math.abs(n).toLocaleString("en-US") + ")" : n.toLocaleString("en-US"));
const fmtShort = (n) => { const a = Math.abs(n); if (a >= 1e6) return (n / 1e6).toFixed(1) + "сая"; if (a >= 1e3) return Math.round(n / 1e3) + "мян"; return "" + n; };

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [activeCohort, setActiveCohort] = useState(null);
  const [sortKey, setSortKey] = useState("total");
  const [sortDir, setSortDir] = useState("desc");

  const grand = useMemo(() => students.reduce((a, s) => a + s.total, 0), []);
  const monthTotals = useMemo(() => MONTHS.map((_, i) => students.reduce((a, s) => a + s.months[i], 0)), []);
  const monthData = MONTHS.map((m, i) => ({ name: m, value: monthTotals[i] }));

  const cohorts = useMemo(() => COHORT_ORDER.map((c) => {
    const rows = students.filter((s) => s.cohort === c);
    const collected = rows.reduce((a, s) => a + s.total, 0);
    const unpaid = rows.filter((s) => s.total <= 0).length;
    return { code: c, start: startOf(c), count: rows.length, collected, unpaid };
  }).sort((a, b) => b.collected - a.collected), []);

  const maxCohort = Math.max(...cohorts.map((c) => c.collected));

  const filtered = useMemo(() => {
    let r = students;
    if (activeCohort) r = r.filter((s) => s.cohort === activeCohort);
    const q = query.trim().toLowerCase();
    if (q) r = r.filter((s) => s.name.toLowerCase().includes(q) || s.phone.includes(q) || s.email.toLowerCase().includes(q));
    const dir = sortDir === "asc" ? 1 : -1;
    return [...r].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name) * dir;
      if (sortKey === "cohort") return a.cohort.localeCompare(b.cohort) * dir;
      return (a.total - b.total) * dir;
    });
  }, [query, activeCohort, sortKey, sortDir]);

  const setSort = (k) => { if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc"); else { setSortKey(k); setSortDir("desc"); } };
  const refunds = students.filter((s) => s.months.some((m) => m < 0));

  const KPI = ({ icon: Icon, label, value, sub, accent }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-1 shadow-sm">
      <div className="flex items-center gap-2 text-slate-500 text-[11px] font-semibold uppercase tracking-wide">
        <Icon size={14} style={{ color: accent }} /> {label}
      </div>
      <div className="text-2xl font-bold tracking-tight tabular-nums" style={{ color: "#1F3864" }}>{value}</div>
      {sub && <div className="text-xs text-slate-400">{sub}</div>}
    </div>
  );

  return (
    <div className="min-h-screen w-full" style={{ background: "#F3F5F9", fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "#2E75B6" }}>erxes Academy</div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "#1F3864" }}>Суралцагчдын төлбөрийн самбар</h1>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-400 uppercase tracking-wide font-semibold">Нийт цугласан (1–6 сар)</div>
            <div className="text-3xl font-bold tracking-tight tabular-nums" style={{ color: "#0E7C86" }}>{fmt(grand)} ₮</div>
          </div>
        </div>

        {/* Banner */}
        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 mb-5 text-[12px] text-amber-900">
          <AlertTriangle size={15} className="mt-0.5 shrink-0" />
          <span>Энэ нь холбоосноос уншсан датад суурилсан ажлын хувилбар. <b>1–3 сар бүрэн зөв</b>; 4–6 сарын зарим мөр дутуу байж болзошгүй. Одоогийн табаа Excel-ээр татаж (File → Download → Microsoft Excel) оруулбал тоог яг болгоно.</span>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <KPI icon={Wallet} label="Нийт цугласан" value={`${fmtShort(grand)} ₮`} sub={`${fmt(grand)} ₮`} accent="#0E7C86" />
          <KPI icon={Users} label="Суралцагч" value={students.length} sub={`${students.filter(s=>s.total>0).length} төлбөр хийсэн`} accent="#2E75B6" />
          <KPI icon={Layers} label="Хөтөлбөр" value={cohorts.length} sub="идэвхтэй cohort" accent="#1F3864" />
          <KPI icon={TrendingUp} label="Хамгийн идэвхтэй" value="4-р сар" sub={`${fmtShort(Math.max(...monthTotals))} ₮ цугласан`} accent="#5B8C5A" />
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-2 gap-4 mb-5">
          {/* Monthly */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="text-sm font-bold mb-3" style={{ color: "#1F3864" }}>Сар бүрийн орлого</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={fmtShort} tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={42} />
                <Tooltip formatter={(v) => [`${fmt(v)} ₮`, "Орлого"]} cursor={{ fill: "#EEF2FA" }} contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} />
                <Bar dataKey="value" radius={[5, 5, 0, 0]} fill="#2E75B6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cohort breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-bold" style={{ color: "#1F3864" }}>Хөтөлбөрөөр</div>
              {activeCohort && (
                <button onClick={() => setActiveCohort(null)} className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800">
                  <X size={12} /> шүүлт цэвэрлэх
                </button>
              )}
            </div>
            <div className="space-y-2 max-h-[220px] overflow-auto pr-1">
              {cohorts.map((c) => {
                const on = activeCohort === c.code;
                return (
                  <button key={c.code} onClick={() => setActiveCohort(on ? null : c.code)}
                    className={`w-full text-left group ${on ? "opacity-100" : "opacity-90 hover:opacity-100"}`}>
                    <div className="flex items-center justify-between text-[11px] mb-0.5">
                      <span className="font-semibold truncate" style={{ color: on ? "#1F3864" : "#475569" }}>{c.code}</span>
                      <span className="tabular-nums text-slate-500 shrink-0 ml-2">{fmt(c.collected)} ₮ · {c.count} хүн</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(2, (c.collected / maxCohort) * 100)}%`, background: cohortColor(c.code), outline: on ? "2px solid #1F3864" : "none" }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Refund note */}
        {refunds.length > 0 && (
          <div className="text-[12px] text-slate-500 mb-3">
            <b className="text-rose-600">Буцаалт/тохируулга:</b> {refunds.map((r) => `${r.name} (${fmt(r.total)} ₮)`).join(" · ")}
          </div>
        )}

        {/* Table controls */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 p-3 border-b border-slate-100">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Нэр, утас, имэйлээр хайх..."
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div className="text-xs text-slate-500">
              {filtered.length} мөр{activeCohort ? ` · ${activeCohort}` : ""} · нийт {fmt(filtered.reduce((a, s) => a + s.total, 0))} ₮
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-slate-500 bg-slate-50 text-[11px] uppercase tracking-wide">
                  <th className="py-2 px-3 font-semibold">#</th>
                  <th className="py-2 px-2 font-semibold cursor-pointer select-none" onClick={() => setSort("cohort")}>Хөтөлбөр</th>
                  <th className="py-2 px-2 font-semibold cursor-pointer select-none" onClick={() => setSort("name")}>Харилцагч</th>
                  <th className="py-2 px-2 font-semibold hidden sm:table-cell">Утас</th>
                  {MONTHS.map((m) => <th key={m} className="py-2 px-1 font-semibold text-right hidden md:table-cell">{m.replace("-р сар", "")}</th>)}
                  <th className="py-2 px-3 font-semibold text-right cursor-pointer select-none" onClick={() => setSort("total")}>Нийт ₮ {sortKey === "total" ? (sortDir === "desc" ? "↓" : "↑") : ""}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, idx) => (
                  <tr key={s.id} className="border-t border-slate-50 hover:bg-blue-50/40">
                    <td className="py-1.5 px-3 text-slate-400 tabular-nums">{idx + 1}</td>
                    <td className="py-1.5 px-2">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: cohortColor(s.cohort) }} />
                        <span className="text-slate-500 text-[11px]">{s.cohort}</span>
                      </span>
                    </td>
                    <td className="py-1.5 px-2 font-medium text-slate-800">{s.name}</td>
                    <td className="py-1.5 px-2 text-slate-500 tabular-nums hidden sm:table-cell">{s.phone}</td>
                    {s.months.map((m, i) => (
                      <td key={i} className={`py-1.5 px-1 text-right tabular-nums hidden md:table-cell ${m < 0 ? "text-rose-600" : m > 0 ? "text-slate-700" : "text-slate-300"}`}>
                        {m === 0 ? "·" : fmtShort(m)}
                      </td>
                    ))}
                    <td className={`py-1.5 px-3 text-right font-semibold tabular-nums ${s.total < 0 ? "text-rose-600" : s.total > 0 ? "text-slate-900" : "text-slate-300"}`}>
                      {s.total === 0 ? "·" : fmt(s.total)}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={11} className="py-10 text-center text-slate-400 text-sm">Илэрц олдсонгүй. Хайлтаа өөрчилнө үү.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 mt-4 text-center">
          Хөтөлбөрийн зураас дээр дарж тухайн cohort-оор шүүнэ · баганын гарчиг дээр дарж эрэмбэлнэ · "·" = тухайн сар төлбөргүй.
        </div>
      </div>
    </div>
  );
}
