import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { API_URL } from "../../routes/constants";

const Login = () => {
  let navigate = useNavigate();
  const { token, setToken } = useToken();
  async function loginUser(credentials) {
    return fetch(API_URL+'/users/'+credentials.username+"/"+credentials.password, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => data.json())
   }

  const onFinish = (values) => {
    console.log("Success:", values);
    loginUser({
      username:"test",
      password:"xyz"
    }).then((val)=>{
      localStorage.setItem('token', JSON.stringify(val));
      navigate("/home");
    });
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
