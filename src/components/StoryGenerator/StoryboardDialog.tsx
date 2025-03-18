import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { LayoutTemplate } from "lucide-react";
import StoryboardView from "./StoryboardView";

interface StoryboardDialogProps {
  story: string;
  title?: string;
  trigger?: React.ReactNode;
}

const StoryboardDialog: React.FC<StoryboardDialogProps> = ({
  story,
  title = "Untitled Story",
  trigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setIsOpen(true)}
          >
            <LayoutTemplate className="h-4 w-4" />
            <span>Storyboard View</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Storyboard View</DialogTitle>
          <DialogDescription>
            Visualize your story with character and scene breakdowns
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <StoryboardView story={story} title={title} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryboardDialog;
