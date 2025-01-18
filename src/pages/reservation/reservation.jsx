/**
 * @component RESERVATION
 * @description A COMPONENT THAT RENDERS THE HOTEL RESERVATION INTERFACE USING A LAYOUT WRAPPER.
 * @returns {JSX.Element} A REACT COMPONENT THAT DISPLAYS THE FRONT DESK RESERVATION SYSTEM WITHIN THE MAIN LAYOUT
 * @example
 * ```jsx
 * <RESERVATION />
 * ```
 */
import Layout from "@/components/app/layout";
import FrontDesk from "./components/reservation-frontdesk2";

const Resevation = () => {
  return (
    <>
      <Layout>
        <FrontDesk />
      </Layout>
    </>
  );
};

export default Resevation;
