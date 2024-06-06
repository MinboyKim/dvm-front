import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Purchase() {
  return (
    <div className="w-full h-full">
      <div className="items-center flex w-full justify-between">
        <h1 className="text-4xl font-extrabold text-green-500">
          DVM - Purchase
        </h1>
        <Link to="/" className="self-start">
          <Button className="text-green-700 bg-green-200 hover:bg-green-300">
            Back
          </Button>
        </Link>
      </div>
      <div className="w-full h-full flex items-center justify-center gap-2">
        <Link to="/select" className="flex-1">
          <Button className="hover:bg-green-500 bg-green-400 h-[450px] w-full text-3xl font-semibold">
            Select item
          </Button>
        </Link>
        <Link to="/code" className="flex-1">
          <Button className="hover:bg-green-500 bg-green-400 h-[450px] w-full text-3xl font-semibold">
            I have a code!
          </Button>
        </Link>
      </div>
    </div>
  );
}
