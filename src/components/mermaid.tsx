'use client';

import mermaid from 'mermaid';
import { useEffect, useId, useState } from 'react';

/**
 * Mermaid diagram that follows the Fumadocs theme (light/dark/system).
 *
 * Reads the computed `--fd-*` CSS variables from the document root at render
 * time, so the diagram uses the exact palette of the active theme — and
 * re-renders when the theme changes (observed via attribute mutations on
 * `<html>`).
 */
let initialized = false;

function readCssVar(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

function themeVariables() {
  const css = (name: string, fallback: string) => readCssVar(name, fallback);

  return {
    // nodes
    primaryColor: css('--fd-card', '#ffffff'),
    primaryTextColor: css('--fd-foreground', '#000000'),
    primaryBorderColor: css('--fd-border', '#d4d4d4'),
    secondaryColor: css('--fd-muted', '#f5f5f5'),
    tertiaryColor: css('--fd-muted', '#f5f5f5'),
    // lines / labels
    lineColor: css('--fd-border', '#d4d4d4'),
    textColor: css('--fd-foreground', '#000000'),
    edgeLabelBackground: css('--fd-card', '#ffffff'),
    // clusters / notes
    clusterBkg: css('--fd-muted', '#f5f5f5'),
    clusterBorder: css('--fd-border', '#d4d4d4'),
    noteBkgColor: css('--fd-card', '#ffffff'),
    noteBorderColor: css('--fd-border', '#d4d4d4'),
    noteTextColor: css('--fd-foreground', '#000000'),
    // sequence diagram actors
    actorBkg: css('--fd-card', '#ffffff'),
    actorBorder: css('--fd-border', '#d4d4d4'),
    actorTextColor: css('--fd-foreground', '#000000'),
    actorLineColor: css('--fd-border', '#d4d4d4'),
    signalColor: css('--fd-border', '#d4d4d4'),
    signalTextColor: css('--fd-foreground', '#000000'),
    labelBoxBkgColor: css('--fd-card', '#ffffff'),
    labelBoxBorderColor: css('--fd-border', '#d4d4d4'),
    labelTextColor: css('--fd-foreground', '#000000'),
    // titles
    titleColor: css('--fd-foreground', '#000000'),
  };
}

function initMermaid() {
  if (initialized) return;
  initialized = true;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    fontFamily: 'inherit',
  });
}

export function Mermaid({ code }: { code: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [svg, setSvg] = useState('');

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      initMermaid();
      mermaid.initialize({ themeVariables: themeVariables() });

      try {
        const { svg } = await mermaid.render(`mmd-${id}`, code);
        if (!cancelled) setSvg(svg);
      } catch (error) {
        console.error('[Mermaid] failed to render:', error);
      }
    };

    void render();

    // Re-render when the theme (light/dark/system) changes.
    const observer = new MutationObserver(() => {
      void render();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [code, id]);

  return (
    <div
      className="mermaid my-4 overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
