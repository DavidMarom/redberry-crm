"use client";

import React, { useState } from "react";
import { getContactsByOwner, addContact, deleteContact, updateContact2 } from "../../services/contacts";
import { getFromStorage } from '@/utils/utils';
import { ContactType } from '@/types';
import { CreateNewPopup } from "./CreateNewPopup";
import { EditPopup } from "./EditPopup";
import { Button } from "@nextui-org/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Loader } from '@/components';
import ContactTable from './ContactTableView';
import ContactBoard from './ContactBoardView';
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

    const editMutation = useMutation((contact: any) => updateContact2(contact), {
        onMutate: async (contact: any) => {
            await queryClient.cancelQueries('contacts')
            const previousContacts = queryClient.getQueryData('contacts')
            queryClient.setQueryData('contacts', (old: any) => old.map((item: any) => item._id == contact._id ? contact : item))
            return { previousContacts }
        },
        onSuccess: () => { queryClient.invalidateQueries('contacts') }
    })

    const [isCreateNewPopup, setIsCreateNewPopup] = useState(false);
    const [isEditModal, setIsEditModal] = useState(null);
    const [contactView, setContactView] = useState(window.innerWidth > 1024 ? "Table" : "Board")

    const handleDelete = (id: string) => { deleteMutation.mutate(id); };
    const handleCancel = () => { console.log("Action cancelled") };
    const handleWhatsappClick = (phone: string) => {
        const updatedPhone = phone.replace(/^0|[^0-9]/g, '')
        const whatsappLink = `https://wa.me/${updatedPhone}`;
        window.location.href = whatsappLink;
    };

    const submitHandler = (formData: any) => { addMutation.mutate({ ...formData, owner: user.uid }); setIsCreateNewPopup(false); };
    const editHandler = (formData: any) => { editMutation.mutate(formData); setIsEditModal(null); }

    const screenSize = window.innerWidth;

    return (
        <div className="page-container2">
            {(isFetching || isLoading) && <Loader />}
            {isCreateNewPopup && <CreateNewPopup submitHandler={submitHandler} close={() => setIsCreateNewPopup(false)} />}
            {isEditModal && <EditPopup data={isEditModal} submitHandler={editHandler} close={() => setIsEditModal(null)} />}
            <div className="rb margin-bottom-20">
                <div className="rbb">
                    <h1>Contacts</h1>
                    <div className="marg-l-20" />
                    {contactView === "Table" ?
                        <button onClick={() => setContactView("Board")}><TbSwitchHorizontal /></button> :
                        <button onClick={() => setContactView("Table")}><TbSwitchHorizontal /></button>}
                </div>

                <Button variant="solid" color="success" style={{ color: "#ffffff" }}
                    onPress={() => { setIsCreateNewPopup(true) }}>Add</Button>
            </div>

            {contactView == "Board" || screenSize < 1024 ?
                <ContactBoard data={data} handleWhatsappClick={handleWhatsappClick} handleCancel={handleCancel} handleDelete={handleDelete} setIsEditModal={setIsEditModal} /> :
                <ContactTable data={data} handleWhatsappClick={handleWhatsappClick} handleCancel={handleCancel} handleDelete={handleDelete} setIsEditModal={setIsEditModal} />
            }
        </div >
    );
};

export default ContactsPage;
