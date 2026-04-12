"use client";

import React, { useState } from "react";
import { getFromStorage } from '@/utils/utils';
import { CreateNewPopup } from "./CreateNewPopup";
import { EditPopup } from "./EditPopup";
import { Button } from "@nextui-org/react";
import { Loader } from '@/components';
import ContactTable from './ContactTableView';
import ContactBoard from './ContactBoardView';
import { TbSwitchHorizontal } from "react-icons/tb";
import { useContacts } from './useContacts';


const ContactsPage = () => {
    const user = getFromStorage("user");
    const { contacts, isLoading, isFetching, addContact, deleteContact, editContact } = useContacts(user.uid);

    const [isCreateNewPopup, setIsCreateNewPopup] = useState(false);
    const [isEditModal, setIsEditModal] = useState(null);
    const [contactView, setContactView] = useState(window.innerWidth > 1024 ? "Table" : "Board")

    const handleDelete = (id: string) => { deleteContact(id); };
    const handleCancel = () => { console.log("Action cancelled") };
    const handleWhatsappClick = (phone: string) => {
        const updatedPhone = phone.replace(/^0|[^0-9]/g, '')
        const whatsappLink = `https://wa.me/${updatedPhone}`;
        window.location.href = whatsappLink;
    };

    const submitHandler = (formData: any) => { addContact({ ...formData, owner: user.uid }); setIsCreateNewPopup(false); };
    const editHandler = (formData: any) => { editContact(formData); setIsEditModal(null); }

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
                <ContactBoard data={contacts} handleWhatsappClick={handleWhatsappClick} handleCancel={handleCancel} handleDelete={handleDelete} setIsEditModal={setIsEditModal} /> :
                <ContactTable data={contacts} handleWhatsappClick={handleWhatsappClick} handleCancel={handleCancel} handleDelete={handleDelete} setIsEditModal={setIsEditModal} />
            }
        </div >
    );
};

export default ContactsPage;
