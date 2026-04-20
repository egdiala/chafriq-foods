"use client";

import Link from "next/link";
import { cn, normalizeDecimalInput } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form-nextjs";
import { useGetSingleMenu } from "@/services/queries/use-menu";
import { IconCloudArrowUp, IconTrashSimple } from "@/components/icons";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { useGetAllergies } from "@/services/queries/use-explore";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxTrigger, ComboboxValue } from "@/components/ui/combobox";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { DeleteMenuFile } from "./delete-menu-file";
import { useEditMenu, useUploadMenuMedia } from "@/services/mutations/use-menu";
import { useRouter } from "next/navigation";
import { editMenuFormSchema } from "@/validations/menu";
import { useUser } from "@/context/use-user";

type Props = {
    cuisineId: string;
}

const MAX_FILES = 5;

export const VendorEditCuisineContent = ({ cuisineId }: Props) => {
    const router = useRouter()
    const { user: userObj } = useUser()
    const user = userObj as VendorProfileResponse;
    const [openDelete, setOpenDelete] = useState({
        id: "",
        isOpen: false
    })
    const [isDragging, setIsDragging] = useState(false);
    const { data, isLoading } = useGetSingleMenu(cuisineId)
    const [cuisineImages, setCuisineImages] = useState<File[]>([])
    const { data: allergies, isLoading: isLoadingAllergies } = useGetAllergies()

    const [searchValue, setSearchValue] = useState('');

    const abortControllerRef = useRef<AbortController | null>(null);

    const totalFiles = cuisineImages.length + (data?.data?.image_data || [])?.length

    const isMaxReached = totalFiles >= MAX_FILES;

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isMaxReached) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (isMaxReached) return;

        const files = e.dataTransfer.files;
        if (files?.length) handleFiles(files);
    };

    const editCuisineForm = useForm({
        defaultValues: {
            menu_name: data?.data?.menu_name || "",
            quantity_size: data?.data?.quantity_size?.toString() || "",
            quantity_unit: data?.data?.quantity_unit || "",
            min_order: data?.data?.min_order?.toString() || "",
            menu_content: data?.data?.menu_content || "",
            cooking_hour: data?.data?.cooking_hour?.toString() || "",
            menu_amount: data?.data?.menu_amount?.toString() || "",
            additional_note: data?.data?.additional_note || "",
            allegen_note: data?.data?.allegen_note || "",
            allegen_list: data?.data?.allegen_list?.map((item) => item.allegen_id) || [] as string[],
            allegen_trace: data?.data?.allegen_trace?.map((item) => item.allegen_id) || [] as string[],
            dish_list: data?.data?.dish_list?.map((item) => item.dish_type_id) || [] as string[],
            menu_id: data?.data?.menu_id || ""
        },
        validators: {
            onSubmit: editMenuFormSchema
        },
        onSubmit: async ({ value }) => {
            if (isPending || isUploadingMedia) return;
            mutate(value)
        },
    })

    const { mutate: uploadMedia, isPending: isUploadingMedia } = useUploadMenuMedia(() => {
        router.push("/vendor/storefront")
    })

    const { mutate, isPending } = useEditMenu(async (response) => {
        if (cuisineImages.length < 1) {
            router.push("/vendor/storefront")
            return;
        }

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
            if (totalFiles >= MAX_FILES) {
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

            const remainingSlots = MAX_FILES - totalFiles;

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

    const initialImages = useMemo(() => {
        return data?.data?.image_data?.map((item) => ({ url: item.file_url, type: item.mime_type, id: item.image_id })) || []
    }, [data?.data?.image_data])

    const previews = useMemo(() => {
        return cuisineImages.map((file) => ({
            file,
            url: URL.createObjectURL(file),
            type: file.type
        }));
    }, [cuisineImages]);
    
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
                                <FieldLegend>Cuisine Information</FieldLegend>
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
                                        </editCuisineForm.Field>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                                        <editCuisineForm.Field name="dish_list">
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
                                        </editCuisineForm.Field>
                                    </div>
                                    
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
                                <FieldGroup className="gap-2">
                                    <span className="text-xs text-grey-dark-0">{totalFiles}/{MAX_FILES} files</span>
                                    <div className="grid gap-8">
                                        <label 
                                            htmlFor="cuisineImages" 
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            className={cn(
                                                "py-13 rounded-lg border border-dashed border-grey-dark-3 bg-grey-dark-4",
                                                isDragging ? "border-orange-2 bg-orange-2/5" : "border-grey-dark-3",
                                                isMaxReached ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                            )}
                                        >
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
                                            {initialImages?.map(({ id, url, type }, i) => {
                                                return (
                                                    <div key={i} className="relative size-24 overflow-hidden rounded-lg">
                                                        <button type="button" onClick={() => setOpenDelete({ id, isOpen: true})} className="absolute top-2 right-2 bg-white grid place-content-center rounded-xs size-3 z-20">
                                                            <IconTrashSimple className="size-2 text-orange-2" />
                                                        </button>
                                                        <div className="pointer-events-none after:absolute after:inset-0 after:bg-red-1/36 absolute inset-0 z-10 flex h-full w-full items-center justify-center">
                                                            {type.startsWith("video/") ? (
                                                                <video src={url} className="size-24 object-cover rounded-lg" />
                                                            ) : (
                                                                <img src={url} className="size-24 object-cover rounded-lg" alt={`image-${i}`} />
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            {previews?.map(({ file, url, type }, i) => {
                                                return (
                                                    <div key={i} className="relative size-24 overflow-hidden rounded-lg">
                                                        <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 bg-white grid place-content-center rounded-xs size-3 z-20">
                                                            <IconTrashSimple className="size-2 text-orange-2" />
                                                        </button>
                                                        <div className="pointer-events-none after:absolute after:inset-0 after:bg-red-1/36 absolute inset-0 z-10 flex h-full w-full items-center justify-center">
                                                            {type.startsWith("video/") ? (
                                                                <video src={url} className="size-24 object-cover rounded-lg" />
                                                            ) : (
                                                                <img src={url} className="size-24 object-cover rounded-lg" alt={file?.name || ""} />
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </FieldGroup>
                            </FieldSet>
                                            
                            <editCuisineForm.Subscribe selector={(state) => [state.canSubmit, state.isDirty]}>
                                {([canSubmit, isDirty]) => {
                                    return (
                                        <div className="flex items-center gap-4 *:flex-1 max-w-2/3 mx-auto w-full">
                                            <Button variant="secondary" type="button" asChild>
                                                <Link href="/vendor/storefront">Cancel</Link>
                                            </Button>
                                            <Button type="submit" disabled={!canSubmit || isUploadingMedia || isPending}>
                                                Edit Cuisine
                                                {(isPending) && (<Spinner className="absolute right-4 size-5" />)}
                                            </Button>
                                        </div>
                                    )
                                }}
                            </editCuisineForm.Subscribe>
                        </form>
                        <DeleteMenuFile open={openDelete.isOpen} id={openDelete.id} setOpen={setOpenDelete} />
                    </>
                )
            }
        </>
    )
}