import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOpenShift } from "@/app/reducer/openShiftSlicce";
import { getBanknote } from "@/app/reducer/bankNoteSlicce";
import axios from "@/providers/axiosInstance";

const OpenShift = ({ setShift }) => {
  const dispatch = useDispatch();
  const [shiftCode, setShiftCode] = useState();
  const { opeData } = useSelector((state) => state?.openshifts) || 0;
  const { banData } = useSelector((state) => state?.banknotes) || 0;
  const [data, setData] = useState({
    open_khmer_riel: 0,
    open_us_dollar: 0,
    shift_code: 0,
    employee_id: 1,
    bank_note_id: 0,
  });
  const [banknote, setBanknote] = useState({
    khmer_200K: 0,
    khmer_100K: 0,
    khmer_50K: 0,
    khmer_30K: 0,
    khmer_20K: 0,
    khmer_15K: 0,
    khmer_10K: 0,
    khmer_5K: 0,
    khmer_2K: 0,
    khmer_1K: 0,
    khmer_500: 0,
    khmer_100: 0,
    us_100: 0,
    us_50: 0,
    us_20: 0,
    us_10: 0,
    us_5: 0,
    us_1: 0,
  });

  const khmerDenominations = {
    khmer_200K: 200000,
    khmer_100K: 100000,
    khmer_50K: 50000,
    khmer_30K: 30000,
    khmer_20K: 20000,
    khmer_15K: 15000,
    khmer_10K: 10000,
    khmer_5K: 5000,
    khmer_2K: 2000,
    khmer_1K: 1000,
    khmer_500: 500,
    khmer_100: 100,
  };

  const usDenominations = {
    us_100: 100,
    us_50: 50,
    us_20: 20,
    us_10: 10,
    us_5: 5,
    us_1: 1,
  };

  useEffect(() => {
    dispatch(getOpenShift());
    dispatch(getBanknote());
  }, [dispatch]);

  const calculateTotal = (notes, denominations) => {
    return Object.keys(denominations).reduce(
      (total, key) => total + (notes[key] || 0) * denominations[key],
      0
    );
  };

  const handleBanknoteChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = parseInt(value) || 0;

    setBanknote((prev) => {
      const updatedBanknote = { ...prev, [name]: updatedValue };

      const totalKhmer = calculateTotal(updatedBanknote, khmerDenominations);
      const totalUS = calculateTotal(updatedBanknote, usDenominations);

      setData({
        open_khmer_riel: totalKhmer,
        open_us_dollar: totalUS,
        shift_code: opeData[0]?.open_shift_id + 1,
        bank_note_id: banData[0]?.bank_note_id + 1,
        employee_id: 1,
      });

      return updatedBanknote;
    });
  };

  const handleAddShiftCode = (code) => {
    setShiftCode(code);
    sessionStorage.setItem(
      "shiftcode",
      `SHIFT-${code.toString().padStart(4, "0")}`
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("/open-shift", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .post("/bank-note", banknote)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    handleAddShiftCode(opeData[0]?.open_shift_id + 1);
  };

  return (
    <AlertDialogContent>
      <form onSubmit={handleSubmit}>
        <AlertDialogHeader>
          <AlertDialogTitle>Shift Opening Details</AlertDialogTitle>
          <Separator />
        </AlertDialogHeader>
        <div className="flex justify-between my-1">
          {/* Khmer Money Section */}
          <div className="flex flex-col gap-2">
            <Label>Open Money Khmer (៛)*</Label>
            <div className="flex gap-2">
              <Input value="៛" readOnly className="w-[35px]" />
              <Input
                readOnly
                value={
                  `${new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(data?.open_khmer_riel)}` || "$ 0"
                }
                className="w-[180px]"
              />
            </div>
            <Label>Select Bank Note</Label>
            <div className="flex flex-col gap-1 border p-1 rounded-lg w-[225px]">
              {Object.keys(khmerDenominations).map((key) => (
                <div
                  key={key}
                  className="flex justify-between w-[225px] items-center px-4"
                >
                  <Label>x {khmerDenominations[key].toLocaleString()} ៛</Label>
                  <Input
                    type="number"
                    name={key}
                    value={banknote[key] || 0}
                    onChange={handleBanknoteChange}
                    className="w-[80px] h-[30px]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* US Dollar Section */}
          <div className="flex flex-col gap-2">
            <Label>Open Money Dollar ($)*</Label>
            <div className="flex gap-2">
              <Input value="$" readOnly className="w-[35px]" />
              <Input
                readOnly
                value={
                  `${new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(data?.open_us_dollar)}` || ""
                }
                className="w-[180px]"
              />
            </div>
            <Label>Select Bank Note</Label>
            <div className="flex flex-col gap-1 border p-1 rounded-lg w-[225px]">
              {Object.keys(usDenominations).map((key) => (
                <div
                  key={key}
                  className="flex justify-between w-[225px] items-center px-4"
                >
                  <Label>x ${usDenominations[key]}</Label>
                  <Input
                    type="number"
                    name={key}
                    value={banknote[key] || 0}
                    onChange={handleBanknoteChange}
                    className="w-[80px] h-[30px]"
                    min={0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between my-1">
          <div className="flex flex-col gap-2">
            <Label>Shift code*</Label>
            <Input
              value={`SHIRFT-00${data?.shift_code}`}
              name="shift_code"
              className="w-[225px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Staff Name*</Label>
            <Input
              // onChange={handleChange}
              name="product_code"
              type="text"
              value="Suon Phanun"
              disabled
              className="w-[225px]"
            />
          </div>
        </div>
        <AlertDialogFooter className="mt-3">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => setShift()} className="p-0">
            <Button type="submit" className="w-full">
              Start Open
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  );
};

export default OpenShift;
