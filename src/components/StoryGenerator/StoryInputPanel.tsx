import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send, Sparkles, Lightbulb } from "lucide-react";
import AIPromptSuggestions from "./AIPromptSuggestions";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

interface StoryInputPanelProps {
  onSubmit?: (prompt: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const StoryInputPanel: React.FC<StoryInputPanelProps> = ({
  onSubmit = () => {},
  isLoading = false,
  placeholder = "Enter your story prompt here... (e.g., 'A space explorer discovers an ancient alien library')",
}) => {
  const [prompt, setPrompt] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  const handleSelectPrompt = (suggestion: string) => {
    setPrompt(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto p-6 bg-background rounded-lg shadow-md border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-xl font-semibold">Story Prompt</h2>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <Lightbulb className="h-4 w-4" />
          <span>Need ideas?</span>
        </Button>
      </div>

      <Collapsible open={showSuggestions} onOpenChange={setShowSuggestions}>
        <CollapsibleContent className="mb-4">
          <AIPromptSuggestions onSelectPrompt={handleSelectPrompt} />
        </CollapsibleContent>
      </Collapsible>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          className="min-h-[150px] resize-none focus:ring-2 focus:ring-primary/50 transition-all"
          disabled={isLoading}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="transition-all"
          >
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? "Generating..." : "Generate Story"}
          </Button>
        </div>
      </form>

      <div className="mt-4 text-sm text-muted-foreground">
        <p>
          Provide details about characters, setting, genre, or specific elements
          you'd like to include in your story.
        </p>
      </div>
    </div>
  );
};

export default StoryInputPanel;
