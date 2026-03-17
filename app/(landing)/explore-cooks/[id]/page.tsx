import { SeeOtherCooks } from "@/components/explore-cooks/see-other-cooks";
import { CookStorefront } from "@/components/explore-cooks/cook-storefront";
import { SingleCookHero } from "@/components/explore-cooks/single-cook-hero";

export default function ExploreSingleCookPage() {
    return (
        <>
            <SingleCookHero />
            <CookStorefront />
            <SeeOtherCooks />
        </>
    );
}