// ContactTable.tsx
import React from "react";
import { Popconfirm } from "antd";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { getFromStorage, addKeysToResponse } from '@/utils/utils';
import useContactsStore from "@/store/contacts";
import { FaWhatsapp, FaSms } from "react-icons/fa";
import { StatusIndicator } from "@/app/Contacts/StatusIndicator";
import SmsModalComp from "@/components/ContactsView/SmsModalComp";


interface ContactTableProps {
    data: any[];
    handleButtonClick: (phone: string) => void;
    handleDelete: (id: string) => void;
    handleCancel: () => void;
    setIsEditModal: (state: boolean) => void;
    onOpen: () => void;
}

const ContactBoard = ({ data, handleButtonClick, handleDelete, handleCancel, setIsEditModal, onOpen }: ContactTableProps) => {
    const router = useRouter();
    const setContactToEdit = useContactsStore((state) => state.setContactToEdit);
    const [showSmsModal, setShowSmsModal] = React.useState(false);
    const [selectedSMS, setSelectedSMS] = React.useState('' as string);

    const convertPhoneToWhatsapp = (phone: any) => {
        if (phone.charAt(0) === '+') return phone;
        const updatedPhone = phone.replace(/^0|[^0-9]/g, '')
        return `+972${updatedPhone}`;
    }

    const openSmsModal = (phone: string) => {
        setShowSmsModal(true);
        setSelectedSMS(convertPhoneToWhatsapp(phone));
    }

    return (<>
        {showSmsModal && <SmsModalComp setShowSmsModal={setShowSmsModal} selectedSMS={selectedSMS} />}

        <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 gap-2">
            {data.map((contact, idx) => {
                return (
                    <Card key={idx}>
                        <CardHeader className="justify-between">
                            <div className="flex gap-5">
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-small font-semibold leading-none text-default-600">{contact.name}</h4>
                                    <h5 className="text-small tracking-tight text-default-400">{contact.email} | {contact.phone}</h5>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div>
                                <h3>Notes:</h3>
                                {contact.note}
                            </div>
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
                                    <button aria-label="Delete"><img src="icons/trash.svg" alt="mail" width={20} /></button>
                                </Popconfirm>

                                <button aria-label="Edit" className="marg-l-20" onClick={() => {
                                    setContactToEdit(contact);
                                    setIsEditModal(true);
                                    onOpen();
                                }}>
                                    <img src="icons/pencil.svg" alt="mail" width={20} />
                                </button>

                                <button aria-label="Email" className="marg-l-20" onClick={() => {
                                    setContactToEdit(contact);
                                    router.push('/Email')
                                }}>
                                    <img src="icons/mail.svg" alt="mail" width={20} />
                                </button>

                                <button aria-label="Whatsapp" className="marg-l-20" onClick={() => handleButtonClick(contact.phone)}>
                                    <FaWhatsapp fontSize={18} />
                                </button>

                                <button className="marg-l-20" onClick={() => openSmsModal(contact.phone)}>
                                    <FaSms fontSize={18} />
                                </button>

                            </div>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    </>
    );
};

export default ContactBoard;
