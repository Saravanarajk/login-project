import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Input, Modal } from 'antd';


const Create = (props) => {
    const { setIsVisible, updateData, fetchData, setUpdatedata } = props;
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [isEdit, setIsedit] = useState(false);
    const [erroerMsg, setErrormsg] = useState(false);

    const createList = () => {
        const data = {
            "name": name,
            "age": age,
            "address": address
        }
        fetch("http://localhost:8000/dataSource", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() => {
            setName('');
            setAge('');
            setAddress('');
            fetchData();
        });
    }

    const updateList = (id) => {
        const data = {
            "name": name,
            "age": age,
            "address": address
        }
        fetch("http://localhost:8000/dataSource/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                setName('');
                setAge('');
                setAddress('');
                fetchData();
            });
    }

    useEffect(() => {
        if (!isEmpty(updateData)) {
            setName(updateData.name);
            setAge(updateData.age);
            setAddress(updateData.address);
            setIsedit(true);
        }
    }, []);

    const handleOk = (props) => {
        if(name === '' || age === '' || address === ''){
            setErrormsg(true);
        }
        else {
            if (isEdit) {
                updateList(updateData.id);
                setIsModalVisible(false);
                setIsVisible(false);
                setIsedit(false);
            } else {
                createList();
                setIsModalVisible(false);
                setIsVisible(false);
                setIsedit(false);
            }
        }
        setUpdatedata({});
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsVisible(false);
        setIsedit(false);
        setUpdatedata({});
    };
    const validationDiv = (field, name) => {
        let result = field;
        if(field === ''){
            console.log(result)
            return <span ><p style={{ color:"red"}}>{`please enter your ${name}`}</p></span>
        }
    }
    return (
        <div>
            <Modal title={isEdit ? 'Edit Detail' : 'Create Detail'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <label>Name</label>
                <Input
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                ></Input>
                {erroerMsg && validationDiv(name, 'name')}
                <label>Age</label>
                <Input
                    type="text"
                    name="age"
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                ></Input>
                {erroerMsg && validationDiv(age, 'age')}
                <label>Address</label>
                <Input
                    type="text"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                ></Input>
                {erroerMsg && validationDiv(address, 'address')}
            </Modal>
        </div >
    )
}

export default Create;