import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Purchase from "./pages/Purchase";
import Code from "./pages/Code";
import Select from "./pages/Select";
import Payment from "./pages/Payment";
import Offer from "./pages/Offer";
import AdminHome from "./pages/admin/AdminHome";
import Stock from "./pages/admin/Stock";
import ManageDVM from "./pages/admin/ManageDVM";
import AddDVM from "./pages/admin/AddDVM";
import RemoveDVM from "./pages/admin/RemoveDVM";
import Error from "./pages/Error";
import Prepayment from "./pages/Prepayment";
import PrepaymentConfirm from "./pages/PrepaymentConfirm";
import PrepaymentFailure from "./pages/PrepaymentFailure";
import PrepaymentPayment from "./pages/PrepaymentPayment";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="purchase" element={<Purchase />} />
        <Route path="code" element={<Code />} />
        <Route path="select" element={<Select />} />
        <Route path="payment" element={<Payment />} />
        <Route path="offer" element={<Offer />} />
        <Route path="payment-pre" element={<PrepaymentPayment />} />
        <Route path="prepayment" element={<Prepayment />} />
        <Route path="prepayment-confirm" element={<PrepaymentConfirm />} />
        <Route path="prepayment-failure" element={<PrepaymentFailure />} />
        <Route path="*" element={<Error />} />
      </Route>

      <Route path="/admin" element={<Layout />}>
        <Route path="/admin" index element={<AdminHome />} />
        <Route path="stock" element={<Stock />} />
        <Route path="dvm" element={<ManageDVM />} />
        <Route path="add" element={<AddDVM />} />
        <Route path="remove" element={<RemoveDVM />} />
      </Route>
    </>,
  ),
);
