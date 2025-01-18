import { client } from "@/sanity/lib/client";
import Image from "next/image";
import React from "react";
import { Car } from "@/app/page";
import Link from "next/link";

interface Params {
  params: {
    _id: string;
  };
}

const cardpost = async (params: Params) => {
  const { _id } = params.params;

  const response: Car = await client.fetch(
    `*[_type == "car" && _id == $_id][0]{
         _id,
           name,
            pricePerDay,
            type,
 fuelCapacity,
transmission,
seatingCapacity,
           "imageUrl": image.asset->url
         }`,
    { _id }
  );
  console.log("sanity response>>", response);
  return (
    <main>
      <div className="max-w-5xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:gap-12">
          {/* Car Image */}
          <div className="w-full lg:w-1/2 group">
            <div className="relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
              <Image
                src={response.imageUrl}
                alt={response.name}
                height={600}
                width={600}
                className="rounded-xl group-hover:brightness-110 group-hover:blur-0"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {/* Floating Badge */}
              <span className="absolute top-4 left-4 bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded-full shadow-md">
                Hot Deal
              </span>
            </div>
          </div>

          {/* Car Details */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-gray-800 mt-6 lg:mt-0 transition-colors duration-300 hover:text-blue-600">
              {response.name}
            </h2>

            <div className="mt-6 space-y-4 text-lg">
              <p className="flex items-center gap-3">
                <span className="font-semibold text-gray-800">
                  Price per Day:
                </span>
                <span className="bg-blue-100 text-blue-600 font-bold py-1 px-3 rounded-lg shadow-sm">
                  {response.pricePerDay}
                </span>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">Type: </span>
                {response.type}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">
                  Transmission:{" "}
                </span>
                {response.transmission}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">
                  Seating Capacity:{" "}
                </span>
                {response.seatingCapacity}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">
                  Fuel Capacity:{" "}
                </span>
                {response.fuelCapacity}
              </p>
            </div>
          </div>
        </div>

        {/* Rent Now Button */}
        <div className="flex justify-center lg:justify-start mt-10">
          <Link href="/payment">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300">
              Rent Now
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default cardpost;

