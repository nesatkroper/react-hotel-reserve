import Layout from "@/components/app/layout";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <Layout>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </Layout>
    </>
  );
};

export default Dashboard;
