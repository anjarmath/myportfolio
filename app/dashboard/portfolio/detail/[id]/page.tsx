"use client"

import DashboardNav from '@/app/dashboard/DashboardNav';
import { externalUrlToBase64, toBase64 } from '@/app/dashboard/base64convert';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { XataFile } from '@xata.io/client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FiTrash } from "react-icons/fi";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { AlertDialogHeader, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@radix-ui/react-alert-dialog';
import { Switch } from '@/components/ui/switch';
import { redirect } from 'next/navigation';
import { tagList } from '@/app/models/TagModel';
import { Checkbox } from '@/components/ui/checkbox';

const portfolioFormSchema = z.object({
    title : z.string(),
    description: z.string(),
    url: z.string().optional(),
    github_url: z.string().optional(),
    imageInput: z.any(),
    is_show: z.boolean().default(true),
    tag: z.array(z.string()),
})

const DetailPage = ({ params } : {
    params: {id: string}
}) => {
    const {toast} = useToast()
    const form = useForm<z.infer<typeof portfolioFormSchema>>({
        resolver: zodResolver(portfolioFormSchema),
        defaultValues: {
          tag: []
        }
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
        
        const res =  await fetch(`/api/portfolio/${params.id}`, {
          method: "PATCH",
          body: JSON.stringify(reqObject)
        })
        console.log(res.status)
        if (res.status == 200) {
          toast({
            title: "Portfolio Updated Successfully"
          })
        } else {
          toast({
            variant: "destructive",
            title: "Cannot update portfolio"
          })
        }
      }

    const fetchPortfolio = async () => {
        const res = await fetch(`/api/portfolio/${params.id}`);
        const jsonRes = await res.json()

        const base64Image = await externalUrlToBase64((jsonRes?.image as XataFile).url)
        setImage(base64Image)
    
        form.setValue("title", jsonRes?.title ?? "")
        form.setValue("description", jsonRes?.description?? "")
        form.setValue("url", jsonRes?.url)
        form.setValue("github_url", jsonRes?.github_url)
        form.setValue("is_show", jsonRes?.is_show ?? true)
        form.setValue("tag", jsonRes?.tag ?? [])
    }

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const deletePortfolio = async () => {
        const res =  await fetch(`/api/portfolio/${params.id}`, {
            method: "DELETE",
          })
          if (res.status == 200) {
            toast({
              title: "Portfolio Deleted Successfully"
            })
            redirect("/dashboard/portfolio/")
          } else {
            toast({
              variant: "destructive",
              title: "Cannot delete portfolio"
            })
          }
    }

  return (
    <div>
        <DashboardNav/>

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

              <FormField
                control={form.control}
                name="is_show"
                render={({ field }) => (
                  <FormItem onChange={onImageChange}>
                    <FormLabel>Show To Client</FormLabel>
                    <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
            <FormField
                        control={form.control}
                        name="tag"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base">Tag</FormLabel>
                            </div>
                            {tagList.map((tag) => (
                              <FormField
                                key={tag.id}
                                control={form.control}
                                name="tag"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={tag.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(tag.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, tag.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== tag.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {tag.title}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                            <FormMessage />
                          </FormItem>
                        )}
                      />

            <div className=' flex gap-3'>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button variant="destructive" size="icon">
                        <FiTrash/>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deletePortfolio}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Button type="submit" className=' w-full'>Submit</Button>
            </div>
              </form>
          </Form>
          </div>
    </div>
  )
}

export default DetailPage