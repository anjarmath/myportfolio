"use client";

import React, { useState } from "react";
import DashboardNav from "../../../__components/DashboardNav";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fileToXataFIle, toBase64 } from "../../../__utils/base64convert";
import { redirect, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { tagList } from "@/app/models/TagModel";
import { portfolioFormSchema } from "@/app/models/schema";
import { addPortfolio } from "@/app/_actions/portfolio_actions";

const NewPortfolio = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof portfolioFormSchema>>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      tag: [],
    },
  });

  async function onSubmit(values: z.infer<typeof portfolioFormSchema>) {
    const newObjectValues = JSON.parse(JSON.stringify(values));
    const err = await addPortfolio(newObjectValues);
    if (err) {
      return toast({
        description: err,
        variant: "destructive",
      });
    }
    router.replace("/dashboard/portfolio");
  }

  const image = form.getValues().image;

  return (
    <div>
      <DashboardNav />

      <div className=" max-w-5xl my-8 mx-auto">
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
              <Image
                alt=""
                src={
                  image?.url != ""
                    ? image?.url!
                    : `data:image/jpg;base64,${image?.base64Content}`
                }
                width={1000}
                height={1000}
                className=" w-44"
              ></Image>
            )}
            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Change Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      {...fieldValues}
                      onChange={async (e) => {
                        if (!e.target.files) {
                          return;
                        }
                        const file = e.target.files[0];
                        const xataFile = await fileToXataFIle(
                          file,
                          "image/png"
                        );
                        fieldValues.onChange(xataFile);
                      }}
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
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {tag.title}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className=" w-full"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewPortfolio;
