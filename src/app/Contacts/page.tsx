"use client";

import React, { useEffect, useState } from 'react';
import http from '../../services/http';

const ContactsPage = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState('');

    useEffect(() => {
        http.get('users')
            .then((response: any) => {
                setUsers(response.data);
            })
            .catch((error: any) => { console.log(error) });

        http.get('users/3rrt')
                .then((response: any) => {
                    if (!response.data){
                        setUser('Not found')
                        console.log(333, response.data);
                        
                    } else{
                        setUser(response.data.userName)
                        console.log(333, response.data);
                    }
                })
                .catch((error: any) => { console.log(error) });

    }, []);

    return (
        <div>
            <h1>Contacts</h1>
            <p>All contacts</p>
            {users.map((user: any, idx: number) => (
                <p key={idx}>{user.userName}</p>
            ))}

            <p>Specific contact:</p>
            <p>{user}</p>
        </div>
    );
};

export default ContactsPage;
