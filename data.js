/* =====================================================================
   QİYMƏTLƏNDİRMƏ MƏRKƏZİ — Test məlumat bazası
   Qeyd: Bütün müşahidə bəndləri orijinaldır və mütəxəssis üçün
   dəstəkləyici müşahidə vasitəsidir. Rəsmi standart ballar mərkəzin
   lisenziyalı dəstindən daxil edilir. Bu, müəllif hüquqlu test
   maddələrinin köçürülməsi DEYİL.
   ===================================================================== */

/* qiymətləndirmə şkalası (bütün testlər üçün vahid):
   0 = çətinlik müşahidə olunmur / gözlənilən səviyyə
   1 = yüngül çətinlik
   2 = orta səviyyə çətinlik
   3 = əhəmiyyətli çətinlik                                            */

const PROFESSIONS = ["Klinik psixoloq","Psixoloq","Loqoped","Erqoterapevt","Xüsusi pedaqoq (defektoloq)","Uşaq psixiatrı","Neyropsixoloq","Reabilitoloq"];

const WHY = [
  {ic:"badge", t:"Sertifikatlı mütəxəssislər", d:"Bütün qiymətləndirmələr diplomlu və müvafiq sertifikata malik mütəxəssislər tərəfindən aparılır."},
  {ic:"layers", t:"Altı alət bir yerdə", d:"Avtizm, idrak, adaptiv davranış və sensor emal — fərqli sahələr vahid sistemdə birləşir."},
  {ic:"chart", t:"Avtomatik hesabat", d:"Qiymətləndirmə bitən kimi domen üzrə xülasə, izah və tövsiyələr hazır olur."},
  {ic:"family", t:"Valideyn dilində", d:"Hər hesabatda valideynin başa düşəcəyi dildə nə etməli olduğu, oyun və fəaliyyət nümunələri verilir."},
  {ic:"share", t:"WhatsApp paylaşımı", d:"Hesabat bir toxunuşla valideynin WhatsApp hesabına göndərilə bilər."},
  {ic:"shield", t:"Etibarlı və qanuni", d:"Sistem rəsmi lisenziyalı dəsti əvəz etmir, mütəxəssisin işini sənədləşdirir və asanlaşdırır."}
];

/* Hər test:
   id, name, full, age, color, summary, advantages[],
   instruction:{howto[], methods[], scoring[]},
   official:[{id,label,ph}]   -> rəsmi standart bal xanaları
   domains:[{id,name,hint,items[]}]
   guide: { domainId: {focus:[], parentIntro, parentTips[], games:[{e,t,d}] } }
   considerations: (band-lərə görə mətn funksiyası app.js-də)                 */

const TESTS = {

/* ---------------------------------------------------------------- ADOS-2 */
ados2:{
  id:"ados2", name:"ADOS-2", full:"Autism Diagnostic Observation Schedule, İkinci nəşr",
  age:"12 aylıqdan böyüklərə (modullar üzrə)",
  summary:"Avtizm spektrini birbaşa müşahidə yolu ilə qiymətləndirən yarı-strukturlaşdırılmış alət. Mütəxəssis uşağı planlı oyun və ünsiyyət situasiyalarında müşahidə edir.",
  advantages:["Birbaşa müşahidəyə əsaslanır — özünühesabatdan asılı deyil","Yaşa və danışıq səviyyəsinə uyğun beş modul","Sosial ünsiyyət və təkrarlanan davranışları ayrıca ölçür","Beynəlxalq miqyasda avtizm diaqnostikasının “qızıl standartı”"],
  instruction:{
    howto:[
      "Uşağın yaşına və ifadəli dil səviyyəsinə uyğun modulu seçin (T modul, 1–4).",
      "Otaqda diqqəti yayındıran amilləri minimuma endirin, lazımi material və oyuncaqları əvvəlcədən hazırlayın.",
      "Planlaşdırılmış aktivlikləri (birgə oyun, hekayə danışma, sosial təzyiq anları) ardıcıllıqla təqdim edin.",
      "Müşahidə zamanı uşağı yönləndirməyin — təbii reaksiyaları izləyin və qeyd edin."
    ],
    methods:[
      "Yarı-strukturlaşdırılmış müşahidə: müəyyən “press” situasiyaları ilə sosial təşəbbüs yoxlanılır.",
      "Birgə diqqət, göz təması, jest və oyunun keyfiyyəti real vaxtda izlənilir.",
      "Müşahidə bitdikdən sonra kodlaşdırma aparılır (seans zamanı deyil, sonra).",
      "Mümkün olduqda video çəkiliş tövsiyə olunur ki, kodlaşdırma dəqiq olsun."
    ],
    scoring:[
      "Hər müşahidə sahəsi davranışın keyfiyyətinə görə qiymətləndirilir.",
      "Sosial Affekt (SA) və Məhdud/Təkrarlanan Davranış (RRB) sahələri toplanır.",
      "Yekun müqayisə balı rəsmi alqoritm və yaş normaları ilə hesablanır (lisenziyalı dəst tələb olunur).",
      "Nəticə diaqnoz deyil — klinik tabloya inteqrasiya olunan bir mənbədir."
    ]
  },
  official:[
    {id:"sa", label:"Sosial Affekt (SA) xam balı", ph:"məs. 8"},
    {id:"rrb", label:"Məhdud/Təkrar Davranış (RRB) xam balı", ph:"məs. 3"},
    {id:"cs", label:"Müqayisə balı (1–10)", ph:"məs. 6"}
  ],
  domains:[
    {id:"comm", name:"Ünsiyyət", hint:"jest, göz təması, ifadəli dil",
     items:["Tələbatını bildirmək üçün jest və mimikadan istifadə edir","Maraq və hissləri başqası ilə bölüşmək üçün göstərir","Söz və ya səslə qarşılıqlı ünsiyyət qurur","Adı çağırılanda baxır və reaksiya verir","Sual–cavab ritmini saxlayır"]},
    {id:"social", name:"Qarşılıqlı sosial əlaqə", hint:"birgə diqqət, sosial təşəbbüs",
     items:["Göz təması ilə jesti və səsi əlaqələndirir","Mütəxəssisin diqqətini bir obyektə yönəltməyə çalışır","Sosial təbəssümlə cavab verir","Birgə oyuna təşəbbüs göstərir","Başqasının emosiyasına uyğun reaksiya verir"]},
    {id:"play", name:"Oyun və təxəyyül", hint:"simvolik və yaradıcı oyun",
     items:["Oyuncaqlardan təyinatına uyğun istifadə edir","Təxəyyül/rol oyunu nümayiş etdirir","Oyunda çevikdir, dəyişikliyə uyğunlaşır"]},
    {id:"rrb", name:"Məhdud və təkrarlanan davranışlar", hint:"stereotip, maraq dairəsi",
     items:["Təkrarlanan hərəkət və ya səs müşahidə olunur","Dar və qeyri-adi maraqlara fiksasiya var","Rutindəki dəyişikliyə həddən artıq reaksiya verir","Sensor obyektlərə qeyri-adi maraq göstərir"]}
  ],
  guide:{
    comm:{focus:["Funksional ünsiyyət vasitələrini (jest, PECS, AAC) gücləndirin","Tələb bildirmə fürsətlərini gün ərzində planlı şəkildə yaradın"],
      parentIntro:"Uşağınız istəyini sözlə bildirməkdə çətinlik çəkə bilər. Məqsəd onu “danışmağa məcbur etmək” deyil — ünsiyyət istəyini oyatmaqdır.",
      parentTips:["Sevdiyi əşyanı bir az çatmayan yerə qoyun ki, sizdən istəməyə təşəbbüs etsin","Hər jest və səsi cavablandırın — sanki sizə nəsə deyirmiş kimi davranın","Gündəlik işləri sadə sözlərlə adlandırın: “açıq”, “su”, “yenə”"],
      games:[{e:"🫧",t:"Sabun köpükləri",d:"Bir köpük buraxın, sonra gözləyin — uşaq “yenə” istəsin deyə gözlədin. İstək bildirməyi öyrədir."},{e:"🎵",t:"Növbə mahnıları",d:"“Bu kiçik...” kimi mahnıları yarımçıq saxlayıb gözləyin ki, davam etsin."}]},
    social:{focus:["Birgə diqqət təlimlərini gündəlik fəaliyyətə inteqrasiya edin","Üz-üzə pozisiyada qarşılıqlı oyunları artırın"],
      parentIntro:"Birgə diqqət — yəni eyni anda eyni şeyə baxıb sevinci bölüşmək — sosial inkişafın təməlidir.",
      parentTips:["Maraqlı bir şey görəndə barmağınızla göstərib “bax!” deyin və uşağın baxışını izləyin","Güzgü qarşısında birlikdə üz-mimika oyunları oynayın","Uşağın marağına qoşulun, öz oyununuzu ona yükləməyin"],
      games:[{e:"🪞",t:"Güzgü oyunu",d:"Üz ifadələrini bir-birinizdən təkrarlayın — növbə və qarşılıqlılıq hissi yaranır."},{e:"🚗",t:"Ver-al oyunu",d:"Maşını bir-birinizə yuvarladın; göz təması və növbəni gücləndirir."}]},
    play:{focus:["Simvolik oyunu modelləşdirin və tədricən genişləndirin","Oyunda çevikliyi kiçik dəyişikliklərlə məşq etdirin"],
      parentIntro:"Oyun uşağın “təfəkkür laboratoriyasıdır”. Rol oyunu təxəyyülü və dili eyni anda inkişaf etdirir.",
      parentTips:["Kuklanı yedizdirmək, yatızdırmaq kimi sadə süjetlər göstərin","Bir əşyanı başqa şey kimi təqdim edin (qələm = təyyarə)","Uşağın başladığı oyuna yeni bir addım əlavə edin"],
      games:[{e:"🧸",t:"Xəstəxana oyunu",d:"Oyuncağı “müalicə edin” — qayğı və ardıcıllıq süjetini öyrədir."},{e:"🍳",t:"Mətbəx oyunu",d:"Yemək “bişirin” və “təqdim edin”; ardıcıl rol oyununu gücləndirir."}]},
    rrb:{focus:["Stereotip davranışın funksiyasını qiymətləndirin (özünütənzimləmə vs. qaçınma)","Rutin dəyişikliklərini vizual cədvəllə əvvəlcədən hazırlayın"],
      parentIntro:"Təkrarlanan davranışlar çox vaxt uşağı sakitləşdirir. Onları kəskin qadağan etmək yox, alternativ təklif etmək daha effektivdir.",
      parentTips:["Gün cədvəlini şəkillərlə göstərin ki, dəyişiklik gözlənilən olsun","Sakitləşdirici alternativlər təklif edin (sıxma topu, ritmik fəaliyyət)","Keçidləri əvvəlcədən xəbərdar edin: “5 dəqiqədən sonra gedirik”"],
      games:[{e:"🗓️",t:"Vizual cədvəl",d:"Günün gedişatını şəkillərlə düzün; gözlənilməzlik narahatlığını azaldır."},{e:"🧩",t:"Ardıcıllıq oyunları",d:"Rəng/forma ardıcıllıqlarını birlikdə qurun — çevikliyi tədricən artırır."}]}
  }
},

/* ---------------------------------------------------------------- ADI-R */
adir:{
  id:"adir", name:"ADI-R", full:"Autism Diagnostic Interview – Revised",
  age:"Zehni yaşı 2-dən yuxarı uşaq və böyüklər (valideyn müsahibəsi)",
  summary:"Valideyn/qəyyumla aparılan ətraflı strukturlaşdırılmış müsahibə. Uşağın inkişaf tarixçəsini və hazırkı davranışını üç əsas sahədə dərindən araşdırır.",
  advantages:["Uşağın tam inkişaf tarixçəsini əhatə edir","ADOS-2 müşahidəsini ailə məlumatı ilə tamamlayır","Davranışın başlanğıc yaşını dəqiqləşdirir","Müxtəlif şəraitdəki davranışı (ev, məktəb) üzə çıxarır"],
  instruction:{
    howto:[
      "Müsahibəni uşağı yaxşı tanıyan əsas qəyyumla aparın.",
      "Sakit, kənar müdaxiləsiz mühit seçin; kifayət qədər vaxt ayırın (adətən 1.5–2.5 saat).",
      "Sualları konkret nümunələrə yönəldin: “Bu nə vaxt başladı?”, “Bir nümunə deyə bilərsiniz?”.",
      "Həm 4–5 yaş dövrünü, həm də hazırkı davranışı ayrıca qeyd edin."
    ],
    methods:[
      "Strukturlaşdırılmış, lakin söhbət tərzində aparılan müsahibə.",
      "Davranışın tezliyi, forması və kontekstinə dair dəqiq misallar toplanır.",
      "Cavablar mütəxəssis tərəfindən kodlaşdırılır, valideynin sözləri ilə deyil.",
      "Diqqət: təsvir olunan davranışın özü qiymətləndirilir, valideynin şərhi yox."
    ],
    scoring:[
      "Üç sahə — Ünsiyyət, Sosial qarşılıqlılıq, Təkrarlanan davranış — ayrıca toplanır.",
      "Başlanğıc/inkişaf meyarı da nəzərə alınır.",
      "Diaqnostik alqoritm rəsmi protokol və hədd ballarına əsaslanır (lisenziyalı dəst).",
      "Nəticə klinik tabloya inteqrasiya olunur, tək başına diaqnoz qoymur."
    ]
  },
  official:[
    {id:"soc", label:"Sosial qarşılıqlılıq alqoritm balı", ph:"məs. 14"},
    {id:"comm", label:"Ünsiyyət alqoritm balı", ph:"məs. 9"},
    {id:"rrb", label:"Təkrarlanan davranış alqoritm balı", ph:"məs. 5"}
  ],
  domains:[
    {id:"comm", name:"Dil və ünsiyyət", hint:"ifadəli/qəbuledici dil, söhbət",
     items:["İlk sözlər və cümlələr yaşa uyğun yaranıb","Qarşılıqlı söhbəti başladır və davam etdirir","Sözləri təkrarlama (exolaliya) müşahidə olunub","Jest və mimikanı danışıqla əlaqələndirir","Keçmişdə dil bacarıqlarında geriləmə olub"]},
    {id:"social", name:"Qarşılıqlı sosial əlaqə", hint:"yaşıdlarla əlaqə, emosional paylaşım",
     items:["Yaşıdları ilə dostluq qurmağa maraq göstərir","Sevinc və nailiyyəti başqaları ilə bölüşür","Başqalarının hisslərinə qarşı həssasdır","Sosial təbəssüm və göz təması yaşa uyğundur","Təsəlli axtarır və ya təsəlli verir"]},
    {id:"rrb", name:"Məhdud, təkrarlanan davranış", hint:"rituallar, dar maraqlar",
     items:["Müəyyən rituallara və ya ardıcıllığa təkidlə bağlıdır","Qeyri-adi dərəcədə intensiv, dar maraqları var","Təkrarlanan motor hərəkətlər (əl çırpma, fırlanma) olub","Əşyaların hissələrinə qeyri-adi maraq göstərir","Dəyişikliyə güclü müqavimət göstərir"]}
  ],
  guide:{
    comm:{focus:["Qəbuledici və ifadəli dil arasındakı fərqi dəqiqləşdirin","Exolaliyanın funksional istifadəyə yönləndirilməsini planlayın"],
      parentIntro:"Dil təkcə danışmaq deyil — başa düşmək, jestlə bildirmək və söhbəti davam etdirməkdir.",
      parentTips:["Uşağın dediyini düzəltmək əvəzinə genişləndirin: “maşın” → “bəli, qırmızı maşın”","Gün ərzində gördüklərinizi sadə cümlələrlə şərh edin","Kitab oxuyarkən şəkilləri barmaqla göstərib adlandırın"],
      games:[{e:"📖",t:"Şəkilli kitab",d:"Hər səhifədə “bu nədir?” soruşub gözləyin; lüğəti və növbəni gücləndirir."},{e:"🗣️",t:"Cümlə genişləndirmə",d:"Uşağın sözünü götürüb bir-iki söz əlavə edin."}]},
    social:{focus:["Strukturlaşdırılmış yaşıd qarşılıqlılığı imkanları yaradın","Emosiya tanıma və adlandırma üzərində işləyin"],
      parentIntro:"Sosial bacarıqlar da oyun kimi öyrənilir. Kiçik, idarə olunan qruplar böyük izdihamdan daha effektivdir.",
      parentTips:["Bir-iki uşaqla qısa, planlı oyun görüşləri təşkil edin","Emosiya kartları ilə “bu necə hiss edir?” oyunları oynayın","Növbə tələb edən sadə masaüstü oyunlar seçin"],
      games:[{e:"😊",t:"Emosiya kartları",d:"Üz ifadələrini tanıyıb adlandırın və oxşar hadisə danışın."},{e:"🎲",t:"Növbəli oyun",d:"Sadə zər oyunu ilə gözləməyi və növbəni məşq edin."}]},
    rrb:{focus:["Marağı öyrənmə körpüsünə çevirin (maraq mövzusu ilə fəaliyyəti bağlayın)","Keçidlər üçün vizual dəstək sistemi qurun"],
      parentIntro:"Dar maraqlar düşmən deyil — düzgün istiqamətləndirilsə, güclü motivasiya mənbəyidir.",
      parentTips:["Sevdiyi mövzunu riyaziyyat, oxu kimi fəaliyyətlərə daxil edin","Dəyişiklikləri əvvəlcədən və sakitcə xəbər verin","Ritualları kəskin kəsmək yerinə tədricən çevikləşdirin"],
      games:[{e:"⏳",t:"Qum saatı",d:"Keçidləri qum saatı ilə görünən edin; gözləməni asanlaşdırır."},{e:"🧱",t:"Tikinti oyunu",d:"Plan üzrə tikin, sonra birlikdə kiçik dəyişiklik edin."}]}
  }
},

/* ---------------------------------------------------------------- WISC-V */
wiscv:{
  id:"wiscv", name:"WISC-V", full:"Wechsler Intelligence Scale for Children, 5-ci nəşr",
  age:"6 yaşdan 16 yaşadək",
  summary:"Uşağın idrak qabiliyyətini beş əsas sahədə ölçən geniş yayılmış intellekt testi. Güclü və zəif idrak profilini ortaya qoyur.",
  advantages:["Geniş və müasir normativ baza","Beş ayrı indeks — detallı idrak profili","Ümumi İQ (FSIQ) və sahə-spesifik ballar","Təhsil və müdaxilə planlaması üçün dəyərli"],
  instruction:{
    howto:[
      "Sakit, işıqlı mühitdə fərdi şəkildə keçirin; uşağın yorğun olmadığına əmin olun.",
      "Subtestləri rəsmi ardıcıllıqla təqdim edin; təlimatları dəyişdirmədən oxuyun.",
      "Vaxt tələb edən subtestlərdə saniyəölçəndən düzgün istifadə edin.",
      "Uşağı həvəsləndirin, lakin konkret cavaba yönləndirməyin."
    ],
    methods:[
      "Beş əsas indeks 7 əsas subtestlə ölçülür; tamamlayıcı subtestlər lazım olduqda əlavə edilir.",
      "Hər subtestdə başlanğıc nöqtəsi və dayanma qaydası (ceiling) gözlənilir.",
      "Xam ballar yaşa görə standart ballara çevrilir.",
      "Müşahidə qeydləri (yanaşma, diqqət, narahatlıq) keyfiyyət təhlili üçün vacibdir."
    ],
    scoring:[
      "Hər subtestin xam balı şkala balına (1–19) çevrilir.",
      "İndekslər və FSIQ rəsmi normativ cədvəllərlə hesablanır (lisenziyalı dəst).",
      "İndekslər arası fərqlər (güclü/zəif sahələr) təhlil edilir.",
      "Bal təkcə rəqəm deyil — profilin mənası klinik kontekstdə şərh olunur."
    ]
  },
  official:[
    {id:"fsiq", label:"Ümumi İQ (FSIQ)", ph:"məs. 98"},
    {id:"vci", label:"Verbal Anlama (VCI)", ph:"məs. 102"},
    {id:"vsi", label:"Vizual-Məkan (VSI)", ph:"məs. 95"},
    {id:"fri", label:"Maye Mühakimə (FRI)", ph:"məs. 100"},
    {id:"wmi", label:"İşlək Yaddaş (WMI)", ph:"məs. 88"},
    {id:"psi", label:"Emal Sürəti (PSI)", ph:"məs. 91"}
  ],
  domains:[
    {id:"vci", name:"Verbal Anlama", hint:"söz biliyi, mücərrəd düşüncə",
     items:["Sözlərin mənasını yaşına uyğun izah edir","İki anlayış arasındakı oxşarlığı tapır","Ümumi məlumat suallarına cavab verir","Fikrini sözlə aydın ifadə edir"]},
    {id:"vsi", name:"Vizual-Məkan", hint:"məkan münasibətləri, konstruksiya",
     items:["Naxış və formaları nümunəyə görə qurur","Hissələrdən bütövü təsəvvür edir","Məkan istiqamətlərini düzgün dərk edir"]},
    {id:"fri", name:"Maye Mühakimə", hint:"məntiq, qanunauyğunluq",
     items:["Vizual qanunauyğunluqları tamamlayır","Anlayışları məntiqi qruplaşdırır","Yeni problemi məntiqlə həll edir"]},
    {id:"wmi", name:"İşlək Yaddaş", hint:"məlumatı saxlama və emal",
     items:["Eşitdiyi ardıcıllığı yadda saxlayıb təkrar edir","Məlumatı fikrində tutub üzərində işləyir","Çoxmərhələli göstərişi izləyir"]},
    {id:"psi", name:"Emal Sürəti", hint:"sürətli, dəqiq vizual emal",
     items:["Sadə vizual tapşırığı sürətlə yerinə yetirir","Diqqəti uzun müddət saxlayır","Sürət və dəqiqliyi balanslaşdırır"]}
  ],
  guide:{
    vci:{focus:["Lüğət və şifahi mühakiməni zənginləşdirən müdaxilələr","Mücərrəd anlayışların konkret nümunələrlə öyrədilməsi"],
      parentIntro:"Söz dünyası nə qədər zəngin olsa, uşaq bir o qədər yaxşı düşünür və izah edir.",
      parentTips:["Gün ərzində yeni sözləri kontekstlə tanıdın","“Niyə?” və “Necə düşünürsən?” suallarını verin","Birlikdə hekayə uydurub davam etdirin"],
      games:[{e:"📚",t:"Söz ovu",d:"Gün ərzində 3 yeni söz tapıb istifadə edin; lüğəti genişləndirir."},{e:"🔤",t:"Oxşar-fərqli",d:"İki əşyanın oxşar və fərqli cəhətlərini tapın."}]},
    vsi:{focus:["Konstruktiv və məkan oyunları ilə vizual emalı dəstəkləyin"],
      parentIntro:"Məkan təfəkkürü riyaziyyat və həndəsənin təməlidir; oyunla möhkəmlənir.",
      parentTips:["Lego, puzzle və tikinti oyunlarına vaxt ayırın","Xəritə və labirint oyunları oynayın"],
      games:[{e:"🧩",t:"Puzzle",d:"Yaşa uyğun yapboz; hissə-bütöv münasibətini gücləndirir."},{e:"🟦",t:"Naxış qurma",d:"Rəngli bloklarla nümunəni təkrarlayın."}]},
    fri:{focus:["Məntiqi qruplaşdırma və qanunauyğunluq tapşırıqları"],
      parentIntro:"Maye mühakimə — yeni, tanış olmayan problemi məntiqlə həll etmək bacarığıdır.",
      parentTips:["“Sonra nə gəlir?” ardıcıllıq oyunları oynayın","Əşyaları müxtəlif yollarla qruplaşdırın"],
      games:[{e:"♟️",t:"Strategiya oyunları",d:"Sadə şahmat/dama; irəli düşünməyi öyrədir."},{e:"🔢",t:"Ardıcıllıq",d:"Rəng-forma ardıcıllığını davam etdirin."}]},
    wmi:{focus:["İşlək yaddaş üçün ardıcıllıq və “zehni saxlama” məşqləri","Göstərişləri qısa, mərhələli vermək"],
      parentIntro:"İşlək yaddaş zəif olanda uşaq çoxmərhələli göstərişləri unudur — bu, diqqətsizlik deyil.",
      parentTips:["Tapşırığı bir-iki addıma bölün","Yadda saxlama oyunları (alış-veriş siyahısı) oynayın","Vizual xatırladıcılardan istifadə edin"],
      games:[{e:"🛒",t:"“Bazara getdim”",d:"Növbə ilə əşya əlavə edib siyahını təkrarlayın."},{e:"👏",t:"Ritm təkrarı",d:"Əl çırpma ardıcıllığını uzadaraq təkrarlayın."}]},
    psi:{focus:["Sürət-dəqiqlik balansı üçün vaxtlı, qısa tapşırıqlar"],
      parentIntro:"Emal sürəti aşağı olanda uşaq bilir, amma gec edir; ona vaxt və məşq lazımdır.",
      parentTips:["Qısa, vaxtlı, oyunlaşdırılmış tapşırıqlar verin","Yazı/rəngləmə kimi ince motorla bağlı fəaliyyəti artırın"],
      games:[{e:"⏱️",t:"Vaxt yarışı",d:"Şəkilləri tez uyğunlaşdırın; sürəti artırır."},{e:"✏️",t:"Simvol axtarışı",d:"Səhifədə müəyyən simvolu tez tapıb işarələyin."}]}
  }
},

/* ---------------------------------------------------------------- Vineland-3 */
vineland3:{
  id:"vineland3", name:"Vineland-3", full:"Vineland Adaptive Behavior Scales, 3-cü nəşr",
  age:"Doğuşdan böyük yaşlara qədər",
  summary:"Uşağın gündəlik həyatda real funksional bacarıqlarını — yəni adaptiv davranışını — ölçür. Bilik deyil, gündəlik tətbiqi qiymətləndirir.",
  advantages:["Real, gündəlik funksional bacarıqları ölçür","Müsahibə və anket formaları","İntellektual qiymətləndirməni tamamlayır","Müdaxilə məqsədlərini birbaşa müəyyən edir"],
  instruction:{
    howto:[
      "Uşağı yaxşı tanıyan qəyyum və ya müəllimlə aparın.",
      "Sual: uşaq bunu adətən EDİRMİ? — “edə bilərmi” yox, “adətən edirmi”.",
      "Hər sahəni yaşa uyğun başlanğıc nöqtəsindən qiymətləndirin.",
      "Konkret, müşahidə oluna bilən nümunələrə əsaslanın."
    ],
    methods:[
      "Yarı-strukturlaşdırılmış müsahibə (rating form) və ya qəyyum anketi.",
      "Hər bacarıq tezliyə görə qiymətləndirilir: adətən / bəzən / heç vaxt.",
      "Dörd əsas sahə və alt-sahələr üzrə qiymətləndirmə aparılır.",
      "Maladaptiv davranış əlavə olaraq qeyd oluna bilər."
    ],
    scoring:[
      "Xam ballar yaşa görə standart ballara çevrilir.",
      "Adaptiv Davranış Kompoziti (ABC) hesablanır (lisenziyalı dəst).",
      "Sahələr arası profil müdaxilə üçün təhlil edilir.",
      "Məqsəd: gücləndiriləcək konkret bacarıqları seçmək."
    ]
  },
  official:[
    {id:"abc", label:"Adaptiv Davranış Kompoziti (ABC)", ph:"məs. 82"},
    {id:"comm", label:"Ünsiyyət sahəsi balı", ph:"məs. 85"},
    {id:"dls", label:"Gündəlik Həyat Bacarıqları balı", ph:"məs. 79"},
    {id:"soc", label:"Sosiallaşma sahəsi balı", ph:"məs. 88"},
    {id:"motor", label:"Motor Bacarıqlar balı", ph:"məs. 90"}
  ],
  domains:[
    {id:"comm", name:"Ünsiyyət", hint:"qəbuledici, ifadəli, yazılı",
     items:["Sadə göstərişləri başa düşüb yerinə yetirir","Ehtiyac və istəyini başqalarına çatdırır","Söhbətdə məlumat mübadiləsi edir","Yaşına uyğun oxu/yazı bacarıqları var"]},
    {id:"dls", name:"Gündəlik həyat bacarıqları", hint:"özünəqulluq, məişət",
     items:["Yemək yeməyi müstəqil idarə edir","Geyinmə/soyunmanı özü bacarır","Şəxsi gigiyenanı yaşına uyğun yerinə yetirir","Sadə məişət işlərində iştirak edir","Təhlükəsizlik qaydalarına riayət edir"]},
    {id:"soc", name:"Sosiallaşma", hint:"münasibətlər, oyun, uyğunlaşma",
     items:["Yaşıdları ilə oyunda iştirak edir","Hiss və emosiyaları tanıyıb idarə edir","Növbə və paylaşma qaydalarına əməl edir","Sosial situasiyalara uyğunlaşır"]},
    {id:"motor", name:"Motor bacarıqlar", hint:"iri və incə motorika",
     items:["İri motor bacarıqları (qaçma, tullanma) yaşına uyğundur","İncə motor bacarıqları (qələm tutma, düymə) inkişaf edib","Hərəkətləri koordinasiyalı icra edir"]}
  ],
  guide:{
    comm:{focus:["Funksional, gündəlik ünsiyyət hədəflərini prioritetləşdirin"],
      parentIntro:"Burada məqsəd “gözəl danışmaq” deyil — gündəlik tələbatı çatdıra bilməkdir.",
      parentTips:["Seçim təklif edin: “alma yoxsa armud?” — ünsiyyəti gücləndirir","Gündəlik işləri birlikdə adlandıraraq edin","Onun ünsiyyət cəhdini dərhal cavablandırın"],
      games:[{e:"🛍️",t:"Mağaza oyunu",d:"Alış-veriş səhnəsi ilə istək bildirməyi məşq edin."},{e:"☎️",t:"Telefon oyunu",d:"Qısa söhbət ssenariləri ilə növbəni öyrədin."}]},
    dls:{focus:["Özünəqulluq bacarıqlarını addımlara bölüb (task analysis) öyrədin"],
      parentIntro:"Müstəqillik kiçik addımlarla qurulur. Hər addımı ayrıca öyrətmək uşağı çox güclü edir.",
      parentTips:["Bir bacarığı kiçik mərhələlərə bölün (məs. əl yumağın 5 addımı)","Vizual addım kartları asın","Uşaq özü edə bildiyini siz onun yerinə etməyin"],
      games:[{e:"🧦",t:"Geyinmə yarışı",d:"Geyinmə addımlarını oyuna çevirin; müstəqilliyi artırır."},{e:"🍽️",t:"Süfrə düzmə",d:"Süfrəni birlikdə hazırlayın; ardıcıllıq və məsuliyyət öyrədir."}]},
    soc:{focus:["Sosial qaydaları struktur və modelləşdirmə ilə öyrədin"],
      parentIntro:"Sosial bacarıqlar təbii gəlmirsə, açıq şəkildə, addım-addım öyrədilə bilər.",
      parentTips:["Sosial hekayələrlə qaydaları izah edin","Növbə tələb edən oyunlar seçin","Düzgün sosial davranışı tərifləyin"],
      games:[{e:"🎲",t:"Masaüstü oyun",d:"Növbə, qayda və uduzmağa dözmü öyrədir."},{e:"📕",t:"Sosial hekayə",d:"“Qonaq gələndə nə edirik?” kimi qısa hekayələr."}]},
    motor:{focus:["İncə motorikanı erqoterapevtlə əlaqəli şəkildə gücləndirin"],
      parentIntro:"Düymə bağlamaq, qələm tutmaq kimi bacarıqlar əl əzələləri güclənəndə asanlaşır.",
      parentTips:["Plastilin, muncuq düzmə, qayçı işləri ilə əl gücünü artırın","Tarazlıq və koordinasiya oyunları oynayın"],
      games:[{e:"🟤",t:"Muncuq düzmə",d:"İncə motor və diqqəti birlikdə inkişaf etdirir."},{e:"🤸",t:"Maneə yolu",d:"Yastıqlardan keçid; iri motor və planlamanı gücləndirir."}]}
  }
},

/* ---------------------------------------------------------------- Leiter-3 */
leiter3:{
  id:"leiter3", name:"Leiter-3", full:"Leiter International Performance Scale, 3-cü nəşr",
  age:"3 yaşdan böyük (uşaq və böyüklər)",
  summary:"Tamamilə qeyri-verbal idrak testi — danışıq tələb etmir. Dil və ya eşitmə çətinliyi olan uşaqlar üçün ideal idrak qiymətləndirməsi.",
  advantages:["Tamamilə qeyri-verbal — danışıq tələb olunmur","Dil/eşitmə problemi olan uşaqlar üçün ədalətli","Mədəni-dil yükündən az asılı","Diqqət və yaddaşı ayrıca ölçür"],
  instruction:{
    howto:[
      "Təlimatlar jest və nümayişlə verilir, danışıqdan asılı deyil.",
      "Sakit mühit seçin; uşağın stimul kartlarını aydın gördüyünə əmin olun.",
      "Nümunə tapşırıqla uşağın qaydanı başa düşdüyünə əmin olun, sonra başlayın.",
      "Vizual diqqəti yayındıran amilləri masadan uzaqlaşdırın."
    ],
    methods:[
      "Stimul kartları və manipulyativlərlə uyğunlaşdırma və ardıcıllıq tapşırıqları.",
      "Vizuallaşdırma/Mühakimə və Diqqət/Yaddaş sahələri ayrıca ölçülür.",
      "Cavablar göstərmə və ya yerləşdirmə ilə verilir, şifahi yox.",
      "Müşahidə qeydləri (yanaşma tərzi, dözüm) keyfiyyət təhlilinə daxil edilir."
    ],
    scoring:[
      "Xam ballar yaşa görə standart ballara çevrilir.",
      "Qeyri-verbal İQ və sahə indeksləri hesablanır (lisenziyalı dəst).",
      "Diqqət/yaddaş profili ayrıca təhlil olunur.",
      "Nəticə uşağın həqiqi idrak potensialını dil maneəsi olmadan göstərir."
    ]
  },
  official:[
    {id:"nviq", label:"Qeyri-verbal İQ (NVIQ)", ph:"məs. 96"},
    {id:"vr", label:"Vizuallaşdırma/Mühakimə indeksi", ph:"məs. 98"},
    {id:"am", label:"Diqqət/Yaddaş indeksi", ph:"məs. 92"}
  ],
  domains:[
    {id:"vr", name:"Vizuallaşdırma və mühakimə", hint:"məntiq, naxış, təsnifat",
     items:["Şəkilləri kateqoriyaya görə uyğunlaşdırır","Vizual qanunauyğunluğu tamamlayır","Hissələrdən bütövü təşkil edir","Vizual analogiyaları həll edir"]},
    {id:"am", name:"Diqqət və yaddaş", hint:"vizual diqqət, ardıcıl yaddaş",
     items:["Vizual ardıcıllığı yadda saxlayıb təkrar edir","Diqqəti tapşırıq boyu saxlayır","Müəyyən hədəfi yayındırıcılar arasında tapır","Növbə ilə dəyişən qaydalara uyğunlaşır"]}
  ],
  guide:{
    vr:{focus:["Qeyri-verbal məntiqi vizual materiallarla gücləndirin","Güclü vizual kanalı təlim strategiyalarına daxil edin"],
      parentIntro:"Uşağınız sözlə çətinlik çəksə də, gözü ilə yaxşı öyrənə bilər — bu, böyük üstünlükdür.",
      parentTips:["Öyrətməni şəkil, video və nümayişlə dəstəkləyin","Puzzle, təsnifat və naxış oyunları oynayın","Vizual təlimatlardan (şəkilli addımlar) istifadə edin"],
      games:[{e:"🖼️",t:"Kateqoriya çeşidləmə",d:"Kartları qruplara ayırın; vizual təsnifatı gücləndirir."},{e:"🧩",t:"Naxış tamamlama",d:"Yarımçıq naxışı davam etdirin."}]},
    am:{focus:["Vizual diqqət və yaddaş üçün strukturlaşdırılmış məşqlər"],
      parentIntro:"Diqqəti və ardıcıl yaddaşı oyunla məşq etmək gündəlik öyrənməni asanlaşdırır.",
      parentTips:["“Nə dəyişdi?” yaddaş oyunları oynayın","Qısa, aydın vizual tapşırıqlar verin","Yayındırıcıları azaldın, iş sahəsini sadələşdirin"],
      games:[{e:"🃏",t:"Yaddaş kartları",d:"Cüt tapma oyunu; vizual yaddaşı gücləndirir."},{e:"🔍",t:"Fərqi tap",d:"İki şəkil arasındakı fərqləri tapın; diqqəti artırır."}]}
  }
},

/* ---------------------------------------------------------------- Sensory Profile 2 */
sp2:{
  id:"sp2", name:"Sensory Profile 2", full:"Sensory Profile 2",
  age:"Doğuşdan ~14 yaşadək (formalar üzrə)",
  summary:"Uşağın gündəlik həyatda sensor uyaranlara necə reaksiya verdiyini qiymətləndirir. Erqoterapiya və sensor müdaxilə planlaması üçün xüsusilə dəyərlidir.",
  advantages:["Gündəlik sensor reaksiyaları real kontekstdə ölçür","Dörd sensor nümunəni ayırd edir","Erqoterapiya müdaxiləsini birbaşa yönləndirir","Valideyn/müəllim anketi ilə asan tətbiq olunur"],
  instruction:{
    howto:[
      "Uşağı gündəlik mühitdə yaxşı tanıyan qəyyum və ya müəllimlə doldurun.",
      "Hər bənd tezliyə görə qiymətləndirilir: demək olar həmişə … demək olar heç vaxt.",
      "Cavablar son dövrdəki tipik davranışı əks etdirməlidir.",
      "Konkret gündəlik situasiyaları (yemək, geyim, səs-küy) nəzərə alın."
    ],
    methods:[
      "Tezliyə əsaslanan qiymətləndirmə anketi.",
      "Sensor sistemlər (eşitmə, görmə, toxunma, hərəkət, bədən mövqeyi, oral) üzrə bəndlər.",
      "Nəticələr dörd nümunəyə qruplaşdırılır: Axtarış, Qaçınma, Həssaslıq, Qeydiyyat.",
      "Davranış kontekstdə şərh olunur — “problem” deyil, sensor profil kimi."
    ],
    scoring:[
      "Bəndlər nümunələr üzrə toplanır.",
      "Nəticələr “Başqalarından çox / tipik / az” kateqoriyalarına yerləşir (lisenziyalı dəst).",
      "Hər nümunənin müdaxilə üçün mənası fərqlidir.",
      "Məqsəd: uşağın sensor ehtiyaclarına uyğun gündəlik mühit qurmaq."
    ]
  },
  official:[
    {id:"seeking", label:"Axtarış (Seeking) kateqoriyası", ph:"məs. Başqalarından çox"},
    {id:"avoiding", label:"Qaçınma (Avoiding) kateqoriyası", ph:"məs. Tipik"},
    {id:"sensitivity", label:"Həssaslıq (Sensitivity) kateqoriyası", ph:"məs. Başqalarından çox"},
    {id:"registration", label:"Qeydiyyat (Registration) kateqoriyası", ph:"məs. Tipik"}
  ],
  domains:[
    {id:"seeking", name:"Sensor axtarış", hint:"intensiv uyaran axtarır",
     items:["Hərəkət, fırlanma və ya yellənməyi həddən artıq axtarır","Əşyalara toxunmaq, sıxmaq ehtiyacı güclüdür","Səs-küyü özü yaradır, intensiv stimul sevir","Yerində dura bilmir, daim hərəkətdədir"]},
    {id:"avoiding", name:"Sensor qaçınma", hint:"uyarandan uzaqlaşır",
     items:["Səs-küylü mühitdən qaçır və ya narahat olur","Müəyyən toxunuş/parça hisslərindən qaçır","Gözlənilməz toxunuşa kəskin reaksiya verir","Yeni sensor təcrübələrdən çəkinir"]},
    {id:"sensitivity", name:"Sensor həssaslıq", hint:"uyarana həddindən artıq reaksiya",
     items:["Səslərə həddən artıq həssasdır (qulağını tutur)","İşıq və ya parlaqlıqdan narahat olur","Müəyyən qoxu/dada güclü reaksiya verir","Geyimin etiketi/tikişi onu narahat edir"]},
    {id:"registration", name:"Sensor qeydiyyat", hint:"uyaranı gec/zəif hiss edir",
     items:["Adı çağırılanda gec reaksiya verir","Ağrı və ya temperatura zəif reaksiya göstərir","Ətrafdakı dəyişiklikləri çətin sezir","Yorğun və ya “öz aləmində” görünür"]}
  ],
  guide:{
    seeking:{focus:["Təhlükəsiz, planlı sensor “diet” ilə hərəkət ehtiyacını ödəyin"],
      parentIntro:"Uşağınız hərəkət və toxunuş “acdır” — onu cəzalandırmaq yox, ehtiyacını sağlam yollarla ödəmək lazımdır.",
      parentTips:["Gün ərzində planlı hərəkət fasilələri verin (tullanma, dırmaşma)","Sıxma topu, ağır yorğan kimi vasitələr təklif edin","Oturaq işlərdən əvvəl güclü hərəkət aktivliyi qoyun"],
      games:[{e:"🤾",t:"Tullanma fasiləsi",d:"Trampelində/yastıqda tullanma; hərəkət ehtiyacını ödəyir."},{e:"🧗",t:"Dırmaşma",d:"Təhlükəsiz dırmaşma; dərin təzyiq və balans verir."}]},
    avoiding:{focus:["Tədrici sensor uyğunlaşma (desensitizasiya) planı qurun"],
      parentIntro:"Uşağınız üçün dünya bəzən “çox yüksək səslidir”. Onu məcbur etmək yox, tədricən alışdırmaq kömək edir.",
      parentTips:["Sakit “sığınacaq” küncü yaradın","Yeni təcrübələri kiçik dozalarla, əvvəlcədən xəbər verərək təqdim edin","İzdihamlı mühiti əvvəlcədən planlayın, qulaqlıq təklif edin"],
      games:[{e:"⛺",t:"Sakit künc",d:"Yumşaq, az işıqlı künc; özünütənzimləməyə kömək edir."},{e:"🖐️",t:"Toxunuş qutusu",d:"Müxtəlif parçalara tədricən, könüllü toxunma."}]},
    sensitivity:{focus:["Mühit modifikasiyası ilə uyaran yükünü azaldın"],
      parentIntro:"Kiçik narahatlıqlar (etiket, parlaq işıq) uşaq üçün böyük ola bilər — bu, “nazlanmaq” deyil.",
      parentTips:["Geyim etiketlərini kəsin, yumşaq parçalar seçin","İşığı tənzimləyin, kəskin qoxulardan çəkindirin","Reaksiyanı qabaqlamaq üçün mühiti əvvəlcədən hazırlayın"],
      games:[{e:"🎧",t:"Səs tənzimi",d:"Sakit musiqi/ağ səslə eşitmə yükünü idarə edin."},{e:"🕶️",t:"İşıq oyunu",d:"Yumşaq işıqla rahat mühit yaradın."}]},
    registration:{focus:["Uyaranı gücləndirərək diqqəti və reaksiyanı oyatma"],
      parentIntro:"Uşağınız bəzən sanki “eşitmir” — əslində uyaranı gec qeyd edir. Daha güclü, aydın siqnallar kömək edir.",
      parentTips:["Göstərişdən əvvəl adını çağırıb göz təması qurun","Daha canlı, kontrastlı, hərəkətli materiallar istifadə edin","Fəaliyyətdən əvvəl qısa “oyandırıcı” hərəkət edin"],
      games:[{e:"🥁",t:"Ritm oyunu",d:"Müxtəlif səs/ritmlə diqqəti və qeydiyyatı gücləndirin."},{e:"❄️",t:"Temperatur oyunu",d:"İsti/soyuq əşyaları təhlükəsiz fərqləndirin; hissi oyadır."}]}
  }
}

};
