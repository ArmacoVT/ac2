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
    async uploadMedia(file) {
      if (!LIVE) return { error: { message: 'demo' } };
      const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
      const path = Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + ext;
      const up = await sb.storage.from('event-media').upload(path, file, { upsert: true, contentType: file.type });
      if (up.error) return { error: up.error };
      const { data } = sb.storage.from('event-media').getPublicUrl(path);
      return { url: data.publicUrl };
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
        price: e.price || 0, table_capacity: e.table_capacity || 0, aud: toAud(e.audience),
        booking_windows: e.booking_windows || null,
        image_url: e.image_url || '', video_url: e.video_url || '',
        stream_url: e.stream_url || '', is_live: !!e.is_live, live_auto: !!e.live_auto, live_ended: !!e.live_ended, stream_gated: !!e.stream_gated,
        recording_url: e.recording_url || '', rec_gated: !!e.rec_gated, rec_price: e.rec_price || 0 }));
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
        price: o.price || 0, table_capacity: o.table_capacity || null, audience: toAudience(o.aud),
        booking_windows: o.booking_windows || null,
        image_url: o.image_url || null, video_url: o.video_url || null,
        stream_url: o.stream_url || null, is_live: !!o.is_live, live_auto: !!o.live_auto, live_ended: false, stream_gated: !!o.stream_gated,
        recording_url: o.recording_url || null, rec_gated: !!o.rec_gated, rec_price: o.rec_price || 0 });
      return { error };
    },
    async updateEvent(id, o) {
      if (!LIVE) { let e = seedDemo().map(x => x.id === id ? { ...x, ...o } : x); jset(K.ev, e); return { error: null }; }
      const { error } = await sb.from('events').update({ title: o.title, format: o.format, place: o.place, date: o.date || null,
        end_date: o.end_date || null, time: o.time, ends: o.ends || null, capacity: o.capacity || 0,
        price: o.price || 0, table_capacity: o.table_capacity || null, audience: toAudience(o.aud),
        booking_windows: o.booking_windows || null,
        image_url: o.image_url || null, video_url: o.video_url || null,
        stream_url: o.stream_url || null, is_live: !!o.is_live, live_auto: !!o.live_auto, stream_gated: !!o.stream_gated,
        recording_url: o.recording_url || null, rec_gated: !!o.rec_gated, rec_price: o.rec_price || 0 }).eq('id', id);
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
        res_name: o.res_name || null, contact_email: o.email || null, contact_phone: o.phone || null });
      return { error };
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
    async inviteMember(email, username, membership, validFrom) {
      if (!LIVE) return { error: { message: 'demo' } };
      const { data, error } = await sb.functions.invoke('invite-member',
        { body: { email: (email || '').trim(), username: (username || '').trim(), membership: membership || 'guest', valid_from: validFrom || null } });
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
    async submitApplication(o) {
      if (!LIVE) return { error: { message: 'demo' } };
      const ins = {
        type: o.nominate ? 'nomination' : 'application',
        kind: o.membership === 'corporate' ? 'corporate' : 'individual',
        membership: o.membership || null,
        name: o.name || null, email: (o.email || '').trim() || null, phone: o.phone || null,
        profession: o.profession || null, interests: o.interests || null, about: o.about || null,
        alumni_relation: o.alumni_relation || null,
        corp_bulstat: o.corp_bulstat || null, corp_size: o.corp_size || null, corp_activity: o.corp_activity || null,
        status: 'new'
      };
      if (o.nominate && sb) {
        try { const { data } = await sb.auth.getSession(); const s = data.session;
          if (s) { ins.proposer_id = s.user.id; ins.proposer_email = s.user.email; } } catch (e) {}
      }
      const { error } = await sb.from('applications').insert(ins);
      if (error) {
        const msg = error.message || '';
        if (/cooldown_30/i.test(msg)) return { error: { cooldown: true } };
        if (error.code === '23505' || /duplicate|unique|app_email_pending|app_bulstat_pending/i.test(msg)) return { error: { dup: true } };
        return { error };
      }
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
    async listMembers() {
      if (!LIVE) return [];
      try {
        const { data, error } = await sb.functions.invoke('invite-member', { body: { action: 'members' } });
        if (error) { try { const b = await error.context.json(); window.__membersErr = (b && b.error) || error.message; } catch (e) { window.__membersErr = error.message; } return []; }
        if (!data || data.error) { window.__membersErr = (data && data.error) || 'няма отговор'; return []; }
        window.__membersErr = '';
        return data.members || [];
      } catch (e) { window.__membersErr = String((e && e.message) || e); return []; }
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
