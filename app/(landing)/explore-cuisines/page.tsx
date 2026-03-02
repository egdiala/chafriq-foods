import { Faq } from "@/components/landing/faq";
import { DownloadOurApp } from "@/components/landing/download-our-app";
import { ExploreCuisinesHero } from "@/components/explore-cuisines/hero";
import { EarnOnYourTerms } from "@/components/landing/earn-on-your-terms";
import { ExploreCuisinesStepsAway } from "@/components/explore-cuisines/steps-away";

export default function ExploreCuisinesPage() {
    return (
        <>
            <ExploreCuisinesHero />
            <ExploreCuisinesStepsAway />
            <EarnOnYourTerms />
            <DownloadOurApp />
            <Faq />
        </>
    );
}