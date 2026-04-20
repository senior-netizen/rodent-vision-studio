'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type KeyboardEvent, useCallback } from 'react';
import type { ProjectConfig } from '@/data/projects';

type ProjectCardProps = {
  project: ProjectConfig;
};

function isExternalUrl(url: string | undefined): url is string {
  return Boolean(url && /^https?:\/\//.test(url));
}

export function ProjectCard({ project }: ProjectCardProps) {
  const caseStudyHref = `/projects/${project.slug}`;
  const externalLiveHref = isExternalUrl(project.links.live)
    ? project.links.live
    : undefined;
  const stackLabel = project.stack.join(' • ');
  const lastSuccessfulCheckAt = project.linkHealth?.lastSuccessfulCheckAt;
  const staleContextLabel = lastSuccessfulCheckAt
    ? `Last successful check: ${new Date(lastSuccessfulCheckAt).toLocaleString()}`
    : 'No successful deployment health check recorded yet.';

  const handleCardClick = useCallback(() => {
    if (!externalLiveHref) return;
    window.open(externalLiveHref, '_blank', 'noopener,noreferrer');
  }, [externalLiveHref]);

  const handleCardKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!externalLiveHref) return;

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        window.open(externalLiveHref, '_blank', 'noopener,noreferrer');
      }
    },
    [externalLiveHref],
  );

  const interactiveProps = externalLiveHref
    ? {
        role: 'link' as const,
        tabIndex: 0,
        onClick: handleCardClick,
        onKeyDown: handleCardKeyDown,
      }
    : {};

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-300 ease-out hover:scale-105 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      {...interactiveProps}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.visuals.preview}
          alt={`${project.name} ${project.category} preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          priority={false}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold text-fg">{project.name}</h2>
            {project.stale && (
              <span
                className="rounded-full border border-amber-400/40 bg-amber-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-300"
                title={staleContextLabel}
              >
                Stale
              </span>
            )}
          </div>
          <p className="text-sm text-fg-muted">{stackLabel}</p>
          <p className="text-xs uppercase tracking-wider text-fg-dim">{project.category}</p>
          {project.stale && (
            <p className="text-xs text-amber-300/90" title={staleContextLabel}>
              {staleContextLabel}
            </p>
          )}
        </div>

        <div className="mt-auto flex gap-3 pt-3">
          {externalLiveHref ? (
            <a
              href={externalLiveHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-accent px-3 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={(event) => event.stopPropagation()}
            >
              View Live
            </a>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center rounded-md border border-border px-3 py-2 text-sm text-fg-dim">
              View Live
            </span>
          )}

          <Link
            href={caseStudyHref}
            className="inline-flex items-center rounded-md border border-border px-3 py-2 text-sm font-medium text-fg transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={(event) => event.stopPropagation()}
          >
            Case Study
          </Link>
        </div>
      </div>
    </article>
  );
}
