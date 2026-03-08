import { IconArrowDown, IconBookOpenText, IconGavel } from "@/components/icons";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
}

export const BusinessSupport = ({ className }: Props) => {
    const supports = [
        {
            title: "Federal AU small business support",
            description: "Lorem ipsum dolor sit amet consectetur. Nulla a integer sit.",
            icon: <IconGavel className="text-orange-2 size-4" />,
            background: "bg-orange-5 hover:inset-ring-orange-2 [&>svg]:text-orange-2"
        },
        {
            title: "State/Territory resources",
            description: "Grants, eLearning, tax education, compliance",
            icon: <IconBookOpenText className="text-neu size-4" />,
            background: "bg-neu-light hover:inset-ring-neu [&>svg]:text-neu"
        }
    ]
    return (
        <div className={cn("flex flex-col gap-3 p-5 rounded-2xl inset-ring-1 inset-ring-outline", className)}>
            <h2 className="font-semibold text-base text-grey-dark-0">Business Support</h2>
            {
                supports.map((support, index) => (
                    <div key={index} className={cn("flex items-center gap-2 rounded-lg p-3 cursor-pointer inset-ring-1 inset-ring-transparent transition-all duration-200 ease-in", support.background)}>
                        <div className="grid place-content-center-safe rounded-xl overflow-hidden size-8 bg-white">
                            {support.icon}
                        </div>
                        <div className="grid gap-px flex-1">
                            <span className="font-medium text-xs text-grey-dark-2 flex-1">{support.title}</span>
                            <p className="text-xs text-grey-dark-3">{support.description}</p>
                        </div>
                        <IconArrowDown className="-rotate-90" />
                    </div>
                ))
            }
        </div>
    )
}