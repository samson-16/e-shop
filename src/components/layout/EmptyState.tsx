import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: ReactNode;
}

export default function EmptyState({
  message,
  actionLabel,
  actionHref,
  icon,
}: EmptyStateProps) {
  return (
    <div className="text-center py-10 border-2 border-dashed rounded-lg mt-6">
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <p className="text-muted-foreground mb-4">{message}</p>
      {actionLabel && actionHref && (
        <Button asChild>
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
