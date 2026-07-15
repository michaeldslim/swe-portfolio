"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { IExperience, INavItem, IProject, ThemeName } from "@/types";
import { useTheme } from "./ThemeProvider";

const enableThemeSwitcher =
  process.env.NEXT_PUBLIC_ENABLE_THEME_SWITCHER === "true";

type ModalImage = {
  src: string;
  alt: string;
};

function ScreenshotModal({
  image,
  onClose,
}: {
  image: ModalImage;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="nintendo-modal-backdrop fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot preview"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-4xl">
        <div className="bevel-plate mb-2 flex items-center justify-between px-3 py-2">
          <span className="type-ui-label text-ink">Screenshot Preview</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="btn-amber"
            aria-label="Close screenshot preview"
          >
            Close
          </button>
        </div>
        <div className="nintendo-modal-frame relative h-[70vh] w-full overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 92vw, 900px"
            className="object-contain p-2"
            priority
          />
        </div>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return <span aria-hidden="true">›</span>;
}

function SectionLabelBar({ title }: { title: string }) {
  return <div className="section-label-bar">{title}</div>;
}

function ArrowChip() {
  return (
    <span className="btn-arrow-chip" aria-hidden="true">
      ›
    </span>
  );
}

const navItems: INavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const subNavItems = [
  { label: "GitHub", href: "https://github.com/michaeldslim/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/codeinlife/" },
  { label: "Email", href: "mailto:michaelds.lim@gmail.com" },
  { label: "Resume", href: "#contact" },
];

const leftRailTabs = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Mobile", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const experiences: IExperience[] = [
  {
    id: "exp-1",
    role: "Solo Mobile App Developer ",
    company: "Independent Software Developer",
    period: "",
    description:
      "Started with a cross-platform mobile app built using React Native, then extended the product ecosystem by developing a native macOS application with Swift.",
    techStack: ["React Native", "TypeScript", "Expo", "Swift"],
  },
  {
    id: "exp-2",
    role: "Senior Technical Consultant - Front End with Full Stack Experience",
    company: "Phase2/Northwell Health",
    period: "",
    description:
      "Provided front-end development expertise (React, React Native) as a technical consultant for Northwell Health, collaborating cross-functionally to accelerate digital transformation initiatives.",
    techStack: ["React", "React Native", "TypeScript", "Next.js", "Nx", "Azure", "GCP"],
  },
  {
    id: "exp-3",
    role: "Senior Frontend Engineer",
    company: "Health Gorilla",
    period: "",
    description:
      "Led the adoption of a micro-frontend architecture with Webpack Module Federation, significantly improving scalability, modularity, and long-term maintainability.",
    techStack: ["React", "React Native", "TypeScript", "Webpack Module Federation"],
  },
  {
    id: "exp-4",
    role: "Frontend Engineer III",
    company: "iHerb",
    period: "",
    description:
      "Designed, developed, and supported both desktop web and mobile applications leveraging React, C# MVC, and RESTful APIs to deliver seamless, integrated solutions.",
    techStack: ["React", "React Native", "TypeScript", "RxJS"],
  },
  {
    id: "exp-5",
    role: "Senior Software Engineer - Front End with Full Stack Experience",
    company: "Paciolan",
    period: "",
    description:
      "Engineered deployment automation with Node.js and Python, increasing efficiency in testing and production workflows; provided mentorship to both senior and junior engineers, enhancing team performance and professional development.",
    techStack: ["React", "Node.js", "TypeScript", "Python"],
  },
  {
    id: "exp-6",
    role: "Full Stack Engineer",
    company: "Zoasis",
    period: "",
    description:
      "Designed, developed, and maintained a customized veterinarian administration and client dashboard, integrating Perl, MySQL, C# .NET, and MS SQL to deliver robust and scalable functionality.",
    techStack: ["JavaScript", "Perl", "PHP", "MySQL", "C# .NET", "MSSQL"],
  },
];

const projects: IProject[] = [
  {
    id: "proj-game",
    name: "JavaScript Game",
    description:
      "A small browser game built in JavaScript where you try to save every carrot from the bugs.",
    techStack: ["JavaScript", "HTML5", "CSS"],
    category: "web",
    screenshotNames: ["javascript-game.png"],
  },
  {
    id: "proj-mobile-1",
    name: "Carrot Note App",
    description:
      "Carrot Note App is a React Native note‑taking app that lets users sign up/login with Firebase Auth, create and manage titled notes stored in Firestore, and organize them into custom categories. It includes a note list and detail editor, category management in Settings, and email verification to keep user data tied securely to their account.",
    techStack: ["React Native", "TypeScript", "Firebase", "Expo", "Android", "iOS"],
    category: "mobile",
    note: "",
    screenshotNames: ["note-1.png", "note-2.png", "note-3.png", "note-4.png"],
  },
  {
    id: "proj-mobile-2",
    name: "Mobile Blog App",
    description:
      "A React Native / Expo mobile journal for writing, reading, and browsing posts. Sign in with Google via Supabase Auth, then publish Markdown entries with images and tags, browse a searchable feed, explore posts on a calendar, and manage drafts from your profile.",
    techStack: ["React Native", "TypeScript", "Supabase", "Expo", "Android", "iOS"],
    category: "mobile",
    note: "",
    screenshotNames: ["blog-1.png", "blog-2.png", "blog-3.png", "blog-4.png"],
  },
  {
    id: "proj-mobile-3",
    name: "MlRadioFM-RN",
    description:
      "A React Native radio streaming app that lets users browse and play online stations, with features like category filters and a robust audio player that prevents overlapping streams. It supports both English and Korean via a language toggle and centralized translation system.",
    techStack: ["React Native", "TypeScript", "Expo", "Android", "iOS"],
    href: "https://github.com/michaeldslim/MlRadioFm-RN/releases/latest",
    iosHref: "",
    category: "mobile",
    note: "",
    screenshotNames: ["mlradiofm-rn-1.png", "mlradiofm-rn-2.png", "mlradiofm-rn-3.png", "mlradiofm-rn-4.png"],
  },
  {
    id: "proj-mobile-4",
    name: "MlRadioFM",
    description:
      "MlRadioFm is a macOS Swift app that streams Korean radio (KBS, MBC, SBS, etc.), some popular English music stations, and podcast stations with a modern, localized UI and an integrated audio player. It focuses on easy access to live stations, good listening controls, and a clean desktop experience.",
    techStack: ["Swift"],
    href: "https://github.com/michaeldslim/MlRadioFm/releases/latest",
    category: "macos",
    note: "",
    screenshotNames: ["mlradiofm-01.png", "mlradiofm-02.png", "mlradiofm-03.png", "mlradiofm-04.png"],
  },
  {
    id: "proj-mobile-5",
    name: "Puzzle Board",
    description:
      "Slide puzzle is a sliding puzzle game built with React Native, TypeScript, and Expo, featuring 3×3, 4×4, and 5×5 boards. It offers both classic number mode and a photo mode where you can use your own images, with smooth animations and solvable puzzle generation.",
    techStack: ["React Native", "TypeScript", "Expo", "Android", "iOS"],
    href: "https://github.com/michaeldslim/puzzle-RN/releases/latest",
    iosHref: "",
    category: "mobile",
    note: "",
    screenshotNames: ["puzzle-1.png", "puzzle-2.png", "puzzle-3.png", "puzzle-4.png"],
  },
  {
    id: "proj-mobile-6",
    name: "Omok (Gomoku) Game",
    description:
      "This is a React Native (Expo + TypeScript) implementation of the classic 15×15 Gomoku game, supporting both player-vs-player and player-vs-AI modes. It includes win/draw detection, a Korean UI, optional per-turn timer, and a heuristic-based AI that evaluates and selects moves.",
    techStack: ["React Native", "TypeScript", "Expo", "Android", "iOS"],
    href: "https://github.com/michaeldslim/gomoku-game/releases/latest",
    iosHref: "",
    category: "mobile",
    note: "",
    screenshotNames: ["omok-1.png", "omok-2.png", "omok-3.png", "omok-4.png"],
  },
  {
    id: "proj-mobile-7",
    name: "Bulls & Cows",
    description:
      "A number baseball game built with React Native and TypeScript using Expo, where players guess a secret number with unique digits (including 0) and get Strike, Ball, or Out feedback on each attempt.",
    techStack: ["React Native", "TypeScript", "Expo", "Android", "iOS"],
    iosHref: "",
    category: "mobile",
    note: "",
    screenshotNames: ["bulls-cows-1.png", "bulls-cows-2.png", "bulls-cows-3.png", "bulls-cows-4.png"],
  },
  {
    id: "proj-mobile-8",
    name: "Candy Break",
    description:
      "Candy Break is a React Native mobile game where players break candy blocks, featuring a custom game engine, fireworks animations, and audio/visual assets.",
    techStack: ["React Native", "TypeScript", "Expo", "Android", "iOS"],
    href: "https://github.com/michaeldslim/candy-break/releases/latest",
    iosHref: "",
    category: "mobile",
    note: "",
    screenshotNames: ["candy-01.png", "candy-02.png", "candy-03.png", "candy-04.png"],
  },
  {
    id: "proj-mobile-9",
    name: "Marbles Game",
    description:
      "Marbles Game is a React Native mobile game where players compete in marble challenges, featuring a custom game engine, animations, and audio/visual assets.",
    techStack: ["React Native", "TypeScript", "Expo", "Android", "iOS"],
    href: "https://github.com/michaeldslim/marbles-game/releases/latest",
    iosHref: "",
    category: "mobile",
    note: "",
    screenshotNames: ["marbles-01.png", "marbles-02.png", "marbles-03.png", "marbles-04.png"],
  },
  {
    id: "proj-mobile-10",
    name: "Color Flow Maze",
    description:
      "A sliding-puzzle mobile game built with React Native and Expo. Navigate a player token across a grid-based maze — you slide until you hit a wall, and you must stop exactly on the gold tile to win. Beat all 50 procedurally generated levels to complete the game.",
    techStack: ["React Native", "TypeScript", "Expo", "Android", "iOS"],
    href: "https://github.com/michaeldslim/color-flow-maze/releases/latest",
    iosHref: "",
    category: "mobile",
    note: "",
    screenshotNames: ["maze-1.png", "maze-2.png", "maze-3.png", "maze-4.png"],
  },
];

const imageSrc = (filename: string) => `/images/${filename}`;

function DownloadLink({ href, label }: { href?: string; label: string }) {
  const trimmed = href?.trim();
  const isExternal = trimmed?.startsWith("http") ?? false;

  if (!trimmed) {
    return <span className="text-ink-soft/50">[{label}]</span>;
  }

  return (
    <a
      href={trimmed}
      className="type-link text-ink-soft hover:text-nav-gold"
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      [{label}]
    </a>
  );
}

function ProjectCard({
  project,
  onScreenshotClick,
}: {
  project: IProject;
  onScreenshotClick: (image: ModalImage) => void;
}) {
  const hasScreenshots = project.screenshotNames && project.screenshotNames.length > 0;
  const primaryScreenshot = project.screenshotNames?.[0];

  return (
    <article className="bevel-inset rounded-sm p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="type-link text-ink">{project.name}</h3>
          {project.category === "mobile" && (
            <div className="mt-1 flex flex-wrap gap-2">
              <DownloadLink href={project.href} label="Android" />
              <DownloadLink href={project.iosHref} label="iOS" />
            </div>
          )}
          {project.category !== "mobile" && project.href?.trim() && (
            <div className="mt-1">
              <DownloadLink
                href={project.href}
                label={project.category === "macos" ? "macOS" : "Download"}
              />
            </div>
          )}
        </div>
        <a href={`#${project.id}`} className="btn-arrow-chip" aria-label={`View ${project.name}`}>
          ›
        </a>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-ink">{project.description}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {project.techStack.map((tech) => (
          <span key={tech} className="tech-chip">
            {tech}
          </span>
        ))}
      </div>
      {hasScreenshots && (
        <div className="mt-3 flex flex-wrap gap-2">
          {project.screenshotNames!.map((screenshotName, index) => (
            <button
              type="button"
              key={screenshotName ?? index}
              className="featured-tile relative h-[60px] w-[95px] shrink-0 cursor-zoom-in overflow-hidden"
              onClick={() =>
                onScreenshotClick({
                  src: imageSrc(screenshotName),
                  alt: `${project.name} screenshot ${index + 1}`,
                })
              }
              aria-label={`Open ${project.name} screenshot ${index + 1}`}
            >
              <Image
                src={imageSrc(screenshotName)}
                alt={`${project.name} screenshot ${index + 1}`}
                fill
                sizes="95px"
                className="rounded-sm object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {!hasScreenshots && primaryScreenshot === undefined && project.category === "web" && (
        <div className="featured-tile relative mt-3 h-[60px] w-[95px] overflow-hidden">
          <Image
            src={imageSrc("javascript-game.png")}
            alt={`${project.name} screenshot`}
            fill
            sizes="95px"
            className="rounded-sm object-cover"
          />
        </div>
      )}
    </article>
  );
}

export default function Home() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [modalImage, setModalImage] = useState<ModalImage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const { theme, handleThemeChange } = useTheme();

  const webProjects = projects.filter((project) => project.category === "web");
  const macosProjects = projects.filter((project) => project.category === "macos");
  const mobileProjects = projects.filter((project) => project.category === "mobile");

  const openModal = (image: ModalImage) => {
    lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
    queueMicrotask(() => lastActiveElementRef.current?.focus?.());
  };

  return (
    <div className="min-h-screen overflow-x-auto bg-canvas">
      {modalImage && <ScreenshotModal image={modalImage} onClose={closeModal} />}

      <div className="mx-auto min-w-[320px] max-w-[830px] px-2 pb-8 pt-2 sm:px-0">
        {/* Masthead */}
        <div className="mb-2 flex flex-wrap items-end justify-between gap-3 px-1">
          <div className="flex items-end gap-2">
            <span className="text-4xl leading-none" role="img" aria-label="Developer mascot">
              👨‍💻
            </span>
            <div className="mascot-bubble">Welcome to MichaelLim.com!</div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="nintendo-input w-32 sm:w-40"
              aria-label="Search portfolio"
            />
            <button type="button" className="btn-amber">
              Go
            </button>
          </div>
        </div>

        {/* Primary Nav */}
        <nav className="carbon-slab flex flex-wrap items-center gap-2 px-2 py-1">
          <a href="#home" className="logo-pill mr-1">
            ML
          </a>
          <div className="hidden flex-1 items-center gap-3 sm:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="type-nav-link text-nav-gold hover:text-amber"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <a href="#projects" className="btn-amber hidden sm:inline-flex">
              Projects
            </a>
            <a href="#contact" className="btn-amber hidden sm:inline-flex">
              Contact
            </a>
            <button
              type="button"
              className="btn-amber sm:hidden"
              onClick={() => setIsMobileNavOpen((open) => !open)}
              aria-label="Toggle navigation menu"
            >
              Menu
            </button>
          </div>
        </nav>

        {isMobileNavOpen && (
          <nav className="carbon-slab border-t border-black/30 px-3 py-2 sm:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="type-nav-link text-nav-gold"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}

        {/* Secondary Nav */}
        <div className="subnav-strip">
          {subNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="subnav-link"
              {...(item.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {item.label}
            </a>
          ))}
          {enableThemeSwitcher && (
            <label className="subnav-link flex items-center gap-1 border-r-0">
              Theme
              <select
                value={theme}
                onChange={(event) => handleThemeChange(event.target.value as ThemeName)}
                className="bg-transparent text-[10px] text-ink focus:outline-none"
              >
                <option value="nintendo">Nintendo</option>
                <option value="dark-teal">Dark teal</option>
                <option value="dark-green">Dark green</option>
                <option value="light-neutral">Light</option>
              </select>
            </label>
          )}
        </div>

        {/* Hero */}
        <section id="home" className="scroll-mt-4">
          <div className="hero-panel hero-panel-lavender chamfer-panel mt-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="display-wordmark">MICHAEL LIM</h1>
                <p className="mt-2 text-[15px] font-bold leading-snug text-white drop-shadow-[1px_1px_0_#21242e]">
                  Senior Software Engineer — clear, performant web &amp; mobile experiences.
                </p>
                <p className="mt-2 max-w-lg text-[12px] leading-relaxed text-white/90">
                  13+ years architecting scalable, accessible applications with React, TypeScript,
                  and React Native. WCAG 2.1 AA design systems, micro-frontends, and
                  cross-functional delivery for 1M+ users.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href="#experience" className="btn-signal">
                    View Experience
                  </a>
                  <a href="#projects" className="btn-amber">
                    View Projects
                  </a>
                </div>
              </div>
              <a href="#about" className="btn-arrow mt-2 hidden shrink-0 sm:flex" aria-label="Learn more">
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        {/* Body: left rail + content + right rail */}
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:gap-0">
          {/* Left rail tabs */}
          <div className="hidden shrink-0 flex-col lg:flex">
            {leftRailTabs.map((tab) => (
              <a key={tab.label} href={tab.href} className="left-rail-tab">
                {tab.label}
              </a>
            ))}
          </div>

          {/* Main content column */}
          <div className="min-w-0 flex-[2] px-1 lg:px-2">
            {/* About */}
            <section id="about" className="scroll-mt-4">
              <div className="bevel-plate overflow-hidden">
                <SectionLabelBar title="About" />
                <div className="space-y-3 bg-surface p-4 text-[12px] leading-relaxed text-ink">
                  <p>
                    I hold a master&apos;s degree in Engineering Technology and a bachelor&apos;s
                    degree in Computer Science. With over 13 years of experience in web development, I
                    have built a strong foundation in designing and developing dynamic, scalable web
                    and mobile applications using React, React Native, TypeScript, and modern
                    JavaScript tools.
                  </p>
                  <hr className="dotted-divider" />
                  <p>
                    Most recently, I served as a Technical Consultant at Northwell Health, where I
                    provided specialized front-end development expertise and partnered closely with
                    internal teams to drive digital transformation initiatives. I played a key role
                    in implementing GCP Vertex AI features on the Google Cloud Platform, enhancing
                    user search experiences, and contributed to the MyNorthwell application.
                  </p>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section id="experience" className="scroll-mt-4 mt-4">
              <div className="bevel-plate overflow-hidden">
                <SectionLabelBar title="Official Experience" />
                <div className="bg-platinum p-2">
                  {experiences.map((experience) => (
                    <article key={experience.id} className="news-row">
                      <div className="flex-1 min-w-0">
                        <a href={`#${experience.id}`} className="type-link text-ink-soft hover:text-nav-gold">
                          {experience.role}
                        </a>
                        <p className="text-[11px] text-ink">{experience.company}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-ink/80">
                          {experience.description}
                        </p>
                        {experience.techStack && experience.techStack.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {experience.techStack.map((tech) => (
                              <span key={tech} className="tech-chip">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <ArrowChip />
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects */}
            <section id="projects" className="scroll-mt-4 mt-4">
              <div className="bevel-plate overflow-hidden">
                <SectionLabelBar title="Featured Projects" />
                <div className="space-y-4 bg-platinum p-3">
                  {/* Web */}
                  <div>
                    <h3 className="type-ui-label mb-2 text-ink-soft">Web</h3>
                    <div className="grid gap-2">
                      {webProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onScreenshotClick={openModal}
                        />
                      ))}
                    </div>
                  </div>

                  <hr className="dotted-divider" />

                  {/* macOS */}
                  <div>
                    <h3 className="type-ui-label mb-2 text-ink-soft">macOS</h3>
                    <div className="grid gap-2">
                      {macosProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onScreenshotClick={openModal}
                        />
                      ))}
                    </div>
                  </div>

                  <hr className="dotted-divider" />

                  {/* Mobile */}
                  <div>
                    <h3 className="type-ui-label mb-2 text-ink-soft">Mobile</h3>
                    <div className="grid gap-2 sm:grid-cols-1">
                      {mobileProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onScreenshotClick={openModal}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right action rail */}
          <aside className="w-full shrink-0 px-1 lg:w-[220px] lg:pl-2">
            <div id="contact" className="scroll-mt-4 space-y-3">
              <a href="mailto:michaelds.lim@gmail.com" className="btn-carbon">
                <span aria-hidden="true">✉</span> Email Me
              </a>
              <a
                href="https://github.com/michaeldslim/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-carbon"
              >
                <span aria-hidden="true">⌘</span> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/codeinlife/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-carbon"
              >
                <span aria-hidden="true">in</span> LinkedIn
              </a>
              <a href="#experience" className="btn-carbon">
                <span aria-hidden="true">★</span> Experience
              </a>

              {/* Info box */}
              <div className="info-box mt-4">
                <div className="info-box-tab">What Is — Portfolio</div>
                <div className="p-3 text-[12px] leading-relaxed text-ink">
                  A showcase of web, mobile, and macOS projects built with React, React Native,
                  TypeScript, and Swift. Browse featured apps, games, and tools below.
                </div>
              </div>

              {/* Promo card with photo */}
              <div className="promo-card">
                <p className="display-wordmark text-[22px]">DEVELOPER</p>
                <div className="relative mx-auto mt-2 h-36 w-36 overflow-hidden rounded-sm border-2 border-chrome-indigo bg-surface">
                  <Image
                    src={imageSrc("michael.jpg")}
                    alt="Portrait of Michael Lim"
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>
                <p className="type-micro mt-2 text-carbon">Michael Lim — Senior SWE</p>
              </div>

              {/* Player's Poll style panel */}
              <div className="bevel-raised mt-3 rounded-md p-3">
                <p className="type-ui-label text-ink">Quick Stats</p>
                <ul className="mt-2 space-y-1 text-[12px] text-ink">
                  <li>• 13+ years experience</li>
                  <li>• React / React Native / TS</li>
                  <li>• {projects.length} featured projects</li>
                  <li>• WCAG 2.1 AA design systems</li>
                </ul>
                <a href="#contact" className="btn-signal mt-3 w-full text-center">
                  Get In Touch
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="carbon-slab chamfer-panel mt-6 px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="type-micro text-sky">
              © {new Date().getFullYear()} Michael Lim. All rights reserved.
            </p>
            <span className="esrb-badge">Portfolio — Built with Next.js</span>
            <a href="mailto:michaelds.lim@gmail.com" className="type-micro text-sky hover:text-amber">
              Privacy / Contact
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
