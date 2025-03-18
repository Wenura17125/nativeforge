import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { useAuth } from "./AuthProvider";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  buttonText: string;
}

interface PricingPlansProps {
  onSelectPlan?: (planId: string) => void;
  onClose?: () => void;
}

const plans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Basic access to AI story generation",
    buttonText: "Current Plan",
    features: [
      { name: "5 stories per day", included: true },
      { name: "Basic story parameters", included: true },
      { name: "Up to 500 words per story", included: true },
      { name: "Save up to 10 stories", included: true },
      { name: "Standard response time", included: true },
      { name: "Advanced parameters", included: false },
      { name: "Storyboard visualization", included: false },
      { name: "Priority generation", included: false },
      { name: "Up to 5,000 words per story", included: false },
      { name: "API access", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 9.99,
    description: "Enhanced features for serious writers",
    buttonText: "Upgrade to Pro",
    popular: true,
    features: [
      { name: "Unlimited stories", included: true },
      { name: "Advanced story parameters", included: true },
      { name: "Up to 2,000 words per story", included: true },
      { name: "Save unlimited stories", included: true },
      { name: "Faster response time", included: true },
      { name: "Advanced parameters", included: true },
      { name: "Storyboard visualization", included: true },
      { name: "Priority generation", included: true },
      { name: "Up to 5,000 words per story", included: false },
      { name: "API access", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    description: "Ultimate storytelling experience",
    buttonText: "Upgrade to Premium",
    features: [
      { name: "Unlimited stories", included: true },
      { name: "All story parameters", included: true },
      { name: "Up to 5,000 words per story", included: true },
      { name: "Save unlimited stories", included: true },
      { name: "Fastest response time", included: true },
      { name: "Advanced parameters", included: true },
      { name: "Storyboard visualization", included: true },
      { name: "Priority generation", included: true },
      { name: "API access", included: true },
    ],
  },
];

const PricingPlans: React.FC<PricingPlansProps> = ({
  onSelectPlan = () => {},
  onClose = () => {},
}) => {
  const { user } = useAuth();
  const currentPlan = user?.plan || "free";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the perfect plan to unleash your storytelling potential with
          our AI-powered platform.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              className={`h-full flex flex-col ${plan.popular ? "border-primary shadow-md" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <Badge
                    variant="default"
                    className="bg-primary text-primary-foreground"
                  >
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground ml-1">/month</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                      )}
                      <span
                        className={
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={
                    plan.id === currentPlan
                      ? "outline"
                      : plan.popular
                        ? "default"
                        : "outline"
                  }
                  className="w-full"
                  onClick={() => onSelectPlan(plan.id)}
                  disabled={plan.id === currentPlan}
                >
                  {plan.id === currentPlan ? "Current Plan" : plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="ghost" onClick={onClose}>
          Maybe Later
        </Button>
      </div>
    </div>
  );
};

export default PricingPlans;
