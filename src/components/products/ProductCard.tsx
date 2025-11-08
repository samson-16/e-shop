"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, HeartOff, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: number) => void;
  onDelete: (productId: number) => void;
}

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onDelete,
}: ProductCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(product.id);
    setIsDeleting(false);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative flex h-full flex-col overflow-hidden border-2 hover:border-primary/50 transition-colors">
        <CardHeader className="relative p-0">
          <Link href={`/product/${product.id}`} className="block">
            <div className="relative aspect-square w-full bg-muted overflow-hidden">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                priority={false}
                sizes="(min-width: 768px) 240px, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </Link>

          <motion.button
            type="button"
            onClick={() => onToggleFavorite(product.id)}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-primary shadow backdrop-blur-sm"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              initial={false}
              animate={{ scale: isFavorite ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              {isFavorite ? (
                <Heart className="h-5 w-5 fill-current text-red-500" />
              ) : (
                <HeartOff className="h-5 w-5" />
              )}
            </motion.div>
          </motion.button>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-base font-semibold">
              <Link href={`/product/${product.id}`}>{product.title}</Link>
            </h3>
            <span className="min-w-max text-lg font-semibold">
              ${product.price}
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-3 px-4 pb-4 text-sm text-muted-foreground">
          <div className="flex flex-col">
            <span className="font-medium capitalize">{product.category}</span>
            <span>⭐ {product.rating.toFixed(1)}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild className="min-w-max">
              <Link
                href={`/edit/${product.id}`}
                className="inline-flex items-center gap-1"
              >
                <Pencil className="size-4" /> Edit
              </Link>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="min-w-max"
                  disabled={isDeleting}
                >
                  <Trash2 className="size-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Product</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{product.title}"? This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
