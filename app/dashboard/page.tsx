"use client";

import React, { useEffect, useRef } from "react";
import DashboardNav from "./DashboardNav";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { profileFormSchema as formSchema } from "../models/schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { removeBase64Prefix, toBase64 } from "./base64convert";
import { XataFile } from "@xata.io/client";
import Link from "next/link";
import { getProfile, updateProfile } from "../actions";
import { notFound } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const DashboardPage = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const err = await updateProfile(values);
    if (err) {
      return toast({
        description: err,
        variant: "destructive",
      });
    }
  }

  const image = form.getValues().image;
  const resume = form.getValues().resume;

  const initiateForm = async () => {
    const profile = await getProfile();
    if (!profile) {
      return notFound();
    }
    form.setValue("greeting", profile?.greeting ?? "");
    form.setValue("desc_title", profile?.desc_title ?? "");
    form.setValue("desc_content", profile?.desc_content ?? "");
    form.setValue("email", profile?.email ?? "");
    form.setValue("mood", profile?.mood ?? "");
    form.setValue("image", (profile?.image as XataFile) ?? undefined);
    form.setValue("resume", (profile?.resume as XataFile) ?? undefined);
  };

  useEffect(() => {
    initiateForm();
  }, []);

  return (
    <>
      <DashboardNav />

      <div className=" max-w-5xl my-8 mx-auto">
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
                        const base64 = await toBase64(file);
                        const base64String = removeBase64Prefix(
                          base64 as string
                        );

                        const xataFile = XataFile.fromBase64(base64String, {
                          mediaType: "image/jpg",
                          enablePublicUrl: true,
                        });
                        console.log(xataFile);
                        fieldValues.onChange(xataFile);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {resume && (
              <Link className=" -mb-5" target="_blank" href={resume?.url ?? ""}>
                See Resume
              </Link>
            )}
            <FormField
              control={form.control}
              name="resume"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Change Resume</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...fieldValues}
                      onChange={async (e) => {
                        if (!e.target.files) {
                          return;
                        }
                        const file = e.target.files[0];
                        const base64 = await toBase64(file);
                        const base64String = removeBase64Prefix(
                          base64 as string
                        );

                        const xataFile = XataFile.fromBase64(base64String, {
                          mediaType: "image/jpg",
                          enablePublicUrl: true,
                        });
                        console.log(xataFile);
                        fieldValues.onChange(xataFile);
                      }}
                    />
                  </FormControl>
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
    </>
  );
};

export default DashboardPage;
