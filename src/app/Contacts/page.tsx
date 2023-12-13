"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Col } from "@/components";
import { Button, Popconfirm } from "antd";
import http from "../../services/http";

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = localStorage.getItem("user");
    const uid = user ? JSON.parse(user).uid : null;

    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem("contacts") != null) {
            setContacts(JSON.parse(localStorage.getItem("contacts") ?? ""));
        }

        http
            .get(`contacts/${uid}`)
            .then((response: any) => {
                setLoading(false);
                if (!response.data) {
                    alert("No contacts found");
                } else {
                    setContacts(response.data);
                    localStorage.setItem("contacts", JSON.stringify(response.data));
                }
            })
            .catch((error: any) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    const submitHandler = (e: any) => {
        e.preventDefault();
        setLoading(true);
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

        http
            .post("contacts", contact)
            .then((response: any) => {
                setLoading(false);
                const newContact = { ...contact, _id: response.data.insertedId }
                const newContacts = [...contacts, newContact];
                // const newContacts = [...contacts, contact, { _id: response.data.insertedId }];
                setContacts(newContacts as never[]);
            })
            .catch((error: any) => {
                setLoading(false);
                console.log(error);
            });
    };

    const handleDelete = (id: any) => {
        setLoading(true);
        http
            .delete(`contacts`, { data: { _id: id } })
            .then(() => {
                const newContacts = contacts.filter(
                    (contact: any) => contact._id !== id
                );
                setContacts(newContacts);
                localStorage.setItem("contacts", JSON.stringify(newContacts));
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
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
        },
        {
            title: "Action",
            key: "action",
            render: (text: any, record: any) => (
                <div className="row">
                    {/* <Button style={{ backgroundColor: '#2196F3', color: 'white' }} type="primary" onClick={() => {
                    router.push(`/Admin/${record._id}`)
                }}
                >Edit</Button> */}

                    {/* <div className="w-space-sm" /> */}

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

                    {loading ? <p>Loading...</p> : <button className="button" type="submit">
                        Add contact
                    </button>}

                </Col>
            </form>
        </div>
    );
};

export default ContactsPage;
