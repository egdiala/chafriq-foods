"use client";

import { useUser } from "@/context/use-user";
import { StepsAway } from "@/components/landing/steps-away";
import { EarnOnYourTerms } from "@/components/landing/earn-on-your-terms";
import { QualityYouCanTrust } from "@/components/landing/quality-you-can-trust";
import { BestSellers } from "./best-sellers";
import { DiscoverFoods } from "./discover-foods";
import { MostOrderedMeals } from "./most-ordered-meals";

export const HomeContent = () => {
    const { type } = useUser()

    if (type === "customer") {
        return (
            <>
                <BestSellers />
                <DiscoverFoods />
                <MostOrderedMeals />
                <EarnOnYourTerms className="bg-orange-5" />
            </>
        );
    }

    return (
        <>
            <StepsAway />
            <EarnOnYourTerms />
            <QualityYouCanTrust />
        </>
    )
}