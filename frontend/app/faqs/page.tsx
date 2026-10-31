"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  EDIT THIS BLOCK: your real details                                 */
/* ------------------------------------------------------------------ */
const INSTITUTE = {
  name: "International Institute of Languages & Study Abroad",
  phoneDisplay: "086300 48365",
  phoneTel: "+918630048365",
  whatsapp: "918630048365",
  address: "E-15, near M.I.T College, Ram Ganga Vihar Phase 2, Moradabad, UP 244105",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=International+Institute+of+Languages+and+Study+Abroad+Moradabad",
  logo: "/IIL-logo.png", // file placed in frontend/public/
  enquiryHref: "/contact",
};

// Indicative prices from your Google listing. Change or delete anytime.
const FEES = {
  spoken: "₹7,480",
  german: "₹45,000",
  french: "₹29,499",
  japanese: "₹45,000 – ₹68,000",
};

/* ------------------------------------------------------------------ */
/*  FAQ DATA (kept factual, no over-promising)                         */
/* ------------------------------------------------------------------ */
type QA = { q: string; a: string };
type Category = { id: string; label: string; blurb: string; color: string; items: QA[] };

const CATEGORIES: Category[] = [
  {
    id: "ielts",
    label: "IELTS / PTE",
    blurb: "Exam coaching and practice",
    color: "#e11d48",
    items: [
      {
        q: "Which exams do you prepare students for?",
        a: "We offer coaching for IELTS, PTE, TOEFL and OET. Please contact us to confirm which batches are currently running.",
      },
      {
        q: "Do you conduct mock tests?",
        a: "Practice tests are part of exam preparation. The number of tests and the feedback format can differ by course, so please ask our team what your batch includes.",
      },
      {
        q: "Can you guarantee a band score?",
        a: "No. Your result depends on your own practice and on the exam day. We can guide you with structured lessons and personal attention, but we do not promise a particular score.",
      },
      {
        q: "Should I choose IELTS or PTE?",
        a: "Both are widely accepted, but requirements differ by university and country. Check what your target institution accepts, and our team can help you compare the two for your plan.",
      },
      {
        q: "How long does preparation take?",
        a: "It depends on your current level, your target score and how regularly you practise. After understanding your level, our team can suggest a realistic timeline.",
      },
      {
        q: "Do you offer OET for healthcare professionals?",
        a: "Yes, OET training is offered for healthcare professionals. Please contact us for current batch and fee details.",
      },
    ],
  },
  {
    id: "spoken",
    label: "Spoken English",
    blurb: "Fluency and confidence",
    color: "#2563eb",
    items: [
      {
        q: "I am a complete beginner. Can I join?",
        a: "Yes, beginners are welcome. Our team will understand your current level and suggest a suitable batch.",
      },
      {
        q: "What does the Spoken English course cover?",
        a: "The course focuses on speaking confidence, vocabulary, grammar for everyday conversation, pronunciation and public speaking. Personality development and interview communication are also offered. The exact syllabus can vary by course.",
      },
      {
        q: "What is the fee for Spoken English?",
        a: `Our Google listing shows the English speaking course at around ${FEES.spoken}. Fees can change with batch and duration, so please call ${INSTITUTE.phoneDisplay} to confirm the current amount.`,
      },
      {
        q: "How quickly will my English improve?",
        a: "It differs from student to student and depends on regular attendance and practice outside class. Many students mention gaining confidence, but we cannot promise a fixed result in a fixed time.",
      },
      {
        q: "Are online classes available?",
        a: "We offer both offline and online options. Please confirm availability for your chosen course when you contact us.",
      },
    ],
  },
  {
    id: "languages",
    label: "Foreign Languages",
    blurb: "German, French, Spanish, Japanese",
    color: "#7c3aed",
    items: [
      {
        q: "Which foreign languages do you teach?",
        a: "German, French, Spanish and Japanese. Please check with us which batches are currently open.",
      },
      {
        q: "What are the fees for German, French and Japanese?",
        a: `Fees shown on our Google listing are approximately German ${FEES.german}, French ${FEES.french} and Japanese ${FEES.japanese}. These can change, so please call us to confirm the fee for your batch.`,
      },
      {
        q: "Will I be prepared for official language exams?",
        a: "Language courses are taught level by level. If you have a specific exam in mind, such as Goethe for German, please ask about the preparation available when you enquire.",
      },
      {
        q: "Which language is right for studying or working abroad?",
        a: "It depends on the country and the course or job you are aiming for. For example, German is relevant for Germany and French for France. Talk to our counsellors with your plan and they will advise you.",
      },
      {
        q: "Do I need to know English before joining?",
        a: "Basic English is helpful because classes involve English. If you are not comfortable yet, ask us about taking Spoken English alongside.",
      },
    ],
  },
  {
    id: "visa",
    label: "Study Abroad & Visa",
    blurb: "Applications and visa guidance",
    color: "#059669",
    items: [
      {
        q: "What does your study abroad service include?",
        a: "We guide students with course and university selection, applications, documents and visa filing. The exact support depends on the country and your profile, so please speak to our team about your case.",
      },
      {
        q: "Which countries do you guide for?",
        a: "We guide students for several study destinations, including Canada, and also offer MBBS abroad guidance. Please ask for the list of countries we currently handle.",
      },
      {
        q: "Do I need IELTS or PTE to study abroad?",
        a: "Most English-speaking destinations ask for an English test score, but requirements differ by university, course and country. We can check this for your specific profile.",
      },
      {
        q: "Can you guarantee my visa?",
        a: "No. Visa decisions are made only by the embassy or immigration authority. We can help you prepare your documents and application properly, but we cannot guarantee an approval.",
      },
      {
        q: "When should I start the process?",
        a: "Earlier is better, because the English test, applications and visa all take time. The right timeline depends on the country and intake, so contact us as soon as you are considering it.",
      },
    ],
  },
  {
    id: "admission",
    label: "Admission & Fees",
    blurb: "Joining, batches and payment",
    color: "#ea580c",
    items: [
      {
        q: "How do I take admission?",
        a: "Call or message us, or visit the centre. Our team will explain the course, available batches and fee, and guide you through the admission steps.",
      },
      {
        q: "Are there any additional charges?",
        a: "Please ask for the complete fee details before joining, including any registration or material charges, so everything is clear in advance.",
      },
      {
        q: "Can I attend a demo class?",
        a: "Please contact us to ask whether a demo class is available for the course you are interested in.",
      },
      {
        q: "What are the batch timings?",
        a: "Batch timings depend on the course and on current availability. Contact us with your preferred time and we will tell you what is open.",
      },
      {
        q: "Can I pay the fee in instalments?",
        a: "Payment options depend on the course. Please ask our team at the time of admission.",
      },
    ],
  },
  {
    id: "about",
    label: "About IIL",
    blurb: "Location, trainers and reviews",
    color: "#0f766e",
    items: [
      {
        q: "Where is the institute located?",
        a: `We are at ${INSTITUTE.address}. The directions button at the bottom of this page opens the map.`,
      },
      {
        q: "What are your timings?",
        a: "Our Google listing shows the centre closing at 8 pm. Timings can change on holidays, so please call before visiting.",
      },
      {
        q: "Who are the trainers?",
        a: "Student reviews often mention trainers such as Maaz Sir and Bushra Ma'am. The trainer for your batch may vary, so you can ask when you enrol.",
      },
      {
        q: "What are the classrooms like?",
        a: "Student reviews describe the classrooms as clean and air-conditioned with smartboards. You are welcome to visit the centre and see them yourself.",
      },
      {
        q: "How experienced is the institute?",
        a: "We have 9+ years of experience in language training and study abroad guidance. Our Google rating is 4.8 from 332+ reviews, and you can read student feedback on our Testimonials page.",
      },
    ],
  },
];

const POPULAR: QA[] = [
  CATEGORIES[0].items[3],
  CATEGORIES[1].items[0],
  CATEGORIES[3].items[3],
  CATEGORIES[4].items[0],
  CATEGORIES[5].items[4],
];

const ALL_TABS = [
  { id: "popular", label: "Most asked", blurb: "", color: "#0b3d6b", items: POPULAR },
  ...CATEGORIES,
];

const HINTS = [
  "Search, e.g. “IELTS or PTE”",
  "Search, e.g. “German course fees”",
  "Search, e.g. “can I join online”",
  "Search, e.g. “visa guarantee”",
];

const QUICK = ["IELTS", "Beginner", "Fees", "Online classes", "Visa"];

/* ------------------------------------------------------------------ */
/*  SMART SEARCH (handles full sentences, typos and synonyms)          */
/* ------------------------------------------------------------------ */
const STOP = new Set(
  "i am a an the is are was be can could do does did you your we my me so to of in on for and or it this that what how which who when will should would please tell about there any have has if at with from by as its get want need know ok hello hi sir mam".split(" ")
);

const ALIAS: Record<string, string[]> = {
  bigner: ["beginner"], beginer: ["beginner"], begginer: ["beginner"], beginners: ["beginner"],
  basic: ["beginner"], newbie: ["beginner"], fresher: ["beginner"],
  fee: ["fees", "charges"], fees: ["fee", "charges"], price: ["fee", "fees"], cost: ["fee", "fees"],
  costs: ["fee", "fees"], charges: ["fee", "fees"], payment: ["fee", "instalments"], amount: ["fee", "fees"],
  rate: ["fee"], expensive: ["fee"], cheap: ["fee"],
  join: ["admission", "enrol"], enroll: ["admission"], enrol: ["admission"], register: ["admission"],
  registration: ["admission"], apply: ["admission"], admission: ["join"],
  ilets: ["ielts"], aielts: ["ielts"], jerman: ["german"], germany: ["german"], france: ["french"],
  japan: ["japanese"], spain: ["spanish"],
  virtual: ["online"], zoom: ["online"], remote: ["online"],
  vise: ["visa"], timing: ["timings", "batch"], timings: ["batch"], time: ["timings", "batch"],
  schedule: ["timings", "batch"], slot: ["batch", "timings"], slots: ["batch"],
  trial: ["demo"], free: ["demo"],
  overseas: ["abroad"], foreign: ["abroad", "languages"], outside: ["abroad"],
  location: ["located", "address"], address: ["located"], where: ["located"], map: ["located"],
  directions: ["located"], near: ["located"],
  teacher: ["trainers"], teachers: ["trainers"], trainer: ["trainers"], faculty: ["trainers"], tutor: ["trainers"],
  sure: ["guarantee"], assured: ["guarantee"], promise: ["guarantee"], guaranteed: ["guarantee"],
  marks: ["score", "band"], score: ["band"], band: ["score"],
  duration: ["long"], long: ["duration"], month: ["long"], months: ["long"],
  experience: ["experienced"], review: ["reviews", "rating"], rating: ["reviews"],
};

const norm = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);

const stem = (w: string) => (w.length > 4 ? w.replace(/(ing|ed|es|s)$/, "") : w);

function lev(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
  return dp[a.length][b.length];
}

function hasWord(token: string, words: string[]) {
  const t = stem(token);
  const lim = t.length >= 8 ? 2 : t.length >= 4 ? 1 : 0;
  for (const w of words) {
    if (w === t) return true;
    if (t.length >= 4 && w.length >= 4) {
      if (w.startsWith(t) && w.length - t.length <= 4) return true;
      if (t.startsWith(w) && t.length - w.length <= 3) return true;
    }
    if (lim && Math.abs(w.length - t.length) <= lim && lev(w, t) <= lim) return true;
  }
  return false;
}

type Entry = { key: string; qa: QA; cat: Category; qW: string[]; aW: string[] };

const INDEX: Entry[] = CATEGORIES.flatMap((cat) =>
  cat.items.map((qa, i) => ({
    key: `${cat.id}-${i}`,
    qa,
    cat,
    qW: norm(qa.q + " " + cat.label).map(stem),
    aW: norm(qa.a).map(stem),
  }))
);

function runSearch(term: string): Entry[] {
  const raw = norm(term);
  let tokens = raw.filter((t) => !STOP.has(t));
  if (tokens.length === 0) tokens = raw;
  if (tokens.length === 0) return [];
  const need = tokens.length <= 2 ? 1 : Math.ceil(tokens.length / 2);

  return INDEX.map((e, order) => {
    let hits = 0;
    let score = 0;
    for (const tok of tokens) {
      let best = 0;
      for (const alt of [tok, ...(ALIAS[tok] ?? [])]) {
        if (hasWord(alt, e.qW)) best = Math.max(best, 3);
        else if (hasWord(alt, e.aW)) best = Math.max(best, 1);
      }
      if (best) {
        hits++;
        score += best;
      }
    }
    return { e, hits, score, order };
  })
    .filter((r) => r.hits >= need && r.hits > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .map((r) => r.e);
}

/* ------------------------------------------------------------------ */
/*  SMALL HELPERS                                                      */
/* ------------------------------------------------------------------ */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

function CountUp({ to, decimals = 0, suffix = "", run }: { to: number; decimals?: number; suffix?: string; run: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1);
      setVal(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return (
    <>
      {val.toFixed(decimals)}
      {suffix}
    </>
  );
}

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const safe = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const parts = text.split(new RegExp(`(${safe})`, "gi"));
  return (
    <>
      {parts.map((p, i) =>
        terms.some((t) => t.toLowerCase() === p.toLowerCase()) ? <mark key={i}>{p}</mark> : <span key={i}>{p}</span>
      )}
    </>
  );
}

const v = (o: Record<string, string>) => o as unknown as CSSProperties;

function Icon({ id }: { id: string }) {
  const p: Record<string, ReactNode> = {
    ielts: (<><rect x="5" y="3" width="14" height="18" rx="2" /><path d="m9 12 2 2 4-4" /></>),
    spoken: <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z" />,
    languages: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>),
    visa: <path d="M2 11 22 3l-8 18-2-7-8-3zM12 14l10-11" />,
    admission: (<><rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4h6v3H9zM9 12h6M9 16h4" /></>),
    about: (<><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>),
  };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {p[id]}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function FaqsPage() {
  const [active, setActive] = useState("popular");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>("popular-0");
  const [votes, setVotes] = useState<Record<string, "up" | "down">>({});
  const [hint, setHint] = useState(0);
  const [showTop, setShowTop] = useState(false);

  const bodyRef = useRef<HTMLElement>(null);
  const [statsRef, statsSeen] = useInView<HTMLElement>();

  const term = query.trim();
  const searching = term.length > 0;
  const terms = useMemo(
    () => norm(term).filter((t) => t.length >= 3 && !STOP.has(t)),
    [term]
  );

  useEffect(() => {
    const t = setInterval(() => setHint((h) => (h + 1) % HINTS.length), 3200);
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearInterval(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const results = useMemo(() => (searching ? runSearch(term) : []), [searching, term]);

  // open the best match automatically while searching
  useEffect(() => {
    if (searching) setOpen(results[0]?.key ?? null);
  }, [searching, results]);

  const goTo = (id: string) => {
    setQuery("");
    setActive(id);
    setOpen(`${id}-0`);
    setTimeout(() => bodyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
  };

  const visible = useMemo(() => {
    if (searching) return results;
    if (active === "popular")
      return POPULAR.map((qa) => {
        const cat = CATEGORIES.find((c) => c.items.includes(qa)) ?? CATEGORIES[0];
        return { key: `popular-${POPULAR.indexOf(qa)}`, qa, cat } as Entry;
      });
    const c = CATEGORIES.find((x) => x.id === active) ?? CATEGORIES[0];
    return c.items.map((qa, i) => ({ key: `${c.id}-${i}`, qa, cat: c } as Entry));
  }, [active, searching, results]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CATEGORIES.flatMap((c) => c.items).map((qa) => ({
      "@type": "Question",
      name: qa.q,
      acceptedAnswer: { "@type": "Answer", text: qa.a },
    })),
  };

  const total = CATEGORIES.reduce((n, c) => n + c.items.length, 0);

  return (
    <main className="faq">
      <style>{css}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* HERO */}
      <section className="faq-hero">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
        <span className="grid-bg" />
        <div className="faq-hero-inner">
          <h1>Frequently asked questions</h1>
          <p className="faq-sub">
            Answers about our courses, fees, visa guidance and admissions. If you
            can’t find what you need, our team is happy to help.
          </p>

          <div className="faq-search">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={HINTS[hint]}
              aria-label="Search frequently asked questions"
            />
            {searching && (
              <button onClick={() => setQuery("")} aria-label="Clear search">
                ✕
              </button>
            )}
          </div>

          <div className="faq-quick">
            <span>Try:</span>
            {QUICK.map((q) => (
              <button key={q} onClick={() => setQuery(q)}>
                {q}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="faq-stats" ref={statsRef}>
        <div>
          <b>
            <CountUp to={4.8} decimals={1} run={statsSeen} />
          </b>
          <span>Google rating</span>
        </div>
        <div>
          <b>
            <CountUp to={332} suffix="+" run={statsSeen} />
          </b>
          <span>Google reviews</span>
        </div>
        <div>
          <b>
            <CountUp to={9} suffix="+" run={statsSeen} />
          </b>
          <span>Years of experience</span>
        </div>
        <div>
          <b>
            <CountUp to={total} run={statsSeen} />
          </b>
          <span>Questions answered</span>
        </div>
      </section>

      {/* TOPICS */}
      {!searching && (
        <section className="faq-topics">
          <h2 className="faq-h2">Browse by topic</h2>
          <div className="topic-grid">
            {CATEGORIES.map((c, i) => (
              <button key={c.id} className="topic" onClick={() => goTo(c.id)} style={v({ "--c": c.color, "--i": String(i) })}>
                <span className="topic-ico">
                  <Icon id={c.id} />
                </span>
                <span className="topic-txt">
                  <strong>{c.label}</strong>
                  <small>{c.blurb}</small>
                </span>
                <span className="topic-count">{c.items.length}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* LIST */}
      <section className="faq-body" ref={bodyRef}>
        {!searching && (
          <div className="faq-tabs" role="tablist">
            {ALL_TABS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={active === c.id}
                className={active === c.id ? "on" : ""}
                style={v({ "--c": c.color })}
                onClick={() => {
                  setActive(c.id);
                  setOpen(`${c.id}-0`);
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        {searching && (
          <p className="faq-count">
            {visible.length > 0 ? (
              <>
                Showing <b>{visible.length}</b> best match{visible.length === 1 ? "" : "es"} for “{term}”
              </>
            ) : (
              <>No questions matched “{term}”</>
            )}
          </p>
        )}

        <div className="faq-list" key={searching ? "search" : active}>
          {visible.map(({ key, qa, cat }, idx) => {
            const isOpen = open === key;
            return (
              <article key={key} className={`faq-item ${isOpen ? "open" : ""}`} style={v({ "--c": cat.color, "--n": String(idx) })}>
                <button className="faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : key)}>
                  <span className="faq-qt">
                    <Highlight text={qa.q} terms={terms} />
                    {(searching || active === "popular") && <em>{cat.label}</em>}
                  </span>
                  <span className="faq-plus" aria-hidden>
                    <i />
                    <i />
                  </span>
                </button>
                <div className="faq-a">
                  <div>
                    <p>
                      <Highlight text={qa.a} terms={terms} />
                    </p>
                    <div className="faq-vote">
                      {votes[key] ? (
                        <span className="thanks">Thanks for your feedback.</span>
                      ) : (
                        <>
                          <span>Was this helpful?</span>
                          <button onClick={() => setVotes({ ...votes, [key]: "up" })}>Yes</button>
                          <button onClick={() => setVotes({ ...votes, [key]: "down" })}>No</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {searching && visible.length === 0 && (
            <div className="faq-empty">
              <h3>We couldn’t find that one</h3>
              <p>Try one or two simple words, like “fees” or “visa”, or send your question to our team directly.</p>
              <a
                className="btn green"
                href={`https://wa.me/${INSTITUTE.whatsapp}?text=${encodeURIComponent("Hi, I have a question: " + term)}`}
                target="_blank"
                rel="noreferrer"
              >
                Ask on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="faq-cta">
        <div className="faq-cta-card">
          <span className="cta-glow" />
          <div className="cta-copy">
            <h2>Still have a question?</h2>
            <p>Call, message or visit us. Our team will explain the details for your course or country.</p>
            <address>{INSTITUTE.address}</address>
          </div>
          <div className="faq-cta-actions">
            <a
              className="btn green"
              href={`https://wa.me/${INSTITUTE.whatsapp}?text=${encodeURIComponent("Hi, I would like to know more about your courses.")}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp us
            </a>
            <a className="btn blue" href={`tel:${INSTITUTE.phoneTel}`}>
              Call {INSTITUTE.phoneDisplay}
            </a>
            <Link className="btn red" href={INSTITUTE.enquiryHref}>
              Send an enquiry
            </Link>
            <a className="btn ghost" href={INSTITUTE.mapsUrl} target="_blank" rel="noreferrer">
              Get directions
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot">
        <div className="foot-line" />
        <div className="foot-in">
          <div className="foot-brand">
            <div className="foot-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={INSTITUTE.logo} alt="IIL logo" />
            </div>
            <h3>{INSTITUTE.name}</h3>
            <p>Spoken English, IELTS, PTE, foreign languages and study abroad guidance in Moradabad.</p>
          </div>

          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/visa">Visa</Link></li>
            </ul>
          </div>

          <div>
            <h4>More</h4>
            <ul>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/testimonials">Testimonials</Link></li>
              <li><Link href="/faqs">FAQs</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul className="foot-contact">
              <li>{INSTITUTE.address}</li>
              <li><a href={`tel:${INSTITUTE.phoneTel}`}>{INSTITUTE.phoneDisplay}</a></li>
              <li>
                <a href={`https://wa.me/${INSTITUTE.whatsapp}`} target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <a href={INSTITUTE.mapsUrl} target="_blank" rel="noreferrer">
                  Get directions
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} {INSTITUTE.name}. All rights reserved.</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</button>
        </div>
      </footer>

      {/* floating buttons */}
      <a className="faq-wa" href={`https://wa.me/${INSTITUTE.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <svg width="30" height="30" viewBox="0 0 24 24">
          <path fill="#fff" d="M12 2a10 10 0 0 0-8.7 15L2 22l5.2-1.3A10 10 0 1 0 12 2Z" />
          <path fill="#25d366" d="M8.6 7.6c-.3.3-.6.8-.6 1.5 0 2.8 3.7 6.4 6.6 6.4.7 0 1.2-.3 1.5-.6.2-.3.2-.7 0-.9l-1.5-.9c-.2-.1-.5-.1-.7.1l-.5.5c-1.1-.4-2.3-1.6-2.7-2.7l.5-.5c.2-.2.2-.5.1-.7l-.9-1.5c-.2-.3-.6-.3-.9-.2Z" />
        </svg>
      </a>
      <button className={`faq-top ${showTop ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
        ↑
      </button>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  STYLES                                                             */
/* ------------------------------------------------------------------ */
const css = `
.faq{--navy:#0b3d6b;--ink:#0f172a;--mute:#64748b;--line:#e2e8f0;--red:#e11d48;
  background:#f4f7fb;color:var(--ink);min-height:100vh;font-family:inherit;overflow-x:hidden}
.faq *{box-sizing:border-box}
@keyframes faqRise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}

/* hero */
.faq-hero{position:relative;overflow:hidden;padding:70px 20px 118px;background:linear-gradient(135deg,#071f3a 0%,#0b3d6b 55%,#14598f 100%)}
.grid-bg{position:absolute;inset:0;opacity:.18;
  background-image:linear-gradient(rgba(255,255,255,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.35) 1px,transparent 1px);
  background-size:44px 44px;-webkit-mask-image:radial-gradient(ellipse at center,#000 30%,transparent 75%);mask-image:radial-gradient(ellipse at center,#000 30%,transparent 75%)}
.blob{position:absolute;border-radius:50%;filter:blur(60px);opacity:.55;animation:faqDrift 14s ease-in-out infinite alternate}
.b1{width:340px;height:340px;background:#e11d48;right:-80px;top:-120px}
.b2{width:300px;height:300px;background:#2563eb;left:-90px;bottom:-110px;animation-delay:-5s}
.b3{width:200px;height:200px;background:#7c3aed;left:45%;top:-100px;opacity:.35;animation-delay:-9s}
@keyframes faqDrift{to{transform:translate(50px,40px) scale(1.15)}}
.faq-hero-inner{position:relative;max-width:760px;margin:0 auto;text-align:center;animation:faqRise .7s cubic-bezier(.2,.8,.2,1) both}
.faq-hero h1{color:#fff;font-size:clamp(32px,5.5vw,52px);line-height:1.12;margin:0 0 16px;font-weight:800;letter-spacing:-.025em}
.faq-sub{color:#cbd9ea;font-size:17.5px;line-height:1.65;margin:0 auto 32px;max-width:580px}

.faq-search{display:flex;align-items:center;gap:12px;background:#fff;border-radius:16px;padding:5px 8px 5px 20px;color:var(--mute);
  box-shadow:0 20px 50px -20px rgba(0,0,0,.55);transition:box-shadow .25s}
.faq-search:focus-within{box-shadow:0 0 0 4px rgba(147,197,253,.55),0 20px 50px -20px rgba(0,0,0,.55)}
.faq-search input{flex:1;border:0;outline:0;font-size:17px;padding:16px 4px;background:transparent;color:var(--ink);min-width:0;font-family:inherit}
.faq-search input::placeholder{color:#94a3b8}
.faq .faq-search input:focus-visible{outline:none}
.faq-search button{border:0;background:#f1f5f9;border-radius:10px;width:38px;height:38px;cursor:pointer;color:var(--mute);transition:background .2s}
.faq-search button:hover{background:#fee2e2;color:var(--red)}
.faq-quick{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;margin-top:18px;color:#9db6d2;font-size:14px}
.faq-quick button{border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.08);color:#fff;padding:6px 14px;border-radius:99px;font:inherit;font-size:13.5px;cursor:pointer;transition:background .2s}
.faq-quick button:hover{background:rgba(255,255,255,.22)}

/* stats */
.faq-stats{max-width:900px;margin:-58px auto 0;position:relative;display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border-radius:20px;
  box-shadow:0 22px 46px -22px rgba(11,61,107,.5);padding:24px 10px}
.faq-stats div{text-align:center;padding:4px 8px;border-right:1px solid var(--line)}
.faq-stats div:last-child{border:0}
.faq-stats b{display:block;font-size:32px;color:var(--navy);font-weight:800;font-variant-numeric:tabular-nums}
.faq-stats span{font-size:13.5px;color:var(--mute)}

/* topics */
.faq-topics{max-width:1000px;margin:60px auto 0;padding:0 16px}
.faq-h2{font-size:24px;font-weight:800;margin:0 0 20px;text-align:center;letter-spacing:-.02em}
.topic-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.topic{display:flex;align-items:center;gap:14px;text-align:left;background:#fff;border:1px solid var(--line);border-radius:16px;padding:18px;cursor:pointer;font:inherit;color:var(--ink);
  opacity:0;animation:faqRise .55s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:calc(var(--i)*60ms + 150ms);transition:transform .25s,box-shadow .25s,border-color .25s}
.topic:hover{transform:translateY(-4px);border-color:var(--c);box-shadow:0 18px 32px -22px var(--c)}
.topic-ico{display:grid;place-items:center;width:48px;height:48px;border-radius:13px;flex:none;color:var(--c);background:color-mix(in srgb,var(--c) 11%,white);transition:background .25s,color .25s}
.topic:hover .topic-ico{background:var(--c);color:#fff}
.topic-txt{flex:1;min-width:0}
.topic strong{display:block;font-size:16px;margin-bottom:2px}
.topic small{display:block;color:var(--mute);font-size:13.5px}
.topic-count{font-size:13px;font-weight:700;color:var(--mute);background:#f1f5f9;border-radius:99px;padding:3px 10px}

/* tabs + list */
.faq-body{max-width:820px;margin:56px auto 0;padding:0 16px;scroll-margin-top:90px}
.faq-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px;justify-content:center}
.faq-tabs button{border:1px solid var(--line);background:#fff;color:#334155;padding:9px 18px;border-radius:99px;font:inherit;font-size:14px;font-weight:600;cursor:pointer;transition:all .25s}
.faq-tabs button:hover{border-color:var(--c);color:var(--c)}
.faq-tabs button.on{background:var(--c);border-color:var(--c);color:#fff;box-shadow:0 8px 18px -10px var(--c)}
.faq-count{color:var(--mute);margin:0 0 16px;text-align:center}
.faq-count b{color:var(--navy)}

.faq-list{display:flex;flex-direction:column;gap:10px}
.faq-item{position:relative;background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;
  opacity:0;animation:faqRise .5s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:calc(var(--n)*55ms);transition:box-shadow .3s,border-color .3s}
.faq-item::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--c);transform:scaleY(0);transform-origin:top;transition:transform .35s}
.faq-item:hover{border-color:#cbd5e1}
.faq-item.open{border-color:color-mix(in srgb,var(--c) 40%,white);box-shadow:0 16px 32px -24px var(--c)}
.faq-item.open::before{transform:scaleY(1)}
.faq-q{width:100%;display:flex;align-items:center;gap:16px;text-align:left;background:none;border:0;padding:18px 20px 18px 24px;cursor:pointer;font:inherit;color:var(--ink)}
.faq-qt{flex:1;font-size:16.5px;font-weight:650;line-height:1.45}
.faq-qt em{display:block;font-style:normal;font-size:12.5px;font-weight:600;color:var(--c);margin-top:3px}
.faq-qt mark,.faq-a mark{background:#fde68a;color:inherit;border-radius:3px;padding:0 2px}
.faq-plus{position:relative;width:30px;height:30px;border-radius:50%;background:#f1f5f9;flex:none;transition:background .3s,transform .35s}
.faq-plus i{position:absolute;left:9px;right:9px;top:14px;height:2px;background:var(--navy);border-radius:2px;transition:transform .3s,background .3s}
.faq-plus i:last-child{transform:rotate(90deg)}
.faq-item.open .faq-plus{background:var(--c);transform:rotate(180deg)}
.faq-item.open .faq-plus i{background:#fff}
.faq-item.open .faq-plus i:last-child{transform:rotate(0)}

.faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .38s cubic-bezier(.2,.8,.2,1)}
.faq-item.open .faq-a{grid-template-rows:1fr}
.faq-a>div{overflow:hidden}
.faq-a p{margin:0;padding:0 26px 4px 24px;color:#334155;line-height:1.75;font-size:15.5px;opacity:0;transform:translateY(-6px);transition:opacity .35s .08s,transform .35s .08s}
.faq-item.open .faq-a p{opacity:1;transform:none}
.faq-vote{display:flex;align-items:center;gap:10px;padding:12px 26px 18px 24px;font-size:13.5px;color:var(--mute)}
.faq-vote button{border:1px solid var(--line);background:#fff;border-radius:99px;padding:4px 14px;cursor:pointer;font:inherit;font-size:13px;color:var(--navy);transition:all .2s}
.faq-vote button:hover{background:var(--navy);color:#fff}
.thanks{color:#15803d;font-weight:600}

.faq-empty{background:#fff;border:1px dashed #cbd5e1;border-radius:18px;padding:38px 20px;text-align:center}
.faq-empty h3{margin:0 0 6px;font-size:19px}
.faq-empty p{color:var(--mute);margin:0 auto 20px;max-width:420px;line-height:1.6}

/* cta */
.faq-cta{max-width:960px;margin:68px auto 0;padding:0 16px}
.faq-cta-card{position:relative;overflow:hidden;display:grid;grid-template-columns:1.15fr 1fr;gap:28px;align-items:center;background:linear-gradient(135deg,#071f3a,#0b3d6b 65%,#14598f);color:#fff;border-radius:24px;padding:38px}
.cta-glow{position:absolute;width:300px;height:300px;border-radius:50%;right:-90px;top:-130px;background:radial-gradient(circle,rgba(225,29,72,.45),transparent 70%)}
.cta-copy,.faq-cta-actions{position:relative}
.faq-cta-card h2{margin:0 0 8px;font-size:29px;font-weight:800;letter-spacing:-.02em}
.faq-cta-card p{margin:0 0 14px;color:#cbd9ea;line-height:1.65}
.faq-cta-card address{font-style:normal;font-size:13.5px;color:#9db6d2;line-height:1.6}
.faq-cta-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.btn{display:inline-flex;align-items:center;justify-content:center;text-align:center;padding:13px 12px;border-radius:12px;font-weight:700;font-size:14.5px;text-decoration:none;border:1px solid transparent;cursor:pointer;transition:transform .2s,box-shadow .2s,background .2s}
.btn:hover{transform:translateY(-2px);box-shadow:0 12px 22px -12px rgba(0,0,0,.6)}
.btn.green{background:#16a34a;color:#fff}
.btn.blue{background:#2563eb;color:#fff}
.btn.red{background:var(--red);color:#fff}
.btn.ghost{background:transparent;border-color:rgba(255,255,255,.4);color:#fff}
.btn.ghost:hover{background:rgba(255,255,255,.12)}

/* footer */
.foot{margin-top:72px;background:#071f3a;color:#cbd9ea}
.foot-line{height:4px;background:linear-gradient(90deg,#e11d48,#2563eb)}
.foot-in{max-width:1100px;margin:0 auto;padding:52px 20px 36px;display:grid;grid-template-columns:1.6fr 1fr 1fr 1.4fr;gap:36px}
.foot-logo{width:84px;height:84px;border-radius:50%;background:#fff;display:grid;place-items:center;padding:6px;margin-bottom:16px;box-shadow:0 10px 24px -10px rgba(0,0,0,.6)}
.foot-logo img{width:100%;height:100%;object-fit:contain;border-radius:50%}
.foot h3{margin:0 0 10px;color:#fff;font-size:18px;line-height:1.35}
.foot-brand p{margin:0;font-size:14.5px;line-height:1.7;color:#9db6d2;max-width:340px}
.foot h4{margin:0 0 14px;color:#fff;font-size:15.5px}
.foot ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
.foot li,.foot a{font-size:14.5px;line-height:1.6;color:#9db6d2;text-decoration:none}
.foot a{transition:color .2s,padding-left .2s}
.foot a:hover{color:#fff;padding-left:4px}
.foot-bottom{max-width:1100px;margin:0 auto;padding:18px 20px;border-top:1px solid rgba(255,255,255,.12);display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;font-size:13.5px;color:#7f9bb8}
.foot-bottom button{border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff;padding:8px 16px;border-radius:99px;font:inherit;font-size:13px;cursor:pointer;transition:background .2s}
.foot-bottom button:hover{background:rgba(255,255,255,.14)}

/* floating */
.faq-wa{position:fixed;right:22px;bottom:24px;width:58px;height:58px;border-radius:50%;background:#25d366;display:grid;place-items:center;z-index:40;box-shadow:0 12px 26px -8px rgba(37,211,102,.7);transition:transform .2s}
.faq-wa:hover{transform:scale(1.08)}
.faq-top{position:fixed;right:30px;bottom:96px;width:42px;height:42px;border-radius:50%;border:0;background:var(--navy);color:#fff;font-size:19px;cursor:pointer;z-index:40;
  opacity:0;transform:translateY(12px);pointer-events:none;transition:all .3s}
.faq-top.show{opacity:1;transform:none;pointer-events:auto}
.faq-top:hover{background:var(--red)}

.faq button:focus-visible,.faq a:focus-visible{outline:3px solid #f59e0b;outline-offset:2px}

@media (max-width:860px){
  .topic-grid{grid-template-columns:1fr 1fr}
  .foot-in{grid-template-columns:1fr 1fr}
}
@media (max-width:620px){
  .faq-hero{padding:54px 16px 108px}
  .faq-stats{grid-template-columns:1fr 1fr;margin:-50px 14px 0;row-gap:16px}
  .faq-stats div:nth-child(2){border:0}
  .topic-grid{grid-template-columns:1fr}
  .faq-cta-card{grid-template-columns:1fr;padding:26px}
  .faq-tabs{flex-wrap:nowrap;overflow-x:auto;justify-content:flex-start;padding-bottom:6px}
  .faq-tabs button{white-space:nowrap;flex:none}
  .foot-in{grid-template-columns:1fr;padding-top:40px}
  .foot-bottom{justify-content:center;text-align:center}
}
@media (prefers-reduced-motion:reduce){
  .faq *,.faq *::before,.faq *::after{animation:none!important;transition:none!important}
  .topic,.faq-item{opacity:1!important}
}
`;