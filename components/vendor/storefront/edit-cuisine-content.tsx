"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form-nextjs";
import { useGetSingleMenu } from "@/services/queries/use-menu";
import { IconCloudArrowUp, IconTrashSimple } from "@/components/icons";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { useGetAllergies } from "@/services/queries/use-explore";

type Props = {
    cuisineId: string;
}

export const VendorEditCuisineContent = ({ cuisineId }: Props) => {
    const { data, isLoading } = useGetSingleMenu(cuisineId)
    const { data: allergies, isLoading: isLoadingAllergies } = useGetAllergies()

    const editCuisineForm = useForm({
        defaultValues: {
            menu_name: data?.data?.menu_name || "",
            quantity_size: data?.data?.quantity_size || "",
            quantity_unit: data?.data?.quantity_unit || "",
            min_order: data?.data?.min_order || "",
            menu_content: data?.data?.menu_content || "",
            cooking_hour: data?.data?.cooking_hour || "",
            menu_amount: data?.data?.menu_amount || "",
            additional_note: data?.data?.additional_note || "",
            allegen_note: data?.data?.allegen_note || "",
            allegen_list: data?.data.allegen_list?.map((item) => item.allegen_id) || [] as string[],
            allegen_trace: data?.data.allegen_trace?.map((item) => item.allegen_id) || [] as string[],
            cuisineImages: [] as File[],
            dish_list: data?.data.dish_list || [] as string[]
        },
        validators: {
            // onSubmit: loginFormSchema
        },
        onSubmit: async ({ value }) => {
            console.log(value)
        },
    })

    const handleFiles = (files: FileList | null) => {
        if (!files) return

        const validImages = Array.from(files).filter((file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024)

        validImages.forEach((img) => {
            return editCuisineForm.pushFieldValue("cuisineImages", img)
        })
    }

    const removeImage = (index: number) => {
        editCuisineForm.removeFieldValue("cuisineImages", index)
    }
    
    return (
        <>
            {
                (isLoading || isLoadingAllergies) ? (
                    <div className="flex flex-col justify-center h-dvh">
                        <Spinner className="size-5 mx-auto" />
                    </div>
                ) : (
                    <>
                        <div className="text-center space-y-2 mx-auto">
                            <h1 className="font-sora text-grey-dark-0 font-extrabold text-lg md:text-2xl">Edit Cuisine</h1>
                            <p className="text-grey-dark-3 font-normal text-xs">Lorem ipsum dolor sit amet consectetur. Pharetra vitae tristique volutpat sed augue augue viverra orci lectus. Diam diam ut ac at leo convallis.</p>
                        </div>

                        <form className="flex flex-col gap-12.5 mx-auto" onSubmit={(e) => {
                            e.preventDefault()
                            editCuisineForm.handleSubmit()
                        }}>
                            <FieldSet>
                                <FieldLegend>Cuisine Info</FieldLegend>
                                <FieldGroup>
                                    <editCuisineForm.Field name="menu_name">
                                        {(field) => {
                                            const isInvalid = !field.state.meta.isValid
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Cuisine Name</FieldLabel>
                                                    <Input
                                                        type="text"
                                                        id={field.name}
                                                        name={field.name}
                                                        aria-invalid={isInvalid}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                    />
                                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                                </Field>
                                            )
                                        }}
                                    </editCuisineForm.Field>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <editCuisineForm.Field name="quantity_size">
                                            {(field) => {
                                                const isInvalid = !field.state.meta.isValid
                                                return (
                                                    <Field data-invalid={isInvalid}>
                                                        <FieldLabel htmlFor={field.name}>Quantity / Size</FieldLabel>
                                                        <Input
                                                            type="text"
                                                            id={field.name}
                                                            name={field.name}
                                                            aria-invalid={isInvalid}
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                        />
                                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                                    </Field>
                                                )
                                            }}
                                        </editCuisineForm.Field>
                                        <editCuisineForm.Field name="quantity_unit">
                                            {(field) => {
                                                const isInvalid = !field.state.meta.isValid
                                                return (
                                                    <Field data-invalid={isInvalid}>
                                                        <FieldLabel htmlFor={field.name}>Unit</FieldLabel>
                                                        <Input
                                                            type="text"
                                                            id={field.name}
                                                            name={field.name}
                                                            aria-invalid={isInvalid}
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                        />
                                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                                    </Field>
                                                )
                                            }}
                                        </editCuisineForm.Field>
                                        <editCuisineForm.Field name="min_order">
                                            {(field) => {
                                                const isInvalid = !field.state.meta.isValid
                                                return (
                                                    <Field data-invalid={isInvalid}>
                                                        <FieldLabel htmlFor={field.name}>Minimum Order Size</FieldLabel>
                                                        <Input
                                                            type="text"
                                                            id={field.name}
                                                            name={field.name}
                                                            aria-invalid={isInvalid}
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                        />
                                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                                    </Field>
                                                )
                                            }}
                                        </editCuisineForm.Field>
                                    </div>

                                    <editCuisineForm.Field name="menu_content">
                                        {(field) => {
                                            const isInvalid = !field.state.meta.isValid
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Content of the Cuisine</FieldLabel>
                                                    <Input
                                                        type="text"
                                                        id={field.name}
                                                        name={field.name}
                                                        aria-invalid={isInvalid}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                    />
                                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                                </Field>
                                            )
                                        }}
                                    </editCuisineForm.Field>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <editCuisineForm.Field name="cooking_hour">
                                            {(field) => {
                                                const isInvalid = !field.state.meta.isValid
                                                return (
                                                    <Field data-invalid={isInvalid}>
                                                        <FieldLabel htmlFor={field.name}>Total Number of Hours to complete the minimum quantity. </FieldLabel>
                                                        <Input
                                                            type="text"
                                                            id={field.name}
                                                            name={field.name}
                                                            aria-invalid={isInvalid}
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                        />
                                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                                    </Field>
                                                )
                                            }}
                                        </editCuisineForm.Field>
                                        <editCuisineForm.Field name="menu_amount">
                                            {(field) => {
                                                const isInvalid = !field.state.meta.isValid
                                                return (
                                                    <Field data-invalid={isInvalid}>
                                                        <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
                                                        <Input
                                                            type="text"
                                                            id={field.name}
                                                            name={field.name}
                                                            aria-invalid={isInvalid}
                                                            value={field.state.value}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                        />
                                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                                    </Field>
                                                )
                                            }}
                                        </editCuisineForm.Field>
                                    </div>
                                    
                                    <editCuisineForm.Field name="additional_note">
                                        {(field) => {
                                            const isInvalid = !field.state.meta.isValid
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Additional note for customers</FieldLabel>
                                                    <Textarea
                                                        id={field.name}
                                                        name={field.name}
                                                        aria-invalid={isInvalid}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                    />
                                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                                </Field>
                                            )
                                        }}
                                    </editCuisineForm.Field>
                                </FieldGroup>
                            </FieldSet>

                            <FieldSet>
                                <FieldLegend>Allergy Information</FieldLegend>
                                <FieldGroup>
                                    <editCuisineForm.Field name="allegen_list" mode="array">
                                    {(field) => {
                                        const isInvalid = !field.state.meta.isValid
                                        return (
                                            <div className="grid gap-2">
                                                <span className="text-xs text-grey-dark-0">Select allergens that are ingredients in this cuisine</span>
                                                <div className="flex items-center gap-4 flex-wrap"> 
                                                    {allergies?.data?.map((item, i) => {
                                                        return (
                                                            <editCuisineForm.Field key={i} name={`allegen_list[${i}]`}>
                                                                {(subField) => {
                                                                    const values = field.state.value
                                                                    const isSelected = values?.includes(item.allergy_id.toLowerCase())
                                                                    return (
                                                                        <button type="button" className={cn("capitalize active:scale-98 inline-flex text-xs rounded-full px-3 py-1 inset-ring-1", isSelected ? "bg-orange-5 text-orange-2 inset-ring-orange-2" : "inset-ring-grey-dark-4 bg-grey-dark-4 text-grey-dark-2")} onClick={() => isSelected ? field.removeValue(values.indexOf(item.allergy_id)) : field.pushValue(item.allergy_id)}>
                                                                            {item.name}
                                                                        </button>
                                                                    )
                                                                }}
                                                            </editCuisineForm.Field>
                                                        )
                                                    })}
                                                </div>
                                                {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                            </div>
                                        )
                                    }}
                                    </editCuisineForm.Field>

                                    <editCuisineForm.Field name="allegen_trace" mode="array">
                                    {(field) => {
                                        const isInvalid = !field.state.meta.isValid
                                        return (
                                            <div className="grid gap-2">
                                                <span className="text-xs text-grey-dark-0">May contain traces (cross-contamination possible)</span>
                                                <div className="flex items-center gap-4 flex-wrap"> 
                                                    {allergies?.data?.map((item, i) => {
                                                        return (
                                                            <editCuisineForm.Field key={i} name={`allegen_trace[${i}]`}>
                                                                {(subField) => {
                                                                    const values = field.state.value
                                                                    const isSelected = values?.includes(item.allergy_id.toLowerCase())
                                                                    return (
                                                                        <button type="button" className={cn("capitalize active:scale-98 inline-flex text-xs rounded-full px-3 py-1 inset-ring-1", isSelected ? "bg-orange-5 text-orange-2 inset-ring-orange-2" : "inset-ring-grey-dark-4 bg-grey-dark-4 text-grey-dark-2")} onClick={() => isSelected ? field.removeValue(values.indexOf(item.allergy_id)) : field.pushValue(item.allergy_id)}>
                                                                            {item.name}
                                                                        </button>
                                                                    )
                                                                }}
                                                            </editCuisineForm.Field>
                                                        )
                                                    })}
                                                </div>
                                                {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                            </div>
                                        )
                                    }}
                                    </editCuisineForm.Field>

                                    <editCuisineForm.Field name="allegen_note">
                                        {(field) => {
                                            const isInvalid = !field.state.meta.isValid
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Allergy Notes (optional)</FieldLabel>
                                                    <Textarea
                                                        id={field.name}
                                                        name={field.name}
                                                        aria-invalid={isInvalid}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                    />
                                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                                </Field>
                                            )
                                        }}
                                    </editCuisineForm.Field>
                                </FieldGroup>
                            </FieldSet>

                            <FieldSet>
                                <FieldLegend>CUISINE IMAGES</FieldLegend>
                                <FieldGroup>
                                    <editCuisineForm.Field name="cuisineImages" mode="array">
                                    {(field) => {
                                        const isInvalid = !field.state.meta.isValid
                                        return (
                                            <div className="grid gap-8">
                                                <label htmlFor="cuisineImages" className="py-13 rounded-lg border border-dashed border-grey-dark-3 bg-grey-dark-4">
                                                    <input id="cuisineImages" name="cuisineImages" type="file" accept="image/*" onChange={(e) => handleFiles(e.target.files)} multiple hidden />
                                                    <div className="flex flex-col items-center gap-1">
                                                        <IconCloudArrowUp className="text-orange-2" />
                                                        <p className="font-medium text-xs text-grey-dark-3">Drag and drop your photo here, or <span className="text-orange-2 underline">Click Here</span></p>
                                                        <p className="text-xs text-grey-dark-3">JPG or PNG only. Max size: 5 MB</p>
                                                    </div>
                                                </label>
                                                <div className="flex items-center gap-4 flex-wrap"> 
                                                    {field.state.value?.map((file, i) => {
                                                        const preview = URL.createObjectURL(file)
                                                        return (
                                                            <editCuisineForm.Field key={i} name={`cuisineImages[${i}]`}>
                                                                {() => {
                                                                    return (
                                                                        <div key={i} className="relative size-24 overflow-hidden rounded-lg">
                                                                            <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 bg-white grid place-content-center rounded-xs size-3 z-20">
                                                                                <IconTrashSimple className="size-2 text-orange-2" />
                                                                            </button>
                                                                            <div className="pointer-events-none after:absolute after:inset-0 after:bg-red-1/36 absolute inset-0 z-10 flex h-full w-full items-center justify-center">
                                                                                <img
                                                                                    src={preview}
                                                                                    className="size-24 object-cover rounded-lg"
                                                                                    alt={`image-${i}`}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }}
                                                            </editCuisineForm.Field>
                                                        )
                                                    })}
                                                </div>
                                                {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                            </div>
                                        )
                                    }}
                                    </editCuisineForm.Field>
                                </FieldGroup>
                            </FieldSet>
                                            
                            <editCuisineForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isDirty]}>
                                {([canSubmit, isSubmitting, isDirty]) => {
                                    return (
                                        <div className="flex items-center gap-4 *:flex-1 max-w-2/3 mx-auto w-full">
                                            <Button variant="secondary" type="button" asChild>
                                                <Link href="/vendor/storefront">Cancel</Link>
                                            </Button>
                                            <Button type="submit" disabled={!canSubmit || !isDirty}>
                                                Edit Cuisine
                                            </Button>
                                        </div>
                                    )
                                }}
                            </editCuisineForm.Subscribe>
                        </form>
                    </>
                )
            }
        </>
    )
}