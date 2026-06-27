export type Season = "low" | "peak";
export type MealPlan = "bb" | "bo";

export type RoomKey =
  | "deluxe_double_balcony"
  | "standard_double"
  | "standard_extra_bed";

export type Property = {
  id: number;
  name: string;
  type: string;
  location: string;
  price: number;
  priceUSD: number;
  rating: number;
  reviews: number;
  guests: number;
  beds: number;
  baths: number;
  image: string;
  tags: string[];
  badge: string | null;
  featured: boolean;
  description: string;
  minStay: number;
};

export const PROPERTIES: Property[] = [
  {
    id: 1,
    name: "Mum's Backpackers",
    type: "Beachside Lodge",
    location: "Diani Center",
    price: 2200,
    priceUSD: 17,
    rating: 4.97,
    reviews: 214,
    guests: 8,
    beds: 4,
    baths: 3,
    image: "/src/imports/images/mums-2.jpg",
    tags: ["Pool", "Beachfront", "WiFi", "AC"],
    badge: "Top Rated",
    featured: true,
    description:
      "Wake up to ocean views from every room. Private infinity pool, direct beach access, fully staffed. Diani's most loved stay.",
    minStay: 1,
  },
  {
    id: 2,
    name: "Apple Mango Apartments",
    type: "Private Villa",
    location: "Diani Center",
    price: 10000,
    priceUSD: 77,
    rating: 4.85,
    reviews: 631,
    guests: 6,
    beds: 3,
    baths: 2,
    image: "/src/imports/Apple Mango/aerial.jpg",
    tags: ["WiFi", "Pool", "Garden", "Parking"],
    badge: "Best Value",
    featured: false,
    description:
      "Spacious and fully furnished villa with a beautiful garden and pool. Perfect for families and groups looking for comfort and privacy.",
    minStay: 1,
  },
  {
    id: 3,
    name: "Diani Pearl Resort",
    type: "Luxury Apartments",
    location: "North Diani Beach",
    price: 20000,
    priceUSD: 154,
    rating: 5.0,
    reviews: 88,
    guests: 4,
    beds: 2,
    baths: 2,
    image: "/src/imports/diani pearl/Exterior+elevated+2.webp",
    tags: ["Ocean View", "Pool", "Luxury", "AC"],
    badge: "Honeymoon Pick",
    featured: false,
    description:
      "Elegant luxury apartments with sweeping ocean views, rooftop pool, and premium finishes. A sophisticated Diani retreat.",
    minStay: 2,
  },
  {
    id: 4,
    name: "Enzi Furnished Apartments",
    type: "Furnished Suites",
    location: "Diani Beach Road",
    price: 8000,
    priceUSD: 62,
    rating: 4.92,
    reviews: 177,
    guests: 6,
    beds: 3,
    baths: 2,
    image: "/src/imports/Enzi/e1.jpg",
    tags: ["WiFi", "Pool", "Kitchen", "Parking"],
    badge: "Handpicked Stay",
    featured: false,
    description:
      "Modern, light-filled apartments with stylish furnishings, fully equipped kitchens, and rooftop pool. The ideal Diani base.",
    minStay: 2,
  },
  {
    id: 5,
    name: "Coral Beach Resort",
    type: "Coastal Cottage",
    location: "Galu Beach",
    price: 8900,
    priceUSD: 69,
    rating: 4.78,
    reviews: 302,
    guests: 4,
    beds: 2,
    baths: 2,
    image: "/src/imports/coral beach/out.jpg",
    tags: ["Garden", "WiFi", "AC", "Near Beach"],
    badge: null,
    featured: false,
    description:
      "Cosy Swahili-style cottage with lush tropical garden. 3-minute walk to pristine Galu Beach. Peaceful and authentic.",
    minStay: 2,
  },
  {
    id: 6,
    name: "Flamboyant Villa",
    type: "Garden Villa",
    location: "Diani Beach",
    price: 22000,
    priceUSD: 170,
    rating: 4.88,
    reviews: 95,
    guests: 8,
    beds: 4,
    baths: 4,
    image: "/src/imports/flamboyant/aerial.webp",
    tags: ["Garden", "Pool", "Luxury", "Private"],
    badge: "Luxury Pick",
    featured: false,
    description:
      "Set within lush tropical gardens with a private pool, veranda, and spacious interiors. The ultimate Diani villa experience.",
    minStay: 3,
  },
  {
    id: 7,
    name: "Bahari Dhow",
    type: "Beachfront Luxury Villa",
    location: "South Diani",
    price: 28500,
    priceUSD: 220,
    rating: 4.99,
    reviews: 143,
    guests: 10,
    beds: 5,
    baths: 5,
    image: "/src/imports/bahari dhow/frontview.JPG",
    tags: ["Ocean View", "Chef", "Infinity Pool", "Beachfront"],
    badge: "Luxury Pick",
    featured: false,
    description:
      "A breathtaking beachfront villa with private infinity pool, dedicated chef, and direct ocean access. Diani's finest address.",
    minStay: 2,
  },
];
