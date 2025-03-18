import React, { useState, useEffect } from "react";
import Header from "./StoryGenerator/Header";
import StoryInputPanel from "./StoryGenerator/StoryInputPanel";
import ParametersPanel from "./StoryGenerator/ParametersPanel";
import LoadingAnimation from "./StoryGenerator/LoadingAnimation";
import StoryDisplay from "./StoryGenerator/StoryDisplay";
import ActionBar from "./StoryGenerator/ActionBar";
import ErrorMessage from "./StoryGenerator/ErrorMessage";

// Gemini API key
const GEMINI_API_KEY = "AIzaSyBIkO0oiyxXHHuHg7TENcM2Nx1WObhGLvo";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [storyPrompt, setStoryPrompt] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [showParameters, setShowParameters] = useState(true);

  // Story parameters
  const [selectedGenre, setSelectedGenre] = useState("Fantasy");
  const [storyLength, setStoryLength] = useState(500);
  const [tone, setTone] = useState("Neutral");
  const [characters, setCharacters] = useState([
    "Protagonist",
    "Antagonist",
    "Sidekick",
  ]);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const generateStoryWithGemini = async (prompt: string) => {
    try {
      const fullPrompt = `Write a ${tone.toLowerCase()} ${selectedGenre} story about ${prompt}. Include characters: ${characters.join(", ")}. The story should be approximately ${storyLength} words long.`;

      // Call the Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `You are a creative storyteller. Create engaging, well-structured stories based on the following prompt: ${fullPrompt}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: Math.max(storyLength * 4, 1000),
            },
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to generate story");
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error generating story:", error);
      throw error;
    }
  };

  const handleGenerateStory = async (prompt: string) => {
    setStoryPrompt(prompt);
    setIsLoading(true);
    setShowParameters(false);
    setErrorMessage("");

    try {
      const story = await generateStoryWithGemini(prompt);
      setGeneratedStory(story);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setShowError(true);
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to generate story",
      );
    }
  };

  const handleNewStory = () => {
    setGeneratedStory("");
    setStoryPrompt("");
    setShowParameters(true);
  };

  const handleRetry = () => {
    setShowError(false);
    handleGenerateStory(storyPrompt);
  };

  const handleCopyStory = () => {
    if (generatedStory) {
      navigator.clipboard.writeText(generatedStory);
      // In a real app, you would show a toast notification here
    }
  };

  const handleSaveStory = () => {
    if (generatedStory) {
      const blob = new Blob([generatedStory], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `story-${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleShareStory = () => {
    if (generatedStory && navigator.share) {
      navigator
        .share({
          title: "My Generated Story",
          text: generatedStory,
        })
        .catch(console.error);
    } else {
      alert(
        "Sharing is not supported in your browser. You can copy the story instead.",
      );
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Story Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create unique stories with the power of Google Gemini 1.5 Pro API.
            Enter a prompt, customize your parameters, and watch your story come
            to life.
          </p>
        </div>

        <StoryInputPanel onSubmit={handleGenerateStory} isLoading={isLoading} />

        {showParameters && (
          <ParametersPanel
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            storyLength={storyLength}
            onStoryLengthChange={setStoryLength}
            tone={tone}
            onToneChange={setTone}
            characters={characters}
            onCharactersChange={setCharacters}
          />
        )}

        {isLoading && (
          <div className="flex justify-center my-12">
            <LoadingAnimation isLoading={isLoading} />
          </div>
        )}

        {generatedStory && !isLoading && (
          <>
            <StoryDisplay
              story={generatedStory}
              onRegenerateStory={handleRetry}
            />

            <div className="flex justify-center mt-6">
              <ActionBar
                onCopy={handleCopyStory}
                onSave={handleSaveStory}
                onShare={handleShareStory}
                onNewStory={handleNewStory}
                onModifyParameters={() => setShowParameters(!showParameters)}
                isGenerating={isLoading}
                hasStory={!!generatedStory}
              />
            </div>
          </>
        )}

        <ErrorMessage
          isOpen={showError}
          message={errorMessage}
          onRetry={handleRetry}
          onCancel={() => setShowError(false)}
        />
      </main>

      <footer className="py-6 text-center text-muted-foreground border-t border-border">
        <p>Powered by Google Gemini 1.5 Pro API</p>
      </footer>
    </div>
  );
};

export default Home;
