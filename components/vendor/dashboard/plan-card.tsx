import { IconStarFull, IconTrendingUp } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
}

export const PlanCard = ({ className }: Props) => {
    return (
        <div className={cn("flex flex-col gap-3 p-5 rounded-2xl inset-ring-1 inset-ring-outline", className)}>
            <div className="flex items-center gap-3">
                <div className="rounded-2xl overflow-hidden size-14">
                    <img src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="food" className="size-14 object-cover object-center" />
                </div>
                <div className="grid gap-px">
                    <span className="font-semibold text-base text-grey-dark-0">Jollof Rice Kitchen</span>
                    <div className="flex items-center gap-2 text-sm text-grey-dark-2 [&>svg]:text-yellow-2"><IconStarFull /> 4.5</div>
                </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
                <div className="grid gap-px flex-1">
                    <span className="font-semibold text-base text-grey-dark-0">Plan 1</span>
                    <p className="text-xs text-grey-dark-3">Expiry: 23rd Feb, 2027</p>
                </div>
                <Button size="sm" variant="secondary" className="font-medium h-8.5">
                    <IconTrendingUp />
                    Upgrade Now
                </Button>
            </div>
        </div>
    )
}