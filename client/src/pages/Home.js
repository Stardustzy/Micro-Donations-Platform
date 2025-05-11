import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import Slider from "react-slick";
import { Heart, Users, Globe } from "lucide-react";
import CountUp from "react-countup";
import Blob from "../components/Blob";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [causes, setCauses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [news, setNews] = useState([]);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  useEffect(() => {
    setCauses([
      {
        id: 1,
        title: "Clean Water for All",
        description: "Help us build wells in water-scarce communities.",
        funding_goal: 10000,
        amount_raised: 6700,
        image_url: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe",
      },
      {
        id: 2,
        title: "Sponsor a Child’s Education",
        description: "Provide learning materials and school fees for children.",
        funding_goal: 15000,
        amount_raised: 11000,
        image_url: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      },
      {
        id: 3,
        title: "Medical Camp for Rural Areas",
        description: "Bring essential healthcare to remote communities.",
        funding_goal: 20000,
        amount_raised: 15400,
        image_url: "https://unsplash.com/photos/two-young-volunteers-filling-in-medical-documents-and-entering-data-in-database-while-working-in-refugee-camp-Upk6PUU2wlQ",
      },
      {
        id: 4,
        title: "Plant Trees for a Greener Earth",
        description: "Support reforestation efforts worldwide.",
        funding_goal: 12000,
        amount_raised: 8900,
        image_url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
      },
    ]);

    setTestimonials([
      {
        name: "Jane Doe",
        role: "Donor",
        text: "This platform has made it so easy to support causes I care about.",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        name: "John Smith",
        role: "Recipient",
        text: "Thanks to the generous donors, we were able to launch our education project.",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
      },
      {
        name: "Sarah Lee",
        role: "Partner",
        text: "A transparent and impactful way to make a difference.",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      {
        name: "Carlos Gomez",
        role: "Volunteer",
        text: "Amazing opportunity to help and be part of real change.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    ]);

    setNews([
      {
        title: "New Education Initiative Launched",
        text: "Helping underprivileged children access quality education.",
        image: "https://unsplash.it/400/300?image=1032",
      },
      {
        title: "Donor Spotlight: Jane Doe",
        text: "Meet one of our most consistent donors and hear her story.",
        image: "https://unsplash.it/400/300?image=1027",
      },
      {
        title: "10,000 Trees Planted",
        text: "Thanks to your donations, we've reforested acres of land.",
        image: "https://unsplash.it/400/300?image=1025",
      },
      {
        title: "Free Medical Camp Launched",
        text: "Improving lives with free medical services in rural zones.",
        image: "https://unsplash.it/400/300?image=1021",
      },
    ]);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="max-w-7xl mx-auto px-4" flex>
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-cyan-100 text-black py-20 relative overflow-hidden text-center"
      >
        <Blob position="top-left" color="#bbf7d0" />
        <Blob position="bottom-right" color="#bbf7d0" />
        <h1 className="text-4xl font-bold mb-4">Empower Change with Micro-Donations</h1>
        <p className="text-lg mb-6">
          Small contributions can make a huge impact on education, healthcare, and the environment.
        </p>
        <Link
          to="/donate"
          className="inline-block bg-green-600 hover:bg-green-700 text-black font-semibold py-3 px-6 rounded-full"
        >
          Start Donating
        </Link>
      </motion.section>

      {/* Features */}
      <section className="my-16 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[Heart, Users, Globe].map((Icon, i) => (
            <div key={i} className="flex flex-col items-center">
              <Icon size={48} className="text-green-600 mb-4" />
              <h2 className="text-lg font-semibold mb-2">
                {"Secure Donations|Community Impact|Global Reach".split("|")[i]}
              </h2>
              <p className="text-gray-600">
                {[
                  "Safe and transparent transactions for all contributions.",
                  "Support meaningful causes with small donations.",
                  "Donate from anywhere in the world.",
                ][i]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Causes */}
      <section className="my-16">
        <h2 className="text-2xl font-bold text-center mb-10">Featured Causes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {causes.map((cause) => {
            const progress = (cause.amount_raised / cause.funding_goal) * 100;
            return (
              <motion.div
                key={cause.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={cause.image_url}
                  alt={cause.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{cause.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{cause.description}</p>
                  <div className="text-sm text-gray-700 mb-1">
                    <strong>Goal:</strong> ${cause.funding_goal}
                  </div>
                  <div className="text-sm text-gray-700 mb-3">
                    <strong>Raised:</strong> ${cause.amount_raised}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <Link
                    to={`/causes/${cause.id}`}
                    className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    View Cause
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Statistics */}
      <section className="my-16">
        <h2 className="text-2xl font-bold text-center mb-10">Our Impact in Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[{ label: "Donations", value: 45000, color: "text-green-600" }, { label: "Projects", value: 120, color: "text-purple-600" }, { label: "Volunteers", value: 300, color: "text-pink-600" }].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-cyan-100 rounded-xl shadow-lg"
            >
              <div className={`text-4xl font-extrabold ${stat.color}`}>
                <CountUp end={stat.value} duration={2.5} separator="," />
              </div>
              <p className="mt-2 text-gray-700 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="my-16">
        <h2 className="text-2xl font-bold text-center mb-10">What People Say</h2>
        <Slider {...sliderSettings}>
          {testimonials.map((item, i) => (
            <div key={i} className="p-6 text-center border-t-4 border-green-600 bg-white shadow rounded">
              <img src={item.image} alt={item.name} className="mx-auto rounded-full w-24 h-24 mb-4" />
              <p className="italic text-gray-900 mb-2">"{item.text}"</p>
              <p className="font-semibold text-lg">{item.name}</p>
              <p className="text-sm text-green-600">{item.role}</p>
            </div>
          ))}
        </Slider>
      </section>

      {/* Latest News */}
      <div className="max-w-7xl mx-auto mt-16 mb-20 px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Latest News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {news.map((n, i) => (
            <div key={i} className="bg-white rounded shadow overflow-hidden hover:scale-105 transition-transform duration-300">
              <img
                src={n.image}
                alt={n.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{n.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{n.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
        className="bg-cyan-100 py-16 mt-16"
      >
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Your small contributions can change lives. Start donating or create a cause today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/donate"
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
            >
              Donate Now
            </Link>
            <Link
              to="/create-cause"
              className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-600 hover:text-white transition"
            >
              Start a Cause
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;



