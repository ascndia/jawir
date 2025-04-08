"use client";

import { Button } from "@/components/ui/button";
import { DialogWithLayout } from "@/registry/block/dialogs/dialog-with-layout";
import { useState } from "react";

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

  return (
    <div className="flex h-screen items-center justify-center">
        <DialogWrapper
          component={DialogWithLayout}
          text="Dialog with Layout"
        />      
        </div>
  );
}

export default DialogPage;
