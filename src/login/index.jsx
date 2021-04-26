import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Checkbox, Button, message } from 'antd';
import Users from '../jsons/user.json';
import { LockOutlined, MailOutlined, GoogleOutlined, FacebookFilled } from '@ant-design/icons';

const Login = (props) => {
    const { history } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = () => {
        if (Users.users.some(user => (user.username === username && user.password === password))) {
           return history.push('/details');
        }
        else {
            message.error('Login Failed');
        }
        setUsername('');
        setPassword('');
    }

    return (
        <div className="login-bg-container">
            <div className="login-container">
                <div className="login-title">
                    <h2>LOGIN</h2>
                </div>
                <div className="login-container-box">
                    <div classNme="login-input-set">
                        <Input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Email"
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            value={username}
                        />
                    </div>
                </div>
                <div className="login-container-box">
                    <div classNme="login-input-set">
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            prefix={<LockOutlined />}
                        />
                    </div>
                </div>
                <div style={{ float: 'left' }}>
                    <Checkbox>Remember me</Checkbox>
                </div>
                <Button
                    className="btn-width"
                    onClick={handleSubmit}
                    type="primary"
                >
                    LOGIN
              </Button>
                <div style={{ marginBottom: "6%" }}>
                    <span style={{ color: "#a2a6a4" }}>Or login with</span>
                </div>
                <Button
                    className="logo-btn"
                    type="primary"
                    icon={<GoogleOutlined style={{ marginRight: '2px', color: 'red' }} />}
                >
                    {/* <img src={google} alt="BigCologo"> </img> */}
                    Google
              </Button>
                <Button
                    className="logo-btn"
                    type="primary"
                    icon={<FacebookFilled style={{ color: 'blue', marginRight: '2px' }} />}
                >
                    Facebook
              </Button>
                <div style={{ marginTop: "20%" }}>
                    <span style={{ color: "#a2a6a4" }}>Not a member? <Link to="/" style={{ color: "#a2a6a4" }}>Sign up now</Link></span>
                </div>
            </div>
        </div>
    );
};

export default Login;