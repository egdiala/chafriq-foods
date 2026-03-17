import { IconStarFull } from "../icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const RatingsAndReview = () => {
    return (
        <div className="grid gap-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="size-10 sm:size-12 rounded-lg">
                        <AvatarImage src="/quality-2.webp" className="rounded-lg" />
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <h3 className="text-base font-semibold text-grey-dark-0">James O&apos;Sullivan</h3>
                        <div className="flex items-center">
                            <IconStarFull className="text-yellow-2" />
                            <IconStarFull className="text-yellow-2" />
                            <IconStarFull className="text-yellow-2" />
                            <IconStarFull className="text-outline" />
                            <IconStarFull className="text-outline" />
                        </div>
                    </div>
                </div>
                <span className="font-normal text-sm text-grey-dark-2">Jun 10, 2026</span>
            </div>
            <p className="font-normal text-sm text-grey-dark-2">What a delightful surprise! The dish was not only delicious but also arrived right on schedule. The seller was very communicative and friendly. Chafiq is now my go-to for homemade meals!</p>
        </div>
    )
}