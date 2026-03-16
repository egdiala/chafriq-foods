"use client";

import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form-nextjs"
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { IconCloudArrowUp, IconTrashSimple } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MAIN_ALLERGIES = ["peanuts", "tree nuts", "milk (dairy)", "egg", "wheat/grain", "soy", "fish", "shellfish", "sesame"]

export const VendorAddCuisineContent = () => {

    const addCuisineForm = useForm({
        defaultValues: {
            name: "",
            quantity: "",
            unit: "",
            minimumOrderSize: "",
            content: "",
            duration: "",
            amount: "",
            note: "",
            allergyNotes: "",
            allergies: [] as string[],
            contaminations: [] as string[],
            cuisineImages: [] as File[]
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

        validImages.forEach((img) => addCuisineForm.pushFieldValue("cuisineImages", img))
    }

    const removeImage = (index: number) => {
        addCuisineForm.removeFieldValue("cuisineImages", index)
    }
    
    return (
        <>
            <div className="text-center space-y-2 mx-auto">
                <h1 className="font-sora text-grey-dark-0 font-extrabold text-lg md:text-2xl">Add Cuisine</h1>
                <p className="text-grey-dark-3 font-normal text-xs">Lorem ipsum dolor sit amet consectetur. Pharetra vitae tristique volutpat sed augue augue viverra orci lectus. Diam diam ut ac at leo convallis.</p>
            </div>

            <form className="flex flex-col gap-12.5 mx-auto" onSubmit={(e) => {
                e.preventDefault()
                addCuisineForm.handleSubmit()
            }}>
                <FieldSet>
                    <FieldLegend>Cuisine Info</FieldLegend>
                    <FieldGroup>
                        <addCuisineForm.Field name="name">
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
                        </addCuisineForm.Field>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <addCuisineForm.Field name="quantity">
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
                            </addCuisineForm.Field>
                            <addCuisineForm.Field name="unit">
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
                            </addCuisineForm.Field>
                            <addCuisineForm.Field name="minimumOrderSize">
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
                            </addCuisineForm.Field>
                        </div>

                        <addCuisineForm.Field name="content">
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
                        </addCuisineForm.Field>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <addCuisineForm.Field name="duration">
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
                            </addCuisineForm.Field>
                            <addCuisineForm.Field name="amount">
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
                            </addCuisineForm.Field>
                        </div>
                        
                        <addCuisineForm.Field name="note">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Additional note for customers</FieldLabel>
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
                        </addCuisineForm.Field>
                    </FieldGroup>
                </FieldSet>

                <FieldSet>
                    <FieldLegend>Allergy Information</FieldLegend>
                    <FieldGroup>
                        <addCuisineForm.Field name="allergies" mode="array">
                        {(field) => {
                            const isInvalid = !field.state.meta.isValid
                            return (
                                <div className="grid gap-2">
                                    <span className="text-xs text-grey-dark-0">Select allergens that are ingredients in this cuisine</span>
                                    <div className="flex items-center gap-4 flex-wrap"> 
                                        {MAIN_ALLERGIES.map((item, i) => {
                                            return (
                                                <addCuisineForm.Field key={i} name={`allergies[${i}]`}>
                                                    {(subField) => {
                                                        const values = field.state.value
                                                        const isSelected = values?.includes(item.toLowerCase())
                                                        return (
                                                            <button type="button" className={cn("capitalize active:scale-98 inline-flex text-xs rounded-full px-3 py-1 inset-ring-1", isSelected ? "bg-orange-5 text-orange-2 inset-ring-orange-2" : "inset-ring-grey-dark-4 bg-grey-dark-4 text-grey-dark-2")} onClick={() => isSelected ? field.removeValue(values.indexOf(item)) : field.pushValue(item)}>
                                                                {item}
                                                            </button>
                                                        )
                                                    }}
                                                </addCuisineForm.Field>
                                            )
                                        })}
                                    </div>
                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                </div>
                            )
                        }}
                        </addCuisineForm.Field>

                        <addCuisineForm.Field name="contaminations" mode="array">
                        {(field) => {
                            const isInvalid = !field.state.meta.isValid
                            return (
                                <div className="grid gap-2">
                                    <span className="text-xs text-grey-dark-0">May contain traces (cross-contamination possible)</span>
                                    <div className="flex items-center gap-4 flex-wrap"> 
                                        {MAIN_ALLERGIES.map((item, i) => {
                                            return (
                                                <addCuisineForm.Field key={i} name={`contaminations[${i}]`}>
                                                    {(subField) => {
                                                        const values = field.state.value
                                                        const isSelected = values?.includes(item.toLowerCase())
                                                        return (
                                                            <button type="button" className={cn("capitalize active:scale-98 inline-flex text-xs rounded-full px-3 py-1 inset-ring-1", isSelected ? "bg-orange-5 text-orange-2 inset-ring-orange-2" : "inset-ring-grey-dark-4 bg-grey-dark-4 text-grey-dark-2")} onClick={() => isSelected ? field.removeValue(values.indexOf(item)) : field.pushValue(item)}>
                                                                {item}
                                                            </button>
                                                        )
                                                    }}
                                                </addCuisineForm.Field>
                                            )
                                        })}
                                    </div>
                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                </div>
                            )
                        }}
                        </addCuisineForm.Field>

                        <addCuisineForm.Field name="allergyNotes">
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
                        </addCuisineForm.Field>
                    </FieldGroup>
                </FieldSet>

                <FieldSet>
                    <FieldLegend>CUISINE IMAGES</FieldLegend>
                    <FieldGroup>

                        <addCuisineForm.Field name="cuisineImages" mode="array">
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
                                            return (
                                                <addCuisineForm.Field key={i} name={`cuisineImages[${i}]`}>
                                                    {(subField) => {
                                                        return (
                                                            <div key={i} className="relative h-12 overflow-hidden rounded-lg">
                                                                <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 bg-white grid place-content-center rounded-xs size-3">
                                                                    <IconTrashSimple className="size-2 text-orange-2" />
                                                                </button>
                                                                <div className="pointer-events-none after:absolute after:inset-0 after:bg-red-1/36 absolute inset-0 -z-10 flex h-full w-full items-center justify-center">
                                                                    <img
                                                                        src={URL.createObjectURL(file)}
                                                                        className="h-12 w-full object-cover rounded-lg"
                                                                        alt={`image-${i}`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    }}
                                                </addCuisineForm.Field>
                                            )
                                        })}
                                    </div>
                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                </div>
                            )
                        }}
                        </addCuisineForm.Field>
                    </FieldGroup>
                </FieldSet>
                                
                <addCuisineForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                    {([canSubmit, isSubmitting]) => {
                        return (
                            <div className="flex items-center gap-4 *:flex-1 max-w-2/3 mx-auto w-full">
                                <Button variant="secondary" type="button" asChild>
                                    <Link href="/vendor/storefront">Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={!canSubmit}>
                                    Add Cuisine
                                </Button>
                            </div>
                        )
                    }}
                </addCuisineForm.Subscribe>

            </form>
        </>
    )
}