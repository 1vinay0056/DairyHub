import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Loader2,
  MapPin,
  User,
  Phone,
  Home,
  Landmark,
  CreditCard,
} from "lucide-react";

import { State, City } from "country-state-city";

import { getCart } from "../../services/cartServices";
import { placeOrder } from "../../services/orderServices";

interface CartItem {
  product_id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export default function Checkout() {
  const location = useLocation();

const isSubscription =
  location.state?.isSubscription || false;

const subscriptionPlan =
  location.state?.subscriptionPlan;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [paymentMethod, setPaymentMethod] =
    useState<"COD" | "ONLINE">("COD");

  const [cities, setCities] = useState<any[]>([]);

  const indianStates =
    State.getStatesOfCountry("IN");

  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    house: "",
    area: "",
    landmark: "",
    pincode: "",
    state: "",
    city: "",
  });

  const loadCart = async () => {
    try {
      setLoading(true);

      const data = await getCart();

      setCartItems(data.items || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

const subtotal = isSubscription
  ? Number(subscriptionPlan.price)
  : cartItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "state") {
      const selectedState =
        indianStates.find(
          (state) => state.name === value
        );

      if (selectedState) {
        const cityList =
          City.getCitiesOfState(
            "IN",
            selectedState.isoCode
          );

        setCities(cityList);
      }
    }
  };

  useEffect(() => {
    const fetchPin = async () => {
      if (address.pincode.length !== 6)
        return;

      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${address.pincode}`
        );

        const result = await response.json();

        if (
          result[0].Status === "Success"
        ) {
          const office =
            result[0].PostOffice[0];

          const state =
            office.State;

          const city =
            office.District;

          const area =
            office.Name;

          setAddress((prev) => ({
            ...prev,
            state,
            city,
            area,
          }));

          const selectedState =
            indianStates.find(
              (s) => s.name === state
            );

          if (selectedState) {
            setCities(
              City.getCitiesOfState(
                "IN",
                selectedState.isoCode
              )
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPin();
  }, [address.pincode]);

  const handlePlaceOrder =
    async () => {
      if (
        !address.fullName ||
        !address.mobile ||
        !address.house ||
        !address.area ||
        !address.state ||
        !address.city ||
        !address.pincode
      ) {
        alert(
          "Please fill all required fields."
        );

        return;
      }

      if (
        address.mobile.length !== 10
      ) {
        alert(
          "Enter valid mobile number."
        );

        return;
      }

      try {
        setPlacingOrder(true);

        const fullAddress = `
${address.house},
${address.area},
${address.city},
${address.state},
${address.pincode}

Landmark:
${address.landmark}
`;

        const response =
          await placeOrder({
            address: fullAddress,
            payment_method:
              paymentMethod,
          });

        alert(response.message);

        navigate("/orders");
      } catch (error: any) {
        alert(
          error?.response?.data
            ?.detail ||
            "Unable to place order."
        );
      } finally {
        setPlacingOrder(false);
      }
    };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">

        <Loader2
          size={45}
          className="animate-spin text-green-600"
        />

      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-10">

      <div className="mx-auto max-w-3xl px-5">
                {/* Delivery Address */}

        <div className="rounded-xl bg-white p-5 shadow-md">

          <div className="mb-5 flex items-center gap-3">

            <MapPin
              className="text-green-600"
              size={24}
            />

            <div>

              <h2 className="text-xl font-bold">
                Delivery Address
              </h2>

              <p className="text-sm text-gray-500">
                Enter your complete delivery address
              </p>

            </div>

          </div>

          <div className="space-y-4">

            {/* Full Name */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-medium">

                <User size={18} />

                Full Name

              </label>

              <input
                type="text"
                name="fullName"
                value={address.fullName}
                onChange={handleChange}
                placeholder="Enter Full Name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-600"
              />

            </div>

            {/* Mobile */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-medium">

                <Phone size={18} />

                Mobile Number

              </label>

              <input
                type="tel"
                name="mobile"
                maxLength={10}
                value={address.mobile}
                onChange={handleChange}
                placeholder="Enter Mobile Number"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-600"
              />

            </div>

            {/* House */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-medium">

                <Home size={18} />

                House / Flat No.

              </label>

              <input
                type="text"
                name="house"
                value={address.house}
                onChange={handleChange}
                placeholder="Flat No / House No"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-600"
              />

            </div>

            {/* Area */}

            <div>

              <label className="mb-2 text-sm font-medium">
                Area / Street
              </label>

              <input
                type="text"
                name="area"
                value={address.area}
                onChange={handleChange}
                placeholder="Area / Street"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-600"
              />

            </div>

            {/* PIN */}

            <div>

              <label className="mb-2 text-sm font-medium">
                PIN Code
              </label>

              <input
                type="text"
                name="pincode"
                maxLength={6}
                value={address.pincode}
                onChange={handleChange}
                placeholder="Enter PIN Code"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-600"
              />

              <p className="mt-1 text-xs text-gray-500">
                State, City and Area will be auto-filled after entering a valid PIN code.
              </p>

            </div>

            {/* State */}

            <div>

              <label className="mb-2 text-sm font-medium">
                State
              </label>

              <select
                name="state"
                value={address.state}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-green-600"
              >

                <option value="">
                  Select State
                </option>

                {indianStates.map((state) => (

                  <option
                    key={state.isoCode}
                    value={state.name}
                  >
                    {state.name}
                  </option>

                ))}

              </select>

            </div>

            {/* City */}

            <div>

              <label className="mb-2 text-sm font-medium">
                City
              </label>

              <select
                name="city"
                value={address.city}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-green-600"
              >

                <option value="">
                  Select City
                </option>

                {cities.map((city) => (

                  <option
                    key={city.name}
                    value={city.name}
                  >
                    {city.name}
                  </option>

                ))}

              </select>

            </div>

            {/* Landmark */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-medium">

                <Landmark size={18} />

                Landmark (Optional)

              </label>

              <input
                type="text"
                name="landmark"
                value={address.landmark}
                onChange={handleChange}
                placeholder="Nearby Landmark"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-600"
              />

            </div>

          </div>

        </div>
                {/* Payment Method */}

        <div className="mt-5 rounded-xl bg-white p-5 shadow-md">

          <div className="mb-5 flex items-center gap-3">

            <CreditCard
              className="text-green-600"
              size={24}
            />

            <div>

              <h2 className="text-xl font-bold">
                Payment Method
              </h2>

              <p className="text-sm text-gray-500">
                Choose your payment option
              </p>

            </div>

          </div>

          {/* COD */}

          <label className="mb-3 flex cursor-pointer items-center justify-between rounded-lg border border-green-500 bg-green-50 p-4">

            <div>

              <h3 className="font-semibold">
                Cash On Delivery
              </h3>

              <p className="text-sm text-gray-500">
                Pay after delivery
              </p>

            </div>

            <input
              type="radio"
              checked={paymentMethod === "COD"}
              onChange={() =>
                setPaymentMethod("COD")
              }
            />

          </label>

          {/* Razorpay */}

          <label className="flex cursor-not-allowed items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-4 opacity-60">

            <div>

              <h3 className="font-semibold">
                Razorpay
              </h3>

              <p className="text-sm text-gray-500">
                UPI • Card • Wallet
              </p>

            </div>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
              Coming Soon
            </span>

          </label>

        </div>

        {/* Bill Summary */}

        <div className="mt-5 rounded-xl bg-white p-5 shadow-md">

          <h2 className="mb-4 text-xl font-bold">
            Bill Summary
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">

              <span className="text-gray-600">
                Subtotal
              </span>

              <span>
                ₹{subtotal}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-600">
                GST (5%)
              </span>

              <span>
                ₹{gst}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-600">
                Delivery
              </span>

              <span className="font-semibold text-green-600">
                FREE
              </span>

            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold">

              <span>Total</span>

              <span className="text-green-700">
                ₹{total}
              </span>

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-5 flex gap-4">

          <button
            onClick={() => navigate("/cart")}
            className="flex-1 rounded-lg border border-gray-300 py-3 font-semibold transition hover:bg-gray-100"
          >
            Back to Cart
          </button>

          <button
            disabled={placingOrder}
            onClick={handlePlaceOrder}
            className="flex-1 rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
          >

            {placingOrder ? (

              <div className="flex items-center justify-center gap-2">

                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Placing...

              </div>

            ) : (

              `Place Order • ₹${total}`

            )}

          </button>

        </div>

      </div>

    </section>
  );
}