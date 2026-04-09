import { useState } from "react"
import { addYears, format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Calendar } from "@/components/ui/calendar"
import { useForm } from "@tanstack/react-form-nextjs"
import { InputFile } from "@/components/ui/input-file"
import { useUploadVendorDocuments } from "@/services/mutations/use-account"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { publicLiabilityFormSchema, stateApprovalEvidenceFormSchema } from "@/validations/vendor-account"
import { useUser } from "@/context/use-user"
import { Badge } from "@/components/ui/badge"
import { IconDot, IconExternalLink } from "@/components/icons"
import { useGetVendorDocument } from "@/services/queries/use-account"

export const DocumentsTabContent = () => {
    return (
        <div className="flex flex-col gap-6 w-full">
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
    const { user: userObj } = useUser()

    const user = userObj as VendorProfileResponse;

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

        const validImage = (file.type.startsWith("image/") || file.type.startsWith("application/pdf")) && file.size <= 2 * 1024 * 1024;
        if (!validImage) return;

        setFile(file)
    }

    const { mutate, isPending } = useUploadVendorDocuments(() => {
        stateApprovalForm.reset()
        setFile(undefined)
    })

    return (
        <>
        {
            ((!user?.document_data?.state_approval?.file_link) || (user?.document_data?.state_approval?.status === 2)) ? (
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
                                                    accept="image/png, image/jpeg, application/pdf"
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
            ) : (
                <div className="flex flex-col gap-4 justify-between inset-ring-1 inset-ring-outline p-5 rounded-xl">
                    <DocumentRow documentData={user?.document_data} documentType="state_approval" label="State Approval Evidence" />
                </div>
            )
        }
        </>
    )
}

const PublicLiabilityInsurance = () => {
    const { user: userObj } = useUser()

    const user = userObj as VendorProfileResponse;
    
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

        const validImage = (file.type.startsWith("image/") || file.type.startsWith("application/pdf")) && file.size <= 2 * 1024 * 1024;
        if (!validImage) return;

        setFile(file)
    }

    const { mutate, isPending } = useUploadVendorDocuments(() => {
        publicLiabilityForm.reset()
        setFile(undefined)
    })

    return (
        <>
        {
            ((!user?.document_data?.pub_insurance?.file_link) || (user?.document_data?.pub_insurance?.status === 2)) ? (
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
                                                    accept="image/png, image/jpeg, application/pdf"
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
            ) :  (
                <div className="flex flex-col gap-4 justify-between inset-ring-1 inset-ring-outline p-5 rounded-xl">
                    <DocumentRow documentData={user?.document_data} documentType="pub_insurance" label="Public Liability Insurance" /> 
                </div>
            )
        }
        </>
    )
}

const Others = () => {
    const { user: userObj } = useUser()

    const user = userObj as VendorProfileResponse;

    const [insurance, setInsurance] = useState<File>()
    const [foodSafety, setFoodSafety] = useState<File>()
    const [businessCert, setBusinessCert] = useState<File>()
    const [govtId, setGovtId] = useState<File>()

    const handleSetFile = async (file: File | undefined, document_type: VendorDocumentType) => {
        switch (document_type) {
            case "insurance_cert":
                return setInsurance(file);
            case "food_safety_cert":
                return setFoodSafety(file);
            case "business_cert":
                return setBusinessCert(file);
            case "govt_id":
                return setGovtId(file);
            default:
                break;
        }
    }

    const handleFileChange = async (files: FileList | null, document_type: VendorDocumentType) => {
        if (!files) return

        const file = files[0];
        if (!file) return;

        const validImage = (file.type.startsWith("image/") || file.type.startsWith("application/pdf")) && file.size <= 2 * 1024 * 1024;
        if (!validImage) return;

        await handleSetFile(file, document_type)

        const formData = new FormData();

        formData.append("file", file as File);

        await mutateAsync({
            documentType: document_type,
            formData
        })

        await handleSetFile(undefined, document_type)
    }

    const { mutateAsync, isPending, variables } = useUploadVendorDocuments()

    return (
        <div className="flex flex-col gap-4 justify-between inset-ring-1 inset-ring-outline p-5 rounded-xl md:col-span-2">
            <FieldSet>
                <FieldLegend>Others</FieldLegend>
                <FieldGroup>
                    <div className="grid lg:grid-cols-2 gap-5">
                        {
                            ((!user?.document_data?.insurance_cert?.file_link) || (user?.document_data?.insurance_cert?.status === 2)) ? (
                                <Field>
                                    <FieldLabel htmlFor="insurance_cert">Insurance Certificate</FieldLabel>
                                    <InputFile
                                        id="insurance_cert"
                                        name="insurance_cert"
                                        selectedFile={insurance}
                                        accept="image/png, image/jpeg, application/pdf"
                                        isLoading={isPending && (variables.documentType === "insurance_cert")}
                                        className='text-muted-foreground file:border-input file:text-foreground p-0 pr-3 italic file:mr-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic'
                                        onChange={(e) => handleFileChange(e.target.files, "insurance_cert")}
                                    />
                                </Field>
                            ) : (
                                <DocumentRow documentData={user?.document_data} documentType="insurance_cert" label="Insurance Certificate" />
                            )
                        }
                        {
                            ((!user?.document_data?.food_safety_cert?.file_link) || (user?.document_data?.food_safety_cert?.status === 2)) ? (
                                <Field>
                                    <FieldLabel htmlFor="food_safety_cert">Food Safety Training Evidence</FieldLabel>
                                    <InputFile
                                        id="food_safety_cert"
                                        name="food_safety_cert"
                                        selectedFile={foodSafety}
                                        accept="image/png, image/jpeg, application/pdf"
                                        isLoading={isPending && (variables.documentType === "food_safety_cert")}
                                        className='text-muted-foreground file:border-input file:text-foreground p-0 pr-3 italic file:mr-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic'
                                        onChange={(e) => handleFileChange(e.target.files, "food_safety_cert")}
                                    />
                                </Field>
                            ) : (
                                <DocumentRow documentData={user?.document_data} documentType="food_safety_cert" label="Food Safety Training Evidence" />
                            )
                        }
                        {
                            ((!user?.document_data?.business_cert?.file_link) || (user?.document_data?.business_cert?.status === 2)) ? (
                                <Field>
                                    <FieldLabel htmlFor="business_cert">Business Document - If any</FieldLabel>
                                    <InputFile
                                        id="business_cert"
                                        name="business_cert"
                                        selectedFile={businessCert}
                                        accept="image/png, image/jpeg, application/pdf"
                                        isLoading={isPending && (variables.documentType === "business_cert")}
                                        className='text-muted-foreground file:border-input file:text-foreground p-0 pr-3 italic file:mr-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic'
                                        onChange={(e) => handleFileChange(e.target.files, "business_cert")}
                                    />
                                </Field>
                            ) : (
                                <DocumentRow documentData={user?.document_data} documentType="business_cert" label="Business Document" />
                            )
                        }
                        {
                            ((!user?.document_data?.govt_id?.file_link) || (user?.document_data?.govt_id?.status === 2)) ? (
                                <Field>
                                    <FieldLabel htmlFor="govt_id">Government Issue ID ( Must match the personal full name provided )</FieldLabel>
                                    <InputFile
                                        id="govt_id"
                                        name="govt_id"
                                        selectedFile={govtId}
                                        accept="image/png, image/jpeg, application/pdf"
                                        isLoading={isPending && (variables.documentType === "govt_id")}
                                        className='text-muted-foreground file:border-input file:text-foreground p-0 pr-3 italic file:mr-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic'
                                        onChange={(e) => handleFileChange(e.target.files, "govt_id")}
                                    />
                                </Field>
                            ) : (
                                <DocumentRow documentData={user?.document_data} documentType="govt_id" label="Government Issue ID" />
                            )
                        }
                    </div>
                </FieldGroup>
            </FieldSet>
        </div>
    )
}

type DocumentRowProps = {
    documentData: VendorProfileResponse["document_data"]
    documentType: VendorDocumentType;
    label: string;
}

const DocumentRow = ({ documentData, documentType, label }: DocumentRowProps) => {
    const { data, isLoading } = useGetVendorDocument(documentType)

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="text-sm text-grey-dark-1 font-medium">{label}</span>
                <Badge variant={documentData?.[documentType]?.status === 0 ? "pending" : "completed"} className="[&>svg]:size-1.5!">
                    <IconDot />
                    {documentData?.[documentType]?.status === 0 ? "Pending" : "Verified"}
                </Badge> 
            </div>
            <Button variant="tertiary" size="icon-sm" asChild>
                {
                    isLoading ? (
                        <div>
                            <Spinner />
                        </div>
                    ) : (!isLoading && data && data.data.file_link) ? (
                        <a href={data.data.file_link} target="_blank">
                            <IconExternalLink />
                        </a>
                    ) : null
                }
                
            </Button>
        </div>
    )
}