import { Faq } from "@/components/landing/faq";
import { Hero } from "@/components/landing/hero";
import { DownloadOurApp } from "@/components/landing/download-our-app";
import { HomeContent } from "@/components/landing/home-content";

export default function HomePage() {
    return (
        <>
            <Hero />
            <HomeContent />
            <DownloadOurApp />
            <Faq />
        </>
    );
}