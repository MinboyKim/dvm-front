import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div className="w-full h-full">
      <div className="items-center flex w-full justify-between">
        <h1 className="text-4xl font-extrabold text-green-500">
          DVM - Admin Home
        </h1>
        <Link to="/" className="self-start">
          <Button className="text-green-700 bg-green-200 hover:bg-green-300">
            Logout
          </Button>
        </Link>
      </div>
      <div className="w-full h-full flex items-center justify-center gap-2">
        <Link to="/admin/stock" className="flex-1">
          <Button className="hover:bg-green-500 bg-green-400 h-[450px] w-full text-3xl font-semibold">
            Manage Stock
          </Button>
        </Link>
        <Link to="/admin/dvm" className="flex-1">
          <Button className="hover:bg-green-500 bg-green-400 h-[450px] w-full text-3xl font-semibold">
            Manage other DVMs
          </Button>
        </Link>
      </div>
    </div>
  );
}
