/**
 * Mutants & Masterminds 3E Character Architect
 * Comprehensive, Searchable User Manual & Rules Reference
 * Sorted by UI Area: Top Row, Persistent Tabs, Virtual Tabletop, Catalogs, Discord Setup, etc.
 */

export const HELP_SECTIONS = [
  {
    id: 'help-overview',
    category: 'Getting Started',
    title: 'Overview & Application Basics',
    icon: '🚀',
    keywords: ['start', 'intro', 'basics', '1080px', 'screen', 'resolution', 'touch', 'stepper'],
    summary: 'Core layout principles, 1080px display optimization, and touchscreen stepper controls.',
    contentHtml: `
      <p>Welcome to the <strong>Mutants & Masterminds 3rd Edition (M&M 3E) Character Architect & Interactive Virtual Record</strong>. This web application provides complete character creation, rules auditing, and interactive tabletop play tools compliant with the official 3E rules by Green Ronin Publishing.</p>
      
      <h4>🖥️ 1080px Display Architecture</h4>
      <ul>
        <li><strong>Zero Horizontal Scrolling:</strong> The interface is strictly architected for a standard 1080px display width (or higher). All tables, catalogs, action centers, and headers fit within 1080px with no horizontal scrollbars.</li>
        <li><strong>Low-Width Alert:</strong> If the viewport width falls below 1080px, a dismissible warning banner appears advising you to maximize or resize your window for optimal layout.</li>
      </ul>

      <h4>👆 Touchscreen & Stepper Controls</h4>
      <ul>
        <li>Small browser number spinner arrows have been completely replaced with large, tactile touch steppers: <code>[-] [Value] [+]</code>.</li>
        <li>Every stepper button has a minimum 38–44px touch target, designed for tablets, touchscreen laptops, and mouse users alike.</li>
        <li>Clicking or tapping <strong>[-]</strong> decreases rank, while <strong>[+]</strong> increases rank. Values automatically recalculate Power Point costs in real time.</li>
      </ul>

      <h4>📖 Official 3E Rules Integrity</h4>
      <p>All descriptions for Abilities, Defenses, 16 Skills, 70+ Advantages, and Power Effects are taken verbatim from the official M&M 3E Deluxe Hero's Handbook rules. No fabricated or abbreviated text is used.</p>
    `
  },
  {
    id: 'help-top-row',
    category: 'Top Header',
    title: 'Header Row 1: Menu & Identity',
    icon: '☰',
    keywords: ['menu', 'dropdown', 'save', 'save as', 'load', 'export', 'import', 'json', 'player', 'hero', 'campaign', 'version'],
    summary: 'The top menu drop-down, character identity fields, campaign tracking, and file I/O.',
    contentHtml: `
      <h4>☰ Menu Drop-Down</h4>
      <p>The <strong>☰ Menu</strong> button on the left of Row 1 opens an instantaneous drop-down menu containing all primary character and application functions:</p>
      <ul>
        <li><strong>➕ New Freeform Hero:</strong> Creates a blank slate PL 10 hero with 150 Power Points, resetting all fields.</li>
        <li><strong>💾 Quick Save:</strong> Saves the active hero's full state directly into your browser's persistent storage.</li>
        <li><strong>📑 Save As (Clone)...:</strong> Clones the current hero under a new name, allowing you to branch out alternate versions or build team members without losing the original.</li>
        <li><strong>📂 Load Character...:</strong> Opens the character switcher dialog to choose between any previously saved heroes or delete old records.</li>
        <li><strong>📤 Export Character (JSON):</strong> Downloads your complete character as a portable <code>.json</code> file for safe offline backups or sharing with your Game Master and fellow players.</li>
        <li><strong>📥 Import Character (JSON):</strong> Uploads any previously exported character JSON file and restores it into your roster.</li>
        <li><strong>⚙️ Settings:</strong> Opens the fly-out settings dialog to configure Discord channels (webhooks & bot tokens), font sizes, and campaign defaults.</li>
        <li><strong>❓ Help & Documentation:</strong> Opens this comprehensive, searchable user manual.</li>
      </ul>

      <h4>Hero Identity Inputs</h4>
      <ul>
        <li><strong>Player:</strong> The name of the player running the character.</li>
        <li><strong>Hero:</strong> The superhero codename or secret identity of the character.</li>
        <li><strong>Campaign:</strong> The campaign or setting name (e.g. <em>Freedom City, Emerald City, Iron Age Avengers</em>).</li>
        <li><strong>Version Badge:</strong> Displays the current software release (v2.3) with anti-caching verification.</li>
      </ul>
    `
  },
  {
    id: 'help-second-row',
    category: 'Top Header',
    title: 'Header Row 2: Power Points, Hero Points & Launchers',
    icon: '⚡',
    keywords: ['power points', 'pp', 'hero points', 'hp', 'spend', 'archetypes', 'wizard', 'tables', 'popout', 'budget'],
    summary: 'PP tracker, touch-friendly Hero Point management, Guided Archetypes wizard, and Reference Tables pop-out.',
    contentHtml: `
      <h4>Power Points (PP) Budget Tracker</h4>
      <ul>
        <li>Displays current point expenditure in the format: <code># / # used</code> (e.g. <code>150 / 150 used</code>).</li>
        <li><strong>Automatic Color Status:</strong> Appears gold when exactly at budget, green when under budget, and red if the character exceeds their allotted campaign budget.</li>
        <li><strong>Live Breakdown:</strong> Automatically aggregates point costs across all 5 areas: Abilities (2 PP/rank), Defenses (1 PP/rank), Skills (0.5 PP/rank), Advantages (1 PP/rank), and Powers (Hero Lab arithmetic).</li>
      </ul>

      <h4>Hero Points (HP) & Spending</h4>
      <ul>
        <li><strong>Touch Stepper:</strong> Track your current Hero Points in real-time. Standard PL 10 heroes start each session with 1 Hero Point (or more if they possess the <em>Luck</em> advantage).</li>
        <li><strong>⚡ Spend HP Button:</strong> Opens the interactive Hero Point Spending modal offering official 3E actions:
          <ul>
            <li><strong>Reroll:</strong> Roll a d20 with the official M&M 3E Hero Point rule: if the die rolls 1–10, add +10 (yielding 11–20). Automatically rolls and notifies Discord!</li>
            <li><strong>Avoid Death:</strong> Instantly stabilize a dying hero to incapacitated.</li>
            <li><strong>Edit Scene:</strong> Propose a minor narrative advantage or convenient gadget (subject to GM approval).</li>
            <li><strong>Counter Attack:</strong> Counter an incoming attack with a readied check or power.</li>
            <li><strong>Inspire:</strong> Grant all allies +1 bonus to their checks for one round.</li>
            <li><strong>Instant Stand:</strong> Stand up from prone as a free action without spending movement.</li>
          </ul>
        </li>
      </ul>

      <h4>✨ Guided Archetypes Wizard</h4>
      <ul>
        <li>Located conveniently on the right of Row 2.</li>
        <li>Launches a step-by-step interactive wizard walking you through official Deluxe Hero's Handbook archetypes (Battlesuit, Martial Artist, Mystic, Paragon, Speedster, Crime Fighter, Energy Controller, Powerhouse, Psychic, Shapeshifter).</li>
        <li>Lets you choose loadout specializations and complications, generating a 100% rules-legal PL 10 hero (150/150 PP with 0 cap violations).</li>
      </ul>

      <h4>📜 Reference Tables Pop-Up & Pop-Out</h4>
      <ul>
        <li>Opens a pop-up containing all official M&M 3E tables: Measurements (-5 to 20 ranks), Power Level Characteristics, Damage Conditions, Combat Maneuvers, Material Toughness, and HQ Specifications.</li>
        <li><strong>Pop-Out Window:</strong> Clicking <strong>Pop-Out</strong> detaches the tables into an independent floating browser window. Its position, coordinates, and dimensions on your screen are remembered across browser sessions!</li>
      </ul>
    `
  },
  {
    id: 'help-persistent-tab-row',
    category: 'Persistent Tabs',
    title: 'Persistent Navigation & Tab Switcher',
    icon: '📌',
    keywords: ['tabs', 'sticky', 'persistent', 'pin', 'navigation', 'action center', 'abilities', 'skills', 'advantages', 'powers', 'gear', 'history'],
    summary: 'Sticky pinned navigation row keeping your sheet headers and tabs accessible during scrolling.',
    contentHtml: `
      <p>Both Header Row 1, Header Row 2, and the Navigation Tab Row are encapsulated in a <strong>persistent sticky container</strong>. When you scroll through deep skill catalogs or long power arrays, the header remains pinned at the very top of your screen, ensuring:</p>
      <ul>
        <li>You can always see your Power Points budget and remaining pool.</li>
        <li>You can tap Hero Point steppers or spend HP at any instant during combat.</li>
        <li>You can access the Menu, Tables, or switch tabs with a single click without having to scroll back to the top of the page.</li>
      </ul>
      <p>The tab bar contains 7 core sections: <strong>Action Center</strong>, <strong>Abilities & Defenses</strong>, <strong>Skills</strong>, <strong>Advantages</strong>, <strong>Powers & Profiles</strong>, <strong>Gear & HQ</strong>, and <strong>History & Lore</strong>.</p>
    `
  },
  {
    id: 'help-action-center',
    category: 'Action Center',
    title: 'Action Center & Virtual Tabletop',
    icon: '🎯',
    keywords: ['dice', 'roller', 'notation', 'd20', 'attacks', 'defenses', 'saving throw', 'damage dc', 'critical hit', 'bruises', 'conditions', 'staggered', 'dazed'],
    summary: 'Dice roller supporting standard dice notation, quick saving throws, attack DC calculations, and bruise tracking.',
    contentHtml: `
      <h4>🎲 Dice Roller Bar (Dice Notation Support)</h4>
      <ul>
        <li>At the top of the Action Center is a dedicated dice roller input supporting standard dice notation (e.g. <code>d20+8</code>, <code>1d20+12</code>, <code>3d6+4</code>, <code>2d10-1</code>).</li>
        <li><strong>Quick Roll d20:</strong> Rolls a single d20 with your custom modifier.</li>
        <li><strong>Hero Point Reroll:</strong> Automatically applies the 3E rule (rolls 1–10 receive +10, ensuring an 11–20 result).</li>
        <li>Rolls display raw die values, modifiers, totals, success degrees, and echo color-coded cards to Discord.</li>
      </ul>

      <h4>Initiative & Core Defenses Quick-Roll</h4>
      <ul>
        <li>One-click roll buttons for <strong>Initiative</strong>, <strong>Dodge</strong>, <strong>Parry</strong>, <strong>Fortitude</strong>, <strong>Toughness</strong>, and <strong>Will</strong>.</li>
        <li>Calculates exact modifiers including ability scores, defense ranks, advantages (e.g. <em>Improved Initiative</em>), and bruise penalties.</li>
      </ul>

      <h4>Attacks Roster & Damage DCs</h4>
      <ul>
        <li>Displays attack bonus, target Defense DC (10 + Attack Bonus), effect rank, and Damage DC (15 + Damage Rank).</li>
        <li><strong>Critical Hits:</strong> Rolling a natural 20 automatically flags a Critical Hit (+5 to effect rank or alternate effect).</li>
      </ul>

      <h4>Conditions & Bruise Tracker</h4>
      <ul>
        <li><strong>Bruises Stepper:</strong> Track cumulative damage hits. Each bruise applies a -1 penalty to subsequent Toughness resistance checks.</li>
        <li><strong>Status Conditions:</strong> One-touch toggles for <strong>Dazed</strong>, <strong>Staggered</strong>, <strong>Vulnerable</strong>, <strong>Defenseless</strong>, and <strong>Incapacitated</strong>. Active conditions visually alert you to impaired combat states.</li>
      </ul>
    `
  },
  {
    id: 'help-abilities-defenses',
    category: 'Abilities & Defenses',
    title: 'Abilities, Defenses & PL Cap Auditor',
    icon: '📊',
    keywords: ['abilities', 'str', 'sta', 'agl', 'dex', 'fgt', 'int', 'awe', 'pre', 'defenses', 'dodge', 'parry', 'fortitude', 'toughness', 'will', 'caps', 'pl caps'],
    summary: '8 core abilities, 5 defenses, lifting capacity calculations, and real-time Power Level cap auditing.',
    contentHtml: `
      <h4>8 Core Abilities (2 PP per Rank)</h4>
      <p>Strength (STR), Stamina (STA), Agility (AGL), Dexterity (DEX), Fighting (FGT), Intellect (INT), Awareness (AWE), Presence (PRE).</p>
      <ul>
        <li>Each rank costs 2 Power Points. Negative ranks refund 2 PP per rank below 0.</li>
        <li><strong>Lifting Capacity:</strong> Shows your character's real-time lifting weight in lbs or tons based on official M&M 3E Measurements Table benchmarks.</li>
      </ul>

      <h4>5 Defenses (1 PP per Rank)</h4>
      <ul>
        <li><strong>Dodge:</strong> Ranged attack defense (based on Agility).</li>
        <li><strong>Parry:</strong> Close combat defense (based on Fighting).</li>
        <li><strong>Fortitude:</strong> Resistance against poisons, fatigue, and bodily hazards (based on Stamina).</li>
        <li><strong>Toughness:</strong> Resistance against physical damage and injury (based on Stamina + Protection).</li>
        <li><strong>Will:</strong> Resistance against mental effects, fear, and illusions (based on Awareness).</li>
      </ul>

      <h4>⚖️ Power Level Cap Auditor</h4>
      <p>The auditor verifies the core balance constraints of M&M 3E in real time:</p>
      <ul>
        <li><code>Dodge + Toughness <= 2 × PL</code> (e.g. at PL 10, sum cannot exceed 20).</li>
        <li><code>Parry + Toughness <= 2 × PL</code> (e.g. at PL 10, sum cannot exceed 20).</li>
        <li><code>Fortitude + Will <= 2 × PL</code> (e.g. at PL 10, sum cannot exceed 20).</li>
        <li><code>Skill Bonus <= PL + 10</code> (e.g. at PL 10, skill total cannot exceed +20).</li>
      </ul>
      <p>If any stat combination exceeds the legal ceiling, a visible warning appears showing the exact overage.</p>
    `
  },
  {
    id: 'help-skills-catalog',
    category: 'Skills',
    title: 'Skills & Prebuilt Specialties',
    icon: '🥋',
    keywords: ['skills', 'ranks', 'catalog', 'prebuilts', 'expertise', 'specialties', 'acrobatics', 'athletics', 'stealth', 'technology'],
    summary: 'All 16 official skills, touch steppers, pointer-anchored rules tooltips, and prebuilt specialty options.',
    contentHtml: `
      <h4>Official 16 Skills (1 PP per 2 Ranks)</h4>
      <p>Skills cost 0.5 PP per rank. Ranks are adjusted with tactile touch steppers.</p>
      <ul>
        <li><strong>Active Rules Links:</strong> Clicking or hovering over any skill name displays the official, verbatim 3E rules text in a floating tooltip anchored directly to your pointer.</li>
        <li><strong>Total Modifier Calculation:</strong> <code>Total = Ability Mod + Skill Ranks + Advantage Bonuses</code>.</li>
      </ul>

      <h4>Prebuilt Specialty Options</h4>
      <ul>
        <li>For skills that require sub-specialties (e.g. <em>Expertise: Science, Expertise: Law, Close Combat: Swords, Ranged Combat: Guns</em>), clicking <strong>+ Specialty</strong> opens a prebuilt modal.</li>
        <li>The system checks for exclusive or illegal selections, ensuring clear organization on your character sheet.</li>
      </ul>
    `
  },
  {
    id: 'help-advantages-catalog',
    category: 'Advantages',
    title: 'Advantages & Rules Integration',
    icon: '🌟',
    keywords: ['advantages', 'ranks', 'catalog', 'prebuilts', 'equipment', 'luck', 'improved initiative', 'favored foe'],
    summary: 'Complete library of 70+ official advantages, multi-rank tracking, and rules descriptions.',
    contentHtml: `
      <h4>70+ Official Advantages (1 PP per Rank)</h4>
      <ul>
        <li>Includes all official advantages categorized into Combat, Fortune, General, and Skill advantages.</li>
        <li><strong>Multi-Rank Advantages:</strong> Advantages that can be taken multiple times (e.g. <em>Defensive Roll, Equipment, Improved Initiative, Luck</em>) feature touch steppers to adjust ranks smoothly.</li>
        <li><strong>Rules Hover & Click:</strong> Every advantage is an active link that pops up the official rules text anchored to your pointer.</li>
        <li><strong>Prebuilt Advantage Pickers:</strong> Advantages requiring specific options (such as <em>Favored Foe</em> or <em>Favored Environment</em>) open a picker modal to record the exact descriptor.</li>
      </ul>
    `
  },
  {
    id: 'help-powers-profiles',
    category: 'Powers & Profiles',
    title: 'Powers Builder & Power Profiles Library',
    icon: '⚡',
    keywords: ['powers', 'builder', 'effects', 'modifiers', 'extras', 'flaws', 'alternate effect', 'array', 'hero lab', 'profiles', 'power profiles'],
    summary: 'Hero Lab arithmetic power builder, Extras, Flaws, Alternate Effect Arrays, and 1-click Power Profiles.',
    contentHtml: `
      <h4>Hero Lab Power Arithmetic Model</h4>
      <p>Power costs are calculated following the exact official Green Ronin / Hero Lab formula:</p>
      <ul>
        <li><code>Base Cost per Rank + Sum of Extras per Rank - Sum of Flaws per Rank = Net Cost per Rank</code>.</li>
        <li>If Net Cost per Rank is 0 or negative, it uses the fractional rate: <code>1 PP per (2 - Net Cost) Ranks</code> (e.g., net -1 costs 1 PP per 2 ranks).</li>
        <li><code>Total Cost = (Net Cost × Rank) + Flat Modifiers</code>.</li>
      </ul>

      <h4>Alternate Effect Arrays (1 PP Flat Each)</h4>
      <ul>
        <li>Create dynamic power arrays where secondary alternate powers cost only 1 PP flat, provided their individual cost does not exceed the primary power's cost.</li>
      </ul>

      <h4>Official Power Profiles 1-Click Library</h4>
      <ul>
        <li>Browse and import official Green Ronin Power Profiles across 7 categories: <em>Armor, Fire, Kinetic, Mental, Speed, Weather,</em> and <em>Morphic</em> powers.</li>
        <li>Clicking <strong>Add Power</strong> instantiates the complete power suite with pre-configured ranks, extras, flaws, and descriptors.</li>
      </ul>
    `
  },
  {
    id: 'help-gear-hq',
    category: 'Gear & HQ',
    title: 'Equipment, Vehicles & Headquarters Builder',
    icon: '🛡️',
    keywords: ['gear', 'equipment', 'ep', 'headquarters', 'hq', 'vehicles', 'weapons', 'features', 'toughness'],
    summary: 'Equipment Point (EP) budget tracking, weapons & gear inventory, and headquarters customization.',
    contentHtml: `
      <h4>Equipment Points (EP) Budget</h4>
      <ul>
        <li>Each rank of the <strong>Equipment</strong> advantage awards <strong>5 Equipment Points (EP)</strong>.</li>
        <li>The EP badge tracks total spent points across both personal gear and your superhero headquarters: <code># / # EP Used</code>.</li>
      </ul>

      <h4>Headquarters Customizer</h4>
      <ul>
        <li><strong>HQ Name & Size:</strong> Choose from Small (1 EP) up to Awesome (6 EP).</li>
        <li><strong>Toughness Stepper:</strong> Base Toughness is 8. Increase toughness with touch steppers at 1 EP per +1 Toughness.</li>
        <li><strong>Official Features Checklist:</strong> Equip your lair with Communications, Computer, Defense System, Gym, Holding Cells, Infirmary, Laboratory, Living Quarters, Power System, Security System, Workshop, and more.</li>
      </ul>
    `
  },
  {
    id: 'help-history-lore',
    category: 'History & Lore',
    title: 'Session Journal, Background & Contacts',
    icon: '📜',
    keywords: ['history', 'journal', 'log', 'sessions', 'lore', 'origin', 'contacts', 'allies', 'notes'],
    summary: 'Session date/time logger, hero origin story, motivations, and contact records.',
    contentHtml: `
      <h4>Session Journal & Campaign Log</h4>
      <ul>
        <li>Record each game session with date, timestamp, narrative notes, and Power Point / Hero Point awards.</li>
        <li>Session logs are stored directly inside your character file and persist across exports and loads.</li>
      </ul>

      <h4>Hero Lore & Contacts</h4>
      <ul>
        <li><strong>Origin & Background:</strong> Document your hero's public and secret history, origin accident or training, and personality.</li>
        <li><strong>Contacts & Patrons:</strong> Maintain records of your superhero team, police contacts, informants, and mentors.</li>
      </ul>
    `
  },
  {
    id: 'help-discord',
    category: 'Discord Setup',
    title: 'Discord Integration & Multi-Config Setup Guide',
    icon: '💬',
    keywords: ['discord', 'webhook', 'bot', 'token', 'channel id', 'setup', 'url', 'multi-config', 'echo', 'embeds'],
    summary: 'Simplified step-by-step setup for Discord Webhooks and Bot API modes with automatic channel naming.',
    contentHtml: `
      <div style="background-color: rgba(88, 101, 242, 0.12); border-left: 4px solid #5865f2; padding: 0.75rem; border-radius: var(--radius-sm); margin-bottom: 0.85rem;">
        <strong>💬 Discord Multi-Configuration Support:</strong> Connect your character sheet to one or more Discord channels simultaneously. Supports both zero-setup <strong>Discord Webhooks</strong> and advanced <strong>Discord Bot API</strong> tokens!
      </div>

      <h4>Method 1: Discord Webhooks (Recommended — Easiest, 1-Minute Setup)</h4>
      <p>Webhooks require no bot hosting or developer credentials. They allow your character sheet to post rich, color-coded dice roll cards and Hero Point spends directly into your Discord channel.</p>
      <ol style="padding-left: 1.25rem; line-height: 1.6;">
        <li>Open Discord on your desktop or browser and go to your server.</li>
        <li>Right-click the channel where you want rolls to appear (e.g. <code>#dice-rolls</code> or <code>#tabletop</code>) and select <strong>Edit Channel</strong>.</li>
        <li>Click <strong>Integrations</strong> in the left sidebar, then click <strong>Webhooks</strong>.</li>
        <li>Click <strong>New Webhook</strong> (or <strong>Create Webhook</strong>).</li>
        <li>Give it a name like <em>M&M 3E Hero Roller</em>, then click <strong>Copy Webhook URL</strong>.</li>
        <li>In this application, click <strong>☰ Menu</strong> ➜ <strong>⚙️ Settings</strong>.</li>
        <li>Under <strong>Discord Roll Echo</strong>, click <strong>+ Add Discord Destination</strong> (or edit an existing one).</li>
        <li>Paste your copied URL into <strong>Webhook URL</strong>.</li>
        <li>Fill in <strong>Server Name</strong> (e.g. <em>Justice League</em>) and <strong>Channel Name</strong> (e.g. <em>dice-rolls</em>). If you leave Configuration Name blank, it will automatically name itself <code>Justice League #dice-rolls</code>!</li>
        <li>Click <strong>Test Connection</strong> to verify your embed card in Discord, then click <strong>Save Destination</strong>!</li>
      </ol>

      <h4>Method 2: Discord Bot API (For Bot Token Users)</h4>
      <p>If your campaign operates via a dedicated Discord Bot application:</p>
      <ol style="padding-left: 1.25rem; line-height: 1.6;">
        <li>Navigate to the <a href="https://discord.com/developers/applications" target="_blank" style="color: var(--hero-cyan);">Discord Developer Portal</a>.</li>
        <li>Select your Application, go to the <strong>Bot</strong> tab, and copy your <strong>Bot Token</strong>.</li>
        <li>Ensure your bot has been invited to your server with the <strong>Send Messages</strong> permission.</li>
        <li>In Discord, enable <strong>Developer Mode</strong> (User Settings ➜ Advanced ➜ Developer Mode).</li>
        <li>Right-click your dice rolls channel and click <strong>Copy Channel ID</strong>.</li>
        <li>In this application's Settings flyout, select <strong>🤖 Bot API</strong> as the Integration Type.</li>
        <li>Paste your <strong>Bot Token</strong> and <strong>Channel ID</strong> into their respective fields.</li>
        <li>Click <strong>Test Connection</strong> and save!</li>
      </ol>

      <h4>Multiple Destinations & Echoing</h4>
      <ul>
        <li>You can create separate destinations for different campaigns (e.g. <em>Emerald City Solo</em>, <em>Friday Night Freedom League</em>, <em>GM Private Log</em>).</li>
        <li>Each destination has an independent <strong>Enable Echo</strong> toggle. If multiple destinations are enabled, rolls echo to all of them at once!</li>
        <li>Roll cards sent to Discord include: Hero Name, Attack/Defense/Skill title, raw d20 result, modifier math, total, target DC, degree of success/failure, damage rank with Toughness DC, and critical hit alerts.</li>
      </ul>
    `
  },
  {
    id: 'help-settings-dialog',
    category: 'Settings & UI',
    title: 'Settings Fly-Out Dialog & Font Sizing',
    icon: '⚙️',
    keywords: ['settings', 'flyout', 'drawer', 'font size', 'fonts', 'text size', 'pl default', 'campaign budget'],
    summary: 'Customizing font sizes, default campaign power levels, and UI preferences via the fly-out panel.',
    contentHtml: `
      <h4>⚙️ Settings Fly-Out Drawer</h4>
      <p>Clicking <strong>⚙️ Settings</strong> in the Menu dropdown smoothly slides open the Settings panel from the right edge of the screen without obscuring your character sheet view.</p>
      <ul>
        <li><strong>Font Size Adjuster:</strong> Choose between <strong>Normal</strong> (default), <strong>Large</strong>, and <strong>Extra Large</strong>. The entire interface scales proportionally while maintaining 1080px layout constraints.</li>
        <li><strong>Campaign Defaults:</strong> Set your default Power Level (default PL 10) and default starting Power Points budget (default 150 PP) for new heroes.</li>
        <li><strong>Discord Configurations:</strong> Manage, edit, test, and toggle all your Discord webhooks and bot destinations.</li>
        <li><strong>Display Width Warning:</strong> Enable or disable the low-width viewport alert.</li>
      </ul>
    `
  }
];

export class HelpManager {
  constructor() {
    this.searchQuery = '';
  }

  init() {
    const searchInput = document.getElementById('help-search-input');
    const clearBtn = document.getElementById('btn-help-clear-search');
    const dropdown = document.getElementById('help-section-dropdown');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          this.searchQuery = '';
          this.render();
          searchInput.focus();
        }
      });
    }

    if (dropdown) {
      dropdown.innerHTML = '<option value="">-- Table of Contents (Continuous Document) --</option>' +
        HELP_SECTIONS.map((sec, idx) => `
          <option value="${sec.id}">${idx + 1}. [${sec.category}] ${sec.title}</option>
        `).join('');

      dropdown.addEventListener('change', (e) => {
        const secId = e.target.value;
        if (secId) {
          this.scrollToSection(secId);
        }
      });
    }
  }

  scrollToSection(sectionId) {
    // If a search query is filtering out the section, reset search to show the full document
    if (this.searchQuery) {
      const searchInput = document.getElementById('help-search-input');
      if (searchInput) searchInput.value = '';
      this.searchQuery = '';
      this.render();
    }

    const dropdown = document.getElementById('help-section-dropdown');
    if (dropdown) dropdown.value = sectionId;

    setTimeout(() => {
      const targetEl = document.getElementById(sectionId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetEl.classList.add('help-target-highlight');
        setTimeout(() => targetEl.classList.remove('help-target-highlight'), 2200);
      }
    }, 100);
  }

  openToSection(sectionId) {
    const modal = document.getElementById('modal-help');
    if (!modal) return;
    modal.classList.add('active');

    // Reset search so full continuous document is loaded
    this.searchQuery = '';
    const searchInput = document.getElementById('help-search-input');
    if (searchInput) searchInput.value = '';

    this.render();

    if (sectionId) {
      this.scrollToSection(sectionId);
    }
  }

  render() {
    const container = document.getElementById('help-content-container');
    if (!container) return;

    const filtered = HELP_SECTIONS.filter(sec => {
      if (this.searchQuery) {
        const text = `${sec.title} ${sec.category} ${sec.summary} ${(sec.keywords || []).join(' ')} ${sec.contentHtml}`.toLowerCase();
        return text.includes(this.searchQuery);
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
          <div style="font-size: var(--font-size-md); font-weight: 800; color: #fff;">No help topics found</div>
          <div style="font-size: var(--font-size-sm); margin-top: 0.25rem;">Try different keywords or clear the search to view the full document.</div>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map((sec, idx) => `
      <article class="help-article-card" id="${sec.id}">
        <div class="help-article-header">
          <div class="help-article-icon">${sec.icon}</div>
          <div style="flex: 1;">
            <div class="help-article-category">Section ${idx + 1} • ${sec.category}</div>
            <h3 class="help-article-title">${sec.title}</h3>
          </div>
        </div>
        <div class="help-article-summary">${sec.summary}</div>
        <div class="help-article-body">
          ${sec.contentHtml}
        </div>
      </article>
    `).join('');
  }
}

export const helpManager = new HelpManager();
