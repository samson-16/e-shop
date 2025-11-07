"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProducts,
  resetProducts,
  deleteProduct,
} from "@/redux/features/productSlice";
import {
  ProductGrid,
  ProductSkeletonGrid,
  SearchBar,
  CategoryFilter,
} from "@/components/products";
import { PageHeader } from "@/components/layout";
import { useFavorites, useInfiniteScroll } from "@/hooks";
import { PAGINATION, TOAST_MESSAGES } from "@/constants";
import toast from "react-hot-toast";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { list, status, hasMore, isSearch, isFiltered } = useAppSelector(
    (state) => state.products
  );
  const { isFavorite, handleToggleFavorite } = useFavorites();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [skip, setSkip] = useState(0);

  // Debounced search and fetch products
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query !== "" || category !== "" || (query === "" && isSearch)) {
        setSkip(0);
        dispatch(resetProducts());
      }
      dispatch(fetchProducts({ query, category, skip }));
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, category, skip, dispatch, isSearch]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setQuery(""); // Clear search when filtering by category
  };

  const handleDelete = async (productId: number) => {
    const product = list.find((p) => p.id === productId);
    const result = await dispatch(deleteProduct(productId));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success(
        TOAST_MESSAGES.PRODUCT_DELETED(product?.title || "Product")
      );
    } else {
      toast.error(TOAST_MESSAGES.DELETE_FAILED);
    }
  };

  const lastProductElementRef = useInfiniteScroll({
    isLoading: status === "loading",
    hasMore: hasMore && !query && !isFiltered,
    onLoadMore: () => setSkip((prev) => prev + PAGINATION.PRODUCTS_PER_PAGE),
  });

  return (
    <main className="p-6">
      <PageHeader title="Products" />
      <SearchBar value={query} onChange={setQuery} />
      <CategoryFilter
        selectedCategory={category}
        onCategoryChange={handleCategoryChange}
      />

      {status === "loading" && list.length === 0 ? (
        <ProductSkeletonGrid count={PAGINATION.PRODUCTS_PER_PAGE} />
      ) : list.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <p>No products found.</p>
        </div>
      ) : (
        <ProductGrid
          products={list}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
          onDelete={handleDelete}
          lastProductRef={lastProductElementRef}
        />
      )}

      {status === "loading" && list.length > 0 && (
        <p className="text-center mt-10">Loading more...</p>
      )}
      {!hasMore && list.length > 0 && (
        <p className="text-center mt-10 text-muted-foreground">
          You've reached the end.
        </p>
      )}
    </main>
  );
}
