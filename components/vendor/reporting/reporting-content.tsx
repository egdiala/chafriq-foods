import { TopCards } from "./top-cards";
import { AveragePrepTime } from "./average-prep-time";
import { EarningsTrendChart } from "./earnings-trend";
import { TopSellingMeals } from "./top-selling-meals";
import { OrderFulfillmentRate } from "./order-fulfillment-rate";
import { OrderTrendChart } from "../dashboard/order-trend-chart";

export const VendorReportingContent = () => {
    return (
        <div className="flex flex-col gap-6">
            <TopCards />
            <div className="grid md:grid-cols-2 gap-6">
                <OrderTrendChart />
                <EarningsTrendChart />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                <TopSellingMeals />
                <OrderFulfillmentRate />
                <AveragePrepTime />
            </div>
        </div>
    )
}