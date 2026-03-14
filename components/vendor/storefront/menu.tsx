import { CuisineCard } from "@/components/explore-cuisines/cuisine-card";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

type Props = {
    className?: string;
}

export const Menu = ({ className }: Props) => {
    return (
        <Card className={cn("py-0 sm:py-5 ring-0 sm:ring-1 overflow-visible", className)}>
            <CardHeader className="px-0 sm:px-5">
                <div className="flex items-center justify-between">
                    <CardTitle>Menu (23)</CardTitle>
                    <Button variant="secondary" size="small" className="text-sm font-medium">
                        <Plus className="size-4!" />
                        <span className="sr-only sm:not-sr-only">Add New Cuisine</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="px-0 sm:px-5">
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(285px,1fr))]">
                {
                    Array.from({ length: 7 }).map((_, index) => (
                        <CuisineCard key={index} />
                    ))
                }
                </div>
            </CardContent>
        </Card>
    )
}