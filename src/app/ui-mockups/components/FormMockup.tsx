"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import UIMockup, { UIMockupProps } from "./UIMockup";

export interface FormFieldProps {
  label?: string;
  placeholder?: string;
  description?: string;
  type?:
    | "text"
    | "textarea"
    | "checkbox"
    | "select"
    | "radio"
    | "toggle"
    | "file";
  required?: boolean;
  options?: string[];
  height?: number;
  className?: string;
  containerClassName?: string;
}

export interface FormMockupProps extends Omit<UIMockupProps, "children"> {
  title?: string;
  subtitle?: string;
  fields?: FormFieldProps[];
  submitText?: string;
  footerText?: ReactNode;
  width?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  layout?: "single" | "two-column";
}

export function FormField({
  field,
  index,
}: {
  field: FormFieldProps;
  index: number;
}) {
  if (field.type === "checkbox") {
    return (
      <div className="flex items-center space-x-2 text-left">
        <div className="h-4 w-4 rounded border border-white/20 bg-white/5"></div>
        <div className="text-sm text-white/60">{field.label}</div>
      </div>
    );
  }

  if (field.type === "toggle") {
    return (
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-white/70">{field.label}</div>
          {field.description && (
            <div className="text-xs text-white/40">{field.description}</div>
          )}
        </div>
        <div
          className={cn(
            "h-6 w-11 rounded-full p-1",
            index % 2 === 0 ? "bg-primary" : "bg-white/10"
          )}
        >
          <div
            className={cn(
              "h-4 w-4 rounded-full",
              index % 2 === 0 ? "ml-auto bg-white" : "bg-white/60"
            )}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2 text-left", field.containerClassName)}>
      {field.label && (
        <div className="text-sm font-medium text-white/70">
          {field.label}
          {field.required && <span className="text-red-400 ml-1">*</span>}
        </div>
      )}
      {field.type === "textarea" ? (
        <div
          className={cn(
            "rounded-md border border-white/10 bg-white/5 px-3 py-2",
            field.className
          )}
          style={{ height: field.height || 80 }}
        ></div>
      ) : field.type === "select" ? (
        <div className="flex h-10 items-center justify-between rounded-md border border-white/10 bg-white/5 px-3">
          <span className="text-sm text-white/40">
            {field.placeholder || "Select an option"}
          </span>
          <svg
            className="h-4 w-4 text-white/40"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      ) : field.type === "file" ? (
        <div className="h-10 flex items-center justify-center rounded-md border border-dashed border-white/20 bg-white/5 px-3">
          <span className="text-sm text-white/40">
            Upload {field.placeholder || "file"}
          </span>
        </div>
      ) : (
        <div
          className={cn(
            "h-10 rounded-md border border-white/10 bg-white/5 px-3",
            field.className
          )}
        ></div>
      )}
      {field.description && (
        <div className="text-xs text-white/40">{field.description}</div>
      )}
    </div>
  );
}

export default function FormMockup({
  title = "Form Title",
  subtitle,
  fields = [
    { label: "Full Name", required: true },
    { label: "Email", required: true },
    { label: "Message", type: "textarea" },
  ],
  submitText = "Submit",
  footerText,
  width = "md",
  layout = "single",
  ...mockupProps
}: FormMockupProps) {
  const maxWidthClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "w-full",
  };

  const mockupContents = (
    <div className={cn("mx-auto", maxWidthClasses[width])}>
      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        {(title || subtitle) && (
          <div className="mb-6 text-left">
            {title && (
              <h3 className="text-xl font-semibold text-white">{title}</h3>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-white/60">{subtitle}</p>
            )}
          </div>
        )}

        <div className="space-y-4">
          {layout === "two-column" ? (
            <div className="grid gap-4 md:grid-cols-2">
              {fields.map((field, i) => (
                <FormField key={i} field={field} index={i} />
              ))}
            </div>
          ) : (
            fields.map((field, i) => (
              <FormField key={i} field={field} index={i} />
            ))
          )}
        </div>

        {submitText && (
          <div className="mt-6">
            <div className="h-10 w-full rounded-md bg-primary text-center">
              <div className="py-2 font-medium text-primary-foreground">
                {submitText}
              </div>
            </div>
          </div>
        )}

        {footerText && (
          <div className="mt-4 text-center text-sm text-white/60">
            {footerText}
          </div>
        )}
      </div>
    </div>
  );

  // Default mockup props
  const defaultMockupProps: Partial<UIMockupProps> = {
    bgGradient: "bg-gradient-to-br from-purple-950 to-violet-900",
    itemsPerRow: 1,
  };

  return (
    <UIMockup {...defaultMockupProps} {...mockupProps}>
      {mockupContents}
    </UIMockup>
  );
}
