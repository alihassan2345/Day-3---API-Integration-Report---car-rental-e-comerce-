"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (item: any) => {
    const updatedWishlist = wishlist.filter(
      (product) => product._id !== item._id
    );
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="container min-h-screen min-w-full bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-black ">
        My Wishlist
      </h1>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-900">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
              <Image
                src={item.imageUrl || "/placeholder.png"}
                alt={item.name}
                width={300}
                height={200}
                className="rounded-lg"
              />
              <h3 className="text-lg font-bold mt-2 text-black">{item.name}</h3>
              <p className="text-gray-600 mt-2">{item.pricePerDay}</p>

              {/* Add to cart */}
              <Link href={`/card/${item._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Rent Now
                </button>
              </Link>
              {/* Remove from wishlist */}
              <button
                onClick={() => handleRemoveFromWishlist(item)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
