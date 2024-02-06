"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Button } from "../ui/button";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import { useContext } from "react";
import { FormsContext } from "@/context/FormContext";
import { FaRegEdit } from "react-icons/fa";

const formSchema = z.object({
  name: z.string().min(2),
});
export default function EditNameForm({ nameForm,formId,setForm }) {
  const { updateNameForm } = useContext(FormsContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: nameForm,
    },
  });
  const dialogClose = () => {
    document.getElementById('closeDialog')?.click();
  };
  
  async function onSubmit(values) {
    try {
      const { name } = values;

      const {data,error} = await updateNameForm({ formId,name });
      if (data){ setForm(data[0]);
      toast({
        title: "Success",
        description: `Form created successfully`,
      });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Something went wrong, please try again later \n ${error}`,
        variant: "destructive",
      });
    }dialogClose()
  }

  return (
    <div className="flex items-center ">
      <div className="flex-1 text-2xl font-semibold">{nameForm}</div>
      <Dialog>
        <DialogTrigger className=" max-h-16 " asChild>
          <Button variant="ghost" className="flex justify-center items-center ">
            <FaRegEdit className="w-6 h-6  fill-black" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>{" "}
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting}
              className=""
              variant="default"
            >
              <span>Save</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
