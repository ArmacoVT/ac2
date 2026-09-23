// ---------- ПУБЛИЧНА ВИТРИНА: съдържание по подразбиране ----------
// Общо за приложението (index.html) и админ панела (admin.html). Всеки текст е {bg,en}.
// Админът вижда тези текстове в таб „Сайт" и ги редактира; записаното в базата има предимство.
window.SITE_DEFAULTS={
  hero:{
    // НАЧАЛЕН ЕКРАН („Само за членове")
    gate_title:{bg:'Само за членове.',en:'Members only.'},
    bg_color:'#1d1611',        // цвят на фона, когато няма картина/видео (и зад тях)
    show_frieze:true,          // анимираната лента с човечета
    show_beam:true,            // лъчът по логото
    show_fx:true,              // топла светлина + зърнеж върху фона
    // СТРАНИЦА „ЗА КЛУБА"
    title:{bg:'American College Arcus Club',en:'American College Arcus Club'},
    video:'',   // MP4/WebM фон на началния екран (по избор)
    subtitle:{bg:'Частен клуб за култура, гастрономия и смислено общуване — създаден около общността на Американски колеж Аркус.',en:'A private club for culture, gastronomy and meaningful company — built around the American College Arcus community.'},
    image:''
  },
  about:{
    title:{bg:'Кои сме ние',en:'Who we are'},
    body:{bg:'AC² е място, в което културата, добрата храна и разговорът се срещат в спокойна и лична среда. Клубът е по покана и обединява хора, свързани с Американски колеж Аркус — възпитаници, родители, преподаватели и приятели на училището.\n\nВярваме, че най-ценните неща се случват в малък кръг: една прожекция, една вечеря, един разговор с човек, когото иначе не бихте срещнали.',en:'AC² is a place where culture, good food and conversation meet in a calm, personal setting. Membership is by invitation and brings together people connected to the American College Arcus — alumni, parents, teachers and friends of the school.\n\nWe believe the most valuable things happen in a small circle: one screening, one dinner, one conversation with someone you would not otherwise have met.'},
    image:''
  },
  offer:{
    title:{bg:'Какво предлагаме',en:'What we offer'},
    body:{bg:'Програмата на клуба е организирана в осем формата. Всеки от тях е малък по мащаб и подбран по съдържание.',en:'The club programme is organised in eight formats. Each is small in scale and carefully curated.'},
    // по един запис на формат: абзац (BG/EN) + снимка. Празно = кратко описание от приложението.
    items:{
      culture:{body:{bg:'Музика, изложби, литература и срещи с артисти и лектори. Вечери в малка зала, където разговорът след събитието е част от програмата.',en:'Music, exhibitions, literature and meetings with artists and lecturers. Evenings in a small hall, where the conversation afterwards is part of the programme.'},image:''},
      cinema:{body:{bg:'Авторско кино и дискусии. Прожекция за няколко десетки души и разговор с гост, който познава филма отвътре. Тематични и семейни формати.',en:'Auteur cinema and discussions. A screening for a few dozen people and a conversation with a guest who knows the film from the inside. Thematic and family formats.'},image:''},
      table:{body:{bg:'Гастрономически вечери с гост-готвач и ресторантът на клуба — с членска преференция и среда, в която не бързате.',en:'Gastronomic evenings with a guest chef and the club restaurant — with a member preference and a setting where nobody hurries you.'},image:''},
      music:{body:{bg:'Камерни концерти и музикални вечери в близост до изпълнителите — формат, в който се чува всяка нота.',en:'Chamber concerts and musical evenings close to the performers — a format where you hear every note.'},image:''},
      conversation:{body:{bg:'Разговори с интересни хора — на маса, без сцена и микрофон. Теми от науката до всекидневието.',en:'Conversations with interesting people — at a table, without a stage or microphone. Topics from science to everyday life.'},image:''},
      community:{body:{bg:'Семейни поводи, срещи на възпитаници и училищно-свързани формати. Дискретни срещи в по-лична среда.',en:'Family occasions, alumni gatherings and school-related formats. Discreet meetings in a more personal setting.'},image:''},
      theater:{body:{bg:'Камерни театрални формати и четения — близо до актьорите, в зала за малко публика.',en:'Chamber theatre formats and readings — close to the actors, in a hall for a small audience.'},image:''},
      online:{body:{bg:'Живи предавания и видео архив за членовете, които не могат да присъстват на място.',en:'Live streams and a video archive for members who cannot attend in person.'},image:''}
    }
  },
  memberships:{
    title:{bg:'Членство',en:'Membership'},
    intro:{bg:'Клубът е по покана. Можете да кандидатствате за една от трите категории по-долу — всяка кандидатура се разглежда лично.',en:'The club is by invitation. You may apply for one of the three categories below — every application is reviewed personally.'},
    items:{
      club:{hook:{bg:'За вас е, ако искате клубът да е част от седмицата ви.',en:'For you if you want the club to be part of your week.'},summary:{bg:'Цялата програма, приоритет при резервации, 5% в AC² Table.',en:'The full programme, priority for reservations, 5% at AC² Table.'},price:{bg:'',en:''},desc:{bg:'Основната членска категория — за хората, които желаят да бъдат активна част от клубния живот, неговата програма и общност.',en:'The core membership category — for those who wish to be an active part of club life, its programme and community.'},benefits:{bg:'Достъп до клубната програма и събития\nПокани за културни и гастрономически формати\nПриоритет при резервации\n5% членска преференция в AC² Table\nПерсонализирана Club Member карта',en:'Access to the programme and events\nInvitations to cultural and gastronomic formats\nPriority for reservations\n5% member preference at AC² Table\nA personalised Club Member card'}},
      alumni:{hook:{bg:'За вас е, ако сте свързани с Американския колеж Аркус.',en:'For you if you are connected to the American College Arcus.'},summary:{bg:'Избрани събития, училищни формати, кино и култура.',en:'Selected events, school-related formats, cinema and culture.'},price:{bg:'',en:''},desc:{bg:'Специална категория за хората с лична връзка към общността на Американски Колеж Аркус — възпитаници, родители, учители.',en:'A special category for those with a personal connection to the American College Arcus community.'},benefits:{bg:'Достъп до избрани клубни събития\nПокани за училищно-свързани събития\nУчастие в AC² Cinema и AC² Culture\nПокани за общностни вечери\nПерсонализирана Alumni карта',en:'Access to selected club events\nInvitations to school-related events\nParticipation in AC² Cinema and Culture\nInvitations to community evenings\nA personalised Alumni card'}},
      corporate:{hook:{bg:'За вас е, ако представлявате компания или организация.',en:'For you if you represent a company or organisation.'},summary:{bg:'До 5 представители, професионални формати, 8% в AC² Table.',en:'Up to 5 representatives, professional formats, 8% at AC² Table.'},price:{bg:'',en:''},desc:{bg:'Категория за компании и организации, които споделят ценностите на клуба — култура, образование, качество и смислено общуване.',en:'A category for companies and organisations that share the club values.'},benefits:{bg:'Членство за компании и организации\nДостъп за до 5 представители\nПокани за професионални формати\n8% членска преференция в AC² Table\nДискретни срещи в уединена зона\nПерсонализирана Corporate карта',en:'Membership for companies and organisations\nAccess for up to 5 representatives\nInvitations to professional formats\n8% member preference at AC² Table\nDiscreet meetings in a secluded area\nA personalised Corporate card'}}
    }
  },
  gallery:{title:{bg:'Моменти от клуба',en:'Moments from the club'},images:[]},
  contact:{
    title:{bg:'Свържете се с нас',en:'Get in touch'},
    body:{bg:'За въпроси относно членство и събития.',en:'For questions about membership and events.'},
    email:'info@arcusclub.bg',phone:'',address:{bg:'София, България',en:'Sofia, Bulgaria'}
  }
};

// ---------- ПУБЛИЧЕН САЙТ (ac2.bg): съдържание по подразбиране ----------
// Редактира се от админ панела → таб „Публичен сайт". Всеки текст е {bg,en}.
// Записаното в базата (site_content, ред 'public') има предимство пред тези стойности.
const _b=(bg,en)=>({bg:bg,en:en});
window.PUB_DEFAULTS={
  general:{
    site_name:'AC² — American College Arcus Club',
    tagline:_b('Културен център, ресторант и клуб във Велико Търново','Cultural centre, restaurant and club in Veliko Tarnovo'),
    facebook:'', instagram:'',
    appstore_url:'', playstore_url:'',
    show_intro:true,                 // кратката анимация с логото преди сайта
    email:'welcome@ac2.bg', phone:'',
    address:_b('Велико Търново','Veliko Tarnovo'),
    hours:_b('Вторник – неделя: 10:00 – 23:00\nПонеделник: почивен ден','Tuesday – Sunday: 10:00 – 23:00\nMonday: closed'),
    parking:_b('','' ), access:_b('',''),
    maps_embed:'',                   // адрес от Google Maps → Share → Embed a map → само src="…"
    maps_link:''                     // линк „Отвори в Google Maps"
  },
  home:{
    slides:[
      {image:'',video:'',title:_b('Място за култура, разговор и добра храна','A place for culture, conversation and good food'),sub:_b('Културен център, ресторант и клуб в сърцето на Велико Търново.','A cultural centre, restaurant and club in the heart of Veliko Tarnovo.'),cta:_b('Виж програмата','See the programme'),link:'#/program'}
    ],
    manifesto:{title:_b('Какво е AC²','What is AC²'),body:_b('AC² е културен център, ресторант и клуб, създаден около общността на Американски колеж Аркус. Сцена, галерия и кино под един покрив — и маса, на която разговорът продължава.','AC² is a cultural centre, restaurant and club built around the American College Arcus community. A stage, a gallery and a cinema under one roof — and a table where the conversation continues.')},
    season:{title:_b('Сезон есен–зима: ИНТЕРТЕКСТ','Autumn–winter season: INTERTEXT'),body:_b('Тема на сезона — как текстовете, образите и хората си говорят през времето.','The theme of the season — how texts, images and people speak to each other across time.')},
    restaurant:{title:_b('Ресторант','Restaurant'),body:_b('Сезонна кухня, тематични вечери и брънч в неделя. Маса за след събитието — или просто за вечерта.','Seasonal cooking, themed dinners and Sunday brunch. A table for after the show — or just for the evening.'),image:''},
    app:{title:_b('AC² в джоба ти','AC² in your pocket'),body:_b('Билети, резервации и членска карта — в приложението.','Tickets, reservations and your membership card — in the app.'),image:''},
    membership:{title:_b('Членство','Membership'),body:_b('Клубът е по покана. Членовете получават приоритет за резервации, покани за затворени формати и преференции в ресторанта.','The club is by invitation. Members get priority reservations, invitations to closed formats and restaurant benefits.')},
    college:{title:_b('Arcus College','Arcus College'),body:_b('Младите хора са активна част от AC². Учениците на Американски колеж Аркус участват в програмата — на сцената, в галерията и зад кулисите.','Young people are an active part of AC². Students of the American College Arcus take part in the programme — on stage, in the gallery and behind the scenes.'),images:[],url:''},
    newsletter:{title:_b('Нюзлетър','Newsletter'),body:_b('Програмата за месеца, тематичните вечери и новините — веднъж месечно, без спам.','The monthly programme, themed dinners and news — once a month, no spam.')},
    show:{restaurant:true,app:true,membership:true,college:true,newsletter:true}
  },
  program:{intro:_b('Всички предстоящи събития в изложбената зала и залата за сценични изкуства. Изберете направление, за да филтрирате.','All upcoming events in the exhibition hall and the performing-arts hall. Pick a direction to filter.')},
  restaurant:{
    title:_b('Ресторант','Restaurant'),
    body:_b('Ресторантът на AC² е продължение на сцената — място, където вечерта продължава на масата. Сезонни продукти, кратко меню и вино от региона.','The AC² restaurant is an extension of the stage — the place where the evening continues at the table. Seasonal produce, a short menu and wine from the region.'),
    images:[],
    chef:{name:'',body:_b('',''),image:''},
    dinners_intro:_b('Тематични вечери — една тема, едно меню, една маса.','Themed dinners — one theme, one menu, one table.'),
    brunch:{title:_b('Брънч','Brunch'),body:_b('Всяка неделя от 11:00 — бавна сутрин с кафе, печива и семейна маса.','Every Sunday from 11:00 — a slow morning with coffee, pastries and a family table.'),images:[]},
    hours:_b('Вторник – неделя: 12:00 – 23:00','Tuesday – Sunday: 12:00 – 23:00'),
    reserve_url:'',                 // външна система за резервации (ако има); празно = форма за контакт
    reserve_phone:''
  },
  menu:{
    intro:_b('Менюто се сменя със сезона. Попитайте за дневното предложение.','The menu changes with the season. Ask about the daily special.'),
    pdf_url:'',
    sections:[]                     // [{title:{bg,en}, image:'', items:[{name:{bg,en}, desc:{bg,en}, price:''}]}]
  },
  membership:{
    why_title:_b('Защо да стана член?','Why become a member?'),
    why_body:_b('Защото най-ценните неща се случват в малък кръг: една прожекция, една вечеря, един разговор с човек, когото иначе не бихте срещнали. Членството дава приоритет за резервации, покани за затворени формати и преференции в ресторанта.','Because the most valuable things happen in a small circle: one screening, one dinner, one conversation with someone you would not otherwise have met. Membership gives priority reservations, invitations to closed formats and restaurant benefits.'),
    how_title:_b('Как се кандидатства','How to apply'),
    how_body:_b('1. Прочетете правилника на клуба.\n2. Попълнете формуляра за кандидатстване.\n3. Ще се свържем с вас за кратък разговор.\n4. След одобрение получавате покана и достъп до приложението.','1. Read the club rules.\n2. Fill in the application form.\n3. We will contact you for a short conversation.\n4. Once approved you receive an invitation and access to the app.'),
    terms_url:'',
    faq:[
      {q:_b('Колко време отнема разглеждането на кандидатурата?','How long does an application take?'),a:_b('Обикновено до две седмици.','Usually up to two weeks.')},
      {q:_b('Мога ли да водя гости?','Can I bring guests?'),a:_b('Да — до 4 места на резервация за повечето събития.','Yes — up to 4 seats per reservation for most events.')}
    ]
  },
  about:{title:_b('За AC²','About AC²'),body:_b('Историята на AC² започва с Американски колеж Аркус и идеята, че едно училище може да бъде център на общността и след часовете. Днес AC² е културен център с ресторант, галерия, сцена и кино — и клуб от хора, които ги пълнят.','The story of AC² begins with the American College Arcus and the idea that a school can be the centre of its community after hours. Today AC² is a cultural centre with a restaurant, gallery, stage and cinema — and a club of people who fill them.'),images:[]},
  team:{intro:_b('Хората зад AC².','The people behind AC².'),members:[]},   // [{name, role:{bg,en}, bio:{bg,en}, image}]
  rent:{
    title:_b('Наеми AC² за своето събитие','Hire AC² for your event'),
    body:_b('Залата за сценични изкуства, галерията и ресторантът могат да бъдат наети за частни и фирмени събития, презентации и празници.','The performing-arts hall, the gallery and the restaurant can be hired for private and corporate events, presentations and celebrations.'),
    images:[],
    specs:[{label:_b('Места (сцена)','Seats (stage)'),value:_b('','')},{label:_b('Площ','Area'),value:_b('','')},{label:_b('Височина','Height'),value:_b('','')},{label:_b('Техника','Equipment'),value:_b('','')}],
    terms:_b('Условията за наемане се уточняват според събитието. Пишете ни.','Hire terms depend on the event. Write to us.')
  },
  college:{title:_b('Arcus College','Arcus College'),body:_b('AC² и Американски колеж Аркус са една екосистема: учениците участват в програмата, стажуват в ресторанта и галерията, а сцената е тяхна за училищните продукции.','AC² and the American College Arcus are one ecosystem: students take part in the programme, intern in the restaurant and gallery, and the stage is theirs for school productions.'),images:[],url:''},
  app:{title:_b('Приложението AC²','The AC² app'),body:_b('Програмата, билетите, резервациите и членската карта — на едно място. За членове на клуба.','The programme, tickets, reservations and your membership card — in one place. For club members.'),images:[],
    features:_b('Програма и билети\nРезервации на маса\nЧленска карта с QR\nИзвестия за нови събития','Programme and tickets\nTable reservations\nMembership card with QR\nNotifications for new events')},
  contacts:{intro:_b('Пишете ни — за събития, резервации, наеми или партньорства.','Write to us — about events, reservations, hire or partnerships.')},
  legal:{
    terms:_b('',''), privacy:_b('',''),
    cookies:_b('Сайтът използва бисквитки за статистика (Google Analytics) и реклама (Meta Pixel) само след вашето съгласие.','This site uses cookies for statistics (Google Analytics) and advertising (Meta Pixel) only with your consent.')
  }
};

// ============================================================
//  Единен слой за данни. Ако config.js е попълнен → Supabase (общо за всички).
//  Иначе → демо режим (localStorage, само на това устройство).
//  И двата файла (index.html, admin.html) ползват този слой.
// ============================================================
(function () {
  // запомняме типа на линка (invite/recovery) преди Supabase да изчисти адреса
  const URLTYPE = (location.hash.match(/[#&]type=(\w+)/) || [])[1] || '';
  const CFG = window.ACAC_CONFIG || {};
  const LIVE = !!(CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY &&
    !/PASTE/.test(CFG.SUPABASE_URL) && !/PASTE/.test(CFG.SUPABASE_ANON_KEY));
  let sb = null;
  if (LIVE && window.supabase) {
    sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY,
      { auth: { persistSession: true, autoRefreshToken: true } });
  }

  const MEM = ['founder', 'founding', 'club', 'alumni', 'corporate'];
  const SEED = [
    { id: 'e1', title: 'Разговор за съвременната българска проза', format: 'conversation', place: 'Клубна зала', date: '2026-06-12', time: '19:00', ends: '21:00', capacity: 30, aud: 'all' },
    { id: 'e2', title: 'Гастрономическа вечер', format: 'table', place: 'Trapezna', date: '2026-06-19', time: '20:00', ends: '', capacity: 20, aud: ['club', 'corporate', 'founding', 'founder'] },
    { id: 'e3', title: 'Вечер на европейския авторски филм', format: 'cinema', place: 'Кино салон', date: '2026-06-26', time: '19:30', ends: '21:30', capacity: 40, aud: 'all' },
    { id: 'e4', title: 'Основателска вечер', format: 'community', place: 'Частен салон', date: '2026-07-03', time: '19:00', ends: '22:00', capacity: 16, aud: ['founder', 'founding'] }
  ];
  const K = { ev: 'acac_events', res: 'acac_res', saved: 'acac_saved', user: 'acac_user' };
  const jget = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };
  const jset = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  // audience <-> aud
  const toAud = (audience) => {
    if (!audience || (Array.isArray(audience) && (audience.includes('all') || audience.length >= MEM.length))) return 'all';
    return Array.isArray(audience) ? audience : 'all';
  };
  const toAudience = (aud) => (aud === 'all' || !Array.isArray(aud)) ? ['all'] : aud;

  function seedDemo() { let e = jget(K.ev, null); if (!e) { e = SEED.slice(); jset(K.ev, e); } return e; }

  const DB = {
    live: LIVE,
    urlType: URLTYPE,

    // Известява, когато сесията изчезне (изтекла или отнета).
    // Без това администраторът просто вижда как бутоните спират да работят.
    onSessionLost(cb) {
      if (!LIVE) return;
      sb.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT' || (!session && event !== 'INITIAL_SESSION')) cb();
      });
    },
    // Активна проверка — auth събитието понякога не идва, ако табът е бил заспал.
    async sessionAlive() {
      if (!LIVE) return true;
      try { const { data } = await sb.auth.getSession(); return !!(data && data.session); }
      catch (e) { return true; }   // мрежов проблем ≠ изтекла сесия
    },

    // ---------- AUTH (член) ----------
    async getUser() {
      if (!LIVE) return jget(K.user, null);
      const { data } = await sb.auth.getSession();
      const s = data.session; if (!s) return null;
      let prof = null;
      try { const r = await sb.from('profiles').select('*').eq('id', s.user.id).single(); prof = r.data; } catch (e) {}
      return { id: s.user.id, email: s.user.email, username: prof ? prof.username : s.user.email,
        full_name: prof ? (prof.full_name || '') : '',
        name_changed_at: prof ? (prof.name_changed_at || '') : '',
        phone: prof ? (prof.phone || '') : '',
        phone_recheck: prof ? !!prof.phone_recheck : false,
        fav_formats: prof && Array.isArray(prof.fav_formats) ? prof.fav_formats : [],
        membership_until: prof ? (prof.membership_until || '') : '',
        company_id: prof ? (prof.company_id || '') : '',
        membership: prof ? prof.membership : 'guest', role: prof ? prof.role : 'member' };
    },
    async updateFavFormats(list) {
      if (!LIVE) { const u = jget(K.user, null) || {}; u.fav_formats = list; jset(K.user, u); return { error: null }; }
      const { data } = await sb.auth.getSession();
      const s = data.session; if (!s) return { error: { message: 'no session' } };
      const { error } = await sb.from('profiles').update({ fav_formats: list }).eq('id', s.user.id);
      return { error };
    },
    // запазване на име на потребителя в профила
    async updateProfileName(name, initial) {
      if (!LIVE) { const u = jget(K.user, null) || {}; u.full_name = name; jset(K.user, u); return { error: null }; }
      const { data } = await sb.auth.getSession();
      const s = data.session; if (!s) return { error: { message: 'no session' } };
      const upd = { full_name: (name || '').trim() };
      if (!initial) upd.name_changed_at = new Date().toISOString(); // първоначалното задаване не пуска 3-месечния период
      const { error } = await sb.from('profiles').update(upd).eq('id', s.user.id);
      return { error };
    },
    // запазване на телефон за контакт
    async updateProfilePhone(phone) {
      if (!LIVE) { const u = jget(K.user, null) || {}; u.phone = phone; jset(K.user, u); return { error: null }; }
      const { data } = await sb.auth.getSession();
      const s = data.session; if (!s) return { error: { message: 'no session' } };
      const { error } = await sb.from('profiles').update({ phone: (phone || '').trim(), phone_recheck: false }).eq('id', s.user.id);
      return { error };
    },
    // качване на снимка/видео за събитие в Supabase Storage (bucket: event-media)
    async uploadMedia(file, folder) {
      if (!LIVE) return { error: { message: 'demo' } };
      const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
      const path = (folder ? folder.replace(/\/+$/, '') + '/' : '') + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + ext;
      const up = await sb.storage.from('event-media').upload(path, file, { upsert: true, contentType: file.type });
      if (up.error) return { error: up.error };
      const { data } = sb.storage.from('event-media').getPublicUrl(path);
      return { url: data.publicUrl };
    },

    // ---------- ПУБЛИЧНА ВИТРИНА (landing) ----------
    // Един JSON ред; чете се и без вход. Празен обект = вградените текстове по подразбиране.
    // id: 'landing' (началният екран на приложението) или 'public' (публичният сайт)
    async getSiteContent(id) {
      if (!LIVE) return {};
      try {
        const { data } = await sb.from('site_content').select('data').eq('id', id || 'landing').maybeSingle();
        return (data && data.data) || {};
      } catch (e) { return {}; }
    },
    async saveSiteContent(obj, id) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { error } = await sb.from('site_content').upsert({ id: id || 'landing', data: obj || {} });
      return { error };
    },

    // ---------- ПУБЛИЧЕН САЙТ ----------
    // Само събития с pub.show = true; само публичните колони (RLS + column grants за anon).
    async listPublicEvents() {
      if (!LIVE) return seedDemo().map(e => Object.assign({ pub: { show: true, direction: 'stage' } }, e));
      const { data } = await sb.from('events')
        .select('id,title,format,place,date,end_date,time,ends,capacity,price,image_url,description,tags,pub,archive_only')
        .eq('pub->>show', 'true').order('date', { ascending: true });
      return (data || []).map(e => ({ id: e.id, title: e.title, format: e.format, place: e.place || '',
        date: e.date || '', end_date: e.end_date || '', time: e.time || '', ends: e.ends || '',
        capacity: e.capacity || 0, price: e.price || 0, image_url: e.image_url || '',
        description: e.description || '', tags: Array.isArray(e.tags) ? e.tags : [],
        archive_only: !!e.archive_only, pub: e.pub || {} }));
    },
    // Форми от сайта (контакт / нюзлетър) → Edge Function public-forms (Turnstile + имейл)
    async publicForm(kind, o) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { data, error } = await sb.functions.invoke('public-forms', { body: Object.assign({ kind }, o || {}) });
      if (error) {
        let reason = '';
        try { reason = (await error.context.json()).error || ''; } catch (e) {}
        if (reason === 'captcha') return { error: { captcha: true } };
        if (reason === 'cooldown') return { error: { cooldown: true } };
        return { error: { message: reason || error.message } };
      }
      if (data && data.error) return { error: { message: data.error } };
      return { error: null, data };
    },
    async listContactMessages() {
      if (!LIVE) return [];
      const { data } = await sb.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(300);
      return data || [];
    },
    async setMessageRead(id, read) {
      if (!LIVE) return { error: null };
      const { error } = await sb.from('contact_messages').update({ is_read: !!read }).eq('id', id);
      return { error };
    },
    async deleteMessage(id) {
      if (!LIVE) return { error: null };
      const { error } = await sb.from('contact_messages').delete().eq('id', id);
      return { error };
    },
    async listSubscribers() {
      if (!LIVE) return [];
      const { data } = await sb.from('newsletter_subscribers').select('*').order('consent_at', { ascending: false });
      return data || [];
    },
    async deleteSubscriber(email) {
      if (!LIVE) return { error: null };
      const { error } = await sb.from('newsletter_subscribers').delete().eq('email', email);
      return { error };
    },
    async signIn(email, password) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
      return { error };
    },
    async signUp(email, password, username, membership) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { error } = await sb.auth.signUp({ email: email.trim(), password,
        options: { data: { username: (username || '').trim(), membership: membership || 'guest' } } });
      return { error };
    },
    async signOut() {
      if (LIVE) { await sb.auth.signOut(); } else { localStorage.removeItem(K.user); }
    },
    // демо вход за член (admin/admin → пълен достъп)
    demoLogin(u, p) {
      if ((u || '').trim().toLowerCase() !== 'admin' || (p || '').trim() !== 'admin') return false;
      jset(K.user, { id: 'demo', username: 'admin', membership: 'founder', role: 'member' });
      return true;
    },

    // ---------- СЪБИТИЯ ----------
    async listEvents() {
      if (!LIVE) return seedDemo();
      const { data } = await sb.from('events').select('*').order('date', { ascending: true });
      return (data || []).map(e => ({ id: e.id, title: e.title, format: e.format, place: e.place,
        date: e.date, end_date: e.end_date || '', time: e.time, ends: e.ends || '', capacity: e.capacity,
        price: e.price || 0, price_online: e.price_online || 0, price_archive: e.price_archive || 0,
        offer_physical: e.offer_physical !== false, offer_online: !!e.offer_online, offer_archive: !!e.offer_archive,
        table_capacity: e.table_capacity || 0, aud: toAud(e.audience),
        booking_windows: e.booking_windows || null,
        image_url: e.image_url || '', video_url: e.video_url || '',
        stream_url: e.stream_url || '', is_live: !!e.is_live, live_auto: !!e.live_auto, live_ended: !!e.live_ended, stream_gated: !!e.stream_gated,
        recording_url: e.recording_url || '', rec_title: e.rec_title || '', rec_gated: !!e.rec_gated, rec_price: e.rec_price || 0, archive_only: !!e.archive_only,
        description: e.description || '', tags: Array.isArray(e.tags) ? e.tags : [], pub: e.pub || {} }));
    },
    // всички събития (за админ панела — без филтър по членство; в live разчита на admin RLS)
    async listAllEvents() { return this.listEvents(); },
    // само БРОЯ заети места на събитие (без лични данни — за наличност при членовете)
    async listEventTaken() {
      if (!LIVE) {
        const r = jget(K.res, []); const m = {};
        r.forEach(x => { if (x.event_id && (x.status === 'requested' || x.status === 'confirmed' || !x.status)) m[x.event_id] = (m[x.event_id] || 0) + (x.party || 1); });
        return m;
      }
      const { data } = await sb.from('event_taken').select('event_id,taken');
      const m = {}; (data || []).forEach(r => { m[r.event_id] = r.taken || 0; });
      return m;
    },
    async addEvent(o) {
      if (!LIVE) { const e = seedDemo(); o.id = 'e' + Date.now(); e.unshift(o); jset(K.ev, e); return { error: null }; }
      const { error } = await sb.from('events').insert({ title: o.title, format: o.format, place: o.place, date: o.date || null,
        end_date: o.end_date || null, time: o.time, ends: o.ends || null, capacity: o.capacity || 0,
        price: o.price || 0, price_online: o.price_online || 0, price_archive: o.price_archive || 0,
        offer_physical: o.offer_physical !== false, offer_online: !!o.offer_online, offer_archive: !!o.offer_archive,
        table_capacity: o.table_capacity || null, audience: toAudience(o.aud),
        booking_windows: o.booking_windows || null,
        image_url: o.image_url || null, video_url: o.video_url || null,
        stream_url: o.stream_url || null, is_live: !!o.is_live, live_auto: !!o.live_auto, live_ended: false, stream_gated: !!o.stream_gated,
        description: o.description || null, tags: o.tags || [], pub: o.pub || {} });
      return { error };
    },
    async updateEvent(id, o) {
      if (!LIVE) { let e = seedDemo().map(x => x.id === id ? { ...x, ...o } : x); jset(K.ev, e); return { error: null }; }
      const { error } = await sb.from('events').update({ title: o.title, format: o.format, place: o.place, date: o.date || null,
        end_date: o.end_date || null, time: o.time, ends: o.ends || null, capacity: o.capacity || 0,
        price: o.price || 0, price_online: o.price_online || 0, price_archive: o.price_archive || 0,
        offer_physical: o.offer_physical !== false, offer_online: !!o.offer_online, offer_archive: !!o.offer_archive,
        table_capacity: o.table_capacity || null, audience: toAudience(o.aud),
        booking_windows: o.booking_windows || null,
        image_url: o.image_url || null, video_url: o.video_url || null,
        stream_url: o.stream_url || null, is_live: !!o.is_live, live_auto: !!o.live_auto, stream_gated: !!o.stream_gated,
        description: o.description || null, tags: o.tags || [], pub: o.pub || {} }).eq('id', id);
      return { error };
    },
    // самостоятелен архивен запис (скрито „събитие", показва се само във Видео архив)
    async addArchiveEntry(o) {
      if (!LIVE) { const e = seedDemo(); o.id = 'a' + Date.now(); o.archive_only = true; e.unshift(o); jset(K.ev, e); return { error: null }; }
      const { error } = await sb.from('events').insert({ title: o.title, format: o.format || 'culture', place: o.place || null,
        date: o.date || null, capacity: 0, price: 0, audience: toAudience(o.aud), archive_only: true,
        recording_url: (o.recording_url || '').trim() || null, rec_title: (o.rec_title || '').trim() || null,
        rec_gated: !!o.rec_gated, rec_price: o.rec_price || 0 });
      return { error };
    },
    // запис/архив на събитие (управлява се отделно, за да не се пипа събитието)
    async setRecording(id, r) {
      if (!LIVE) { let e = seedDemo().map(x => x.id === id ? { ...x, recording_url: r.recording_url, rec_title: r.rec_title, rec_gated: r.rec_gated, rec_price: r.rec_price } : x); jset(K.ev, e); return { error: null }; }
      const { error } = await sb.from('events').update({ recording_url: (r.recording_url || '').trim() || null, rec_title: (r.rec_title || '').trim() || null, rec_gated: !!r.rec_gated, rec_price: r.rec_price || 0 }).eq('id', id);
      return { error };
    },
    // бърз превключвател „на живо": включи → старт; изключи → ръчно спиране (важи и за авто)
    async setLive(id, on) {
      if (!LIVE) { let e = seedDemo().map(x => x.id === id ? { ...x, is_live: !!on, live_ended: !on } : x); jset(K.ev, e); return; }
      await sb.from('events').update({ is_live: !!on, live_ended: !on }).eq('id', id);
    },
    async deleteEvent(id) {
      if (!LIVE) {
        jset(K.ev, seedDemo().filter(x => x.id !== id));
        jset(K.res, jget(K.res, []).filter(r => r.event_id !== id && r.table_event_id !== id));
        return;
      }
      // първо махаме резервациите (билети + маси) за това събитие, после самото събитие
      await sb.from('reservations').delete().eq('event_id', id);
      await sb.from('reservations').delete().eq('table_event_id', id);
      await sb.from('events').delete().eq('id', id);
    },

    // ---------- РЕЗЕРВАЦИИ ----------
    async listReservations() {
      if (!LIVE) return jget(K.res, []);
      const { data } = await sb.from('reservations').select('*').order('created_at', { ascending: false });
      return (data || []).map(r => ({ id: r.id, user_id: r.user_id || null, event_id: r.event_id || null, table_event_id: r.table_event_id || null,
        who: r.who || '', membership: r.membership || '', fmt: r.format,
        place: r.place, date: r.date, time: r.time, party: r.party_size, note: r.note, status: r.status,
        kind: r.kind || '', paid: !!r.paid,
        name: r.res_name || '', email: r.contact_email || '', phone: r.contact_phone || '' }));
    },
    async addReservation(o) {
      if (!LIVE) { const r = jget(K.res, []); o.id = 'r' + Date.now(); o.status = 'requested'; r.unshift(o); jset(K.res, r); return { error: null }; }
      const u = await this.getUser();
      // една активна заявка на член за дадено събитие
      if (o.event_id) {
        const { data: ex } = await sb.from('reservations').select('id,status').eq('user_id', u.id).eq('event_id', o.event_id);
        if ((ex || []).some(x => x.status !== 'declined' && x.status !== 'cancelled'))
          return { error: { message: 'duplicate' } };
      }
      const { error } = await sb.from('reservations').insert({ user_id: u.id, event_id: o.event_id || null,
        table_event_id: o.table_event_id || null,
        who: u.username || u.email, membership: u.membership, format: o.fmt,
        place: o.place, date: o.date || null, time: o.time, party_size: o.party || 1, note: o.note, status: 'requested',
        kind: o.kind || null,
        res_name: o.res_name || null, contact_email: o.email || null, contact_phone: o.phone || null });
      return { error };
    },
    // Stripe: създава плащане за билет (тип physical|online|archive). Връща {client_secret} или {free:true}.
    async createPayment(event_id, kind, party) {
      if (!LIVE) return { error: { message: 'Налично след свързване на Supabase' } };
      const { data, error } = await sb.functions.invoke('create-payment', { body: { event_id, kind, party: party || 1 } });
      if (error) {
        let msg = error.message;
        try { const b = await error.context.json(); if (b && b.error) msg = b.error; } catch (e) {}
        return { error: { message: msg } };
      }
      if (data && data.error) return { error: { message: data.error } };
      return data;
    },
    async setReservationStatus(id, status) {
      if (!LIVE) { let r = jget(K.res, []); r = r.map(x => x.id === id ? { ...x, status } : x); jset(K.res, r); return { error: null }; }
      const { error } = await sb.from('reservations').update({ status }).eq('id', id);
      return { error };
    },
    async deleteReservation(id) {
      if (!LIVE) { jset(K.res, jget(K.res, []).filter(x => x.id !== id)); return { error: null }; }
      const { error } = await sb.from('reservations').delete().eq('id', id);
      return { error };
    },

    // ---------- ЗАПАЗЕНИ СЪБИТИЯ ----------
    async listSaved() {
      if (!LIVE) return jget(K.saved, []);
      const { data } = await sb.from('saved_events').select('event_id');
      return (data || []).map(x => x.event_id);
    },
    async toggleSaved(eventId) {
      if (!LIVE) {
        let s = jget(K.saved, []);
        if (s.includes(eventId)) s = s.filter(x => x !== eventId); else s.push(eventId);
        jset(K.saved, s); return s.includes(eventId);
      }
      const u = await this.getUser();
      const have = (await this.listSaved()).includes(eventId);
      if (have) { await sb.from('saved_events').delete().eq('user_id', u.id).eq('event_id', eventId); return false; }
      await sb.from('saved_events').insert({ user_id: u.id, event_id: eventId }); return true;
    },

    // ---------- ПАРОЛИ ----------
    async resetPassword(email) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { error } = await sb.auth.resetPasswordForEmail((email || '').trim(),
        { redirectTo: location.href.split('#')[0] });
      return { error };
    },
    async updatePassword(p) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { error } = await sb.auth.updateUser({ password: p });
      return { error };
    },
    // извиква cb(), когато потребителят дойде по линк за нова парола
    onRecovery(cb) {
      if (LIVE && sb) sb.auth.onAuthStateChange((ev) => { if (ev === 'PASSWORD_RECOVERY') cb(); });
    },

    // Реалтайм: известява мигновено, когато събитие се промени (вкл. тръгване/спиране на живо).
    // Изисква в Supabase: realtime да е включен за таблица events (виж sql/realtime_events.sql).
    onLiveChange(cb) {
      if (!(LIVE && sb)) return null;
      try {
        return sb.channel('events-live')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'events' },
            (payload) => { try { cb(payload.new || payload.old || null); } catch (e) {} })
          .subscribe();
      } catch (e) { return null; }
    },

    // ---------- ПОКАНИ (само админ; през Edge Function) ----------
    // fullName и phone идват от кандидатурата — пренасяме ги в профила,
    // за да не пита приложението за тях след първото влизане.
    async inviteMember(email, username, membership, validFrom, fullName, phone) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { data, error } = await sb.functions.invoke('invite-member',
        { body: { email: (email || '').trim(), username: (username || '').trim(), membership: membership || 'guest',
                  valid_from: validFrom || null, full_name: (fullName || '').trim(), phone: (phone || '').trim() } });
      if (error) {
        let msg = error.message;
        try { const b = await error.context.json(); if (b && b.error) msg = b.error; } catch (e) {}
        return { error: { message: msg } };
      }
      if (data && data.error) return { error: { message: data.error } };
      return { error: null, password: data && data.password, until: data && data.until };
    },
    // корекция на телефон на член (само админ)
    async adminSetPhone(id, phone) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { data, error } = await sb.functions.invoke('invite-member', { body: { action: 'set_phone', id, phone } });
      if (error) {
        let msg = error.message;
        try { const b = await error.context.json(); if (b && b.error) msg = b.error; } catch (e) {}
        return { error: { message: msg } };
      }
      if (data && data.error) return { error: { message: data.error } };
      return { error: null };
    },
    // искане за нов телефон (само админ) — членът ще бъде подканен при следващо влизане
    // админ сменя името на член (нулира 3-месечния период)
    async adminSetName(id, name) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { error } = await sb.from('profiles').update({ full_name: (name || '').trim(), name_changed_at: null }).eq('id', id);
      return { error };
    },
    async adminRequestPhone(id) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { data, error } = await sb.functions.invoke('invite-member', { body: { action: 'request_phone', id } });
      if (error) {
        let msg = error.message;
        try { const b = await error.context.json(); if (b && b.error) msg = b.error; } catch (e) {}
        return { error: { message: msg } };
      }
      if (data && data.error) return { error: { message: data.error } };
      return { error: null };
    },
    // смяна на членска категория (само админ)
    async setMembership(email, membership) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { data, error } = await sb.functions.invoke('invite-member',
        { body: { action: 'set_membership', email: (email || '').trim(), membership } });
      if (error) {
        let msg = error.message;
        try { const b = await error.context.json(); if (b && b.error) msg = b.error; } catch (e) {}
        return { error: { message: msg } };
      }
      if (data && data.error) return { error: { message: data.error } };
      return { error: null, membership: data && data.membership };
    },
    // ---------- ФИРМЕНИ ПРОФИЛИ (корпоративно членство) ----------
    async companyMembers() {
      if (!LIVE) return { members: [], max: 5 };
      const { data, error } = await sb.functions.invoke('invite-member', { body: { action: 'company_members' } });
      if (error || !data || data.error) return { members: [], max: 5 };
      return { members: data.members || [], max: data.max || 5 };
    },
    async companyInvite(email, username) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { data, error } = await sb.functions.invoke('invite-member',
        { body: { action: 'company_invite', email: (email || '').trim(), username: (username || '').trim() } });
      if (error) {
        let msg = error.message;
        try { const b = await error.context.json(); if (b && b.error) msg = b.error; } catch (e) {}
        return { error: { message: msg } };
      }
      if (data && data.error) return { error: { message: data.error } };
      return { error: null };
    },

    // ---------- КАНДИДАТУРИ / ПРЕДЛОЖЕНИЯ ----------
    // Кандидатурата вече НЕ се записва директно в базата. Минава през Edge функция,
    // която първо проверява captcha-та при Cloudflare. Иначе всеки бот можеше да
    // напълни таблицата с милиони записи.
    async submitApplication(o) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { data, error } = await sb.functions.invoke('submit-application', {
        body: {
          captcha_token: o.captcha_token || '',
          rules_accepted: !!o.rules_accepted,
          nominate: !!o.nominate,
          membership: o.membership || null,
          name: o.name || null, email: (o.email || '').trim() || null, phone: o.phone || null,
          profession: o.profession || null, interests: o.interests || null, about: o.about || null,
          alumni_relation: o.alumni_relation || null,
          corp_bulstat: o.corp_bulstat || null, corp_size: o.corp_size || null, corp_activity: o.corp_activity || null
        }
      });
      if (error) {
        // тялото на грешката носи причината
        let reason = '';
        try { reason = (await error.context.json()).error || ''; } catch (e) {}
        if (reason === 'cooldown') return { error: { cooldown: true } };
        if (reason === 'dup') return { error: { dup: true } };
        if (reason === 'captcha') return { error: { captcha: true } };
        return { error: { message: reason || error.message } };
      }
      if (data && data.error) return { error: { message: data.error } };
      return { error: null };
    },
    async listApplications() {
      if (!LIVE) return [];
      const { data } = await sb.from('applications').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    async setApplicationStatus(id, status) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { error } = await sb.from('applications').update({ status }).eq('id', id);
      return { error };
    },
    async deleteApplication(id) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { error } = await sb.from('applications').delete().eq('id', id);
      return { error };
    },

    // списък с всички членове (само админ)
    // Връща масив при успех, или NULL при грешка. Празен масив значи "наистина няма членове".
    // Преди връщаше [] и при двете — затова при трепване на мрежата пишеше "Все още няма членове".
    async listMembers() {
      if (!LIVE) return [];
      window.__membersErr = '';
      // Edge функциите заспиват; първото извикване понякога пада. Опитваме два пъти.
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const { data, error } = await sb.functions.invoke('invite-member', { body: { action: 'members' } });
          if (error) {
            let msg = error.message;
            try { const b = await error.context.json(); if (b && b.error) msg = b.error; } catch (e) {}
            window.__membersErr = msg;
          } else if (!data || data.error) {
            window.__membersErr = (data && data.error) || 'няма отговор от сървъра';
          } else {
            window.__membersErr = '';
            return data.members || [];
          }
        } catch (e) { window.__membersErr = String((e && e.message) || e); }
        if (attempt === 0) await new Promise(r => setTimeout(r, 700));
      }
      return null;
    },
    // изтриване на член (само админ)
    async deleteMember(id) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { data, error } = await sb.functions.invoke('invite-member', { body: { action: 'delete_user', id } });
      if (error) {
        let msg = error.message;
        try { const b = await error.context.json(); if (b && b.error) msg = b.error; } catch (e) {}
        return { error: { message: msg } };
      }
      if (data && data.error) return { error: { message: data.error } };
      return { error: null };
    },
    // членът изтрива собствения си акаунт (GDPR)
    async deleteSelfAccount() {
      if (!LIVE) { localStorage.removeItem(K.user); return { error: null }; }
      const { data, error } = await sb.functions.invoke('invite-member', { body: { action: 'delete_self' } });
      if (error) {
        let msg = error.message;
        try { const b = await error.context.json(); if (b && b.error) msg = b.error; } catch (e) {}
        return { error: { message: msg } };
      }
      if (data && data.error) return { error: { message: data.error } };
      await sb.auth.signOut();
      return { error: null };
    },
    // членът отказва собствена резервация
    async cancelOwnReservation(id) {
      if (!LIVE) { let r = jget(K.res, []); r = r.map(x => x.id === id ? { ...x, status: 'cancelled' } : x); jset(K.res, r); return { error: null }; }
      const { error } = await sb.from('reservations').update({ status: 'cancelled' }).eq('id', id);
      return { error };
    },

    // ---------- ОБЯВИ ----------
    async listAnnouncements() {
      if (!LIVE) return jget('acac_ann', []);
      try { const { data } = await sb.from('announcements').select('*').order('created_at', { ascending: false }); return data || []; }
      catch (e) { return []; }
    },
    async createAnnouncement(a) {
      if (!LIVE) { const l = jget('acac_ann', []); l.unshift({ id: 'a' + Date.now(), created_at: new Date().toISOString(), ...a }); jset('acac_ann', l); return { error: null }; }
      const { data: ses } = await sb.auth.getSession();
      const row = {
        title: a.title, body: a.body, audience: a.audience || 'all',
        memberships: a.memberships || [], user_ids: a.user_ids || [],
        created_by: ses && ses.session ? ses.session.user.id : null
      };
      const { error } = await sb.from('announcements').insert(row);
      return { error };
    },
    async deleteAnnouncement(id) {
      if (!LIVE) { jset('acac_ann', jget('acac_ann', []).filter(x => x.id !== id)); return { error: null }; }
      const { error } = await sb.from('announcements').delete().eq('id', id);
      return { error };
    },

    // ---------- ЖУРНАЛ ----------
    async logAudit(action, target, details) {
      if (!LIVE) return;
      try {
        const { data: ses } = await sb.auth.getSession();
        const uid = ses && ses.session ? ses.session.user.id : null;
        let nm = '';
        if (uid) { try { const r = await sb.from('profiles').select('username,full_name').eq('id', uid).single(); nm = (r.data && (r.data.full_name || r.data.username)) || ''; } catch (e) {} }
        await sb.from('audit_log').insert({ actor: uid, actor_name: nm, action, target: target || '', details: details || '' });
      } catch (e) {}
    },
    async listAudit(limit) {
      if (!LIVE) return [];
      const { data } = await sb.from('audit_log').select('*').order('created_at', { ascending: false }).limit(limit || 300);
      return data || [];
    },
    // подновяване на членство (само админ) — удължава с 1 година от дадена дата
    async renewMembership(email, validFrom) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { data, error } = await sb.functions.invoke('invite-member',
        { body: { action: 'renew', email: (email || '').trim(), valid_from: validFrom || null } });
      if (error) {
        let msg = error.message;
        try { const b = await error.context.json(); if (b && b.error) msg = b.error; } catch (e) {}
        return { error: { message: msg } };
      }
      if (data && data.error) return { error: { message: data.error } };
      return { error: null, until: data && data.until };
    },
    // имейл до члена при одобрена/отказана резервация (само админ)
    async notifyReservation(id, status) {
      if (!LIVE) return { error: null };
      const { data, error } = await sb.functions.invoke('reservation-status',
        { body: { reservation_id: id, status } });
      if (error) {
        let msg = error.message;
        try { const b = await error.context.json(); if (b && b.error) msg = b.error; } catch (e) {}
        return { error: { message: msg } };
      }
      if (data && data.error) return { error: { message: data.error } };
      return { error: null };
    },
    // нова временна парола за съществуващ член (само админ)
    async adminResetPassword(email) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { data, error } = await sb.functions.invoke('invite-member',
        { body: { action: 'reset', email: (email || '').trim() } });
      if (error) {
        let msg = error.message;
        try { const b = await error.context.json(); if (b && b.error) msg = b.error; } catch (e) {}
        return { error: { message: msg } };
      }
      if (data && data.error) return { error: { message: data.error } };
      return { error: null, password: data && data.password };
    },

    MEMBERSHIPS: MEM
  };

  window.DB = DB;
})();
