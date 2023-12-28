'use client'

import React from 'react'
import { Popup, Card01 } from '../index'
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@mui/material';
import { contactFormSchema } from '@/types';
import usePopupStore from '../../store/popup';
import useContactsStore from '../../store/contacts';

export const EditContactPopup = () => {
    const triggerPopup = usePopupStore((state) => state.triggerPopup);
    const contactToEdit = useContactsStore((state) => state.contactToEdit);

    const { control, handleSubmit, formState: { errors }, setError } = useForm({ resolver: zodResolver(contactFormSchema) });

    const onSubmit = (data) => {

        console.log(data)
        // triggerPopup(0)
    }

    return (
        <Popup >
            <Card01 width='600px' height='100vh' direction='column'>
                <div className='row-between'><button onClick={() => { triggerPopup(0) }}>X</button></div>
                <h1>Edit {contactToEdit.name}</h1>
                <br /><br />

                <form onSubmit={handleSubmit(onSubmit)} width="100%">
                    <label>Name</label>
                    <Controller
                        name="name" control={control} defaultValue={contactToEdit.name}
                        render={({ field }) => (
                            <div className='error'>
                                <Input {...field} />
                                <span>{errors.name?.message}</span>
                            </div>
                        )}
                    />
                    <br /><br />

                    <label>Email</label>
                    <Controller
                        name="email" control={control} defaultValue={contactToEdit.email}
                        render={({ field }) => (
                            <div className='error'>
                                <Input {...field} />
                                <span>{errors.email?.message}</span>
                            </div>
                        )}
                    />
                    <br /><br />

                    <label>Status</label>
                    <Controller
                        name="status" control={control} defaultValue={contactToEdit.status}
                        render={({ field }) => (
                            <div >
                                <select id="status" {...field} >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Blocked">Blocked</option>
                                </select>
                                <span className='error'>{errors.status?.message}</span>
                            </div>
                        )}
                    />
                    <br /><br />



                    <Button type="submit">Save</Button>
                </form>

                <div />
            </Card01>
        </Popup>
    )
}

