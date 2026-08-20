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
- The default is 15 pairs and five minutes of work per round. Keep the pace; use the facilitator's `+1 minute` control only when needed.
- Prepare the annual report and the klarspråk document in advance.
- Send `public/ovningsfiler/Semesterplan-demo.xlsx` to participants before the workshop. Ask them to save a copy in OneDrive or SharePoint and open it in Excel.
- Run the five recommended rounds in order:
  1. `Tre viktigaste insikterna`
  2. `Färdigt informationsblad i Word`
  3. `Infografik från årsredovisningen`
  4. `Formeldetektiven`
  5. `När är bemanningen som lägst?`
- Use the built-in oral special moments between rounds:
  - after round 2: `Vad saknas?`
  - after round 3: `Förbättra prompten`
  - after round 4: `Farlig detalj`
- Keep the teaching thread consistent: role, source, task, format, control.
- Each round uses two different roles: one pair presents and another pair gives one strength or control question. Pairs without a previous role are prioritized.

## Excel exercise

- Participant file: `public/ovningsfiler/Semesterplan-demo.xlsx`
- Facilitator-only answer key: `FACIT_SEMESTERPLAN.md`
- The workbook contains synthetic data, three planted formula anomalies, and a staffing scenario.
- Do not distribute the answer key with the workbook.
- To regenerate the workbook:

```bash
python -m pip install -r scripts/requirements.txt
python scripts/create_semesterplan.py
```

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
