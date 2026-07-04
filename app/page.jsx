"use client";

import { useEffect, useState } from "react";

// ————————————————————————————————————————————
// TENSIR — landing v1
// White/black + crimson accents. 8 languages, flag switcher in footer.
// Video: placeholder block, swap <VideoPlaceholder/> for <video> later.
// ————————————————————————————————————————————

const MONO = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS = "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif";

// Tensir mark — master geometry, crimson palette (from final PNG).
const FRAG_DARK = "#671D18";
const FRAG = "#CB433A";
const CRACK = "#FFFFFF";

// Icon palette
const IC_INK = "#0B0F13";
const IC_RED = "#CB433A";
const IC_DEEP = "#671D18";

// ————— SVG flags (emoji flags don't render on Windows) —————
function Flag({ code }) {
  const W = 20, H = 14;
  const flags = {
    en: (
      <svg width={W} height={H} viewBox="0 0 60 42">
        <rect width="60" height="42" fill="#012169" />
        <path d="M0,0 L60,42 M60,0 L0,42" stroke="#FFF" strokeWidth="8" />
        <path d="M0,0 L60,42 M60,0 L0,42" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 V42 M0,21 H60" stroke="#FFF" strokeWidth="12" />
        <path d="M30,0 V42 M0,21 H60" stroke="#C8102E" strokeWidth="7" />
      </svg>
    ),
    fr: (
      <svg width={W} height={H} viewBox="0 0 60 42">
        <rect width="20" height="42" fill="#002395" />
        <rect x="20" width="20" height="42" fill="#FFF" />
        <rect x="40" width="20" height="42" fill="#ED2939" />
      </svg>
    ),
    de: (
      <svg width={W} height={H} viewBox="0 0 60 42">
        <rect width="60" height="14" fill="#000" />
        <rect y="14" width="60" height="14" fill="#DD0000" />
        <rect y="28" width="60" height="14" fill="#FFCE00" />
      </svg>
    ),
    it: (
      <svg width={W} height={H} viewBox="0 0 60 42">
        <rect width="20" height="42" fill="#009246" />
        <rect x="20" width="20" height="42" fill="#FFF" />
        <rect x="40" width="20" height="42" fill="#CE2B37" />
      </svg>
    ),
    es: (
      <svg width={W} height={H} viewBox="0 0 60 42">
        <rect width="60" height="42" fill="#AA151B" />
        <rect y="10.5" width="60" height="21" fill="#F1BF00" />
      </svg>
    ),
    ja: (
      <svg width={W} height={H} viewBox="0 0 60 42">
        <rect width="60" height="42" fill="#FFF" stroke="#DDD" strokeWidth="1" />
        <circle cx="30" cy="21" r="12" fill="#BC002D" />
      </svg>
    ),
    ko: (
      <svg width={W} height={H} viewBox="0 0 60 42">
        <rect width="60" height="42" fill="#FFF" stroke="#DDD" strokeWidth="1" />
        <path d="M30 9 A12 12 0 0 1 30 33 A6 6 0 0 1 30 21 A6 6 0 0 0 30 9" fill="#CD2E3A" />
        <path d="M30 33 A12 12 0 0 1 30 9 A6 6 0 0 1 30 21 A6 6 0 0 0 30 33" fill="#0047A0" />
      </svg>
    ),
    zh: (
      <svg width={W} height={H} viewBox="0 0 60 42">
        <rect width="60" height="42" fill="#FE0000" />
        <rect width="30" height="21" fill="#000095" />
        <circle cx="15" cy="10.5" r="6" fill="#FFF" />
        <circle cx="15" cy="10.5" r="4.5" fill="#000095" />
        <circle cx="15" cy="10.5" r="3" fill="#FFF" />
      </svg>
    ),
  };
  return flags[code] || null;
}

const LANGS = [
  { code: "en" },
  { code: "fr" },
  { code: "de" },
  { code: "it" },
  { code: "es" },
  { code: "ja" },
  { code: "ko" },
  { code: "zh" },
];

const T = {
  en: {
    hero: ["Compounding", "simulations"],
    sub: "The switchboard for chemistry R&D",
    createAccount: "Create account",
    getStarted: "Get started",
    sectionTitle: "Core concepts of Tensir",
    heads: ["Build pipelines", "Unify compute", "Forecast budget", "Trace provenance", "Assign authority"],
    bodies: [
      "custom sequence to answer this : do we keep working on this compound or trash it ??",
      "qpu gpu, ai models — cloud on prem (my take: sporadic forever). there you see the whole arena.",
      "(personal opinion : the best) l'argent, le cash, la thune, le fric. chemistry compute is expensive, see exactly where it goes !",
      "the biography, the records, the life story.",
      "provide your teams with the best prod tools.",
    ],
    industries: ["Pharma", "Chemicals", "Energy", "Semiconductors", "Aerospace", "Nuclear", "Robotics"],
    quote: "\u201CSome interesting things happen once fragments are able to stack.\u201D",
    founder: "Eric — Founder, Tensir",
    investors: "Investors",
    careers: "Careers",
    faq: "FAQ",
    rights: "All rights reserved.",
  },
  fr: {
    hero: ["Simulations", "composées"],
    sub: "Le poste d'aiguillage de la R&D chimie",
    createAccount: "Créer un compte",
    getStarted: "Commencer",
    sectionTitle: "Concepts clés de Tensir",
    heads: ["Construire des pipelines", "Unifier le calcul", "Prévoir le budget", "Tracer la provenance", "Attribuer l'autorité"],
    bodies: [
      "une séquence sur mesure pour répondre à ça : on continue sur ce composé ou on le jette ??",
      "qpu gpu, modèles ia — cloud, on-prem (mon avis : sporadique pour toujours). là, tu vois toute l'arène.",
      "(avis perso : le meilleur) l'argent, le cash, la thune, le fric. le calcul en chimie coûte cher, vois exactement où ça part !",
      "la biographie, les archives, l'histoire d'une vie.",
      "donne à tes équipes les meilleurs outils de prod.",
    ],
    industries: ["Pharma", "Chimie", "Énergie", "Semi-conducteurs", "Aérospatiale", "Nucléaire", "Robotique"],
    quote: "« Des choses intéressantes arrivent quand les fragments peuvent s'empiler. »",
    founder: "Eric — Fondateur, Tensir",
    investors: "Investisseurs",
    careers: "Carrières",
    faq: "FAQ",
    rights: "Tous droits réservés.",
  },
  de: {
    hero: ["Simulationen", "mit Zinseszins"],
    sub: "Die Schaltzentrale der Chemie-F&E",
    createAccount: "Konto erstellen",
    getStarted: "Loslegen",
    sectionTitle: "Kernkonzepte von Tensir",
    heads: ["Pipelines bauen", "Rechenleistung vereinen", "Budget prognostizieren", "Provenienz nachverfolgen", "Autorität zuweisen"],
    bodies: [
      "eine maßgeschneiderte Sequenz für diese Frage: weitermachen mit dieser Verbindung oder ab in den Müll ??",
      "qpu gpu, ki-modelle — cloud, on-prem (meine Meinung: für immer sporadisch). da siehst du die ganze Arena.",
      "(persönliche Meinung: das Beste) l'argent, le cash, la thune, le fric. Chemie-Computing ist teuer — sieh genau, wohin es fließt!",
      "die Biografie, die Akten, die Lebensgeschichte.",
      "gib deinen Teams die besten Prod-Tools.",
    ],
    industries: ["Pharma", "Chemie", "Energie", "Halbleiter", "Luft- und Raumfahrt", "Nuklear", "Robotik"],
    quote: "\u201EInteressante Dinge passieren, sobald sich Fragmente stapeln lassen.\u201C",
    founder: "Eric — Gründer, Tensir",
    investors: "Investoren",
    careers: "Karriere",
    faq: "FAQ",
    rights: "Alle Rechte vorbehalten.",
  },
  it: {
    hero: ["Simulazioni", "composte"],
    sub: "La centrale di comando della R&S chimica",
    createAccount: "Crea un account",
    getStarted: "Inizia",
    sectionTitle: "Concetti chiave di Tensir",
    heads: ["Costruisci pipeline", "Unifica il calcolo", "Prevedi il budget", "Traccia la provenienza", "Assegna l'autorità"],
    bodies: [
      "una sequenza su misura per rispondere a questo: continuiamo con questo composto o lo buttiamo ??",
      "qpu gpu, modelli ia — cloud, on-prem (secondo me: sporadico per sempre). lì vedi tutta l'arena.",
      "(opinione personale: il migliore) l'argent, le cash, la thune, le fric. il calcolo in chimica costa caro, guarda esattamente dove va!",
      "la biografia, gli archivi, la storia di una vita.",
      "dai ai tuoi team i migliori strumenti di prod.",
    ],
    industries: ["Farmaceutica", "Chimica", "Energia", "Semiconduttori", "Aerospazio", "Nucleare", "Robotica"],
    quote: "\u201CCose interessanti accadono quando i frammenti possono impilarsi.\u201D",
    founder: "Eric — Fondatore, Tensir",
    investors: "Investitori",
    careers: "Carriere",
    faq: "FAQ",
    rights: "Tutti i diritti riservati.",
  },
  es: {
    hero: ["Simulaciones", "compuestas"],
    sub: "La centralita de la I+D química",
    createAccount: "Crear cuenta",
    getStarted: "Empezar",
    sectionTitle: "Conceptos clave de Tensir",
    heads: ["Construye pipelines", "Unifica el cómputo", "Pronostica el presupuesto", "Rastrea la procedencia", "Asigna la autoridad"],
    bodies: [
      "una secuencia a medida para responder esto: ¿seguimos con este compuesto o lo tiramos?",
      "qpu gpu, modelos de ia — cloud, on-prem (mi opinión: esporádico para siempre). ahí ves toda la arena.",
      "(opinión personal: lo mejor) l'argent, le cash, la thune, le fric. el cómputo químico es caro, ¡ve exactamente a dónde va!",
      "la biografía, los registros, la historia de una vida.",
      "dale a tus equipos las mejores herramientas de prod.",
    ],
    industries: ["Farmacéutica", "Química", "Energía", "Semiconductores", "Aeroespacial", "Nuclear", "Robótica"],
    quote: "\u201CCosas interesantes ocurren cuando los fragmentos pueden apilarse.\u201D",
    founder: "Eric — Fundador, Tensir",
    investors: "Inversores",
    careers: "Empleo",
    faq: "FAQ",
    rights: "Todos los derechos reservados.",
  },
  ja: {
    hero: ["複利の", "シミュレーション"],
    sub: "化学R&Dの司令塔",
    createAccount: "アカウント作成",
    getStarted: "はじめる",
    sectionTitle: "Tensirのコアコンセプト",
    heads: ["パイプラインを構築", "計算資源を統合", "予算を予測", "来歴を追跡", "権限を割り当て"],
    bodies: [
      "この問いに答えるためのカスタムシーケンス：この化合物、続ける？それとも捨てる？？",
      "qpu、gpu、aiモデル — クラウドもオンプレも（私見：永遠に散発的）。アリーナ全体がそこに見える。",
      "（個人的見解：これが最高）l'argent, le cash, la thune, le fric。化学計算は高くつく。どこに消えるか正確に見よう！",
      "経歴、記録、その一生の物語。",
      "チームに最高のプロダクションツールを。",
    ],
    industries: ["製薬", "化学", "エネルギー", "半導体", "航空宇宙", "原子力", "ロボティクス"],
    quote: "「断片が積み重なるようになると、面白いことが起きる。」",
    founder: "Eric — 創業者, Tensir",
    investors: "投資家",
    careers: "採用",
    faq: "FAQ",
    rights: "無断転載を禁じます。",
  },
  ko: {
    hero: ["복리로 쌓이는", "시뮬레이션"],
    sub: "화학 R&D의 컨트롤 타워",
    createAccount: "계정 만들기",
    getStarted: "시작하기",
    sectionTitle: "Tensir의 핵심 개념",
    heads: ["파이프라인 구축", "컴퓨팅 통합", "예산 예측", "이력 추적", "권한 부여"],
    bodies: [
      "이 질문에 답하기 위한 맞춤 시퀀스: 이 화합물, 계속 갈까 버릴까??",
      "qpu gpu, ai 모델 — 클라우드, 온프레미스 (내 생각: 영원히 산발적). 거기서 전체 판이 보인다.",
      "(개인 의견: 최고) l'argent, le cash, la thune, le fric. 화학 컴퓨팅은 비싸다. 돈이 어디로 가는지 정확히 보라!",
      "전기, 기록, 일생의 이야기.",
      "팀에게 최고의 프로덕션 도구를.",
    ],
    industries: ["제약", "화학", "에너지", "반도체", "항공우주", "원자력", "로보틱스"],
    quote: "\u201C조각들이 쌓일 수 있게 되면, 흥미로운 일들이 일어난다.\u201D",
    founder: "Eric — 창업자, Tensir",
    investors: "투자자",
    careers: "채용",
    faq: "FAQ",
    rights: "모든 권리 보유.",
  },
  zh: {
    hero: ["複利式", "模擬"],
    sub: "化學研發的調度中樞",
    createAccount: "建立帳戶",
    getStarted: "開始使用",
    sectionTitle: "Tensir 核心概念",
    heads: ["建立管線", "統一運算", "預測預算", "追蹤溯源", "指派權限"],
    bodies: [
      "一條客製化流程，回答這個問題：這個化合物要繼續做，還是丟掉？？",
      "qpu、gpu、ai 模型 — 雲端、地端（我的看法：永遠零散）。整個競技場一覽無遺。",
      "（個人意見：最棒的）l'argent, le cash, la thune, le fric。化學運算很貴，清楚看到每一分錢的去向！",
      "傳記、紀錄、一生的故事。",
      "給你的團隊最好的生產工具。",
    ],
    industries: ["製藥", "化學", "能源", "半導體", "航太", "核能", "機器人"],
    quote: "「當碎片得以堆疊，有趣的事就會發生。」",
    founder: "Eric — 創辦人, Tensir",
    investors: "投資人",
    careers: "職涯",
    faq: "常見問題",
    rights: "版權所有。",
  },
};

function TensirMark({ size = 28, id = "m" }) {
  const clip = `tensir-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Tensir">
      <clipPath id={clip}>
        <rect width="100" height="100" />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        <rect width="100" height="100" fill={FRAG_DARK} />
        <polygon points="22.9,83.3 3.6,100.0 0.0,100.0 0.0,67.1 13.2,64.0" fill={FRAG} />
        <polygon points="13.2,64.0 0.0,67.1 0.0,0.0 9.2,0.0 35.4,29.3" fill={FRAG} />
        <polygon points="35.4,29.3 9.2,0.0 67.9,0.0 64.3,17.9" fill={FRAG} />
        <polygon points="64.3,17.9 67.9,0.0 100.0,0.0 100.0,4.1 87.2,18.9" fill={FRAG} />
        <polygon points="90.1,57.1 78.7,71.6 66.6,84.7 22.9,83.3 13.2,64.0 35.4,29.3 64.3,17.9 87.2,18.9" fill={CRACK} />
        <polygon points="84.7,61.0 105.5,63.3 106.4,54.3 85.6,52.1" fill={CRACK} />
        <polygon points="72.0,71.8 101.7,96.7 107.5,89.8 77.7,64.9" fill={CRACK} />
        <polygon points="60.8,81.2 68.7,107.0 77.3,104.4 69.5,78.6" fill={CRACK} />
        <polygon points="23.7,76.6 -3.8,100.5 2.0,107.3 29.6,83.4" fill={CRACK} />
        <polygon points="17.0,58.5 -6.9,64.1 -4.8,72.9 19.1,67.2" fill={CRACK} />
        <polygon points="42.1,30.0 8.5,-7.5 1.8,-1.5 35.4,36.0" fill={CRACK} />
        <polygon points="67.7,23.7 73.5,-5.0 64.6,-6.8 58.9,21.9" fill={CRACK} />
        <polygon points="87.3,25.6 107.3,2.5 100.5,-3.4 80.5,19.7" fill={CRACK} />
      </g>
    </svg>
  );
}

// ————— Custom icon set — retro-futurist, angular, crimson accents —————
function IconPipelines({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M4 44 L20 44 L30 24 L60 24" stroke={IC_INK} strokeWidth="2.5" />
      <path d="M4 50 L22 50 L32 30 L60 30" stroke={IC_RED} strokeWidth="2.5" />
      <path d="M24 18 L28 24 L24 30" stroke={IC_INK} strokeWidth="2" />
      <path d="M42 18 L46 24 L42 30" stroke={IC_RED} strokeWidth="2" />
      <rect x="2" y="41" width="6" height="12" fill={IC_DEEP} />
      <rect x="56" y="21" width="6" height="12" fill={IC_RED} />
      <path d="M34 30 L38 40 L46 44" stroke={IC_INK} strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M44 41 L49 47 M49 41 L44 47" stroke={IC_DEEP} strokeWidth="2" />
    </svg>
  );
}

function IconCompute({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M32 14 L46 22 L46 40 L32 48 L18 40 L18 22 Z" stroke={IC_INK} strokeWidth="2.5" />
      <path d="M32 22 L39 26 L39 36 L32 40 L25 36 L25 26 Z" fill={IC_RED} />
      <path d="M32 14 L32 2 M46 22 L58 15 M46 40 L58 49 M32 48 L32 62 M18 40 L6 49 M18 22 L6 15" stroke={IC_DEEP} strokeWidth="2" />
      <rect x="29.5" y="0" width="5" height="5" fill={IC_INK} />
      <rect x="56" y="12" width="5" height="5" fill={IC_INK} />
      <rect x="56" y="47" width="5" height="5" fill={IC_INK} />
      <rect x="29.5" y="59" width="5" height="5" fill={IC_INK} />
      <rect x="3" y="47" width="5" height="5" fill={IC_INK} />
      <rect x="3" y="12" width="5" height="5" fill={IC_INK} />
    </svg>
  );
}

function IconBudget({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M8 54 L8 42 L16 42 L16 54" stroke={IC_INK} strokeWidth="2.5" />
      <path d="M22 54 L22 32 L30 32 L30 54" stroke={IC_INK} strokeWidth="2.5" />
      <path d="M36 54 L36 22 L44 22 L44 54" fill={IC_DEEP} />
      <path d="M8 38 L26 26 L44 16 L58 8" stroke={IC_RED} strokeWidth="2.5" strokeDasharray="5 4" />
      <path d="M58 8 L50 8 M58 8 L58 16" stroke={IC_RED} strokeWidth="2.5" />
      <path d="M4 54 L60 54" stroke={IC_INK} strokeWidth="2.5" />
      <circle cx="54" cy="44" r="6" stroke={IC_RED} strokeWidth="2" />
      <path d="M54 41 L54 47" stroke={IC_RED} strokeWidth="2" />
    </svg>
  );
}

function IconProvenance({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="8" r="4" fill={IC_RED} />
      <path d="M32 12 L32 26" stroke={IC_INK} strokeWidth="2.5" />
      <path d="M32 26 L16 38 M32 26 L48 38" stroke={IC_INK} strokeWidth="2.5" />
      <path d="M16 42 L16 52 M48 42 L48 52" stroke={IC_DEEP} strokeWidth="2.5" />
      <rect x="12" y="38" width="8" height="5" fill={IC_INK} />
      <rect x="44" y="38" width="8" height="5" fill={IC_INK} />
      <circle cx="16" cy="56" r="4" fill={IC_RED} />
      <path d="M45 53 L51 59 M51 53 L45 59" stroke={IC_DEEP} strokeWidth="2.5" />
      <path d="M56 10 L62 10 M56 15 L62 15 M56 20 L62 20" stroke={IC_RED} strokeWidth="1.5" />
    </svg>
  );
}

function IconAuthority({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M32 4 L54 12 L54 32 C54 46 44 55 32 60 C20 55 10 46 10 32 L10 12 Z" stroke={IC_INK} strokeWidth="2.5" />
      <circle cx="32" cy="24" r="6" fill={IC_RED} />
      <path d="M20 44 L26 34 L38 34 L44 44" stroke={IC_DEEP} strokeWidth="2.5" />
      <path d="M24 48 L30 53 L42 41" stroke={IC_RED} strokeWidth="2.5" />
    </svg>
  );
}

const ICONS = [IconPipelines, IconCompute, IconBudget, IconProvenance, IconAuthority];

function VideoPlaceholder() {
  return (
    <div className="w-full border border-black relative" style={{ aspectRatio: "16 / 9" }}>
      {/* Swap this div for:
          <video autoPlay muted loop playsInline src="/hero.mp4" className="w-full h-full object-cover" />
      */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs tracking-widest uppercase text-black/40" style={{ fontFamily: MONO }}>
          [ 30s product capture — autoplay muted loop ]
        </span>
      </div>
      <span className="absolute top-2 left-2 text-[10px] text-black/30" style={{ fontFamily: MONO }}>REC</span>
      <span className="absolute bottom-2 right-2 text-[10px] text-black/30" style={{ fontFamily: MONO }}>00:30</span>
    </div>
  );
}

export default function TensirLanding() {
  const [loaded, setLoaded] = useState(false);
  const [lang, setLang] = useState("en");
  const t = T[lang];

  useEffect(() => {
    const tm = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(tm);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black antialiased" style={{ fontFamily: SANS }}>
      {/* ————— NAV ————— */}
      <header className="max-w-5xl mx-auto px-6 pt-8 flex items-baseline justify-between">
        <span className="flex items-center gap-3">
          <TensirMark size={28} id="nav" />
          <span className="text-lg font-bold tracking-tight">Tensir</span>
        </span>
        <a
          href="mailto:contact@tensir.ai"
          className="text-xs uppercase tracking-widest underline underline-offset-4 hover:no-underline"
          style={{ fontFamily: MONO }}
        >
          {t.getStarted}
        </a>
      </header>

      {/* ————— HERO ————— */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div>
            <h1
              className="font-extrabold tracking-tight leading-[0.95]"
              style={{
                fontSize: "clamp(2.75rem, 8vw, 6.5rem)",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : "translateY(8px)",
                transition: "opacity 600ms ease, transform 600ms ease",
              }}
            >
              {t.hero[0]}
              <br />
              {t.hero[1]}
            </h1>
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-black/60" style={{ fontFamily: MONO }}>
              {t.sub}
            </p>
          </div>
          <div
            className="shrink-0 self-start md:self-center"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 800ms ease 200ms" }}
          >
            <TensirMark size={180} id="hero" />
          </div>
        </div>

        <div className="mt-14">
          <VideoPlaceholder />
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="https://app.tensir.ai/sign-up"
            className="inline-block bg-black text-white border border-black px-8 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            style={{ fontFamily: MONO }}
          >
            {t.createAccount}
          </a>
          <a
            href="mailto:contact@tensir.ai"
            className="inline-block border border-black px-8 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            style={{ fontFamily: MONO }}
          >
            {t.getStarted}
          </a>
        </div>
      </section>

      {/* ————— ELEVATOR PITCH ————— */}
      <section className="border-t border-black">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-xl md:text-2xl font-extrabold italic tracking-tight mb-14">
            {t.sectionTitle}
          </h2>
          <div className="space-y-12">
            {t.heads.map((head, i) => {
              const Icon = ICONS[i];
              return (
                <div
                  key={head}
                  className="grid grid-cols-1 md:grid-cols-[220px_1fr_auto] gap-2 md:gap-8 items-baseline"
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-black/50" style={{ fontFamily: MONO }}>
                    {head}
                  </span>
                  <p className="text-2xl md:text-[2rem] font-semibold leading-snug tracking-tight">
                    {t.bodies[i]}
                  </p>
                  <div className="hidden md:block self-center">
                    <Icon size={56} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ————— INDUSTRIES STRIP (marquee) ————— */}
      <section className="border-t border-black overflow-hidden">
        <style>{`
          @keyframes tensir-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .tensir-marquee-track {
            display: flex;
            width: max-content;
            animation: tensir-marquee 28s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .tensir-marquee-track { animation: none; }
          }
        `}</style>
        <div className="py-10">
          <div className="tensir-marquee-track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 text-sm md:text-base tracking-[0.15em] uppercase text-black/70"
                style={{ fontFamily: MONO }}
              >
                {t.industries.map((name) => (
                  <span key={`${copy}-${name}`} className="whitespace-nowrap px-6 flex items-center gap-6">
                    {name}
                    <span className="text-black/30">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— FOUNDER QUOTE ————— */}
      <section className="border-t border-black">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <blockquote className="max-w-3xl">
            <p className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {t.quote}
            </p>
            <footer className="mt-8 text-xs uppercase tracking-[0.2em] text-black/50" style={{ fontFamily: MONO }}>
              {t.founder}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ————— FOOTER ————— */}
      <footer className="border-t border-black">
        <div
          className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-black/50"
          style={{ fontFamily: MONO }}
        >
          <span>Tensir — Paris</span>
          <span className="flex items-center gap-6 text-sm md:text-base text-black/80">
            <a href="/investors" className="underline underline-offset-4 hover:no-underline">
              {t.investors}
            </a>
            <a href="/careers" className="underline underline-offset-4 hover:no-underline">
              {t.careers}
            </a>
            <a href="/faq" className="underline underline-offset-4 hover:no-underline">
              {t.faq}
            </a>
          </span>
          <span className="flex items-center gap-4">
            <a href="mailto:contact@tensir.ai" className="underline underline-offset-4 hover:no-underline">
              contact@tensir.ai
            </a>
            <a
              href="https://www.linkedin.com/company/tensir"
              aria-label="Tensir on LinkedIn"
              className="hover:opacity-70 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
            {/* language switcher */}
            <span className="flex items-center gap-2 ml-2">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  aria-label={l.code}
                  className={
                    "leading-none flex items-center transition-opacity " +
                    (lang === l.code
                      ? "opacity-100 outline outline-1 outline-black"
                      : "opacity-50 hover:opacity-90")
                  }
                >
                  <Flag code={l.code} />
                </button>
              ))}
            </span>
          </span>
          <span>© {new Date().getFullYear()} Tensir SASU. {t.rights}</span>
        </div>
      </footer>
    </div>
  );
}
