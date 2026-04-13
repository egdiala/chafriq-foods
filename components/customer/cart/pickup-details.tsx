import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PhoneInput } from "@/components/ui/phone-input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePickupDetailsForm } from "@/hooks/use-pickup-details"

type PickupForm = ReturnType<typeof usePickupDetailsForm>

type Props = {
    form: PickupForm;
}

export const PickupDetails = ({ form: pickupDetailsForm }: Props) => {
    return (
        <Card size="sm">
            <CardContent className="space-y-4">
                <CardHeader className="px-0!">
                        <CardTitle className="text-sm font-normal text-grey-dark-0 uppercase">Pickup Details</CardTitle>
                </CardHeader>
                <form id="pickup-details-form" className="space-y-5" onSubmit={(e) => {
                    e.preventDefault()
                    pickupDetailsForm.handleSubmit()
                }}>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <pickupDetailsForm.Field name="receiver_name">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Recipient Name</FieldLabel>
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
                        </pickupDetailsForm.Field>
                        <pickupDetailsForm.Field name="receiver_phone">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Recipient Phone</FieldLabel>
                                        <PhoneInput
                                            id={field.name}
                                            name={field.name}
                                            aria-invalid={isInvalid}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            defaultCountry="AU"
                                            onChange={(value) => field.handleChange(value)}
                                        />
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </pickupDetailsForm.Field>
                    </div>
                    <pickupDetailsForm.Field name="pickup_note">
                        {(field) => {
                            const isInvalid = !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Pickup Note</FieldLabel>
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
                    </pickupDetailsForm.Field>
                </form>
            </CardContent>
        </Card>
    )
}