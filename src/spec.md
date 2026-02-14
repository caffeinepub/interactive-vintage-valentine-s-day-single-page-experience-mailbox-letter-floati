# Specification

## Summary
**Goal:** Replace the scratch-off revealed couple selfie illustration so it matches the specified couple details and ensure the app reliably displays the updated image (not a cached/old version).

**Planned changes:**
- Add a new comic-like couple selfie illustration image (v2) under `frontend/public/assets/generated` with the requested appearance, outfits, pose, and warm romantic/candlelit lighting.
- Update `frontend/src/components/valentine/assets.ts` so `ScratchFrameScene` references the new illustration filename and loads it from the local static asset path to avoid showing an old/cached image.

**User-visible outcome:** The scratch-off reveal shows the updated couple selfie illustration (matching the couple details) consistently on both normal refresh and hard refresh.
