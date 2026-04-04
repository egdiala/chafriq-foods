import { OrderTrendChart } from "../dashboard/order-trend-chart";
import { EarningsTrendChart } from "./earnings-trend";
import { TopCards } from "./top-cards";

export const VendorReportingContent = () => {
    return (
        <div className="flex flex-col gap-6">
            <TopCards />
            <div className="grid md:grid-cols-2 gap-6">
                <OrderTrendChart />
                <EarningsTrendChart />
            </div>
        </div>
    )
}