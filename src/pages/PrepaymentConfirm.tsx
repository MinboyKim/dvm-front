import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PrepaymentConfirm() {
  return (
    <div className="w-full h-full">
      <h1 className="text-4xl font-extrabold text-green-500">
        DVM - Prepayment Confirm
      </h1>
      <div className="h-full justify-center items-center flex flex-col w-full gap-6">
        <h1 className="text-4xl font-extrabold text-green-300">
          Prepayment Code : {localStorage.getItem("code")}
        </h1>
        <h1 className="text-4xl font-extrabold text-green-300">
          Go to the machine shown below and enter the code
        </h1>
        <h1 className="text-4xl font-extrabold text-green-300">
          Machine ID : {localStorage.getItem("dvm_id")}
        </h1>
        <h1 className="text-4xl font-extrabold text-green-300">
          Coordinates: {localStorage.getItem("coor_x")},{" "}
          {localStorage.getItem("coor_y")}
        </h1>
        <Link to="/">
          <Button
            className="bg-green-400 hover:bg-green-500"
            onClick={() => {
              localStorage.removeItem("code");
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
