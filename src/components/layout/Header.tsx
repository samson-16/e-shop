"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleTheme } from "@/redux/features/themeSlice";
import { logout } from "@/redux/features/authSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useAppSelector((state) => state.theme.mode);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="border-b backdrop-blur-sm bg-background/95 sticky top-0 z-50"
    >
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            E-Shop
          </motion.span>
        </Link>
        <div className="flex items-center gap-3">
          {isAuthenticated && user && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-sm"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{user.username}</span>
            </motion.div>
          )}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild variant="outline" size="sm">
              <Link href="/favorites">My Favorites</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="sm">
              <Link href="/add">Add Product</Link>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </motion.div>
          {isAuthenticated ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Login</Link>
              </Button>
            </motion.div>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
