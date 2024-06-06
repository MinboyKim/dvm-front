import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/api/api";

export default function Stock() {
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
      const { data } = await api.post("/admin/stock", {
        item_code: code,
        item_num: num,
      });
      if (data.success) {
        localStorage.setItem("item_code", data.item_code);
        localStorage.setItem("item_num", data.item_num);
        navigate("/payment");
      } else {
        localStorage.setItem("error_msg", "Stock Error");
        navigate("/error");
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
      <div className="items-center flex w-full justify-between">
        <h1 className="text-4xl font-extrabold text-green-500">
          DVM - Manage Stock
        </h1>
        <Link to="/admin" className="self-start">
          <Button className="text-green-700 bg-green-200 hover:bg-green-300">
            Back
          </Button>
        </Link>
      </div>
      <div className="h-full justify-center items-center flex flex-col w-full gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="code">item_code</Label>
          <Input
            id="code"
            className="w-[600px]"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="num">item_num</Label>
          <Input
            id="num"
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
