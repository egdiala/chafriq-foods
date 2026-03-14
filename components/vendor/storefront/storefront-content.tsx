
import { Menu } from "./menu"
import { StoreCard } from "./store-card"
import { AvailabilityCard } from "./availability-card"

export const VendorStorefrontContent = () => {
    return (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
            <div className="grid gap-6 content-start lg:col-span-8">
                <StoreCard className="lg:col-span-8" />
                <Menu className="lg:col-span-8" />
            </div>
            <div className="grid gap-6 content-start lg:col-span-4">
                <AvailabilityCard className="lg:col-span-4 h-fit" />
            </div>
        </div>
    )
}