import { type KeyboardEvent, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ProjectConfig } from "@/data/siteConfig";
import { trackPortfolioEvent } from "@/lib/analytics";
import { ImageGlowFrame } from "@/components/ImageGlowFrame";

type ProjectAccordionGalleryProps = {
  projects: ProjectConfig[];
};

export function ProjectAccordionGallery({ projects }: ProjectAccordionGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const setActiveProject = (index: number) => {
    setActiveIndex(index);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLAnchorElement>) => {
    if (!projects.length) return;

    const isNext = event.key === "ArrowRight" || event.key === "ArrowDown";
    const isPrevious = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!isNext && !isPrevious) return;

    event.preventDefault();
    const nextIndex = isNext
      ? (index + 1) % projects.length
      : (index - 1 + projects.length) % projects.length;
    setActiveProject(nextIndex);
    panelRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="project-accordion-gallery" role="list" aria-label="Projetos selecionados no Behance">
      {projects.map((project, index) => {
        const isActive = activeIndex === index;

        return (
          <a
            key={project.number}
            ref={(element) => { panelRefs.current[index] = element; }}
            className={`project-accordion-panel${isActive ? " is-active" : ""}${index < activeIndex ? " is-before-active" : ""}${index > activeIndex ? " is-after-active" : ""}`}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            role="listitem"
            aria-current={isActive ? "true" : undefined}
            aria-label={`Abrir ${project.title} no Behance`}
            onMouseEnter={() => setActiveProject(index)}
            onFocus={() => setActiveProject(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onClick={() => trackPortfolioEvent("portfolio_behance", { project: project.number })}
          >
            <ImageGlowFrame className="project-accordion-media" aria-hidden="true">
              <img src={project.image} alt="" loading="lazy" fetchPriority="low" decoding="async" />
            </ImageGlowFrame>
            <span className="project-accordion-overlay" aria-hidden="true" />
            <span className="project-accordion-label">
              <span className="project-accordion-number">{project.number}</span>
              <span className="project-accordion-copy">
                <strong>{project.title}</strong>
                <small>{project.type} · {project.year}</small>
              </span>
              <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </a>
        );
      })}
    </div>
  );
}
