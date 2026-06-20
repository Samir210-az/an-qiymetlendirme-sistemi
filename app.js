/* =====================================================================
   AN Psixoloji Mərkəzi — Tətbiq məntiqi (AZ / RU / EN)
   Məzmun data.js (window.DATA) faylındadır.
   ===================================================================== */
(function(){
"use strict";
var D = window.DATA;
var LANG = "az";
var STATE = { obs:{}, official:{}, form:{} };   // yaddaş (localStorage yox)
var CUR = { view:"home", test:null, mode:"form" };
var LAST_REPORT_TEXT = "";

/* test → şəkil uyğunlaşması */
var IMG = { ados2:"an1.jpg", adir:"an3.jpg", wiscv:"an2.jpg", vineland3:"an5.jpg", leiter3:"an6.jpg", sp2:"an4.jpg" };
var ORDER = ["ados2","adir","wiscv","vineland3","leiter3","sp2"];

/* ---- i18n köməkçiləri ---- */
function t(key){ var o=D.i18n[key]; return o? (o[LANG]||o.az) : key; }
function L(obj){ return obj? (obj[LANG]||obj.az||"") : ""; }

var BRAND_SUB = { az:"Diaqnostika", ru:"Диагностика", en:"Diagnostics" };

/* sahə izahı şablonları (orijinal, üçdilli) */
var EXPL = {
  ok:{   az:"bu sahədə müşahidə olunan çətinlik yoxdur — güclü tərəf kimi görünür.",
         ru:"в этой области трудностей не наблюдается — выглядит как сильная сторона.",
         en:"no difficulty observed in this area — appears to be a strength." },
  warn:{ az:"yüngül çətinlik müşahidə olunur; məqsədyönlü dəstək faydalı olar.",
         ru:"наблюдаются лёгкие трудности; целенаправленная поддержка будет полезна.",
         en:"mild difficulty observed; targeted support would be helpful." },
  high:{ az:"orta səviyyəli çətinlik var; hədəflənmiş müdaxilə tövsiyə olunur.",
         ru:"умеренные трудности; рекомендуется целенаправленное вмешательство.",
         en:"moderate difficulty; targeted intervention is recommended." },
  crit:{ az:"əhəmiyyətli çətinlik müşahidə olunur; prioritet diqqət lazımdır.",
         ru:"значительные трудности; требуется приоритетное внимание.",
         en:"significant difficulty observed; priority attention is needed." }
};
var DIAG = {
  intro:{ az:"Aşağıdakı sahələrdə daha yüksək çətinlik müşahidə olundu. Bunlar diaqnoz deyil — mütəxəssis üçün diqqət nöqtələridir:",
          ru:"В следующих областях наблюдались более высокие трудности. Это не диагноз, а точки внимания для специалиста:",
          en:"Higher difficulty was observed in the following areas. These are not a diagnosis — they are points of attention for the specialist:" },
  none:{  az:"Müşahidə bəndləri üzrə əhəmiyyətli çətinlik qeyd olunmadı. Yenə də klinik mülahizə və rəsmi bal əsasdır.",
          ru:"По пунктам наблюдения значительных трудностей не отмечено. Тем не менее основой остаются клиническое суждение и официальный балл.",
          en:"No significant difficulty was flagged across the observation items. Clinical judgment and the official score remain primary." }
};

/* ---- SVG ikonlar ---- */
var ICON = {
  shield:'<path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  report:'<rect x="5" y="3" width="14" height="18" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  clock:'<circle cx="12" cy="12" r="8.2" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.5V12l3 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  share:'<circle cx="6" cy="12" r="2.4" stroke="currentColor" stroke-width="1.7"/><circle cx="18" cy="6" r="2.4" stroke="currentColor" stroke-width="1.7"/><circle cx="18" cy="18" r="2.4" stroke="currentColor" stroke-width="1.7"/><path d="M8.1 11l7.8-3.6M8.1 13l7.8 3.6" stroke="currentColor" stroke-width="1.7"/>',
  globe:'<circle cx="12" cy="12" r="8.2" stroke="currentColor" stroke-width="1.7"/><path d="M3.8 12h16.4M12 3.8c2.2 2.3 3.3 5.1 3.3 8.2S14.2 17.9 12 20.2C9.8 17.9 8.7 15.1 8.7 12S9.8 6.1 12 3.8z" stroke="currentColor" stroke-width="1.7"/>',
  heart:'<path d="M12 20s-7-4.4-7-9.5A4.2 4.2 0 0112 8a4.2 4.2 0 017 2.5C19 15.6 12 20 12 20z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  book:'<path d="M5 4h9a3 3 0 013 3v13a3 3 0 00-3-3H5z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  gauge:'<path d="M5 18a8 8 0 1114 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M12 18l4-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  user:'<circle cx="12" cy="8" r="3.4" stroke="currentColor" stroke-width="1.7"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  badge:'<circle cx="12" cy="9" r="5" stroke="currentColor" stroke-width="1.7"/><path d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="2.7" stroke="currentColor" stroke-width="1.7"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  back:'<path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  wa:'<path d="M3 21l1.6-4A8 8 0 1112 20a8 8 0 01-4-1l-5 2z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  dl:'<path d="M12 4v10m0 0l-4-4m4 4l4-4M5 19h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  print:'<path d="M7 8V4h10v4M7 18H5a2 2 0 01-2-2v-4a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2h-2M7 14h10v6H7z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  edit:'<path d="M4 20h4L18 10l-4-4L4 16v4z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  chev:'<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>'
};
function svg(name, cls){ return '<svg viewBox="0 0 24 24" fill="none"'+(cls?' class="'+cls+'"':'')+'>'+ICON[name]+'</svg>'; }

/* ============ STATİK MƏTNLƏRİN TƏTBİQİ ============ */
function applyStatic(){
  document.documentElement.lang = LANG;
  document.title = t("site_title");
  var els = document.querySelectorAll("[data-i18n]");
  for(var i=0;i<els.length;i++){
    var k = els[i].getAttribute("data-i18n");
    if(!k) continue;
    if(k==="brand"){ els[i].innerHTML = t("brand")+'<small>'+BRAND_SUB[LANG]+'</small>'; }
    else els[i].textContent = t(k);
  }
  var yr=document.getElementById("yr"); if(yr) yr.textContent=new Date().getFullYear();
}

/* ============ NAVİQASİYA ============ */
function buildNav(){
  var nav=document.getElementById("navLinks"); nav.innerHTML="";
  var home=document.createElement("button");
  home.textContent=t("nav_home"); home.setAttribute("data-nav","home");
  home.onclick=function(){ go("home"); };
  nav.appendChild(home);
  ORDER.forEach(function(id){
    var b=document.createElement("button");
    b.textContent=D.tests[id].name; b.setAttribute("data-nav",id);
    b.onclick=function(){ go("test",id); };
    nav.appendChild(b);
  });
  markNav();
}
function markNav(){
  var key = CUR.view==="home" ? "home" : CUR.test;
  var bs=document.querySelectorAll("#navLinks button");
  for(var i=0;i<bs.length;i++) bs[i].classList.toggle("active", bs[i].getAttribute("data-nav")===key);
}
function go(view, testId){
  CUR.view=view; if(testId) CUR.test=testId;
  document.getElementById("navLinks").classList.remove("open");
  document.getElementById("view-home").classList.toggle("active", view==="home");
  document.getElementById("view-test").classList.toggle("active", view==="test");
  if(view==="test"){ CUR.mode="form"; renderTestPage(CUR.test); }
  markNav();
  window.scrollTo({top:0,behavior:"smooth"});
}
window.go = go;

/* ============ ANA SƏHİFƏ ============ */
function renderHome(){
  var grid=document.getElementById("testGrid"); grid.innerHTML="";
  ORDER.forEach(function(id){
    var x=D.tests[id];
    var c=document.createElement("div"); c.className="card rv";
    c.onclick=function(){ go("test",id); };
    c.innerHTML=
      '<div class="card-img" style="background-image:url(\'images/'+IMG[id]+'\')"><span class="card-badge">'+x.name+'</span></div>'+
      '<div class="card-body">'+
        '<h3>'+L(x.full).split(",")[0]+'</h3>'+
        '<div class="full">'+x.name+'</div>'+
        '<p class="desc">'+L(x.summary)+'</p>'+
        '<div class="meta">'+
          '<span class="chip">'+svg("clock")+L(x.age)+'</span>'+
          '<span class="chip">'+svg("list")+x.domains.length+' '+t("areas")+'</span>'+
        '</div>'+
        '<button class="btn btn-primary">'+t("open_test")+svg("arrow")+'</button>'+
      '</div>';
    grid.appendChild(c);
  });
  var wg=document.getElementById("whyGrid"); wg.innerHTML="";
  D.why.forEach(function(w){
    var el=document.createElement("div"); el.className="why-card rv";
    el.innerHTML='<div class="why-ic">'+svg(w.icon)+'</div><h3>'+L(w.t)+'</h3><p>'+L(w.d)+'</p>';
    wg.appendChild(el);
  });
  observeReveal();
}

/* ============ TEST SƏHİFƏSİ ============ */
function renderTestPage(id){
  var x=D.tests[id];
  if(!STATE.obs[id]) STATE.obs[id]={};
  if(!STATE.official[id]) STATE.official[id]={};
  if(!STATE.form[id]) STATE.form[id]={};
  var ins=x.instruction;
  var html='<div class="tp">'+
    '<button class="back" onclick="go(\'home\')">'+svg("back")+t("back")+'</button>'+
    '<div class="tp-hero"><div class="tp-hero-bg" style="background-image:url(\'images/'+IMG[id]+'\')"></div>'+
      '<div class="tp-hero-in">'+
        '<div class="tag">'+x.name+'</div>'+
        '<h2>'+L(x.full)+'</h2>'+
        '<p class="sum">'+L(x.summary)+'</p>'+
        '<span class="ages">'+svg("clock")+L(x.age)+'</span>'+
      '</div></div>';

  /* təlimat */
  html+='<div class="panel"><div class="panel-head"><span class="pic">'+svg("book")+'</span>'+
    '<div><h3>'+t("howto")+'</h3><div class="sub">'+x.name+'</div></div></div>'+
    '<div class="instr">'+
      instrCol("howto", ins.howto)+
      instrCol("methods", ins.methods)+
      instrCol("scoring", ins.scoring)+
    '</div></div>';

  /* uşaq + mütəxəssis */
  html+='<div class="panel"><div class="panel-head"><span class="pic">'+svg("user")+'</span><h3>'+t("child_info")+'</h3></div>'+
    '<div class="form-grid">'+
      field(id,"name","f_name")+field(id,"surname","f_surname")+
      field(id,"age","f_age","number")+ '<div></div>'+
    '</div>'+
    '<div class="panel-head" style="margin-top:8px"><span class="pic">'+svg("badge")+'</span><h3>'+t("spec_info")+'</h3></div>'+
    '<div class="form-grid">'+
      field(id,"sname","f_spec_name")+field(id,"ssurname","f_spec_surname")+
      profField(id)+
      '<div class="field full-w"><label>'+t("f_wa")+'</label><input id="f_wa" placeholder="'+t("f_wa_ph")+'" value="'+(STATE.form[id].wa||"")+'"></div>'+
    '</div></div>';

  /* rəsmi ballar */
  html+='<div class="panel"><div class="panel-head"><span class="pic">'+svg("gauge")+'</span><h3>'+t("official_kicker")+'</h3></div>'+
    '<div class="off-note">'+t("official_note")+'</div><div class="off-grid">';
  x.official.forEach(function(o,i){
    html+='<div class="off-box"><label>'+L(o.label)+'</label><div class="hint">'+L(o.hint)+'</div>'+
      '<input data-off="'+i+'" value="'+(STATE.official[id][i]||"")+'" oninput="OFF(\''+id+'\','+i+',this.value)"></div>';
  });
  html+='</div></div>';

  /* müşahidə sahələri */
  html+='<div class="panel"><div class="panel-head"><span class="pic">'+svg("eye")+'</span><h3>'+t("obs_kicker")+'</h3></div>'+
    '<div class="obs-note">'+t("obs_note")+'</div>';
  x.domains.forEach(function(d,di){
    html+='<div class="domain'+(di===0?" open":"")+'" data-dom="'+d.id+'">'+
      '<div class="domain-h" onclick="this.parentNode.classList.toggle(\'open\')">'+
        '<span class="ix">'+(di+1)+'</span><h4>'+L(d.title)+'</h4>'+
        '<span class="cnt">'+d.items.length+'</span><span class="chev">'+svg("chev")+'</span></div>'+
      '<div class="domain-body">';
    d.items.forEach(function(it){
      var cur=STATE.obs[id][it.id];
      html+='<div class="item"><p>'+L(it.t)+'</p><div class="opts">';
      for(var v=0;v<4;v++){
        var sel=(cur===v)?" sel":"";
        html+='<button class="opt'+sel+'" data-v="'+v+'" onclick="PICK(\''+id+'\',\''+it.id+'\','+v+',this)">'+L(D.scale[v])+'</button>';
      }
      html+='</div></div>';
    });
    html+='</div></div>';
  });
  html+='</div>'; /* panel sonu */

  /* run-bar */
  html+='<div class="run-bar"><div class="wrap run-in">'+
    '<div class="prog"><div class="prog-track"><div class="prog-fill" id="progFill"></div></div>'+
    '<div class="prog-lbl" id="progLbl"></div></div>'+
    '<button class="btn btn-primary" onclick="RESULT(\''+id+'\')">'+t("show_result")+svg("arrow")+'</button>'+
    '</div></div>';

  html+='</div>'; /* tp sonu */
  document.getElementById("testPage").innerHTML=html;
  updateProgress(id);
}
function instrCol(key, arr){
  var li=""; arr.forEach(function(s){ li+="<li>"+L(s)+"</li>"; });
  return '<div class="instr-col"><h4>'+t(key)+'</h4><ul>'+li+'</ul></div>';
}
function field(id,fk,labelKey,type){
  return '<div class="field"><label>'+t(labelKey)+'</label><input '+(type?'type="'+type+'" ':'')+
    'data-f="'+fk+'" value="'+(STATE.form[id][fk]||"")+'" oninput="FRM(\''+id+'\',\''+fk+'\',this.value)"></div>';
}
function profField(id){
  var opts='<option value="">—</option>';
  D.professions.forEach(function(p,i){
    var sel=(STATE.form[id].prof==String(i))?" selected":"";
    opts+='<option value="'+i+'"'+sel+'>'+L(p)+'</option>';
  });
  return '<div class="field"><label>'+t("f_profession")+'</label><select data-f="prof" onchange="FRM(\''+id+'\',\'prof\',this.value)">'+opts+'</select></div>';
}

/* ---- input handler-lər ---- */
window.PICK=function(id,itemId,v,btn){
  STATE.obs[id][itemId]=v;
  var sib=btn.parentNode.querySelectorAll(".opt");
  for(var i=0;i<sib.length;i++) sib[i].classList.remove("sel");
  btn.classList.add("sel");
  updateProgress(id);
};
window.OFF=function(id,i,val){ STATE.official[id][i]=val; };
window.FRM=function(id,fk,val){ STATE.form[id][fk]=val; };
function captureWA(id){ var w=document.getElementById("f_wa"); if(w) STATE.form[id].wa=w.value; }

function totalItems(id){ return D.tests[id].domains.reduce(function(a,d){return a+d.items.length;},0); }
function answered(id){ return Object.keys(STATE.obs[id]||{}).length; }
function updateProgress(id){
  var tot=totalItems(id), got=answered(id), pct=tot?Math.round(got/tot*100):0;
  var f=document.getElementById("progFill"), l=document.getElementById("progLbl");
  if(f) f.style.width=pct+"%";
  if(l) l.textContent=got+"/"+tot+" — "+pct+"% "+t("progress");
}

/* ============ BAND MƏNTİQİ ============ */
function bandFor(avg){ if(avg<0.6)return"ok"; if(avg<1.4)return"warn"; if(avg<2.2)return"high"; return"crit"; }
var BANDLBL={ok:"band_ok",warn:"band_warn",high:"band_high",crit:"band_crit"};
var BANDPCT={ok:18,warn:45,high:72,crit:95};
var BANDCOL={ok:"var(--sage)",warn:"var(--gold)",high:"#D98324",crit:"var(--bordo)"};

function domainStats(id){
  var x=D.tests[id], out=[];
  x.domains.forEach(function(d){
    var sum=0,n=0;
    d.items.forEach(function(it){ var v=STATE.obs[id][it.id]; if(v!==undefined){sum+=v;n++;} });
    if(n>0){ var avg=sum/n; out.push({title:L(d.title), avg:avg, band:bandFor(avg), n:n}); }
  });
  return out;
}

/* ============ NƏTİCƏ ============ */
window.RESULT=function(id){
  captureWA(id);
  if(answered(id)<3){ alert(t("fill_more")); return; }
  CUR.mode="result";
  var x=D.tests[id], f=STATE.form[id];
  var child=((f.name||"")+" "+(f.surname||"")).trim();
  var spec=((f.sname||"")+" "+(f.ssurname||"")).trim();
  var prof=(f.prof!==undefined&&f.prof!=="")?L(D.professions[+f.prof]):"";
  var who=[]; if(child)who.push(child+(f.age?" · "+f.age:"")); if(spec)who.push(spec+(prof?" ("+prof+")":""));
  var stats=domainStats(id);

  var html='<div class="result"><button class="back" onclick="BACK(\''+id+'\')">'+svg("back")+t("back")+'</button>'+
    '<div class="res-head"><div class="seal">'+svg("check")+'</div>'+
      '<h2>'+t("result_title")+'</h2><div class="who">'+x.name+(who.length?" · "+who.join(" · "):"")+'</div></div>';

  /* rəsmi ballar */
  var offTags="";
  x.official.forEach(function(o,i){ var v=STATE.official[id][i]; if(v) offTags+='<div class="off-tag">'+L(o.label)+': <b>'+v+'</b></div>'; });
  if(offTags) html+='<div class="res-sec"><div class="rh">'+t("res_official")+'</div><div class="off-tags">'+offTags+'</div></div>';

  /* sahə xülasəsi */
  html+='<div class="res-sec panel" style="padding:22px 24px"><div class="rh">'+t("res_domains")+'</div>';
  stats.forEach(function(s){
    html+='<div class="dom-row"><span class="dn">'+s.title+'</span>'+
      '<span class="bar"><i style="width:'+BANDPCT[s.band]+'%;background:'+BANDCOL[s.band]+'"></i></span>'+
      '<span class="badge '+s.band+'">'+t(BANDLBL[s.band])+'</span></div>';
  });
  html+='</div>';

  /* diaqnostik mülahizələr */
  var flagged=stats.filter(function(s){return s.band==="high"||s.band==="crit";});
  html+='<div class="res-sec panel" style="padding:22px 24px"><div class="rh">'+t("res_diag")+'</div>';
  if(flagged.length){
    html+='<p class="explain">'+DIAG.intro[LANG]+'</p><ul class="rec-list" style="margin-top:10px">';
    flagged.forEach(function(s){ html+='<li><b>'+s.title+'</b> — '+EXPL[s.band][LANG]+'</li>'; });
    html+='</ul>';
  } else { html+='<p class="explain">'+DIAG.none[LANG]+'</p>'; }
  html+='<div class="disc">'+t("disclaimer")+'</div></div>';

  /* mütəxəssisə tövsiyələr */
  html+='<div class="res-sec panel" style="padding:22px 24px"><div class="rh">'+t("res_spec")+'</div><ul class="rec-list">';
  x.specialist.forEach(function(s){ html+="<li>"+L(s)+"</li>"; });
  html+='</ul></div>';

  /* valideynə */
  html+='<div class="res-sec parent-box"><div class="rh">'+t("res_parent")+'</div>'+
    '<p class="explain" style="margin-bottom:12px">'+L(x.parentIntro)+'</p><ul class="rec-list">';
  x.parentTips.forEach(function(s){ html+="<li>"+L(s)+"</li>"; });
  html+='</ul></div>';

  /* oyunlar */
  html+='<div class="games-box"><div class="rh">'+t("res_games")+'</div><ul class="rec-list">';
  x.games.forEach(function(s){ html+="<li>"+L(s)+"</li>"; });
  html+='</ul></div>';

  /* düymələr */
  html+='<div class="rep-actions">'+
    '<button class="btn btn-wa" onclick="WA(\''+id+'\')">'+svg("wa")+t("send_wa")+'</button>'+
    '<button class="btn btn-gold" onclick="SAVE(\''+id+'\')">'+svg("dl")+t("save_report")+'</button>'+
    '<button class="btn btn-ghost" onclick="window.print()">'+svg("print")+t("print_pdf")+'</button>'+
    '<button class="btn btn-ghost" onclick="BACK(\''+id+'\')">'+svg("edit")+t("edit_again")+'</button>'+
    '</div></div>';

  LAST_REPORT_TEXT=buildPlainReport(id,child,spec,prof,stats,flagged);
  document.getElementById("testPage").innerHTML=html;
  window.scrollTo({top:0,behavior:"smooth"});
};
window.BACK=function(id){ CUR.mode="form"; renderTestPage(id); };

/* ============ MƏTN HESABAT (WhatsApp/yükləmə) ============ */
function buildPlainReport(id,child,spec,prof,stats,flagged){
  var x=D.tests[id], s="*"+t("center_full")+"*\n"+t("result_title")+" — "+x.name+"\n"+L(x.full)+"\n\n";
  if(child) s+="👤 "+child+"\n";
  if(spec)  s+="🩺 "+spec+(prof?" ("+prof+")":"")+"\n";
  var off=[]; x.official.forEach(function(o,i){ var v=STATE.official[id][i]; if(v) off.push(L(o.label)+": "+v); });
  if(off.length) s+="\n📊 "+t("res_official")+":\n- "+off.join("\n- ")+"\n";
  s+="\n📋 "+t("res_domains")+":\n";
  stats.forEach(function(d){ s+="- "+d.title+": "+t(BANDLBL[d.band])+"\n"; });
  if(flagged.length){ s+="\n⚠️ "+t("res_diag")+":\n"; flagged.forEach(function(d){ s+="- "+d.title+" — "+EXPL[d.band][LANG]+"\n"; }); }
  s+="\n👪 "+t("res_parent")+":\n"; x.parentTips.forEach(function(p){ s+="- "+L(p)+"\n"; });
  s+="\n🎲 "+t("res_games")+":\n"; x.games.forEach(function(g){ s+="- "+L(g)+"\n"; });
  s+="\n_"+t("disclaimer")+"_";
  return s;
}
window.WA=function(id){
  captureWA(id);
  var num=(STATE.form[id].wa||"").replace(/[^0-9]/g,"");
  if(!num) num="994554157215";
  window.open("https://wa.me/"+num+"?text="+encodeURIComponent(LAST_REPORT_TEXT),"_blank");
};
window.SAVE=function(id){
  var x=D.tests[id];
  var body=LAST_REPORT_TEXT.replace(/\*/g,"").replace(/_/g,"").replace(/\n/g,"<br>");
  var doc='<!DOCTYPE html><html lang="'+LANG+'"><head><meta charset="UTF-8"><title>'+t("result_title")+" — "+x.name+'</title>'+
    '<style>body{font-family:Segoe UI,Arial,sans-serif;max-width:760px;margin:34px auto;padding:0 22px;color:#1a1525;line-height:1.7}'+
    'h1{font-size:22px;color:#6A0000}.disc{margin-top:24px;padding:14px;background:#f5efe6;border-radius:10px;font-size:13px;color:#5b5550}</style></head>'+
    '<body><h1>'+t("center_full")+'</h1><div>'+body+'</div></body></html>';
  var blob=new Blob([doc],{type:"text/html"});
  var a=document.createElement("a"); a.href=URL.createObjectURL(blob);
  a.download=(x.name+"_"+(STATE.form[id].surname||"hesabat")).replace(/\s+/g,"_")+".html";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
};

/* ============ SCROLL EFEKTLƏRİ ============ */
var io;
function observeReveal(){
  if(!("IntersectionObserver" in window)){ document.querySelectorAll(".rv").forEach(function(e){e.classList.add("in");}); return; }
  if(io) io.disconnect();
  io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }); },{threshold:.12});
  document.querySelectorAll(".rv:not(.in)").forEach(function(e){ io.observe(e); });
}
function parallax(){
  var y=window.scrollY; if(y>820) return;
  var bg=document.getElementById("heroBg"), ph=document.getElementById("heroPhoto");
  if(bg) bg.style.transform="translateY("+(y*0.18)+"px)";
  if(ph) ph.style.transform="translateY("+(y*0.34)+"px) scale(1.04)";
}

/* hero üzərində uçuşan ikonlar + hissəciklər */
var FLY=[
  {ic:"brain", t:14, l:60, s:58, d:5.2},
  {ic:"puzzle",t:30, l:86, s:46, d:6.4},
  {ic:"blocks",t:58, l:78, s:52, d:5.8},
  {ic:"heart", t:72, l:58, s:40, d:6.0},
  {ic:"chat",  t:22, l:50, s:42, d:7.0},
  {ic:"star",  t:50, l:92, s:36, d:5.4},
  {ic:"abc",   t:78, l:84, s:44, d:6.6}
];
var FLYIC={
  brain:'<path d="M9 4a3 3 0 00-3 3 3 3 0 00-1.5 5.6A3 3 0 006 18a3 3 0 003 2V4z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M15 4a3 3 0 013 3 3 3 0 011.5 5.6A3 3 0 0118 18a3 3 0 01-3 2V4z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
  puzzle:'<path d="M10 4h4v2.5a1.5 1.5 0 103 0V4h2a1 1 0 011 1v3.5a1.5 1.5 0 100 3V19a1 1 0 01-1 1h-3.5a1.5 1.5 0 11-3 0H6a1 1 0 01-1-1v-4a1.5 1.5 0 100-3V5a1 1 0 011-1h2.5a1.5 1.5 0 113 0z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
  blocks:'<rect x="4" y="11" width="8" height="8" rx="1.4" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="13" width="6.5" height="6.5" rx="1.2" stroke="currentColor" stroke-width="1.5"/><path d="M8 11V6.5L11 4l3 2.5V11" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  heart:'<path d="M12 20s-7-4.4-7-9.5A4.2 4.2 0 0112 8a4.2 4.2 0 017 2.5C19 15.6 12 20 12 20z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  chat:'<path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H9l-4 4v-4H6a2 2 0 01-2-2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 9h8M8 12h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  star:'<path d="M12 3.5l2.5 5.3 5.8.7-4.3 4 1.1 5.7-5.1-2.8-5.1 2.8 1.1-5.7-4.3-4 5.8-.7z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
  abc:'<path d="M4 17l2.5-7L9 17M4.8 14.5h3.4M13 17V9h2.2a2 2 0 010 4H13m0 0h2.6a2 2 0 010 4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
};
function decorateHero(){
  var box=document.getElementById("heroFly"); if(!box) return;
  var h="";
  FLY.forEach(function(f,i){
    h+='<div class="fly" style="top:'+f.t+'%;left:'+f.l+'%;width:'+f.s+'px;height:'+f.s+'px;'+
       'animation-duration:'+f.d+'s;animation-delay:'+(-i*0.5)+'s">'+
       '<svg viewBox="0 0 24 24" fill="none">'+FLYIC[f.ic]+'</svg></div>';
  });
  for(var p=0;p<20;p++){
    var sz=(Math.random()*5+3).toFixed(1);
    h+='<div class="particle" style="left:'+(Math.random()*100).toFixed(1)+'%;top:'+(100+Math.random()*15).toFixed(0)+'%;'+
       'width:'+sz+'px;height:'+sz+'px;animation-duration:'+(Math.random()*10+9).toFixed(1)+'s;'+
       'animation-delay:'+(-Math.random()*14).toFixed(1)+'s"></div>';
  }
  box.innerHTML=h;
}

/* ============ DİL KEÇİDİ ============ */
function setLang(l){
  if(l===LANG) return;
  if(CUR.view==="test") captureWA(CUR.test);
  LANG=l;
  var bs=document.querySelectorAll("#langSwitch button");
  for(var i=0;i<bs.length;i++) bs[i].classList.toggle("active", bs[i].getAttribute("data-lang")===l);
  applyStatic(); buildNav(); renderHome();
  if(CUR.view==="test"){
    if(CUR.mode==="result") window.RESULT(CUR.test);
    else renderTestPage(CUR.test);
  }
}

/* ============ BAŞLAT ============ */
function init(){
  applyStatic();
  buildNav();
  renderHome();
  decorateHero();
  var bs=document.querySelectorAll("#langSwitch button");
  for(var i=0;i<bs.length;i++)(function(b){ b.onclick=function(){ setLang(b.getAttribute("data-lang")); }; })(bs[i]);
  window.addEventListener("scroll", parallax, {passive:true});
  observeReveal();
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", init);
else init();
})();
