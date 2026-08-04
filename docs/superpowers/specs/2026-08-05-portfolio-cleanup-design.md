# Portfolio cleanup and repair design

## Goal

Remove unfinished portfolio features and repair the navigation, blog metadata,
and accessibility defects that remain in the active site. The result must show
only content backed by real information and must not expose inactive calls to
action.

## Scope

### Remove unfinished project functionality

- Delete the unused `Projects` component and example project data.
- Remove the project CTA from the hero and the dangling `#projects` footer
  link.
- Remove stale project imports and any project claims from page metadata.

### Repair navigation and contact flow

- Replace the non-functional mobile menu with a compact, keyboard-accessible
  disclosure menu containing the same navigation links as desktop.
- Point the contact CTA at the existing email address rather than a missing
  fragment target.
- Give icon-only controls and the GitHub link accessible names.

### Remove unsupported resume UI

- Remove the resume-download CTA until an actual resume file and URL are
  supplied.

### Repair blog metadata

- Use a typed blog-post model instead of `any`.
- Merge configured title and description with GitHub post data when Markdown
  frontmatter is absent.
- Render title, date, and reading time only when values exist; do not display
  placeholder punctuation or `-` values.
- Generate a per-post browser title and description from the resolved data.

### Quality and accessibility baseline

- Make the decorative dot generation deterministic during a render.
- Use Next `Link` for internal navigation.
- Add visible keyboard focus styling and honor `prefers-reduced-motion`.
- Add a skip-to-content link and a stable `main` target.
- Fix existing lint findings in files touched by this scope, including review
  quotation markup.

## Explicit non-goals

- No new project cards, fictional project information, resume file, profile
  photo, or external social profile.
- No deployment or GitHub Pages configuration change.
- No visual redesign beyond the navigation states and accessibility feedback
  needed for the repairs.

## Implementation outline

1. Add regression tests for resolved blog metadata and navigation link data.
2. Remove project and resume surfaces, then repair anchors and contacts.
3. Implement the mobile disclosure menu and semantic labels.
4. Refactor blog data resolution into a typed helper used by metadata and page
   rendering.
5. Resolve lint and accessibility baseline issues; validate lint, build, and
   browser interaction on desktop and mobile.

## Acceptance criteria

- No project or resume CTA, `#projects`, or `#contact` fragment remains.
- The mobile menu opens and closes, exposes the same navigation destinations,
  and is named for assistive technology.
- Every displayed blog post has an accurate title; optional date and reading
  time are omitted cleanly when not available.
- The page exposes a skip link, visible focus state, and reduced-motion mode.
- `npm run lint` and `npm run build` pass.
