import { IconCloudArrowUp, IconTrashSimple } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react";

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const UploadPickupImagesDialog = ({ open, setOpen }: Props) => {
    const [images, setImages] = useState<File[]>([])

    const handleFiles = (files: FileList | null) => {
        if (!files) return

        const validImages = Array.from(files).filter((file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024)

        setImages((prev) => [...prev, ...validImages])
    }

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index))
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="gap-5 sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl">Upload Pickup Images</DialogTitle>
                </DialogHeader>
                <label htmlFor="pickup-images" className="py-13 rounded-lg border border-dashed border-grey-dark-3 bg-grey-dark-4">
                    <input id="pickup-images" type="file" accept="image/*"onChange={(e) => handleFiles(e.target.files)} multiple hidden />
                    <div className="flex flex-col items-center gap-1">
                        <IconCloudArrowUp className="text-orange-2" />
                        <p className="font-medium text-xs text-grey-dark-3">Drag and drop your photo here, or <span className="text-orange-2 underline">Click Here</span></p>
                        <p className="text-xs text-grey-dark-3">JPG or PNG only. Max size: 5 MB</p>
                    </div>
                </label>
                {images.length > 0 && (
                    <div className="grid grid-cols-5 gap-3">
                        {images.map((file, i) => (
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
                        ))}
                    </div>
                )}
                <DialogFooter>
                    <Button size="big">Mark as Completed </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}