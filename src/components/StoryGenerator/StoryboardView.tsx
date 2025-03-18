import React from "react";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";

interface StoryboardViewProps {
  story: string;
  title?: string;
}

const StoryboardView: React.FC<StoryboardViewProps> = ({
  story = "",
  title = "Untitled Story",
}) => {
  // Split the story into sections (paragraphs)
  const paragraphs = story.split("\n\n").filter((p) => p.trim() !== "");

  // Extract characters from the story (this is a simple implementation)
  const extractCharacters = (text: string) => {
    // This is a simplified approach - in a real app, you'd use NLP
    const commonNames = [
      "he",
      "she",
      "they",
      "him",
      "her",
      "his",
      "hers",
      "their",
    ];
    const words = text.split(/\s+/);
    const potentialCharacters = words.filter(
      (word) =>
        word.length > 1 &&
        word[0] === word[0].toUpperCase() &&
        !commonNames.includes(word.toLowerCase()),
    );

    // Count occurrences and get unique characters
    const characterCounts = potentialCharacters.reduce(
      (acc, char) => {
        const cleanChar = char.replace(/[^a-zA-Z]/g, "");
        if (cleanChar.length > 1) {
          acc[cleanChar] = (acc[cleanChar] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    // Return characters that appear more than once
    return Object.entries(characterCounts)
      .filter(([_, count]) => count > 1)
      .map(([char]) => char)
      .slice(0, 5); // Limit to 5 characters
  };

  const characters = extractCharacters(story);

  // Extract settings/locations from the story
  const extractSettings = (text: string) => {
    const locationPhrases = [
      "in the",
      "at the",
      "on the",
      "inside the",
      "outside the",
      "within the",
      "across the",
      "beyond the",
      "through the",
    ];

    const settings: string[] = [];

    locationPhrases.forEach((phrase) => {
      const regex = new RegExp(`${phrase} ([\\w\\s]+?)[\\.\\,\\;\\:]`, "gi");
      let match;

      while ((match = regex.exec(text)) !== null) {
        if (match[1] && match[1].length > 3 && match[1].length < 20) {
          settings.push(match[1].trim());
        }
      }
    });

    // Get unique settings
    return [...new Set(settings)].slice(0, 3);
  };

  const settings = extractSettings(story);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="story" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="story">Story</TabsTrigger>
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="storyboard">Storyboard</TabsTrigger>
        </TabsList>

        <TabsContent value="story" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">{title}</h2>
              <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="characters" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Characters</h2>
              {characters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {characters.map((character, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {character[0]}
                        </div>
                        <div>
                          <h3 className="font-medium">{character}</h3>
                          <p className="text-sm text-muted-foreground">
                            Character
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No main characters detected.
                </p>
              )}

              <Separator className="my-6" />

              <h2 className="text-xl font-bold mb-4">Settings</h2>
              {settings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {settings.map((setting, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <h3 className="font-medium">{setting}</h3>
                      <p className="text-sm text-muted-foreground">Location</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No settings detected.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storyboard" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Visual Storyboard</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paragraphs.slice(0, 4).map((paragraph, index) => (
                  <div
                    key={index}
                    className="border rounded-md overflow-hidden"
                  >
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground text-sm p-4 text-center">
                        Scene {index + 1} visualization would appear here
                      </p>
                    </div>
                    <div className="p-3">
                      <p className="text-sm line-clamp-3">{paragraph}</p>
                    </div>
                  </div>
                ))}
              </div>

              {paragraphs.length > 4 && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  + {paragraphs.length - 4} more scenes
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoryboardView;
