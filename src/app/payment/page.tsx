import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Left Section: Billing Info and Rental Info */}
        <div className="col-span-2 space-y-6">
          {/* Billing Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Billing Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
              <input
                type="text"
                placeholder="Address"
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
              <input
                type="text"
                placeholder="Town/City"
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
          </div>

          {/* Rental Info */}
          <div className="bg-white p-6 rounded-lg shadow space-y-6">
            <h2 className="text-lg font-semibold">Rental Info</h2>
            {/* Pick-Up */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pick-Up Location
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  placeholder="Location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
            </div>
            {/* Drop-Off */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Drop-Off Location
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  placeholder="Location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input type="radio" name="payment" id="credit-card" />
                <label htmlFor="credit-card" className="text-sm font-medium">
                  Credit Card
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Expiration Date"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Card Holder"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
            </div>
          </div>

          {/* Confirmation */}
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm">
              I agree with terms and conditions and have reviewed all rental
              details.
            </p>
            <Link href={"/dashboard"}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">
                Confirm Booking
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section: Rental Summary */}
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <h2 className="text-lg font-semibold">Rental Summary</h2>
          <div className="flex items-center gap-4">
            <Image
              src={"/images/image 8.png"}
              alt="Car"
              width={100}
              height={60}
              className="rounded-lg"
            />
            <div>
              <h3 className="font-semibold">Nissan GT-R</h3>
              <p className="text-sm text-gray-500">4.8 ★ | 200+ Reviews</p>
            </div>
          </div>
          <div className="flex justify-between items-center border-t border-gray-300 pt-4">
            <p className="text-gray-600">Rental Price</p>
            <p className="font-semibold">$80.00</p>
          </div>
          <Link href={"/dashboard"}>
            <button className="bg-blue-600 text-white w-full py-2 rounded-lg">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
