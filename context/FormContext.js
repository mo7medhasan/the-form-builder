"use client";
import React, { createContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);
export const FormsContext = createContext();

export const FormsProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [forms, setForms] = useState([]);
  //   const [fields, setFields] = useState([]);

  useEffect(() => {
    // Fetch forms and

    const fetchData = async () => {
      try {
        const { data: formsData } = await supabaseClient
          .from("Forms")
          .select()
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        // const { data: fieldsData } = await supabaseClient.from('fields').select();

        setForms(formsData);
        // setFields(fieldsData);
      } catch (error) {
        console.error("Error fetching forms and fields:", error);
      }
    };
    // Fetch user data
    const fetchUser = async () => {
      fetch("/api/user")
        .then((res) => res.json())
        .then((user) => setUser(user))
        .catch((error) => console.error("Error fetching user:", error));
    };

    if (user) {
      fetchData();
    } else {
      fetchUser();
    }
  }, [user]);

  const createForm = async ({ name }) => {
    const { data, error } = await supabaseClient
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

    setForms((prev) => [data[0], ...prev]);
    return data;
  };

  const getForm = async (formId) => {
    const { data, error } = await supabaseClient
      .from("Forms")
      .select()
      .eq("id", formId)
      .eq("user_id", user?.id || null);
    if (!data) {
      throw new Error("something went wrong");
    }

    if (error) {
      throw new Error(`something went wrong ${error}`);
    }

    return { data, error };
  };
  const updateNameForm = async ({formId, name}) => {
    const { data, error } = await supabaseClient
      .from("Forms")
      .update({ name: name })
      .eq("id", formId)
      .eq("user_id", user?.id || null).select();
    if (!data) {
      throw new Error("something went wrong");
    }

    if (error) {
      throw new Error(`something went wrong ${error}`);
    }

    return { data, error };
  };

  const deleteForm = async (formId) => {
    const { error, data } = await supabaseClient
      .from("Forms")
      .delete()
      .eq("id", formId)
      .eq("user_id", user.id);
    if (error) {
      throw error;
    }
    setForms((prev) => prev.filter((prev) => prev.id !== formId));
    console.log("Row deleted successfully:", data);
    return { data, error };
  };

  // ... other methods for handling forms and fields

  return (
    <FormsContext.Provider
      value={{
        user,
        forms,
        // fields,
        getForm,
        createForm,
        updateNameForm,
        deleteForm,
        // ... other methods
      }}
    >
      {children}
    </FormsContext.Provider>
  );
};
