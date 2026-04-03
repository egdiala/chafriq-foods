import { PlanCard } from "./plan-card"
import { TopCards } from "./top-cards"
import { YourMenu } from "./your-menu"
import { RecentOrders } from "./recent-orders"
import { BusinessSupport } from "./business-support"
import { OrderTrendChart } from "./order-trend-chart"
import { VendorAds } from "./vendor-ads"

export const VendorDashboardContent = () => {
    return (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
            <div className="grid gap-6 content-start lg:col-span-8">
                <TopCards className="lg:col-span-8" />
                <VendorAds />
                <OrderTrendChart className="lg:col-span-8" />
                <RecentOrders className="lg:col-span-8" />
            </div>
            <div className="grid gap-6 content-start lg:col-span-4">
                <PlanCard className="lg:col-span-4 h-fit" />
                <YourMenu className="lg:col-span-4 h-fit" />
                <BusinessSupport className="lg:col-span-4 h-fit" />
            </div>
        </div>
    )
}