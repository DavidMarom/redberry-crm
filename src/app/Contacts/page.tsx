"use client";

import React, { useEffect, useState } from 'react';
import { Table } from 'antd'
import { Col } from '@/components'
import { columns } from './columns.js';
import http from '../../services/http';

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);
    const user = localStorage.getItem('user');
    const uid = user ? JSON.parse(user).uid : null;

    useEffect(() => {
        if (localStorage.getItem('contacts') != null) {
            setContacts(JSON.parse(localStorage.getItem('contacts') ?? ''));
        }

        http.get(`contacts/${uid}`)
            .then((response: any) => {
                if (!response.data) {
                    alert('No contacts found');

                } else {
                    setContacts(response.data);
                    localStorage.setItem('contacts', JSON.stringify(response.data));
                }
            })
            .catch((error: any) => { console.log(error) });
    }, []);

    const submitHandler = (e: any) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const status = e.target.status.value;

        const contact = {
            name,
            email,
            status,
            owner: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '').uid : null
        }

        http.post('contacts', contact)
            .then((response: any) => {
                const newContacts = [...contacts, contact];
                setContacts(newContacts as never[])
            })
            .catch((error: any) => { console.log(error) });
    }

    return (
        <div>
            <h1>Contacts</h1>
            <Table
                dataSource={contacts}
                columns={columns}
                size={'small'}
                loading={contacts.length === 0}
                pagination={{
                    showSizeChanger: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    pageSizeOptions: ['5', '10', '20', '50'],
                    defaultPageSize: 5,
                    defaultCurrent: 1,
                    total: contacts.length,
                    position: ['bottomCenter']
                }}
            >
            </Table>


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


                    <button className='button' type="submit">Add contact</button>
                </Col>
            </form>
        </div>
    );
};

export default ContactsPage;
