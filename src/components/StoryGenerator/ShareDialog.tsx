import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Copy, Facebook, Link, Mail, Twitter } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  storyTitle?: string;
  storyContent?: string;
}

const ShareDialog: React.FC<ShareDialogProps> = ({
  isOpen,
  onClose,
  storyTitle = "My Generated Story",
  storyContent = "",
}) => {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [emailSubject, setEmailSubject] = useState(
    `Check out my story: ${storyTitle}`,
  );
  const [emailBody, setEmailBody] = useState(
    `I created this story using NarrativeForge AI:\n\n${storyContent.substring(0, 500)}${storyContent.length > 500 ? "..." : ""}`,
  );

  // In a real app, this would generate a shareable URL
  const generateShareableUrl = () => {
    // This is a placeholder. In a real app, you would create a unique URL
    // that allows others to view the story
    const dummyUrl = `https://narrativeforge.ai/shared/story-${Date.now().toString(36)}`;
    setShareUrl(dummyUrl);
    return dummyUrl;
  };

  const handleCopyLink = () => {
    const url = shareUrl || generateShareableUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(storyContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareSocial = (platform: string) => {
    const url = shareUrl || generateShareableUrl();
    let socialShareUrl;

    switch (platform) {
      case "twitter":
        socialShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `${storyTitle}\n\n${storyContent.substring(0, 100)}...`,
        )}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        socialShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url,
        )}`;
        break;
      case "email":
        socialShareUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
          emailSubject,
        )}&body=${encodeURIComponent(emailBody)}`;
        break;
    }

    if (socialShareUrl) {
      window.open(socialShareUrl, "_blank");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Story</DialogTitle>
          <DialogDescription>
            Share your creative story with friends and family.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="mt-4 space-y-4">
            <div className="flex space-x-2">
              <Input
                value={shareUrl || "Generate a link to share your story"}
                readOnly
                className="flex-1"
              />
              <Button variant="outline" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            {!shareUrl && (
              <Button
                onClick={generateShareableUrl}
                className="w-full"
                variant="default"
              >
                <Link className="h-4 w-4 mr-2" />
                Generate Shareable Link
              </Button>
            )}
            <div className="pt-4">
              <Button
                onClick={handleCopyText}
                className="w-full"
                variant="outline"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Story Text
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="social" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => handleShareSocial("twitter")}
                className="w-full"
                variant="outline"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button
                onClick={() => handleShareSocial("facebook")}
                className="w-full"
                variant="outline"
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="email" className="mt-4 space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Recipient's email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              <Input
                placeholder="Subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
              <Textarea
                placeholder="Email body"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <Button
              onClick={() => handleShareSocial("email")}
              className="w-full"
              disabled={!emailAddress}
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-start">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
