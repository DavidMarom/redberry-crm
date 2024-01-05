"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Table } from "antd";
import { StatusIndicator } from "./StatusIndicator";
import { Popconfirm } from "antd";
import { getContactsByOwner, addContact, deleteContact } from "../../services/contacts";
import { dataExpired, updateLastFetch, setToStorage, getFromStorage, addKeysToResponse } from '@/utils/utils';
import { ContactsType } from '@/types';
import usePopupStore from "@/store/popup";
import useContactsStore from "@/store/contacts";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, Input } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button color="primary" aria-disabled={pending} type="submit" isLoading={pending}>Add Contact </Button>
    )
}

const ContactsStatusType = [
    {
        id: 'Active',
        name: 'Active',
    },
    {
        id: 'Inactive',
        name: 'Inactive',
    },
    {
        id: 'Blocked',
        name: 'Blocked',
    },
    {
        id: 'Awaiting Call',
        name: 'Awaiting Call',
    }
]
const ContactsPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const setContacts = useContactsStore((state) => state.setContacts);
    const contacts = useContactsStore((state) => state.contacts);
    const triggerPopup = usePopupStore((state) => state.triggerPopup);
    const setContactToEdit = useContactsStore((state) => state.setContactToEdit);
    const user = getFromStorage("user");

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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


    const submitHandler = (prevState: any, formData: FormData) => {
        setLoading(true);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const note = formData.get('note');
        const status = formData.get('status');
        const owner = user.uid;
        const contact = { name, email, phone, status, owner, note };

        addContact(contact)
            .then((response: any) => {
                setLoading(false);
                const newContact = { ...contact, _id: response.insertedId }
                const newContacts = [...contacts, newContact];
                setContacts(newContacts as never[]);
                setToStorage("contacts", newContacts);
            })
            .catch((err) => { console.log(err) });

        onClose();
    };

    const handleDelete = (id: string) => {
        setLoading(true);
        deleteContact(id)
            .then(() => {
                setLoading(false)
                const newContacts = contacts.filter((contact: any) => contact._id !== id);
                setContacts(newContacts);
                setToStorage("contacts", newContacts);
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
    const [state, formAction] = useFormState(submitHandler, null);
    const { register } = useForm()

    return (
        <div className="page-container2">
            {loading ? <h1>Loading...</h1> : <h1 className="flex flex-row justify-between">Contacts
                <Button variant="solid" color="success" style={{ color: "#ffffff" }} onPress={onOpen}>New Contact</Button>
            </h1>}
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form action={formAction}>
                                <ModalHeader className="flex flex-col gap-1">New Contacts</ModalHeader>
                                <ModalBody>

                                    <Input isRequired label="Name"  {...register('name')} />
                                    <Input type="email" label="Email"  {...register('email')} />
                                    <Input type="phone" label="Phone" {...register('phone')} />
                                    <Input type="text" label="Notes" {...register('note')} />

                                    <Select
                                        items={ContactsStatusType}
                                        label="Contact Status"
                                        placeholder="Select a status"
                                        className=""
                                        isRequired
                                        {...register('status')}
                                    >
                                        {(status) => <SelectItem key={status.id}>{status.name}</SelectItem>}
                                    </Select>
                                </ModalBody>
                                <ModalFooter>

                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <SubmitButton />
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div >
    );
};

export default ContactsPage;
