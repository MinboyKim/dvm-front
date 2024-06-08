import { api } from "@/api/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PrepaymentFailure() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/prepayment", {
        dvm_id: localStorage.getItem("dvm_id"),
        item_code: localStorage.getItem("item_code"),
        item_num: localStorage.getItem("item_num"),
      });
      if (data.success) {
        localStorage.setItem("code", data.code);
        navigate("/prepayment-confirm");
      } else if (!data.dvm_id) {
        try {
          const { data: refund_data } = await api.post("/refund", {
            item_code: localStorage.getItem("item_code"),
            item_num: localStorage.getItem("item_num"),
            card_data: localStorage.getItem("card_data"),
          });
          if (refund_data.success) {
            toast({
              title: "Refund",
              description: "Refund successful",
            });
          } else {
            toast({
              title: "Refund",
              description: "Refund failed",
              variant: "destructive",
            });
          }
        } catch (e) {
          toast({
            title: "Refund",
            description: "Network Error",
            variant: "destructive",
          });
        }
        localStorage.setItem(
          "error_msg",
          "There are no machines left with stock",
        );
        navigate("/error");
      } else {
        localStorage.setItem("dvm_id", data.dvm_id);
        localStorage.setItem("coor_x", data.coor_x);
        localStorage.setItem("coor_y", data.coor_y);
      }
    } catch (e) {
      localStorage.setItem("error_msg", "Network Error");
      navigate("/error");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/refund", {
        item_code: localStorage.getItem("item_code"),
        item_num: localStorage.getItem("item_num"),
        card_data: localStorage.getItem("card_data"),
      });
      if (data.success) {
        toast({
          title: "Refund",
          description: "Refund successful",
        });
      } else {
        toast({
          title: "Refund",
          description: "Refund failed",
          variant: "destructive",
        });
      }
      localStorage.removeItem("dvm_id");
      localStorage.removeItem("coor_x");
      localStorage.removeItem("coor_y");
      localStorage.removeItem("item_code");
      localStorage.removeItem("item_num");
      localStorage.removeItem("card_data");
      navigate("/purchase");
    } catch (e) {
      toast({
        title: "Refund",
        description: "Network Error",
        variant: "destructive",
      });
      navigate("/prepayment-failure");
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
          But we also have enough stock in the machine shown below
        </h1>
        <h1>ID : {localStorage.getItem("dvm_id")}</h1>
        <h1>
          Position : {localStorage.getItem("coor_x")},{" "}
          {localStorage.getItem("coor_y")}
        </h1>
        <h1 className="text-2xl font-medium text-green-300">
          Do you want to prepay for this machine?
        </h1>
        <div className="flex gap-2">
          <Button
            className="bg-green-400 hover:bg-green-500"
            onClick={handleConfirm}
            disabled={loading}
          >
            Yes
          </Button>
          <Button
            className="bg-green-400 hover:bg-green-500"
            onClick={handleReject}
            disabled={loading}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
}
