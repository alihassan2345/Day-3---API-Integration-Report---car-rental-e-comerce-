"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import Head from "next/head";

interface Booking {
  _id: string;
  car: {
    imageUrl: string;
    _ref: string;
    name: string;
  };
  userName: string;
  status: string;
  rentalDate: string;
  returnDate: string;
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings for the logged-in user
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userName = "John Doe"; // Replace with the actual logged-in user's name
        const bookings = await client.fetch(
          `*[_type == "booking"]{
            _id,
            car->{name, "imageUrl": image.asset->url},
            userName,
            status,
            rentalDate,
            returnDate
          }`,
          { userName }
        );
        setBookings(bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="bg-gray-50 min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Lato:wght@400;500;700&display=swap" />
      </Head>
      <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10 font-lato">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="col-span-1 bg-white p-6 rounded-lg shadow space-y-6">
            <nav className="space-y-4">
              <a href="#" className="block text-blue-600 font-semibold font-montserrat">
                Dashboard
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 font-montserrat">
                Car Rent
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 font-montserrat">
                Reimburse
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 font-montserrat">
                Inbox
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 font-montserrat">
                Calendar
              </a>
            </nav>
            <hr />
            <nav className="space-y-4">
              <a href="#" className="block text-gray-600 hover:text-blue-600 font-montserrat">
                Settings
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 font-montserrat">
                Help & Center
              </a>
              <button className="block text-gray-600 hover:text-blue-600 font-montserrat">
                Dark Mode
              </button>
              <button className="block text-gray-600 hover:text-blue-600 font-montserrat">
                Log Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="col-span-3 space-y-6">
            {/* My Bookings Section */}
            <section className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-lg font-montserrat">My Bookings</h2>
              <ul className="mt-4 space-y-4">
                {bookings.map((booking) => (
                  <li key={booking._id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Image
                        src={booking.car.imageUrl}
                        alt={booking.car.name || "Car Image"}
                        width={100}
                        height={60}
                        quality={100}
                        className="rounded-md"
                      />
                      <span className="font-montserrat">{booking.car.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 font-lato">
                        {new Date(booking.rentalDate).toLocaleDateString()} -{" "}
                        {new Date(booking.returnDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500 font-lato">{booking.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}