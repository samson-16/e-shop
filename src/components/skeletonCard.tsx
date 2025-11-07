import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function SkeletonCard() {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="relative p-0">
        <Skeleton className="aspect-square w-full" />
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Skeleton className="h-4 w-1/4" />
      </CardFooter>
    </Card>
  );
}