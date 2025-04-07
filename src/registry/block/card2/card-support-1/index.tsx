import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CardSupport1A() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Support</CardTitle>
        <CardDescription>
          Can't find what you're looking for? Our support team is here to help you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
            <Input placeholder="Subject" />
            <Textarea
              className="w-full"
              rows={4}
              placeholder="Describe your issue..."
            />
          <Button className="w-full">Submit Request</Button>
        </form>
      </CardContent>
    </Card>
  );
}