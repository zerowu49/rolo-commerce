"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { apiURLPaths } from "@/lib/constant";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>();

  const sessionId = searchParams.get("session_id");

  const hitStripeAPI = async () => {
    try {
      const res = await fetch(
        apiURLPaths.checkoutSession + "?session_id=" + sessionId,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create payment intent");
      }
      setData(data);
    } catch (err: any) {
      console.log("error hitting stripe api:", err);
    }
  };

  useEffect(() => {
    hitStripeAPI();
  }, []);

  const renderDescription = (title: string, description: string) => {
    return (
      <div className="flex justify-between pt-4">
        <div className="text-base font-medium text-gray-900">{title}</div>
        <div className="text-base font-medium text-gray-900">{description}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Payment Successful!
            </h1>
            <p className="mt-4 text-lg text-description">
              Thank you for your order. We've received your payment and are
              processing your order.
            </p>
          </div>

          <div className="mt-16 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black-100">
              Order Summary
            </h2>
            {data ? (
              <div className="mt-6 space-y-2">
                {data.id && renderDescription("ID Number", data.id)}
                {data.currency && renderDescription("Currency", data.currency)}
                {data.payment_status &&
                  renderDescription("Payment Status", data.payment_status)}
                {data.amount_total &&
                  renderDescription("Total", `$${data.amount_total / 100}`)}
              </div>
            ) : (
              <p className="text-center text-description">
                Getting data from Stripe...
              </p>
            )}
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-100 hover:bg-green-800 focus:outline-none"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
