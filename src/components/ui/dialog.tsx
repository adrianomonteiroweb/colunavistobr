import * as React from "react";
import { cn } from "@/lib/utils";

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Dialog = ({ children, ...props }: DialogProps) => (
  <div {...props}>{children}</div>
);

export const DialogContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("bg-white rounded-lg shadow-lg p-6", className)}>
    {children}
  </div>
);

export const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

export const DialogTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <h2 className={cn("text-lg font-bold", className)}>{children}</h2>;

export const DialogTrigger = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export default Dialog;
