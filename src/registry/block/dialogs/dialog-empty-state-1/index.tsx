import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { PlusCircle, type LucideIcon } from "lucide-react"
import { EmptyState } from "../../empty-state/empty-state-1"

interface DialogEmptyState1AProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  icon?: LucideIcon
  title?: string
  description?: string
  actionLabel?: string
  actionIcon?: LucideIcon
  onAction?: () => void
  dialogTitle?: string
  dialogDescription?: string
  className?: string
}

/**
 * DialogEmptyState1A is a dialog component that displays an empty state
 * with an optional call to action.
 *
 * @example
 * <DialogEmptyState1A open={true} onOpenChange={() => {}} />
 *
 * @param {boolean} open - Whether the dialog is open or not.
 * @param {Function} onOpenChange - A callback function to call when the dialog is opened or closed.
 * @param {LucideIcon} icon - An optional icon to display in the empty state.
 * @param {string} title - An optional title to display in the empty state.
 * @param {string} description - An optional description to display in the empty state.
 * @param {string} actionLabel - An optional label to display as the call to action.
 * @param {LucideIcon} actionIcon - An optional icon to display as the call to action.
 * @param {Function} onAction - An optional callback function to call when the call to action is clicked.
 * @param {string} dialogTitle - An optional title to display in the dialog header.
 * @param {string} dialogDescription - An optional description to display in the dialog header.
 * @param {string} className - An optional class name to apply to the dialog content.
 */
export function DialogEmptyState1A({
  open,
  onOpenChange,
  icon = PlusCircle,
  title = "No data",
  description = "No data available",
  actionLabel = "Add",
  actionIcon = PlusCircle,
  onAction,
  dialogTitle = "Document",
  dialogDescription = "Manage your documents",
  className,
}: DialogEmptyState1AProps) {
  const handleAction = () => {
    if (onAction) {
      onAction()
    }
    // Optionally close the dialog after action
    // onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-auto">
        {(dialogTitle || dialogDescription) && (
          <DialogHeader>
            {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
            {dialogDescription && <DialogDescription>{dialogDescription}</DialogDescription>}
          </DialogHeader>
        )}
        <EmptyState
          icon={icon}
          title={title}
          description={description}
          actionLabel={actionLabel}
          actionIcon={actionIcon}
          onAction={handleAction}
          className={className}
        />
      </DialogContent>
    </Dialog>
  )
}

