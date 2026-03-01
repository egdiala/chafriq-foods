import { Faq } from "@/components/landing/faq";
import { Hero } from "@/components/landing/hero";
import { StepsAway } from "@/components/landing/steps-away";
import { DownloadOurApp } from "@/components/landing/download-our-app";
import { EarnOnYourTerms } from "@/components/landing/earn-on-your-terms";
import { QualityYouCanTrust } from "@/components/landing/quality-you-can-trust";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
    return (
        <>
            <Hero />
            <StepsAway />
            <EarnOnYourTerms />
            <QualityYouCanTrust />
            <DownloadOurApp />
            <Faq />
            <Footer />
        </>
    );
}