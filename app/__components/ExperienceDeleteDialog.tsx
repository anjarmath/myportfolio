"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { deleteExperience } from "../_actions/experience_actions";
import { toast } from "@/components/ui/use-toast";

const DeleteExperienceDialog = ({ id }: { id: string }) => {
  const [mounted, setMounted] = useState(false);
  async function removeIt() {
    const err = await deleteExperience(id);
    if (err) {
      return toast({
        description: err,
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {mounted && (
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant={"destructive"}>
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={removeIt}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default DeleteExperienceDialog;
