import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Props = {
    className?: string;
}

export const RecentOrders = ({ className }: Props) => {
    return (
        <Card className={cn("py-4", className)}>
            <CardHeader className="px-4">
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="px-4">

            </CardContent>
        </Card>
    )
}