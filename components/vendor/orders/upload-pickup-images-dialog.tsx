import { IconCloudArrowUp, IconTrashSimple } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useUploadVendorOrderFiles } from "@/services/mutations/use-orders";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
    open: boolean;
    orderId: string | null;
    setOpen: (v: boolean) => void;
}

const MAX_FILES = 4;
const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/", "video/"];

export const UploadPickupImagesDialog = ({ open, orderId, setOpen }: Props) => {
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
    
    const handleClose = (v: boolean) => {
        setImages([])
        setOpen(v);
    }

    const { mutate, isPending } = useUploadVendorOrderFiles(() => {
        handleClose(false)
    })

    const handleUpload = () => {
        if (isPending || (images.length === 0)) return;
        const formData = new FormData();

        images.forEach((file) => {
            formData.append("file", file);
        });

        mutate({ orderId: orderId as string, formData })
    }
    
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="gap-5 sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl">Upload Pickup Images</DialogTitle>
                </DialogHeader>
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
                        <p className="text-xs text-grey-dark-3">JPG or PNG only. Max size: 5 MB</p>
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
                <DialogFooter>
                    <Button type="button" size="big" disabled={isPending || (images.length === 0)} onClick={() => handleUpload()}>
                        Upload
                        {(isPending) && (<Spinner className="lg:absolute right-4 size-5" />)}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}