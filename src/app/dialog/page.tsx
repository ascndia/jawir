"use client";
import React, { useState } from "react";
// Import all dialog components
import ConfirmationDialog from "@/registry/block/dialogs/confirmation-dialog";
import DeleteConfirmationDialog from "@/registry/block/dialogs/delete-confirmation-dialog";
import LogoutWarningDialog from "@/registry/block/dialogs/logout-warning-dialog";
import ChatbotDialog from "@/registry/block/dialogs/ai/chatbot-dialog";
import RecommendationsDialog from "@/registry/block/dialogs/ai/recommendations-dialog";
import VoiceCommandDialog from "@/registry/block/dialogs/ai/voice-command-dialog";
import ChangePasswordDialog from "@/registry/block/dialogs/auth/change-password-dialog";
import LoginDialog from "@/registry/block/dialogs/auth/login-dialog";
import TwoFactorDialog from "@/registry/block/dialogs/auth/two-factor-dialog";
import RatingDialog from "@/registry/block/dialogs/feedback/rating-dialog";
import FileUploadDialog from "@/registry/block/dialogs/form/file-upload-dialog";
import MultiStepFormDialog from "@/registry/block/dialogs/form/multi-step-form-dialog";
import PaymentConfirmationDialog from "@/registry/block/dialogs/payment/payment-confirmation-dialog";
import SubscriptionUpgradeDialog from "@/registry/block/dialogs/payment/subscription-upgrade-dialog";
import OfflineModeDialog from "@/registry/block/dialogs/system/offline-mode-dialog";
import ServerErrorDialog from "@/registry/block/dialogs/system/server-error-dialog";

import ChartCustomizationDialog from "@/registry/block/dialogs/data/chart-customization-dialog";
import ExportDialog, { DialogExport1B } from "@/registry/block/dialogs/data/export-dialog";
import FilterDialog from "@/registry/block/dialogs/data/filter-dialog";
import CommentDialog from "@/registry/block/dialogs/social/comment-dialog";
import ReportDialog from "@/registry/block/dialogs/social/report-dialog";
import PostCreationDialog from "@/registry/block/dialogs/social/post-creation-dialog";
import AddToCartDialog from "@/registry/block/dialogs/e-commerce/add-to-cart-dialog";
import ProductQuickViewDialog from "@/registry/block/dialogs/e-commerce/product-quick-view";
import DialogTour1 from "@/registry/block/dialogs/dialog-tour-1/dialog";
import { DialogExceeded1A, DialogExceeded1B, DialogExceeded1C, DialogExceeded1D, DialogExceeded1E } from "@/registry/block/dialogs/dialog-exceeded";
import { DialogMedia1A, DialogMedia1B } from "@/registry/block/dialogs/dialog-media-1";
import { DialogPromotion1A, DialogPromotion1B, DialogPromotion1C, DialogPromotion1D, DialogPromotion1E, DialogPromotion1F, DialogPromotion1G, DialogPromotion1H, DialogPromotion1I } from "@/registry/block/dialogs/dialog-promotion-1";
import { Button } from "@/components/ui/button";
import { DialogOnboarding1A, DialogOnboarding1B, DialogOnboarding1C } from "@/registry/block/dialogs/dialog-onboarding-1/dialog-onboarding";
import { ReusableDialog } from "@/components/ui/reusable-dialog"; // Import the new component
import { DialogUpgrade1A, DialogUpgrade1B, DialogUpgrade1C, DialogUpgrade1D, DialogUpgrade1E, DialogUpgrade1F, DialogUpgrade1G, DialogUpgrade1H, DialogUpgrade1I, DialogUpgrade1J } from "@/registry/block/dialogs/dialog-upgrade-1";
import { DialogReminder1A, DialogReminder1B } from "@/registry/block/dialogs/dialog-reminder-1";
import { DialogCreate1A, DialogCreate1B, DialogCreate1C, DialogCreate1D, DialogCreate1E } from "@/registry/block/dialogs/dialog-create-1";
import { DialogConnect1A, DialogConnect1B, DialogConnect1C } from "@/registry/block/dialogs/dialog-connect-1";
import { DialogDelete1A, DialogDelete1B } from "@/registry/block/dialogs/dialog-delete";
import { DialogConfirm1A } from "@/registry/block/dialogs/dialog-confirm-1";
import { DialogAccounts1A } from "@/registry/block/dialogs/dialog-accounts-1";
import { DialogFeedback1A } from "@/registry/block/dialogs/feedback";
import { DialogOnboarding2A } from "@/registry/block/dialogs/dialog-onboarding-1";
import { DialogUpload1A } from "@/registry/block/dialogs/dialog-upload";
import { DialogEmptyState1A } from "@/registry/block/dialogs/dialog-empty-state-1";
import { DialogProduct1A } from "@/registry/block/dialogs/dialog-product-1/index.tsx";
import { DialogTutorial1A } from "@/registry/block/dialogs/dialog-tutorial-1";
import { DialogGallery1A } from "@/registry/block/dialogs/dialog-gallery-1";
import { DialogLocation1A } from "@/registry/block/dialogs/dialog-location-1";
import { DialogExpiry1A } from "@/registry/block/dialogs/dialog-expiry";
import { ServiceFormDialog } from "@/registry/block/dialogs/dialog-multistep/service-form-dialog";
import { DialogAuth1A, DialogAuth1B } from "@/registry/block/dialogs/dialog-auth-1";
import { DialogAspectRatio1A } from "@/registry/block/dialogs/dialog-aspect-ratio";
import { DialogQuiz1A } from "@/registry/block/dialogs/dialog-quiz";
// Helper component to wrap each dialog with a trigger and state management
function DialogWrapper({ text, component }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Button onClick={() => setOpen(true)}>{text}</Button>
      {component({ open, onOpenChange: setOpen })}
    </div>
  );
}
function DialogPage() {
  const [isReusableDialogOpen, setIsReusableDialogOpen] = useState(false); // State for the new dialog

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Dialog Components</h1>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {/* Example Usage of ReusableDialog */}
        <div className="flex items-center justify-center">
          <Button onClick={() => setIsReusableDialogOpen(true)}>
            Open Reusable Dialog
          </Button>
          <ReusableDialog
            open={isReusableDialogOpen}
            onOpenChange={setIsReusableDialogOpen}
            title="Reusable Dialog Title"
            description={
              <span>
                This is a <b>description</b> using a React node.
              </span>
            }
            
            footer={
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsReusableDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsReusableDialogOpen(false)}>
                  Confirm
                </Button>
              </>
            }
          >
            <p>This is the main content area of the reusable dialog.</p>
            <p>You can put any React node here.</p>
          </ReusableDialog>
        </div>
        {/* Existing Dialogs */}
        <DialogWrapper
          component={DialogAspectRatio1A}
          text="Aspect ratio Dialog"
        />
        <DialogWrapper
          component={DialogQuiz1A}
          text="Quiz Dialog"
        />
        <DialogWrapper
          component={DialogAuth1A}
          text="Auth Dialog"
        />
        <DialogWrapper
          component={DialogAuth1B}
          text="Social auth Dialog"
        />
        <DialogWrapper
          component={ServiceFormDialog}
          text="Service Form Multistep Dialog"
        />
        <DialogWrapper
          component={DialogExpiry1A}
          text="Expiry Dialog"
        />
        <DialogWrapper
          component={DialogLocation1A}
          text="Location Dialog"
        />
        <DialogWrapper
          component={DialogGallery1A}
          text="Image gallery Dialog"
        />
        <DialogWrapper
          component={DialogTutorial1A}
          text="Video Tutorial Dialog"
        />
        <DialogWrapper
          component={DialogProduct1A}
          text="Product Dialog"
        />
        <DialogWrapper
          component={DialogEmptyState1A}
          text="Empty State Dialog"
        />
        <DialogWrapper
          component={DialogAccounts1A}
          text="Manage accounts Dialog"
        />
        <DialogWrapper
          component={DialogConfirm1A}
          text="Confirm Dialog"
        />
        <DialogWrapper
          component={DialogDelete1A}
          text="Delete Dialog"
        />
        <DialogWrapper
          component={DialogDelete1B}
          text="Delete Dialog B"
        />
        <DialogWrapper
          component={DialogConnect1A}
          text="Connect Dialog"
        />
        <DialogWrapper
          component={DialogConnect1B}
          text="Connect Dialog B"
        />
        <DialogWrapper
          component={DialogConnect1C}
          text="Connect Dialog C"
        />
        <DialogWrapper
          component={DialogCreate1A}
          text="Create Dialog"
        />
        <DialogWrapper
          component={DialogCreate1B}
          text="Create Dialog B"
        />
        <DialogWrapper
          component={DialogCreate1C}
          text="Create Dialog C"
        />
        <DialogWrapper
          component={DialogCreate1D}
          text="Create Dialog D"
        />
        <DialogWrapper
          component={DialogCreate1E}
          text="Create Dialog E"
        />
        <DialogWrapper
          component={DialogReminder1A}
          text="Reminder Dialog"
        />
        <DialogWrapper
          component={DialogReminder1B}
          text="Reminder Dialog b"
        />
        <DialogWrapper
          component={DialogUpgrade1A}
          text="Upgrade Dialog"
        />
        <DialogWrapper
          component={DialogUpgrade1B}
          text="Upgrade DialogB"
        />
        <DialogWrapper
          component={DialogUpgrade1C}
          text="Upgrade DialogC"
        />
        <DialogWrapper
          component={DialogUpgrade1D}
          text="Upgrade DialogD"
        />
        <DialogWrapper
          component={DialogUpgrade1E}
          text="Upgrade DialogE"
        />
        <DialogWrapper
          component={DialogUpgrade1F}
          text="Upgrade Dialog F"
        />
        <DialogWrapper
          component={DialogUpgrade1G}
          text="Upgrade Dialog G"
        />
        <DialogWrapper
          component={DialogUpgrade1H}
          text="Upgrade Dialog H"
        />
        <DialogWrapper
          component={DialogUpgrade1I}
          text="Upgrade Dialog I"
        />
        <DialogWrapper
          component={DialogUpgrade1J}
          text="Upgrade Dialog J"
        />
        <DialogWrapper
          component={DialogExceeded1A}
          text="Quota Exceeded Dialog"
        />
        <DialogWrapper
          component={DialogExceeded1B}
          text="Message Exceeded Dialog"
        />
        <DialogWrapper
          component={DialogExceeded1C}
          text="Storage Exceeded Dialog1"
        />
        <DialogWrapper
          component={DialogExceeded1D}
          text="Storage Exceeded Dialog2"
        />
        <DialogWrapper
          component={DialogExceeded1E}
          text="Storage Exceeded Dialog3"
        />
        <DialogWrapper
          component={DialogOnboarding1A}
          text="Onboarding Dialog"
        />
        <DialogWrapper
          component={DialogOnboarding1B}
          text="Onboarding Dialog B"
        />
        <DialogWrapper
          component={DialogOnboarding1C}
          text="Onboarding Dialog C"
        />
        <DialogWrapper
          component={DialogOnboarding2A}
          text="Onboarding Dialog 2A"
        />
        <DialogWrapper
          component={DialogPromotion1A  }
          text="Promotional Dialog"
        />
        <DialogWrapper
          component={DialogPromotion1B  }
          text="Promotional Dialog 2"
        />
        <DialogWrapper
          component={DialogPromotion1C  }
          text="Promotional Dialog 3"
        />
        <DialogWrapper
          component={DialogPromotion1D  }
          text="Promotional Dialog 1D"
        />
        <DialogWrapper
          component={DialogPromotion1E}
          text="Promotional Dialog 1E"
        />
        <DialogWrapper
          component={DialogPromotion1F}
          text="Promotional Dialog 1F"
        />
        <DialogWrapper
          component={DialogPromotion1G}
          text="Promotional Dialog 1G"
        />
        <DialogWrapper
          component={DialogPromotion1H}
          text="Promotional Dialog 1H"
        />
        <DialogWrapper
          component={DialogPromotion1I}
          text="Promotional Dialog 1I"
        />
        <DialogWrapper
          component={DialogMedia1A}
          text="Video dialog"
        />
        <DialogWrapper
          component={DialogMedia1B}
          text="image dialog"
        />
        <DialogWrapper
          component={ConfirmationDialog}
          text="Confirmation Dialog"
        />
        <DialogWrapper
          component={DeleteConfirmationDialog}
          text="Delete Confirmation Dialog"
        />
        <DialogWrapper
          component={LogoutWarningDialog}
          text="Logout Warning Dialog"
        />
        <DialogWrapper component={ChatbotDialog} text="Chatbot Dialog" />
        <DialogWrapper
          component={RecommendationsDialog}
          text="Recommendations Dialog"
        />
        <DialogWrapper
          component={VoiceCommandDialog}
          text="Voice Command Dialog"
        />
        <DialogWrapper
          component={ChangePasswordDialog}
          text="Change Password Dialog"
        />
        <DialogWrapper component={LoginDialog} text="Login Dialog" />
        <DialogWrapper component={TwoFactorDialog} text="Two Factor Dialog" />
        <DialogWrapper component={RatingDialog} text="Rating Dialog" />
        <DialogWrapper component={DialogFeedback1A} text="Feedback Dialog" />
        <DialogWrapper component={FileUploadDialog} text="File Upload Dialog" />
        <DialogWrapper component={DialogUpload1A} text="Upload Dialog 1A" />
        <DialogWrapper
          component={MultiStepFormDialog}
          text="Multi Step Form Dialog"
        />
        <DialogWrapper
          component={PaymentConfirmationDialog}
          text="Payment Confirmation Dialog"
        />
        <DialogWrapper
          component={SubscriptionUpgradeDialog}
          text="Subscription Upgrade Dialog"
        />
        <DialogWrapper
          component={OfflineModeDialog}
          text="Offline Mode Dialog"
        />
        <DialogWrapper
          component={ServerErrorDialog}
          text="Server Error Dialog"
        />
        <DialogWrapper
          component={ChartCustomizationDialog}
          text="Chart Customization Dialog"
        />
        <DialogWrapper component={ExportDialog} text="Export Dialog" />
        <DialogWrapper component={DialogExport1B} text="Export Dialog2" />
        <DialogWrapper component={FilterDialog} text="Filter Dialog" />
        <DialogWrapper component={CommentDialog} text="Comment Dialog" />
        <DialogWrapper component={ReportDialog} text="Report Dialog" />
        <DialogWrapper
          component={PostCreationDialog}
          text="Post Creation Dialog"
        />
        <DialogWrapper component={AddToCartDialog} text="Add To Cart Dialog" />
        <DialogWrapper
          component={ProductQuickViewDialog}
          text="Product Quick View Dialog"
        />
        <DialogWrapper component={DialogTour1} text="Dialog Tour 1" />
      </div>
    </div>
  );
}

export default DialogPage;
