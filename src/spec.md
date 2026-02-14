# Specification

## Summary
**Goal:** Build a single-page interactive vintage Valentine’s Day experience with three scroll-driven, required interactions (mailbox letter, floating ticket catch, scratch-off frame) using a consistent moody, warm, candlelit aesthetic and robust asset loading/input handling.

**Planned changes:**
- Apply a cohesive vintage romantic theme across the whole page (warm golden tones, old-paper textures, soft shadows, subtle candlelight flicker, slow fades/transitions).
- Opening scene: render a centered vintage mailbox with idle glow/motion; on click, slide out an envelope labeled exactly "To: My Bestie 🤍"; on envelope click, unfold a letter and display the provided message in a handwritten-style font; show a subtle glowing “Scroll to continue” only after the letter is visible; start ambient romantic instrumental audio on first user interaction.
- Second section: on scroll past the letter, show a drifting vintage movie ticket the user must click to “catch”; on catch, stop motion, enlarge, reveal exactly: "🎬 Movie Night", "February 14, 2026", "Movie: TBD", "Time: 10 PM (MT)", plus the line “Front row seats to forever with you.” with a gentle glow/shimmer reveal.
- Third section: on further scroll, show a candlelit vintage gold frame containing an image covered by a scratch-off overlay; enable mouse/touch drag scratching that progressively reveals the underlying illustration; require scratching past a defined reveal threshold to complete.
- Add asset preloading and a graceful loading state; ensure interactions work with mouse/touch, avoid progression-state bugs, and reset consistently to the mailbox scene on refresh.
- Store and reference all custom visuals locally from `frontend/public/assets/generated` (no backend image fetching).

**User-visible outcome:** Users can progress through a single-page vintage Valentine’s experience by clicking a mailbox to reveal and open a letter, catching a floating movie ticket to reveal details, and scratching off a framed overlay to reveal a romantic illustration—complete with subtle candlelit ambiance and smooth transitions.
