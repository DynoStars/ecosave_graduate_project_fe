import { ProductScan } from "@/types";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
type ScanAIGenerateProps = {
  product?: ProductScan;
};
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const urlAI = process.env.NEXT_PUBLIC_GEMINI_API_URL;
export default function ScanAIGenerate({ product }: ScanAIGenerateProps) {
  const [error, setError] = useState<string | null>(null);
  const [fullText, setFullText] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [loadingDots, setLoadingDots] = useState<string>(".");
  const getGenerateDataFromGeminiAI = async () => {
    try {
      const response = await fetch(`${urlAI}?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Dựa vào thông tin sản phẩm sau, hãy gợi ý:
                  - **Phương pháp chế biến**
                  - **Cách bảo quản**
                  - **Khoảng thời gian sử dụng an toàn**
                  **Thông tin sản phẩm:**
                  - **Tên:** ${product?.title}
                  - **Mô tả:** ${product?.description}
                  - **Thương hiệu:** ${product?.brand}
                  - **Trọng lượng:** ${product?.weight}
                  - **Kích thước:** ${product?.dimensions}
                  - **Bảo hành:** ${product?.warrantyInformation}
                  - **Ngày sản xuất:** ${product?.manufacturingDate}
                  - **Ngày hết hạn:** ${product?.expiryDate}
                  Trả lời chi tiết và có cấu trúc rõ ràng.`,
                },
              ],
            },
          ],
        }),
      });
      if (!response.ok) throw new Error("Không tìm thấy sản phẩm");
      const data = await response.json();
      const aiResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "Không có dữ liệu";
      setFullText(aiResponse);
      setDisplayedText("");
    } catch (err) {
      setError((err as Error).message);
    }
  };
  useEffect(() => {
    if (product) {
      getGenerateDataFromGeminiAI();
    }
  }, [product]);
  useEffect(() => {
    if (fullText) {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        index++;
        if (index === fullText.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [fullText]);
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setLoadingDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(dotInterval);
  }, []);
  return (
    <div className="bg-white text-black p-3">
      <h2 className="text-lg font-bold">Một số gợi ý cho sản phẩm</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="text-sm whitespace-pre-line">
          <ReactMarkdown>
            {displayedText || `Đang tải${loadingDots}`}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
