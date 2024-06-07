// ContactTable.tsx
import React from "react";
import { Table, Popconfirm } from "antd";
import { useRouter } from 'next/navigation';
import { getFromStorage, addKeysToResponse } from '@/utils/utils';
import useContactsStore from "@/store/contacts";
import { FaWhatsapp, FaSms } from "react-icons/fa";
import { StatusIndicator } from "@/app/Contacts/StatusIndicator";
import { Card01, Popup } from "@/components/";
interface ContactTableProps {
    data: any[];
    handleButtonClick: (phone: string) => void;
    handleDelete: (id: string) => void;
    handleCancel: () => void;
    setIsEditModal: (state: boolean) => void;
    onOpen: () => void;
}

const openSmsModal = (phone: string) => {
    alert(`SMS to ${phone}`);
}

const ContactTable = ({ data, handleButtonClick, handleDelete, handleCancel, setIsEditModal, onOpen }: ContactTableProps) => {
    const router = useRouter();
    const setContactToEdit = useContactsStore((state) => state.setContactToEdit);
    const [smsModal, setSmsModal] = React.useState(false);
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
                        setContactToEdit(record);
                        setIsEditModal(true);
                        onOpen();
                    }}>
                        <img src="icons/pencil.svg" alt="mail" width={18} />
                    </button>

                    <button className="marg-l-20" onClick={() => {
                        setContactToEdit(record);
                        router.push('/Email')
                    }}>
                        <img src="icons/mail.svg" alt="mail" width={18} />
                    </button>

                    <button className="marg-l-20" onClick={() => handleButtonClick(record.phone)}>
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
            <Popup>
                <Card01 width={"450px"} height="300px" justifycontent="space-between">

                    <p>sdadsas</p>
                </Card01>
            </Popup>
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

        </>
    );
};

export default ContactTable;
