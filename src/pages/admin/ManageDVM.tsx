import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ManageDVM() {
  return (
    <div className="w-full h-full">
      <div className="items-center flex w-full justify-between">
        <h1 className="text-4xl font-extrabold text-green-500">
          DVM - Admin Manage DVM
        </h1>
        <Link to="/admin" className="self-start">
          <Button className="text-green-700 bg-green-200 hover:bg-green-300">
            Back
          </Button>
        </Link>
      </div>
      <div className="w-full h-full flex items-center justify-center gap-2">
        <Link to="/admin/add" className="flex-1">
          <Button className="hover:bg-green-500 bg-green-400 h-[450px] w-full text-3xl font-semibold">
            Add DVM
          </Button>
        </Link>
        <Link to="/admin/remove" className="flex-1">
          <Button className="hover:bg-green-500 bg-green-400 h-[450px] w-full text-3xl font-semibold">
            Remove DVM
          </Button>
        </Link>
      </div>
    </div>
  );
}
