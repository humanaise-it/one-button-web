// supabase/functions/deepgram-token/index.ts

import { serve } from "https://deno.land/std/http/mod.ts";

serve(async (req) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 🔐 Public Supabase Auth token
  const supabaseToken = authHeader.replace("Bearer ", "");

  // OPTIONAL: verify token with Supabase if you want (good practice)
  // (for MVP you may skip this step)

  // 🔑 Your Deepgram main API key (this stays ONLY in Edge Function)
  const DEEPGRAM_API_KEY = Deno.env.get("DEEPGRAM_API_KEY");
  const DEEPGRAM_PROJECT_ID = Deno.env.get("DEEPGRAM_PROJECT_ID");

  if (!DEEPGRAM_API_KEY || !DEEPGRAM_PROJECT_ID) {
    return new Response("Server missing Deepgram config", { status: 500 });
  }

  const dgRes = await fetch(
    `https://api.deepgram.com/v1/projects/${DEEPGRAM_PROJECT_ID}/keys`,
    {
      method: "POST",
      headers: {
        "Authorization": `Token ${DEEPGRAM_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: "temporary-token",
        scopes: ["usage:write", "usage:read", "transcribe"], // minimal perms
        time_to_live: 300 // 5 minutes
      }),
    }
  );

  if (!dgRes.ok) {
    return new Response("Deepgram token error", { status: 500 });
  }

  const data = await dgRes.json();

  return new Response(JSON.stringify({
    token: data.key,
    expires_in: 300
  }), {
    headers: { "Content-Type": "application/json" },
  });
});
