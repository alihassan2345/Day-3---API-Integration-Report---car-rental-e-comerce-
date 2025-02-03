"use client";

import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { client } from "@/sanity/lib/client";
import toast from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";

interface Car {
  _id: string;
  name: string;
  pricePerDay: string;
  imageUrl: string;
}

const PaymentPage = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [car, setCar] = useState<Car | null>(null);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const searchParams = useSearchParams();
  const _id = searchParams.get("_id");
  const router = useRouter(); // Router for navigation

  // Handle promo code application
  const handlePromoApply = () => {
    if (promoCode === "DISCOUNT10") {
      setPromoApplied(true);
      toast.success("Promo code applied successfully!");
    } else {
      toast.error("Invalid promo code");
    }
  };

  // Fetch car details based on the car ID
  useEffect(() => {
    if (_id) {
      const fetchCar = async () => {
        try {
          const car: Car = await client.fetch(
            `*[_type == "car" && _id == $_id][0]{
              _id,
              name,
              pricePerDay,
              "imageUrl": image.asset->url
            }`,
            { _id }
          );
          setCar(car);
        } catch (error) {
          console.error("Error fetching car details:", error);
          toast.error("Failed to load car details.");
        }
      };

      fetchCar();
    }
  }, [_id]);

  // Handle the "Rent Now" button click
  const handleRentNow = async () => {
    if (!car) {
      toast.error("Car details are not available.");
      return;
    }

    if (
      !userName ||
      !phoneNumber ||
      !address ||
      !city ||
      !rentalDate ||
      !returnDate
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const booking = {
      _type: "booking",
      car: {
        _type: "reference",
        _ref: car._id,
      },
      userName,
      phoneNumber,
      address,
      city,
      status: "Pending",
      rentalDate: new Date(rentalDate).toISOString(),
      returnDate: new Date(returnDate).toISOString(),
    };

    try {
      await client.create(booking);
      setShowPopup(true); // Show the success popup
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Booking failed. Please try again.");
    }
  };

  // Close the success popup and redirect to the User Dashboard
  const closePopup = () => {
    setShowPopup(false);
    router.push("/dashboard"); // Redirect to User Dashboard
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-8 lg:px-8">
          {/* Left Column: Payment Form and Rental Info */}
          <div className="lg:col-span-8 space-y-6">
            {/* Billing Info Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Payment Method</h3>
                <p className="text-sm text-gray-500">Step 1 of 4</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Please enter your billing info
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="border text-black border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="border text-black border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="border text-black border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Town / City"
                  className="border text-black border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            {/* Rental Info Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Rental Info</h3>
                <p className="text-sm text-gray-500">Step 2 of 4</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Please select your rental date
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pick-Up Section */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-2">Pick-Up</h4>
                  <div className="space-y-2">
                    <select className="w-full border text-black border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select your city</option>
                    </select>
                    <input
                      type="date"
                      className="w-full border text-black border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={rentalDate}
                      onChange={(e) => setRentalDate(e.target.value)}
                    />
                    <input
                      type="time"
                      className="w-full border text-black border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Drop-Off Section */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-2">Drop-Off</h4>
                  <div className="space-y-2">
                    <select className="w-full border text-black border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select your city</option>
                    </select>
                    <input
                      type="date"
                      className="w-full border text-black border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                    <input
                      type="time"
                      className="w-full border text-black border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Confirmation</h3>
                <p className="text-sm text-gray-500">Step 4 of 4</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                We are getting to the end. Just a few clicks and your rental is
                ready!
              </p>
              <div className="space-y-4 mb-6">
                <label className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    I agree with sending marketing and newsletter emails. No spam,
                    promised!
                  </span>
                </label>
                <label className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    I agree with our terms and conditions and privacy policy.
                  </span>
                </label>
              </div>
              <div className="mt-6 flex items-start space-x-2">
                <div>
                  <Image src="/images/saftey.png" alt="" width={32} height={32} />
                </div>
                <p className="text-sm text-gray-500">
                  All your data are safe. We are using the most advanced security
                  to provide you the best service.
                </p>
              </div>

              {/* Rent Now Button */}
              <div className="mt-6">
                <button
                  onClick={handleRentNow}
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                >
                  Rent Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Car Info */}
          <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Rental Summary
            </h3>
            <div className="flex items-center mb-4">
              <Image
                src={car?.imageUrl || "/images/default-car.jpg"}
                alt={car?.name || "Car Image"}
                width={100}
                height={60}
                className="rounded-md"
              />
              <div className="ml-4">
                <h4 className="text-gray-900 font-bold">{car?.name || "Car Name"}</h4>
                <p className="text-sm text-gray-500">440+ Reviewer</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Prices may change depending on the length of the rental.
            </p>
            <div className="flex justify-between text-sm text-gray-700">
              <p>Subtotal</p>
              <p>${car?.pricePerDay || "0"}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-700 mb-4">
              <p>Tax</p>
              <p>$0</p>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                placeholder="Apply promo code"
                className="border text-black border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                onClick={handlePromoApply}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Apply now
              </button>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <p>Total Rental Price</p>
              <p>
                $
                {promoApplied
                  ? (parseInt(car?.pricePerDay || "0") * 0.9).toFixed(2)
                  : car?.pricePerDay || "0"}
              </p>
            </div>
          </div>
        </div>
      </div>
        {/* Success Popup */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">Booking Successful!</h2>
              <p className="mb-4">Your car rental booking has been successfully created.</p>
              <button
                onClick={closePopup}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default PaymentPage;
