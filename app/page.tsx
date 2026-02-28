import { Hero } from "@/components/landing/hero";
import { StepsAway } from "@/components/landing/steps-away";
import { EarnOnYourTerms } from "@/components/landing/earn-on-your-terms";
import { QualityYouCanTrust } from "@/components/landing/quality-you-can-trust";

export default function HomePage() {
    return (
        <>
            <Hero />
            <StepsAway />
            <EarnOnYourTerms />
            <QualityYouCanTrust />
        </>
    );
}