import React from "react";
import { ReusableDialog } from "@/components/ui/reusable-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Meh, Frown } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogFeedback1A({ open, onOpenChange }: Props) {
  const [feedback, setFeedback] = React.useState<string>("");
  const [selectedMood, setSelectedMood] = React.useState<string | null>(null);

  const moods = [
    { id: "happy", icon: <Smile className="h-4 w-4" />, label: "Happy" },
    { id: "neutral", icon: <Meh className="h-4 w-4" />, label: "Neutral" },
    { id: "sad", icon: <Frown className="h-4 w-4" />, label: "Sad" },
  ];

  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Leave Feedback"
      headerAlignment="left"
      description="We’d love to hear what went well or how we can improve the product experience."
      footer={
        <div className="flex justify-between items-center w-full">
          {/* Mood Selection */}
          <div className="flex items-center space-x-2">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                  selectedMood === mood.id
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                aria-label={mood.label}
              >
                {mood.icon}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="w-20"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="w-20"
              onClick={() => {
                alert(`Feedback: ${feedback}, Mood: ${selectedMood}`);
                onOpenChange(false);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Feedback Textarea */}
        <Textarea
          placeholder="Your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full"
        />
      </div>
    </ReusableDialog>
  );
}