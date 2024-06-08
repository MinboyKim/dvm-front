import { api } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Select() {
  const [code, setCode] = useState("");
  const [num, setNum] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code || !num) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    try {
      const { data } = await api.post("/select", {
        item_code: code,
        item_num: num,
      });
      if (data.stock) {
        localStorage.setItem("item_code", code);
        localStorage.setItem("item_num", num);
        navigate("/payment");
      } else if (data.prepayment) {
        localStorage.setItem("item_code", code);
        localStorage.setItem("item_num", num);
        localStorage.setItem("dvm_id", data.dvm_id);
        localStorage.setItem("coor_x", data.coor_x);
        localStorage.setItem("coor_y", data.coor_y);
        navigate("/payment-pre");
      } else {
        localStorage.setItem("error_msg", "No Stock");
        navigate("/error");
      }
    } catch (e) {
      localStorage.setItem("error_msg", "Select Error");
      navigate("/error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-extrabold text-green-500">DVM - Select</h1>
        <Link to="/purchase" className="self-start">
          <Button className="text-green-700 bg-green-200 hover:bg-green-300">
            Back
          </Button>
        </Link>
      </div>
      <div className="h-full justify-center items-center flex flex-col w-full gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="item_code">item_code</Label>
          <Input
            id="item_code"
            className="w-[600px]"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="item_num">item_num</Label>
          <Input
            id="item_num"
            className="w-[600px]"
            value={num}
            onChange={(e) => setNum(e.target.value)}
          />
        </div>
        <Button
          className="bg-green-400 hover:bg-green-500"
          onClick={handleSubmit}
          disabled={loading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
