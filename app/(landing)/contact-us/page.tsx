"use client";

import { Content } from "@/components/content";
import { useForm } from "@tanstack/react-form-nextjs";
import { IconEmail, IconMapPinLine, IconPhone } from "@/components/icons";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactUsFormSchema } from "@/validations/explore";
import { useContactUs } from "@/services/mutations/use-explore";

const contactList = [
    {
        icon: <IconMapPinLine />,
        label: "Address",
        text: "2118 Thornridge Cir. Syracuse, Connecticut 35624"
    },
    {
        icon: <IconPhone />,
        label: "Call Us",
        text: "(629) 555-0129"
    },
    {
        icon: <IconEmail />,
        label: "Email Us",
        text: "felicia.reid@example.com"
    },
]

export default function ContactUsPage() {
    const { mutateAsync, isPending } = useContactUs()
    const contactForm = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            subject: "",
            message: "",
            email: ""
        },
        validators: {
            onSubmit: contactUsFormSchema
        },
        onSubmit: async ({ value }) => {
            await mutateAsync(value)
            contactForm.reset()
        },
    })
    
    return (
        <section className="bg-orange-5 flex-1">
            <Content>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12.5 lg:px-12">
                    <div className="flex flex-col gap-8 md:col-span-5">
                        <div className="grid gap-3">
                            <h1 className="font-sora font-extrabold text-5xl text-grey-dark-0">Contact Us</h1>
                            <p className="text-base text-grey-dark-2">Shoot us an email, give us a call, or just fill out the form to see how we can help you out!</p>
                        </div>
                        {
                            contactList.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="grid place-content-center rounded-full bg-white [&>svg]:text-orange-2 [&>svg]:size-6 size-12">{item.icon}</div>
                                    <div className="flex flex-col flex-1">
                                        <span className="text-sm font-medium text-grey-dark-3">{item.label}</span>
                                        <p className="text-base text-grey-dark-0">{item.text}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="bg-white flex flex-col gap-12.5 py-7 px-8 rounded-3xl shadow-card md:col-span-7">
                        <h2 className="font-semibold text-xl text-grey-dark-2">How Can We Help?</h2>
                        <form className="space-y-5 [&_button]:w-1/2! [&_button]:mt-5! [&_button]:mx-auto!" onSubmit={(e) => {
                            e.preventDefault()
                            contactForm.handleSubmit()
                        }}>
                            <FieldGroup>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <contactForm.Field name="first_name">
                                        {(field) => {
                                            const isInvalid = !field.state.meta.isValid
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
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
                                    </contactForm.Field>
                                    <contactForm.Field name="last_name">
                                        {(field) => {
                                            const isInvalid = !field.state.meta.isValid
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
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
                                    </contactForm.Field>
                                </div>
                                <contactForm.Field name="email">
                                    {(field) => {
                                        const isInvalid = !field.state.meta.isValid
                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
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
                                </contactForm.Field>
                                <contactForm.Field name="subject">
                                    {(field) => {
                                        const isInvalid = !field.state.meta.isValid
                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>Subject</FieldLabel>
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
                                </contactForm.Field>
                                <contactForm.Field name="message">
                                    {(field) => {
                                        const isInvalid = !field.state.meta.isValid
                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>Message</FieldLabel>
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
                                </contactForm.Field>
                                
                                <contactForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                                    {([canSubmit, isSubmitting]) => {
                                        return (
                                            <Button type="submit" disabled={!canSubmit || isSubmitting || isPending}>
                                                Submit
                                                {(isSubmitting || isPending) && (<Spinner className="md:absolute md:right-4 md:size-5" />)}
                                            </Button>
                                        )
                                    }}
                                </contactForm.Subscribe>
                            </FieldGroup>
                        </form>
                    </div>
                </div>
            </Content>
        </section>
    );
}