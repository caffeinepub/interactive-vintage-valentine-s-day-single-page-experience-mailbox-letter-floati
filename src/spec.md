# Specification

## Summary
**Goal:** Fix the Valentine letter scene to use a handwritten-style font and update the scratch-off revealed couple illustration to match the provided couple description.

**Planned changes:**
- Update the scratch-off revealed image to use the local static asset path for `couple-illustration.dim_1400x1000.png` via `frontend/src/components/valentine/assets.ts`, ensuring the displayed revealed image matches the specified couple details and the scratch interaction remains functional.
- Change the letter body text styling to a clearly handwritten/script-style font while keeping the letter content string exactly unchanged in `frontend/src/components/valentine/LetterContent.ts`.

**User-visible outcome:** Opening the letter shows the same message in a handwritten-style font, and scratching off the frame reveals an updated couple illustration that matches the described Punjabi couple, without breaking layout or scratch functionality on desktop or mobile.
