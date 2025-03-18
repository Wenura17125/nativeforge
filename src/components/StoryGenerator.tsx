import React, { useState, useEffect } from "react";
import Header from "./StoryGenerator/Header";
import StoryInputPanel from "./StoryGenerator/StoryInputPanel";
import ParametersPanel from "./StoryGenerator/ParametersPanel";
import LoadingAnimation from "./StoryGenerator/LoadingAnimation";
import StoryDisplay from "./StoryGenerator/StoryDisplay";
import ActionBar from "./StoryGenerator/ActionBar";
import ErrorMessage from "./StoryGenerator/ErrorMessage";
import StoryHistory from "./StoryGenerator/StoryHistory";
import ShareDialog from "./StoryGenerator/ShareDialog";
import ThreeDBackground from "./StoryGenerator/ThreeDBackground";
import AuthRequiredDialog from "./StoryGenerator/AuthRequiredDialog";
import PricingDialog from "./StoryGenerator/PricingDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import {
  History,
  PenTool,
  Sparkles,
  Crown,
  Settings,
  User,
} from "lucide-react";
import ProfileSection from "./StoryGenerator/ProfileSection";
import SettingsSection from "./StoryGenerator/SettingsSection";
import { useAuth } from "./StoryGenerator/AuthProvider";

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

// Gemini API key
const GEMINI_API_KEY = "AIzaSyBIkO0oiyxXHHuHg7TENcM2Nx1WObhGLvo";

const StoryGenerator = () => {
  const {
    user,
    isAuthenticated,
    canGenerateStory,
    incrementStoriesGenerated,
    getRemainingStories,
  } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [storyPrompt, setStoryPrompt] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [showParameters, setShowParameters] = useState(true);
  const [activeTab, setActiveTab] = useState("create");
  const [storyHistory, setStoryHistory] = useState<StoryHistoryItem[]>([]);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [pricingDialogOpen, setPricingDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [storyTitle, setStoryTitle] = useState("");

  // Story parameters
  const [selectedGenre, setSelectedGenre] = useState("Fantasy");
  const [storyLength, setStoryLength] = useState(500);
  const [tone, setTone] = useState("Neutral");
  const [characters, setCharacters] = useState([
    "Protagonist",
    "Antagonist",
    "Sidekick",
  ]);

  // Load story history from localStorage on component mount
  useEffect(() => {
    const savedStories = localStorage.getItem("narrativeforge-stories");
    if (savedStories) {
      try {
        setStoryHistory(JSON.parse(savedStories));
      } catch (error) {
        console.error("Error loading saved stories:", error);
      }
    }
  }, []);

  // Save story history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "narrativeforge-stories",
      JSON.stringify(storyHistory),
    );
  }, [storyHistory]);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Check for plan parameter in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan");

    if (
      planParam &&
      (planParam === "pro" || planParam === "premium") &&
      isAuthenticated
    ) {
      setPricingDialogOpen(true);
      setSelectedPlan(planParam);
      setShowPayment(true);

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [isAuthenticated]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const generateStoryWithGemini = async (prompt: string) => {
    try {
      const fullPrompt = `Write a ${tone.toLowerCase()} ${selectedGenre} story about ${prompt}. Include characters: ${characters.join(
        ", ",
      )}. The story should be approximately ${storyLength} words long. Start with a title for the story on the first line, then a blank line, then the story content.`;

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
                    text: `You are a creative storyteller. Create engaging, well-structured stories based on the following prompt: ${fullPrompt}. Start with a title for the story on the first line, then a blank line, then the story content.`,
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
      const content = data.candidates[0].content.parts[0].text;

      // Extract title from the first line if possible
      const lines = content.split("\n");
      let title = "Untitled Story";
      let storyContent = content;

      if (lines.length > 1 && lines[0].trim() !== "") {
        title = lines[0].trim();
        storyContent = lines.slice(1).join("\n").trim();
        // If there's an empty line after the title, remove it
        if (storyContent.startsWith("\n")) {
          storyContent = storyContent.substring(1);
        }
      }

      return { title, content: storyContent };
    } catch (error) {
      console.error("Error generating story:", error);
      throw error;
    }
  };

  const handleGenerateStory = async (prompt: string) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      setAuthDialogOpen(true);
      return;
    }

    // Check if user can generate more stories based on their plan
    if (!canGenerateStory()) {
      setPricingDialogOpen(true);
      return;
    }

    setStoryPrompt(prompt);
    setIsLoading(true);
    setShowParameters(false);
    setErrorMessage("");

    try {
      const { title, content } = await generateStoryWithGemini(prompt);
      setGeneratedStory(content);
      setStoryTitle(title);
      setIsLoading(false);

      // Increment the user's story count
      await incrementStoriesGenerated();

      // Add to history
      const newStory: StoryHistoryItem = {
        id: Date.now().toString(),
        title: title,
        prompt: prompt,
        content: content,
        date: new Date().toLocaleDateString(),
        parameters: {
          genre: selectedGenre,
          tone: tone,
          length: storyLength,
          characters: [...characters],
        },
      };

      // Check if adding this story would exceed the user's saved stories limit
      if (user && storyHistory.length >= user.savedStoriesLimit) {
        // Remove the oldest story
        setStoryHistory((prev) => [
          newStory,
          ...prev.slice(0, user.savedStoriesLimit - 1),
        ]);
      } else {
        setStoryHistory((prev) => [newStory, ...prev]);
      }
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
    setStoryTitle("");
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
      a.download = `${storyTitle || "story"}-${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleShareStory = () => {
    setShareDialogOpen(true);
  };

  const handleSelectHistoryItem = (story: StoryHistoryItem) => {
    setGeneratedStory(story.content);
    setStoryPrompt(story.prompt);
    setStoryTitle(story.title);
    setSelectedGenre(story.parameters.genre);
    setTone(story.parameters.tone);
    setStoryLength(story.parameters.length);
    setCharacters(story.parameters.characters);
    setActiveTab("create");
  };

  const handleDeleteHistoryItem = (id: string) => {
    setStoryHistory((prev) => prev.filter((story) => story.id !== id));
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      <ThreeDBackground />
      <Header
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        title="NarrativeForge"
      />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {isAuthenticated && user?.plan !== "free" && (
          <div className="w-full max-w-[1000px] mx-auto bg-primary/10 rounded-md p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              <span className="font-medium">
                {user?.plan === "premium" ? "Premium" : "Pro"} Plan Active
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPricingDialogOpen(true)}
            >
              Manage Subscription
            </Button>
          </div>
        )}

        {isAuthenticated && user?.plan === "free" && (
          <div className="w-full max-w-[1000px] mx-auto bg-muted rounded-md p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-muted-foreground" />
              <span>
                {getRemainingStories()} of {user.storiesLimit} free stories
                remaining today
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPricingDialogOpen(true)}
            >
              Upgrade Plan
            </Button>
          </div>
        )}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            NarrativeForge AI Story Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create unique stories with the power of Google Gemini 1.5 Pro API.
            Enter a prompt, customize your parameters, and watch your story come
            to life.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-[1000px] mx-auto"
        >
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-4 w-[600px]">
              <TabsTrigger value="create" className="flex items-center gap-2">
                <PenTool className="h-4 w-4" />
                Create
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                History
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="create" className="space-y-8">
            <StoryInputPanel
              onSubmit={handleGenerateStory}
              isLoading={isLoading}
            />

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
                  title={storyTitle}
                  onRegenerateStory={handleRetry}
                />

                <div className="flex justify-center mt-6">
                  <ActionBar
                    onCopy={handleCopyStory}
                    onSave={handleSaveStory}
                    onShare={handleShareStory}
                    onNewStory={handleNewStory}
                    onModifyParameters={() =>
                      setShowParameters(!showParameters)
                    }
                    isGenerating={isLoading}
                    hasStory={!!generatedStory}
                  />
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="history">
            <StoryHistory
              stories={storyHistory}
              onSelect={handleSelectHistoryItem}
              onDelete={handleDeleteHistoryItem}
              onCopy={(content) => navigator.clipboard.writeText(content)}
              onDownload={(story) => {
                const blob = new Blob([story.content], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${story.title || "story"}-${new Date().toISOString().slice(0, 10)}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
            />

            {storyHistory.length === 0 && (
              <div className="text-center mt-8">
                <Button
                  onClick={() => setActiveTab("create")}
                  variant="default"
                >
                  Create Your First Story
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSection
              onOpenPricingDialog={() => setPricingDialogOpen(true)}
            />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsSection
              isDarkMode={isDarkMode}
              onThemeToggle={handleThemeToggle}
            />
          </TabsContent>
        </Tabs>

        <ErrorMessage
          isOpen={showError}
          message={errorMessage}
          onRetry={handleRetry}
          onCancel={() => setShowError(false)}
        />

        <ShareDialog
          isOpen={shareDialogOpen}
          onClose={() => setShareDialogOpen(false)}
          storyTitle={storyTitle}
          storyContent={generatedStory}
        />

        <AuthRequiredDialog
          isOpen={authDialogOpen}
          onClose={() => setAuthDialogOpen(false)}
          onSuccess={() => {
            // If the user successfully logs in and had a prompt, generate the story
            if (storyPrompt) {
              handleGenerateStory(storyPrompt);
            }
          }}
          message="Please sign in to generate stories with NarrativeForge"
        />

        <PricingDialog
          isOpen={pricingDialogOpen}
          onClose={() => {
            setPricingDialogOpen(false);
            setSelectedPlan(null);
            setShowPayment(false);
          }}
          initialPlan={selectedPlan}
          initialShowPayment={showPayment}
        />
      </main>

      <footer className="py-6 text-center text-muted-foreground border-t border-border">
        <p>
          © {new Date().getFullYear()} NarrativeForge | Powered by Google
          Gemini 1.5 Pro API
        </p>
      </footer>
    </div>
  );
};

export default StoryGenerator;
