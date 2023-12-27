import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div className="container pt-4">
  
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
   
      </div>
    </div>
  )
}
