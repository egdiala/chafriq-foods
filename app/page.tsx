import { Faq } from "@/components/landing/faq";
import { Hero } from "@/components/landing/hero";
import { Footer } from "@/components/landing/footer";
import { StepsAway } from "@/components/landing/steps-away";
import { DownloadOurApp } from "@/components/landing/download-our-app";
import { EarnOnYourTerms } from "@/components/landing/earn-on-your-terms";
import { QualityYouCanTrust } from "@/components/landing/quality-you-can-trust";

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