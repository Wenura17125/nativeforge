import React from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Copy, Save, Share, RefreshCw, Settings } from "lucide-react";

interface ActionBarProps {
  onCopy?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  onNewStory?: () => void;
  onModifyParameters?: () => void;
  isGenerating?: boolean;
  hasStory?: boolean;
}

const ActionBar = ({
  onCopy = () => console.log("Copy story"),
  onSave = () => console.log("Save story"),
  onShare = () => console.log("Share story"),
  onNewStory = () => console.log("Generate new story"),
  onModifyParameters = () => console.log("Modify parameters"),
  isGenerating = false,
  hasStory = true,
}: ActionBarProps) => {
  return (
    <div className="w-full max-w-[1000px] h-[60px] bg-background border border-border rounded-md p-2 flex items-center justify-between gap-2 shadow-sm">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onCopy}
                disabled={!hasStory || isGenerating}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onSave}
                disabled={!hasStory || isGenerating}
              >
                <Save className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save story</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onShare}
                disabled={!hasStory || isGenerating}
              >
                <Share className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share story</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onModifyParameters}
                disabled={isGenerating}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Modify parameters</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                onClick={onNewStory}
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>New Story</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Generate new story</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ActionBar;
