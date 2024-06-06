import { api } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Payment() {
  const [cardData, setCardData] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/payment", {
        card_data: cardData,
        item_code: localStorage.getItem("item_code"),
        item_num: localStorage.getItem("item_num"),
      });
      if (data.success) {
        if (localStorage.getItem("code")) {
          navigate("/prepayment-confirm");
        } else {
          navigate("/offer");
        }
      } else {
        localStorage.setItem("error_msg", "Payment Error");
        localStorage.removeItem("item_code");
        localStorage.removeItem("item_num");
        navigate("/error");
      }
    } catch (e) {
      localStorage.setItem("error_msg", "Network Error");
      localStorage.removeItem("item_code");
      localStorage.removeItem("item_num");
      navigate("/error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="items-center flex w-full justify-between">
        <h1 className="text-4xl font-extrabold text-green-500">
          DVM - Payment
        </h1>
        <Link to="/select" className="self-start">
          <Button className="text-green-700 bg-green-200 hover:bg-green-300">
            Back
          </Button>
        </Link>
      </div>
      <div className="h-full justify-center items-center flex flex-col w-full gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="card-data">Card data</Label>
          <Input
            id="card-data"
            className="w-[600px]"
            value={cardData}
            onChange={(e) => setCardData(e.target.value)}
          />
        </div>
        <Button
          onClick={handleSubmit}
          className="bg-green-400 hover:bg-green-500"
          disabled={loading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
