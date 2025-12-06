// functions/public_join_waitlist/index.ts

import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

serve(async (req) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response("ok", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }
    const {
      email,
      source,
      device,
      user_agent,
      locale,
      referrer,
      marketing_id,
    } = await req.json();

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
      });
    }

    // Extract raw IP → mask last octet
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "0.0.0.0";

    const ipParts = ip.split(".");
    const ipPrefix =
      ipParts.length === 4 ? `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.x` : null;

    // Supabase client using SERVICE ROLE KEY
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase.from("waitlist").insert([
      {
        email,
        source,
        device,
        user_agent,
        locale,
        referrer,
        marketing_id,
        ip_prefix: ipPrefix,
      },
    ]);

    if (error) {
      if (error.code === "23505") {
        return new Response(
          JSON.stringify({ success: true, duplicate: true }),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            }
          }
    );
      }
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
