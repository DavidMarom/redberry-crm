"use client";

import React from "react";
import { Card01, Popup } from "@/components";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { createNewContactFormType, CreateNewContactFormSchema } from '@/types';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ContactsStatusType } from "./Constants";

export const EditPopup = (props: any) => {
    const submitHandler = props.submitHandler;

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateNewContactFormSchema>({
        resolver: zodResolver(createNewContactFormType),
        defaultValues: {
            name: props.data.name,
            email: props.data.email,
            phone: props.data.phone,
            note: props.data.note,
            status: props.data.status
        }
    });

    const onSubmit = async (data: CreateNewContactFormSchema) => {
        const submittedData = { ...data, _id: props.data._id , owner: props.data.owner };
        submitHandler(submittedData);
        reset();
    }

    return <Popup>
        <Card01 width={"450px"} height="400px" justifycontent="space-between">
            <h2>Edit Contact</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">

                <div className="flex flex-col gap-y-2">
                    <input  type="text" id="name" placeholder="Name" {...register("name")} />
                    {errors.name && (<p className="text-red-500 text-xs">{errors.name.message}</p>)}

                    <input  type="email" id="email" placeholder="email" {...register("email")} />
                    {errors.email && (<p className="text-red-500 text-xs">{errors.email.message}</p>)}

                    <input  type="text" id="phone" placeholder="Phone" {...register("phone")} />
                    {errors.phone && (<p className="text-red-500 text-xs">{errors.phone.message}</p>)}

                    <input  type="text" id="note" placeholder="Note" {...register("note")} />
                    {errors.note && (<p className="text-red-500 text-xs">{errors.note.message}</p>)}

                    <Select
                        items={ContactsStatusType}
                        defaultSelectedKeys={[props.data.status]}
                        label="Status"
                        placeholder="Select a status"
                        isRequired {...register('status')}>
                        {(status) => <SelectItem key={status.id}>{status.name}</SelectItem>}
                    </Select>
                    {errors.status && (<p className="text-red-500 text-xs">{errors.status.message}</p>)}

                </div>
                <Button type="submit" color="primary" disabled={isSubmitting}>Send</Button>
                <Button color="danger" variant="light" onPress={() => props.close()}>Close</Button>

            </form>


        </Card01>
    </Popup >

}

