import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Sparkles } from "lucide-react";

interface AIPromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
}

const AIPromptSuggestions: React.FC<AIPromptSuggestionsProps> = ({
  onSelectPrompt,
}) => {
  const [category, setCategory] = useState<
    "adventure" | "fantasy" | "scifi" | "mystery"
  >("adventure");

  const promptSuggestions = {
    adventure: [
      "A treasure hunter discovers a map leading to a lost city in the Amazon rainforest",
      "A group of friends embark on a hiking trip that takes an unexpected turn when they discover an abandoned cabin",
      "A solo sailor encounters a mysterious island not found on any map",
    ],
    fantasy: [
      "A young apprentice discovers they can communicate with magical creatures that no one else can see",
      "In a world where everyone has a magical familiar, one person receives an unexpected and unprecedented creature",
      "A librarian discovers a book that writes itself, predicting future events",
    ],
    scifi: [
      "A scientist creates an AI that claims to be from the future",
      "The first human colony on Mars discovers evidence of ancient civilization",
      "A routine space mission encounters a phenomenon that causes time to flow differently for the crew",
    ],
    mystery: [
      "A detective is called to investigate a locked-room mystery in an old mansion",
      "A small town experiences identical dreams on the same night, predicting a crime",
      "A journalist receives anonymous letters containing details about unsolved cases",
    ],
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium">Prompt Suggestions</h3>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <Button
          variant={category === "adventure" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategory("adventure")}
        >
          Adventure
        </Button>
        <Button
          variant={category === "fantasy" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategory("fantasy")}
        >
          Fantasy
        </Button>
        <Button
          variant={category === "scifi" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategory("scifi")}
        >
          Sci-Fi
        </Button>
        <Button
          variant={category === "mystery" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategory("mystery")}
        >
          Mystery
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {promptSuggestions[category].map((prompt, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:border-primary/50 transition-all"
            onClick={() => onSelectPrompt(prompt)}
          >
            <CardContent className="p-3">
              <p className="text-sm">{prompt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIPromptSuggestions;
