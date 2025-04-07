"use client";
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type DialogQuiz1AProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

export function DialogQuiz1A({ open, onOpenChange }: DialogQuiz1AProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: "q1",
      question: "Which country won the 2023 ICC Cricket World Cup?",
      options: ["India", "Australia", "England", "New Zealand"],
      correctAnswer: 1,
    },
    {
      id: "q2",
      question: "Who holds the record for the highest individual score in Test cricket?",
      options: ["Sachin Tendulkar", "Brian Lara", "Don Bradman", "Virat Kohli"],
      correctAnswer: 1,
    },
    {
      id: "q3",
      question: "How many players are there in a cricket team?",
      options: ["9", "10", "11", "12"],
      correctAnswer: 2,
    },
  ];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;

    setIsAnswered(true);
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };
  
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Cricket Quiz</DialogTitle>
          <DialogDescription>
            {!quizCompleted
              ? `Question ${currentQuestion + 1} of ${questions.length}`
              : "Quiz Completed!"}
          </DialogDescription>
        </DialogHeader>
        
        {!quizCompleted ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{questions[currentQuestion].question}</h3>
            <RadioGroup className="space-y-1">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center space-x-2 rounded-md border p-4 cursor-pointer transition-colors",
                    isAnswered && index === questions[currentQuestion].correctAnswer
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : isAnswered && index === selectedOption
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : selectedOption === index
                      ? "border-primary"
                      : ""
                  )}
                  onClick={() => handleOptionSelect(index)}
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    checked={selectedOption === index}
                    disabled={isAnswered}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-grow cursor-pointer font-normal"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ) : (
          <div className="text-center py-6">
            <h3 className="text-2xl font-bold mb-2">Your Score: {score}/{questions.length}</h3>
            <p className="text-muted-foreground mb-4">
              {score === questions.length
                ? "Perfect! You're a cricket expert!"
                : score >= questions.length / 2
                ? "Good job! You know your cricket well."
                : "Keep learning about cricket!"}
            </p>
          </div>
        )}
        
        <DialogFooter className="flex justify-between border-t pt-4">
          {!quizCompleted ? (
            <>
              <Button
                variant="outline"
                onClick={handleClose}
              >
                Cancel
              </Button>
              {isAnswered ? (
                <Button onClick={handleNextQuestion}>
                  {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
                </Button>
              ) : (
                <Button onClick={handleCheckAnswer} disabled={selectedOption === null}>
                  Check Answer
                </Button>
              )}
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleRetry}>Try Again</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}