# Mutants & Masterminds 3rd Edition - Character Architect & Virtual Sheet

A web-based character creator, power builder, and interactive Roll20-style virtual tabletop sheet for **Mutants & Masterminds 3rd Edition (M&M 3e)** by Green Ronin Publishing.

Built specifically for desktop/laptop displays (minimum 1080px wide) with integrated Discord roll echoing, Hero Point tracking, Hero Lab-style power construction, and guided archetype generation.

---

## ⚡ Key Features

### 1. Guided & Freeform Character Generation
- **10 Deluxe Hero's Handbook Archetypes**: Battlesuit, Martial Artist, Mystic, Paragon, Speedster, Crime Fighter, Energy Controller, Powerhouse, Psychic / Mentalist, and Shapeshifter.
- **Rules-Compliant PL 10 (150 PP)**: Every archetype is pre-balanced to hit official Power Level 10 caps with 0 violations.
- **Freeform Mode**: Create heroes from scratch with customizable Power Level (PL 1 to 20+) and Power Points budget.
- **Multi-Character Roster**: Switch between multiple characters, clone, import, or export as `.json`.

### 2. Interactive Character Record (Roll20-Style)
- **One-Click Roll Buttons**: Attacks, Defense Saves, Skill Checks, and Initiative.
- **Automatic Modifiers**:
  - Unarmed and Power attacks factor in Fighting/Dexterity, Close/Ranged Combat skills, Close/Ranged Attack advantages, and Accurate extras.
  - Initiative calculates Agility + (`Improved Initiative` ranks × 4).
  - Toughness check automatically integrates Stamina, Protection, Defensive Roll, and subtracts current **Bruises** (-1 per bruise).
- **M&M 3e Degree of Success / Failure Engine**:
  - Compares checks against Target DC and automatically outputs 1st, 2nd, 3rd, and 4th degree outcomes.
  - Failing Toughness checks by 1st to 4th degrees automatically tracks Bruises, Dazed, Staggered, and Incapacitated status.

### 3. Discord Bot & Webhook Roll Echoing
- Integrates seamlessly with Discord via Discord Webhooks (no server hosting needed!).
- Echoes rich embeds into your tabletop Discord channel:
  - Color-coded embeds (Green for Success, Red for Failure, Gold for Critical Hits, Purple for Hero Points).
  - Die roll breakdowns: `d20 (14) + 8 = 22 vs DC 15`.
  - Degrees of success/failure and power descriptors.
  - "Send Test Roll" button to verify webhook connectivity with one click.

### 4. Hero Point Tracking & Interactive Spend Modal
- Tracks current Hero Points in real-time.
- Clicking **"⚡ Spend HP"** opens a dedicated modal with official M&M 3e benefits:
  1. **Reroll Check**: Automatically applies the M&M 3e rule: if the d20 roll is 1–10, it adds +10 to the die (guaranteeing a 11–20 roll)!
  2. **Extra Effort**: Gain an extra standard action, +2 check bonus, or temporary power stunt without fatigue.
  3. **Edit Scene**: Introduce advantageous narrative elements or clues.
  4. **Instant Counter**: Counter incoming powers without readied action.
  5. **Inspiration**: Receive clues or guidance from the Gamemaster.
  6. **Recovery / Escape Death**: Instantly recover from worst condition (Dazed, Staggered, or Bruise).

### 5. Hero Lab-Style Power Building Model
- **Base Effects Library**: Damage, Blast, Affliction, Move Object, Protection, Flight, Speed, Quickness, Leaping, Teleport, Insubstantial, Senses, Illusion, Create, Concealment, Morph, Regeneration, Immunity, etc.
- **Extras & Flaws Catalogs**: Area (Burst, Cone, Line), Multiattack, Penetrating, Impervious, Accurate, Subtle, Removable Devices, Easily Removable, Limited, Distracting, Tiring, Quirk, etc.
- **Hero Lab Fractional Cost Arithmetic**: Correctly handles M&M 3e rules when net rank cost drops to 0 or below (`1 PP per 2 ranks`, `1 PP per 3 ranks`, etc.).
- **Alternate Effects Arrays**: Primary powers pay full cost while alternate configurations cost 1 PP each (or 2 PP for Dynamic).
- **Device Discounts**: Removable (-1 PP per 5 PP total) and Easily Removable (-2 PP per 5 PP total).

### 6. User Accessibility & Display Controls
- **Font Size Selector**: Instant toggle between **Small (S)**, **Medium (M)**, **Large (L)**, and **Extra Large (XL)**, scaling the entire UI smoothly via CSS custom properties.
- **1080px Minimum Width Layout**: Grid structure optimized for widescreen displays with persistent live sidebar log.
- **Instant Persistence**: Automatically saves edits to `localStorage` as soon as they are made.

---

## 🚀 How to Run

### Method 1: Local Node.js Server (Recommended)
Open a terminal in this directory and run:
```bash
node server.js
```
Then open your browser to:
```
http://localhost:3000
```

### Method 2: Direct Browser Launch
Simply double-click `index.html` or open it with any modern web browser (Edge, Chrome, Firefox).

---

## 🤖 Configuring Discord Webhooks

1. In your Discord server, right-click the channel where you want rolls to appear.
2. Select **Edit Channel** ➜ **Integrations** ➜ **Webhooks** ➜ **New Webhook**.
3. Copy the **Webhook URL**.
4. In the app, navigate to the **⚙️ Settings & Discord** tab.
5. Paste the URL into the **Discord Webhook URL** field and check **"Enable automatic Discord roll echoing"**.
6. Click **"Save Discord Settings"**, then click **"🔔 Send Test Roll"** to verify!
