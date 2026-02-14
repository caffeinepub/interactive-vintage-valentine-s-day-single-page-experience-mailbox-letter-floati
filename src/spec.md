# Specification

## Summary
**Goal:** Add site-wide looping background music for the full Valentine single-page experience, and update the scratch-off couple illustration so the guy’s turban is plain dark red without the center golden ornament.

**Planned changes:**
- Add a background audio player that can start after an initial user gesture (to satisfy browser autoplay restrictions), loops continuously, and persists across all scenes while scrolling.
- Add a simple on-screen mute/unmute control (English text) for the background music.
- Update the scratch-off revealed couple illustration asset to remove the turban’s center golden element and make the turban plain dark red, then update asset references to use the new filename to avoid cached versions.

**User-visible outcome:** The page plays a looping background song across Mailbox → Movie Ticket → Scratch Frame scenes with a mute/unmute control, and the scratch-off reveal shows the updated couple illustration with a plain dark red turban (no center gold ornament).
