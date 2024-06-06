import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Offer() {
  return (
    <div className="w-full h-full">
      <div className="items-center flex w-full justify-between">
        <h1 className="text-4xl font-extrabold text-green-500">DVM - Offer</h1>
      </div>
      <div className="h-full mt-36 flex flex-col gap-8 items-center">
        <h1 className="text-5xl text-green-400 font-semibold">Thank you!</h1>
        <h1 className="text-2xl text-green-300 font-medium">Offered item</h1>
        <h2>item_code : {localStorage.getItem("item_code")}</h2>
        <h2>item_num : {localStorage.getItem("item_num")}</h2>
        <Link to="/">
          <Button
            className="bg-green-400 hover:bg-green-500"
            onClick={() => {
              localStorage.removeItem("item_code");
              localStorage.removeItem("item_num");
            }}
          >
            Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
}
