import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useAuth } from "./AuthProvider";
import { Loader2, Save, User, Upload, AlertCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";

interface ProfileSectionProps {
  onOpenPricingDialog: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  onOpenPricingDialog,
}) => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState("AI storytelling enthusiast");
  const [isUploading, setIsUploading] = useState(false);

  // Update form values when user changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!isAuthenticated) return;

    setIsSaving(true);

    // Validate inputs
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Validation Error",
        description: "Name and email are required fields",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you would update the user profile in your backend
    // For now, we'll just update the local state
    setIsEditing(false);
    setIsSaving(false);

    // Show success message
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handleAvatarChange = () => {
    setIsUploading(true);

    // Generate a new random seed for the avatar
    const newSeed = Math.random().toString(36).substring(2, 8);

    // In a real app, you would upload the avatar to a server
    // For now, we'll just update the user object in localStorage with a new seed
    if (user) {
      const updatedUser = { ...user, avatarSeed: newSeed };
      localStorage.setItem("narrativeforge-user", JSON.stringify(updatedUser));

      // Force a re-render by updating the auth context
      // This is a simplified approach - in a real app you'd use the proper auth update method
      window.location.reload();
    }

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated",
      });
    }, 1500);
  };

  const getPlanBadgeColor = () => {
    if (!user) return "bg-muted text-muted-foreground";

    switch (user.plan) {
      case "premium":
        return "bg-amber-500 text-white";
      case "pro":
        return "bg-blue-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Please sign in to view your profile</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-center text-muted-foreground">
            You need to be logged in to view and manage your profile
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </div>
            <Badge className={getPlanBadgeColor()}>
              {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="w-24 h-24 border-2 border-primary/20">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed || user.name}`}
                />
                <AvatarFallback className="text-2xl">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handleAvatarChange}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Change Avatar
                  </>
                )}
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Name</Label>
                    <p className="text-lg font-medium">{user.name}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Bio</Label>
                    <p className="text-lg">{bio}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="w-full sm:w-auto"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto"
              >
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button
                onClick={onOpenPricingDialog}
                className="w-full sm:w-auto"
              >
                Manage Subscription
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Statistics</CardTitle>
          <CardDescription>Your story generation activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Stories Generated</span>
              <span className="font-medium">{user.storiesGenerated}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Daily Limit</span>
              <span className="font-medium">
                {user.plan === "free"
                  ? `${user.storiesGenerated} / ${user.storiesLimit}`
                  : "Unlimited"}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Max Word Count</span>
              <span className="font-medium">{user.wordLimit} words</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Saved Stories</span>
              <span className="font-medium">
                {user.plan === "free"
                  ? `${user.savedStoriesLimit} max`
                  : "Unlimited"}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={onOpenPricingDialog}
          >
            Upgrade for More Features
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSection;
