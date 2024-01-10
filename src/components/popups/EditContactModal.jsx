'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/types';
import { updateContact2 } from '@/services/contacts';
import useContactsStore from '../../store/contacts';
import { ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useMutation } from "react-query";
import { queryClient } from "@/app/layout";
import { getFromStorage } from '@/utils/utils';

export const EditContactModal = (props) => {
    const contactToEdit = useContactsStore((state) => state.contactToEdit);
    const { control, handleSubmit, formState: { errors }, setError } = useForm({ resolver: zodResolver(contactFormSchema) });
    const onClose = props.onClose;
    const setIsEditModal = props.setIsEditModal;
    const user = getFromStorage("user");
    // const { data, isLoading, isFetching, error } = useQuery("contacts", () => getContactsByOwner(user.uid));

    const updateMutation = useMutation((contact) => updateContact2(contact), { onSuccess: () => { queryClient.invalidateQueries('contacts') } })

    const onSubmit = (data) => {
        const updatedContact = { ...contactToEdit, ...data };
        updateMutation.mutate(updatedContact);
    }

    const closeModal = () => { onClose(); setIsEditModal(false); }

    return (
        <form onSubmit={handleSubmit(onSubmit)} width="100%">
            <ModalHeader className="flex flex-col gap-1">Edit {contactToEdit.name}</ModalHeader>
            <ModalBody>
                <Controller
                    name="name" control={control} defaultValue={contactToEdit.name}
                    render={({ field }) => (
                        <div className='error'>
                            <Input {...field} className="full-width" label="Name" />
                            <span>{errors.name?.message}</span>
                        </div>
                    )}
                />
                <Controller
                    name="email" control={control} defaultValue={contactToEdit.email}
                    render={({ field }) => (
                        <div className='error'>
                            <Input {...field} className="full-width" label="Email" />
                            <span>{errors.email?.message}</span>
                        </div>
                    )}
                />
                <Controller
                    name="phone" control={control} defaultValue={contactToEdit.phone}
                    render={({ field }) => (
                        <div className='error'>
                            <Input {...field} className="full-width" label="Phone" />
                            <span>{errors.phone?.message}</span>
                        </div>
                    )}
                />
                <Controller
                    name="note" control={control} defaultValue={contactToEdit.note}
                    render={({ field }) => (
                        <div className='error'>
                            <Input {...field} className="full-width" label="Note" />
                            <span>{errors.note?.message}</span>
                        </div>
                    )}
                />

                <label>Status</label>
                <Controller
                    name="status" control={control} defaultValue={contactToEdit.status}
                    render={({ field }) => (
                        <div>
                            <select id="status" {...field} >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Blocked">Blocked</option>
                                <option value="Awaiting call">Awaiting call</option>
                            </select>
                            <span className='error'>{errors.status?.message}</span>
                        </div>
                    )}
                />
                <ModalFooter>

                    <Button color="danger" variant="light" onPress={closeModal}>
                        Close
                    </Button>
                    <Button type="submit" variant="contained" color="primary" onPress={closeModal}>Save</Button>
                </ModalFooter>
            </ModalBody>
        </form>
    )
}
