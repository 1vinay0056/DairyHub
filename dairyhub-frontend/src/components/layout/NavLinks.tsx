import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Subscription", path: "/subscription" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const NavLinks = () => {
  return (
    <div className="hidden lg:flex items-center gap-10 ml-12">      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) =>
  isActive
    ? "font-bold text-green-700 border-b-2 border-green-700 pb-1"
    : "font-bold text-black hover:text-green-700 transition duration-300"
}
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;