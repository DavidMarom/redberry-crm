import React from "react";
import { Table, Popconfirm } from "antd";
import { useRouter } from 'next/navigation';
import { addKeysToResponse } from '@/utils/utils';
import useContactsStore from "@/store/contacts";
import { FaWhatsapp, FaSms } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { StatusIndicator } from "@/app/Contacts/StatusIndicator";
import SmsModalComp from "@/components/ContactsView/SmsModalComp";
import { convertPhoneToGlobal } from '@/utils/contactsUtils';

interface ContactTableProps {
    data: any[];
    handleWhatsappClick: (phone: string) => void;
    handleDelete: (id: string) => void;
    handleCancel: () => void;
    setIsEditModal: (state: any) => void;
}

const ContactTable = ({ data, handleWhatsappClick, handleDelete, handleCancel, setIsEditModal }: ContactTableProps) => {
    const router = useRouter();
    const setContactToEdit = useContactsStore((state) => state.setContactToEdit);
    const [showSmsModal, setShowSmsModal] = React.useState(false);
    const [selectedSMS, setSelectedSMS] = React.useState('' as string);

    const openSmsModal = (phone: string) => { setShowSmsModal(true); setSelectedSMS(convertPhoneToGlobal(phone)); }

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
                    <Popconfirm title="Are you sure you want to delete?" onConfirm={() => { handleDelete(record._id) }} onCancel={handleCancel} okText="Yes" cancelText="No">
                        <button><img src="icons/trash.svg" alt="mail" width={18} /></button>
                    </Popconfirm>

                    <button className="marg-l-20" onClick={() => {
                        setIsEditModal(record);
                    }}>
                        <img src="icons/pencil.svg" alt="mail" width={18} />
                    </button>

                    <button className="marg-l-20" onClick={() => {
                        setContactToEdit(record);
                        router.push('/Email')
                    }}>
                        <LuMail fontSize={18} />

                    </button>

                    <button className="marg-l-20" onClick={() => handleWhatsappClick(record.phone)}>
                        <FaWhatsapp fontSize={18} />
                    </button>

                    <button className="marg-l-20" onClick={() => openSmsModal(record.phone)}>
                        <FaSms fontSize={18} />
                    </button>

                </div>
            ),
        },
    ];


    return (
        <>
            {showSmsModal && <SmsModalComp setShowSmsModal={setShowSmsModal} selectedSMS={selectedSMS} />}
            <div className="font-arial">
                <Table
                    dataSource={addKeysToResponse(data)}
                    columns={columns}
                    size={"small"}
                    pagination={{
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        pageSizeOptions: ["5", "10", "20", "50"],
                        defaultPageSize: 20,
                        defaultCurrent: 1,
                        total: data?.length,
                        position: ["bottomCenter"],
                    }}
                ></Table>
            </div>

        </>
    );
};

export default ContactTable;
