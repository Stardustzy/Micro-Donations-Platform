import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

const allCountries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
    "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
    "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica", "Croatia",
    "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
    "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
    "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
    "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
    "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
    "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru",
    "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
    "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan",
    "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo",
    "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
    "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
    "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];


const hardcodedCauses = [
    // Health
    {
        id: 1,
        title: "Build a Rural Health Clinic",
        description: "Providing basic healthcare in underserved areas.",
        image: "/images/health1.jpg",
        category: "Health",
        country: "Kenya",
        goal: 10000,
        raised: 4500,
    },
    {
        id: 2,
        title: "Medical Supplies for Children",
        description: "Essential medicine and equipment for children in need.",
        image: "/images/health2.jpg",
        category: "Health",
        country: "India",
        goal: 15000,
        raised: 12000,
    },
    {
        id: 3,
        title: "Emergency Surgery Fund",
        description: "Support urgent surgeries in low-income communities.",
        image: "/images/health3.jpg",
        category: "Health",
        country: "Nigeria",
        goal: 8000,
        raised: 5000,
    },
    // Education
    {
        id: 4,
        title: "School Kits for Kids",
        description: "Providing books and stationery for children.",
        image: "/images/education1.jpg",
        category: "Education",
        country: "Canada",
        goal: 5000,
        raised: 3200,
    },
    {
        id: 5,
        title: "Fund a Scholarship",
        description: "Support one student's journey to higher education.",
        image: "/images/education2.jpg",
        category: "Education",
        country: "USA",
        goal: 10000,
        raised: 4000,
    },
    {
        id: 6,
        title: "Digital Learning in Rural Areas",
        description: "Provide tablets and e-learning access to rural kids.",
        image: "/images/education3.jpg",
        category: "Education",
        country: "South Africa",
        goal: 12000,
        raised: 9000,
    },
    // Environment
    {
        id: 7,
        title: "Plant 10,000 Trees",
        description: "Reforestation project to fight climate change.",
        image: "/images/env1.jpg",
        category: "Environment",
        country: "Brazil",
        goal: 15000,
        raised: 11000,
    },
    {
        id: 8,
        title: "Clean Up Coastal Beaches",
        description: "Volunteer-based plastic cleanup program.",
        image: "/images/env2.jpg",
        category: "Environment",
        country: "Australia",
        goal: 7000,
        raised: 3500,
    },
    {
        id: 9,
        title: "Solar Panels for Schools",
        description: "Promoting renewable energy in learning institutions.",
        image: "/images/env3.jpg",
        category: "Environment",
        country: "Kenya",
        goal: 9000,
        raised: 6400,
    }
];

const Causes = () => {
    const [category, setCategory] = useState("All");
    const [country, setCountry] = useState("All");
    const [search, setSearch] = useState("");

    const filteredCauses = hardcodedCauses.filter((cause) => {
        return (
            (category === "All" || cause.category === category) &&
            (country === "All" || cause.country === country) &&
            (cause.title.toLowerCase().includes(search.toLowerCase()) ||
                cause.description.toLowerCase().includes(search.toLowerCase()))
        );
    });

    return (
        <div className="px-6 py-12 max-w-7xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-center mb-6 text-gray-900"
            >
                Explore Causes & Make a Difference
            </motion.h1>

            <div className="sticky top-0 z-10 bg-white py-4">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center w-full sm:w-[48%] md:w-1/3 bg-cyan-100 shadow-sm rounded-xl p-2">
                        <Search className="text-gray-900 ml-2" />
                        <input
                            type="text"
                            placeholder="Search by title or description"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full max-w-full px-4 py-2 outline-none text-sm"
                        />
                    </div>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full max-w-full sm:w-[48%] md:w-1/4 p-2 rounded-lg border bg-cyan-100"
                    >
                        <option value="All">All Categories</option>
                        <option value="Health">Health</option>
                        <option value="Education">Education</option>
                        <option value="Environment">Environment</option>
                    </select>
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full max-w-full sm:w-[48%] md:w-1/4 p-2 rounded-lg border bg-cyan-100"
                    >
                        <option value="All">All Countries</option>
                        {allCountries.map((ctry, idx) => (
                            <option key={idx} value={ctry}>{ctry}</option>
                        ))}
                    </select>
                </div>
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.2
                        }
                    }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
                {filteredCauses.map((cause) => (
                    <motion.div
                        key={cause.id}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        className="bg-cyan-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={cause.image}
                            alt={cause.title}
                            className="w-full h-48 object-contain"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{cause.title}</h2>
                            <p className="text-sm text-gray-900 line-clamp-3">{cause.description}</p>
                            <div className="text-xs mt-2 text-gray-900">
                                <p>Category: <span className="font-medium">{cause.category}</span></p>
                                <p>Country: <span className="font-medium">{cause.country}</span></p>
                                <p>Goal: ${cause.goal.toLocaleString()}</p>
                                <p>Raised: ${cause.raised.toLocaleString()}</p>
                            </div>
                            <Link
                                to={`/cause/${cause.id}`}
                                className="inline-block mt-4 text-green-600 hover:text-green-800 text-sm font-semibold"
                            >
                                Read More →
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {filteredCauses.length === 0 && (
                <p className="text-center text-gray-900 mt-8">No causes found matching your filters.</p>
            )}
        </div>
    );
};

export default Causes;

