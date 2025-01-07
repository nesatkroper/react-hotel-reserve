import React from "react";
import notFound from "@/assets/mp4/404-Error-Page.mp4";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col justify-center items-center h-[100vh] ">
        <video className="w-[400px] min-w-60" autoPlay loop muted>
          <source src={notFound} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Button className="mt-3">
          <Link to="/">Go Back to Home</Link>
        </Button>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
