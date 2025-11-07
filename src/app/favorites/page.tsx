"use client";

import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { deleteProduct } from "@/redux/features/productSlice";
import { ProductGrid } from "@/components/products";
import { PageHeader, EmptyState } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks";
import { ROUTES, TOAST_MESSAGES } from "@/constants";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const { favorites, isFavorite, handleToggleFavorite } = useFavorites();

  const handleDelete = async (productId: number) => {
    const product = favorites.find((p) => p.id === productId);
    const result = await dispatch(deleteProduct(productId));

    if (result.meta.requestStatus === "fulfilled") {
      if (product) {
        handleToggleFavorite(product);
      }
      toast.success(
        TOAST_MESSAGES.PRODUCT_DELETED(product?.title || "Product")
      );
    } else {
      toast.error(TOAST_MESSAGES.DELETE_FAILED);
    }
  };

  return (
    <main className="p-6">
      <PageHeader
        title="Your Favorites"
        action={
          <Button asChild variant="link">
            <Link href={ROUTES.HOME}>&larr; Back to Products</Link>
          </Button>
        }
      />

      {favorites.length > 0 ? (
        <ProductGrid
          products={favorites}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
          onDelete={handleDelete}
        />
      ) : (
        <EmptyState
          message="You haven't added any favorites yet."
          actionLabel="Browse Products"
          actionHref={ROUTES.HOME}
          icon={<Heart className="h-12 w-12 text-muted-foreground" />}
        />
      )}
    </main>
  );
}
