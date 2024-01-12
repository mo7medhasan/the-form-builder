"use client"
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import {   formatDistance } from "date-fns";
import { DeleteForm } from "@/actions/form";

export default function FormCard({ form }) {
 const formattedDate = formatDistance(form.created_at,new Date());
const handleDelete=async(e)=>{

  await DeleteForm(form?.id);}
  return (
    <div
      // href={form.published ? `/builder/${form.id}` : `/builder/${form.id}`}
      className={`w-full p-2 lg:p-4 bg-[#EEE] hover:bg-[#EEE]/80 rounded-lg 
border-[0.5px]`}
    >
      <div className="flex ">
        <div className="flex-1 flex flex-col">
          <p className="font-bold text-lg truncate"> {form?.name}</p>
       <p className="text-[#666] text-sm">  {formattedDate}</p> 
        </div>

        <div className="flex gap-x-2 items-center">
        <Link href={`/builder/${form?.id}`}>  <FaRegEdit className="w-6 h-6  fill-black" />
        </Link>  <button type="button" onClick={(e)=>handleDelete(e)} >
          <MdDelete className="w-6 h-6  fill-red-400"/>
       </button> </div>
      </div>
    </div>
  );
}
