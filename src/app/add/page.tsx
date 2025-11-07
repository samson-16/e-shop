"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import toast from "react-hot-toast";

interface FormState {
  title: string;
  description: string;
  price: string;
  stock: string;
  brand: string;
  category: string;
}

const INITIAL_FORM: FormState = {
  title: "",
  description: "",
  price: "",
  stock: "",
  brand: "",
  category: "",
};

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdProduct, setCreatedProduct] = useState<Product | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setError(null);
    setCreatedProduct(null);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setCreatedProduct(null);

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        brand: form.brand.trim(),
        category: form.category.trim(),
      };

      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to create product. Please try again.");
      }

      const data: Product = await response.json();
      setCreatedProduct(data);
      setForm(INITIAL_FORM);
      toast.success(`Product "${data.title}" created successfully!`);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Unexpected error. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Add a New Product</h1>
        <Button variant="outline" onClick={handleBack}>
          &larr; Back
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="title">
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Product title"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the product"
                required
                className="min-h-[120px] w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-950"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="price">
                  Price
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="stock">
                  Stock
                </label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="0"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="brand">
                  Brand
                </label>
                <Input
                  id="brand"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="Brand name"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="category">
                  Category
                </label>
                <Input
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Category"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Submitting..." : "Create Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="flex-1"
              >
                Reset Form
              </Button>
            </div>

            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-200">
                {error}
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {createdProduct && (
        <Card>
          <CardHeader>
            <CardTitle>Product Created</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            <p>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                Title:
              </span>{" "}
              {createdProduct.title}
            </p>
            <p>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                Description:
              </span>{" "}
              {createdProduct.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <p>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Price:
                </span>{" "}
                ${createdProduct.price}
              </p>
              <p>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Stock:
                </span>{" "}
                {createdProduct.stock}
              </p>
              <p>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Brand:
                </span>{" "}
                {createdProduct.brand}
              </p>
              <p>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Category:
                </span>{" "}
                {createdProduct.category}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
