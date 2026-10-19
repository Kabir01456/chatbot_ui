import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';

export interface Size { w: number; h: number }

const MIN: Size = { w: 360, h: 480 };
const EXPANDED_DESKTOP_WIDTH = 880;
const EXPANDED_DESKTOP_HEIGHT = 740;
const KEY_STEP = 24;
const EDGE_GAP = 40; // 20px offset on each side of the viewport

const clamp = ({ w, h }: Size): Size => ({
  w: Math.min(Math.max(w, MIN.w), Math.max(MIN.w, (typeof window !== 'undefined' ? window.innerWidth : 1200) - EDGE_GAP)),
  h: Math.min(Math.max(h, MIN.h), Math.max(MIN.h, (typeof window !== 'undefined' ? window.innerHeight : 900) - EDGE_GAP)),
});

export function useResizableWindow() {
  const [size, setSize] = useState<Size | null>(null);
  const [expanded, setExpanded] = useState(false);
  const windowRef = useRef<HTMLElement | null>(null);

  const current = useCallback((): Size | null => {
    const el = windowRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { w: rect.width, h: rect.height };
  }, []);

  const startResize = useCallback((e: PointerEvent<HTMLButtonElement>) => {
    const start = current();
    if (!start) return;
    e.preventDefault();
    const handle = e.currentTarget;
    const { clientX: x0, clientY: y0 } = e;
    handle.setPointerCapture(e.pointerId);

    const onMove = (ev: globalThis.PointerEvent) => {
      setExpanded(false);
      setSize(clamp({ w: start.w + (x0 - ev.clientX), h: start.h + (y0 - ev.clientY) }));
    };
    const onEnd = () => {
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onEnd);
      handle.removeEventListener('pointercancel', onEnd);
    };
    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', onEnd);
    handle.addEventListener('pointercancel', onEnd);
  }, [current]);

  const onHandleKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    const deltas: Record<string, [number, number]> = {
      ArrowLeft: [KEY_STEP, 0], ArrowRight: [-KEY_STEP, 0], ArrowUp: [0, KEY_STEP], ArrowDown: [0, -KEY_STEP],
    };
    const d = deltas[e.key];
    const start = current();
    if (!d || !start) return;
    e.preventDefault();
    setExpanded(false);
    setSize(clamp({ w: start.w + d[0], h: start.h + d[1] }));
  }, [current]);

  const toggleExpand = useCallback(() => {
    if (expanded) {
      setSize(null);
      setExpanded(false);
    } else {
      setSize(clamp({ w: EXPANDED_DESKTOP_WIDTH, h: EXPANDED_DESKTOP_HEIGHT }));
      setExpanded(true);
    }
  }, [expanded]);

  const expandToArticle = useCallback(() => {
    setSize(clamp({ w: EXPANDED_DESKTOP_WIDTH, h: EXPANDED_DESKTOP_HEIGHT }));
    setExpanded(true);
  }, []);

  const restoreCompact = useCallback(() => {
    setSize(null);
    setExpanded(false);
  }, []);

  useEffect(() => {
    const onResize = () => setSize((s) => (s ? clamp(s) : s));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return {
    size,
    expanded,
    windowRef,
    startResize,
    onHandleKeyDown,
    toggleExpand,
    expandToArticle,
    restoreCompact,
  };
}

export type ResizableWindow = ReturnType<typeof useResizableWindow>;
