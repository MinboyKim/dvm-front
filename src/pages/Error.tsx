import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Error() {
  return (
    <div className="w-full h-full">
      <h1 className="text-4xl font-extrabold text-green-500">DVM - Error</h1>
      <div className="h-full justify-center items-center flex flex-col w-full gap-6">
        <h1 className="text-4xl font-extrabold text-green-500">
          Error: {localStorage.getItem("error_msg")}
        </h1>
        <Link to="/">
          <Button className="bg-green-400 hover:bg-green-500">Go Back</Button>
        </Link>
      </div>
    </div>
  );
}
