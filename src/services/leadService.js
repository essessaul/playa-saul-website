import { supabase } from "../lib/supabaseClient";

export async function createLead(payload) {
  if (supabase) {
    const table = payload.pipeline === "sales"
      ? "sales_leads"
      : payload.pipeline === "owners"
      ? "owner_leads"
      : "rental_leads";

    const insertPayload =
      payload.pipeline === "sales"
        ? {
            full_name: payload.name,
            email: payload.email,
            phone: payload.phone,
            message: payload.message,
            stage: "New Buyer",
            property_interest: payload.property_interest || null,
            budget: payload.budget || null,
          }
        : {
            full_name: payload.name,
            email: payload.email,
            phone: payload.phone,
            message: payload.message,
            status: "new",
          };

    const { data, error } = await supabase.from(table).insert([insertPayload]).select().single();
    if (error) throw error;
    return {
      success: true,
      leadId: data.id
    };
  }

  return {
    success: true,
    leadId: `LD-${Date.now()}`
  };
}

export async function getLeadPipelines() {
  return {
    rentals: ["New Inquiry", "Qualified", "Quoted", "Booked"],
    sales: ["New Buyer", "Contacted", "Site Visit", "Negotiation", "Closed"],
    owners: ["New Owner Lead", "Follow Up", "Proposal Sent", "Onboarded"]
  };
}
