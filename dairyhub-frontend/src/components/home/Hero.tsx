import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";

import heroBg from "../../assets/images/hero-bg.png";
import cow from "../../assets/images/cow.png";
import bottle from "../../assets/images/bottle.png";
import splash from "../../assets/images/milk-splash.png";

const Hero = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/75 via-white/25 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-8 pt-24">

<div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 min-h-[62vh]">
          {/* LEFT CONTENT */}
          <div className="relative z-40 flex h-full items-center">
            <HeroContent />
          </div>

          {/* RIGHT IMAGES */}
          <div className="relative h-[600px] w-full">

            {/* Cow */}
            <img
              src={cow}
              alt="Cow"
              className="
                absolute
                bottom-14
                left-8
                h-[520px]
                object-contain
                z-10
              "
            />

            {/* Bottle */}
            <img
              src={bottle}
              alt="Bottle"
              className="
                absolute
                bottom-0
                right-0
                left-30
                h-[430px]
                object-contain
                z-30
                 -scale-x-100
              "
            />

          </div>

        </div>

      </div>

      {/* Milk Splash */}
      <img
        src={splash}
        alt="Milk Splash"
        className="
          absolute
          -bottom-12
          -left-5
          w-full
          object-cover
          z-20
          -scale-x-140
          pointer-events-none
        "
      />

      {/* Stats Card */}
      <div className="relative z-50">
        <HeroStats />
      </div>

    </section>
  );
};

export default Hero;