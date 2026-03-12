import { Badge } from "@/components/ui/badge"
import { IconDot } from "@/components/icons/icon-dot"
import { Separator } from "@/components/ui/separator"
import { IconBowlSteam, IconCyclist, IconMapPinLine, IconTrip, IconUser } from "@/components/icons"

type Props = {
    view: () => void;
}

export const OrderCard = ({ view }: Props) => {
    return (
        <div onClick={view} className="flex items-start p-3 gap-3 sm:gap-4 rounded-lg inset-ring-1 inset-ring-outline cursor-pointer">
            <div className="rounded-full overflow-hidden size-13 sm:size-24.5 bg-orange-1 outline -outline-offset-1 outline-white/10">
                <img src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="food" className="object-cover size-24.5" />
            </div>
            <div className="grid gap-2.5 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="grid gap-2 sm:gap-1">
                        <span className="font-semibold text-sm text-grey-dark-0">Jollof Rice & Plantain</span>
                        <div className="flex items-center flex-wrap gap-4 sm:gap-6">
                            <div className="flex items-center gap-1 text-xs text-grey-dark-3 [&>svg]:text-grey-dark-0 [&>svg]:size-3.5">
                                <IconBowlSteam />
                                2 Plates
                            </div>
                            <div className="flex items-center gap-1 text-xs text-grey-dark-3 [&>svg]:text-grey-dark-0 [&>svg]:size-3.5">
                                <IconCyclist />
                                23rd Feb, 2024
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between sm:flex-col gap-1">
                        <span className="font-semibold text-sm text-grey-dark-2 text-right">$34.34</span>
                        <Badge variant="pending" className="[&>svg]:size-1.5!"><IconDot /> Pending</Badge>
                    </div>
                </div>
                <Separator className="hidden sm:block" />
                <div className="hidden sm:flex flex-col gap-2 flex-1">
                    <div className="flex items-center justify-between flex-1">
                        <div className="flex items-center gap-1 text-xs font-medium text-grey-dark-2 [&>svg]:text-grey-dark-0 [&>svg]:size-3.5">
                            <IconUser />
                            James Andrew
                        </div>
                        <div className="flex items-center gap-1 text-xs text-grey-dark-3 [&>svg]:text-grey-dark-0 [&>svg]:size-3.5">
                            <IconTrip />
                            112km
                        </div>
                    </div>
                    <div className="flex items-start gap-1 text-xs text-grey-dark-3 [&>svg]:size-3.5 [&>svg]:text-grey-dark-0">
                        <IconMapPinLine />
                        4517 Washington Ave. Manchester, Kentucky 39495
                    </div>
                </div>
            </div>
        </div>
    )
}