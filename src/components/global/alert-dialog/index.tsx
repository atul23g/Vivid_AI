import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
  className?: string;
  description: string;
  loading?: boolean;
  onClick?: () => void;
  open: boolean;
  handleOpen: () => void;
};

function AlertDialogBox({
  children,
  className,
  description,
  loading = false,
  onClick,
  handleOpen,
  open,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={handleOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button
          variant={"destructive"}
          className={className}
          onClick={onClick}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Loading...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDialogBox;