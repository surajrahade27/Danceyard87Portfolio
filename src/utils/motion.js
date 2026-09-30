// Read once at load: effects that follow the cursor or loop forever check these.
export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
