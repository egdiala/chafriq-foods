import { SeeOtherCooks } from "@/components/explore-cooks/see-other-cooks";
import { CookStorefront } from "@/components/explore-cooks/cook-storefront";
import { SingleCookHero } from "@/components/explore-cooks/single-cook-hero";

export default async function ExploreSingleCookPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <>
            <SingleCookHero cookId={id} />
            <CookStorefront cookId={id} />
            <SeeOtherCooks />
        </>
    );
}