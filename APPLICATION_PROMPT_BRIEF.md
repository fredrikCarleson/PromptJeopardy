# PromptJeopardy Application Brief

Use this file as context in a new prompt when asking an AI assistant to work on this application.

## What This Application Is

PromptJeopardy is a Swedish, Jeopardy-inspired workshop game for teaching AI prompting. The facilitator runs the app on a large shared monitor while participants work in pairs on their own computers.

The workshop material is Skatteverket's annual report plus a Swedish plain-language/klarspråk template. The annual report is around 500 pages, so tasks must ask participants to choose a manageable part of the report: one page, one section, a short page range, one table, one chart, or one image. Tasks should not ask participants to process the full report.

The app does not collect participant answers. Participants work from Microsoft 365 Copilot Chat on their own computers. Some tasks ask them to create, find, compare, or summarize Word documents, PowerPoint decks, Excel material, images, or work files they have permission to access. A randomly selected pair verbally presents what they produced, which source excerpt they used, and how they changed their prompt.

## Core Game Idea

PromptJeopardy should feel much closer to real Jeopardy:

- 5 columns with different topics.
- 5 rows with point values from 100 to 500.
- Unplayed tiles show only points.
- The task is hidden until a tile is selected.
- Completed tiles remain visible, dimmed, locked, and cannot be selected again.
- In `guided_workshop` mode, the facilitator can follow a recommended five-round learning path.
- In `open_board` mode, the first tile is selected randomly.
- Later tiles can be selected manually by the presenting pair or randomly by the facilitator.
- All participants cooperate toward a shared perfect score instead of competing against each other.
- For a 60-minute workshop, the default guided path is five rounds worth 1700 points. The open-board fallback still uses a 2100-point target for a looser 5-6 round session.
- Guided workshop mode also includes three short whole-room oral interludes:
  - after guided round 2: `Vad saknas?`
  - after guided round 3: `Förbättra prompten`
  - after guided round 4: `Farlig detalj`

## Current Jeopardy Topics

The current 5x5 board uses these topic columns:

- Förstå rapporten
- Klarspråk
- Analysera
- Skapa material
- Data & bild

Each column has 100, 200, 300, 400, and 500 point tasks.

## Round Flow

Each round follows this flow:

1. Select tile
   - Guided workshop mode offers the next recommended round.
   - Open-board mode starts randomly.
   - Later tiles may be chosen by the presenting pair or randomized.

2. Work in pairs
   - All pairs work on the revealed task.
   - They choose a specific excerpt from the annual report.
   - They use the relevant AI tool on their own computers.

3. Verbal presentation
   - The facilitator randomly selects a presenting pair.
   - The pair presents from their own computer.
   - The app shows reflection prompts and a timer.

4. Add points
   - The facilitator marks the task complete.
   - Points are added to the shared score.
   - The completed tile is locked.
   - The game returns to tile selection.

## Data Model

Important types live in `src/types.ts`.

`Tile` includes:

- `id`
- `topic`
- `points`
- `title`
- `shortLabel`
- `task`
- `toolFocus`
- `appFocus`
- `learningGoal`
- `sourceInstruction`
- `verbalPresentationPrompt`
- `status`

`GameConfig` includes:

- `mode`
- `numPairs`
- `pairNames`
- `targetScore`
- `timerMinutes`
- `presentationSeconds`
- `avoidRepeatingPresenter`
- `plannedTileIds`

Task data lives in `src/data/tiles.ts`.

## Main Components

- `src/App.tsx`
  - Top-level screen routing and setup persistence.

- `src/components/OnboardingScreen.tsx`
  - Landing screen explaining the workshop format.

- `src/components/RulesScreen.tsx`
  - Rules and facilitation model.

- `src/components/SetupScreen.tsx`
  - Configures number of pairs, score target, work timer, presentation timer, and presenter repeat behavior.
  - Defaults to a guided 60-minute workshop: five recommended rounds, 1700 points, 5 minutes work time, and 75 seconds verbal reflection.

- `src/components/GameScreen.tsx`
  - Main game state controller: progress, round phase, timer, random tile, random presenter, scoring, undo, reset, persistence.

- `src/components/GameBoard.tsx`
  - 5x5 Jeopardy board.

- `src/components/RoundFlow.tsx`
  - Facilitator control panel for the current phase, including the recommended next round, prompt recipe, fallback tile swap, and post-round teaching cue.

- `src/components/PresentationScreen.tsx`
  - Full-screen verbal reflection screen for the randomly selected presenter pair.

- `src/components/SpecialMomentScreen.tsx`
  - Full-screen facilitator-led oral interlude for the whole room.

- `src/components/TileModal.tsx`
  - Active tile detail view.

- `src/components/TileRevealAnimation.tsx`
  - Random tile reveal animation with optional sound.

- `src/components/TopBar.tsx`
  - Shared score, target, remaining points, completed tiles, round count, latest presenter, and progress bar.

- `src/data/specialMoments.ts`
  - Authored whole-room oral interludes used by guided workshop mode.

## Persistence

The app uses browser `localStorage`:

- `gameConfig`
  - Stores setup choices and resumes directly into the game.

- `gameProgress`
  - Stores score, round count, tile states, active tile, last presenter, and history.

Reset clears both keys.

## Design Direction

The live game screen should prioritize the big monitor experience:

- Strong Jeopardy-style board.
- Large point values.
- Hidden tasks until reveal.
- Facilitator controls on the side.
- Manual/verbal presentation support, not answer submission.
- Dark blue/yellow game-show feel without losing workshop clarity.

## Useful Prompt For Future Work

You are working on PromptJeopardy, a Swedish React/TypeScript/Vite/Tailwind app for running a cooperative AI-prompting workshop. Participants work in pairs on their own computers from Microsoft 365 Copilot Chat. The facilitator runs the app on a large monitor. The app should behave like Jeopardy: a 5x5 board, hidden tasks until selected, point values, locked completed tiles, a guided five-round workshop mode with short whole-room oral interludes, an optional open-board mode, random presenter selection, and a shared perfect-score goal. Tasks are based on Skatteverket's annual report and a klarspråk document; because the annual report is around 500 pages, every task must ask participants to choose a small part of the report rather than process all of it. Preserve the manual verbal presentation model: the app shows reflection prompts and timers but does not collect answers or files.
