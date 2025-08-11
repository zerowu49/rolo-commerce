"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { products } from "@/app/page";
import Header from "@/components/Header";
import Divider from "@/components/Divider";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const [searchQuery, setSearchChange] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const productId = parseInt(params.id as string);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleBack = () => {
    router.back();
  };

  const handleAddToCart = () => {
    const selectedColor = product.colorChoice
      ? Object.keys(product.colorChoice)[selectedColorIndex]
      : undefined;
    addToCart(product, selectedColor);
  };

  // Function to sync color selection with image selection
  const syncColorWithImage = (imageIndex: number) => {
    if (
      product.colorChoice &&
      Object.keys(product.colorChoice).length > imageIndex
    ) {
      setSelectedColorIndex(imageIndex);
    }
  };

  // Function to handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    syncColorWithImage(index);
  };

  // Sync color with image on page load
  useEffect(() => {
    syncColorWithImage(selectedImageIndex);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header searchQuery={searchQuery} onSearchChange={setSearchChange} />

      {/* Main Content */}
      <main className="flex h-[calc(100vh-200px)]">
        {/* Left Side */}
        <div className="w-2/5 p-8 flex flex-col items-center">
          <div className="max-w-md w-full">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden border border-gray-200 mb-6">
              <Image
                src={
                  product.listThumbnail?.[selectedImageIndex] || product.image
                }
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2">
              {product.listThumbnail?.map((thumbnail, index) => (
                <div
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-16 h-16 rounded border-2 cursor-pointer transition-colors relative overflow-hidden ${
                    index === selectedImageIndex
                      ? "border-green-100"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={thumbnail}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-3/5 p-8 overflow-y-auto">
          {/* Breadcrumbs */}
          <div className="text-sm text-grey mb-2">
            {product.category} &gt;&gt; Breville
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-md text-description">{product.description}</p>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {product.price !== product.endPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      ${product.endPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-2xl  text-green-100">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
                <span className="text-sm text-green-100 font-medium">
                  {Math.round(
                    ((product.endPrice - product.price) / product.endPrice) *
                      100
                  )}
                  % off, limited time offer
                </span>
              </div>
            </div>

            <Divider />

            {/* Color Options */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-description">
                  Colour
                </h3>
                <span className="text-sm text-grey font-medium">
                  {product.colorChoice
                    ? Object.keys(product.colorChoice)[selectedColorIndex]
                    : "Default"}
                </span>
              </div>

              <div className="flex space-x-3">
                {product.colorChoice &&
                  Object.entries(product.colorChoice).map(
                    ([colorName, hexColor], index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedColorIndex(index)}
                        className={`w-8 h-8 rounded border-2 cursor-pointer transition-all hover:scale-110 ${
                          index === selectedColorIndex
                            ? "border-green-100 border-4"
                            : "border-gray-400 hover:border-gray-600"
                        }`}
                        style={{ backgroundColor: hexColor }}
                      ></div>
                    )
                  )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <div
                className="text-description leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html:
                    product.fullDescription
                      ?.replace(/\n/g, "<br />")
                      .toString() ?? "",
                }}
              />
            </div>

            <Divider />

            {/* Additional Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-description">
                What's in the box
              </h3>
              <p className="text-description">
                On top of the machine itself, this comes with:
              </p>
              <ul className="space-y-2 text-gray-700">
                {product.listItems?.map((item, index) => (
                  <li key={index} className="flex items-start text-description">
                    <span className="w-1 h-1 bg-green-100 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-description hover:text-gray-900 bg-grey-white hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-green-100">
              ${product.price.toLocaleString()}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-green-200 hover:bg-green-800 text-white px-6 py-3 rounded-md  transition-colors flex items-center space-x-2"
            >
              <span>Add to Cart</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
