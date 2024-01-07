"use client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { Button } from "../ui/button"
   
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast"
import { CreateForm } from "@/actions/form"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2),
})
function AddForm() {

const router=useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        name: "",
        },
      })

      async function onSubmit(values) {
    
        
        try {
          const {name} =values
       
          const  dataForm =await CreateForm({name});
          
          toast({
            title: "Success",
            description: `Form created successfully ${dataForm[0]?.id}`,
          });
          form.reset()
          router.push(`/builder/${dataForm[0]?.id}`);
        
        } catch (error) {
          toast({
            title: "Error",
            description: `Something went wrong, please try again later \n ${error}`,
            variant: "destructive",
          });
        }
      }
    
  return (
    <Dialog>
    <DialogTrigger className=" max-h-16 " asChild>
    <Button variant="outline" className="w-full h-full flex justify-center items-center gap-1 flex-col font-bold p-1 ">
      <AiOutlinePlusCircle  color="black" className=" w-5 h-5" />

      New Form
      </Button>
      </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Form</DialogTitle>
        
      </DialogHeader>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
          </DialogClose> <Button onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className="" variant="default">
           
            <span>Save</span>
          </Button>
        </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default AddForm