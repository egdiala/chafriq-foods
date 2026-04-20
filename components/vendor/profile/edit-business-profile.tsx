"use client";

import { useUser } from "@/context/use-user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Fragment, useRef, useState } from "react";
import { useForm, useStore } from "@tanstack/react-form-nextjs";
import { useUpdateVendorProfile } from "@/services/mutations/use-account";
import { editVendorBusinessFormSchema } from "@/validations/vendor-account";
import { useDishList, useSearchLocations } from "@/services/queries/use-explore";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/base-dialog"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxStatus, ComboboxTrigger, ComboboxValue } from "@/components/ui/combobox";
import { normalizeNumberInput } from "@/lib/utils";

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const EditBusinessProfile = ({ open, setOpen }: Props) => {
    const { user: userObj } = useUser()
    const user = userObj as VendorProfileResponse;
    const { data: dishList, isLoading: isLoadingDishList } = useDishList()
    const [searchValue, setSearchValue] = useState('');
    const trimmedSearchValue = searchValue.trim();

    const abortControllerRef = useRef<AbortController | null>(null);

    const { data, isLoading, error } = useSearchLocations({ q: searchValue, country: "au" })
    const [defaultValue, setDefaultValue] = useState<SearchLocationsResponse | null>({
        id: user?.business_address_id || "",
        name: user?.business_address || ""
    });

    const editBusinessForm = useForm({
        defaultValues: {
            business_username: user?.business_username || "",
            business_address_id: user?.business_address,
            dish_list: user?.dish_data?.map((dish) => dish.dish_type_id) as string[],
            order_distance: user?.order_distance?.toString()
        },
        validators: {
            onSubmit: editVendorBusinessFormSchema
        },
        onSubmit: async ({ value }) => {
            const { business_address_id, ...rest } = value
            mutate({
                business_address_id: defaultValue?.id,
                ...rest
            })
        },
    })

    const closeDialog = (v: boolean) => {
        setOpen(v)
        editBusinessForm.reset()
    }
    
    const { mutate, isPending } = useUpdateVendorProfile(() => closeDialog(false))

    const selectedValue = useStore(editBusinessForm.store, (state) => state.values.business_address_id)

    function getStatus() {
        if (isLoading) {
            return (
                <Fragment><Spinner />Searching…</Fragment>
            );
        }

        if (error) {
            return <Fragment>An error occurred</Fragment>;
        }

        if (trimmedSearchValue === '') {
            return selectedValue ? null : 'Start typing to search…';
        }

        if (data?.data.length === 0) {
            return `No matches for "${trimmedSearchValue}".`;
        }

        return null;
    }

    return (
        <Dialog open={open} onOpenChange={(v) => {
            setOpen(v);
            editBusinessForm.reset()
        }}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Edit Business Profile</DialogTitle>
                </DialogHeader>
                <form id="edit-vendor-business-form" className="space-y-5" onSubmit={(e) => {
                    e.preventDefault()
                    editBusinessForm.handleSubmit()
                }}>
                    <FieldGroup>
                        <editBusinessForm.Field name="business_username">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Username</FieldLabel>
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
                        </editBusinessForm.Field>
                        <editBusinessForm.Field name="business_address_id">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Business Address</FieldLabel>
                                        <Combobox
                                            filter={null}
                                            items={data?.data || []}
                                            value={field.state.value ? { id: "", name: field.state.value } : null}
                                            autoHighlight
                                            itemToStringLabel={(address: SearchLocationsResponse) => address.name}
                                            onValueChange={(value) => {
                                                field.handleChange(value?.name || "");
                                                setDefaultValue(value)
                                                setSearchValue('');
                                            }}
                                            onInputValueChange={(nextSearchValue, { reason }) => {
                                                setSearchValue(nextSearchValue);
                                                field.handleChange(nextSearchValue);

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
                                        <ComboboxInput 
                                            type="text"
                                            id={field.name}
                                            name={field.name} 
                                            aria-invalid={isInvalid}  
                                            onBlur={field.handleBlur} 
                                            placeholder="Search address..."
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <ComboboxContent>
                                            <ComboboxStatus>{getStatus()}</ComboboxStatus>
                                            <ComboboxList>
                                            {(address) => (
                                                <ComboboxItem key={address.id} value={address}>
                                                {address.name}
                                                </ComboboxItem>
                                            )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                        </Combobox>
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </editBusinessForm.Field>
                        <editBusinessForm.Field name="dish_list">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Types of Meals</FieldLabel>
                                        <Combobox
                                            multiple
                                            disabled={isLoadingDishList}
                                            items={dishList?.data || []}
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
                                                        Select a meal
                                                    </span>
                                                    }
                                                >
                                                    {(item: string[]) => (
                                                    <>
                                                        {item.length === 0 ? (
                                                        <span className="text-contrast-low">
                                                            Select a meal
                                                        </span>
                                                        ) : item.length > 1 ? (
                                                        <span className="line-clamp-1 text-ellipsis">{item.map((itm) => {
                                                            return dishList?.data?.find((dishItm) => dishItm.dish_type_id === itm)?.name
                                                        }).join(", ")}</span>
                                                        ) : (
                                                        <span className="line-clamp-1 text-ellipsis">{dishList?.data?.find((itm) => itm.dish_type_id === item[0])?.name}</span>
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
                        </editBusinessForm.Field>
                        <editBusinessForm.Field name="order_distance">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Order Distance</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            inputMode="decimal"
                                            aria-invalid={isInvalid}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => {
                                                const normalized = normalizeNumberInput(e.target.value, 100, 2);
                                                field.handleChange(normalized);
                                            }}
                                        />
                                        <FieldDescription className="text-2xs text-grey-dark-3">
                                            Set how far in distance a customer can request for service. Up to 100 km
                                        </FieldDescription>
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </editBusinessForm.Field>
                    </FieldGroup>
                </form>
                <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                    <DialogClose render={<Button type="button" variant="secondary">Cancel</Button>} />
                                
                    <editBusinessForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isDirty]}>
                        {([canSubmit, isSubmitting, isDirty]) => {
                            return (
                                <Button type="submit" form="edit-vendor-business-form" disabled={!canSubmit || isSubmitting || !isDirty || isPending}>
                                    Update
                                    {(isPending || isSubmitting) && (<Spinner className="absolute right-4 size-5" />)}
                                </Button>
                            )
                        }}
                    </editBusinessForm.Subscribe>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}