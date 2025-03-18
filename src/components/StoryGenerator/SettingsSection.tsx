import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { useAuth } from "./AuthProvider";
import {
  AlertTriangle,
  Save,
  AlertCircle,
  Trash2,
  Download,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useToast } from "../ui/use-toast";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface SettingsSectionProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  isDarkMode,
  onThemeToggle,
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  const [defaultGenre, setDefaultGenre] = useState("Fantasy");
  const [defaultTone, setDefaultTone] = useState("Neutral");
  const [defaultWordCount, setDefaultWordCount] = useState("500");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showClearHistoryConfirm, setShowClearHistoryConfirm] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [exportFormat, setExportFormat] = useState("txt");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = () => {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully",
      });
    }, 1000);
  };

  const handleDeleteAccount = () => {
    // In a real app, you would delete the user's account
    logout();
    setShowDeleteConfirm(false);
    toast({
      title: "Account Deleted",
      description: "Your account has been permanently deleted",
      variant: "destructive",
    });
  };

  const handleClearHistory = () => {
    // In a real app, you would clear the user's story history
    setShowClearHistoryConfirm(false);
    toast({
      title: "History Cleared",
      description: "Your story history has been cleared",
    });
  };

  if (!isAuthenticated) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Please sign in to access your settings
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-center text-muted-foreground">
            You need to be logged in to view and manage your settings
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how NarrativeForge looks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark theme
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={onThemeToggle}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="font-size">Font Size</Label>
                <p className="text-sm text-muted-foreground">
                  Adjust the text size for story display
                </p>
              </div>
              <Select defaultValue="medium">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Theme Accent Color</Label>
              <RadioGroup defaultValue="blue" className="flex gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="blue"
                    id="blue"
                    className="bg-blue-500"
                  />
                  <Label htmlFor="blue">Blue</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="purple"
                    id="purple"
                    className="bg-purple-500"
                  />
                  <Label htmlFor="purple">Purple</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="green"
                    id="green"
                    className="bg-green-500"
                  />
                  <Label htmlFor="green">Green</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="amber"
                    id="amber"
                    className="bg-amber-500"
                  />
                  <Label htmlFor="amber">Amber</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Story Generation</CardTitle>
          <CardDescription>
            Default settings for story generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="default-genre">Default Genre</Label>
                <Select value={defaultGenre} onValueChange={setDefaultGenre}>
                  <SelectTrigger id="default-genre">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fantasy">Fantasy</SelectItem>
                    <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
                    <SelectItem value="Mystery">Mystery</SelectItem>
                    <SelectItem value="Romance">Romance</SelectItem>
                    <SelectItem value="Horror">Horror</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-tone">Default Tone</Label>
                <Select value={defaultTone} onValueChange={setDefaultTone}>
                  <SelectTrigger id="default-tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Humorous">Humorous</SelectItem>
                    <SelectItem value="Serious">Serious</SelectItem>
                    <SelectItem value="Mysterious">Mysterious</SelectItem>
                    <SelectItem value="Romantic">Romantic</SelectItem>
                    <SelectItem value="Neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-word-count">Default Word Count</Label>
                <Select
                  value={defaultWordCount}
                  onValueChange={setDefaultWordCount}
                >
                  <SelectTrigger id="default-word-count">
                    <SelectValue placeholder="Select word count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300">300 words</SelectItem>
                    <SelectItem value="500">500 words</SelectItem>
                    <SelectItem value="1000">1000 words</SelectItem>
                    <SelectItem value="1500">1500 words</SelectItem>
                    {user?.plan !== "free" && (
                      <SelectItem value="2000">2000 words</SelectItem>
                    )}
                    {user?.plan === "premium" && (
                      <SelectItem value="5000">5000 words</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="export-format">Default Export Format</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger id="export-format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="txt">Plain Text (.txt)</SelectItem>
                    <SelectItem value="md">Markdown (.md)</SelectItem>
                    <SelectItem value="pdf">PDF Document (.pdf)</SelectItem>
                    <SelectItem value="docx">Word Document (.docx)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="save-history">Save Story History</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save generated stories to your history
                </p>
              </div>
              <Switch
                id="save-history"
                checked={saveHistory}
                onCheckedChange={setSaveHistory}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-save">Auto-Save Stories</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save stories to your device when generated
                </p>
              </div>
              <Switch
                id="auto-save"
                checked={autoSave}
                onCheckedChange={setAutoSave}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage your notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about new features and tips
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="story-completion">
                  Story Completion Alerts
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when your story generation is complete
                </p>
              </div>
              <Switch id="story-completion" checked={true} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSaveSettings}
            className="ml-auto"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <AlertCircle className="mr-2 h-4 w-4 animate-pulse" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Manage your data and export options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Export All Stories</Label>
                <p className="text-sm text-muted-foreground">
                  Download all your saved stories as a single file
                </p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Clear All Story History</Label>
                <p className="text-sm text-muted-foreground">
                  Delete all your saved stories permanently
                </p>
              </div>
              <AlertDialog
                open={showClearHistoryConfirm}
                onOpenChange={setShowClearHistoryConfirm}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive/10 flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear History
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 rounded-full bg-red-100 text-red-600">
                        <AlertTriangle size={24} />
                      </div>
                    </div>
                    <AlertDialogTitle className="text-center">
                      Clear Story History
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      This will permanently delete all your saved stories. This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex justify-center sm:justify-center gap-3 mt-4">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearHistory}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Clear History
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Delete Account</Label>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all data
                </p>
              </div>
              <AlertDialog
                open={showDeleteConfirm}
                onOpenChange={setShowDeleteConfirm}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 rounded-full bg-red-100 text-red-600">
                        <AlertTriangle size={24} />
                      </div>
                    </div>
                    <AlertDialogTitle className="text-center">
                      Delete Account
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                      This action cannot be undone. This will permanently delete
                      your account and remove all your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex justify-center sm:justify-center gap-3 mt-4">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsSection;
