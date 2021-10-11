import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Card } from 'antd';
import { loginAction } from '../app/appActions';
import { isAuthorizedSelector } from '../app/appSelector';
import logo from '../../assets/logo.jpg';

const Login = ({ login, isAuthorized, history }) => {
  useEffect(() => {
    if (isAuthorized) {
      history.push('/dashboard');
    }
  }, [isAuthorized]);

  return (
    <div style={{ margin: '0% 40%', height: 'inherit', paddingTop: '10%' }}>
      <Card>
        <NavLink to={'/login'} className="white">
          <div className="logo-single" style={{ padding: 32 }}>
            <img src={logo} />
          </div>
        </NavLink>
        <Form
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={(values) => {
            login(values);
          }}
        >
          <Form.Item name="username" initialValue="root" rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" initialValue="12345" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthorized: isAuthorizedSelector(state)
  };
};

const mapDispatchToProps = {
  login: loginAction
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
