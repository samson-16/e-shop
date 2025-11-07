# Code Organization & Structure

This document outlines the clean folder structure and reusable components implemented in the eCommerce Shop project.

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── add/                      # Add product page
│   ├── edit/[id]/                # Edit product page
│   ├── favorites/                # Favorites page
│   ├── login/                    # Login page
│   ├── product/[id]/             # Product details page
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page (product listing)
│   └── globals.css               # Global styles
│
├── components/                   # Reusable components
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx            # Main navigation header
│   │   ├── PageHeader.tsx        # Page title with optional action
│   │   ├── EmptyState.tsx        # Empty state component
│   │   └── index.ts              # Barrel export
│   │
│   ├── products/                 # Product-related components
│   │   ├── ProductCard.tsx       # Individual product card
│   │   ├── ProductGrid.tsx       # Product grid layout
│   │   ├── ProductSkeleton.tsx   # Loading skeleton
│   │   ├── SearchBar.tsx         # Search input component
│   │   └── index.ts              # Barrel export
│   │
│   └── ui/                       # Shadcn UI components
│       ├── alert-dialog.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── skeleton.tsx
│
├── hooks/                        # Custom React hooks
│   ├── useInfiniteScroll.ts      # Infinite scroll logic
│   ├── useFavorites.ts           # Favorites management
│   └── index.ts                  # Barrel export
│
├── redux/                        # Redux state management
│   ├── features/                 # Redux slices
│   │   ├── authSlice.ts          # Authentication state
│   │   ├── favoritesSlice.ts     # Favorites state
│   │   ├── productSlice.ts       # Products state
│   │   └── themeSlice.ts         # Theme state
│   ├── hooks.ts                  # Typed Redux hooks
│   ├── providers.tsx             # Redux provider wrapper
│   └── store.ts                  # Redux store configuration
│
├── lib/                          # Utility libraries
│   ├── axiosInstance.ts          # Axios configuration
│   └── utils.ts                  # Utility functions
│
├── types/                        # TypeScript types
│   └── product.ts                # Product type definitions
│
└── constants/                    # Application constants
    └── index.ts                  # Routes, messages, config
```

## 🧩 Reusable Components

### Layout Components (`src/components/layout/`)

#### 1. **Header**

- Main navigation with logo, links, theme toggle, and auth
- Responsive design
- Integrates with Redux for theme and auth state

```tsx
import { Header } from "@/components/layout";
<Header />;
```

#### 2. **PageHeader**

- Consistent page title with optional action button
- Used across all pages for uniform headers

```tsx
import { PageHeader } from "@/components/layout";
<PageHeader title="Products" action={<Button>Action</Button>} />;
```

#### 3. **EmptyState**

- Reusable empty state with message, icon, and action
- Used for empty favorites, search results, etc.

```tsx
import { EmptyState } from "@/components/layout";
<EmptyState
  message="No items found"
  actionLabel="Browse Products"
  actionHref="/products"
  icon={<Icon />}
/>;
```

### Product Components (`src/components/products/`)

#### 1. **ProductCard**

- Individual product display with image, title, price, rating
- Favorite toggle button
- Edit and delete actions
- Confirmation dialog for deletion

```tsx
import { ProductCard } from "@/components/products";
<ProductCard
  product={product}
  isFavorite={isFavorite}
  onToggleFavorite={handleToggle}
  onDelete={handleDelete}
/>;
```

#### 2. **ProductGrid**

- Responsive grid layout for products
- Handles infinite scroll ref
- Adapts to different screen sizes (1-4 columns)

```tsx
import { ProductGrid } from "@/components/products";
<ProductGrid
  products={products}
  onToggleFavorite={handleToggle}
  isFavorite={isFavorite}
  onDelete={handleDelete}
  lastProductRef={ref}
/>;
```

#### 3. **ProductSkeleton & ProductSkeletonGrid**

- Loading state placeholders
- Matches product card dimensions
- Configurable count

```tsx
import { ProductSkeletonGrid } from "@/components/products";
<ProductSkeletonGrid count={10} />;
```

#### 4. **SearchBar**

- Reusable search input
- Debounced search functionality
- Customizable placeholder

```tsx
import { SearchBar } from "@/components/products";
<SearchBar value={query} onChange={setQuery} placeholder="Search..." />;
```

## 🪝 Custom Hooks

### 1. **useInfiniteScroll**

Handles infinite scroll logic with Intersection Observer

```tsx
import { useInfiniteScroll } from "@/hooks";

const lastElementRef = useInfiniteScroll({
  isLoading: status === "loading",
  hasMore: hasMore,
  onLoadMore: () => setSkip((prev) => prev + 10),
});
```

### 2. **useFavorites**

Manages favorites state and actions

```tsx
import { useFavorites } from "@/hooks";

const { favorites, isFavorite, handleToggleFavorite } = useFavorites();
```

## 📦 Constants & Configuration

### Routes (`src/constants/index.ts`)

Centralized route definitions

```tsx
import { ROUTES } from "@/constants";

<Link href={ROUTES.PRODUCT_DETAILS(productId)}>View</Link>;
```

### Toast Messages

Consistent toast notification messages

```tsx
import { TOAST_MESSAGES } from "@/constants";

toast.success(TOAST_MESSAGES.FAVORITE_ADDED);
```

### Pagination Config

Centralized pagination settings

```tsx
import { PAGINATION } from "@/constants";

const limit = PAGINATION.PRODUCTS_PER_PAGE; // 10
```

## 🎯 Design Principles

### 1. **Single Responsibility**

Each component has one clear purpose:

- `ProductCard` - Display single product
- `ProductGrid` - Layout multiple products
- `SearchBar` - Handle search input

### 2. **DRY (Don't Repeat Yourself)**

- Reusable components across pages
- Custom hooks for shared logic
- Constants for repeated values

### 3. **Separation of Concerns**

- **Components**: UI presentation
- **Hooks**: Business logic
- **Redux**: State management
- **Constants**: Configuration

### 4. **Barrel Exports**

Clean imports using index files:

```tsx
// Instead of:
import ProductCard from "@/components/products/ProductCard";
import ProductGrid from "@/components/products/ProductGrid";

// Use:
import { ProductCard, ProductGrid } from "@/components/products";
```

### 5. **Type Safety**

- TypeScript interfaces for all props
- Typed Redux hooks
- Type definitions in dedicated files

## 📝 Component Patterns

### Composition Pattern

Components are composed together:

```tsx
<PageHeader title="Products" />
<SearchBar value={query} onChange={setQuery} />
<ProductGrid products={products} {...handlers} />
```

### Container/Presentational Pattern

- **Container** (pages): Handle logic, state, side effects
- **Presentational** (components): Receive props, render UI

### Custom Hook Pattern

Extract reusable logic into hooks:

```tsx
// Before: Logic in component
const isFavorite = (id) => favorites.some((p) => p.id === id);

// After: Logic in hook
const { isFavorite } = useFavorites();
```

## 🚀 Benefits

### 1. **Maintainability**

- Easy to find and update code
- Clear file organization
- Consistent patterns

### 2. **Reusability**

- Components used across multiple pages
- Hooks shared between features
- No code duplication

### 3. **Scalability**

- Easy to add new features
- Clear structure for new developers
- Modular architecture

### 4. **Testability**

- Small, focused components
- Pure functions in hooks
- Easy to mock dependencies

### 5. **Developer Experience**

- Fast navigation with clear structure
- Autocomplete with barrel exports
- Type safety catches errors early

## 📊 Component Usage Map

```
HomePage (/)
├── PageHeader
├── SearchBar
└── ProductGrid
    └── ProductCard (multiple)

FavoritesPage (/favorites)
├── PageHeader
├── ProductGrid
│   └── ProductCard (multiple)
└── EmptyState (if no favorites)

ProductDetailsPage (/product/[id])
├── ProductCard (related products)
└── Custom layout

Layout (all pages)
└── Header
```

## 🎨 Styling Approach

- **Tailwind CSS**: Utility-first styling
- **Shadcn UI**: Pre-built accessible components
- **Responsive**: Mobile-first breakpoints
- **Dark Mode**: Theme toggle with Redux

## 📚 Best Practices Implemented

✅ Component composition over inheritance
✅ Custom hooks for shared logic
✅ Barrel exports for clean imports
✅ TypeScript for type safety
✅ Constants for configuration
✅ Consistent naming conventions
✅ Proper file organization
✅ Separation of concerns
✅ Reusable UI components
✅ Responsive design patterns

## 🔄 Migration Guide

### Old Structure → New Structure

```tsx
// Old
import ProductCard from "../components/productCard";
import ProductList from "../components/productList";

// New
import { ProductCard, ProductGrid } from "@/components/products";
```

```tsx
// Old
const isFavorite = (id) => favorites.some((p) => p.id === id);

// New
const { isFavorite } = useFavorites();
```

```tsx
// Old
<Link href={`/product/${id}`}>

// New
<Link href={ROUTES.PRODUCT_DETAILS(id)}>
```

## 📖 Summary

The codebase now follows industry best practices with:

- **Clean folder structure** organized by feature
- **Reusable components** that can be used across pages
- **Custom hooks** for shared business logic
- **Constants** for configuration and messages
- **Type safety** throughout the application
- **Consistent patterns** for maintainability

This organization makes the code easier to understand, maintain, and scale as the application grows.
