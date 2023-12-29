"use server";

import { supabaseClient } from "@/utils/supabaseClient";
import { currentUser } from "@clerk/nextjs";

export async function CreateForm({name}) {

const supabase=await supabaseClient()
const user = await currentUser();
if (!user) {
  throw new UserNotFoundErr();
}
  const { data, error } = await supabase.from('Forms')
  .insert([
    {
      user_id:user.id,
      name:name,
      published:false,
      submissions	:0,
      shareURL	:"",
    },
  ]).select()
  if (!data) {
    throw new Error("something went wrong");
  }

 if (error) {
    throw new Error(`something went wrong ${error}`);
  }

  return data;
}
