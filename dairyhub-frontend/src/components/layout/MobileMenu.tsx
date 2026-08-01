import { NavLink } from "react-router-dom";

interface MobileMenuProps {
  open: boolean;
}

const MobileMenu = ({ open }: MobileMenuProps) => {
  if (!open) return null;

  return (
    <div className="lg:hidden bg-white border-t">
      <div className="flex flex-col p-5 gap-4">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/subscription">Subscription</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </div>
  );
};

export default MobileMenu;