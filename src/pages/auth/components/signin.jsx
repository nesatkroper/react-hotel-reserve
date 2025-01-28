import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import axiosInstance from "@/providers/axiosInstance";
import FormInput from "@/components/app/form/form-input";

const Signin = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance
        .post("/login", auth)
        .then((res) => {
          console.log(auth);
          if (res.data.status) {
            setToken(res.data.token);
            sessionStorage.setItem("baseUrl", "http://localhost:8000/");
            sessionStorage.setItem("id", res.data.user.usr_id);
            navigate("/", { replace: true });
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        onCallbackInput={handleChange}
        name="username"
        label="Username*"
        type="text"
        placeholder="devnun"
        size={300}
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
        <Checkbox id="showPassword" onCheckedChange={() => setShow(!show)} />
        <label
          htmlFor="showPassword"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {show ? "Hide" : "Show"} Password
        </label>
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
};

export default Signin;
