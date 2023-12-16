"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Col } from "@/components";
import { StatusIndicator } from "./StatusIndicator";
import { Button, Popconfirm } from "antd";
import http from "../../services/http";

import { getContactsByOwner } from "../../services/contacts";
import useNavigationStore from "@/store/navigation";

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);
    const isContactsLoading = useNavigationStore((state) => state.isContactsLoading);
    const setContactLoading = useNavigationStore((state) => state.setContactLoading);
    const unsetContactLoading = useNavigationStore((state) => state.unsetContactLoading);
    
    const user = localStorage.getItem("user");
    const uid = user ? JSON.parse(user).uid : null;

    useEffect(() => {
        if (localStorage.getItem("contacts") != null) {
            setContacts(JSON.parse(localStorage.getItem("contacts") ?? ""));
        }

        getContactsByOwner(uid);

        // http.get(`contacts/${uid}`)
        //     .then((response: any) => {
        //         setLoading(false);
        //         if (!response.data) {
        //             alert("No contacts found");
        //         } else {
        //             setContacts(response.data);
        //             localStorage.setItem("contacts", JSON.stringify(response.data));
        //         }
        //     })
        //     .catch((error: any) => {
        //         setLoading(false);
        //         console.log(error);
        //     });
    }, []);

    const submitHandler = (e: any) => {
        e.preventDefault();
        setContactLoading();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const status = e.target.status.value;

        const contact = {
            name,
            email,
            status,
            owner: localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user") ?? "").uid
                : null,
        };

        http.post("contacts", contact)
            .then((response: any) => {
                unsetContactLoading();
                const newContact = { ...contact, _id: response.data.insertedId }
                const newContacts = [...contacts, newContact];
                setContacts(newContacts as never[]);
                localStorage.setItem("contacts", JSON.stringify(newContacts));
            })
            .catch((error: any) => {
                unsetContactLoading();
                console.log(error);
            });
    };

    const handleDelete = (id: any) => {
        setContactLoading();
        http.delete(`contacts`, { data: { _id: id } })
            .then(() => {
                const newContacts = contacts.filter(
                    (contact: any) => contact._id !== id
                );
                setContacts(newContacts);
                localStorage.setItem("contacts", JSON.stringify(newContacts));
                unsetContactLoading();
            })
            .catch((err) => {
                unsetContactLoading();
                console.log(err);
            });
    };

    const handleCancel = () => { console.log("Action cancelled") };

    const columns = [
        {
            title: "",
            dataIndex: "_id",
            key: "_id",
            width: "1px",
            render: () => "",
        },
        {
            title: "Name",
            width: "300px",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            width: "300px",
            key: "email",
        },
        {
            title: "Status",
            dataIndex: "status",
            width: "200px",
            key: "status",
            render: (val: string) => <StatusIndicator val={val} />
        },
        {
            title: "Action",
            key: "action",
            render: (text: any, record: any) => (
                <div className="row">

                    <Popconfirm
                        title="Are you sure you want to delete?"
                        onConfirm={() => {
                            handleDelete(record._id);
                        }}
                        onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            style={{ backgroundColor: "#f3218a", color: "white" }}
                            type="primary"
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];


    return (
        <div>
            {isContactsLoading ? <h1>Loading...</h1> : <h1>Contacts</h1>}
            <Table
                dataSource={contacts}
                columns={columns}
                size={"small"}
                loading={isContactsLoading}
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

            <h2>Add contact</h2>
            <form onSubmit={submitHandler}>
                <Col>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />

                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" />

                    <label htmlFor="status">Select an option:</label>
                    <select id="status">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    {isContactsLoading ? <p>Loading...</p> : <button className="button" type="submit">
                        Add contact
                    </button>}

                </Col>
            </form>
        </div>
    );
};

export default ContactsPage;
