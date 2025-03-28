import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Button from "@/registry/components/button/button-shadcn/button";
import { MessageSquarePlus } from "lucide-react";

interface CardChatActivityStartNewProps {
  onStartChat?: () => void;
  className?: string;
  buttonText?: string;
}

export default function CardChatActivityStartNew1({
  onStartChat,
  className,
  buttonText = "Start New Chat",
}: CardChatActivityStartNewProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle>New Chat Session</CardTitle>
        <CardDescription>
          Begin a new conversation with one of your documents.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-6">
        <Button size="lg" onClick={onStartChat}>
          <MessageSquarePlus className="mr-2 h-5 w-5" />
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
