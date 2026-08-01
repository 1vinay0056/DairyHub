import Button from "../ui/Button";
import { Truck, Leaf, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const HeroContent = () => {
  const navigate = useNavigate();
  return (
    <div className="relative z-40 flex h-full w-full flex-col items-center justify-start pt-0 text-center">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">
        <Leaf size={16} />
        <span>100% Pure & Organic</span>
      </div>

      {/* Heading */}
      <h1 className="mt-0 text-6xl font-extrabold leading-tight lg:text-7xl">

        <span className="text-green-700">
          Farm Fresh Milk
        </span>

        <br />

        <span className="text-black">
          Delivered Daily
        </span>

      </h1>

      {/* Description */}
      <p className="mt-0 max-w-xl text-lg leading-8 text-black">
        Pure, healthy and natural dairy products delivered directly
        from trusted farms to your doorstep every morning.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex justify-center gap-4">

        <Button
  size="lg"
  className="rounded-xl px-8 py-3"
  onClick={() => navigate("/products")}
>
  Shop Now
  <ArrowRight className="ml-2" size={18} />
</Button>

        <Button
          variant="outline"
          size="lg"
          className="rounded-xl px-8 py-3"
          onClick={() => navigate("/subscription")}
        >
          Subscribe
        </Button>

      </div>

      {/* Features */}

      <div className="mt-8 flex justify-center gap-8">

        <div className="flex items-center gap-3">

          <div className="rounded-full bg-green-100 p-3">
            <Truck
              size={20}
              className="text-green-700"
            />
          </div>

          <div className="text-left">

            <h4 className="font-semibold text-black">
              Free Delivery
            </h4>

            <p className="text-sm text-gray-600">
              Orders Above ₹499
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="rounded-full bg-green-100 p-3">
            <Leaf
              size={20}
              className="text-green-700"
            />
          </div>

          <div className="text-left">

            <h4 className="font-semibold text-black">
              Organic
            </h4>

            <p className="text-sm text-gray-600">
              No Chemicals
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="rounded-full bg-green-100 p-3">
            <ShieldCheck
              size={20}
              className="text-green-700"
            />
          </div>

          <div className="text-left">

            <h4 className="font-semibold text-black">
              Quality
            </h4>

            <p className="text-sm text-gray-600">
              Lab Tested
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default HeroContent;