import { client } from "@/sanity/lib/client";
import Image from "next/image";
import React from "react";
import { Car } from "@/app/page";
import Link from "next/link";
import CommentSec from "@/app/commentsec/page";
import Head from "next/head";

interface Params {
  params: {
    _id: string;
  };
}

const getCarDetails = async (_id: string) => {
  try {
    const response: Car | null = await client.fetch(
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
    return response;
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
    return null;
  }
};

const CardPost = async ({ params }: Params) => {
  const response = await getCarDetails(params._id);

  if (!response) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Car details not found.</p>
      </main>
    );
  }

  return (
    <main>
      <Head>
        <title>{response.name || "Car Details"}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap" />
      </Head>
      <div className="max-w-5xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-2xl font-roboto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:gap-12">
          <div className="w-full lg:w-1/2 group">
            <div className="relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
              <Image
                src={response.imageUrl || "/images/default-car.jpg"}
                alt={response.name || "Car Image"}
                height={600}
                width={600}
                className="rounded-xl group-hover:brightness-110 group-hover:blur-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="absolute top-4 left-4 bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded-full shadow-md">
                Hot Deal
              </span>
            </div>
          </div>

          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-gray-800 mt-6 lg:mt-0 transition-colors duration-300 hover:text-blue-600 font-poppins">
              {response.name || "Car Name Not Available"}
            </h2>

            <div className="mt-6 space-y-4 text-lg">
              <p className="flex items-center gap-3">
                <span className="font-semibold text-gray-800">
                  Price per Day:
                </span>
                <span className="bg-blue-100 text-blue-600 font-bold py-1 px-3 rounded-lg shadow-sm">
                  {response.pricePerDay || "N/A"}
                </span>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">Type: </span>
                {response.type || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">
                  Transmission:{" "}
                </span>
                {response.transmission || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">
                  Seating Capacity:{" "}
                </span>
                {response.seatingCapacity || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">
                  Fuel Capacity:{" "}
                </span>
                {response.fuelCapacity || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-start mt-10">
          <Link href={`/payment?_id=${response._id}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300">
              Rent Now
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mt-6 font-roboto">
        <h2 className="text-lg font-semibold">Reviews</h2>
        <div className="space-y-4">
          {["Alex Stanton", "Alex stanton"].map((name, index) => (
            <div key={index} className="flex gap-4">
              <Image
                src="/images/Profil.png"
                alt="Reviewer"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{name}</h3>
                <p className="text-gray-500 text-sm">
                  Amazing car and service!
                </p>
              </div>
              <p className="text-yellow-500">4.8 ★</p>
            </div>
          ))}
        </div>
      </div>

      <CommentSec />
    </main>
  );
};

export default CardPost;