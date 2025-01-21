'use client'
import { client } from "@/sanity/lib/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export interface Car {
  _id: string;
  name: string;
  pricePerDay: string;
  imageUrl: string;
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response: Car[] = await client.fetch(
          `*[_type == "car" ][0..7]{
            _id,
            name,
            pricePerDay,
            "imageUrl": image.asset->url
          }`
        );
        setCars(response);
      } catch (err) {
        console.error("API Error:", err);
        setError("Products could not be loaded. Please try again later.");
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <Head>
        <title>Car Rental</title>
        <meta name="description" content="Car rental website" />
      </Head>

      <main className="bg-gray-50 p-6">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Left Hero Section */}
          <div className="bg-blue-500 text-white p-8 rounded-lg flex flex-col justify-between shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h1 className="text-3xl font-semibold mb-4">
              The Best Platform for Car Rental
            </h1>
            <p className="mb-6">
              Ease of doing a car rental safely and reliably, all at an affordable price.
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
            <h1 className="text-3xl font-semibold mb-4">
              Rent Cars at Affordable Prices
            </h1>
            <p className="mb-6">
              Providing cheap car rental services with comfort and safety guaranteed.
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
        <h2 className="text-2xl font-bold mb-6">Popular Cars</h2>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {cars.map((car) => (
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
                  <h2 className="text-lg font-semibold mb-2 truncate">
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
          </div>
        )}

        {/* Show More Button */}
        <div className="text-center mt-8">
          <Link href="/categorie-car-rent">
            <button className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
              Show More Cars
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
