import { BusinessSupport } from "../dashboard/business-support"
import { PlanCard } from "../dashboard/plan-card"
import { YourMenu } from "../dashboard/your-menu"
import { Menu } from "./menu"
import { StoreCard } from "./store-card"

export const VendorStorefrontContent = () => {
    return (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
            <div className="grid gap-6 content-start lg:col-span-8">
                <StoreCard className="lg:col-span-8" />
                <Menu className="lg:col-span-8" />
            </div>
            <div className="grid gap-6 content-start lg:col-span-4">
                <PlanCard className="lg:col-span-4 h-fit" />
                <YourMenu className="lg:col-span-4 h-fit" />
                <BusinessSupport className="lg:col-span-4 h-fit" />
            </div>
        </div>
    )
}