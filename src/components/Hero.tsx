'use client'
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { client } from '@/sanity/lib/client'; // Adjust the import path as necessary
import Image from 'next/image';
import Link from 'next/link';
import Head from "next/head";

interface Car {
  _id: string;
  name: string;
  pricePerDay: string;
  imageUrl: string;
}

interface WishlistPageProps {
  wishlist: Car[];
  handleWishlistToggle: (car: Car) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ wishlist, handleWishlistToggle }) => {
  const [localWishlist, setLocalWishlist] = useState<Car[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      try {
        setLocalWishlist(JSON.parse(storedWishlist));
      } catch (error) {
        console.error("Error parsing wishlist:", error);
      }
    }
  }, []);

  // Persist wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(localWishlist));
  }, [localWishlist]);

  const handleToggle = (car: Car) => {
    const existsInWishlist = localWishlist.some((item) => item._id === car._id);

    if (existsInWishlist) {
      // Remove from wishlist
      const updatedWishlist = localWishlist.filter((item) => item._id !== car._id);
      setLocalWishlist(updatedWishlist);
      toast.error(`${car.name} removed from wishlist`);
    } else {
      // Add to wishlist
      const updatedWishlist = [...localWishlist, car];
      setLocalWishlist(updatedWishlist);
      toast.success(`${car.name} added to wishlist`);
    }
  };

  return (
    <div>
      <Toaster />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {localWishlist.map((car) => (
          <div
            key={car._id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold">{car.name}</h2>
            <button
              onClick={() => handleToggle(car)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
              Remove from Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [wishlist, setWishlist] = useState<Car[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (error) {
        console.error("Error parsing wishlist:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const handleWishlistToggle = (car: Car) => {
    const existsInWishlist = wishlist.some((item) => item._id === car._id);

    if (existsInWishlist) {
      const updatedWishlist = wishlist.filter((item) => item._id !== car._id);
      setWishlist(updatedWishlist);
      toast.error(`${car.name} removed from wishlist`);
    } else {
      const updatedWishlist = [...wishlist, car];
      setWishlist(updatedWishlist);
      toast.success(`${car.name} added to wishlist`);
    }
  };

  const [response, setResponse] = useState<Car[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response: Car[] = await client.fetch(
        `*[_type == "car" ][]{
          _id,
          name,
          pricePerDay,
          "imageUrl": image.asset->url
        }`
      );
      setResponse(response);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>Car Rental</title>
        <meta name="description" content="Car rental website" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap" />
      </Head>

      <main className="bg-gray-50 p-6 font-roboto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Left Hero Section */}
          <div className="bg-blue-500 text-white p-8 rounded-lg flex flex-col justify-between shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h1 className="text-3xl font-poppins font-semibold mb-4">
              The Best Platform for Car Rental
            </h1>
            <p className="mb-6">
              Ease of doing a car rental safely and reliably, all at an
              affordable price.
            </p>
            <Link href="/categorie-car-rent">
              <button className="bg-white text-blue-500 py-3 px-6 rounded-lg shadow-md hover:bg-blue-100 transition-colors">
                Explore Rentals
              </button>
            </Link>
            <div className="mt-6">
              <Image
                src="/images/image 7.png"
                alt="Car Image 1"
                width={500}
                height={300}
                className="rounded-lg transition-transform duration-500 transform hover:scale-105"
              />
            </div>
          </div>

          {/* Right Hero Section */}
          <div className="bg-blue-700 text-white p-8 rounded-lg flex flex-col justify-between shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h1 className="text-3xl font-poppins font-semibold mb-4">
              Rent Cars at Affordable Prices
            </h1>
            <p className="mb-6">
              Providing cheap car rental services with comfort and safety
              guaranteed.
            </p>
            <Link href="/categorie-car-rent">
              <button className="bg-white text-blue-700 py-3 px-6 rounded-lg shadow-md hover:bg-blue-100 transition-colors">
                Explore Rentals
              </button>
            </Link>
            <div className="mt-6">
              <Image
                src="/images/image 8.png"
                alt="Car Image 2"
                width={500}
                height={300}
                className="rounded-lg transition-transform duration-500 transform hover:scale-105"
              />
            </div>
          </div>
        </div>
        {/* Search Section */}
        <div className="bg-white shadow p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-10">
          <div>
            <label className="block text-gray-700">Pick - Up</label>
            <input
              type="text"
              placeholder="Select your city"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Drop - Off</label>
            <input
              type="text"
              placeholder="Select your city"
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
        </div>

        {/* Popular Cars Section */}
        <h2 className="text-2xl font-poppins font-bold mb-6">Popular Cars</h2>
        <div>
          <WishlistPage wishlist={wishlist} handleWishlistToggle={handleWishlistToggle} />
          <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {response.map((car) => (
                <div
                  key={car._id}
                  className="bg-white shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 cursor-pointer p-6 rounded-lg relative overflow-hidden"
                >
                  <div className="w-full h-60 overflow-hidden rounded-lg mb-4 relative">
                    <Image
                      src={car.imageUrl}
                      alt={car.name}
                      width={400}
                      height={100}
                      className="rounded-lg transition-transform duration-500 transform hover:scale-105"
                    />
                  </div>
                  <button
                    className={`absolute top-2 right-2 text-2xl ${
                      wishlist.some((item) => item._id === car._id)
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleWishlistToggle(car)}
                  >
                    ♥
                  </button>
                  <h2 className="text-lg font-poppins font-semibold mb-2 truncate">
                    {car.name}
                  </h2>
                  <p className="text-gray-700 text-md font-medium mb-4">
                    {car.pricePerDay}
                  </p>
                  <Link href={`/card/${car._id}`}>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                      Rent Now
                    </button>
                  </Link>
                </div>
              ))}
            </div>
            {/* Show More Button */}
            <div className="text-center mt-8">
              <Link href="/categorie-car-rent">
                <button className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
                  Show More Cars
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;