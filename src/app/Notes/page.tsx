"use client";

import React, { useState } from 'react';
import { getNotesByOwner, addNote, deleteNote } from "../../services/notes";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Image from "next/image";
import { LuArrowRight } from "react-icons/lu";

const NotesPage = () => {
    const queryClient = useQueryClient();
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
            <div className='notes-grid-container '>
                <div className='grid-item'>
                    <textarea onChange={handleChange} value={input} />
                    <div className='row-r'>
                        <button onClick={submitHandler}>
                            <LuArrowRight style={{
                                color: 'white',
                                backgroundColor: '#6FC21C',
                                width: '46px',
                                height: '30px',
                                borderRadius: '5px',
                                gap: '10px',
                                padding: '5px'
                            }} />
                        </button>
                    </div>
                </div>
                {
                    data && data.map((note: any) => (
                        <div className='grid-item' key={note._id}>
                            <button className="row-r" onClick={() => { setDisabled(true); deleteMutation.mutate(note._id) }}><Image src="icons/trash.svg" alt="Delete" width={18} height={18} /></button>
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
