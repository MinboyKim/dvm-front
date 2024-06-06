import { api } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Code() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    try {
      const { data } = await api.post("/code", {
        code,
      });
      if (data.success) {
        localStorage.setItem("item_code", data.item_code);
        localStorage.setItem("item_num", data.item_num);
        navigate("/offer");
      } else {
        localStorage.setItem("error_msg", "Code Error");
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
        <h1 className="text-4xl font-extrabold text-green-500">DVM - Code</h1>
        <Link to="/purchase" className="self-start">
          <Button className="text-green-700 bg-green-200 hover:bg-green-300">
            Back
          </Button>
        </Link>
      </div>
      <div className="h-full justify-center items-center flex flex-col w-full gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="code">CODE</Label>
          <Input
            id="code"
            className="w-[600px]"
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
