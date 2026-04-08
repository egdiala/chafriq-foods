import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useForm, useStore } from "@tanstack/react-form-nextjs"
import { InputFile } from "@/components/ui/input-file"
import { useUploadVendorDocuments } from "@/services/mutations/use-account"
import { publicLiabilityFormSchema, stateApprovalEvidenceFormSchema } from "@/validations/vendor-account"
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { addYears, format } from "date-fns"

export const DocumentsTabContent = () => {
    return (
        <div className="flex flex-col gap-12.5 w-full">
            <div className="flex flex-col gap-1">
                <h1 className="uppercase font-medium text-xs text-neu">Almost there!</h1>
                <p className="text-grey-dark-3 text-xs">We need a bit more information to complete your profile.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
                <StateApprovalEvidence />

                <PublicLiabilityInsurance />

                <Others />
            </div>
        </div>
    )
}

const StateApprovalEvidence = () => {
    const [file, setFile] = useState<File>()
    const stateApprovalForm = useForm({
        defaultValues: {
            file: "",
            issuer: "",
            issuer_num: "",
            expiry_date: "" as unknown as Date,
        },
        validators: {
            onSubmit: stateApprovalEvidenceFormSchema
        },
        onSubmit: async ({ value }) => {
            const formData = new FormData();

            formData.append("file", file as File);
            formData.append("issuer", value.issuer);
            formData.append("issuer_num", value.issuer_num);
            formData.append("expiry_date", format(value.expiry_date, "yyyy-MM-dd"));

            mutate({
                documentType: "state_approval",
                formData
            })
        },
    })

    const handleFileChange = async (files: FileList | null) => {
        if (!files) return

        const file = files[0];
        if (!file) return;

        const validImage = file.type.startsWith("image/") && file.size <= 2 * 1024 * 1024;
        if (!validImage) return;

        setFile(file)
    }

    const { mutate, isPending } = useUploadVendorDocuments(() => {
        stateApprovalForm.reset()
        setFile(undefined)
    })

    return (
        <form className="flex flex-col gap-4 justify-between inset-ring-1 inset-ring-outline p-5 rounded-xl" onSubmit={(e) => {
            e.preventDefault()
            stateApprovalForm.handleSubmit()
        }}>
            <FieldSet>
                <FieldLegend>State Approval evidence</FieldLegend>
                <FieldGroup>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <stateApprovalForm.Field name="file">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>State Approval Evidence {field.state.value}</FieldLabel>
                                        <InputFile
                                            id={field.name}
                                            name={field.name}
                                            aria-invalid={isInvalid}
                                            // value={field.state.value}
                                            onBlur={field.handleBlur}
                                            selectedFile={file}
                                            accept="image/png, image/jpeg"
                                            className='text-muted-foreground file:border-input file:text-foreground p-0 pr-3 italic file:mr-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic'
                                            onChange={async(e) => {
                                                field.handleChange("a file")
                                                await handleFileChange(e.target.files)
                                            }}
                                        />
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </stateApprovalForm.Field>
                        <stateApprovalForm.Field name="issuer">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Issuer</FieldLabel>
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
                        </stateApprovalForm.Field>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <stateApprovalForm.Field name="issuer_num">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Issuer Number</FieldLabel>
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
                        </stateApprovalForm.Field>
                        <stateApprovalForm.Field name="expiry_date">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Expiration Date</FieldLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Input
                                                    type="text"
                                                    id={field.name}
                                                    name={field.name}
                                                    aria-invalid={isInvalid}
                                                    defaultValue={field.state.value ? format(field.state.value, "yyyy-MM-dd") : ""}
                                                    onBlur={field.handleBlur}
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    startMonth={new Date()}
                                                    endMonth={addYears(new Date, 100)}
                                                    captionLayout="dropdown"
                                                    defaultMonth={field.state.value || new Date()}
                                                    disabled={{ before: new Date() }}
                                                    selected={field.state.value as unknown as Date}
                                                    onSelect={(date) => field.handleChange(date as unknown as Date)}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </stateApprovalForm.Field>
                    </div>
                </FieldGroup>
            </FieldSet>

            <div className="flex flex-col items-end [&>button]:w-full md:[&>button]:w-1/3 gap-5">
                <stateApprovalForm.Subscribe selector={(state) => [state.canSubmit]}>
                    {([canSubmit]) => {
                        return (
                            <Button type="submit" disabled={!canSubmit || isPending}>
                                Submit
                                {(isPending) && (<Spinner className="absolute right-4 size-5" />)}
                            </Button>
                        )
                    }}
                </stateApprovalForm.Subscribe>
            </div>
        </form>
    )
}

const PublicLiabilityInsurance = () => {
    const [file, setFile] = useState<File>()
    const publicLiabilityForm = useForm({
        defaultValues: {
            file: "",
            issuer: "",
            issuer_num: "",
            expiry_date: "" as unknown as Date,
            coverage_amount: "",
        },
        validators: {
            onSubmit: publicLiabilityFormSchema
        },
        onSubmit: async ({ value }) => {
            const formData = new FormData();

            formData.append("file", file as File);
            formData.append("issuer", value.issuer);
            formData.append("issuer_num", value.issuer_num);
            formData.append("coverage_amount", value.coverage_amount);
            formData.append("expiry_date", format(value.expiry_date, "yyyy-MM-dd"));

            mutate({
                documentType: "pub_insurance",
                formData
            })
        },
    })

    const handleFileChange = async (files: FileList | null) => {
        if (!files) return

        const file = files[0];
        if (!file) return;

        const validImage = file.type.startsWith("image/") && file.size <= 2 * 1024 * 1024;
        if (!validImage) return;

        setFile(file)
    }

    const { mutate, isPending } = useUploadVendorDocuments(() => {
        publicLiabilityForm.reset()
        setFile(undefined)
    })

    return (
        <form className="flex flex-col gap-4 justify-between inset-ring-1 inset-ring-outline p-5 rounded-xl" onSubmit={(e) => {
            e.preventDefault()
            publicLiabilityForm.handleSubmit()
        }}>
            <FieldSet>
                <FieldLegend>Public Liability Insurance</FieldLegend>
                <FieldGroup>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <publicLiabilityForm.Field name="file">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Public Liability Insurance</FieldLabel>
                                        <InputFile
                                            id={field.name}
                                            name={field.name}
                                            aria-invalid={isInvalid}
                                            // value={field.state.value}
                                            onBlur={field.handleBlur}
                                            selectedFile={file}
                                            className='text-muted-foreground file:border-input file:text-foreground p-0 pr-3 italic file:mr-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic'
                                            onChange={async(e) => {
                                                field.handleChange("a file")
                                                await handleFileChange(e.target.files)
                                            }}
                                        />
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </publicLiabilityForm.Field>
                        <publicLiabilityForm.Field name="issuer_num">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Number</FieldLabel>
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
                        </publicLiabilityForm.Field>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-5">
                        <publicLiabilityForm.Field name="issuer">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Issuer</FieldLabel>
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
                        </publicLiabilityForm.Field>
                        <publicLiabilityForm.Field name="coverage_amount">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Coverage Amount</FieldLabel>
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
                        </publicLiabilityForm.Field>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <publicLiabilityForm.Field name="expiry_date">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Expiration Date</FieldLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Input
                                                    type="text"
                                                    id={field.name}
                                                    name={field.name}
                                                    aria-invalid={isInvalid}
                                                    defaultValue={field.state.value ? format(field.state.value, "yyyy-MM-dd") : ""}
                                                    onBlur={field.handleBlur}
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    startMonth={new Date()}
                                                    endMonth={addYears(new Date, 100)}
                                                    captionLayout="dropdown"
                                                    defaultMonth={field.state.value || new Date()}
                                                    disabled={{ before: new Date() }}
                                                    selected={field.state.value as unknown as Date}
                                                    onSelect={(date) => field.handleChange(date as unknown as Date)}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </publicLiabilityForm.Field>
                    </div>
                </FieldGroup>
            </FieldSet>

            <div className="flex flex-col items-end [&>button]:w-full md:[&>button]:w-1/3 gap-5">
                <publicLiabilityForm.Subscribe selector={(state) => [state.canSubmit]}>
                    {([canSubmit]) => {
                        return (
                            <Button type="submit" disabled={!canSubmit || isPending}>
                                Submit
                                {(isPending) && (<Spinner className="absolute right-4 size-5" />)}
                            </Button>
                        )
                    }}
                </publicLiabilityForm.Subscribe>
            </div>
        </form>
    )
}

const Others = () => {
    const [file, setFile] = useState<File>()
    const othersForm = useForm({
        defaultValues: {
            insurance_cert_file: "",
            food_safety_cert_file: "",
            business_cert_file: "",
            govt_id_file: "",
        },
        validators: {
            // onSubmit: loginFormSchema
        },
        onSubmit: async ({ value }) => {
            console.log(value)
        },
    })

    const { mutate, isPending, variables } = useUploadVendorDocuments()

    return (
        <form className="flex flex-col gap-4 justify-between inset-ring-1 inset-ring-outline p-5 rounded-xl md:col-span-2" onSubmit={(e) => {
            e.preventDefault()
            othersForm.handleSubmit()
        }}>
            <FieldSet>
                <FieldLegend>Others</FieldLegend>
                <FieldGroup>
                    <div className="grid lg:grid-cols-2 gap-5">
                        <othersForm.Field name="insurance_cert_file">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Insurance Certificate</FieldLabel>
                                        <InputFile
                                            id={field.name}
                                            name={field.name}
                                            aria-invalid={isInvalid}
                                            // value={field.state.value}
                                            onBlur={field.handleBlur}
                                            selectedFile={file}
                                            className='text-muted-foreground file:border-input file:text-foreground p-0 pr-3 italic file:mr-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic'
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </othersForm.Field>
                        <othersForm.Field name="food_safety_cert_file">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Food Safety Training Evidence</FieldLabel>
                                        <InputFile
                                            id={field.name}
                                            name={field.name}
                                            aria-invalid={isInvalid}
                                            // value={field.state.value}
                                            onBlur={field.handleBlur}
                                            selectedFile={file}
                                            className='text-muted-foreground file:border-input file:text-foreground p-0 pr-3 italic file:mr-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic'
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </othersForm.Field>
                        <othersForm.Field name="business_cert_file">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Business Document - If any</FieldLabel>
                                        <InputFile
                                            id={field.name}
                                            name={field.name}
                                            aria-invalid={isInvalid}
                                            // value={field.state.value}
                                            onBlur={field.handleBlur}
                                            selectedFile={file}
                                            className='text-muted-foreground file:border-input file:text-foreground p-0 pr-3 italic file:mr-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic'
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </othersForm.Field>
                        <othersForm.Field name="govt_id_file">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Government Issue ID ( Must match the personal full name provided )</FieldLabel>
                                        <InputFile
                                            id={field.name}
                                            name={field.name}
                                            aria-invalid={isInvalid}
                                            // value={field.state.value}
                                            onBlur={field.handleBlur}
                                            selectedFile={file}
                                            className='text-muted-foreground file:border-input file:text-foreground p-0 pr-3 italic file:mr-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic'
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </othersForm.Field>
                    </div>
                </FieldGroup>
            </FieldSet>
        </form>
    )
}