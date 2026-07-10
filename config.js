// ============================================================
//  НАСТРОЙКА НА БЕКЕНДА (Supabase)
//  Постави тук двете стойности от Supabase → Project Settings → API.
//  Докато стоят "PASTE_…", приложението работи в демо режим (данни в браузъра).
//  Щом ги попълниш, всичко минава през общата база и се вижда при всички.
// ============================================================
window.ACAC_CONFIG = {
  SUPABASE_URL: "https://twcxfqgknhqicxqghcrx.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_rE--I_P0IobbEwZweCMbsw_6ERycjQv",
  // Stripe публичен ключ (безопасен за клиента). Тестов е, докато е pk_test_…
  STRIPE_PK: "pk_test_51To1PvLM77iTWPGYLqXxWRPsObwEVrUEw20d9vIb9TWdv2aOJZuFqarlUZExFImpxD5C42NA4dAOVad0F98GdBUv00oiIMDhFj",
  // Cloudflare Turnstile — ПУБЛИЧНИЯТ ключ (Site Key). Безопасен е за клиента.
  // Тайният (Secret Key) отива САМО в Supabase → Edge Functions → Secrets, като TURNSTILE_SECRET_KEY.
  // Докато този ред е празен, captcha-та не се показва и формата работи както преди.
  TURNSTILE_SITE_KEY: "0x4AAAAAADzBXlrVTbWnEJn9с"
};
