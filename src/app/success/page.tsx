"use client";

import { useChargily } from "@/hooks/use-chargily";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Importing useRouter for query parameters

export default function Home() {
  const { pay } = useChargily();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false); // New state for payment success
  const router = useRouter(); // Using the Next.js router

  // Check if the query parameter indicates payment success
  useEffect(() => {
    if (router.query.payment === "success") {
      setIsPaymentSuccess(true); // Set payment success to true if the query parameter is "success"
    }
  }, [router.query.payment]);

  return (
    <main className="w-full h-screen bg-white flex justify-center items-center">
      <div
        dir="rtl"
        className="w-[400px] h-[500px] flex flex-col items-center gap-y-4 py-4"
      >
        {isPaymentSuccess ? ( // Show a message if the payment was successful
          <div className="font-bold text-xl text-violet-600 text-center">
            لقد تم الدفع بنجاح! يمكنك الآن العودة إلى الصفحة الرئيسية.
          </div>
        ) : (
          <>
            <div className="font-bold text-xl text-violet-600 text-center">
              انقر فوق الزر أدناه سيتم إعادة توجيهك إلى صفحة الخروج حيث يمكنك اختبار الدفع إذا تمت إعادة توجيه النجاح إليه صفحة النجاح
            </div>

            <button
              className="bg-violet-500 text-white p-4 rounded-xl"
              onClick={async () => {
                setIsLoading(true);
                await pay({
                  product_name: "PDF",
                  product_price: 125,
                });
                setIsLoading(false);
              }}
            >
              {isLoading ? "loading..." : "pay now"}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
