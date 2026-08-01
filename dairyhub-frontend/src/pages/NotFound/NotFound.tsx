import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center py-24">
      <h1 className="text-7xl font-bold">404</h1>

      <p className="mt-4 text-xl">
        Page Not Found
      </p>

      <Link
        to="/"
        className="inline-block mt-8 bg-teal-600 text-white px-6 py-3 rounded"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;