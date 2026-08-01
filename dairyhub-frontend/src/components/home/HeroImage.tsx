const HeroImage = () => {
  return (
    <div className="flex justify-center">

      <img
        src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=700"
        alt="Fresh Milk"
        className="
          w-full
          max-w-lg
          rounded-3xl
          shadow-2xl
          object-cover
        "
      />

    </div>
  );
};

export default HeroImage;