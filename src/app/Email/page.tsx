"use client";
import React from 'react';
import { Card01 } from '@/components';
import { Form } from './Form';

const Email = () => {

    return (
        <div className="page-container2">
            <h1>Emails are not available at the moment</h1> 
            <div className='row'>
            <Card01 width="auto">
                <Form />
            </Card01>
            </div>
        </div >
    );
};

export default Email;
