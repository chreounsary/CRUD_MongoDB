"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState('');

  const router = useRouter();
  console.log(categoryId, 'categoryId');
  useEffect(() => {
    async function fetchCategory() {
      const response = await fetch("http://localhost:3000/api/category");
      const data = await response.json();
      setCategory(data);
    }
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !categoryId) {
      alert("Title and description are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/item", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, categoryId }),
      });

      if (res.ok) {
        router.push("/dashboard/item");
      } else {
        throw new Error("Failed to create a Item");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Item Title"
      />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Item Description"
      />

      <select className="border border-slate-500 px-8 py-2"
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value=""></option>
        {category?.map((option) => (
          <option key={option._id} value={option._id}>
          {option.title}
        </option>
        ))}
      </select>


      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Item
      </button>
    </form>
  );
}