import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import PricingPlans from "./PricingPlans";
import StripePayment from "./StripePayment";
import { useAuth } from "./AuthProvider";

interface PricingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string | null;
  initialShowPayment?: boolean;
}

const PricingDialog: React.FC<PricingDialogProps> = ({
  isOpen,
  onClose,
  initialPlan = null,
  initialShowPayment = false,
}) => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(initialPlan);
  const [showPayment, setShowPayment] = useState(initialShowPayment);

  const handleSelectPlan = async (planId: string) => {
    if (planId === "free") {
      // Free plan doesn't require payment
      try {
        await useAuth().updateUserPlan(planId);
        onClose();
        alert(`Successfully switched to free plan!`);
      } catch (error) {
        console.error("Error switching to free plan:", error);
      }
    } else {
      // For paid plans, show the payment screen
      setSelectedPlan(planId);
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = () => {
    onClose();
    alert(`Successfully upgraded to ${selectedPlan} plan!`);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setSelectedPlan(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upgrade Your Plan</DialogTitle>
          <DialogDescription>
            Choose the plan that best fits your storytelling needs
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {!showPayment ? (
            <PricingPlans onSelectPlan={handleSelectPlan} onClose={onClose} />
          ) : (
            <StripePayment
              planId={selectedPlan || "pro"}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingDialog;
