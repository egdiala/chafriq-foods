import { IconArrowDown, IconTriangleWarning } from "@/components/icons";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
}

export const DocumentsNotice = ({ className }: Props) => {
    return (
        <div className={cn("flex items-start gap-2 rounded-lg p-3 cursor-pointer inset-ring-1 inset-ring-orange-2 bg-orange-5 transition-all duration-200 ease-in", className)}>
            <div className="grid place-content-center-safe rounded-xl overflow-hidden size-8 bg-white">
                <IconTriangleWarning className="text-orange-2 size-4" />
            </div>
            <div className="flex items-center gap-2 flex-1 [&>svg]:text-orange-2">
                <div className="grid gap-px flex-1">
                    <span className="font-medium text-xs text-grey-dark-2 flex-1">You’re almost ready 🎉</span>
                    <p className="text-xs text-grey-dark-3">Finish setting up your account by uploading your verification documents. Once approved, you’ll be able to start selling and receiving orders.</p>
                </div>
                <IconArrowDown className="-rotate-90" />
            </div>
        </div>
    )
}