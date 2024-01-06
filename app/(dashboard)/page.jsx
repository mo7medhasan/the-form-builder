import AddForm from "@/components/forms/AddForm";
import FormCards from "@/components/forms/FormCards";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="container min-h-full h-full w-full flex justify-center items-center">
      <div className="bg-[#fefefe]  w-full py-4 lg:py-8 max-w-md shadow-xl h-full rounded-2xl border-[0.5px] gap-y-2 flex flex-col">
        <div className=" w-full px-4 lg:px-8 pb-4 lg:pb-8">
          <AddForm />
        </div>
        <Separator className="w-full" />
        <div className=" grid gap-y-1">
          <FormCards />
        </div>
      </div>
    </div>
  );
}
