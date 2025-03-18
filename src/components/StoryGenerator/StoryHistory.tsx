import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Clock, Copy, Download, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";

interface StoryHistoryItem {
  id: string;
  title: string;
  prompt: string;
  content: string;
  date: string;
  parameters: {
    genre: string;
    tone: string;
    length: number;
    characters: string[];
  };
}

interface StoryHistoryProps {
  stories?: StoryHistoryItem[];
  onSelect?: (story: StoryHistoryItem) => void;
  onDelete?: (id: string) => void;
  onCopy?: (content: string) => void;
  onDownload?: (story: StoryHistoryItem) => void;
}

const StoryHistory: React.FC<StoryHistoryProps> = ({
  stories = [],
  onSelect = () => {},
  onDelete = () => {},
  onCopy = () => {},
  onDownload = () => {},
}) => {
  return (
    <Card className="w-full max-w-[1000px] mx-auto bg-background border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span>Story History</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {stories.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No stories in your history yet.</p>
            <p className="text-sm mt-2">Generated stories will appear here.</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {stories.map((story) => (
                <div key={story.id} className="group">
                  <div
                    className="p-4 rounded-md border border-border hover:border-primary/50 transition-all cursor-pointer"
                    onClick={() => onSelect(story)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-foreground truncate pr-4">
                        {story.title || "Untitled Story"}
                      </h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {story.date}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {story.prompt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {story.parameters.genre}
                      </span>
                      <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                        {story.parameters.tone}
                      </span>
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        {story.parameters.length} words
                      </span>
                    </div>

                    <p className="text-sm text-foreground line-clamp-3">
                      {story.content.substring(0, 150)}...
                    </p>
                  </div>

                  <div className="flex justify-end gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onCopy(story.content)}
                      className="h-8 w-8"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDownload(story)}
                      className="h-8 w-8"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(story.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-muted-foreground">
          {stories.length} {stories.length === 1 ? "story" : "stories"} saved
        </div>
        {stories.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to clear all stories? This cannot be undone.",
                )
              ) {
                stories.forEach((story) => onDelete(story.id));
              }
            }}
          >
            Clear All
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default StoryHistory;
