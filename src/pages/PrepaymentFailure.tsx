import { api } from "@/api/api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PrepaymentFailure() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/prepayment", {
        dvm_id: localStorage.getItem("dvm_id"),
        item_code: localStorage.getItem("item_code"),
        item_num: localStorage.getItem("item_num"),
      });
      if (data.success) {
        localStorage.removeItem("dvm_id");
        localStorage.removeItem("coor_x");
        localStorage.removeItem("coor_y");
        localStorage.setItem("code", data.code);
        navigate("/payment");
      } else {
        localStorage.setItem("dvm_id", data.dvm_id);
        localStorage.setItem("coor_x", data.coor_x);
        localStorage.setItem("coor_y", data.coor_y);
        navigate("/prepayment-failure");
      }
    } catch (e) {
      localStorage.setItem("error_msg", "Network Error");
      navigate("/error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-extrabold text-green-500">
          DVM - Prepayment Failure
        </h1>
      </div>
      <div className="h-full justify-center items-center flex flex-col w-full gap-6">
        <h1 className="text-3xl font-bold text-green-400">
          Sorry! There is a problem with the machine you selected 😭
        </h1>
        <h1 className="text-2xl font-medium text-green-300">
          But we have enough stock in the machine shown below
        </h1>
        <h1>ID : {localStorage.getItem("dvm_id")}</h1>
        <h1>
          Position : {localStorage.getItem("coor_x")},{" "}
          {localStorage.getItem("coor_y")}
        </h1>
        <h1 className="text-2xl font-medium text-green-300">
          Do you want to prepay?
        </h1>
        <div className="flex gap-2">
          <Button
            className="bg-green-400 hover:bg-green-500"
            onClick={handleConfirm}
            disabled={loading}
          >
            Yes
          </Button>
          <Link to="/purchase">
            <Button
              className="bg-green-400 hover:bg-green-500"
              onClick={() => {
                localStorage.removeItem("dvm_id");
                localStorage.removeItem("coor_x");
                localStorage.removeItem("coor_y");
              }}
            >
              No
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
