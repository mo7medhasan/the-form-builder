"use client"
// import { GetForms } from "@/actions/form";
import React from "react";
import FormCard from "./FormCard";
import { useContext } from "react";
import { FormsContext } from "@/context/FormContext"; 
export default  function FormCards() {
  const { forms } = useContext(FormsContext);

  // const forms=await GetForms()
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}
