import { cookies } from "next/headers";

import type { ThemeName } from "@/types";
import { hasSupabaseTheme, supabaseServerClient } from "./supabaseClient";

const THEME_COOKIE_NAME = "anon_theme_id";
const DEFAULT_THEME: ThemeName = "nintendo";

export async function getThemeForRequest(): Promise<ThemeName> {
  if (!hasSupabaseTheme || !supabaseServerClient) {
    return DEFAULT_THEME;
  }

	const cookieStore = await cookies();
	const anonId = cookieStore.get(THEME_COOKIE_NAME)?.value;

	if (!anonId) {
		return DEFAULT_THEME;
	}

	const { data, error } = await supabaseServerClient
		.from("theme_preferences")
		.select("theme")
		.eq("anon_id", anonId)
		.maybeSingle();

  if (error || !data?.theme) {
    return DEFAULT_THEME;
  }

  if (
    data.theme === "nintendo" ||
    data.theme === "dark-teal" ||
    data.theme === "dark-green" ||
    data.theme === "light-neutral"
  ) {
    return data.theme;
  }

  return DEFAULT_THEME;
}
