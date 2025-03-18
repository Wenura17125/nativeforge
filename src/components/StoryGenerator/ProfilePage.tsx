import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import ProfileSection from "./ProfileSection";
import SettingsSection from "./SettingsSection";
import PricingDialog from "./PricingDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { User, Settings } from "lucide-react";

const ProfilePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pricingDialogOpen, setPricingDialogOpen] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Apply theme change to document
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Account Management
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Manage your profile, settings, and subscription preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-2 w-[400px]">
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

      <PricingDialog
        isOpen={pricingDialogOpen}
        onClose={() => setPricingDialogOpen(false)}
      />
    </div>
  );
};

export default ProfilePage;
