"use client"

import React, { useState } from 'react'
import DashboardNav from '../../DashboardNav'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toBase64 } from '../../base64convert'
import { redirect } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import Image from 'next/image';
import { Button } from '@/components/ui/button'

const portfolioFormSchema = z.object({
    title : z.string(),
    description: z.string(),
    url: z.string().optional(),
    github_url: z.string().optional(),
    imageInput: z.string(),
})

const NewPortfolio = () => {
  const {toast} = useToast()
  const form = useForm<z.infer<typeof portfolioFormSchema>>({
    resolver: zodResolver(portfolioFormSchema),
  })

  const [image, setImage] = useState<string | undefined>()
  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const base64Image = await toBase64(e.target.files[0])
    setImage(base64Image as string);
  };

  async function onSubmit(values: z.infer<typeof portfolioFormSchema>) {
    const reqObject = {
      ...values,
      image: image,
    }
    
    const res =  await fetch("/api/portfolio", {
      method: "POST",
      body: JSON.stringify(reqObject)
    })
    if (res.status === 200) {
      toast({
        title: "Portfolio Added Successfully"
      })
      redirect("/dashboard/portfolio/")
    }
    toast({
      variant: "destructive",
      title: "Cannot add portfolio"
    })
  }
  
  return (
    <div>
        <DashboardNav></DashboardNav>

        <div className=' max-w-5xl my-8 mx-auto'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                      <FormControl>
                       <Textarea
                          placeholder="Description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="github_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github Url</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {image && (
                <Image alt="" src={image} width={1000} height={1000} className=' w-44'></Image>
              )}
              <FormField
                control={form.control}
                name="imageInput"
                render={({ field }) => (
                  <FormItem onChange={onImageChange}>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input type='file' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className=' w-full'>Submit</Button>

              </form>
          </Form>
        </div>
    </div>
  )
}

export default NewPortfolio