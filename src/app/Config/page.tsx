"use client";
import React, { useEffect, useState } from 'react';
import { Select, SelectItem, Button, Input } from "@nextui-org/react";
import { Card01 } from "@/components";
import { updateUser, getUser } from "@/services/users";
import { getFromStorage } from "@/utils/utils";

const AboutPage = () => {
    const [bizName, setBizName] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        getUser(getFromStorage('user').uid).then((res) => {
            setBizName(res.bizName);
            setCountry(res.country);
        });
    }, []);

    const sendHandler = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        updateUser(getFromStorage('user').uid, value);
        if (value.bizName) { setBizName('' + value.bizName) }
        if (value.country) { setCountry('' + value.country) }
    }

    return (
        <div>
            <h1>Config</h1>

            <form onSubmit={sendHandler}>
                <Card01 width={"450px"} height="300px" justifycontent="space-between">
                    <h2>Update</h2>
                    <p className="input-label">Business Name:</p>
                    <Input
                        type="text" name="bizName" id="bizName" placeholder='Your business name' value={bizName} onChange={(e) => { setBizName(e.target.value) }} />
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

            <p>v 1.5</p>

        </div >
    );
};

export default AboutPage;
