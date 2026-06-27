import { useState } from "react";
import { Clock, Tag, ArrowRight, TrendingUp } from "lucide-react";


const POSTS = [
  {
    id: 1,
    title: "Best Villas in Diani Under KES 10,000 Per Night",
    category: "Accommodation",
    tag: "Budget Travel",
    excerpt: "You don't need a massive budget to experience Diani Beach in style. Here are 8 stunning villas that won't break the bank — from cosy cottages to boutique guesthouses.",
    image: "https://images.unsplash.com/photo-1708119063168-4785d1359824?w=600&h=400&fit=crop&auto=format",
    readTime: "6 min read",
    date: "June 8, 2026",
    trending: true,
  },
  {
    id: 2,
    title: "Top 10 Things To Do in Diani Beach in 2026",
    category: "Travel Guide",
    tag: "Must Read",
    excerpt: "From world-class scuba diving to skydiving over the Indian Ocean, Diani packs more adventure per square mile than almost anywhere in Africa.",
    image: "https://images.unsplash.com/photo-1583364512105-951b6f7080ae?w=600&h=400&fit=crop&auto=format",
    readTime: "9 min read",
    date: "June 3, 2026",
    trending: true,
  },
  {
    id: 3,
    title: "A Honeymoon Guide to Diani Beach: Romance Done Right",
    category: "Travel Guide",
    tag: "Couples",
    excerpt: "Cave dinner restaurants, secluded coves, sunrise dhow cruises — Diani Beach is made for romance. Here's the ultimate honeymoon itinerary.",
    image: "https://images.unsplash.com/photo-1629553032544-3c1477c0eac9?w=600&h=400&fit=crop&auto=format",
    readTime: "8 min read",
    date: "May 28, 2026",
    trending: false,
  },
  {
    id: 4,
    title: "Diani on a Budget: The Complete Backpacker's Guide",
    category: "Budget Travel",
    tag: "Backpacker",
    excerpt: "Sleep, eat, and explore Diani for under $30/day. Hostels, local food joints, and free beaches — everything you need to know.",
    image: "https://images.unsplash.com/photo-1746252000399-8af3d8375b78?w=600&h=400&fit=crop&auto=format",
    readTime: "7 min read",
    date: "May 20, 2026",
    trending: false,
  },
  {
    id: 5,
    title: "Wasini Island: The Day Trip You Can't Miss",
    category: "Experiences",
    tag: "Day Trip",
    excerpt: "Just 2 hours from Diani, Wasini Island offers dolphin watching, mangrove walks, and some of the best snorkeling on the East African coast.",
    image: "https://images.unsplash.com/photo-1544550581-1bcabf842b77?w=600&h=400&fit=crop&auto=format",
    readTime: "5 min read",
    date: "May 14, 2026",
    trending: false,
  },
  {
    id: 6,
    title: "Best Restaurants in Diani Beach 2026",
    category: "Food & Drink",
    tag: "Dining",
    excerpt: "Fresh seafood, Swahili spices, and world-class ambiance. Our definitive guide to eating well on the Kenyan coast.",
    image: "https://images.unsplash.com/photo-1621015529462-e72d21f2db05?w=600&h=400&fit=crop&auto=format",
    readTime: "6 min read",
    date: "May 5, 2026",
    trending: false,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Accommodation": "#c9a84c",
  "Travel Guide": "#1e3a5f",
  "Budget Travel": "#2a7f62",
  "Experiences": "#e8714a",
  "Food & Drink": "#ec4899",
};

export function Blog() {
  // Removed: “Diani Travel Journal / Travel Guides & Stories” section.
  // Returning null keeps the component import-compatible while hiding its UI.
  return null;
}

