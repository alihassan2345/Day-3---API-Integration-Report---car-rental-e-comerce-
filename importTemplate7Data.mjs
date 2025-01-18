import { createClient } from "@sanity/client";
import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

// Create Sanity client
const client = createClient({
  projectId: "hhgswygu",
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-01-13",
  token:
    "skMzTpOEJXS2EOCGnKjGRw73gkGGZYpXNS3EUS5mjTSg6zMIft4qeFNlcqYlDW6GV1zCoGYJn0SqAKWKuVd91r4GGBTDpQUgj154wclnBT2decmzL76UGIycbXhMVjf0zT3Ipneqqn3LiyZEIFhejhW2q2PsZmLc3SkO2o4Mg5htwHKxro0V",
});

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload("image", buffer, {
      filename: imageUrl.split("/").pop(),
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error("Failed to upload image:", imageUrl, error);
    return null;
  }
}

async function importData() {
  try {
    console.log("Fetching car data from API...");

    // API endpoint containing car data
    const response = await axios.get(
      "https://sanity-nextjs-application.vercel.app/api/hackathon/template7"
    );
    const cars = response.data;

    console.log(`Fetched ${cars.length} cars`);

    for (const car of cars) {
      console.log(`Processing car: ${car.name}`);

      let imageRef = null;
      if (car.image_url) {
        imageRef = await uploadImageToSanity(car.image_url);
      }

      const sanityCar = {
        _type: "car",
        name: car.name,
        brand: car.brand || null,
        type: car.type,
        fuelCapacity: car.fuel_capacity,
        transmission: car.transmission,
        seatingCapacity: car.seating_capacity,
        pricePerDay: car.price_per_day,
        originalPrice: car.original_price || null,
        tags: car.tags || [],
        image: imageRef
          ? {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: imageRef,
              },
            }
          : undefined,
      };

      console.log("Uploading car to Sanity:", sanityCar.name);
      const result = await client.create(sanityCar);
      console.log(`Car uploaded successfully: ${result._id}`);
    }

    console.log("Data import completed successfully!");
  } catch (error) {
    console.error("Error importing data:", error);
  }
}

importData();
