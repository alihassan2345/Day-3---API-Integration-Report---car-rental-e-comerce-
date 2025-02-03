"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export interface Car {
  _id: string;
  name: string;
  pricePerDay: string;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [response, setResponse] = useState<Car[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response: Car[] = await client.fetch(
        `*[_type == "car"][8..17]{
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

      <div className="container mx-auto p-4 font-roboto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
            <h2 className="text-lg font-bold mb-6 text-black font-poppins">Filters</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold mb-2 text-black font-poppins">Type</h3>
                <ul className="space-y-2 text-black">
                  {["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"].map((type) => (
                    <li key={type} className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <label className="text-sm">{type}</label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-2 text-black font-poppins">Capacity</h3>
                <ul className="space-y-2 text-black">
                  {["2 Person", "4 Person", "6 Person", "8 or More"].map((capacity) => (
                    <li key={capacity} className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <label className="text-sm">{capacity}</label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-2 text-black font-poppins">Price</h3>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full bg-blue-600"
                />
                <div className="text-sm text-black">$100</div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="container mx-auto px-4 py-10">
              <h1 className="text-4xl font-bold text-center mb-10 font-poppins">
                Our Products
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {response.map((car, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 cursor-pointer p-6 rounded-lg"
                  >
                    <div className="w-full h-48 overflow-hidden rounded-lg mb-10">
                      <Image
                        className="object-cover w-full h-full"
                        src={car.imageUrl}
                        alt={car.name}
                        width={300}
                        height={200}
                      />
                    </div>

                    <h2 className="text-lg font-semibold mb-2 truncate font-poppins">
                      {car.name}
                    </h2>

                    <p className="text-gray-700 text-md font-medium mb-4">
                      {car.pricePerDay}
                    </p>

                    <Link href={`/card/${car._id}`} passHref>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300">
                        Rent Now
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
