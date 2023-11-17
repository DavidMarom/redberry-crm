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


    return (
        <div>
            <h1>Users</h1>
            <p>Manage your users</p>

            
                {users.map((user: any, idx: number) => (
                    <p key={idx}>{user.userName}</p>
                ))}
            
        </div>
    );
};

export default HomePage;
