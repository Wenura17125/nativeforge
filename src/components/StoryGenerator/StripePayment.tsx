import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useAuth } from "./AuthProvider";
import { Check, CreditCard } from "lucide-react";
import StripeCheckout from "./StripeCheckout";

interface StripePaymentProps {
  planId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const StripePayment: React.FC<StripePaymentProps> = ({
  planId,
  onSuccess,
  onCancel,
}) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const planDetails = {
    pro: {
      name: "Pro Plan",
      price: 9.99,
      features: [
        "Unlimited stories",
        "Up to 2,000 words per story",
        "Save unlimited stories",
        "Priority generation",
      ],
    },
    premium: {
      name: "Premium Plan",
      price: 19.99,
      features: [
        "Unlimited stories",
        "Up to 5,000 words per story", // Updated to 5000 words
        "Fastest response time",
        "API access",
        "Advanced analytics",
        "Priority support",
      ],
    },
  };

  const plan = planId === "premium" ? planDetails.premium : planDetails.pro;

  if (showCheckout) {
    return (
      <StripeCheckout
        planId={planId}
        amount={plan.price}
        onSuccess={onSuccess}
        onCancel={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Subscribe to {plan.name}</CardTitle>
        <CardDescription>
          Complete your payment to upgrade your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">{plan.name}</span>
            <span className="text-2xl font-bold">
              ${plan.price.toFixed(2)}/month
            </span>
          </div>

          <div className="border-t border-b py-4 my-4">
            <h3 className="font-medium mb-2">Plan includes:</h3>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          onClick={() => setShowCheckout(true)}
          className="w-full sm:w-auto"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Proceed to Payment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StripePayment;
