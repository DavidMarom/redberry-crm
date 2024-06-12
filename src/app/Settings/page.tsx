"use client";
import React, { useEffect, useState } from 'react';
import { Select, SelectItem, Button, Input } from "@nextui-org/react";
import { Card01 } from "@/components";
import { updateUser, getUser } from "@/services/users";
import { getFromStorage, setToStorage } from "@/utils/utils";

const SettingsPage = () => {
    const [bizName, setBizName] = useState(getFromStorage('user').bizName ? getFromStorage('user').bizName : '');
    const [country, setCountry] = useState('');

    useEffect(() => {
        setCountry('' + getFromStorage('user').country);
    }, []);

    const sendHandler = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        updateUser(getFromStorage('user').uid, value);
        if (value.bizName) { setBizName('' + value.bizName); setToStorage('user', { ...getFromStorage('user'), bizName: value.bizName }) }
        if (value.country) { setCountry('' + value.country) }
    }

    return (
        <div>
            <h1>Settings</h1>

            <form onSubmit={sendHandler}>
                <Card01 width={"450px"} height="300px" justifycontent="space-between">
                    <p className="input-label">Business Name:</p>
                    <Input
                        type="text"
                        name="bizName"
                        id="bizName"
                        placeholder='Your business name'
                        value={bizName}
                        onChange={(e) => { setBizName(e.target.value) }}
                    />

                    <Select label="Country" id="country" name="country" value={country} selectedKeys={[country]} onChange={(e) => { setCountry(e.target.value) }}>
                        <SelectItem value="Israel" key={'Israel'}>Israel</SelectItem>
                        <SelectItem value="USA" key={'USA'}>USA</SelectItem>
                        <SelectItem value="UK" key={'UK'}>UK</SelectItem>
                        <SelectItem value="Spain" key={'Spain'}>Spain</SelectItem>
                        <SelectItem value="France" key={'France'}>France</SelectItem>
                        <SelectItem value="Italy" key={'Italy'}>Italy</SelectItem>
                        <SelectItem value="Germany" key={'Germany'}>Germany</SelectItem>
                    </Select>
                    <Button type="submit" color="success" style={{ color: "#ffffff" }}>Save</Button>
                </Card01>
            </form>

            <br />

            <p>v 1.7</p>

        </div >
    );
};

export default SettingsPage;
