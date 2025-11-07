import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleFavorite } from "@/redux/features/favoritesSlice";
import { Product } from "@/types/product";
import toast from "react-hot-toast";

export function useFavorites() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);

  const isFavorite = (productId: number) => {
    return favorites.some((p) => p.id === productId);
  };

  const handleToggleFavorite = (product: Product) => {
    const isFav = isFavorite(product.id);
    dispatch(toggleFavorite(product));

    if (isFav) {
      toast.success("Removed from favorites");
    } else {
      toast.success("Added to favorites");
    }
  };

  return {
    favorites,
    isFavorite,
    handleToggleFavorite,
  };
}
