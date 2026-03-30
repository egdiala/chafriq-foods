import { CuisineDetails } from "@/components/explore-cuisines/cuisine-details";
import { SeeOtherCuisines } from "@/components/explore-cuisines/see-other-cuisines";

export default async function ExploreSingleCookPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <>
            <CuisineDetails mealId={id} />
            <SeeOtherCuisines />
        </>
    );
}