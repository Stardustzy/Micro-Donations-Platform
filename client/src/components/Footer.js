import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import {
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Youtube,
    Home,
    User,
    ClipboardList
} from "lucide-react";
import logo from "../assets/micro-logo.jpg";

const Footer = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [inView, controls]);

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const quickLinks = [
        { name: "Home", link: "/", icon: <Home size={18} className="inline-block mr-2" /> },
        { name: "Causes", link: "/causes", icon: <ClipboardList size={18} className="inline-block mr-2" /> },
        { name: "Register", link: "/register", icon: <User size={18} className="inline-block mr-2" /> },
    ];

    const socialLinks = [
        { icon: <Facebook className="w-6 h-6" />, link: "https://facebook.com/microdonationskenya" },
        { icon: <Twitter className="w-6 h-6" />, link: "https://twitter.com/microdonationskenya" },
        { icon: <Linkedin className="w-6 h-6" />, link: "https://linkedin.com/in/microdonationskenya" },
        { icon: <Instagram className="w-6 h-6" />, link: "https://instagram.com/microdonationskenya" },
        { icon: <Youtube className="w-6 h-6" />, link: "https://youtube.com/@microdonationskenya" },
    ];

    return (
        <motion.footer
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeIn}
            className="bg-gray-900 text-white pt-12 px-4 mt-20"
        >
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Quick Links */}
                <div>
                    <h5 className="text-xl font-semibold mb-4 text-center">Quick Links</h5>
                    <div className="flex flex-col items-center space-y-3">
                        {quickLinks.map((item, index) => (
                            <Link
                                key={index}
                                to={item.link}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded shadow text-center transition"
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Social Media */}
                <div className="text-center">
                    <h5 className="text-xl font-semibold mb-4">Follow Us</h5>
                    <div className="flex justify-center gap-4">
                        {socialLinks.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-blue-300 transition"
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Newsletter Subscription */}
                <div>
                    <h5 className="text-xl font-semibold mb-4 text-center">Subscribe to Our Newsletter</h5>
                    <form className="flex flex-col sm:flex-row items-center gap-2 justify-center">
                        <input
                            type="email"
                            required
                            placeholder="Enter your email"
                            className="px-4 py-2 w-full sm:w-auto rounded-md text-gray-900"
                        />
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="flex flex-col items-center mt-8 space-y-2">
                <p className="text-white font-bold text-lg">Powered by Micro-Donation Platform</p>
                <img src={logo} alt="Micro-Donation Logo" className="h-12 w-auto md:h-16 object-contain" />
            </div>

            <hr className="my-6 border-gray-700" />
            <p className="text-center text-sm text-gray-400 pb-4">
                &copy; {new Date().getFullYear()} Micro-Donation Platform LLC. All Rights Reserved.
            </p>
        </motion.footer>
    );
};

export default Footer;
