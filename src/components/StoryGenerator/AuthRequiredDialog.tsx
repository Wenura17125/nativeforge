import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import LoginForm from "./LoginForm";

interface AuthRequiredDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  message?: string;
}

const AuthRequiredDialog: React.FC<AuthRequiredDialogProps> = ({
  isOpen,
  onClose,
  onSuccess,
  message = "Please sign in to continue using NarrativeForge",
}) => {
  const [showLogin, setShowLogin] = React.useState(false);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {!showLogin ? (
          <>
            <DialogHeader>
              <DialogTitle>Authentication Required</DialogTitle>
              <DialogDescription>{message}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <p className="text-sm text-muted-foreground">
                Sign in to access all features of NarrativeForge, including AI
                story generation, saving your stories, and more.
              </p>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="sm:w-auto w-full"
              >
                Maybe Later
              </Button>
              <Button
                onClick={() => setShowLogin(true)}
                className="sm:w-auto w-full"
              >
                Sign In
              </Button>
            </DialogFooter>
          </>
        ) : (
          <LoginForm onSuccess={handleLoginSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthRequiredDialog;
