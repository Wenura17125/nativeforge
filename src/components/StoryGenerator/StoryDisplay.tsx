import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Copy,
  Download,
  Share2,
  RefreshCw,
  LayoutTemplate,
} from "lucide-react";
import { motion } from "framer-motion";
import StoryboardDialog from "./StoryboardDialog";

interface StoryDisplayProps {
  story?: string;
  title?: string;
  isLoading?: boolean;
  error?: string;
  onRegenerateStory?: () => void;
}

const StoryDisplay = ({
  story = "Once upon a time in a land far away, there lived a curious explorer who discovered a hidden world beneath the ancient oak tree. The inhabitants of this world were tiny creatures with luminous wings and melodic voices. They welcomed the explorer with open arms, sharing their knowledge of the stars and the secrets of the forest. Together, they embarked on countless adventures, forging a friendship that transcended the boundaries between their worlds.",
  title = "Your Generated Story",
  isLoading = false,
  error = "",
  onRegenerateStory = () => {},
}: StoryDisplayProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyToClipboard = () => {
    if (story) {
      navigator.clipboard.writeText(story);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleSaveStory = () => {
    // Create a blob with the story text
    const blob = new Blob([story || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = `story-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareStory = () => {
    // Basic share functionality
    if (navigator.share) {
      navigator
        .share({
          title: "My Generated Story",
          text: story,
        })
        .catch(console.error);
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert(
        "Sharing is not supported in your browser. You can copy the story instead.",
      );
    }
  };

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto mt-6 bg-background border-red-200">
        <CardHeader>
          <CardTitle className="text-red-500">Error Generating Story</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-400">{error}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={onRegenerateStory} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="w-full max-w-4xl mx-auto mt-6 bg-background">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse w-full" />
              <div className="h-4 bg-muted rounded animate-pulse w-11/12" />
              <div className="h-4 bg-muted rounded animate-pulse w-10/12" />
              <div className="h-4 bg-muted rounded animate-pulse w-full" />
              <div className="h-4 bg-muted rounded animate-pulse w-9/12" />
              <div className="h-4 bg-muted rounded animate-pulse w-full" />
            </div>
          ) : (
            <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
              {story.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap gap-2">
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyToClipboard}
                    disabled={isLoading || !story}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {copySuccess ? "Copied!" : "Copy to clipboard"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleSaveStory}
                    disabled={isLoading || !story}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Save as text file</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleShareStory}
                    disabled={isLoading || !story}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share story</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <StoryboardDialog
                      story={story}
                      title={title || "Your Generated Story"}
                      trigger={
                        <Button
                          variant="outline"
                          size="icon"
                          disabled={isLoading || !story}
                        >
                          <LayoutTemplate className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Storyboard View</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Button
            variant="secondary"
            onClick={onRegenerateStory}
            disabled={isLoading}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default StoryDisplay;
