/* =====================================================================
   QİYMƏTLƏNDİRMƏ MƏRKƏZİ — Tətbiq məntiqi
   ===================================================================== */

document.getElementById('yr').textContent = new Date().getFullYear();

/* ---- KONFİQURASİYA: bunları öz mərkəzinizə uyğun dəyişin ---- */
const CONFIG = {
  centerName: "AN Psixoloji Dəstək və Reabilitasiya Mərkəzi",
  instagramUrl: "https://www.instagram.com/an_psixologiyamerkezi",
  defaultWA: "994554157215"   // mərkəzin WhatsApp nömrəsi (valideyn nömrəsi boş qalsa istifadə olunur)
};
document.getElementById('igLink').href = CONFIG.instagramUrl;

/* qiymətləndirmə vəziyyəti: testId -> {itemId:val} */
const STATE = {};
let LAST_REPORT_TEXT = "";

/* ----------------- İKONLAR ----------------- */
const I = {
  badge:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 1.8 3-.2 1 2.8 2.6 1.5-.8 2.9.8 2.9-2.6 1.5-1 2.8-3-.2L12 22l-2.4-1.8-3 .2-1-2.8L3 13.8l.8-2.9L3 8l2.6-1.5 1-2.8 3 .2L12 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  layers:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M3 13l9 5 9-5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  family:'<svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="9" r="2.4" stroke="currentColor" stroke-width="1.5"/><path d="M3 20c0-3 2.2-5 5-5s5 2 5 5M14 20c0-2.4 1.4-4 3-4s3 1.6 3 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  share:'<svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="12" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="6" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" stroke="currentColor" stroke-width="1.5"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none"><path d="M6 2h8l4 4v16H6V2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 2v4h4M9 13h6M9 17h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="currentColor" stroke-width="1.5"/><path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  stetho:'<svg viewBox="0 0 24 24" fill="none"><path d="M6 3v5a4 4 0 008 0V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M10 16a5 5 0 0010 0v-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="20" cy="11" r="2" stroke="currentColor" stroke-width="1.5"/></svg>',
  list:'<svg viewBox="0 0 24 24" fill="none"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none"><path d="M4 4h7v16H4zM13 4h7v16h-7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  age:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  target:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 20s-7-4.3-7-9.3A3.7 3.7 0 0112 8a3.7 3.7 0 017 2.7c0 5-7 9.3-7 9.3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  save:'<svg viewBox="0 0 24 24" fill="none"><path d="M5 3h11l3 3v15H5V3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 3v5h7M8 21v-6h8v6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.8.7.8-2.7-.2-.3A8 8 0 1112 20zm4.4-5.7c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.3 7.3 0 01-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.9 11.9 0 004.6 4c.6.3 1.1.4 1.5.5a3.6 3.6 0 001.6.1 2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>',
  print:'<svg viewBox="0 0 24 24" fill="none"><path d="M6 9V3h12v6M6 18H4v-7h16v7h-2M8 14h8v7H8v-7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>'
};

/* ----------------- NAVİQASİYA ----------------- */
function go(view, testId){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+view).classList.add('active');
  document.querySelectorAll('.nav-links button').forEach(b=>b.classList.remove('active'));
  const navKey = view==='home' ? 'home' : testId;
  const nb = document.querySelector('.nav-links button[data-nav="'+navKey+'"]');
  if(nb) nb.classList.add('active');
  document.getElementById('navLinks').classList.remove('open');
  if(view==='test') renderTestPage(testId);
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ----------------- ANA SƏHİFƏ ----------------- */
function renderHome(){
  const grid = document.getElementById('testGrid');
  grid.innerHTML = Object.values(TESTS).map(t=>`
    <article class="card">
      <span class="bartop"></span>
      <span class="tag">${t.name}</span>
      <h3>${t.full.split(',')[0]}</h3>
      <div class="full">${t.full}</div>
      <p class="desc">${t.summary}</p>
      <div class="meta">
        <span class="pill">${I.age} ${t.age}</span>
        <span class="pill">${I.layers} ${t.domains.length} sahə</span>
      </div>
      <button class="cta" onclick="go('test','${t.id}')">Testi aç ${I.arrow}</button>
    </article>`).join('');

  document.getElementById('whyGrid').innerHTML = WHY.map(w=>`
    <div class="why-item">
      <div class="why-ic">${I[w.ic]}</div>
      <div><h4>${w.t}</h4><p>${w.d}</p></div>
    </div>`).join('');
}

/* ----------------- TEST SƏHİFƏSİ ----------------- */
function renderTestPage(id){
  const t = TESTS[id];
  if(!STATE[id]) STATE[id] = {};
  const page = document.getElementById('testPage');

  const instr = `
    <details class="instr" open>
      <summary>
        <span class="ic">${I.book}</span>
        Keçirilmə təlimatı
        <span class="chev"><svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </summary>
      <div class="instr-body">
        <div class="instr-block"><h4><span class="num">1</span> Keçirilmə qaydası</h4>
          <ul>${t.instruction.howto.map(x=>`<li>${x}</li>`).join('')}</ul></div>
        <div class="instr-block"><h4><span class="num">2</span> Forma və metodlar</h4>
          <ul>${t.instruction.methods.map(x=>`<li>${x}</li>`).join('')}</ul></div>
        <div class="instr-block"><h4><span class="num">3</span> Son qiymətləndirmə qaydası</h4>
          <ul>${t.instruction.scoring.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      </div>
    </details>`;

  const idForm = `
    <div class="panel">
      <div class="panel-h"><div class="ic">${I.user}</div>
        <div><h3>Uşaq və mütəxəssis məlumatları</h3><div class="sub">Hesabatda bu məlumatlar əks olunacaq</div></div></div>
      <div class="field-grid">
        <div class="field"><label>Uşağın adı</label><input id="f_cname" placeholder="Ad"></div>
        <div class="field"><label>Uşağın soyadı</label><input id="f_csurname" placeholder="Soyad"></div>
        <div class="field"><label>Uşağın yaşı</label><input id="f_cage" placeholder="məs. 7 yaş 4 ay"></div>
      </div>
      <div class="field-grid" style="margin-top:16px">
        <div class="field"><label>Mütəxəssisin adı</label><input id="f_sname" placeholder="Ad"></div>
        <div class="field"><label>Mütəxəssisin soyadı</label><input id="f_ssurname" placeholder="Soyad"></div>
        <div class="field"><label>Peşə</label><select id="f_prof">${PROFESSIONS.map(p=>`<option>${p}</option>`).join('')}</select></div>
      </div>
      <div class="field-grid" style="margin-top:16px">
        <div class="field"><label>Valideynin WhatsApp nömrəsi (göndərmək üçün)</label><input id="f_wa" placeholder="məs. 994501234567 (ölkə kodu ilə, +/0 olmadan)"></div>
        <div class="field"><label>Qiymətləndirmə tarixi</label><input id="f_date" type="date"></div>
      </div>
    </div>`;

  const assess = `
    <div class="panel">
      <div class="panel-h"><div class="ic">${I.list}</div>
        <div><h3>Qiymətləndirmə</h3><div class="sub">Hər sahə üzrə müşahidələri qeyd edin və rəsmi balı daxil edin</div></div></div>
      ${t.domains.map((d,di)=>renderDomain(id,d,di)).join('')}
    </div>`;

  page.innerHTML = `
    <div class="tp-top">
      <button class="back" onclick="go('home')">${I.back} Ana səhifə</button>
      <div class="tp-title">
        <span class="tag">${t.name} · Mərkəzimizdə keçirilir</span>
        <h2>${t.full.split(',')[0]}</h2>
        <p>${t.summary}</p>
      </div>
    </div>
    ${instr}
    ${idForm}
    ${assess}
    <div class="run-bar">
      <div class="prog">
        <div class="ptxt" id="progTxt">Tamamlanma: 0%</div>
        <div class="ptrack"><div class="pfill" id="progFill"></div></div>
      </div>
      <button class="btn-primary" onclick="showResult('${id}')">${I.chart} Nəticəni göstər</button>
    </div>
    <div id="reportArea">
      <div class="empty">${I.doc}<h3>Hesabat hələ hazır deyil</h3><p>Qiymətləndirməni doldurub “Nəticəni göstər” düyməsini basın.</p></div>
    </div>`;

  // restore saved selections
  restore(id);
  updateProgress(id);
}

function renderDomain(testId,d,di){
  const t = TESTS[testId];
  const off = t.official.filter(o=>o.id===d.id);
  const offHtml = off.length ? `
    <div class="official">
      <div class="lbl">${I.target} Rəsmi standart bal (lisenziyalı dəstdən)</div>
      ${off.map(o=>`<div class="row"><label>${o.label}</label><input data-off="${o.id}" placeholder="${o.ph}"></div>`).join('')}
    </div>` : '';

  return `
    <div class="domain">
      <div class="domain-h"><div class="idx">${di+1}</div>
        <div><h4>${d.name}</h4><p>${d.hint}</p></div></div>
      ${offHtml}
      <div class="scale-legend">
        <span><i style="background:var(--ok)"></i>0 çətinlik yox</span>
        <span><i style="background:var(--warn)"></i>1 yüngül</span>
        <span><i style="background:var(--high)"></i>2 orta</span>
        <span><i style="background:var(--crit)"></i>3 əhəmiyyətli</span>
      </div>
      <div class="items">
        ${d.items.map((q,qi)=>{
          const key = d.id+'_'+qi;
          return `<div class="item"><div class="q">${q}</div>
            <div class="scale" data-key="${key}">
              ${[0,1,2,3].map(v=>`<button data-v="${v}" onclick="pick('${testId}','${key}',${v},this)">${v}</button>`).join('')}
            </div></div>`;
        }).join('')}
      </div>
      <div class="notes-field"><label>Bu sahə üzrə müşahidə qeydi (ixtiyari)</label>
        <textarea data-note="${d.id}" placeholder="Mütəxəssisin əlavə müşahidələri..."></textarea></div>
    </div>`;
}

/* ----------------- SEÇİM ----------------- */
function pick(testId,key,val,btn){
  STATE[testId][key] = val;
  const group = btn.parentElement;
  group.querySelectorAll('button').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
  updateProgress(testId);
}

function restore(testId){
  const s = STATE[testId]||{};
  Object.keys(s).forEach(key=>{
    const g = document.querySelector(`.scale[data-key="${key}"]`);
    if(g){ const b=g.querySelector(`button[data-v="${s[key]}"]`); if(b) b.classList.add('sel'); }
  });
}

function totalItems(testId){
  return TESTS[testId].domains.reduce((a,d)=>a+d.items.length,0);
}
function updateProgress(testId){
  const done = Object.keys(STATE[testId]||{}).length;
  const total = totalItems(testId);
  const pct = total? Math.round(done/total*100):0;
  const pf=document.getElementById('progFill'), pt=document.getElementById('progTxt');
  if(pf) pf.style.width=pct+'%';
  if(pt) pt.textContent=`Tamamlanma: ${pct}%  (${done}/${total} bənd)`;
}

/* ----------------- BAL → BAND ----------------- */
function bandFor(avg){
  if(avg<0.75) return {key:'ok', label:'Tipik / gözlənilən', color:'var(--ok)'};
  if(avg<1.5)  return {key:'warn', label:'Yüngül çətinlik — izləmə', color:'var(--warn)'};
  if(avg<2.25) return {key:'high', label:'Orta səviyyə çətinlik', color:'var(--high)'};
  return {key:'crit', label:'Əhəmiyyətli çətinlik', color:'var(--crit)'};
}
function domainExplain(dName,band){
  const m = {
    ok:`“${dName}” sahəsində müşahidələr yaşa uyğun, gözlənilən hüdudlardadır. Hazırda xüsusi narahatlıq doğuran nümunə qeyd olunmayıb; mövcud güclü tərəfləri qoruyub inkişaf etdirmək tövsiyə olunur.`,
    warn:`“${dName}” sahəsində yüngül çətinlik əlamətləri var. Bu, mütləq pozğunluq demək deyil, lakin müntəzəm izləmə və hədəfli dəstək faydalı olar.`,
    high:`“${dName}” sahəsi orta səviyyədə çətinlik göstərir. Bu sahə müdaxilə planında prioritet kimi nəzərdən keçirilməlidir.`,
    crit:`“${dName}” sahəsində əhəmiyyətli çətinlik müşahidə olunur. Bu sahə fərdi müdaxilə proqramında əsas hədəflərdən biri olmalı və rəsmi qiymətləndirmə ilə dəqiqləşdirilməlidir.`
  };
  return m[band.key];
}

/* ----------------- HESABAT ----------------- */
function getField(id){ const e=document.getElementById(id); return e? e.value.trim():''; }

function showResult(testId){
  const t = TESTS[testId];
  const s = STATE[testId]||{};

  // domen üzrə hesablama
  const results = t.domains.map(d=>{
    let sum=0,cnt=0;
    d.items.forEach((q,qi)=>{ const k=d.id+'_'+qi; if(s[k]!==undefined){sum+=s[k];cnt++;} });
    const avg = cnt? sum/cnt : 0;
    const band = bandFor(avg);
    const note = document.querySelector(`textarea[data-note="${d.id}"]`);
    return {d, avg, band, answered:cnt, note: note? note.value.trim():''};
  });

  const child = `${getField('f_cname')} ${getField('f_csurname')}`.trim()||'(qeyd edilməyib)';
  const cage = getField('f_cage')||'—';
  const spec = `${getField('f_sname')} ${getField('f_ssurname')}`.trim()||'(qeyd edilməyib)';
  const prof = getField('f_prof')||'—';
  const date = getField('f_date')|| new Date().toLocaleDateString('az');

  // rəsmi ballar
  const offVals = {};
  document.querySelectorAll('[data-off]').forEach(i=>{ if(i.value.trim()) offVals[i.dataset.off]=i.value.trim(); });
  const offRows = t.official.filter(o=>offVals[o.id]!==undefined);

  // diqqət tələb edən sahələr
  const flagged = results.filter(r=>r.band.key!=='ok');
  const sorted = [...flagged].sort((a,b)=>b.avg-a.avg);

  const reportHtml = `
   <div class="report" id="reportCard">
    <div class="rep-head">
      <span class="rb"></span>
      <span class="tag">${t.name} · ${CONFIG.centerName}</span>
      <h2>Diaqnostik qiymətləndirmə hesabatı</h2>
      <div class="who">${t.full}</div>
      <div class="rep-meta">
        <div><div class="k">Uşaq</div><div class="v">${child}</div></div>
        <div><div class="k">Yaş</div><div class="v">${cage}</div></div>
        <div><div class="k">Mütəxəssis</div><div class="v">${spec}</div></div>
        <div><div class="k">Peşə</div><div class="v">${prof}</div></div>
        <div><div class="k">Tarix</div><div class="v">${date}</div></div>
      </div>
    </div>
    <div class="rep-body">

      ${offRows.length?`
      <div class="rep-sec">
        <div class="sh"><div class="ic ic-blue">${I.target}</div><h3>Rəsmi standart ballar</h3></div>
        <table class="score-table"><thead><tr><th>Göstərici</th><th>Bal</th></tr></thead>
        <tbody>${offRows.map(o=>`<tr><td>${o.label}</td><td>${offVals[o.id]}</td></tr>`).join('')}</tbody></table>
        <p style="font-size:13px;color:var(--muted);margin-top:8px">Bu ballar mərkəzin lisenziyalı dəstindən mütəxəssis tərəfindən daxil edilib.</p>
      </div>`:''}

      <div class="rep-sec">
        <div class="sh"><div class="ic ic-blue">${I.chart}</div><h3>Sahələr üzrə müşahidə xülasəsi</h3></div>
        ${results.map(r=>`
          <div class="dom-result">
            <div class="top"><h4>${r.d.name}</h4><span class="band ${r.band.key}">${r.band.label}</span></div>
            <div class="dom-bar"><i style="width:${Math.max(6,r.avg/3*100)}%;background:${r.band.color}"></i></div>
            <div class="exp">${domainExplain(r.d.name,r.band)}</div>
            ${offVals[r.d.id]!==undefined?`<div class="official-line">Rəsmi bal: ${offVals[r.d.id]}</div>`:''}
            ${r.note?`<div class="official-line" style="background:#FBF3E9;color:#7a5a23">Müşahidə qeydi: ${r.note}</div>`:''}
          </div>`).join('')}
      </div>

      <div class="rep-sec">
        <div class="sh"><div class="ic ic-blue">${I.stetho}</div><h3>Mütəxəssis üçün diaqnostik mülahizələr</h3></div>
        <div class="callout note">
          <strong>Vacib:</strong> Aşağıdakılar qərar dəstəyi məqsədi daşıyır. Yekun diaqnoz, rəsmi bal və norma müqayisəsi həmişə lisenziyalı dəst və ixtisaslı mütəxəssisin klinik mühakiməsi ilə müəyyən edilir.
        </div>
        <div style="margin-top:14px">${diagnosticText(t,sorted,offRows.length>0)}</div>
      </div>

      <div class="rep-sec">
        <div class="sh"><div class="ic ic-orange">${I.target}</div><h3>Mütəxəssisə tövsiyələr — nəyə diqqət edilməli</h3></div>
        ${sorted.length? `<ul class="rec-list">${
          sorted.flatMap(r=>(t.guide[r.d.id]?.focus||[]).map(f=>`<li><span class="b"></span><div><b>${r.d.name}:</b> ${f}</div></li>`)).join('')
        }</ul>` : `<ul class="rec-list"><li><span class="b"></span><div>Hazırda xüsusi prioritet sahə qeyd olunmayıb. Mövcud güclü tərəfləri möhkəmləndirin və müntəzəm izləməni davam etdirin.</div></li></ul>`}
      </div>

      <div class="rep-sec">
        <div class="sh"><div class="ic ic-orange">${I.heart}</div><h3>Valideynə tövsiyələr — evdə nə etməli</h3></div>
        <div class="parent-card">
          <p style="font-size:14.5px;color:var(--ink-soft)">Hörmətli valideyn, aşağıdakılar uşağınızla evdə görə biləcəyiniz sadə, gündəlik işlərdir. Onları oyun kimi, təzyiqsiz tətbiq edin — ardıcıllıq nəticədən vacibdir.</p>
          ${(sorted.length?sorted:results.slice(0,1)).map(r=>{
            const g=t.guide[r.d.id]; if(!g) return '';
            return `<div class="parent-block">
              <h5>${I.heart} ${r.d.name}</h5>
              <p>${g.parentIntro}</p>
              <ul>${g.parentTips.map(x=>`<li>${x}</li>`).join('')}</ul>
              ${g.games.map(gm=>`<div class="game"><div class="gi">${gm.e}</div><div class="gt"><b>${gm.t}</b>${gm.d}</div></div>`).join('')}
            </div>`;
          }).join('')}
        </div>
      </div>

    </div>
    <div class="rep-actions">
      <button class="btn-ghost" onclick="saveReport('${testId}')">${I.save} Hesabatı yadda saxla</button>
      <button class="btn-ghost" onclick="window.print()">${I.print} Çap et / PDF</button>
      <button class="btn-wa" onclick="sendWA('${testId}')">${I.wa} WhatsApp-a göndər</button>
    </div>
   </div>`;

  document.getElementById('reportArea').innerHTML = reportHtml;
  LAST_REPORT_TEXT = buildPlainReport(t, child, cage, spec, prof, date, results, offRows, offVals, sorted);
  document.getElementById('reportArea').scrollIntoView({behavior:'smooth',block:'start'});
}

function diagnosticText(t, flagged, hasOfficial){
  if(!flagged.length){
    return `<p style="font-size:14.5px;color:var(--ink-soft)">Müşahidə profili bütün sahələrdə yaşa uyğun mənzərə göstərir. Klinik narahatlıq doğuran qabarıq nümunə qeyd olunmayıb. ${hasOfficial?'Daxil edilmiş rəsmi ballarla birlikdə qiymətləndirildikdə, ':''}izləmə və profilaktik dəstək kifayətdir. Profil dəyişərsə, təkrar qiymətləndirmə planlaşdırıla bilər.</p>`;
  }
  const names = flagged.map(r=>`<b>${r.d.name}</b> (${r.band.label.toLowerCase()})`).join(', ');
  return `<p style="font-size:14.5px;color:var(--ink-soft)">Müşahidə profili əsasən bu sahələrdə diqqət tələb edir: ${names}. Bu nümunə ${t.name} alətinin ölçdüyü konstruktlarla uyğun gəlir və mütəxəssisin klinik formulasiyasında nəzərə alınmalıdır. ${hasOfficial?'Daxil edilmiş rəsmi ballarla birgə təhlil olunmalı; ':''}ehtiyac olduqda tamamlayıcı qiymətləndirmələrlə (məs. müşahidə + ailə müsahibəsi + adaptiv funksiya) dəqiqləşdirilməlidir. Diferensial diaqnostika və yekun qərar lisenziyalı protokol əsasında mütəxəssis tərəfindən verilir.</p>`;
}

/* ----------------- DÜZ MƏTN HESABAT (WhatsApp/fayl) ----------------- */
function buildPlainReport(t,child,cage,spec,prof,date,results,offRows,offVals,sorted){
  let s=`*${CONFIG.centerName} — Diaqnostik hesabat*\n${t.full}\n\n`;
  s+=`👤 Uşaq: ${child}\n🎂 Yaş: ${cage}\n👩‍⚕️ Mütəxəssis: ${spec} (${prof})\n📅 Tarix: ${date}\n`;
  s+=`\n*Sahələr üzrə xülasə:*\n`;
  results.forEach(r=>{ s+=`• ${r.d.name}: ${r.band.label}${offVals[r.d.id]!==undefined?` (rəsmi bal: ${offVals[r.d.id]})`:''}\n`; });
  if(offRows.length){ s+=`\n*Rəsmi standart ballar:*\n`; offRows.forEach(o=>{ s+=`• ${o.label}: ${offVals[o.id]}\n`; }); }
  if(sorted.length){
    s+=`\n*Mütəxəssisə tövsiyələr:*\n`;
    sorted.forEach(r=>{ (t.guide[r.d.id]?.focus||[]).forEach(f=>{ s+=`• ${r.d.name}: ${f}\n`; }); });
    s+=`\n*Valideynə tövsiyələr:*\n`;
    sorted.forEach(r=>{ const g=t.guide[r.d.id]; if(g){ s+=`▸ ${r.d.name}: ${g.parentIntro}\n`; g.parentTips.forEach(x=>s+=`   - ${x}\n`); } });
  } else {
    s+=`\n*Tövsiyə:* Profil yaşa uyğundur; güclü tərəfləri qoruyun və izləməni davam etdirin.\n`;
  }
  s+=`\n_Qeyd: Yekun diaqnoz lisenziyalı dəst və ixtisaslı mütəxəssis tərəfindən müəyyən edilir._`;
  return s;
}

function sendWA(testId){
  let num = getField('f_wa').replace(/[^0-9]/g,'');
  if(!num) num = CONFIG.defaultWA;
  const text = encodeURIComponent(LAST_REPORT_TEXT);
  const url = `https://wa.me/${num}?text=${text}`;
  window.open(url,'_blank');
}

function saveReport(testId){
  const t=TESTS[testId];
  const card=document.getElementById('reportCard').outerHTML;
  const child = (getField('f_cname')+'_'+getField('f_csurname')).trim()||'hesabat';
  const doc=`<!DOCTYPE html><html lang="az"><head><meta charset="utf-8"><title>${t.name} hesabat</title>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>body{font-family:'Plus Jakarta Sans',sans-serif;background:#F3F6F4;margin:0;padding:24px;color:#15302E}
  h2,h3,h4,h5{font-family:'Bricolage Grotesque',sans-serif;margin:0}
  ${document.querySelector('style').innerHTML}</style></head>
  <body><div class="wrap" style="max-width:820px">${card}</div></body></html>`;
  const blob=new Blob([doc],{type:'text/html;charset=utf-8'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`${t.name}_${child}.html`.replace(/\s+/g,'_');
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ----------------- BAŞLAT ----------------- */
renderHome();
