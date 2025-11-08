"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FloatingActionButton() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          asChild
          size="lg"
          className="h-14 w-14 rounded-full shadow-2xl bg-linear-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary"
        >
          <Link href="/add" aria-label="Add Product">
            <Plus className="h-6 w-6" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
