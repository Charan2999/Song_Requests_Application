import { Form } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const SignInPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const SignInHandler = async (data) => {
    const { username, password } = data;
    try {
      const response = await axios.post(
        `https://stg.dhunjam.in/account/admin/login`,
        {
          username,
          password,
        }
      );
      console.log(response.data.data.id);
      if (response.data.response === "Success") {
        alert(response.data.response);
        navigate("/dashboard", { state: { id: response.data.data.id } });
      } else {
      }
    } catch (error) {
      alert(response.data.response);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="container">
        <div>
          <Form
            form={form}
            onFinish={SignInHandler}
            initialValues={formData}
            onValuesChange={(changedValues) =>
              handleInputChange(
                Object.keys(changedValues)[0],
                Object.values(changedValues)[0]
              )
            }
          >
            <h1>Venue Admin Login</h1>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <input
                className="input signin_inputs"
                placeholder="UserName"
                type="text"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <input
                className="input signin_inputs"
                placeholder="Password"
                type="password"
              />
            </Form.Item>
            <button type="submit">Sign In</button>
            <div>
              <Link to="/register">New Registration?</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
