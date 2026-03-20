import { Faq } from "@/components/landing/faq";
import { ExploreCooksHero } from "@/components/explore-cooks/hero";
import { DownloadOurApp } from "@/components/landing/download-our-app";
import { EarnOnYourTerms } from "@/components/landing/earn-on-your-terms";
import { ExploreCooksStepsAway } from "@/components/explore-cooks/steps-away";

export default function ExploreCooksPage() {
    return (
        <>
            <ExploreCooksHero />
            <ExploreCooksStepsAway />
            <EarnOnYourTerms className="bg-orange-5" />
            <DownloadOurApp />
            <Faq />
        </>
    );
}