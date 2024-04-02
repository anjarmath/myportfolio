"use client";

import DashboardNav from "@/app/__components/DashboardNav";
import { fileToXataFIle } from "@/app/__utils/base64convert";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { XataFile } from "@xata.io/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FiTrash } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { notFound, useRouter } from "next/navigation";
import { tagList } from "@/app/models/TagModel";
import { Checkbox } from "@/components/ui/checkbox";
import { portfolioFormSchema } from "@/app/models/schema";
import {
  deletePortfolio,
  getPortfolioById,
  updatePortfolio,
} from "@/app/_actions/portfolio_actions";

const DetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof portfolioFormSchema>>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      tag: [],
    },
  });

  async function onSubmit(values: z.infer<typeof portfolioFormSchema>) {
    const newObjectValues = JSON.parse(JSON.stringify(values));
    const err = await updatePortfolio(params.id, newObjectValues);
    if (err) {
      return toast({
        description: err,
        variant: "destructive",
      });
    }
  }

  const image = form.getValues().image;

  const initiateForm = async () => {
    const profile = await getPortfolioById(params.id);
    if (!profile) {
      return notFound();
    }

    form.setValue("title", profile.title ?? "");
    form.setValue("description", profile.description ?? "");
    form.setValue("url", profile.url ?? undefined);
    form.setValue("github_url", profile.github_url ?? undefined);
    form.setValue("is_show", profile.is_show ?? true);
    form.setValue("tag", profile.tag ?? []);
    form.setValue("image", profile.image as XataFile);
  };

  useEffect(() => {
    initiateForm();
  }, []);

  const deleteThisPortfolio = async () => {
    const err = await deletePortfolio(params.id);
    if (err) {
      return toast({
        description: err,
        variant: "destructive",
      });
    }
    router.replace("/dashboard/portfolio");
  };

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
              name="is_show"
              render={({ field }) => (
                <FormItem className=" flex items-center h-min gap-3">
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

            <div className=" flex gap-3">
              <AlertDialog>
                <AlertDialogTrigger className=" bg-red-500 hover:bg-red-700 text-white px-3 rounded-md">
                  <FiTrash />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteThisPortfolio}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className=" w-full"
              >
                {form.formState.isSubmitting ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DetailPage;
