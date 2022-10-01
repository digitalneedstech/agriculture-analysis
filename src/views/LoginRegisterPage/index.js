import React, { useState } from 'react';
import { Card } from 'antd';
import Login from './Login';
import Register from './Register';
import "./style.scss";

const tabListNoTitle = [
    {
      key: 'login',
      tab: 'Login',
    },
    {
      key: 'register',
      tab: 'Register',
    },
  ];
  
  

function LoginRegisterPage() {
    const [activeTabKey, setActiveTabKey] = useState('login');
  const contentListNoTitle = {
    login: <Login/>,
    register: <Register />,
  };
    const onTabChange = key => {
      setActiveTabKey(key);
    };
  
    return (
      <div className="login-register-page">
        <Card
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey}
          onTabChange={key => {
            onTabChange(key);
          }}
        >
          {contentListNoTitle[activeTabKey]}
        </Card>
      </div>
    );
}

export default LoginRegisterPage;
