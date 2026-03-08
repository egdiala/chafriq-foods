import { PlanCard } from "./plan-card"
import { TopCards } from "./top-cards"
import { YourMenu } from "./your-menu"
import { RecentOrders } from "./recent-orders"
import { BusinessSupport } from "./business-support"
import { OrderTrendChart } from "./order-trend-chart"

export const VendorDashboardContent = () => {
    return (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
            <div className="grid gap-6 content-start lg:col-span-8">
                <TopCards className="lg:col-span-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 lg:col-span-8">
                    <div className="rounded-xl bg-grey-dark-4 font-medium text-lg text-outline text-center grid place-content-center-safe h-25">Ads</div>
                    <div className="rounded-xl bg-grey-dark-4 font-medium text-lg text-outline text-center grid place-content-center-safe h-25">Ads</div>
                </div>
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