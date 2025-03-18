import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { useAuth } from "./AuthProvider";

interface ParametersPanelProps {
  genres?: string[];
  selectedGenre?: string;
  onGenreChange?: (genre: string) => void;
  storyLength?: number;
  onStoryLengthChange?: (length: number) => void;
  tone?: string;
  onToneChange?: (tone: string) => void;
  characters?: string[];
  onCharactersChange?: (characters: string[]) => void;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({
  genres = ["Fantasy", "Sci-Fi", "Mystery", "Romance", "Horror", "Adventure"],
  selectedGenre = "Fantasy",
  onGenreChange = () => {},
  storyLength = 500,
  onStoryLengthChange = () => {},
  tone = "Neutral",
  onToneChange = () => {},
  characters = ["Protagonist", "Antagonist", "Sidekick"],
  onCharactersChange = () => {},
}) => {
  const { user } = useAuth();
  return (
    <div className="w-full max-w-[1000px] p-6 rounded-lg border border-border bg-background shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-foreground">
        Story Parameters
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Genre Selection */}
        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Select value={selectedGenre} onValueChange={onGenreChange}>
            <SelectTrigger id="genre" className="w-full">
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Story Length */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="length">Story Length</Label>
            <span className="text-sm text-muted-foreground">
              {storyLength} words
            </span>
          </div>
          <Slider
            id="length"
            min={100}
            max={user?.plan === "premium" ? 5000 : 2000}
            step={100}
            value={[storyLength]}
            onValueChange={(value) => onStoryLengthChange(value[0])}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Short</span>
            <span>Medium</span>
            <span>Long</span>
          </div>
        </div>

        {/* Tone Selection */}
        <div className="space-y-2">
          <Label>Tone</Label>
          <RadioGroup
            value={tone}
            onValueChange={onToneChange}
            className="flex flex-col space-y-2"
          >
            {["Humorous", "Serious", "Mysterious", "Romantic", "Neutral"].map(
              (toneOption) => (
                <div key={toneOption} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={toneOption}
                    id={`tone-${toneOption.toLowerCase()}`}
                  />
                  <Label
                    htmlFor={`tone-${toneOption.toLowerCase()}`}
                    className="cursor-pointer"
                  >
                    {toneOption}
                  </Label>
                </div>
              ),
            )}
          </RadioGroup>
        </div>

        {/* Characters */}
        <div className="space-y-2">
          <Label>Characters</Label>
          <div className="p-3 border rounded-md bg-muted border-border">
            {characters.map((character, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-2 last:mb-0"
              >
                <span className="text-sm">{character}</span>
                <button
                  onClick={() => {
                    const newCharacters = [...characters];
                    newCharacters.splice(index, 1);
                    onCharactersChange(newCharacters);
                  }}
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-border">
              <button
                onClick={() => {
                  const newCharacter = prompt("Enter character name");
                  if (newCharacter && newCharacter.trim() !== "") {
                    onCharactersChange([...characters, newCharacter.trim()]);
                  }
                }}
                className="text-sm text-primary hover:text-primary/80"
              >
                + Add Character
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParametersPanel;
