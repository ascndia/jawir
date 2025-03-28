"use client";
import React, { useState } from "react";

import { Button } from "@/registry/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/components/dialog";

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
import ExportDialog from "@/registry/block/dialogs/data/export-dialog";
import FilterDialog from "@/registry/block/dialogs/data/filter-dialog";
import CommentDialog from "@/registry/block/dialogs/social/comment-dialog";
import ReportDialog from "@/registry/block/dialogs/social/report-dialog";
import PostCreationDialog from "@/registry/block/dialogs/social/post-creation-dialog";
import AddToCartDialog from "@/registry/block/dialogs/e-commerce/add-to-cart-dialog";
import ProductQuickViewDialog from "@/registry/block/dialogs/e-commerce/product-quick-view";

// Helper component to wrap each dialog with a trigger and state management
function DialogWrapper({ text, component }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>{text}</Button>
      {component({ open, onOpenChange: setOpen })}
    </div>
  );
}
function DialogPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Dialog Components</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        <DialogWrapper component={FileUploadDialog} text="File Upload Dialog" />
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
      </div>
    </div>
  );
}

export default DialogPage;
