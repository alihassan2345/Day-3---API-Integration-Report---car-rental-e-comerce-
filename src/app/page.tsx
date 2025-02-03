import Hero from "@/components/Hero";

export interface Car {
  capacity: string;
  _id: string;
  name: string;
  pricePerDay: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;

  imageUrl: string;
}

export default function Home() {
  return (
    <div>
      <Hero />
    </div>
  );
}
