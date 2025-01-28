import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import axiosInstance from "@/providers/axiosInstance";
import FormInput from "@/components/app/form/form-input";

const Signup = () => {
  const [show, setShow] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axiosInstance
      .post("/register", auth)
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          setToken(res.data.token);
          sessionStorage.setItem("id", res.data.user.usr_id);
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowPassword = () => {
    setShow(!show);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        onCallbackInput={handleChange}
        name="name"
        placeholder="sok san"
        label="Name"
        size={300}
        required={true}
      />
      <FormInput
        onCallbackInput={handleChange}
        name="username"
        label="Username*"
        type="text"
        placeholder="devnun"
        size={300}
        mainClass="my-3"
        required={true}
      />
      <FormInput
        onCallbackInput={handleChange}
        name="email"
        label="Email*"
        type="email"
        placeholder="someone@something.com"
        size={300}
        mainClass="my-3"
        required={true}
      />
      <FormInput
        onCallbackInput={handleChange}
        name="password"
        label="Password"
        type={show ? "password" : "text"}
        placeholder="1234"
        size={300}
        mainClass="my-3"
        required={true}
      />
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox onCheckedChange={handleShowPassword} id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {show ? "Hide" : "Show"} Password
        </label>
      </div>
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
