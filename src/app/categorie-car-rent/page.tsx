import Sidebar from "@/components/Sidebar";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

export interface Car {
  _id: string;
  name: string;
  pricePerDay: string;
  imageUrl: string;
}
export default async function Home() {
  const response: Car[] = await client.fetch(
    `*[_type == "car"][8..17]{
        _id,
          name,
           pricePerDay,
          "imageUrl": image.asset->url
        }`
  );
  console.log("sanity response>>", response);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Sidebar />

        {
          <main className="lg:col-span-3">
            <div className="container mx-auto px-4 py-10">
              <h1 className="text-4xl font-bold text-center mb-10">
                Our Products
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {response.map((car, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 cursor-pointer p-6 rounded-lg"
                  >
                    {/* Product Image with Fixed Height and Width */}
                    <div className="w-full h-48 overflow-hidden rounded-lg mb-10">
                      <Image
                        className="object-cover w-full h-full"
                        src={car.imageUrl}
                        alt={car.name}
                        width={300}
                        height={200}
                      />
                    </div>

                    {/* Car Name with Truncate */}
                    <h2 className="text-lg font-semibold mb-2 truncate">
                      {car.name}
                    </h2>

                    {/* Car Price */}
                    <p className="text-gray-700 text-md font-medium mb-4">
                      {car.pricePerDay}
                    </p>

                    {/* Rent Now Button */}
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
        }
      </div>
    </div>
  );
}