"use client";
import React, { useState, useEffect } from "react";
import { fetchBooksByCategory } from "../api/books";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<{ id: string; name: string; books: { id: string; title: string; author: string; coverImageUrl: string }[] }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadBooksByCategory = async () => {
            setLoading(true);
            setError(false);
            try {
                const data = await fetchBooksByCategory();
                setCategories(data || []);
            } catch (err) {
                console.error("Failed to fetch books by category:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadBooksByCategory();
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Books by Category</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">Failed to load categories.</p>
            ) : (
                categories.map((category) => (
                    <div key={category.id} className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
                        <div className="grid grid-cols-5 md:grid-cols-5 sm:grid-cols-5 gap-4">
                            {category.books.map((book) => (
                                <div 
                                    key={book.id} 
                                    className="border p-3 rounded-lg shadow-md bg-white w-48 transition-transform hover:scale-105"
                                >
                                    <img
                                        src={book.coverImageUrl || "https://via.placeholder.com/150"}
                                        alt={book.title}
                                        className="w-full h-64 object-cover mb-2 rounded-lg"
                                    />
                                    <h3 className="font-bold text-sm text-center">{book.title}</h3>
                                    <p className="text-gray-600 text-xs text-center">{book.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
