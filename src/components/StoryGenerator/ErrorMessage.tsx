import React from "react";
import { AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

interface ErrorMessageProps {
  isOpen?: boolean;
  title?: string;
  message?: string;
  onRetry?: () => void;
  onCancel?: () => void;
}

const ErrorMessage = ({
  isOpen = true,
  title = "Error Occurred",
  message = "There was an error generating your story. Please try again or modify your inputs.",
  onRetry = () => console.log("Retry clicked"),
  onCancel = () => console.log("Cancel clicked"),
}: ErrorMessageProps) => {
  return (
    <div className="bg-background">
      <AlertDialog open={isOpen}>
        {message && (
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <AlertTriangle size={24} />
                </div>
              </div>
              <AlertDialogTitle className="text-center">
                {title}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center mt-2">
                {message}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-center sm:justify-center gap-3 mt-4">
              <AlertDialogCancel
                onClick={onCancel}
                className="w-full sm:w-auto"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onRetry}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
              >
                Try Again
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>

      {/* Standalone version for direct component use */}
      <div className="hidden max-w-md mx-auto p-6 rounded-lg border shadow-lg bg-white">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-full bg-red-100 text-red-600">
            <AlertTriangle size={24} />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-center">{title}</h3>
        <p className="text-sm text-gray-500 text-center mt-2">{message}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onCancel}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onRetry}
            className="w-full sm:w-auto"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
