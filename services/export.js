/**
 * Freegurinha — Export PDF
 * Arquivo separado: nao altera logica do app.html
 * Incluir com: <script src="../services/export.js"></script>
 *
 * Depende de: allS, groups, S (storage) — definidos no app.html
 */

(function () {
  /* ── CSS ──────────────────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    '.exp-opt{display:flex;align-items:center;gap:.75rem;padding:.65rem .8rem;',
    'border-radius:10px;border:1.5px solid var(--line2);background:var(--white);',
    'cursor:pointer;transition:border-color .15s,background .15s;user-select:none}',
    '.exp-opt:has(input:checked){border-color:var(--green);background:var(--green-l)}',
    '.exp-opt input[type=checkbox]{width:16px;height:16px;accent-color:var(--green);flex-shrink:0;cursor:pointer}',
    '.exp-opt-icon{font-size:1.1rem;flex-shrink:0}',
    '.exp-opt-title{font-size:.85rem;font-weight:600;color:var(--ink)}',
    '.exp-opt-sub{font-size:.72rem;color:var(--muted)}',
    '.exp-opt-count{margin-left:auto;font-family:var(--serif);font-size:.95rem;font-weight:700;',
    'color:var(--ink2);flex-shrink:0;min-width:28px;text-align:right}',
    '.exp-grp-btn{font-family:var(--body);font-size:.78rem;font-weight:500;',
    'padding:.38rem .85rem;border-radius:8px;border:1.5px solid var(--line2);',
    'background:var(--white);color:var(--muted);cursor:pointer;transition:all .12s}',
    '.exp-grp-btn.active{background:var(--ink);color:#fff;border-color:var(--ink)}',
    '.exp-grp-btn:hover:not(.active){background:var(--bg);color:var(--ink)}',
  ].join('');
  document.head.appendChild(style);

  /* ── MODAL HTML ───────────────────────────────────────────── */
  var modal = document.createElement('div');
  modal.id = 'exportMbd';
  modal.className = 'mbd';
  modal.style.display = 'none';
  modal.innerHTML = [
    '<div class="modal" style="width:400px">',
    '<div style="padding:1.4rem 1.4rem 0">',

    // Header
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.1rem">',
    '<div>',
    '<div style="font-family:var(--serif);font-size:1.1rem;font-weight:700;color:var(--ink)">',
    'Exportar album',
    '</div>',
    '<div style="font-size:.75rem;color:var(--muted);margin-top:2px">',
    'Gera PDF para imprimir ou compartilhar',
    '</div>',
    '</div>',
    '<button id="expBtnClose" class="btn btn-ghost" style="font-size:1.1rem;padding:.3rem .6rem">X</button>',
    '</div>',

    // O que incluir
    '<div style="font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;',
    'color:var(--muted);margin-bottom:.65rem">O que incluir</div>',
    '<div style="display:flex;flex-direction:column;gap:.5rem;margin-bottom:1.2rem">',
    '<label class="exp-opt">',
    '<input type="checkbox" id="expChkMiss" checked/>',
    '<span class="exp-opt-icon">&#128308;</span>',
    '<div>',
    '<div class="exp-opt-title">Faltantes</div>',
    '<div class="exp-opt-sub">Figurinhas que voce ainda nao tem</div>',
    '</div>',
    '<span class="exp-opt-count" id="expCntMiss">-</span>',
    '</label>',
    '<label class="exp-opt">',
    '<input type="checkbox" id="expChkDup"/>',
    '<span class="exp-opt-icon">&#11088;</span>',
    '<div>',
    '<div class="exp-opt-title">Repetidas</div>',
    '<div class="exp-opt-sub">Disponiveis para troca</div>',
    '</div>',
    '<span class="exp-opt-count" id="expCntDup">-</span>',
    '</label>',
    '</div>',

    // Agrupar por
    '<div style="font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;',
    'color:var(--muted);margin-bottom:.65rem">Agrupar por</div>',
    '<div style="display:flex;gap:.5rem;margin-bottom:1.2rem">',
    '<button class="exp-grp-btn active" id="expGrpGroup">Grupo A-L</button>',
    '<button class="exp-grp-btn" id="expGrpCountry">Pais</button>',
    '<button class="exp-grp-btn" id="expGrpType">Tipo</button>',
    '</div>',

    // Summary
    '<div id="expSummary" style="background:var(--bg);border:1px solid var(--line2);',
    'border-radius:10px;padding:.7rem .9rem;font-size:.8rem;color:var(--muted);margin-bottom:1.1rem">',
    'Selecione pelo menos uma opcao',
    '</div>',
    '</div>',

    // Footer buttons
    '<div style="padding:.9rem 1.4rem 1.2rem;display:flex;gap:.5rem">',
    '<button class="btn btn-primary" id="expBtnGenerate" style="flex:1;justify-content:center">',
    '&#128196; Gerar PDF',
    '</button>',
    '<button class="btn" id="expBtnCancel" style="justify-content:center">Cancelar</button>',
    '</div>',
    '</div>',
  ].join('');
  document.body.appendChild(modal);

  /* ── STATE ────────────────────────────────────────────────── */
  var groupBy = 'group';

  /* ── HELPERS ──────────────────────────────────────────────── */
  function el(id) {
    return document.getElementById(id);
  }

  function updatePreview() {
    var wM = el('expChkMiss').checked;
    var wD = el('expChkDup').checked;
    var d = S._d();
    var mc = 0,
      dc = 0;
    allS.forEach(function (s) {
      var q = d[s.id] || 0;
      if (q === 0 && wM) mc++;
      if (q > 1 && wD) dc++;
    });
    var total = mc + dc;
    var btn = el('expBtnGenerate');
    var sum = el('expSummary');
    if (!wM && !wD) {
      sum.textContent = 'Selecione pelo menos uma opcao';
      btn.disabled = true;
      btn.style.opacity = '.5';
      return;
    }
    var parts = [];
    if (wM && mc) parts.push(mc + ' faltantes');
    if (wD && dc) parts.push(dc + ' repetidas');
    var gl =
      groupBy === 'group'
        ? 'grupo A-L'
        : groupBy === 'country'
          ? 'pais'
          : 'tipo';
    sum.textContent = total
      ? 'PDF com ' + parts.join(' e ') + ' por ' + gl
      : 'Nenhuma figurinha nessa categoria';
    btn.disabled = total === 0;
    btn.style.opacity = total === 0 ? '.5' : '1';
  }

  function setGroup(v) {
    groupBy = v;
    ['expGrpGroup', 'expGrpCountry', 'expGrpType'].forEach(function (id) {
      el(id).classList.remove('active');
    });
    el(
      v === 'group'
        ? 'expGrpGroup'
        : v === 'country'
          ? 'expGrpCountry'
          : 'expGrpType',
    ).classList.add('active');
    updatePreview();
  }

  /* ── OPEN / CLOSE ─────────────────────────────────────────── */
  function open() {
    var d = S._d();
    var miss = 0,
      dup = 0;
    allS.forEach(function (s) {
      var q = d[s.id] || 0;
      if (q === 0) miss++;
      else if (q > 1) dup++;
    });
    el('expCntMiss').textContent = miss;
    el('expCntDup').textContent = dup;
    updatePreview();
    modal.style.display = 'flex';
  }

  function close() {
    modal.style.display = 'none';
  }

  /* ── GENERATE ─────────────────────────────────────────────── */
  function generate() {
    var wM = el('expChkMiss').checked;
    var wD = el('expChkDup').checked;
    var d = S._d();

    // Collect
    var items = [];
    allS.forEach(function (s) {
      var q = d[s.id] || 0;
      if ((q === 0 && wM) || (q > 1 && wD)) {
        items.push({
          id: s.id,
          number: s.number,
          name: s.name,
          type: s.type,
          flag: s.flag || '',
          country: s.country,
          groupId: s.groupId || 'extra',
          groupLabel: s.groupLabel || 'Outros',
          qty: q,
          status: q === 0 ? 'missing' : 'dup',
        });
      }
    });

    if (!items.length) {
      toast('Nenhuma figurinha para exportar', 'rem');
      return;
    }

    // Build sections
    var sections = {};
    items.forEach(function (s) {
      var key, secLabel, subKey, subLabel;
      if (groupBy === 'group') {
        key = s.groupLabel || s.groupId;
        secLabel = key;
        var g = groups.find(function (gr) {
          return gr.id === s.country;
        });
        subKey = s.country || 'geral';
        subLabel = g ? g.flag + ' ' + g.label : subKey;
      } else if (groupBy === 'country') {
        var g2 = groups.find(function (gr) {
          return gr.id === s.country;
        });
        key = s.country || 'Outros';
        secLabel = g2 ? g2.flag + ' ' + g2.label : key;
        subKey = 'all';
        subLabel = '';
      } else {
        var tl = {
          player: 'Jogadores',
          photo: 'Fotos',
          shield: 'Escudos',
          craque: 'Craques',
          stadium: 'Estadios',
          special: 'Especiais',
          double: 'Duplas',
          intro: 'Intro',
        };
        key = s.type;
        secLabel = tl[s.type] || s.type;
        subKey = 'all';
        subLabel = '';
      }
      if (!sections[key]) sections[key] = { label: secLabel, sub: {} };
      if (!sections[key].sub[subKey])
        sections[key].sub[subKey] = { label: subLabel, items: [] };
      sections[key].sub[subKey].items.push(s);
    });

    // Group stats for progress
    var gStats = {};
    groups.forEach(function (g) {
      var key = g.groupLabel || g.groupId;
      if (!key) return;
      if (!gStats[key]) gStats[key] = { total: 0, owned: 0 };
      g.stickers.forEach(function (s) {
        gStats[key].total++;
        if ((d[s.id] || 0) >= 1) gStats[key].owned++;
      });
    });

    // Stats
    var totalOwned = allS.filter(function (s) {
      return (d[s.id] || 0) >= 1;
    }).length;
    var globalPct = Math.round((totalOwned / allS.length) * 100);
    var today = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    var titleParts = [];
    if (wM) titleParts.push('Faltantes');
    if (wD) titleParts.push('Repetidas');
    var missTot = items.filter(function (i) {
      return i.status === 'missing';
    }).length;
    var dupTot = items.filter(function (i) {
      return i.status === 'dup';
    }).length;
    var TLBL = {
      player: 'Jogador',
      photo: 'Foto',
      shield: 'Escudo',
      craque: 'Craque',
      stadium: 'Estadio',
      special: 'Especial',
      double: 'Dupla',
      intro: 'Intro',
    };

    // Build section HTML
    var sectHTML = '';
    Object.keys(sections).forEach(function (secKey) {
      var sec = sections[secKey];
      var st = gStats[sec.label];
      var pct = st ? Math.round((st.owned / st.total) * 100) : null;
      var prog =
        pct !== null
          ? '<div style="width:70px;height:4px;background:#dde0ea;border-radius:2px;overflow:hidden;display:inline-block;vertical-align:middle;margin-right:4px"><div style="height:100%;background:#00c16a;border-radius:2px;width:' +
            pct +
            '%"></div></div><span style="font-size:9px;font-weight:600;color:#6b7080">' +
            pct +
            '%</span>'
          : '';

      var subsHTML = '';
      Object.keys(sec.sub).forEach(function (sk) {
        var sub = sec.sub[sk];
        if (!sub.items.length) return;
        var rows = sub.items
          .map(function (s) {
            var num = String(s.number);
            while (num.length < 3) num = '0' + num;
            var badge =
              s.status === 'dup'
                ? '<span style="font-size:8px;font-weight:600;padding:1px 6px;border-radius:99px;background:#fdf3db;color:#c8920a;border:1px solid rgba(200,146,10,.25)">x' +
                  s.qty +
                  ' rep.</span>'
                : '<span style="font-size:8px;font-weight:600;padding:1px 6px;border-radius:99px;background:#fff0f0;color:#e53e3e;border:1px solid rgba(229,62,62,.2)">faltando</span>';
            return (
              '<tr style="border-bottom:1px solid #f0f2f7">' +
              '<td style="padding:3px 6px;font-size:9px;font-weight:700;color:#6b7080;width:32px">#' +
              num +
              '</td>' +
              '<td style="padding:3px 6px;width:20px;font-size:11px">' +
              s.flag +
              '</td>' +
              '<td style="padding:3px 6px;font-weight:500">' +
              s.name +
              '</td>' +
              '<td style="padding:3px 6px;font-size:9px;color:#9ca3af;width:50px">' +
              (TLBL[s.type] || s.type) +
              '</td>' +
              '<td style="padding:3px 6px">' +
              badge +
              '</td>' +
              '</tr>'
            );
          })
          .join('');
        if (sub.label)
          subsHTML +=
            '<div style="font-size:9px;font-weight:600;color:#6b7080;letter-spacing:.05em;text-transform:uppercase;padding:3px 4px 2px;margin-top:3px">' +
            sub.label +
            '</div>';
        subsHTML +=
          '<table style="width:100%;border-collapse:collapse"><tbody>' +
          rows +
          '</tbody></table>';
      });

      sectHTML +=
        '<div style="padding:0 24px;margin-bottom:16px">' +
        '<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:#f0f2f7;border-radius:8px;margin-bottom:6px">' +
        '<span style="font-family:Syne,sans-serif;font-size:11px;font-weight:800;flex:1">' +
        sec.label +
        '</span>' +
        '<div>' +
        prog +
        '</div></div>' +
        subsHTML +
        '</div>';
    });

    // Stats row
    var statsRow =
      '<div style="text-align:center"><div style="font-family:Syne,sans-serif;font-size:22px;font-weight:800">' +
      allS.length +
      '</div><div style="font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:#6b7080;margin-top:2px">Total</div></div>' +
      '<div style="text-align:center"><div style="font-family:Syne,sans-serif;font-size:22px;font-weight:800;color:#00c16a">' +
      totalOwned +
      '</div><div style="font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:#6b7080;margin-top:2px">Tenho</div></div>' +
      (wM
        ? '<div style="text-align:center"><div style="font-family:Syne,sans-serif;font-size:22px;font-weight:800;color:#e53e3e">' +
          missTot +
          '</div><div style="font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:#6b7080;margin-top:2px">Faltantes</div></div>'
        : '') +
      (wD
        ? '<div style="text-align:center"><div style="font-family:Syne,sans-serif;font-size:22px;font-weight:800;color:#c8920a">' +
          dupTot +
          '</div><div style="font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:#6b7080;margin-top:2px">Repetidas</div></div>'
        : '') +
      '<div style="flex:1;min-width:160px"><div style="height:7px;background:#f0f2f7;border-radius:4px;overflow:hidden;margin-bottom:3px"><div style="height:100%;background:#00c16a;border-radius:4px;width:' +
      globalPct +
      '%"></div></div><div style="font-family:Syne,sans-serif;font-size:10px;font-weight:700;color:#00c16a">' +
      globalPct +
      '% completo</div></div>';

    // Full document
    var doc =
      '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/>' +
      '<title>Freegurinha - ' +
      titleParts.join(' e ') +
      '</title>' +
      '<link rel="preconnect" href="https://fonts.googleapis.com"/>' +
      '<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>' +
      '<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Inter,sans-serif;color:#0a0c10;background:#fff;font-size:11px;line-height:1.5}' +
      '@media print{@page{margin:10mm 8mm;size:A4 portrait}}</style>' +
      '</head><body>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px 12px;border-bottom:2px solid #0a0c10;margin-bottom:16px">' +
      '<div style="font-family:Syne,sans-serif;font-size:20px;font-weight:800">Free<span style="color:#00c16a">gurinha</span></div>' +
      '<div><div style="font-family:Syne,sans-serif;font-size:13px;font-weight:700;text-align:right">' +
      titleParts.join(' e ') +
      '</div>' +
      '<div style="font-size:9px;color:#6b7080;text-align:right;margin-top:2px">Copa do Mundo 2026 - ' +
      today +
      '</div></div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:20px;padding:8px 24px 12px;border-bottom:1px solid #e5e7eb;margin-bottom:16px;flex-wrap:wrap">' +
      statsRow +
      '</div>' +
      sectHTML +
      '<div style="margin-top:20px;padding:10px 24px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;font-size:9px;color:#9ca3af">' +
      '<span>Freegurinha - Copa 2026</span><span>' +
      today +
      '</span></div>' +
      '</body></html>';

    var win = window.open('', '_blank', 'width=900,height=700');
    if (!win) {
      toast('Permita pop-ups para gerar o PDF', 'rem');
      return;
    }
    win.document.write(doc);
    win.document.close();
    win.onload = function () {
      setTimeout(function () {
        win.print();
      }, 500);
    };
    close();
    toast('PDF gerado!');
  }

  /* ── EVENTS ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    el('expBtnClose').onclick = close;
    el('expBtnCancel').onclick = close;
    el('expBtnGenerate').onclick = generate;
    el('expGrpGroup').onclick = function () {
      setGroup('group');
    };
    el('expGrpCountry').onclick = function () {
      setGroup('country');
    };
    el('expGrpType').onclick = function () {
      setGroup('type');
    };
    el('expChkMiss').onchange = updatePreview;
    el('expChkDup').onchange = updatePreview;
    modal.onclick = function (e) {
      if (e.target === modal) close();
    };
  });

  /* ── PUBLIC API ───────────────────────────────────────────── */
  window.openExportModal = open;
})();
