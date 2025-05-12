"use client";

import { itemVariants, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { JsonValue } from "@prisma/client/runtime/library";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ThumbnailPreview from "./thumbnail-preview";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "../alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProject, recoverProject } from "@/actions/project";
import { Description } from "@radix-ui/react-alert-dialog";

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDelete?: boolean;
  slideData: JsonValue;
  themeName: string;
};

function ProjectCard({
  projectId,
  title,
  createdAt,
  isDelete,
  slideData,
  themeName,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setSlides } = useSlideStore();
  const router = useRouter();

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  const theme = themes.find((theme) => theme.name === themeName) || themes[0];

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast("Error", {
        description: "Project not found.",
      });
      return;
    }
    try {
      const res = await recoverProject(projectId);
      if (res.status !== 200) {
        toast.error("Oops!", {
          description: res.error || "something went wrong",
        });
        return;
      }
      setOpen(false);
      router.refresh();
      toast.success("Success!", {
        description: "Project recovered successfully.",
      });
    } catch (error) {
      console.log(error);
      toast.error("Oops!", {
        description: "something went wrong. Please contact support.",
      });
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      if (!projectId) {
        setLoading(false);
        toast.error("Error!", {
          description: "Project not found.",
        });
        return;
      }

      const res = await deleteProject(projectId);

      if (res.status !== 200) {
        toast.error("Oops!", {
          description: res.error || "Failed to delete project!",
        });
        return;
      }

      setOpen(false);
      router.refresh();
      toast.success("Project deleted successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Oops!", {
        description: "Something went wrong. Please contact support.",
      });
    }
  };

  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDelete ? "hover:bg-muted/50" : ""
      }`}
      variants={itemVariants}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        {/* <ThumbnailPreview theme={theme} /> */}
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title}
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>
            {isDelete ? (
              <AlertDialogBox
                description="This will recover your project and restore your data."
                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-700"
                loading={loading}
                open={open}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-background-80 dark:hover:bg-background-90"
                  disabled={loading}
                  onClick={handleRecover}
                >
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
                description="This will delete your project and send it to trash."
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-700"
                loading={loading}
                open={open}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-background-80 dark:hover:bg-background-90"
                  disabled={loading}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </AlertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
