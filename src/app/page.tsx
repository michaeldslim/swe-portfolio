"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { IExperience, INavItem, IProject } from "@/types";

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-off-black-ink/90 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot preview"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-5xl">
        <div className="flex justify-end pb-3">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-[28px] bg-pure-white px-5 py-2 text-sm font-medium text-off-black-ink transition hover:bg-off-white-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime"
            aria-label="Close screenshot preview"
          >
            Close
          </button>
        </div>
        <div className="relative h-[70vh] w-full overflow-hidden rounded-[28px] bg-deep-charcoal">
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
  {
    id: "proj-mobile-11",
    name: "Pong Game",
    description:
      "A classic Pong game implemented with React Native. Challenge yourself in a single-player experience against an AI opponent.",
    techStack: ["React Native", "TypeScript", "Expo", "Android"],
    href: "https://github.com/michaeldslim/pong-rn/releases/latest",
    iosHref: "",
    category: "mobile",
    note: "",
    screenshotNames: ["pong-1.png", "pong-2.png", "pong-3.png", "pong-4.png"],
  },
];

const imageSrc = (filename: string) => `/images/${filename}`;

const sectionShell = "mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8";
const sectionPadding = "py-16 sm:py-20 md:py-24";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-graphite">
      {children}
    </p>
  );
}

function SectionDivider() {
  return <hr className="border-0 border-t border-ash" />;
}

function DownloadLink({ href, label }: { href?: string; label: string }) {
  const trimmed = href?.trim();
  const isExternal = trimmed?.startsWith("http") ?? false;

  if (!trimmed) {
    return <span className="text-graphite">[{label}]</span>;
  }

  return (
    <a
      href={trimmed}
      className="border-b border-off-black-ink text-off-black-ink transition hover:text-graphite"
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      [{label}]
    </a>
  );
}

function TechTag({ label, onParchment = false }: { label: string; onParchment?: boolean }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-off-black-ink ${
        onParchment ? "bg-pure-white" : "bg-off-white-canvas"
      }`}
    >
      {label}
    </span>
  );
}

function ProjectTitle({ project }: { project: IProject }) {
  if (project.category === "mobile") {
    return (
      <div>
        <h3 className="text-[22px] font-medium leading-[1.18] text-off-black-ink">{project.name}</h3>
        <div className="mt-1 text-sm">
          <DownloadLink href={project.href} label="Download for Android" />
        </div>
        <div className="text-sm">
          <DownloadLink href={project.iosHref} label="Download for iOS" />
        </div>
      </div>
    );
  }

  const href = project.href?.trim();
  const isExternal = href?.startsWith("http") ?? false;

  return (
    <div>
      <h3 className="text-[22px] font-medium leading-[1.18] text-off-black-ink">{project.name}</h3>
      {href ? (
        <div className="mt-1 text-sm">
          <a
            href={href}
            className="border-b border-off-black-ink text-off-black-ink transition hover:text-graphite"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            [{project.category === "macos" ? "Download for macOS" : "Download"}]
          </a>
        </div>
      ) : null}
    </div>
  );
}

function ScreenshotButton({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="relative h-40 w-24 shrink-0 cursor-pointer overflow-hidden rounded-[18px] bg-off-white-canvas transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime"
      onClick={onClick}
      aria-label={alt}
    >
      <Image src={src} alt={alt} fill sizes="96px" className="object-cover" />
    </button>
  );
}

export default function Home() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [modalImage, setModalImage] = useState<ModalImage | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
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
    <div className="min-h-screen overflow-x-hidden bg-pure-white text-off-black-ink">
      {modalImage && <ScreenshotModal image={modalImage} onClose={closeModal} />}

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-ash bg-pure-white">
        <div className={`${sectionShell} flex items-center justify-between py-4 sm:py-5`}>
          <a href="#home" className="text-base font-medium text-off-black-ink">
            Michael Lim
          </a>
          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-6 sm:flex">
              {navItems.slice(1, -1).map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-sm font-medium text-graphite transition hover:text-off-black-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href="#contact"
              className="hidden rounded-[28px] bg-electric-lime px-5 py-3 text-sm font-medium text-off-black-ink transition hover:opacity-90 sm:inline-flex"
            >
              Contact
            </a>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-medium text-off-black-ink sm:hidden"
              onClick={() => setIsMobileNavOpen((open) => !open)}
              aria-label="Toggle navigation menu"
            >
              Menu
              <span className="flex flex-col gap-1">
                <span className="h-px w-4 bg-off-black-ink" />
                <span className="h-px w-4 bg-off-black-ink" />
              </span>
            </button>
          </div>
        </div>
        {isMobileNavOpen && (
          <nav className="border-t border-ash py-4 sm:hidden">
            <div className={`${sectionShell} flex flex-col gap-3`}>
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="py-1 text-sm font-medium text-off-black-ink"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* Hero — Lime Accent Block */}
        <section id="home" className="scroll-mt-24 bg-electric-lime">
          <div className={`${sectionShell} ${sectionPadding}`}>
            <Eyebrow>Senior Software Engineer</Eyebrow>
            <h1 className="mt-4 max-w-4xl text-[36px] font-medium leading-[0.95] tracking-[-0.03em] text-off-black-ink sm:text-[52px] md:text-[72px] lg:text-[80px]">
              I build clear, performant web and mobile experiences.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-off-black-ink/80">
            Senior Software Engineer with 13+ years building scalable, accessible web and mobile applications - specializing in React, React Native, and TypeScript.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#experience"
                className="rounded-[28px] bg-off-black-ink px-6 py-3.5 text-sm font-medium text-off-white-canvas transition hover:opacity-90"
              >
                View experience
              </a>
              <a
                href="#projects"
                className="border-b border-off-black-ink pb-0.5 text-sm font-medium text-off-black-ink transition hover:text-graphite"
              >
                View projects
              </a>
            </div>
          </div>
        </section>

        {/* About — White Canvas */}
        <section id="about" className="scroll-mt-24 bg-pure-white">
          <div className={`${sectionShell} ${sectionPadding}`}>
            <Eyebrow>About</Eyebrow>
            <h2 className="mt-3 text-[28px] font-medium leading-[1.14] tracking-[-0.02em] text-off-black-ink sm:text-[36px] md:text-[40px]">
              Engineering with clarity and care.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-graphite">
              <p>
                I hold a master&apos;s degree in Engineering Technology and a bachelor&apos;s degree
                in Computer Science. With over 13 years of experience in web development, I have built
                a strong foundation in designing and developing dynamic, scalable web and mobile
                applications using React, React Native, TypeScript, and modern JavaScript tools.
              </p>
              <p>
                Most recently, I served as a Technical Consultant at Northwell Health, where I provided
                specialized front-end development expertise and partnered closely with internal teams
                to drive digital transformation initiatives. I played a key role in implementing GCP
                Vertex AI features on the Google Cloud Platform, enhancing user search experiences,
                and contributed to the MyNorthwell application.
              </p>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Experience — Parchment Band */}
        <section id="experience" className="scroll-mt-24 bg-off-white-canvas">
          <div className={`${sectionShell} ${sectionPadding}`}>
            <Eyebrow>Experience</Eyebrow>
            <h2 className="mt-3 text-[28px] font-medium leading-[1.14] tracking-[-0.02em] text-off-black-ink sm:text-[36px] md:text-[40px]">
              13+ years building products.
            </h2>
            <div className="mt-10 space-y-5">
              {experiences.map((experience) => (
                <article
                  key={experience.id}
                  className="rounded-[28px] bg-pure-white p-6 sm:p-8 md:p-10"
                >
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                    <div>
                      <h3 className="text-base font-medium text-off-black-ink sm:text-lg">
                        {experience.role}
                      </h3>
                      <p className="mt-1 text-sm text-graphite">{experience.company}</p>
                    </div>
                    {experience.period && (
                      <p className="text-sm text-graphite">{experience.period}</p>
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-graphite sm:text-base">
                    {experience.description}
                  </p>
                  {experience.techStack && experience.techStack.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {experience.techStack.map((tech) => (
                        <TechTag key={tech} label={tech} />
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Projects — White Canvas */}
        <section id="projects" className="scroll-mt-24 bg-pure-white">
          <div className={`${sectionShell} ${sectionPadding}`}>
            <Eyebrow>Projects</Eyebrow>
            <h2 className="mt-3 text-[28px] font-medium leading-[1.14] tracking-[-0.02em] text-off-black-ink sm:text-[36px] md:text-[40px]">
              Selected work across web, mobile, and macOS.
            </h2>

            <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-stretch">
              {/* Web */}
              <div className="flex min-w-0 flex-col gap-5">
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-graphite">
                  Web
                </p>
                {webProjects.map((project) => {
                  const primaryScreenshot = project.screenshotNames?.[0];
                  return (
                    <article
                      key={project.id}
                      className="flex min-w-0 flex-1 flex-col rounded-[28px] bg-off-white-canvas p-6 sm:p-8"
                    >
                      <ProjectTitle project={project} />
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-graphite">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <TechTag key={tech} label={tech} onParchment />
                        ))}
                      </div>
                      {primaryScreenshot && (
                        <button
                          type="button"
                          className="relative mt-auto h-52 w-full min-w-0 shrink-0 cursor-pointer overflow-hidden rounded-[18px] bg-pure-white pt-5 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime"
                          onClick={() =>
                            openModal({
                              src: imageSrc(primaryScreenshot),
                              alt: `${project.name} screenshot`,
                            })
                          }
                          aria-label={`Open ${project.name} screenshot`}
                        >
                          <Image
                            src={imageSrc(primaryScreenshot)}
                            alt={`${project.name} screenshot`}
                            fill
                            sizes="(max-width: 768px) 100vw, 480px"
                            className="object-cover"
                          />
                        </button>
                      )}
                    </article>
                  );
                })}
              </div>

              {/* macOS */}
              <div className="flex min-w-0 flex-col gap-5">
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-graphite">
                  macOS
                </p>
                {macosProjects.map((project) => {
                  const hasScreenshots =
                    project.screenshotNames && project.screenshotNames.length > 0;
                  return (
                    <article
                      key={project.id}
                      className="flex min-w-0 flex-1 flex-col rounded-[28px] bg-off-white-canvas p-6 sm:p-8"
                    >
                      <ProjectTitle project={project} />
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-graphite">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <TechTag key={tech} label={tech} onParchment />
                        ))}
                      </div>
                      {hasScreenshots && (
                        <div className="mt-auto flex min-w-0 gap-3 overflow-x-auto pt-5 pb-2">
                          {project.screenshotNames!.map((screenshotName, index) => (
                            <ScreenshotButton
                              key={screenshotName ?? index}
                              src={imageSrc(screenshotName)}
                              alt={`${project.name} screenshot ${index + 1}`}
                              onClick={() =>
                                openModal({
                                  src: imageSrc(screenshotName),
                                  alt: `${project.name} screenshot ${index + 1}`,
                                })
                              }
                            />
                          ))}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Mobile */}
            <div className="mt-16">
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-graphite">
                Mobile
              </p>
              <div className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-2">
                {mobileProjects.map((project) => {
                  const hasScreenshots =
                    project.screenshotNames && project.screenshotNames.length > 0;
                  return (
                    <article
                      key={project.id}
                      className="min-w-0 rounded-[28px] bg-off-white-canvas p-6 sm:p-8"
                    >
                      <ProjectTitle project={project} />
                      <p className="mt-3 text-sm leading-relaxed text-graphite">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <TechTag key={tech} label={tech} onParchment />
                        ))}
                      </div>
                      {hasScreenshots && (
                        <div className="mt-5 flex min-w-0 gap-3 overflow-x-auto pb-2">
                          {project.screenshotNames!.map((screenshotName, index) => (
                            <ScreenshotButton
                              key={screenshotName ?? index}
                              src={imageSrc(screenshotName)}
                              alt={`${project.name} screenshot ${index + 1}`}
                              onClick={() =>
                                openModal({
                                  src: imageSrc(screenshotName),
                                  alt: `${project.name} screenshot ${index + 1}`,
                                })
                              }
                            />
                          ))}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Contact — Dark Island */}
        <section id="contact" className="scroll-mt-24 bg-off-black-ink">
          <div className={`${sectionShell} ${sectionPadding}`}>
            <div className="flex flex-col items-center gap-12 text-center md:flex-row md:items-start md:justify-between md:text-left">
              <div className="w-full md:max-w-xl">
                <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-ash">
                  Contact
                </p>
                <h2 className="mt-3 text-[28px] font-medium leading-[1.14] tracking-[-0.02em] text-off-white-canvas sm:text-[40px]">
                  Let&apos;s build something together.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ash">
                  I am always open to discussing frontend architecture, React and React Native
                  projects, or mentoring opportunities. Message me and I will reply as soon as
                  possible.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
                  <a
                    href="mailto:michaelds.lim@gmail.com"
                    className="rounded-[28px] bg-electric-lime px-6 py-3.5 text-sm font-medium text-off-black-ink transition hover:opacity-90"
                  >
                    Email
                  </a>
                  <a
                    href="https://github.com/michaeldslim/"
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-off-white-canvas pb-0.5 text-sm font-medium text-off-white-canvas transition hover:text-ash"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/codeinlife/"
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-off-white-canvas pb-0.5 text-sm font-medium text-off-white-canvas transition hover:text-ash"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              <div className="shrink-0">
                <div className="relative h-48 w-48 overflow-hidden rounded-[28px] bg-deep-charcoal sm:h-56 sm:w-56">
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
        </section>

        {/* Footer */}
        <footer className="bg-off-black-ink">
          <div className={`${sectionShell} border-t border-deep-charcoal py-8 sm:py-10`}>
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:items-center sm:text-left">
              <p className="text-sm text-ash">© {new Date().getFullYear()} Michael Lim</p>
              <nav className="flex flex-wrap justify-center gap-4 sm:justify-end sm:gap-6">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="text-sm text-ash transition hover:text-off-white-canvas"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
