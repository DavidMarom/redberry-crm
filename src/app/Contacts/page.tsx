"use client";

import React, { useState, useEffect } from "react";
import { getContactsByOwner, addContact, deleteContact } from "../../services/contacts";
import { getFromStorage } from '@/utils/utils';
import { ContactType } from '@/types';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, Input } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { ContactsStatusType } from "./Constants";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { EditContactModal } from "@/components/popups/EditContactModal";
import { ContactTable, ContactBoard } from "../../components/index";

function SubmitButton() {
    const { pending } = useFormStatus()
    return <Button color="success" style={{ color: "#ffffff" }} aria-disabled={pending} type="submit" isLoading={pending}>Add Contact</Button>
}

const ContactsPage = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, isFetching, error } = useQuery("contacts", () => getContactsByOwner(user.uid));
    const user = getFromStorage("user");
    const deleteMutation = useMutation((id: string) => deleteContact(id), { onSuccess: () => { queryClient.invalidateQueries('contacts') } })
    const addMutation = useMutation((contact: ContactType) => addContact(contact), { onSuccess: () => { queryClient.invalidateQueries('contacts') } })
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isEditModal, setIsEditModal] = useState(false);
    const [contactView, setContactView] = useState("Table")
    useEffect(() => { if (!isOpen) { setIsEditModal(false) } }, [isOpen]);

    const submitHandler = (prevState: any, formData: FormData) => {
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const note = formData.get('note');
        const status = formData.get('status');
        const owner = user.uid;
        const contact = { name, email, phone, status, owner, note };
        addMutation.mutate(contact);
        onClose();
    };

    const handleDelete = (id: string) => { deleteMutation.mutate(id); };

    const handleCancel = () => { console.log("Action cancelled") };

    const handleButtonClick = (phone: string) => {
        const updatedPhone = phone.replace(/^0|[^0-9]/g, '')
        const whatsappLink = `https://wa.me/${updatedPhone}`;
        window.location.href = whatsappLink;
    };

    const [state, formAction] = useFormState(submitHandler, null);
    const { register } = useForm()

    return (
        <div className="page-container2">
            {isLoading ? <h1>Loading...</h1> :
                <div className="rb margin-bottom-20">
                    <h1 className="flex flex-row justify-between">
                        <span className="flex flex-row items-center gap-3">
                            Contacts
                            <Select
                                size="sm"
                                onChange={(e) => setContactView(e.target.value)}
                                items={[
                                    {
                                        id: 'Table',
                                        name: 'Table',
                                    },
                                    {
                                        id: 'Board',
                                        name: 'Board',
                                    }
                                ]} className="min-w-[92px]" defaultSelectedKeys={["Table"]}>
                                {(status) => <SelectItem key={status.id}>{status.name}</SelectItem>}
                            </Select>
                        </span>

                    </h1>
                    <Button variant="solid" color="success" style={{ color: "#ffffff" }} onPress={onOpen}>New Contact</Button>
                </div>
            }
            {contactView == "Board" ?
                <ContactBoard
                    data={data} handleButtonClick={handleButtonClick}
                    handleCancel={handleCancel} handleDelete={handleDelete}
                    onOpen={onOpen} setIsEditModal={setIsEditModal} />
                :
                <ContactTable
                    data={data} handleButtonClick={handleButtonClick}
                    handleCancel={handleCancel} handleDelete={handleDelete}
                    onOpen={onOpen} setIsEditModal={setIsEditModal} />}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            {isEditModal ? <EditContactModal setIsEditModal={setIsEditModal} onClose={onClose}></EditContactModal> :
                                <form action={formAction}>
                                    <ModalHeader className="flex flex-col gap-1">New Contact</ModalHeader>
                                    <ModalBody>

                                        <Input isRequired label="Name" style={{ backgroundColor: "#f3f3f3" }}  {...register('name')} />
                                        <Input type="email" label="Email" style={{ backgroundColor: "#f3f3f3" }} {...register('email')} />
                                        <Input type="phone" label="Phone" style={{ backgroundColor: "#f3f3f3" }}{...register('phone')} />
                                        <Input type="text" label="Notes" style={{ backgroundColor: "#f3f3f3" }}{...register('note')} />

                                        <Select items={ContactsStatusType} label="Contact Status" placeholder="Select a status" className="" isRequired {...register('status')}>
                                            {(status) => <SelectItem key={status.id}>{status.name}</SelectItem>}
                                        </Select>
                                    </ModalBody >
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                                        <SubmitButton />
                                    </ModalFooter>
                                </form >
                            }
                        </>
                    )}
                </ModalContent >
            </Modal >

        </div >
    );
};

export default ContactsPage;
