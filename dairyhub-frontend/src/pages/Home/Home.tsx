import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import Categories from "../../components/home/Categories";
//import FeaturedProducts from "../../components/home/FeaturedProducts";
import  WhyChooseUs from "../../components/home/WhyChooseUs";
import Testimonials from "../../components/home/Testimonials";
import Newsletter from "../../components/home/Newsletter";
import Footer from "../../components/layout/Footer";
import Subscription from "../Subscription/Subscription";
import About from "../About/About";
import Contact from "../Contact/Contact";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About/>
      <Subscription/>
       <WhyChooseUs/>
      <Contact/>
      <Newsletter />
    </>
  );
};

export default Home;