"use client";

import React, { useState } from 'react';
import { getNotesByOwner, addNote, deleteNote } from "../../services/notes";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "@/app/layout";
import Image from "next/image";

const NotesPage = () => {

    const user = localStorage.getItem("user");
    const uid = user ? JSON.parse(user).uid : null;
    const { data, isLoading, isFetching, error } = useQuery("notes", () => getNotesByOwner(uid));
    const [input, setInput] = useState("");
    const [disabled, setDisabled] = useState(false);

    const deleteMutation = useMutation((id: string) => deleteNote(id), { onSuccess: () => { setDisabled(false); queryClient.invalidateQueries('notes') } })
    const addMutation = useMutation((note: any) => addNote(note), { onSuccess: () => { queryClient.invalidateQueries('notes') } })
    const handleChange = (event: any) => { setInput(event.target.value) }
    const submitHandler = () => { addMutation.mutate({ text: input, owner: uid }) }

    return (
        <div className='full-width'>
            {isFetching || isLoading || disabled ? <h1>Loading...</h1> : <h1>Notes</h1>}
            <div className='grid-container '>
                <div className='grid-item'>
                    <textarea onChange={handleChange} value={input} />
                    <div className='row-r'>
                        <button onClick={submitHandler}>
                            <Image src="icons/enter.svg" alt="Enter" width={22} height={22} />
                        </button>
                    </div>
                </div>
                {
                    data && data.map((note: any) => (
                        <div className='grid-item' key={note._id}>
                            <button className="row-r" onClick={() => { setDisabled(true); deleteMutation.mutate(note._id) }}><Image src="/x.svg" alt="Close" width={18} height={18} /></button>
                            {deleteMutation.isError && <div>Something went wrong</div>}
                            <div>{note.text}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default NotesPage;
