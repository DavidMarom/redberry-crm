import { Button, Popconfirm } from "antd";

const handleDelete = (id) => {
    alert('delete ' + id)
}

export const columns = [
    {
        title: 'Name',
        width: "300px",
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        width: "300px",
        key: 'email',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    }
];