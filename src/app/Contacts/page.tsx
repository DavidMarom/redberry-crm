"use client";

import React, { useEffect, useState } from 'react';
import http from '../../services/http';
import { Button, Card, CardBody, CardHeader, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Snippet, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, getKeyValue, useDisclosure } from '@nextui-org/react';
import { DeleteIcon } from "./DeleteIcon";

const ContactsPage = () => {
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const user = localStorage.getItem('user');
    const uid = user ? JSON.parse(user).uid : null;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentContact, setCurrentContact] = useState<any>({})


    const columns = [
        { name: "NAME", uid: "name" },
        { name: "EMAIL", uid: "email" },
        { name: "STATUS", uid: "status" },
        { name: "ACTIONS", uid: "actions" },
    ];

    const statuses = [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
        { label: "Blocked", value: "Blocked" }
    ]    
    
    const [selectValue, setSelectValue] = useState(statuses[0].value)


    useEffect(() => {
        if (localStorage.getItem('contacts') != null) {
            setContacts(JSON.parse(localStorage.getItem('contacts') ?? ''));
        }

        http.get(`contacts/${uid}`)
            .then((response: any) => {
                if (!response.data) {
                    alert('No contacts found');//To do add a proper modal

                } else {
                    setContacts(response.data);
                    localStorage.setItem('contacts', JSON.stringify(response.data));
                }
            })
            .catch((error: any) => { console.log(error) });
    }, []);

    const submitHandler = (e: any) => {
        //Throws error but execute the post
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        
        // Doesn't work with nextui2 select, cant find why. use useState for now
        //const status = e.target.status.value;
        const status = selectValue;
        const contact = {
            name,
            email,
            status,
            owner: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '').uid : null
        }
        http.post('contacts', contact)
            .then((response: any) => {
                const newContacts = [...contacts, contact];
                setContacts(newContacts as any[])
            })
            .catch((error: any) => { console.log(error) });
    }

    const handleDelete = (id: any) => {
        setLoading(true);
        http.delete(`contacts`, { data: { _id: id } })
            .then(() => {
                const newContacts = contacts.filter((el: any) => el._id !== id);
                setContacts(newContacts);
                localStorage.setItem('setContacts', JSON.stringify(newContacts));
                setLoading(false);
            })
            .catch((err) => { console.log(err) }
            )
    }


    const renderCell = React.useCallback((contact: any, columnKey: any) => {
        const cellValue = contact[columnKey];

        switch (columnKey) {
            case "name":
                return (<span>{contact.name}</span>);
            case "email":
                return (<span>{contact.email}</span>);

            case "status":
                return (<span>{contact.status}</span>);

            case "actions":
                return (
                    <div className="relative flex items-center gap-2">

                        <Tooltip color="danger" content="Delete user">
                            <Button className="text-lg text-danger cursor-pointer active:opacity-50"
                                onClick={() => {
                                    setCurrentContact(contact);
                                    onOpen();
                                }}  >
                                <DeleteIcon />
                            </Button>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div >


            {loading ? <h1>Loading...</h1> : <h1>Contacts</h1>}
            <Table isStriped aria-label="Contacts Table View">
                <TableHeader columns={columns} >
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}
                            className='text-white'>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No rows to display."} items={contacts}>
                    {(contact) => (
                        <TableRow key={contact._id}>
                            {(columnKey) => <TableCell>{renderCell(contact, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>


            <Card className='mt-12'>
                <CardHeader>
                    <h2>Add contact</h2>

                </CardHeader>
                <CardBody>
                    <form onSubmit={submitHandler}
                        className='flex flex-col justify-center items-stretch w-full flex-wrap md:flex-nowrap gap-4'>
                        <Input isRequired type="text" variant='bordered' label="Name" id='name' labelPlacement="outside" placeholder="Jane Doe" />
                        <Input isRequired type="email" variant='bordered' label="Email" id='email' labelPlacement="outside" placeholder="email@email.com" />
                        <Select isRequired
                            label="Contact Status"
                            className="max-w-xs"
                            id="status"
                            defaultSelectedKeys={[statuses[0].value]}
                            onChange={(e)=>setSelectValue(e.target.value)}
                            >
                            {statuses.map((status, index) => (
                                <SelectItem key={status.value} value={status.value}>
                                    {status.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Button color='success' type="submit">Add contact</Button>

                    </form>
                </CardBody>
            </Card>


            <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}
                size="lg" className='text-foreground'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Contact</ModalHeader>
                            <ModalBody className='justify-center items-center'>
                                <Chip color="warning">This action can't be restore! Proceed with caution! </Chip >

                                <p>
                                    Are you sure you want to delete {currentContact.name} ?
                                </p>
                            </ModalBody>
                            <ModalFooter>

                                <Button color="primary" variant="light" onPress={() => {
                                    setCurrentContact({});
                                    onClose();
                                }
                                }>
                                    Close
                                </Button>
                                <Button color="danger" onPress={() => {
                                    handleDelete(currentContact._id);
                                    setCurrentContact({});
                                    onClose();
                                }}>
                                    Delete !
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ContactsPage;

/*

                            <Popconfirm
                                    title="Are you sure you want to delete?"
                                    onConfirm={() => { handleDelete(contact._id) }}
                                    onCancel={handleCancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button style={{ backgroundColor: '#f3218a', color: 'white' }} type="primary">Delete</Button>
                                </Popconfirm>
*/
