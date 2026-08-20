# PromptJeopardy

Swedish facilitator-led workshop game for teaching better prompting with Skatteverket material.

## Run locally

```bash
npm install
npm run dev
```

## Classroom display

- Run the browser in fullscreen mode (`F11`) and keep browser zoom at 100%.
- The participant-facing task modal is designed for 16:9 projectors and large TVs.
- Keep the task view open until everyone has read the numbered steps, expected result, and source limit.
- The board uses its full width at common 720p and 768p projector resolutions; facilitator controls move below it when horizontal space is limited.
- Before a workshop, check the app at the actual projector resolution from the back of the room.

## Recommended one-hour format

- Use `60 min workshop` mode.
- Prepare the annual report, the klarspråk document, and a small pack of safe shared files in advance.
- Run the five recommended rounds in order:
  1. `Tre viktigaste insikterna`
  2. `Testa mot klarspråksdokumentet`
  3. `Jämför filer från OneDrive eller SharePoint`
  4. `Workshopövning som PowerPoint`
  5. `Datainsikt med kontrollfrågor`
- Use the built-in oral special moments between rounds:
  - after round 2: `Vad saknas?`
  - after round 3: `Förbättra prompten`
  - after round 4: `Farlig detalj`
- Keep the teaching thread consistent: role, source, task, format, control.

## Content workflow

- Edit authored tasks in `QUESTIONS.md`.
- Keep `src/data/tiles.ts` aligned with that file before running the workshop.
- `src/data/tiles.ts` is the runtime data source used by the app.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```
