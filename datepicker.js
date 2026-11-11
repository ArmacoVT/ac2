// Календар за избор на дата — седмицата започва от ПОНЕДЕЛНИК (вграденият в телефона/браузъра често е от неделя).
// Подменя автоматично всяко <input type="date"> на страницата (и новопоявилите се): стойността остава същата
// (ГГГГ-ММ-ДД, а при промяна — събития input/change), така че останалият код не се променя.
(function () {
  if (window.__mdp) return; window.__mdp = true;
  const bg = () => (document.documentElement.lang || 'bg').slice(0, 2) !== 'en';
  const MON = { bg: ['януари','февруари','март','април','май','юни','юли','август','септември','октомври','ноември','декември'], en: ['January','February','March','April','May','June','July','August','September','October','November','December'] };
  const WD = { bg: ['Пн','Вт','Ср','Чт','Пт','Сб','Нд'], en: ['Mo','Tu','We','Th','Fr','Sa','Su'] };
  const pad = n => String(n).padStart(2, '0');
  const iso = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const fmt = s => { if (!/^\d{4}-\d{2}-\d{2}$/.test(s || '')) return ''; const [y, m, d] = s.split('-'); return d + '.' + m + '.' + y; };

  const css = document.createElement('style');
  css.textContent = `
  .mdp-btn{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;text-align:left;cursor:pointer;font:inherit;}
  .mdp-btn .ph{opacity:.55;}
  .mdp-btn svg{width:18px;height:18px;opacity:.6;flex:0 0 auto;}
  .mdp-ov{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;padding:16px;}
  .mdp{background:#F7F7EE;color:#1C1C1B;border-radius:18px;padding:14px 14px 12px;width:min(340px,100%);box-shadow:0 18px 50px rgba(0,0,0,.3);font-family:'Google Sans',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;}
  .mdp-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
  .mdp-h b{font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:19px;}
  .mdp-h button{width:38px;height:38px;border-radius:19px;border:1px solid rgba(0,0,0,.12);background:transparent;font-size:18px;cursor:pointer;color:inherit;}
  .mdp-g{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;}
  .mdp-g .w{font-size:11.5px;text-align:center;color:#75756B;padding:4px 0;}
  .mdp-g .w.we{color:#82303D;}
  .mdp-g button{height:40px;border:0;border-radius:10px;background:transparent;font:inherit;font-size:15px;cursor:pointer;color:inherit;}
  .mdp-g button:hover{background:rgba(130,48,61,.1);}
  .mdp-g button.t{box-shadow:inset 0 0 0 1.5px #82303D;}
  .mdp-g button.s{background:#82303D;color:#F7F7EE;font-weight:600;}
  .mdp-g button:disabled{opacity:.28;cursor:default;background:transparent;}
  .mdp-f{display:flex;justify-content:space-between;gap:8px;margin-top:10px;}
  .mdp-f button{border:1px solid rgba(0,0,0,.15);background:transparent;border-radius:16px;padding:7px 14px;font:inherit;font-size:14px;cursor:pointer;color:inherit;}
  [data-theme="dark"] .mdp{background:#21211E;color:#EBEBD6;}`;
  document.head.appendChild(css);

  function open(input, after) {
    const L = bg() ? 'bg' : 'en';
    const min = input.getAttribute('min') || '', max = input.getAttribute('max') || '';
    const today = iso(new Date());
    let cur = input.value && /^\d{4}-\d{2}-\d{2}$/.test(input.value) ? new Date(input.value + 'T12:00:00') : new Date();
    let y = cur.getFullYear(), m = cur.getMonth();
    const ov = document.createElement('div'); ov.className = 'mdp-ov';
    const close = () => { ov.remove(); document.removeEventListener('keydown', esc); };
    const esc = e => { if (e.key === 'Escape') close(); };
    const draw = () => {
      const first = new Date(y, m, 1), off = (first.getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
      let cells = WD[L].map((w, i) => `<div class="w${i > 4 ? ' we' : ''}">${w}</div>`).join('');
      for (let i = 0; i < off; i++) cells += '<span></span>';
      for (let d = 1; d <= days; d++) {
        const v = y + '-' + pad(m + 1) + '-' + pad(d), dis = (min && v < min) || (max && v > max);
        cells += `<button type="button" data-v="${v}" class="${v === today ? 't' : ''}${v === input.value ? ' s' : ''}"${dis ? ' disabled' : ''}>${d}</button>`;
      }
      ov.innerHTML = `<div class="mdp" role="dialog" aria-label="${L === 'bg' ? 'Избор на дата' : 'Choose a date'}">
        <div class="mdp-h"><button type="button" data-n="-1" aria-label="‹">‹</button><b>${MON[L][m]} ${y}</b><button type="button" data-n="1" aria-label="›">›</button></div>
        <div class="mdp-g">${cells}</div>
        <div class="mdp-f"><button type="button" data-today="1">${L === 'bg' ? 'Днес' : 'Today'}</button><button type="button" data-x="1">${L === 'bg' ? 'Затвори' : 'Close'}</button></div></div>`;
    };
    ov.addEventListener('click', e => {
      if (e.target === ov || e.target.closest('[data-x]')) { close(); return; }
      const n = e.target.closest('[data-n]'); if (n) { m += +n.dataset.n; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } draw(); return; }
      const t = e.target.closest('[data-today]'); if (t) { const d = new Date(); y = d.getFullYear(); m = d.getMonth(); draw(); return; }
      const b = e.target.closest('button[data-v]'); if (b && !b.disabled) { set(input, b.dataset.v); close(); if (after) after(); }
    });
    document.addEventListener('keydown', esc);
    draw(); document.body.appendChild(ov);
  }
  function set(input, v) {
    input.value = v;
    if (input._mdpBtn) paint(input);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';
  function paint(input) {
    const b = input._mdpBtn, t = fmt(input.value);
    b.innerHTML = (t ? `<span>${t}</span>` : `<span class="ph">${bg() ? 'избери дата' : 'choose a date'}</span>`) + CAL;
  }
  function upgrade(input) {
    if (input._mdp) return; input._mdp = true;
    const cs = getComputedStyle(input);
    if (cs.opacity === '0' || input.dataset.mdpOverlay === '1') {
      // невидим слой върху бутон (напр. датата в горната лента на „Маси“) — остава слой, но отваря нашия календар
      input.type = 'text'; input.readOnly = true; input.setAttribute('inputmode', 'none');
      input.addEventListener('click', e => { e.preventDefault(); open(input); });
      return;
    }
    // видимо поле → скрито поле със същата стойност + бутон, който изглежда като полето
    const btn = document.createElement('button'); btn.type = 'button';
    btn.className = (input.className ? input.className + ' ' : '') + 'mdp-btn';
    if (input.getAttribute('style')) btn.setAttribute('style', input.getAttribute('style'));
    if (input.id) btn.setAttribute('aria-labelledby', input.id);
    input.type = 'hidden'; input._mdpBtn = btn; input.parentNode.insertBefore(btn, input);
    // да изглежда като другите полета във формата: взимаме рамка/фон/отстъп от изчисления стил на полето
    ['border', 'borderRadius', 'background', 'padding', 'minHeight', 'height', 'fontSize', 'color', 'boxSizing'].forEach(k => { if (!btn.style[k]) btn.style[k] = cs[k]; });
    paint(input);
    btn.addEventListener('click', () => open(input));
  }
  const scan = root => { (root.querySelectorAll ? root : document).querySelectorAll('input[type="date"]').forEach(upgrade); };
  const start = () => { scan(document); new MutationObserver(ms => { for (const m of ms) for (const n of m.addedNodes) if (n.nodeType === 1) { if (n.matches && n.matches('input[type="date"]')) upgrade(n); else scan(n); } }).observe(document.body, { childList: true, subtree: true }); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  // ако някъде кодът сменя стойността програмно — обновяваме надписа при следващо отваряне/промяна
  window.mdpRefresh = () => document.querySelectorAll('input[type="hidden"]').forEach(i => { if (i._mdpBtn) paint(i); });
})();
