import { ReusableDialog } from "@/components/ui/reusable-dialog";
import { Button } from "@/components/ui/button";

export function DialogExpiry1A({
  open,
  onOpenChange,
  expiryDate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expiryDate: string; // Pass the subscription expiry date as a prop
}) {
  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Your Subscription is About to Expire!"
      description={`Your subscription will expire on ${expiryDate}. Renew now to continue enjoying premium features without interruption.`}
      footer={
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => (window.location.href = "/renew-subscription")}
            variant="default"
            className="w-full"
          >
            Renew Subscription
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-full"
          >
            Maybe Later
          </Button>
        </div>
      }
    />
  );
}