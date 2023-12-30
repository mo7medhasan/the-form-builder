"use server";

import { supabaseClient } from "@/utils/supabaseClient";
import { currentUser } from "@clerk/nextjs";

export async function CreateForm({ name }) {
  const supabase = await supabaseClient();
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  const { data, error } = await supabase
    .from("Forms")
    .insert([
      {
        user_id: user.id,
        name: name,
        published: false,
        submissions: 0,
        shareURL: "",
      },
    ])
    .select();
  if (!data) {
    throw new Error("something went wrong");
  }

  if (error) {
    throw new Error(`something went wrong ${error}`);
  }

  return data;
}
export async function GetForms() {
  const supabase = await supabaseClient();
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  let { data: Forms, error } = await supabase
    .from("Forms")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (!Forms) {
    throw new Error("something went wrong");
  }

  if (error) {
    throw new Error(`something went wrong ${error}`);
  }

  return Forms;
}

export async function DeleteForm(id ) {
  try {
    const supabase = await supabaseClient();
    const user = await currentUser();
    if (!user) {
      throw new UserNotFoundErr();
    }

    const { error } = await supabase
      .from("Forms")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);
    if (error) {
      throw error;
    }

    console.log("Row deleted successfully:", data);
  } catch (error) {
    console.error("Error deleting row:", error.message);
  }
}
