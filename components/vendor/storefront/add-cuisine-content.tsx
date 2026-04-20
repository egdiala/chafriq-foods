"use client";

import Link from "next/link";
import { toast } from "sonner";
import { cn, normalizeDecimalInput } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form-nextjs";
import { createMenuFormSchema } from "@/validations/menu";
import { IconCloudArrowUp, IconTrashSimple } from "@/components/icons";
import { Activity, useEffect, useMemo, useRef, useState } from "react";
import { useGetAllergies } from "@/services/queries/use-explore";
import { useCreateMenu, useUploadMenuMedia } from "@/services/mutations/use-menu";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxTrigger, ComboboxValue } from "@/components/ui/combobox";
import { useUser } from "@/context/use-user";

const MAX_FILES = 5;

export const VendorAddCuisineContent = () => {
    const router = useRouter()
    const { user: userObj } = useUser()
    const user = userObj as VendorProfileResponse;
    const { data, isLoading } = useGetAllergies()
    const [cuisineImages, setCuisineImages] = useState<File[]>([])

    const [searchValue, setSearchValue] = useState('');

    const abortControllerRef = useRef<AbortController | null>(null);

    const isMaxReached = cuisineImages.length >= MAX_FILES;

    const addCuisineForm = useForm({
        defaultValues: {
            menu_name: "",
            menu_content: "",
            menu_amount: "",
            cooking_hour: "",
            quantity_size: "",
            quantity_unit: "",
            min_order: "",
            additional_note: "",
            allegen_note: "",
            allegen_list: [] as string[],
            allegen_trace: [] as string[],
            dish_list: [] as string[]
        },
        validators: {
            onSubmit: createMenuFormSchema
        },
        onSubmit: async ({ value }) => {
            if (isPending || isUploadingMedia) return;
            mutate(value)
        },
    })

    const { mutate: uploadMedia, isPending: isUploadingMedia } = useUploadMenuMedia((res) => {
        router.push("/vendor/storefront")
    })
    const { mutate, isPending } = useCreateMenu(async (response) => {
        const formData = new FormData();

        cuisineImages.forEach((file) => {
            formData.append("file", file);
        });

        uploadMedia({ menuId: response?.menu_id, formData })
    })

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        const incoming = Array.from(files);

        setCuisineImages((prev) => {
            if (prev.length >= MAX_FILES) {
                toast.error(`Maximum of ${MAX_FILES} files allowed`);
                return prev;
            }

            const validFiles = incoming.filter((file) => {
                const isImage = (file.type === "image/png" || file.type === "image/jpeg") && file.size <= 2 * 1024 * 1024;

                const isVideo = file.type === "video/mp4" && file.size <= 10 * 1024 * 1024;

                const isDuplicate = prev.some((f) => f.name === file.name && f.size === file.size);

                return (isImage || isVideo) && !isDuplicate;
            });

            if (validFiles.length === 0) {
                toast.error("Only PNG, JPEG (≤2MB) or MP4 (≤10MB) allowed");
                return prev;
            }

            const remainingSlots = MAX_FILES - prev.length;

            if (validFiles.length > remainingSlots) {
                toast.error(`You can only add ${remainingSlots} more file(s)`);
            }

            const filesToAdd = validFiles.slice(0, remainingSlots);

            return [...prev, ...filesToAdd];
        });
    }

    const removeImage = (index: number) => {
        setCuisineImages((prev) => prev.filter((_, i) => i !== index));
    }

    const previews = useMemo(() => {
        return cuisineImages.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
    }, [cuisineImages]);

    useEffect(() => {
        return () => {
            previews.forEach((p) => URL.revokeObjectURL(p.url));
        };
    }, [previews]);
    
    return (
        <>
            <div className="text-center space-y-2 mx-auto">
                <h1 className="font-sora text-grey-dark-0 font-extrabold text-lg md:text-2xl">Add Cuisine</h1>
                <p className="text-grey-dark-3 font-normal text-xs">Add a new dish to your menu by filling in the details below. Make sure to include clear information and an appealing description to attract customers.</p>
            </div>

            <form className="flex flex-col gap-12.5 mx-auto" onSubmit={(e) => {
                e.preventDefault()
                addCuisineForm.handleSubmit()
            }}>
                <FieldSet>
                    <FieldLegend>Cuisine Information</FieldLegend>
                    <FieldGroup>
                        <addCuisineForm.Field name="menu_name">
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
                            <addCuisineForm.Field name="quantity_size">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Quantity / Size</FieldLabel>
                                            <Input
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                aria-invalid={isInvalid}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => {
                                                    const raw = e.target.value.match(/^\d+/)?.[0] || "";
                                                    const normalized = raw === "" ? "" : raw === "0" ? "0" : raw.replace(/^0+/, "");
                                                    field.handleChange(normalized)
                                                }}
                                            />
                                            {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                        </Field>
                                    )
                                }}
                            </addCuisineForm.Field>
                            <addCuisineForm.Field name="quantity_unit">
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
                            <addCuisineForm.Field name="min_order">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Minimum Order Size (optional)</FieldLabel>
                                            <Input
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                aria-invalid={isInvalid}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => {
                                                    const raw = e.target.value.match(/^\d+/)?.[0] || "";
                                                    const normalized = raw === "" ? "" : raw === "0" ? "0" : raw.replace(/^0+/, "");
                                                    field.handleChange(normalized)
                                                }}
                                            />
                                            {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                        </Field>
                                    )
                                }}
                            </addCuisineForm.Field>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <addCuisineForm.Field name="menu_content">
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
                            <addCuisineForm.Field name="dish_list">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Type of Cuisine</FieldLabel>
                                            <Combobox
                                                multiple
                                                items={user?.dish_data || []}
                                                value={field.state.value}
                                                autoHighlight
                                                itemToStringLabel={(dish: string) => dish}
                                                onValueChange={(value) => {
                                                    field.handleChange(value);
                                                }}
                                                onInputValueChange={(nextSearchValue, { reason }) => {
                                                    setSearchValue(nextSearchValue);

                                                    const controller = new AbortController();
                                                    abortControllerRef.current?.abort();
                                                    abortControllerRef.current = controller;

                                                    if (nextSearchValue === '') {
                                                        return;
                                                    }

                                                    if (reason === 'item-press') {
                                                        return;
                                                    }

                                                    if (controller.signal.aborted) {
                                                        return;
                                                    }
                                                }}
                                            >
                                            <ComboboxTrigger render={
                                                <button type="button" className="h-12 text-left bg-input-field w-full rounded px-3 py-1 text-sm text-grey-dark-0 transition-colors inset-ring-1 inset-ring-outline data-popup-open:inset-ring-orange-2 data-popup-open:bg-orange-5 active:scale-99">
                                                    <ComboboxValue
                                                        placeholder={
                                                        <span className="text-left">
                                                            Select a cuisine
                                                        </span>
                                                        }
                                                    >
                                                        {(item: string[]) => (
                                                        <>
                                                            {item.length === 0 ? (
                                                            <span className="text-contrast-low">
                                                                Select a cuisine
                                                            </span>
                                                            ) : item.length > 1 ? (
                                                            <span className="line-clamp-1 text-ellipsis">{item.map((itm) => {
                                                                return user?.dish_data?.find((dishItm) => dishItm.dish_type_id === itm)?.name
                                                            }).join(", ")}</span>
                                                            ) : (
                                                            <span className="line-clamp-1 text-ellipsis">{user?.dish_data?.find((itm) => itm.dish_type_id === item[0])?.name}</span>
                                                            )}
                                                        </>
                                                        )}
                                                    </ComboboxValue>
                                                </button>
                                            } />
                                            <ComboboxContent className="max-w-(--anchor-width)! min-w-(--anchor-width)!">
                                                <ComboboxEmpty>No data found</ComboboxEmpty>
                                                <ComboboxList>
                                                {(dish) => (
                                                    <ComboboxItem key={dish.dish_type_id} value={dish.dish_type_id}>
                                                    {dish.name}
                                                    </ComboboxItem>
                                                )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                            </Combobox>
                                            {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                        </Field>
                                    )
                                }}
                            </addCuisineForm.Field>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <addCuisineForm.Field name="cooking_hour">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Total Number of Hours to complete the minimum quantity. </FieldLabel>
                                            <Input
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                inputMode="decimal"
                                                pattern="^\d*\.?\d*$"
                                                aria-invalid={isInvalid}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => {
                                                    const normalized = normalizeDecimalInput(e.target.value)
                                                    field.handleChange(normalized)
                                                }}
                                            />
                                            {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                        </Field>
                                    )
                                }}
                            </addCuisineForm.Field>
                            <addCuisineForm.Field name="menu_amount">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
                                            <Input
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                inputMode="decimal"
                                                pattern="^\d*\.?\d*$"
                                                aria-invalid={isInvalid}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => {
                                                    const normalized = normalizeDecimalInput(e.target.value)
                                                    field.handleChange(normalized)
                                                }}
                                            />
                                            {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                        </Field>
                                    )
                                }}
                            </addCuisineForm.Field>
                        </div>
                        
                        <addCuisineForm.Field name="additional_note">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Additional note for customers (optional)</FieldLabel>
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

                <Activity mode={isLoading ? "hidden" : "visible"}>
                    <FieldSet>
                        <FieldLegend>Allergy Information</FieldLegend>
                        <FieldGroup>
                            <addCuisineForm.Field name="allegen_list" mode="array">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <div className="grid gap-2">
                                        <span className="text-xs text-grey-dark-0">Select allergens that are ingredients in this cuisine (optional)</span>
                                        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap"> 
                                            {data?.data?.map((item, i) => {
                                                return (
                                                    <addCuisineForm.Field key={i} name={`allegen_list[${i}]`}>
                                                        {(subField) => {
                                                            const values = field.state.value
                                                            const isSelected = values?.includes(item.allergy_id.toLowerCase())
                                                            return (
                                                                <button type="button" className={cn("capitalize active:scale-98 inline-flex text-xs rounded-full px-3 py-1 inset-ring-1", isSelected ? "bg-orange-5 text-orange-2 inset-ring-orange-2" : "inset-ring-grey-dark-4 bg-grey-dark-4 text-grey-dark-2")} onClick={() => isSelected ? field.removeValue(values.indexOf(item.allergy_id)) : field.pushValue(item.allergy_id)}>
                                                                    {item.name}
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

                            <addCuisineForm.Field name="allegen_trace" mode="array">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <div className="grid gap-2">
                                        <span className="text-xs text-grey-dark-0">May contain traces, cross-contamination possible (optional)</span>
                                        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap"> 
                                            {data?.data?.map((item, i) => {
                                                return (
                                                    <addCuisineForm.Field key={i} name={`allegen_trace[${i}]`}>
                                                        {(subField) => {
                                                            const values = field.state.value
                                                            const isSelected = values?.includes(item.allergy_id.toLowerCase())
                                                            return (
                                                                <button type="button" className={cn("capitalize active:scale-98 inline-flex text-xs rounded-full px-3 py-1 inset-ring-1", isSelected ? "bg-orange-5 text-orange-2 inset-ring-orange-2" : "inset-ring-grey-dark-4 bg-grey-dark-4 text-grey-dark-2")} onClick={() => isSelected ? field.removeValue(values.indexOf(item.allergy_id)) : field.pushValue(item.allergy_id)}>
                                                                    {item.name}
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

                            <addCuisineForm.Field name="allegen_note">
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
                </Activity>

                <FieldSet>
                    <FieldLegend>CUISINE IMAGES</FieldLegend>
                    <FieldGroup className="gap-2">
                        <span className="text-xs text-grey-dark-0">{cuisineImages.length}/{MAX_FILES} files</span>
                        <div className="grid gap-8">
                            <label htmlFor="cuisineImages" className={cn("py-13 rounded-lg border border-dashed border-grey-dark-3 bg-grey-dark-4", isMaxReached ? "opacity-50 cursor-not-allowed" : "cursor-pointer")}>
                                <input
                                    id="cuisineImages"
                                    name="cuisineImages"
                                    type="file"
                                    accept="image/png, image/jpeg, video/mp4"
                                    onChange={(e) => handleFiles(e.target.files)}
                                    multiple hidden
                                    disabled={isMaxReached}
                                />
                                <div className="flex flex-col items-center gap-1">
                                    <IconCloudArrowUp className="text-orange-2" />
                                    <p className="font-medium text-xs text-grey-dark-3">Drag and drop your photo here, or <span className="text-orange-2 underline">Click Here</span></p>
                                    <p className="text-xs text-grey-dark-3">JPG or PNG only. Max size: 5 MB</p>
                                </div>
                            </label>
                            <div className="flex items-center gap-4 flex-wrap"> 
                                {previews?.map(({ file, url }, i) => {
                                    return (
                                        <div key={i} className="relative size-24 overflow-hidden rounded-lg">
                                            <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 bg-white grid place-content-center rounded-xs size-3 z-20">
                                                <IconTrashSimple className="size-2 text-orange-2" />
                                            </button>
                                            <div className="pointer-events-none after:absolute after:inset-0 after:bg-red-1/36 absolute inset-0 z-10 flex h-full w-full items-center justify-center">
                                                {file.type.startsWith("video/") ? (
                                                    <video src={url} className="size-24 object-cover rounded-lg" />
                                                ) : (
                                                    <img src={url} className="size-24 object-cover rounded-lg" alt={file.name} />
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </FieldGroup>
                </FieldSet>

                <div className="flex items-center gap-4 *:flex-1 sm:max-w-2/3 mx-auto w-full">
                    <Button variant="secondary" type="button" asChild>
                        <Link href="/vendor/storefront">Cancel</Link>
                    </Button>
                                
                    <addCuisineForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => {
                            return (
                                <Button type="submit" disabled={!canSubmit || isPending || isUploadingMedia}>
                                    Add Cuisine
                                    {(isPending || isSubmitting || isUploadingMedia) && (<Spinner className="absolute right-4 size-5" />)}
                                </Button>
                            )
                        }}
                    </addCuisineForm.Subscribe>
                </div>
            </form>
        </>
    )
}