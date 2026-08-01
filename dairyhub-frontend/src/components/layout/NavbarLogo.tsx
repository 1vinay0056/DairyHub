const NavbarLogo = () => {
  return (
    <div className="flex items-center gap-3">

      <img
        src="https://cdn-icons-png.flaticon.com/512/2674/2674486.png"
        alt="logo"
        className="w-12 h-12"
      />

      <div>

        <h2 className="text-3xl font-bold text-black ">
          DairyHub
        </h2>

        <p className="text-sm text-black-700">
          Farm Fresh Dairy
        </p>

      </div>

    </div>
  );
};

export default NavbarLogo;