import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { ThemeName } from "@/types";
import { hasSupabaseTheme, supabaseServerClient } from "@/server/supabaseClient";

const THEME_COOKIE_NAME = "anon_theme_id";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const theme = body?.theme as ThemeName | undefined;

		if (!theme || !["nintendo", "dark-teal", "dark-green", "light-neutral"].includes(theme)) {
			return NextResponse.json({ error: "Invalid theme" }, { status: 400 });
		}

		// If Supabase is not configured (e.g., production Netlify with no secrets),
		// treat this as a no-op but still return success so the UI doesn't break.
		if (!hasSupabaseTheme || !supabaseServerClient) {
			return new NextResponse(null, { status: 204 });
		}

		const cookieStore = await cookies();
		let anonId = cookieStore.get(THEME_COOKIE_NAME)?.value;
		if (!anonId) {
			anonId = crypto.randomUUID();
		}

		// Use non-null assertion since we already checked above.
		const client = supabaseServerClient!;
		const { error } = await client
			.from("theme_preferences")
			.upsert({ anon_id: anonId, theme }, { onConflict: "anon_id" });
		if (error) {
			console.error("Supabase theme upsert error", error);
		}

		const response = new NextResponse(null, { status: 204 });
		// Always (re)set the cookie so anon_id is consistent.
		if (anonId) {
			response.cookies.set(THEME_COOKIE_NAME, anonId, {
				path: "/",
				maxAge: 60 * 60 * 24 * 365,
				httpOnly: true,
				sameSite: "lax",
			});
		}

		return response;
	} catch {
		return NextResponse.json({ error: "Bad request" }, { status: 400 });
	}
}
