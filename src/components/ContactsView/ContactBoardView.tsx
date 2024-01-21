// ContactTable.tsx
import React from "react";
import { Popconfirm } from "antd";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

import { useRouter } from 'next/navigation';
import { getFromStorage, addKeysToResponse } from '@/utils/utils';
import useContactsStore from "@/store/contacts";
import { FaWhatsapp } from "react-icons/fa";
import { StatusIndicator } from "@/app/Contacts/StatusIndicator";

interface ContactTableProps {
    data: any[];
    handleButtonClick: (phone: string) => void;
    handleDelete: (id: string) => void;
    handleCancel: () => void;
    setIsEditModal: (state: boolean) => void;
    onOpen: () => void;

}

const ContactBoard = ({ data
    , handleButtonClick, handleDelete, handleCancel, setIsEditModal, onOpen }: ContactTableProps) => {
    const router = useRouter();
    const setContactToEdit = useContactsStore((state) => state.setContactToEdit);



    return (
        <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 gap-2">
            {data.map((contact) => {
                return <Card>
                    <CardHeader className="justify-between">
                        <div className="flex gap-5">
                            <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{contact.name}</h4>
                                <h5 className="text-small tracking-tight text-default-400">{contact.email} | {contact.phone}</h5>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p>
                            <h3>Notes:</h3>
                            {contact.note}
                        </p>
                        <StatusIndicator val={contact.status} />
                    </CardBody>
                    <CardFooter>
                        <div className="row">
                            <Popconfirm
                                title="Are you sure you want to delete?"
                                onConfirm={() => { handleDelete(contact._id) }}
                                onCancel={handleCancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <button><img src="icons/trash.svg" alt="mail" width={20} /></button>
                            </Popconfirm>

                            <button className="marg-l-20" onClick={() => {
                                setContactToEdit(contact);
                                setIsEditModal(true);
                                onOpen();
                            }}>
                                <img src="icons/pencil.svg" alt="mail" width={20} />
                            </button>

                            <button className="marg-l-20" onClick={() => {
                                setContactToEdit(contact);
                                router.push('/Email')
                            }}>
                                <img src="icons/mail.svg" alt="mail" width={20} />
                            </button>

                            <button className="marg-l-20" onClick={() => handleButtonClick(contact.phone)}>
                                <FaWhatsapp fontSize={20} />
                            </button>

                        </div>
                    </CardFooter>
                </Card>
            })}
        </div>
    );
};

export default ContactBoard;
