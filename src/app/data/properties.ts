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
  price: number; // KES per night
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

// Canonical list of all properties used for AI recommendations.
export const PROPERTIES: Property[] = [
  {
    id: 1,
    name: "Mum's Backpackers",
    type: "Hostel",
    location: "Diani Center",
    price: 2200,
    priceUSD: 143,
    rating: 4.97,
    reviews: 214,
    guests: 8,
    beds: 4,
    baths: 3,
    image:
      "https://images.unsplash.com/photo-1758117638928-c03fcca424c7?w=800&h=600&fit=crop&auto=format",
    tags: ["Pool", "Beachfront", "WiFi", "AC"],
    badge: "Top Rated",
    featured: true,
    description:
      "Wake up to ocean views from every room. Private infinity pool, direct beach access, fully staffed.",
    minStay: 3,
  },
  {
    id: 2,
    name: "Apple Mango Apartments",
    type: "Hostel",
    location: "Diani Center",
    price: 2200,
    priceUSD: 17,
    rating: 4.85,
    reviews: 631,
    guests: 1,
    beds: 1,
    baths: 1,
    image:
      "https://images.unsplash.com/photo-1708119063168-4785d1359824?w=800&h=600&fit=crop&auto=format",
    tags: ["WiFi", "Pool", "Bar", "Lockers"],
    badge: "Best Value",
    featured: false,
    description:
      "The social hub of Diani. Meet fellow travellers, join beach trips, and sleep well for less.",
    minStay: 1,
  },
  {
    id: 3,
    name: "Diani Pearl Resort",
    type: "Luxury Cottage",
    location: "North Diani Beach",
    price: 32000,
    priceUSD: 247,
    rating: 5.0,
    reviews: 88,
    guests: 2,
    beds: 1,
    baths: 2,
    image:
      "https://images.unsplash.com/photo-1629553032544-3c1477c0eac9?w=800&h=600&fit=crop&auto=format",
    tags: ["Ocean View", "Jacuzzi", "Butler", "Couples"],
    badge: "Honeymoon Pick",
    featured: false,
    description:
      "Secluded couples retreat. Plunge pool, open-air shower, champagne on arrival. Pure romance.",
    minStay: 2,
  },
  {
    id: 4,
    name: "Enzi Furnished Apartments",
    type: "Furnished Apartments",
    location: "Diani Beach Road",
    price: 24000,
    priceUSD: 185,
    rating: 4.92,
    reviews: 177,
    guests: 6,
    beds: 3,
    baths: 2,
    image:
      "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=800&h=600&fit=crop&auto=format",
    tags: ["WiFi", "Comfort", "Kitchen", "Parking"],
    badge: "Handpicked Stay",
    featured: false,
    description:
      "Modern, fully furnished apartment living in Diani—comfortable spaces, thoughtful amenities, and an easy beach getaway.",
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
    image:
      "https://images.unsplash.com/photo-1688496761159-e9df8bf438a8?w=800&h=600&fit=crop&auto=format",
    tags: ["Garden", "WiFi", "AC", "Near Beach"],
    badge: null,
    featured: false,
    description:
      "Cosy Swahili-style cottage with lush tropical garden. 3-minute walk to Galu Beach.",
    minStay: 2,
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
      "A peaceful stay curated for guests seeking a serene environment, beautiful coastal surroundings, and a cozy holiday base.",
    minStay: 2,
  },
];

