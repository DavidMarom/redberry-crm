"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Table, Popconfirm } from "antd";
import { StatusIndicator } from "./StatusIndicator";
import { getContactsByOwner, addContact, deleteContact } from "../../services/contacts";
import { getFromStorage, addKeysToResponse } from '@/utils/utils';
import { ContactType } from '@/types';
import useContactsStore from "@/store/contacts";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, Input } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { ContactsStatusType } from "./Constants";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "@/app/layout";
import { EditContactModal } from "@/components/popups/EditContactModal";

function SubmitButton() {
    const { pending } = useFormStatus()
    return <Button color="primary" aria-disabled={pending} type="submit" isLoading={pending}>Add Contact</Button>
}

const ContactsPage = () => {
    const router = useRouter();
    const setContactToEdit = useContactsStore((state) => state.setContactToEdit);
    const user = getFromStorage("user");
    const { data, isLoading, isFetching, error } = useQuery("contacts", () => getContactsByOwner(user.uid));

    const deleteMutation = useMutation((id: string) => deleteContact(id), { onSuccess: () => { queryClient.invalidateQueries('contacts') } })
    const addMutation = useMutation((contact: ContactType) => addContact(contact), { onSuccess: () => { queryClient.invalidateQueries('contacts') } })
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isEditModal, setIsEditModal] = useState(false);

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
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Status",
            dataIndex: "status",
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
                    text: "Awaiting Call",
                    value: "Awaiting Call",
                },
            ],
            onFilter: (value: any, record: any) => record.status.indexOf(value) === 0,
            render: (val: string) => <StatusIndicator val={val} />
        },
        {
            title: "Note",
            dataIndex: "note",
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
                        <button><img src="icons/trash.svg" alt="mail" width={20} /></button>
                    </Popconfirm>

                    <button className="marg-l-20" onClick={() => {
                        setContactToEdit(record);
                        setIsEditModal(true);
                        onOpen();
                    }}>
                        <img src="icons/pencil.svg" alt="mail" width={20} />
                    </button>

                    <button className="marg-l-20" onClick={() => {
                        setContactToEdit(record);
                        router.push('/Email')
                    }}>
                        <img src="icons/mail.svg" alt="mail" width={20} />
                    </button>

                </div>
            ),
        },
    ];

    const [state, formAction] = useFormState(submitHandler, null);
    const { register } = useForm()

    return (
        <div className="page-container2">
            {isLoading ? <h1>Loading...</h1> : <h1 className="flex flex-row justify-between">Contacts
                <Button variant="solid" color="success" style={{ color: "#ffffff" }} onPress={onOpen}>New Contact</Button>
            </h1>}
            <Table
                dataSource={addKeysToResponse(data)}
                columns={columns}
                size={"small"}
                loading={isLoading}
                pagination={{
                    showSizeChanger: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`,
                    pageSizeOptions: ["5", "10", "20", "50"],
                    defaultPageSize: 10,
                    defaultCurrent: 1,
                    total: data?.length,
                    position: ["bottomCenter"],
                }}
            ></Table>
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
