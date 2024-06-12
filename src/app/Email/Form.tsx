"use client";

import React from "react";
import { formSchema, formTypes } from '@/types';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { getFromStorage } from "@/utils/utils";
import useContactsStore from "@/store/contacts";

export const Form = () => {
    const contactToEdit = useContactsStore((state) => state.contactToEdit);

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<formSchema>({
        resolver: zodResolver(formTypes),
        defaultValues: {
            email: contactToEdit?.email,
            recipientName: contactToEdit?.name,
            fromName: getFromStorage('user').bizName ? getFromStorage('user').bizName : '',
        },
    });

    const onSubmit = async (data: formSchema) => {
        fetch("/api/send-mail", {
            method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json", },
        });
        alert("Email sent!");
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2 w-96">
            <p>{contactToEdit.mailFields}</p>
            <p>{contactToEdit.nameFields}</p>
            <input type="email" id="email" placeholder="email" {...register("email")} />
            {errors.email && (<p className="text-red-500 text-xs">{errors.email.message}</p>)}

            <br />
            <input type="text" id="recipientName" placeholder="Recipient Name" {...register("recipientName")} />
            {errors.recipientName && <span>{errors.recipientName.message}</span>}
            <br />
            <input type="text" id="fromName" placeholder="From (your name)" {...register("fromName")} />
            {errors.fromName && <span>{errors.fromName.message}</span>}
            <br />
            <input type="text" id="subject" placeholder="Email Subject" {...register("subject")} />
            {errors.subject && <span>{errors.subject.message}</span>}
            <br />
            <input type="text" id="bodyTitle" placeholder="Body Title"  {...register("bodyTitle")} />
            {errors.bodyTitle && <span>{errors.bodyTitle.message}</span>}
            <br />
            <textarea id="body" placeholder="Body" {...register("body")} />
            {errors.body && <span>{errors.body.message}</span>}

            <br />
            <Button type="submit" color="primary" disabled={isSubmitting}>Send</Button>
        </form>
    );
}