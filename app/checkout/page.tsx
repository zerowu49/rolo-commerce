"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Divider from "@/components/Divider";

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCartStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    streetAddress: "",
    unitNumber: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: "success" | "error", message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleBack = () => {
    router.back();
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMakePayment = async () => {
    setIsSubmitted(true);
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Create a hidden form to submit to Google Apps Script
        const form = document.createElement("form");
        form.method = "POST";
        form.action =
          "https://script.google.com/macros/s/AKfycbxMjIO9GQHob3PaEbYtfRtwckryP0EY3W3v-xoWUP8QGoBsuMurVd3gzTm_3e1O8-Tedg/exec";
        form.target = "hidden-iframe";
        form.style.display = "none";

        const formDataToSubmit = {
          ...formData,
          total: calculateTotal(),
        };

        Object.entries(formDataToSubmit).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        });

        // Create hidden iframe to handle the response
        const iframe = document.createElement("iframe");
        iframe.name = "hidden-iframe";
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        // Add form to page and submit
        document.body.appendChild(form);
        form.submit();

        // Clean up form and iframe
        setTimeout(() => {
          document.body.removeChild(form);
          document.body.removeChild(iframe);
        }, 1000);

        addToast("success", "Order submitted successfully!");
      } catch (error) {
        console.error("Error submitting data:", error);
        addToast("error", "Error submitting order. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.streetAddress.trim() !== "" &&
      formData.postalCode.trim() !== ""
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center justify-between p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <span className="text-sm font-medium">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="mx-auto px-60 py-16">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-black-100">
            Your Details
          </h1>
        </div>

        {/* Form */}
        <form className=" space-y-8">
          {/* First Row - Name and Email */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-black-100 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                placeholder="James Hoffman"
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-transparent ${
                  errors.name && isSubmitted
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.name && isSubmitted && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-black-100 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                placeholder="james@gmail.com"
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-transparent ${
                  errors.email && isSubmitted
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.email && isSubmitted && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <Divider />

          {/* Street Address */}
          <div>
            <label className="block text-sm font-medium text-black-100 mb-2">
              Street Address
            </label>
            <input
              type="text"
              value={formData.streetAddress}
              placeholder="1 Sesame Street, Big Bird Building"
              onChange={(e) =>
                handleInputChange("streetAddress", e.target.value)
              }
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-transparent ${
                errors.streetAddress && isSubmitted
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.streetAddress && isSubmitted && (
              <p className="text-red-500 text-sm mt-1">
                {errors.streetAddress}
              </p>
            )}
          </div>

          {/* Unit Number and Postal Code */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="flex justify-between text-sm font-medium text-black-100 mb-2">
                Unit / House Number
                <span className="text-sm text-grey font-normal ml-2">
                  Optional
                </span>
              </label>
              <input
                type="text"
                value={formData.unitNumber}
                placeholder="#12-34"
                onChange={(e) =>
                  handleInputChange("unitNumber", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black-100 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                value={formData.postalCode}
                placeholder="123456"
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-transparent ${
                  errors.postalCode && isSubmitted
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.postalCode && isSubmitted && (
                <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
              )}
            </div>
          </div>
        </form>
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-black-100 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </button>

          <div className="flex items-center space-x-8">
            <span className="text-2xl text-green-100">
              Total ${calculateTotal().toLocaleString()}
            </span>
            <button
              onClick={handleMakePayment}
              disabled={!isFormValid() || isSubmitting}
              className={`px-6 py-3 rounded-md transition-all flex items-center space-x-2 ${
                isFormValid() && !isSubmitting
                  ? "bg-green-200 hover:bg-green-800 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
              }`}
            >
              <span>{isSubmitting ? "Submitting..." : "Make Payment"}</span>
              {!isSubmitting && <ChevronRight className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
