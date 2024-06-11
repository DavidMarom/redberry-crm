"use client";

import React, { useState, useEffect } from "react";
import { getContactsByOwner, addContact, deleteContact } from "../../services/contacts";
import { getFromStorage } from '@/utils/utils';
import { ContactType } from '@/types';
import { CreateNewPopup } from "./CreateNewPopup";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, Input } from "@nextui-org/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { EditContactModal } from "@/components/popups/EditContactModal";
import { ContactTable, ContactBoard, Loader } from '@/components';
import { TbSwitchHorizontal } from "react-icons/tb";


const ContactsPage = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, isFetching, error } = useQuery("contacts", () => getContactsByOwner(user.uid));
    const user = getFromStorage("user");

    const deleteMutation = useMutation((id: string) => deleteContact(id), {
        onMutate: async (id: string) => {
            await queryClient.cancelQueries('contacts')
            const previousContacts = queryClient.getQueryData('contacts')
            queryClient.setQueryData('contacts', (old: any) => old.filter((item: any) => item._id != id))
            return { previousContacts }
        },
        onSuccess: () => { queryClient.invalidateQueries('contacts') }
    })

    const addMutation = useMutation((contact: ContactType) => addContact(contact), {
        onMutate: async (contact: ContactType) => {
            await queryClient.cancelQueries('contacts')
            const previousContacts = queryClient.getQueryData('contacts')
            queryClient.setQueryData('contacts', (old: any) => [...old, contact])
            return { previousContacts }
        },
        onSuccess: () => { queryClient.invalidateQueries('contacts') }
    })

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isEditModal, setIsEditModal] = useState(false);
    const [isCreateNewPopup, setIsCreateNewPopup] = useState(false);
    const [contactView, setContactView] = useState(window.innerWidth > 1024 ? "Table" : "Board")
    useEffect(() => { if (!isOpen) { setIsEditModal(false) } }, [isOpen]);

    const handleDelete = (id: string) => { deleteMutation.mutate(id); };
    const handleCancel = () => { console.log("Action cancelled") };
    const handleButtonClick = (phone: string) => {
        const updatedPhone = phone.replace(/^0|[^0-9]/g, '')
        const whatsappLink = `https://wa.me/${updatedPhone}`;
        window.location.href = whatsappLink;
    };

    const submitHandler = (formData: any) => {
        addMutation.mutate({ ...formData, owner: user.uid });
        setIsCreateNewPopup(false);
    };

    // const [state, formAction] = useFormState(submitHandler, null);
    const screenSize = window.innerWidth;

    return (
        <div className="page-container2">
            {(isFetching || isLoading) && <Loader />}
            {isCreateNewPopup && <CreateNewPopup
                // owner={user.uid}
                submitHandler={submitHandler} close={() => setIsCreateNewPopup(false)} />}

            <div className="rb margin-bottom-20">
                <div className="rbb">
                    <h1>Contacts</h1>
                    <div className="marg-l-20" />
                    {contactView === "Table" ?
                        <button onClick={() => setContactView("Board")}><TbSwitchHorizontal /></button> :
                        <button onClick={() => setContactView("Table")}><TbSwitchHorizontal /></button>}
                </div>

                <Button variant="solid" color="success" style={{ color: "#ffffff" }} onPress={() => { setIsCreateNewPopup(true) }}>Add</Button>
            </div>

            {contactView == "Board" || screenSize < 1024 ?
                <ContactBoard data={data} handleButtonClick={handleButtonClick} handleCancel={handleCancel} handleDelete={handleDelete} onOpen={onOpen} setIsEditModal={setIsEditModal} />
                :
                <ContactTable data={data} handleButtonClick={handleButtonClick} handleCancel={handleCancel} handleDelete={handleDelete} onOpen={onOpen} setIsEditModal={setIsEditModal} />
            }
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            {isEditModal ? <EditContactModal setIsEditModal={setIsEditModal} onClose={onClose}></EditContactModal> : null}
                        </>
                    )}
                </ModalContent >
            </Modal >

        </div >
    );
};

export default ContactsPage;
