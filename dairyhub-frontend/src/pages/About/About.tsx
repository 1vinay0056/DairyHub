import {
  Leaf,
  Truck,
  ShieldCheck,
  HeartHandshake,
  Target,
  Eye,
  Users,
  Milk,
} from "lucide-react";

export default function About() {
  return (
    <section className="bg-gray-50 py-14">
      <div className="mx-auto max-w-7xl px-6">

        {/* Hero */}

        <div className="text-center">



          <p className="text-sm font-semibold uppercase tracking-[3px]">
            Fresh Dairy Products From Farm To Your Home
          </p>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-700">
            DairyHub is committed to delivering fresh, healthy,
            and organic dairy products directly from trusted farms
            to your doorstep every single day.
          </p>

        </div>

        {/* Story */}

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">

          <div>

            <h2 className="text-4xl font-bold text-black">
              Our Story
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-700">
              DairyHub started with one simple mission —
              to provide families with fresh and pure dairy products
              without compromising on quality.
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-700">
              Every product is sourced directly from carefully
              selected farms where animal health, hygiene,
              and quality standards are maintained every day.
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-700">
              Today, thousands of customers trust DairyHub
              for fresh milk, paneer, curd, butter, ghee,
              and other dairy essentials.
            </p>

          </div>

          <div className="rounded-3xl bg-green-600 p-10 text-white shadow-xl">

            <h3 className="text-3xl font-bold">
              Our Promise
            </h3>

            <p className="mt-6 text-lg leading-8">
              We believe every family deserves fresh,
              nutritious and affordable dairy products.
              That's why every order is packed fresh,
              quality checked and delivered daily.
            </p>

          </div>

        </div>

        {/* Why Choose */}

        <div className="mt-20">

          <h2 className="text-center text-4xl font-bold text-black">
            Why Choose DairyHub
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg">

              <Leaf
                size={45}
                className="mx-auto text-green-600"
              />

              <h3 className="mt-5 text-xl font-bold text-black">
                100% Organic
              </h3>

              <p className="mt-3 text-gray-600">
                Fresh products with no chemicals or preservatives.
              </p>

            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg">

              <Truck
                size={45}
                className="mx-auto text-green-600"
              />

              <h3 className="mt-5 text-xl font-bold text-black">
                Fast Delivery
              </h3>

              <p className="mt-3 text-gray-600">
                Morning doorstep delivery every day.
              </p>

            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg">

              <ShieldCheck
                size={45}
                className="mx-auto text-green-600"
              />

              <h3 className="mt-5 text-xl font-bold text-black">
                Quality Checked
              </h3>

              <p className="mt-3 text-gray-600">
                Every batch is tested before delivery.
              </p>

            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg">

              <HeartHandshake
                size={45}
                className="mx-auto text-green-600"
              />

              <h3 className="mt-5 text-xl font-bold text-black">
                Trusted Service
              </h3>

              <p className="mt-3 text-gray-600">
                Thousands of happy customers across India.
              </p>

            </div>

          </div>

        </div>

        {/* Mission & Vision */}

        <div className="mt-20 grid gap-8 lg:grid-cols-2">

          <div className="rounded-3xl bg-white p-10 shadow-lg">

            <Target
              className="text-green-600"
              size={45}
            />

            <h2 className="mt-5 text-3xl font-bold text-black">
              Our Mission
            </h2>

            <p className="mt-4 text-lg leading-8 text-gray-700">
              To provide every family with fresh,
              healthy and affordable dairy products
              while supporting local farmers.
            </p>

          </div>

          <div className="rounded-3xl bg-white p-10 shadow-lg">

            <Eye
              className="text-green-600"
              size={45}
            />

            <h2 className="mt-5 text-3xl font-bold text-black">
              Our Vision
            </h2>

            <p className="mt-4 text-lg leading-8 text-gray-700">
              To become India's most trusted
              online dairy platform delivering
              freshness and quality every day.
            </p>

          </div>

        </div>

        {/* Statistics */}

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl bg-white p-8 text-center shadow-lg">

            <Users
              className="mx-auto text-green-600"
              size={40}
            />

            <h2 className="mt-4 text-4xl font-bold text-green-700">
              20K+
            </h2>

            <p className="mt-2 text-black">
              Happy Customers
            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 text-center shadow-lg">

            <Milk
              className="mx-auto text-green-600"
              size={40}
            />

            <h2 className="mt-4 text-4xl font-bold text-green-700">
              150+
            </h2>

            <p className="mt-2 text-black">
              Partner Farms
            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 text-center shadow-lg">

            <Truck
              className="mx-auto text-green-600"
              size={40}
            />

            <h2 className="mt-4 text-4xl font-bold text-green-700">
              500+
            </h2>

            <p className="mt-2 text-black">
              Daily Deliveries
            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 text-center shadow-lg">

            <ShieldCheck
              className="mx-auto text-green-600"
              size={40}
            />

            <h2 className="mt-4 text-4xl font-bold text-green-700">
              99%
            </h2>

            <p className="mt-2 text-black">
              Customer Satisfaction
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}