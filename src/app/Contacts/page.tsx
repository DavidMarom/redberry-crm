"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Table } from "antd";
import { Col } from "@/components";
import { StatusIndicator } from "./StatusIndicator";
import { Popconfirm } from "antd";
import { getContactsByOwner, addContact, deleteContact } from "../../services/contacts";
import { dataExpired, updateLastFetch, setToStorage, getFromStorage, addKeysToResponse } from '@/utils/utils';
import { ContactsType } from '@/types';
import usePopupStore from "@/store/popup";
import useContactsStore from "@/store/contacts";

const ContactsPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const setContacts: (contacts: any[]) => void = useContactsStore((state) => state.setContacts);
    const contacts = useContactsStore((state) => state.contacts);
    const triggerPopup = usePopupStore((state) => state.triggerPopup);
    const setContactToEdit = useContactsStore((state) => state.setContactToEdit);
    const user = getFromStorage("user");

    useEffect(() => {
        if (getFromStorage("contacts")) { setContacts(getFromStorage("contacts") ?? "") }

        if (dataExpired() || !getFromStorage("contacts")) {
            updateLastFetch();
            getContactsByOwner(user.uid).then((response: ContactsType) => {
                setContacts(addKeysToResponse(response));
                setToStorage("contacts", addKeysToResponse(response));
            });
        }
    }, []);


    const submitHandler = (e: any) => {
        e.preventDefault();
        setLoading(true);
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const note = e.target.note.value;
        const status = e.target.status.value;
        const owner = user.uid;
        const contact = { name, email, phone, status, owner, note };

        addContact(contact)
            .then((response: any) => {
                setLoading(false);
                const newContact = { ...contact, _id: response.insertedId }
                const newContacts = [...contacts, newContact];
                setContacts(newContacts as never[]);
                localStorage.setItem("contacts", JSON.stringify(newContacts));
            })
            .catch((err) => { console.log(err) });
    };

    const handleDelete = (id: string) => {
        setLoading(true);
        deleteContact(id)
            .then(() => {
                setLoading(false)
                const newContacts = contacts.filter((contact: any) => contact._id !== id);
                setContacts(newContacts);
                localStorage.setItem("contacts", JSON.stringify(newContacts));
            })
            .catch((err) => { console.log(err) });
    };

    const handleCancel = () => { console.log("Action cancelled") };

    const columns = [
        {
            title: "",
            dataIndex: "_id",
            key: "_id",
            width: "0px",
            render: () => null,
        },
        {
            title: '',
            dataIndex: 'key',
            key: 'key',
            width: "1px",
            render: () => null,
        },
        {
            title: "Name",
            // width: "280px",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            // width: "300px",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            // width: "150px",
            key: "phone",
        },
        {
            title: "Status",
            dataIndex: "status",
            // width: "190px",
            key: "status",
            filters: [
                {
                    text: "Active",
                    value: "Active",
                },
                {
                    text: "Inactive",
                    value: "Inactive",
                },
                {
                    text: "Blocked",
                    value: "Blocked",
                },
                {
                    text: "Awaiting call",
                    value: "Awaiting call",
                },
            ],
            onFilter: (value: any, record: any) => record.status.indexOf(value) === 0,
            render: (val: string) => <StatusIndicator val={val} />
        },
        {
            title: "Note",
            dataIndex: "note",
            // width: "150px",
            key: "note",
        },
        {
            title: "",
            key: "action",
            width: "150px",
            render: (text: any, record: any) => (
                <div className="row">
                    <Popconfirm
                        title="Are you sure you want to delete?"
                        onConfirm={() => { handleDelete(record._id) }}
                        onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button><img src="/trash.svg" alt="mail" width={20} /></button>
                    </Popconfirm>

                    <button className="marg-l-20" onClick={() => {
                        setContactToEdit(record);
                        triggerPopup(1);
                    }}>
                        <img src="/pencil.svg" alt="mail" width={20} />
                    </button>

                    <button className="marg-l-20" onClick={() => {
                        setContactToEdit(record);
                        router.push('/Email')
                    }}>
                        <img src="/mail.svg" alt="mail" width={20} />
                    </button>

                </div>
            ),
        },
    ];

    return (
        <div className="page-container2">
            {loading ? <h1>Loading...</h1> : <h1>Contacts</h1>}
            <Table
                dataSource={contacts}
                columns={columns}
                size={"small"}
                loading={loading}
                pagination={{
                    showSizeChanger: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`,
                    pageSizeOptions: ["5", "10", "20", "50"],
                    defaultPageSize: 5,
                    defaultCurrent: 1,
                    total: contacts.length,
                    position: ["bottomCenter"],
                }}
            ></Table>

            <form onSubmit={submitHandler}>
                <Col height="150px" width="auto">
                    <h2>Add a contact:</h2>
                    <div className="contact-grid-container">
                        <input type="text" name="name" id="name" className="width-90-p" placeholder="Name" />
                        <input type="text" name="email" id="email" className="width-90-p" placeholder="Email" />
                        <input type="text" name="phone" id="phone" className="width-90-p" placeholder="Phone" />
                        <input type="text" name="note" id="note" className="width-90-p" placeholder="Note" />
                        <select id="status" className="width-90-p">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Blocked">Blocked</option>
                            <option value="Awaiting call">Awaiting call</option>
                        </select>
                        {loading ? <p>Loading...</p> : <button className="button" type="submit">Add it ☝️</button>}
                    </div>
                </Col>
            </form>
        </div>
    );
};

export default ContactsPage;
