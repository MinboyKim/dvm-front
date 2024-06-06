import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { api } from "@/api/api";
import { useToast } from "@/components/ui/use-toast";

export default function RemoveDVM() {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!id) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    try {
      const { data } = await api.post("/admin/remove-dvm", {
        id,
      });
      if (data.success) {
        toast({
          title: "DVM Removed",
          description: "DVM has been removed successfully",
        });
        navigate("/admin/dvm");
      } else {
        localStorage.setItem("error_msg", "Remove DVM Error");
        navigate("/error");
      }
    } catch (e) {
      localStorage.setItem("error_msg", "Network  Error");
      navigate("/error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="items-center flex w-full justify-between">
        <h1 className="text-4xl font-extrabold text-green-500">
          DVM - Admin Remove DVM
        </h1>
        <Link to="/admin/dvm" className="self-start">
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
