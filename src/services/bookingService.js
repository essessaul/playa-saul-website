import { supabase } from "../lib/supabaseClient";

export async function createBooking(payload) {
  if (supabase) {
    const { data, error } = await supabase.from("bookings").insert([payload]).select().single();
    if (error) throw error;
    return { success: true, bookingId: data.id, data };
  }
  return { success: true, bookingId: `BK-${Date.now()}` };
}
