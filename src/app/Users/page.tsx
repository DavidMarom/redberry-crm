"use client";

import React, { useEffect, useState } from 'react';
import http from '../../services/http';

const HomePage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        http.get('users')
            .then((response: any) => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch((error: any) => { console.log(error) });
    }, []);

    console.log(process.env.PUBLIC_DB_CONNECTION);
    console.log(process.env.NODE_ENV);

    return (
        <div>
            <h1>Users</h1>
            <p>Manage your users</p>
            <p>test: </p>{process.env.PUBLIC_DB_CONNECTION}
            <p>env: </p>{process.env.NODE_ENV}

            
                {users.map((user: any, idx: number) => (
                    <p key={idx}>{user.userName}</p>
                ))}
            
        </div>
    );
};

export default HomePage;
