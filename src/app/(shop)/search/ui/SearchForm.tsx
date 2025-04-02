'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex justify-center gap-2">
      <input
        type="text"
        value={searchTerm}
        placeholder="Buscar producto..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full sm:w-[400px] px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 btn-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
      >
        Buscar
      </button>
    </form>
  );
}
