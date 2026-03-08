import { cn } from "@/lib/utils";

type Props = {
    className?: string;
}

export const YourMenu = ({ className }: Props) => {
    const foods = [
        {
            title: "Jollof Rice & Plantain",
            description: "Pork, pineapple, and onions on corn tortillas"
        },
        {
            title: "Pasta Primavera",
            description: "Mixed seasonal vegetables and olive oil"
        },
        {
            title: "Beef Stroganoff",
            description: "Tender beef strips in creamy mushroom sauce"
        },
        {
            title: "Vegetable Curry",
            description: "Aromatic spices with mixed vegetables"
        }
    ]
    return (
        <div className={cn("flex flex-col gap-3 p-5 rounded-2xl inset-ring-1 inset-ring-outline", className)}>
            <h2 className="font-semibold text-base text-grey-dark-0">Your Menu</h2>
            {
                foods.map((food, index) => (
                    <div key={index} className="flex items-center gap-2 rounded-lg p-3 inset-ring-1 inset-ring-outline">
                        <div className="rounded-xl overflow-hidden size-9.5">
                            <img src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="food" className="size-14 object-cover object-center" />
                        </div>
                        <div className="grid gap-px flex-1">
                            <div className="flex items-center gap-1">
                                <span className="font-medium text-xs text-grey-dark-2 flex-1">{food.title}</span>
                                <span className="font-medium text-xs text-grey-dark-2 text-right">$12.99/bowl</span>
                            </div>
                            <p className="text-xs text-grey-dark-3">{food.description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}