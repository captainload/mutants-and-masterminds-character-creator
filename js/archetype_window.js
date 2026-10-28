/**
 * Mutants & Masterminds 3E - Interactive Archetype Builder Window Manager
 * Manages pop-out window capability, coordinates, size, and state persistence.
 */

export class ArchetypeWindowManager {
  constructor() {
    this.storageKey = 'mm3e_archetype_window_coords';
    this.popoutWindow = null;
    this.isEmbeddedOpen = false;
    this._memoryFallback = {};
  }

  getSavedCoords() {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(this.storageKey) : this._memoryFallback[this.storageKey];
      return raw ? JSON.parse(raw) : { left: 120, top: 120, width: 880, height: 780 };
    } catch {
      return { left: 120, top: 120, width: 880, height: 780 };
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
      console.warn('Failed to save archetype window coords', e);
    }
  }

  savePopoutOpenedState() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_archetype_popped_out', 'true');
        localStorage.setItem('mm3e_archetype_preferred_mode', 'popout');
      } else {
        this._memoryFallback['mm3e_archetype_popped_out'] = 'true';
        this._memoryFallback['mm3e_archetype_preferred_mode'] = 'popout';
      }
    } catch (e) {
      console.warn('Failed to save archetype window state', e);
    }
  }

  savePopoutClosedState() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_archetype_popped_out', 'false');
        localStorage.setItem('mm3e_archetype_preferred_mode', 'popout');
      } else {
        this._memoryFallback['mm3e_archetype_popped_out'] = 'false';
        this._memoryFallback['mm3e_archetype_preferred_mode'] = 'popout';
      }
    } catch (e) {
      console.warn('Failed to save archetype window state', e);
    }
  }

  wasClosedWhilePoppedOut() {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('mm3e_archetype_preferred_mode') === 'popout';
      }
      return this._memoryFallback['mm3e_archetype_preferred_mode'] === 'popout';
    } catch {
      return false;
    }
  }

  setClosedWhilePoppedOut(wasPoppedOut) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mm3e_archetype_preferred_mode', wasPoppedOut ? 'popout' : 'modal');
      } else {
        this._memoryFallback['mm3e_archetype_preferred_mode'] = wasPoppedOut ? 'popout' : 'modal';
      }
    } catch (e) {
      console.warn('Failed to save archetype window preferred mode', e);
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
        return localStorage.getItem('mm3e_archetype_popped_out') === 'true';
      }
      return this._memoryFallback['mm3e_archetype_popped_out'] === 'true';
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
    
    this.popoutWindow = window.open('', 'mm3e_archetype_popout', features);
    if (!this.popoutWindow) {
      alert('Pop-up was blocked by browser. Please allow pop-ups for this site.');
      return;
    }

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mutants & Masterminds 3E - Interactive Archetype Character Builder</title>
  <link rel="stylesheet" href="css/styles.css?v=3.49">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      margin: 0;
      padding: 1rem;
      font-size: 13px;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .popout-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #334155;
      padding-bottom: 0.6rem;
      margin-bottom: 1rem;
    }
    .popout-title {
      color: #06b6d4;
      font-size: 1.15rem;
      font-weight: 800;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .popout-scroll-body {
      flex: 1;
      overflow-y: auto;
      padding-right: 0.35rem;
      margin-bottom: 1rem;
    }
    .popout-footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #334155;
      padding-top: 0.75rem;
      background: #0f172a;
    }
  </style>
</head>
<body>
  <div class="popout-top-bar">
    <h2 class="popout-title">✨ Interactive Archetype Character Builder</h2>
    <button id="btn-popout-close" class="btn" style="background: #dc2626; color: #fff; border: none; padding: 5px 14px; border-radius: 4px; font-weight: 700; cursor: pointer;">✕ Close</button>
  </div>
  <div class="popout-scroll-body" id="archetype-wizard-body">
    <!-- Dynamically rendered -->
  </div>
  <div class="popout-footer-bar">
    <span id="wizard-pp-counter" style="font-weight: 800; color: var(--hero-gold);">PL 10 (150/150 PP Legal)</span>
    <div style="display: flex; gap: 0.5rem;">
      <button class="btn btn-outline" id="btn-wizard-back">Back</button>
      <button class="btn btn-primary" id="btn-wizard-next">Next Step ➜</button>
    </div>
  </div>
  <script>
    if (window.opener && window.opener.appController) {
      window.opener.appController.renderWizardStep();
    }
    document.getElementById('btn-popout-close')?.addEventListener('click', () => {
      if (window.opener && window.opener.archetypeManager) {
        window.opener.archetypeManager.setClosedWhilePoppedOut(true);
      }
      window.close();
    });
    window.addEventListener('beforeunload', () => {
      if (window.opener && window.opener.archetypeManager) {
        window.opener.archetypeManager.saveCoords({
          left: window.screenX,
          top: window.screenY,
          width: window.outerWidth,
          height: window.outerHeight
        });
        window.opener.archetypeManager.savePopoutClosedState();
      }
    });
  </script>
</body>
</html>`;

    this.popoutWindow.document.open();
    this.popoutWindow.document.write(htmlContent);
    this.popoutWindow.document.close();
  }
}

export const archetypeManager = new ArchetypeWindowManager();
