'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/types';
import { updateContact } from '@/services/contacts';
import { addKeysToResponse, setToStorage } from '@/utils/utils';

import usePopupStore from '../../store/popup';
import useContactsStore from '../../store/contacts';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, Input } from "@nextui-org/react";

export const EditContactModal = (props) => {
    const triggerPopup = usePopupStore((state) => state.triggerPopup);
    const contactToEdit = useContactsStore((state) => state.contactToEdit);
    const contacts = useContactsStore((state) => state.contacts);
    const setContacts = useContactsStore((state) => state.setContacts);
    const { control, handleSubmit, formState: { errors }, setError } = useForm({ resolver: zodResolver(contactFormSchema) });
    const onClose = props.onClose;
    const setIsEditModal = props.setIsEditModal;
    
    const onSubmit = (data) => {
        updateContact(contactToEdit._id, data)
        .then(() => {
            const newContacts = contacts.map((contact) => {
                if (contact._id === contactToEdit._id) { return { ...contact, ...data } }
                return contact;
            });
            setContacts(addKeysToResponse(newContacts));
            setToStorage('contacts', addKeysToResponse(newContacts));
            
            triggerPopup(0);
        })
        .catch((error) => {
            setError(error);
        });
        setIsEditModal(false);
    }

    const closeModal = () => {
        onClose();
        setIsEditModal(false);
    }
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
                        <div >
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

