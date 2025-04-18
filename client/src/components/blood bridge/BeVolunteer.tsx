import {
  AlertDialogTitle,
AlertDialog,
AlertDialogAction,
AlertDialogCancel,
AlertDialogContent,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "@/helpers/api";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function BeVolunteer({ id }: { id: string }) {
const handleSubmit = async (canShare: boolean) => {
  try {
    const res = await api.post(`/blood-requests/${id}/volunteer`, {
      canShareDetails: canShare,
    });
    if (res.status === 200) {
      toast.success("Details shared successfully.");
    }
  } catch {
    toast.error("Something went wrong. Please try again later.");
  }
};

return (
  <AlertDialog>
    <AlertDialogTrigger className="text-primary hover:bg-primary/80 hover:text-white/80 px-2 py-1 cursor-pointer font-medium rounded-lg transition-colors duration-200">
      Be a volunteer
    </AlertDialogTrigger>
    <AlertDialogContent className="dark:bg-dark-bg">
      <AlertDialogHeader>
        <AlertDialogCancel className="absolute top-4 right-4 dark:text-dark-text">
          <X />
        </AlertDialogCancel>
        <AlertDialogTitle className="dark:text-dark-text">
          Share Details
        </AlertDialogTitle>
        <AlertDialogDescription>
          Do you want to share your details with this person?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="gap-2">
        <AlertDialogAction onClick={() => handleSubmit(false)} >
          Continue without sharing
        </AlertDialogAction>
        <AlertDialogAction onClick={() => handleSubmit(true)}>
          Share
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
}