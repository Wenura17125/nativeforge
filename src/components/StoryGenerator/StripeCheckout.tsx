import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CreditCard, Loader2 } from "lucide-react";
import { useAuth } from "./AuthProvider";

interface StripeCheckoutProps {
  planId: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  planId,
  amount,
  onSuccess,
  onCancel,
}) => {
  const { updateUserPlan } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    // Validate inputs
    if (!cardNumber || !expiry || !cvc || !name) {
      setError("Please fill in all fields");
      setIsProcessing(false);
      return;
    }

    // Basic validation for card number format
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      setError("Please enter a valid 16-digit card number");
      setIsProcessing(false);
      return;
    }

    // Basic validation for expiry format
    if (!expiry.match(/^\d{2}\/\d{2}$/)) {
      setError("Please enter a valid expiry date (MM/YY)");
      setIsProcessing(false);
      return;
    }

    // Basic validation for CVC
    if (cvc.length !== 3) {
      setError("Please enter a valid 3-digit CVC");
      setIsProcessing(false);
      return;
    }

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update user plan
      await updateUserPlan(planId);
      onSuccess();
    } catch (err) {
      setError("Payment processing failed. Please try again.");
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    // Remove non-digits and slashes
    let v = value.replace(/[^0-9\/]/gi, "");

    // Handle backspace when the slash is deleted
    if (value.length < expiry.length && expiry.endsWith("/")) {
      return v.slice(0, -1);
    }

    // Auto-add slash after MM if user hasn't added it
    if (v.length === 2 && !v.includes("/") && expiry.length < value.length) {
      return v + "/";
    }

    // Format as MM/YY
    if (v.length > 2 && !v.includes("/")) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }

    return v.slice(0, 5); // Limit to MM/YY format
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Cardholder Name</Label>
            <Input
              id="name"
              placeholder="John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                maxLength={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ""))}
                maxLength={3}
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
              {error}
            </div>
          )}

          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-2">
              You will be charged ${amount.toFixed(2)} monthly for the selected
              plan.
            </p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isProcessing}
          className="w-full sm:w-auto"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay ${amount.toFixed(2)}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StripeCheckout;
