import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/app/reducer/user-slice";
import FormInput from "@/components/app/form/form-input";
import axiosAuth from "@/providers/axios-auth";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usrData } = useSelector((state) => state.users);
  const [show, setShow] = useState(true);
  const { setToken } = useAuth();
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosAuth
        .post("/login", auth)
        .then((res) => {
          if (res.data.status) {
            setToken(res.data.data.token);
            sessionStorage.setItem("token", res.data.data.token);
            sessionStorage.setItem("role", res.data.data.user.auth.role_id);

            navigate("/", { replace: true });
          }
          console.log(res);
        })
        .then(() => {
          dispatch(getUser());
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(usrData);

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        onCallbackInput={handleChange}
        name="email"
        label="Email*"
        type="email"
        placeholder="devnun"
        size={300}
        required={true}
      />
      <FormInput
        onCallbackInput={handleChange}
        name="password"
        label="Password*"
        type={show ? "text" : "password"}
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
