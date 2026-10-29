/**
 * Official Mutants & Masterminds 3rd Edition Reference Tables
 * Deluxe Hero's Handbook rules data.
 */

export const MEASUREMENTS_TABLE = [
  { rank: -5, mass: '1.5 lbs.', distance: '6 inches', time: '1/30 second', volume: '1/16 c.f.' },
  { rank: -4, mass: '3 lbs.', distance: '1 foot', time: '1/15 second', volume: '1/8 c.f.' },
  { rank: -3, mass: '6 lbs.', distance: '3 feet', time: '1/8 second', volume: '1/4 c.f.' },
  { rank: -2, mass: '12 lbs.', distance: '6 feet', time: '1/4 second', volume: '1/2 c.f.' },
  { rank: -1, mass: '25 lbs.', distance: '15 feet', time: '1/2 second', volume: '1 c.f.' },
  { rank: 0, mass: '50 lbs.', distance: '30 feet', time: '1 second', volume: '2 c.f.' },
  { rank: 1, mass: '100 lbs.', distance: '60 feet', time: '2 seconds', volume: '4 c.f.' },
  { rank: 2, mass: '200 lbs.', distance: '120 feet', time: '4 seconds', volume: '8 c.f.' },
  { rank: 3, mass: '400 lbs.', distance: '250 feet', time: '8 seconds', volume: '15 c.f.' },
  { rank: 4, mass: '800 lbs.', distance: '500 feet', time: '15 seconds', volume: '30 c.f.' },
  { rank: 5, mass: '1,600 lbs.', distance: '900 feet', time: '30 seconds', volume: '60 c.f.' },
  { rank: 6, mass: '3,200 lbs.', distance: '1,800 feet', time: '1 minute', volume: '120 c.f.' },
  { rank: 7, mass: '3 tons', distance: '1/2 mile', time: '2 minutes', volume: '250 c.f.' },
  { rank: 8, mass: '6 tons', distance: '1 mile', time: '4 minutes', volume: '500 c.f.' },
  { rank: 9, mass: '12 tons', distance: '2 miles', time: '8 minutes', volume: '1,000 c.f.' },
  { rank: 10, mass: '25 tons', distance: '4 miles', time: '16 minutes', volume: '2,000 c.f.' },
  { rank: 11, mass: '50 tons', distance: '8 miles', time: '30 minutes', volume: '4,000 c.f.' },
  { rank: 12, mass: '100 tons', distance: '16 miles', time: '1 hour', volume: '8,000 c.f.' },
  { rank: 13, mass: '200 tons', distance: '30 miles', time: '2 hours', volume: '16,000 c.f.' },
  { rank: 14, mass: '400 tons', distance: '60 miles', time: '4 hours', volume: '32,000 c.f.' },
  { rank: 15, mass: '800 tons', distance: '120 miles', time: '8 hours', volume: '65,000 c.f.' },
  { rank: 16, mass: '1,600 tons', distance: '250 miles', time: '16 hours', volume: '125,000 c.f.' },
  { rank: 17, mass: '3,200 tons', distance: '500 miles', time: '1 day', volume: '250,000 c.f.' },
  { rank: 18, mass: '6,000 tons', distance: '1,000 miles', time: '2 days', volume: '500,000 c.f.' },
  { rank: 19, mass: '12,000 tons', distance: '2,000 miles', time: '4 days', volume: '1 million c.f.' },
  { rank: 20, mass: '25,000 tons', distance: '4,000 miles', time: '1 week', volume: '2 million c.f.' }
];

export const POWER_LEVEL_GUIDELINES = [
  { pl: 6, pp: 90, maxAttackEffect: 12, maxDefTough: 12, maxFortWill: 12, maxSkill: 16, description: 'Masked Adventurers, Mystery Men, Pulp Heroes' },
  { pl: 8, pp: 120, maxAttackEffect: 16, maxDefTough: 16, maxFortWill: 16, maxSkill: 18, description: 'Teen Heroes, Costumed Vigilantes, Martial Artists' },
  { pl: 10, pp: 150, maxAttackEffect: 20, maxDefTough: 20, maxFortWill: 20, maxSkill: 20, description: 'Standard Superheroes (Deluxe Hero\'s Handbook baseline)' },
  { pl: 12, pp: 180, maxAttackEffect: 24, maxDefTough: 24, maxFortWill: 24, maxSkill: 22, description: 'World Protectors, Earth\'s Mightiest Champions' },
  { pl: 14, pp: 210, maxAttackEffect: 28, maxDefTough: 28, maxFortWill: 28, maxSkill: 24, description: 'Cosmic Defenders, Demigods, Planetary Guardians' },
  { pl: 16, pp: 240, maxAttackEffect: 32, maxDefTough: 32, maxFortWill: 32, maxSkill: 26, description: 'Galactic Champions, Reality Shapers' }
];

export const DAMAGE_CONDITIONS_TABLE = [
  { degree: 'Success (Check >= DC)', result: 'No Effect', description: 'The target suffers no harm from the attack.' },
  { degree: 'Failure (1 Degree: < DC by 1-4)', result: 'Bruised (-1 penalty)', description: 'The target incurs a -1 circumstance penalty to future Toughness checks against damage.' },
  { degree: 'Failure (2 Degrees: < DC by 5-9)', result: 'Dazed + Bruised', description: 'The target is Dazed until the end of their next turn and incurs a -1 penalty to future Toughness checks.' },
  { degree: 'Failure (3 Degrees: < DC by 10-14)', result: 'Staggered + Bruised', description: 'The target is Staggered (limited to free + standard or move) and incurs a -1 penalty. If already Staggered, becomes Incapacitated.' },
  { degree: 'Failure (4 Degrees: < DC by 15+)', result: 'Incapacitated', description: 'The target is knocked unconscious, paralyzed, or rendered unable to act.' }
];

export const COMBAT_MANEUVERS_TABLE = [
  { maneuver: 'Accurate Attack', tradeOff: '-1 to -5 effect rank for +1 to +5 attack bonus', requirement: 'Accurate Attack advantage or routine combat maneuver' },
  { maneuver: 'All-Out Attack', tradeOff: '-1 to -5 active defenses (Dodge & Parry) for +1 to +5 attack bonus', requirement: 'All-Out Attack advantage' },
  { maneuver: 'Defensive Attack', tradeOff: '-1 to -5 attack bonus for +1 to +5 active defenses', requirement: 'Defensive Attack advantage' },
  { maneuver: 'Power Attack', tradeOff: '-1 to -5 attack bonus for +1 to +5 effect rank', requirement: 'Power Attack advantage' },
  { maneuver: 'Slam Attack', tradeOff: 'Move at least 30 ft; damage equals movement speed rank or Str (whichever is higher)', requirement: 'Take standard action to charge' },
  { maneuver: 'Surprise Attack', tradeOff: 'Target is vulnerable (-5 active defense or halved); cannot use reaction defense', requirement: 'Attacking an unaware opponent' },
  { maneuver: 'Team Attack', tradeOff: 'Multiple attackers coordinate against same target with attack checks vs DC 10', requirement: '+2 to primary attacker damage (+5 if 3+ degrees)' }
];

export const MATERIAL_TOUGHNESS_TABLE = [
  { material: 'Paper, cardboard, cloth', toughness: 0 },
  { material: 'Glass, crystal, ice', toughness: 1 },
  { material: 'Wood, dry wall, plastic', toughness: 3 },
  { material: 'Stone, brick, rock', toughness: 5 },
  { material: 'Iron, standard aluminum', toughness: 7 },
  { material: 'Reinforced concrete', toughness: 8 },
  { material: 'Structural steel', toughness: 9 },
  { material: 'Hardened steel, bulletproof glass', toughness: 10 },
  { material: 'Titanium, advanced composites', toughness: 12 },
  { material: 'Super-alloys (Adamantium/Vibranium)', toughness: 16 }
];

export const HQ_SIZES_TABLE = [
  { name: 'Diminutive', ep: -2, desc: 'Briefcase, small console' },
  { name: 'Tiny', ep: -1, desc: 'Desk, cabinet, server rack' },
  { name: 'Small', ep: 0, desc: 'Single room, studio apartment' },
  { name: 'Medium', ep: 1, desc: 'House, warehouse, lab floor' },
  { name: 'Large', ep: 2, desc: 'Mansion, skyscraper floor, subway station' },
  { name: 'Huge', ep: 3, desc: 'Castle, skyscraper, isolated compound' },
  { name: 'Gargantuan', ep: 4, desc: 'Sprawling subterranean complex, island base' },
  { name: 'Colossal', ep: 5, desc: 'Submerged city, orbital station, small moon' }
];

export const HQ_FEATURES_LIST = [
  { id: 'combat_simulator', name: 'Combat Simulator', ep: 1, desc: 'Danger room with holographic or robotic training hazards.' },
  { id: 'communications', name: 'Communications', ep: 1, desc: 'State-of-the-art encrypted global satellite link.' },
  { id: 'computer', name: 'Computer Network', ep: 1, desc: 'Mainframe with vast storage and automated surveillance.' },
  { id: 'concealed', name: 'Concealed', ep: 1, desc: 'Hidden entrance (+10 DC to notice or locate base).' },
  { id: 'defense_system', name: 'Defense System', ep: 1, desc: 'Automated laser turrets, stun gas, or force fields.' },
  { id: 'dock', name: 'Dock / Hangar', ep: 1, desc: 'Repair and docking facilities for boats or aircraft.' },
  { id: 'dual_size', name: 'Dual Size', ep: 1, desc: 'Larger on the inside than the outside via dimensional folding.' },
  { id: 'fire_prevention', name: 'Fire Prevention', ep: 1, desc: 'Halon extinguishers, fire-doors, and automated suppression.' },
  { id: 'garage', name: 'Garage / Vehicle Bay', ep: 1, desc: 'Full automotive repair and maintenance facilities.' },
  { id: 'gym', name: 'Gym / Training Facilities', ep: 1, desc: 'Athletic training equipment and obstacle course.' },
  { id: 'hangar', name: 'Hangar', ep: 1, desc: 'Subterranean runway or vertical launch silo.' },
  { id: 'holding_cells', name: 'Holding Cells', ep: 1, desc: 'Superhuman containment cells with nullifiers (Toughness 14).' },
  { id: 'infirmary', name: 'Infirmary / Medical Bay', ep: 1, desc: 'Advanced trauma center with automated surgical gear.' },
  { id: 'isolated', name: 'Isolated', ep: 1, desc: 'Situated in Arctic, deep ocean, volcano, or orbit.' },
  { id: 'laboratory', name: 'Laboratory', ep: 1, desc: 'Advanced physics, chemistry, and cybernetic research equipment.' },
  { id: 'library', name: 'Library / Archive', ep: 1, desc: 'Vast occult, scientific, or historical reference archives.' },
  { id: 'living_space', name: 'Living Space', ep: 1, desc: 'Luxurious quarters, kitchens, dorms, and recreation areas.' },
  { id: 'power_system', name: 'Independent Power System', ep: 1, desc: 'Fusion core, geothermal tap, or solar collector.' },
  { id: 'sealed', name: 'Sealed Environment', ep: 1, desc: 'Hermetically sealed with self-sustaining life support.' },
  { id: 'security_system', name: 'Security System', ep: 1, desc: 'Biometric scanners, laser grids, and retinal access locks.' },
  { id: 'teleport_beacon', name: 'Teleportation Beacon', ep: 1, desc: 'Targeting transponders for instant team teleportation.' },
  { id: 'workshop', name: 'Workshop', ep: 1, desc: 'Heavy manufacturing, fabrication tools, and 3D printers.' }
];

/**
 * Manages the pop-up / pop-out Tables window.
 * Saves and restores position and coordinates between sessions via localStorage.
 */
export class TablesWindowManager {
  constructor() {
    this.storageKey = 'mm3e_tables_window_coords';
    this.popoutWindow = null;
    this.isEmbeddedOpen = false;
    this._memoryFallback = {};
  }

  getSavedCoords() {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(this.storageKey) : this._memoryFallback[this.storageKey];
      return raw ? JSON.parse(raw) : { left: 100, top: 100, width: 850, height: 750 };
    } catch {
      return { left: 100, top: 100, width: 850, height: 750 };
    }
  }

  saveCoords(coords) {
    try {
      const str = JSON.stringify(coords);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.storageKey, str);
      } else {
        this._memoryFallback[this.storageKey] = str;
      }
    } catch (e) {
      console.warn('Failed to save table window coords', e);
    }
  }

  savePopoutOpenedState() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_tables_popped_out', 'true');
        localStorage.setItem('mm3e_tables_preferred_mode', 'popout');
      } else {
        this._memoryFallback['mm3e_tables_popped_out'] = 'true';
        this._memoryFallback['mm3e_tables_preferred_mode'] = 'popout';
      }
    } catch (e) {
      console.warn('Failed to save table window state', e);
    }
  }

  savePopoutClosedState() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_tables_popped_out', 'false');
        localStorage.setItem('mm3e_tables_preferred_mode', 'popout');
      } else {
        this._memoryFallback['mm3e_tables_popped_out'] = 'false';
        this._memoryFallback['mm3e_tables_preferred_mode'] = 'popout';
      }
    } catch (e) {
      console.warn('Failed to save table window state', e);
    }
  }

  wasClosedWhilePoppedOut() {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('mm3e_tables_preferred_mode') === 'popout';
      }
      return this._memoryFallback['mm3e_tables_preferred_mode'] === 'popout';
    } catch {
      return false;
    }
  }

  setClosedWhilePoppedOut(wasPoppedOut) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_tables_preferred_mode', wasPoppedOut ? 'popout' : 'modal');
      } else {
        this._memoryFallback['mm3e_tables_preferred_mode'] = wasPoppedOut ? 'popout' : 'modal';
      }
    } catch (e) {
      console.warn('Failed to save table window preferred mode', e);
    }
  }

  canDisplayPopout() {
    const winWidth = typeof window !== 'undefined' ? (window.innerWidth || 0) : 1024;
    const screenWidth = typeof window !== 'undefined' && window.screen ? (window.screen.availWidth || window.screen.width || winWidth) : winWidth;
    return winWidth >= 900 || screenWidth >= 1024;
  }

  isPoppedOut() {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('mm3e_tables_popped_out') === 'true';
      }
      return this._memoryFallback['mm3e_tables_popped_out'] === 'true';
    } catch {
      return false;
    }
  }

  openPopout() {
    if (this.popoutWindow && !this.popoutWindow.closed) {
      this.popoutWindow.focus();
      return;
    }

    this.savePopoutOpenedState();
    const coords = this.getSavedCoords();
    const features = `width=${coords.width},height=${coords.height},left=${coords.left},top=${coords.top},resizable=yes,scrollbars=yes`;
    
    this.popoutWindow = window.open('', 'mm3e_tables_popout', features);
    if (!this.popoutWindow) {
      alert('Pop-up was blocked by browser. Please allow pop-ups for this site.');
      return;
    }

    const currentTheme = (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || (typeof localStorage !== 'undefined' && localStorage.getItem('mm3e_theme')) || 'dark';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en" data-theme="${currentTheme}">
      <head>
        <meta charset="UTF-8">
        <title>Mutants & Masterminds 3E - Official Reference Tables</title>
        <link rel="stylesheet" href="css/styles.css?v=3.62">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: var(--bg-app, #0f172a);
            color: var(--text-main, #f8fafc);
            margin: 0;
            padding: 1rem;
            font-size: 13px;
          }
          h2 { color: var(--hero-blue, #06b6d4); margin-top: 0; border-bottom: 2px solid var(--border-color, #334155); padding-bottom: 0.5rem; }
          .collapsible {
            background: var(--bg-card, #1e293b);
            border: 1px solid var(--border-color, #334155);
            border-radius: 6px;
            margin-bottom: 0.75rem;
            overflow: hidden;
          }
          .collapsible-header {
            padding: 0.6rem 0.85rem;
            background: var(--bg-header, #162032);
            font-weight: 800;
            color: var(--hero-gold, #f1c40f);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;
          }
          .collapsible-header:hover { background: var(--bg-card-hover, #223049); }
          .collapsible-content { padding: 0.75rem; display: block; overflow-x: auto; color: var(--text-main); }
          .collapsible-content.collapsed { display: none; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; color: var(--text-main); }
          th { text-align: left; padding: 6px 8px; background: var(--bg-input, #0b1120); color: var(--text-muted, #94a3b8); border-bottom: 1px solid var(--border-color, #334155); }
          td { padding: 5px 8px; border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.05)); color: var(--text-main); }
          tr:nth-child(even) td { background: rgba(0,0,0,0.03); }
          .top-bar { display: flex; gap: 0.5rem; margin-bottom: 1rem; justify-content: flex-end; }
          button {
            background: var(--bg-card, #334155);
            color: var(--text-bright, #fff);
            border: 1px solid var(--border-color, #475569);
            padding: 5px 10px;
            border-radius: 4px;
            font-weight: 700;
            cursor: pointer;
          }
          button:hover { background: var(--hero-blue, #2563eb); color: #fff; }
        </style>
      </head>
      <body>
        <div class="top-bar">
          <button id="btn-popout-expand">Expand All</button>
          <button id="btn-popout-collapse">Collapse All</button>
          <button id="btn-popout-close" style="background: #dc2626; color: #fff; border: none; padding: 5px 12px; border-radius: 4px; font-weight: 700; cursor: pointer;">✕ Close</button>
        </div>
        <h2>📜 Mutants & Masterminds 3E - Official Tables</h2>
        <div id="popout-tables-root"></div>
        <script>
          const tablesHtml = window.opener ? window.opener.document.getElementById('tables-content-body').innerHTML : '';
          document.getElementById('popout-tables-root').innerHTML = tablesHtml;

          // Theme sync listener
          window.addEventListener('storage', (e) => {
            if (e.key === 'mm3e_theme' && e.newValue) {
              document.documentElement.setAttribute('data-theme', e.newValue);
            }
          });
          window.addEventListener('focus', () => {
            if (window.opener && !window.opener.closed) {
              try {
                const t = window.opener.document.documentElement.getAttribute('data-theme');
                if (t && t !== document.documentElement.getAttribute('data-theme')) {
                  document.documentElement.setAttribute('data-theme', t);
                }
              } catch(e) {}
            }
          });
          
          document.querySelectorAll('.collapsible-header').forEach(hdr => {
            hdr.addEventListener('click', () => {
              const content = hdr.nextElementSibling;
              if (content) content.classList.toggle('collapsed');
            });
          });

          document.getElementById('btn-popout-expand').addEventListener('click', () => {
            document.querySelectorAll('.collapsible-content').forEach(c => c.classList.remove('collapsed'));
          });
          document.getElementById('btn-popout-collapse').addEventListener('click', () => {
            document.querySelectorAll('.collapsible-content').forEach(c => c.classList.add('collapsed'));
          });
          document.getElementById('btn-popout-close').addEventListener('click', () => {
            if (window.opener && window.opener.tablesManager) {
              window.opener.tablesManager.setClosedWhilePoppedOut(true);
            }
            window.close();
          });

          window.addEventListener('beforeunload', () => {
            if (window.opener && window.opener.tablesManager) {
              window.opener.tablesManager.saveCoords({
                left: window.screenX,
                top: window.screenY,
                width: window.outerWidth,
                height: window.outerHeight
              });
              window.opener.tablesManager.savePopoutClosedState();
            }
          });
        </script>
      </body>
      </html>
    `;

    this.popoutWindow.document.open();
    this.popoutWindow.document.write(htmlContent);
    this.popoutWindow.document.close();
  }
}

export const tablesManager = new TablesWindowManager();
