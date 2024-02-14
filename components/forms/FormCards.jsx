"use client"
import React from "react";
import FormCard from "./FormCard";
import { useContext } from "react";
import { FormsContext } from "@/context/FormContext"; 
export default  function FormCards() {
  const { forms } = useContext(FormsContext);
 return (
    <>
      {forms?.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}
