import React, { useEffect, useState } from 'react';
import { Table, Button, Statistic, Spin } from 'antd';
import Columndata from '../jsons/columns.json';
import Create from './create';

const Details = (props) => {
    const { history } = props;
    const { Countdown } = Statistic;
    const [isVisible, setIsVisible] = useState(false);
    const [tableData, setTabledata] = useState([]);
    const [updateData, setUpdatedata] = useState({});
    const [isLoading, setIsloading] = useState(true);
    const [deadLine, setDeadline] = useState(null);

    setTimeout(() => {
        history.push('/');
    }, 15 * 60 * 1000);

    const deleteList = (id) => {
        fetch("http://localhost:8000/dataSource/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res) => {
            fetchData();
        })
    }
    const handleDelete = (id, e) => {
        deleteList(id);
        e.preventDefault();
    }

    const handleEdit = (record, e) => {
        setUpdatedata(record)
        setIsVisible(true)
        e.preventDefault();
    }

    const button = {
        title: "Operations",
        dataIndex: "",
        render: (text, record) => {
            return (
                <>
                    <Button onClick={(e) => handleEdit(record, e)}>Edit</Button>
                    <Button onClick={(e) => handleDelete(record.id, e)} style={{ marginLeft: '10px' }}>Delete</Button>
                </>
            );
        }
    }
    const modelVisible = () => {
        setIsVisible(true);
    };

    const fetchData = () => {
        fetch('http://localhost:8000/dataSource')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setTabledata(data);
                setIsloading(false);
            });
    }

    useEffect(() => {
        fetchData();
        Columndata.columns.push(button);
        const deadline = Date.now() + 15 * 60 * 1000;
        setDeadline(deadline);
    }, []);

    useEffect(() => {
        fetchData();
    }, [isVisible]);

    const tableOptions = () => {
        return (
            <>
                <h1>Details</h1>
                <Button
                    type="primary"
                    style={{ float: 'right' }}
                    onClick={modelVisible}
                >Add
                </Button></>
        )
    }

    return (
        <div>
            <div className="session-box" style={{ margin: 0, float: 'right' }}>
                <h3>Your Session timeout Expired at</h3>
                <p><Countdown value={deadLine} /></p>
            </div>
            <Table
                bordered
                title={tableOptions}
                dataSource={tableData}
                loading={isLoading && <Spin />}
                columns={Columndata.columns} />

            { isVisible && <Create
                updateData={updateData || {}}
                setIsVisible={setIsVisible}
                setUpdatedata={setUpdatedata}
                fetchData={fetchData} />}


        </div>
    );
}

export default Details;