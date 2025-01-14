"use client";

import { useState } from "react";
import SidebarLayout from "@/components/ui/SidebarLayout"; // Reusable sidebar layout

export default function HelpAndSupportPage() {
  const [faq, setFaq] = useState([
    {
      question: "Will you be adding more templates later?",
      answer: "Yes, we are working on adding more templates soon.",
      open: false,
    },
    {
      question: "Can I create a custom form from scratch?",
      answer: "Absolutely! You can create forms from scratch using our builder.",
      open: false,
    },
  ]);

  const toggleFaq = (index) => {
    setFaq((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, open: !item.open } : { ...item, open: false }
      )
    );
  };

  return (
    <SidebarLayout>
      <div className="p-8 bg-gray-50 flex-1">
        <h1 className="text-2xl font-bold mb-6">Help & Support</h1>

        {/* FAQ Section */}
        <div className="bg-white shadow-md rounded p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          {faq.map((item, index) => (
            <div
              key={index}
              className="border-b py-4 cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">{item.question}</p>
                <span>{item.open ? "▲" : "▼"}</span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  item.open ? "max-h-screen" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 mt-2">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact and Chat Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Section */}
          <div className="bg-white shadow-md rounded p-6">
            <h3 className="text-lg font-semibold mb-4">Get in touch with us</h3>
            <p className="mb-2">📞 +91 9983XX7898</p>
            <p className="mb-2">📞 +91 9983XX7897</p>
            <p className="mb-2">📧 support@formbuilder.com</p>
            <p>📧 help@formbuilder.com</p>
          </div>

          {/* Chat Section */}
          <div className="bg-white shadow-md rounded p-6">
            <h3 className="text-lg font-semibold mb-4">Chat with our experts</h3>
            <p className="mb-4 text-gray-600">
              Chat with one of our experts. They can answer, guide, and resolve
              your issues.
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
              aria-label="Start a chat session with our support team"
            >
              Start a Chat Now
            </button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
