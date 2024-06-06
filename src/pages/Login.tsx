import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = () => {
    if (id !== "admin" || pwd !== "admin") {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
      setId("");
      setPwd("");
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="w-full h-full">
      <div className="items-center flex w-full justify-between">
        <h1 className="text-4xl font-extrabold text-green-500">
          DVM - ADMIN LOGIN
        </h1>
        <Link to="/" className="self-start">
          <Button className="text-green-700 bg-green-200 hover:bg-green-300">
            Back
          </Button>
        </Link>
      </div>
      <div className="h-full justify-center items-center flex flex-col w-full gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="id">ID</Label>
          <Input
            id="id"
            className="w-[600px]"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="pwd">PASSWORD</Label>
          <Input
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            id="pwd"
            className="w-[600px]"
            type="password"
          />
        </div>
        <Button
          className="bg-green-400 hover:bg-green-500"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
