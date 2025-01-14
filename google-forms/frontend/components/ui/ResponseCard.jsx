"use client";

export default function ResponseCard({ formTitle, answers }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">{formTitle}</h2>
      {Object.entries(answers).map(([question, answer], index) => (
        <div key={index} className="mb-2">
          <strong>{question}:</strong> {answer}
        </div>
      ))}
    </div>
  );
}

