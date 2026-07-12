"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { IExperience, INavItem, IProject, ProjectCategory, ThemeName } from "@/types";
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

    // Move focus into the modal for keyboard users.
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot preview"
      onMouseDown={(event) => {
        // Close on backdrop click, ignore clicks that start within the dialog content.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-5xl">
        <div className="flex justify-end pb-3">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 bg-background/60 px-4 py-2 text-xs font-medium text-foreground/80 shadow-sm shadow-black/40 transition hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            aria-label="Close screenshot preview"
          >
            Close
          </button>
        </div>
        <div className="relative h-[70vh] w-full overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-lg shadow-black/60">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 92vw, 900px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

const navItems: INavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const experiences: IExperience[] = [
  {
    id: "exp-1",
    role: "Solo Mobile App Developer ",
    company: "Personal Projects (Self-Initiated)",
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
    techStack: ["React Native", "TypeScript", "Expo", "Android", "iOS"],
    category: "mobile",
    note: "",
    screenshotNames: ["note-1.png", "note-2.png", "note-4.png"],
  },
  {
    id: "proj-mobile-2",
    name: "MlRadioFM-RN",
    description:
      "A React Native radio streaming app that lets users browse and play online stations, with features like category filters and a robust audio player that prevents overlapping streams. It supports both English and Korean via a language toggle and centralized translation system.",
    techStack: ["React Native", "TypeScript", "Expo", "Android", "iOS"],
    href: "https://github.com/michaeldslim/MlRadioFm-RN/releases/latest",
    category: "mobile",
    note: "",
    screenshotNames: ["mlradiofm-rn-1.png", "mlradiofm-rn-2.png", "mlradiofm-rn-4.png"],
  },
  {
    id: "proj-mobile-3",
    name: "MlRadioFM",
    description:
      "MlRadioFm is a macOS Swift app that streams Korean radio (KBS, MBC, SBS, etc.), some popular English music stations, and podcast stations with a modern, localized UI and an integrated audio player. It focuses on easy access to live stations, good listening controls, and a clean desktop experience.",
    techStack: ["Swift"],
    href: "https://github.com/michaeldslim/MlRadioFm/releases/latest",
    category: "macos",
    note: "",
    screenshotNames: ["mlradiofm-1.png", "mlradiofm-2.png", "mlradiofm-3.png"],
  },
  {
    id: "proj-mobile-4",
    name: "Puzzle Board",
    description:
      "Slide puzzle is a sliding puzzle game built with React Native, TypeScript, and Expo, featuring 3×3, 4×4, and 5×5 boards. It offers both classic number mode and a photo mode where you can use your own images, with smooth animations and solvable puzzle generation.",
    techStack: ["React Native", "TypeScript", "Expo", "Android", "iOS"],
    category: "mobile",
    note: "",
    screenshotNames: ["puzzle-1.png", "puzzle-2.png", "puzzle-3.png"],
  },
  {
    id: "proj-mobile-5",
    name: "Omok (Gomoku) Game",
    description:
      "This is a React Native (Expo + TypeScript) implementation of the classic 15×15 Gomoku game, supporting both player-vs-player and player-vs-AI modes. It includes win/draw detection, a Korean UI, optional per-turn timer, and a heuristic-based AI that evaluates and selects moves.",
    techStack: ["React Native", "TypeScript", "Expo", "Android", "iOS"],
    href: "https://github.com/michaeldslim/gomoku-game/releases/latest",
    category: "mobile",
    note: "",
    screenshotNames: ["omok-2.png", "omok-3.png", "omok-4.png"],
  },
  {
    id: "proj-mobile-6",
    name: "Bulls & Cows",
    description:
      "A number baseball game built with React Native and TypeScript using Expo, where players guess a secret number with unique digits (including 0) and get Strike, Ball, or Out feedback on each attempt.",
    techStack: ["React Native", "TypeScript", "Expo", "Android", "iOS"],
    category: "mobile",
    note: "",
    screenshotNames: ["bulls-cows-1.png", "bulls-cows-3.png", "bulls-cows-4.png"],
  },
  {
    id: "proj-mobile-7",
    name: "Candy Break",
    description:
      "Candy Break is a React Native mobile game where players break candy blocks, featuring a custom game engine, fireworks animations, and audio/visual assets.",
    techStack: ["React Native", "TypeScript", "Expo", "Android", "iOS"],
    category: "mobile",
    note: "",
    screenshotNames: ["candy-1.png", "candy-2.png", "candy-3.png"],
  },
  {
    id: "proj-mobile-8",
    name: "Marbles Game",
    description:
      "Marbles Game is a React Native mobile game where players compete in marble challenges, featuring a custom game engine, animations, and audio/visual assets.",
    techStack: ["React Native", "TypeScript", "Expo", "Android", "iOS"],
    href: "https://github.com/michaeldslim/marbles-game/releases/latest",
    category: "mobile",
    note: "",
    screenshotNames: ["marbles-01.png", "marbles-02.png", "marbles-03.png"],
  },
  {
    id: "proj-mobile-9",
    name: "Color Flow Maze",
    description:
      "A sliding-puzzle mobile game built with React Native and Expo. Navigate a player token across a grid-based maze — you slide until you hit a wall, and you must stop exactly on the gold tile to win. Beat all 50 procedurally generated levels to complete the game.",
    techStack: ["React Native", "TypeScript", "Expo", "Android", "iOS"],
    href: "https://github.com/michaeldslim/color-flow-maze/releases/latest",
    category: "mobile",
    note: "",
    screenshotNames: ["maze-1.png", "maze-2.png", "maze-3.png"],
  },
];

const sectionClassName = "scroll-mt-24 py-16 sm:py-20 border-t border-white/5 first:border-t-0";

const imageSrc = (filename: string) => `/images/${filename}`;

const downloadLabels: Record<ProjectCategory, string> = {
  mobile: "Download for Android",
  macos: "Download for macOS",
  ios: "Download for iOS",
  web: "Download",
  other: "Download",
};

function ProjectTitle({ project }: { project: IProject }) {
  const href = project.href?.trim();
  const isExternal = href?.startsWith("http") ?? false;

  return (
    <h3 className="text-sm font-semibold">
      {project.name}
      {href ? (
        <>
          {" "}
          <a
            href={href}
            className="text-accent hover:underline"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            [{downloadLabels[project.category]}]
          </a>
        </>
      ) : null}
    </h3>
  );
}

export default function Home() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [modalImage, setModalImage] = useState<ModalImage | null>(null);
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
    <div className="min-h-screen bg-background text-foreground">
      {modalImage && <ScreenshotModal image={modalImage} onClose={closeModal} />}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
            Michael Lim
          </div>
          <div className="flex items-center gap-3">
            <nav className="hidden gap-4 text-xs sm:flex sm:text-sm">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-foreground/70 transition hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            {enableThemeSwitcher && (
              <label className="flex items-center gap-1 rounded-md border border-white/10 bg-black/20 px-2 py-1 text-[10px] text-foreground/70">
                <span className="font-mono uppercase tracking-[0.16em]">Theme</span>
                <select
                  value={theme}
                  onChange={(event) => handleThemeChange(event.target.value as ThemeName)}
                  className="bg-transparent text-[10px] text-foreground/80 focus:outline-none"
                >
                  <option value="dark-teal">Dark teal</option>
                  <option value="dark-green">Dark green</option>
                  <option value="light-neutral">Light</option>
                </select>
              </label>
            )}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-white/10 bg-black/20 px-2 py-1 text-xs text-foreground/80 shadow-sm shadow-black/30 sm:hidden"
              onClick={() => setIsMobileNavOpen((open) => !open)}
              aria-label="Toggle navigation menu"
            >
              <span className="mr-1 text-[10px] font-mono uppercase tracking-[0.2em]">Menu</span>
              <span className="flex flex-col gap-0.5">
                <span className="h-0.5 w-3 bg-current" />
                <span className="h-0.5 w-3 bg-current" />
              </span>
            </button>
          </div>
        </div>
        {isMobileNavOpen && (
          <nav className="border-t border-white/10 bg-background/95 px-6 py-3 sm:hidden">
            <div className="mx-auto flex max-w-5xl flex-col gap-2 text-xs">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="py-1 text-foreground/80 transition hover:text-accent"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto flex max-w-5xl flex-col px-6 pb-24 pt-10">
        <section id="home" className="scroll-mt-24 pb-16 pt-8 sm:pt-12">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-accent">
              Senior Software Engineer (Front-End Focus with Back-End Experience)
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              I build clear, performant web and mobile experiences.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base">
              Senior Software Engineer with over 13 years of experience architecting scalable, accessible web and mobile applications using React, TypeScript, and React Native. I specialize in building high-performance front-end architectures and robust design systems, including the development of a WCAG 2.1 AA-compliant system that increased delivery efficiency by 20% for over 1M users. A collaborative leader experienced in working across UX, product, and backend teams to integrate CI/CD pipelines and deliver high-quality, reliable features in distributed, cross-functional environments.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
              <a
                href="#experience"
                className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-background shadow-sm shadow-accent/40 transition hover:bg-accent-soft"
              >
                View experience
              </a>
              <a
                href="#projects"
                className="rounded-full border border-accent/40 px-5 py-2 text-sm font-medium text-accent transition hover:border-accent hover:bg-accent/5"
              >
                View projects
              </a>
            </div>
          </div>
        </section>

        <section id="about" className={sectionClassName}>
          <h2 className="text-sm font-mono uppercase tracking-[0.25em] text-accent">About</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
            <p>
              I hold a master&apos;s degree in Engineering Technology and a bachelor&apos;s degree
              in Computer Science. With over 13 years of experience in web development, I have built
              a strong foundation in designing and developing dynamic, scalable web and mobile
              applications using React, React Native, TypeScript, and modern JavaScript tools. My
              passion for crafting intuitive user experiences, along with my ability to collaborate
              effectively across cross-functional teams, makes me a strong fit for this role.
            </p>
            <p>
              Most recently, I served as a Technical Consultant at Northwell Health, where I provided specialized front-end development expertise and partnered closely with internal teams to drive digital transformation initiatives. I played a key role in implementing GCP Vertex AI features on the Google Cloud Platform, enhancing user search experiences, and contributed to the MyNorthwell application, ensuring seamless accessibility across web
              and mobile platforms. My experience with database management, including MSSQL, PostgreSQL, and Sequelize migrations, has further enabled me to optimize data handling
              and performance.
            </p>
          </div>
        </section>

        <section id="experience" className={sectionClassName}>
          <h2 className="text-sm font-mono uppercase tracking-[0.25em] text-accent">Experience</h2>
          <div className="mt-6 space-y-4">
            {experiences.map((experience) => (
              <article
                key={experience.id}
                className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm shadow-black/30 backdrop-blur-sm"
              >
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                  <div>
                    <h3 className="text-sm font-semibold sm:text-base">{experience.role}</h3>
                    <p className="text-xs text-foreground/60 sm:text-sm">{experience.company}</p>
                  </div>
                  <p className="text-xs text-foreground/50 sm:text-xs">{experience.period}</p>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-foreground/80 sm:text-sm">
                  {experience.description}
                </p>
                {experience.techStack && experience.techStack.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {experience.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-black/20 px-2.5 py-0.5 text-[11px] text-foreground/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className={sectionClassName}>
          <h2 className="text-sm font-mono uppercase tracking-[0.25em] text-accent">Projects</h2>

          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                Web
              </h3>
              <div className="grid gap-4">
                {webProjects.map((project) => {
                  const primaryScreenshot = project.screenshotNames?.[0];

                  return (
                    <article
                      key={project.id}
                      className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-sm shadow-sm shadow-black/30 backdrop-blur-sm"
                    >
                      <div>
                        <ProjectTitle project={project} />
                        <p className="mt-2 text-xs leading-relaxed text-foreground/80">
                          {project.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-white/10 bg-black/20 px-2.5 py-0.5 text-[11px] text-foreground/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="relative h-52 w-full max-w-xs rounded-xl border border-accent-soft/30 bg-accent-soft/10 shadow-inner shadow-black/40">
                            <div className="absolute inset-x-4 top-2 flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                            </div>
                            <div className="absolute inset-x-3 bottom-2 top-5 overflow-hidden rounded-lg border border-white/15 bg-black/60">
                              {primaryScreenshot ? (
                                <button
                                  type="button"
                                  className="relative block h-full w-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                                  // onClick={() =>
                                  //   openModal({
                                  //     src: imageSrc(primaryScreenshot),
                                  //     alt: `${project.name} screenshot`,
                                  //   })
                                  // }
                                  aria-label={`Open ${project.name} screenshot`}
                                >
                                  <Image
                                    src={imageSrc(primaryScreenshot)}
                                    alt={`${project.name} screenshot`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 320px"
                                    className="object-cover"
                                  />
                                </button>
                              ) : (
                                <div className="flex h-full w-full items-center justify-center px-3 text-center">
                                  <span className="text-[10px] text-foreground/70">
                                    web-screenshot.png
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                macOS
              </h3>
              <div className="grid gap-4">
                {macosProjects.map((project) => {
                  const hasScreenshots =
                    project.screenshotNames && project.screenshotNames.length > 0;

                  return (
                    <article
                      key={project.id}
                      className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-sm shadow-sm shadow-black/30 backdrop-blur-sm"
                    >
                      <div>
                        <ProjectTitle project={project} />
                        <p className="mt-2 text-xs leading-relaxed text-foreground/80">
                          {project.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-white/10 bg-black/20 px-2.5 py-0.5 text-[11px] text-foreground/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3">
	                          <div className="grid grid-cols-2 gap-3 sm:flex sm:overflow-x-auto sm:pb-2">
	                            {hasScreenshots ? (
	                              project.screenshotNames!.map((screenshotName, index) => (
	                                <button
	                                  type="button"
	                                  key={screenshotName ?? index}
	                                  className="relative h-40 w-24 shrink-0 cursor-zoom-in rounded-3xl border border-accent-soft/40 bg-accent-soft/20 shadow-inner shadow-black/50 transition hover:border-accent-soft/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
	                                  onClick={() =>
	                                    openModal({
	                                      src: imageSrc(screenshotName),
	                                      alt: `${project.name} screenshot ${index + 1}`,
	                                    })
	                                  }
	                                  aria-label={`Open ${project.name} screenshot ${index + 1}`}
	                                >
	                                  <div className="absolute inset-1 overflow-hidden rounded-2xl border border-white/20 bg-black/60">
	                                    <Image
	                                      src={imageSrc(screenshotName)}
	                                      alt={`${project.name} screenshot ${index + 1}`}
	                                      fill
	                                      sizes="96px"
	                                      className="object-cover"
	                                    />
	                                  </div>
	                                  <div className="absolute inset-x-6 top-2 h-1.5 rounded-full bg-white/20" />
	                                  <div className="absolute inset-x-4 bottom-2 h-1 rounded-full bg-white/20" />
	                                </button>
	                              ))
	                            ) : (
	                              <div className="relative h-40 w-24 shrink-0 rounded-3xl border border-accent-soft/40 bg-accent-soft/20 shadow-inner shadow-black/50">
	                                <div className="absolute inset-1 overflow-hidden rounded-2xl border border-white/20 bg-black/60">
	                                  <div className="flex h-full w-full items-center justify-center px-2 text-center">
                                    <span className="text-[10px] text-foreground/70">
                                      macos-screenshot.png
                                    </span>
                                  </div>
                                </div>
                                <div className="absolute inset-x-6 top-2 h-1.5 rounded-full bg-white/20" />
                                <div className="absolute inset-x-4 bottom-2 h-1 rounded-full bg-white/20" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
              Mobile
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {mobileProjects.map((project) => {
                const hasScreenshots =
                  project.screenshotNames && project.screenshotNames.length > 0;

                return (
                  <article
                    key={project.id}
                    className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm shadow-sm shadow-black/30 backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <ProjectTitle project={project} />
                        <p className="mt-1 text-xs leading-relaxed text-foreground/80">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-black/20 px-2.5 py-0.5 text-[11px] text-foreground/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
	                      <div className="grid grid-cols-2 gap-3 sm:flex sm:overflow-x-auto sm:pb-2">
	                        {hasScreenshots ? (
	                          project.screenshotNames!.map((screenshotName, index) => (
	                            <button
	                              type="button"
	                              key={screenshotName ?? index}
	                              className="relative h-40 w-24 shrink-0 cursor-zoom-in rounded-3xl border border-accent-soft/40 bg-accent-soft/20 shadow-inner shadow-black/50 transition hover:border-accent-soft/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
	                              onClick={() =>
	                                openModal({
	                                  src: imageSrc(screenshotName),
	                                  alt: `${project.name} screenshot ${index + 1}`,
	                                })
	                              }
	                              aria-label={`Open ${project.name} screenshot ${index + 1}`}
	                            >
	                              <div className="absolute inset-1 overflow-hidden rounded-2xl border border-white/20 bg-black/60">
	                                <Image
	                                  src={imageSrc(screenshotName)}
	                                  alt={`${project.name} screenshot ${index + 1}`}
	                                  fill
	                                  sizes="96px"
	                                  className="object-cover"
	                                />
	                              </div>
	                              <div className="absolute inset-x-6 top-2 h-1.5 rounded-full bg-white/20" />
	                              <div className="absolute inset-x-4 bottom-2 h-1 rounded-full bg-white/20" />
	                            </button>
	                          ))
	                        ) : (
	                          <div className="relative h-40 w-24 shrink-0 rounded-3xl border border-accent-soft/40 bg-accent-soft/20 shadow-inner shadow-black/50">
	                            <div className="absolute inset-1 overflow-hidden rounded-2xl border border-white/20 bg-black/60">
	                              <div className="flex h-full w-full items-center justify-center px-2 text-center">
                                <span className="text-[10px] text-foreground/70">
                                  screenshot.png
                                </span>
                              </div>
                            </div>
                            <div className="absolute inset-x-6 top-2 h-1.5 rounded-full bg-white/20" />
                            <div className="absolute inset-x-4 bottom-2 h-1 rounded-full bg-white/20" />
                          </div>
                        )}
                      </div>
                      <p className="flex-1 text-xs text-foreground/60">
                        {project.note ?? "Add a screenshot of the app UI here."}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className={sectionClassName}>
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="md:w-2/3">
              <h2 className="text-sm font-mono uppercase tracking-[0.25em] text-accent">Contact</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-base">
                I am always open to discussing frontend architecture, React and React Native
                projects, or mentoring opportunities. I am available on social medias provided
                below. You can message me, I will reply as soon as possible.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm sm:justify-start">
                <a
                  href="mailto:michaelds.lim@gmail.com"
                  className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-background shadow-sm shadow-accent/40 transition hover:bg-accent-soft"
                >
                  Email
                </a>
                <a
                  href="https://github.com/michaeldslim/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-accent/40 px-5 py-2 text-sm font-medium text-accent transition hover:border-accent hover:bg-accent/5"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/codeinlife/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-accent/40 px-5 py-2 text-sm font-medium text-accent transition hover:border-accent hover:bg-accent/5"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="md:w-1/3">
              <div className="mt-8 flex justify-center md:mt-0">
                <div className="rounded-3xl border border-accent-soft/40 bg-background/60 p-1.5 shadow-lg shadow-black/40">
                  <div className="relative h-44 w-44 overflow-hidden rounded-2xl border border-accent-soft/60 bg-white/5">
                    <Image
                      src={imageSrc("michael.jpg")}
                      alt="Portrait of Michael Lim"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
