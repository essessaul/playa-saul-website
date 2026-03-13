import { properties } from "../data/mockData";
import { supabase } from "../lib/supabaseClient";

export async function getProperties() {
  if (supabase) {
    const { data, error } = await supabase.from("properties").select("*").order("name");
    if (!error && data?.length) return data;
  }
  return properties;
}

export async function getPropertyBySlug(slug) {
  if (supabase) {
    const { data, error } = await supabase.from("properties").select("*").eq("slug", slug).single();
    if (!error && data) return data;
  }
  return properties.find((property) => property.slug === slug) || null;
}
