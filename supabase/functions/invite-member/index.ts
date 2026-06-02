// Supabase Edge Function: invite-member
// Кани нов член по имейл. Само администратор може да вика тази функция.
// Поканеният получава имейл да си зададе парола; категорията се задава предварително.
//
// Деплой (виж ADMIN-README): Supabase → Edge Functions → Deploy, или
//   supabase functions deploy invite-member
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
    const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // 1) Кой вика функцията?
    const authHeader = req.headers.get("Authorization") || "";
    const asUser = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
    const { data: { user } } = await asUser.auth.getUser();
    if (!user) return json({ error: "Not signed in" }, 401);

    // 2) Админ ли е?
    const admin = createClient(url, service);
    const { data: prof } = await admin.from("profiles").select("role").eq("id", user.id).single();
    if (!prof || prof.role !== "admin") return json({ error: "Not an admin" }, 403);

    // 3) Покани
    const { email, username, membership } = await req.json();
    if (!email) return json({ error: "Email required" }, 400);
    const origin = req.headers.get("origin") || "";
    const { error } = await admin.auth.admin.inviteUserByEmail(email, {
      data: { username: username || String(email).split("@")[0], membership: membership || "guest" },
      redirectTo: origin ? origin + "/index.html" : undefined,
    });
    if (error) return json({ error: error.message }, 400);
    return json({ ok: true });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
