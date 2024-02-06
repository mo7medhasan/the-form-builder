"use client";
import React, { useContext, useEffect, useState } from "react";
import { FormsContext } from "@/context/FormContext";
import { Separator } from "@/components/ui/separator";
import EditNameForm from "@/components/forms/EditNameForm";

export default function Builder({ params: { slug } }) {
  const { getForm } = useContext(FormsContext);
  const [form, setForm] = useState();
  useEffect(() => {
    const fetchForm = async (slug) => {
      const { data, error } = await getForm(slug);
      if (data) setForm(data[0]);
    };

    fetchForm(slug);
  }, [getForm, slug]);

  return (
    <div className="container min-h-full h-full w-full flex justify-center items-center">
      <div className="bg-[#fefefe]  w-full py-4 lg:py-8 max-w-md shadow-xl h-full rounded-2xl border-[0.5px] gap-y-2 flex flex-col">
        <div className=" w-full px-4 lg:px-8 pb-4 lg:pb-8">
         {form?.name&& <EditNameForm nameForm={form?.name} formId={slug} setForm={setForm} />}
        </div>
        <Separator className="w-full" />
        <div className=" grid gap-y-1"></div>
      </div>
    </div>
  );
}
