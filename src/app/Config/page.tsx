"use client";
import React from 'react';
import { Select, SelectItem, Button, Input } from "@nextui-org/react";
import { Card01 } from "@/components";

const sendHandler = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    console.log(value);

}

const AboutPage = () => {
    return (
        <div>
            <h1>Config</h1>
            <form onSubmit={sendHandler}>
                <Card01 width={"400px"} height="300px" justifycontent="space-between">
                    <Input type="text" name="name" id="bizName" placeholder='Your business name' />
                    <Select label="Country" className="max-w-xs" id="country" name="country">
                        <SelectItem value="Israel" key={'Israel'}>Israel</SelectItem>
                        <SelectItem value="USA" key={'USA'}>USA</SelectItem>
                        <SelectItem value="UK" key={'UK'}>UK</SelectItem>
                        <SelectItem value="Spain" key={'Spain'}>Spain</SelectItem>
                        <SelectItem value="France" key={'France'}>France</SelectItem>
                        <SelectItem value="Italy" key={'Italy'}>Italy</SelectItem>
                        <SelectItem value="Germany" key={'Germany'}>Germany</SelectItem>
                    </Select>
                    <Button type="submit" color="primary">Save</Button>
                </Card01>
            </form>
        </div>
    );
};

export default AboutPage;
