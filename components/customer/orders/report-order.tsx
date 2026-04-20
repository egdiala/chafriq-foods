import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form-nextjs";
import { useDisputeOrder } from "@/services/mutations/use-orders";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { IconCloudArrowUp, IconTrashSimple } from "@/components/icons";
import { reportCustomerOrderFormSchema } from "@/validations/customer-order";
import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Props = {
    open: boolean;
    orderId: string | null;
    setOpen: (value: boolean) => void;
}

const MAX_FILES = 5;
const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/", "video/"];

export const ReportOrder = ({ open, orderId, setOpen }: Props) => {
    const [images, setImages] = useState<File[]>([])
    const [isDragging, setIsDragging] = useState(false);

    const totalFiles = images.length
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

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        const fileArray = Array.from(files);

        // 1. Validate count
        if (fileArray.length === 0) {
            toast.error("At least one file is required");
            return;
        }

        if (fileArray.length > MAX_FILES) {
            toast.error("You can upload a maximum of 4 files");
        }

        // 2. Validate each file
        fileArray.forEach((file) => {
            const isValidType = ALLOWED_TYPES.some((type) =>
            file.type.startsWith(type)
            );

            if (!isValidType) {
            toast.error("Only image and video files are allowed");
            }

            if (file.size > MAX_SIZE) {
            toast.error(
                `${file.name} exceeds 10MB size limit`
            );
            }
        });

        // 3. Build FormData
        setImages(fileArray)
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index))
    }

    const reportOrderForm = useForm({
        defaultValues: {
            reason: "",
            description: "",
            file: "",
            order_id: orderId as string
        },
        validators: {
            onSubmit: reportCustomerOrderFormSchema
        },
        onSubmit: async ({ value }) => {
            if (isPending || (images.length === 0)) return;
            const formData = new FormData();

            formData.append("order_id", value.order_id);
            formData.append("reason", value.reason);
            formData.append("description", value.description);
            images.forEach((file) => {
                formData.append("file", file);
            });

            mutate({ orderId: orderId as string, formData })
        },
    })

    const handleClose = (v: boolean) => {
        reportOrderForm.reset()
        setOpen(v)
    }

    const { mutate, isPending } = useDisputeOrder(() => handleClose(false))

    useEffect(() => {
        reportOrderForm.setFieldValue("file", images.length > 0 ? "hasFile" : "")
    },[images, reportOrderForm])

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="gap-5 sm:max-w-lg" showCloseButton={false}>
                <DialogHeader className="gap-0">
                    <DialogTitle className="font-bold text-xl">Report an issue with your order</DialogTitle>
                    <DialogDescription>
                        Let us know what went wrong with your order. Your feedback helps us review the issue and improve your experience.
                    </DialogDescription>
                </DialogHeader> 
                <form id="cancel-order-form" className="space-y-5" onSubmit={(e) => {
                    e.preventDefault()
                    reportOrderForm.handleSubmit()
                }}>
                    <reportOrderForm.Field name="reason">
                        {(field) => {
                            const isInvalid = !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Reason</FieldLabel>
                                    <Input
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
                    </reportOrderForm.Field>
                    <reportOrderForm.Field name="description">
                        {(field) => {
                            const isInvalid = !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
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
                    </reportOrderForm.Field>
                    <reportOrderForm.Field name="file">
                        {(field) => {
                            const isInvalid = !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                                    <div className="grid gap-3 content-start">
                                        <label
                                            htmlFor="pickup-images"
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            className={cn(
                                                "py-13 rounded-lg border border-dashed border-grey-dark-3 bg-grey-dark-4",
                                                isDragging ? "border-orange-2 bg-orange-2/5" : "border-grey-dark-3"
                                            )}
                                        >
                                            <input id="pickup-images" type="file" accept="image/*,video/*" onChange={(e) => handleFiles(e.target.files)} multiple hidden />
                                            <div className="flex flex-col items-center gap-1">
                                                <IconCloudArrowUp className="text-orange-2" />
                                                <p className="font-medium text-xs text-grey-dark-3">Drag and drop your photo here, or <span className="text-orange-2 underline">Click Here</span></p>
                                                <p className="text-xs text-grey-dark-3">JPG, PNG and MP4 only. Max size: 5 MB</p>
                                            </div>
                                        </label>
                                        {images.length > 0 && (
                                            <div className="flex items-center gap-4 flex-wrap">
                                                {images.map((file, i) => (
                                                    <div key={i} className="relative size-24 overflow-hidden rounded-lg">
                                                        <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 bg-white grid place-content-center rounded-xs size-3 z-20">
                                                            <IconTrashSimple className="size-2 text-orange-2" />
                                                        </button>
                                                        <div className="pointer-events-none after:absolute after:inset-0 after:bg-red-1/36 absolute inset-0 z-10 flex h-full w-full items-center justify-center">
                                                            {file.type.startsWith("video/") ? (
                                                                <video src={URL.createObjectURL(file)} className="size-24 object-cover rounded-lg" autoPlay muted />
                                                            ) : (
                                                                <img src={URL.createObjectURL(file)} className="size-24 object-cover rounded-lg" alt={file.name} />
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                </Field>
                            )
                        }}
                    </reportOrderForm.Field>
                </form>
                <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Back</Button>
                    </DialogClose>
                    <Button type="submit" disabled={isPending} form="cancel-order-form">
                        Submit
                        {(isPending) && (<Spinner />)}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}