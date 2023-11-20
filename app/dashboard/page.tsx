"use client";

import React, { useEffect, useState } from 'react'
import DashboardNav from './DashboardNav';
import Image from 'next/image';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import {externalUrlToBase64, toBase64} from './base64convert';
import { XataFile } from '@xata.io/client';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  greeting: z.string(),
  desc_title: z.string(),
  desc_content: z.string(),
  email: z.string().email(),
  mood: z.string().max(2),
  resumeInput: z.any(),
  imageInput: z.any(),
})

const DashboardPage = () => {
  const {toast} = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const [image, setImage] = useState<string | undefined>()
  const [resume, setResume] = useState<string | undefined>()
  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const base64Image = await toBase64(e.target.files[0])
    setImage(base64Image as string);
  };
  const onResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const base64Resume = await toBase64(e.target.files[0])
    setResume(base64Resume as string);
  };

  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const reqObject = {
      ...values,
      image: image,
      resume: resume,
    }
    
    const res =  await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(reqObject)
    })
    if (res.status === 200) {
      toast({
        title: "Profile Updated Successfully"
      })
      return;
    }
    toast({
      variant: "destructive",
      title: "Cannot update profile"
    })
  }

  const fetchMe = async () => {
    const res = await fetch("/api/profile");
    const jsonRes = await res.json()

    const base64Image = await externalUrlToBase64((jsonRes?.image as XataFile).url)
    const base64Resume = await externalUrlToBase64((jsonRes?.resume as XataFile).url)
    setImage(base64Image)
    setResume(base64Resume)

    form.setValue("greeting", jsonRes?.greeting ?? "")
    form.setValue("desc_title", jsonRes?.desc_title?? "")
    form.setValue("desc_content", jsonRes?.desc_content ?? "")
    form.setValue("email", jsonRes?.email ?? "")
    form.setValue("mood", jsonRes?.mood ?? "")
  }

  useEffect(() => {
    fetchMe();
  }, []);


  return (
    <div className=''>
      <DashboardNav></DashboardNav>

      <div className=' max-w-5xl my-8 mx-auto'>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="greeting"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Greeting</FormLabel>
              <FormControl>
                <Textarea
                    placeholder="Greeting the audience"
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
          name="desc_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="desc_content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description Content</FormLabel>
              <FormControl>
              <Textarea
                    placeholder="Tell the audience about yourself"
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
          name="mood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mood</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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

        {resume && (
          <Link className=' -mb-5' target='_blank' href={resume ?? '#'}>See Resume</Link>
        )}
        <FormField
          control={form.control}
          name="resumeInput"
          render={({ field }) => (
            <FormItem onChange={onResumeChange}>
              <FormLabel>Resume</FormLabel>
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

export default DashboardPage