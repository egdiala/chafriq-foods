import { cn } from "@/lib/utils";
import { IconCheckmark, IconTriangleWarning } from "../icons"

type Props = {
    status: KycStatus | undefined;
}

export const KycStatusBadge = ({ status }: Props) => {
    if (status === undefined) {
        return null;
    }

    return (
        <div className={cn("flex items-center gap-1 text-xs h-5 px-2 w-fit rounded-full", status === 1 ? "bg-success-light text-success" : "bg-red-2/5 text-red-2")}>
            {status === 1 ? <IconCheckmark /> : <IconTriangleWarning />}
            <span className="line-clamp-1">{status === 1 ? "ID Verified" : "Not Verified"}</span>
        </div>
    )
}