import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full h-full">
      <h1 className="text-4xl font-extrabold text-green-500">DVM - HOME</h1>
      <div className="w-full h-full flex items-center justify-center gap-2">
        <Link to="/purchase" className="flex-1">
          <Button className="hover:bg-green-500 bg-green-400 h-[450px] w-full text-3xl font-semibold">
            Purchase
          </Button>
        </Link>
        <Link to="/login" className="flex-1">
          <Button className="hover:bg-green-500 bg-green-400 h-[450px] w-full text-3xl font-semibold">
            Admin Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
