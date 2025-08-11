"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "the Barista Express",
    price: 798,
    description:
      "The best-selling, home espresso machine, with a built-in grinder",
    fullDescription:
      "One of the world’s popular and well-recommended espresso machines for home use, the Barista Express is perfect for anyone wanting to get into coffee.\n\nThis semi-automatic machine balances simplicity and flexibility. With automated, low pressure pre-infusion and shot timers, you can pull espresso at just the press of a button. Hone your skills tamping, and experimenting with various beans, doses and grind sizes.\n\n With an in-built grinder and steam wand, this all-in-one setup is all you need is freshly roasted coffee beans and a weighing scale, to take your espresso to the next level and make cafe-level, specialty coffee at home.",
    image: "/images/Barista Express 1.png",
    category: "Machine & Equipments",
    endPrice: 998,
    listThumbnail: [
      "/images/Barista Express 1.png",
      "/images/Barista Express 2.png",
      "/images/Barista Express 3.png",
      "/images/Barista Express 4.png",
      "/images/Barista Express 5.png",
    ],
    listItems: [
      "54mm Portafilter, stainless steel with double spout",
      "4 Espresso Filter Baskets – 9g & 18g pressurised, 9g & 18g unpressurised",
      "Integrated, Magnetic Tamper",
      "480ml (16oz) Thermal Milk Jug",
      "Dosing Funnel",
      "Leveling Tool",
      "Water Filter",
      "Maintenance Kit – cleaning brush, Allen key, cleaning disc, steam wand pin",
      "1 Descaling Dose, and 2 Cleaning Tablets",
    ],
    colorChoice: {
      "Stainless Steel": "#F0F0F0",
      "Black Truffle": "#375737",
    },
  },
  {
    id: 2,
    name: "the Bambino",
    price: 498,
    description: "The best value for money, standalone espresso machine",
    fullDescription:
      "One of the world’s popular and well-recommended espresso machines for home use, the Barista Express is perfect for anyone wanting to get into coffee.\n\nThis semi-automatic machine balances simplicity and flexibility. With automated, low pressure pre-infusion and shot timers, you can pull espresso at just the press of a button. Hone your skills tamping, and experimenting with various beans, doses and grind sizes.\n\n With an in-built grinder and steam wand, this all-in-one setup is all you need is freshly roasted coffee beans and a weighing scale, to take your espresso to the next level and make cafe-level, specialty coffee at home.",
    image: "/images/Bambino 1.png",
    category: "Machine & Equipments",
    endPrice: 598,
    listThumbnail: [
      "/images/Bambino 1.png",
      "/images/Bambino 2.png",
      "/images/Bambino 3.png",
      "/images/Bambino 4.png",
    ],
    listItems: [
      "54mm Portafilter, stainless steel with double spout",
      "4 Espresso Filter Baskets – 9g & 18g pressurised, 9g & 18g unpressurised",
      "Integrated, Magnetic Tamper",
      "480ml (16oz) Thermal Milk Jug",
      "Dosing Funnel",
      "Leveling Tool",
      "Water Filter",
      "Maintenance Kit – cleaning brush, Allen key, cleaning disc, steam wand pin",
      "1 Descaling Dose, and 2 Cleaning Tablets",
    ],
    colorChoice: {
      "Stainless Steel": "#F0F0F0",
    },
  },
  {
    id: 3,
    name: "the Bambino Plus",
    price: 598,
    description: "Everything in the Bambino, plus automatic milk frothing",
    fullDescription:
      "One of the world’s popular and well-recommended espresso machines for home use, the Barista Express is perfect for anyone wanting to get into coffee.\n\nThis semi-automatic machine balances simplicity and flexibility. With automated, low pressure pre-infusion and shot timers, you can pull espresso at just the press of a button. Hone your skills tamping, and experimenting with various beans, doses and grind sizes.\n\n With an in-built grinder and steam wand, this all-in-one setup is all you need is freshly roasted coffee beans and a weighing scale, to take your espresso to the next level and make cafe-level, specialty coffee at home.",
    image: "/images/Bambino Plus 1.png",
    category: "Machine & Equipments",
    endPrice: 698,
    listThumbnail: [
      "/images/Bambino Plus 1.png",
      "/images/Bambino Plus 2.png",
      "/images/Bambino Plus 3.png",
      "/images/Bambino Plus 4.png",
    ],
    listItems: [
      "54mm Portafilter, stainless steel with double spout",
      "4 Espresso Filter Baskets – 9g & 18g pressurised, 9g & 18g unpressurised",
      "Integrated, Magnetic Tamper",
      "480ml (16oz) Thermal Milk Jug",
      "Dosing Funnel",
      "Leveling Tool",
      "Water Filter",
      "Maintenance Kit – cleaning brush, Allen key, cleaning disc, steam wand pin",
      "1 Descaling Dose, and 2 Cleaning Tablets",
    ],
    colorChoice: {
      "Stainless Steel": "#F0F0F0",
    },
  },
  {
    id: 4,
    name: "the Oracle Touch",
    price: 3988,
    description:
      "Top of the line Dual Boiler performance with touch screen usability.",
    fullDescription:
      "One of the world’s popular and well-recommended espresso machines for home use, the Barista Express is perfect for anyone wanting to get into coffee.\n\nThis semi-automatic machine balances simplicity and flexibility. With automated, low pressure pre-infusion and shot timers, you can pull espresso at just the press of a button. Hone your skills tamping, and experimenting with various beans, doses and grind sizes.\n\n With an in-built grinder and steam wand, this all-in-one setup is all you need is freshly roasted coffee beans and a weighing scale, to take your espresso to the next level and make cafe-level, specialty coffee at home.",
    image: "/images/Oracle Touch 1.png",
    category: "Machine & Equipments",
    endPrice: 4888,
    listThumbnail: [
      "/images/Oracle Touch 1.png",
      "/images/Oracle Touch 2.png",
      "/images/Oracle Touch 3.png",
      "/images/Oracle Touch 4.png",
    ],
    listItems: [
      "54mm Portafilter, stainless steel with double spout",
      "4 Espresso Filter Baskets – 9g & 18g pressurised, 9g & 18g unpressurised",
      "Integrated, Magnetic Tamper",
      "480ml (16oz) Thermal Milk Jug",
      "Dosing Funnel",
      "Leveling Tool",
      "Water Filter",
      "Maintenance Kit – cleaning brush, Allen key, cleaning disc, steam wand pin",
      "1 Descaling Dose, and 2 Cleaning Tablets",
    ],
    colorChoice: {
      "Stainless Steel": "#F0F0F0",
    },
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="px-10 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-left">
          Machine & Equipments
        </h1>

        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
}
