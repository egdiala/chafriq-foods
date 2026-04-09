import { format } from "date-fns";
import { IconStarFull } from "../icons"
import { Avatar, AvatarFallback } from "../ui/avatar"

interface Props {
    rating: GetRatingResponse;
}

export const RatingsAndReview = ({ rating }: Props) => {
    return (
        <div className="grid gap-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="size-10 sm:size-12 rounded-lg">
                        <AvatarFallback>{rating.full_name.split(" ")[0][0]}{rating.full_name.split(" ")[1][0]}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <h3 className="text-base font-semibold text-grey-dark-0">{rating.full_name}</h3>
                        <div className="flex items-center">
                            {
                                Array.from({ length: rating.customer_rating_count }).map((_, index) => (
                                    <IconStarFull key={index} className="text-yellow-2" />
                                ))
                            }
                            {
                                Array.from({ length: 5 - rating.customer_rating_count }).map((_, index) => (
                                    <IconStarFull key={index} className="text-outline" />
                                ))
                            }
                        </div>
                    </div>
                </div>
                <span className="font-normal text-sm text-grey-dark-2">{format(rating.customer_rating_at, "MMM dd, yyyy")}</span>
            </div>
            <p className="font-normal text-sm text-grey-dark-2">{rating.customer_rating_comment}</p>
        </div>
    )
}