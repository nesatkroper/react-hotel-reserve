import Layout from "@/components/app/layout";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/app/form/form-input";
import { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";

const Test = () => {
  const socket = useRef();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    socket.current = io("http://localhost:5555");

    socket.current.on("receive_msg", (data) => {
      alert(data.message);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleSend = () => {
    socket.current.emit("send_msg", { message: msg });
  };

  const handleInputChange = (event) => {
    setMsg(event.target.value);
  };

  return (
    <Layout>
      <div className="flex gap-4">
        <FormInput
          value={msg}
          onCallbackInput={handleInputChange}
          name="send"
          label=""
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </Layout>
  );
};

export default Test;
