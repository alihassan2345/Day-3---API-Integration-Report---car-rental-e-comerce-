'use client'
import { useState } from "react";

const HeroSection = () => {

const cars = [
  { type: "Sport", capacity: "2 Person", price: 50 },
  { type: "SUV", capacity: "4 Person", price: 70 },
  { type: "MPV", capacity: "6 Person", price: 90 },
  { type: "Sedan", capacity: "4 Person", price: 60 },
  { type: "Coupe", capacity: "2 Person", price: 80 },
  { type: "Hatchback", capacity: "4 Person", price: 40 },
];


const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCapacities, setSelectedCapacities] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(100);

  const handleTypeFilter = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleCapacityFilter = (capacity: string) => {
    setSelectedCapacities((prev: string[]) =>
      prev.includes(capacity)
        ? prev.filter((c) => c !== capacity)
        : [...prev, capacity]
    );
  };

  const filteredCars = cars.filter((car: { type: string; capacity: string; price: number }) => {
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(car.type);
    const matchesCapacity =
      selectedCapacities.length === 0 ||
      selectedCapacities.includes(car.capacity);
    const matchesPrice = car.price <= maxPrice;

    return matchesType && matchesCapacity && matchesPrice;
  });




}
export default HeroSection;