# Category Filter Feature

This document describes the implementation of the category filter feature for the eCommerce Shop.

## 📋 Overview

The category filter allows users to filter products by category using the DummyJSON API endpoints:

- `GET /products/categories` - Fetch all available categories
- `GET /products/category/:category` - Fetch products by category

## 🎯 Features Implemented

### 1. **CategoryFilter Component**

Location: `src/components/products/CategoryFilter.tsx`

**Features:**

- Fetches all available categories from API
- Displays categories as filter buttons
- Shows "All Products" button to clear filter
- Highlights active category
- Loading skeleton while fetching categories
- Responsive button layout with flex-wrap

**Props:**

```typescript
interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}
```

**Usage:**

```tsx
<CategoryFilter
  selectedCategory={category}
  onCategoryChange={handleCategoryChange}
/>
```

### 2. **Redux State Updates**

Location: `src/redux/features/productSlice.ts`

**Changes:**

- Added `isFiltered` state to track category filtering
- Updated `FetchProductsArgs` to include `category` parameter
- Modified `fetchProducts` thunk to handle category filtering
- Updated URL logic to use category endpoint when category is selected

**State Interface:**

```typescript
interface ProductsState {
  list: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  hasMore: boolean;
  isSearch: boolean;
  isFiltered: boolean; // New
}
```

**Fetch Logic:**

```typescript
if (query) {
  url = `/products/search?q=${query}`;
} else if (category) {
  url = `/products/category/${category}?limit=10&skip=${skip}`;
} else {
  url = `/products?limit=10&skip=${skip}`;
}
```

### 3. **Home Page Integration**

Location: `src/app/page.tsx`

**Changes:**

- Added `category` state
- Added `handleCategoryChange` function
- Integrated `CategoryFilter` component
- Updated fetch logic to include category
- Clear search when category is selected
- Disable infinite scroll when filtering by category
- Show "No products found" message when no results

**State Management:**

```typescript
const [category, setCategory] = useState("");

const handleCategoryChange = (newCategory: string) => {
  setCategory(newCategory);
  setQuery(""); // Clear search when filtering
};
```

## 🎨 UI/UX Features

### Visual Design

- **Active State**: Selected category button uses primary variant
- **Badge Indicator**: Shows "Active" badge on selected category
- **Responsive Layout**: Buttons wrap on smaller screens
- **Loading State**: Skeleton loaders while fetching categories
- **Capitalization**: Category names are capitalized and formatted

### User Experience

- **Mutual Exclusivity**: Search and category filter are mutually exclusive
  - Selecting a category clears the search
  - Searching clears the category filter
- **All Products**: Easy way to clear filter and show all products
- **Infinite Scroll**: Works with category filtering
- **Empty State**: Shows message when no products match filter

## 📊 API Integration

### Endpoints Used

1. **Get All Categories**

```
GET https://dummyjson.com/products/categories
Response: string[]
```

2. **Get Products by Category**

```
GET https://dummyjson.com/products/category/:category?limit=10&skip=0
Response: {
  products: Product[],
  total: number,
  skip: number,
  limit: number
}
```

### Example Categories

- beauty
- fragrances
- furniture
- groceries
- home-decoration
- kitchen-accessories
- laptops
- mens-shirts
- mens-shoes
- mens-watches
- mobile-accessories
- motorcycle
- skin-care
- smartphones
- sports-accessories
- sunglasses
- tablets
- tops
- vehicle
- womens-bags
- womens-dresses
- womens-jewellery
- womens-shoes
- womens-watches

## 🔄 State Flow

```
User clicks category button
    ↓
handleCategoryChange(category)
    ↓
setCategory(category)
setQuery("") // Clear search
    ↓
useEffect triggers
    ↓
dispatch(resetProducts())
dispatch(fetchProducts({ category, skip: 0 }))
    ↓
API call to /products/category/:category
    ↓
Products filtered by category displayed
```

## 💡 Implementation Details

### 1. **Category Formatting**

Categories from API use kebab-case (e.g., "mens-shirts")
Display format: Title Case with spaces (e.g., "Mens Shirts")

```tsx
{
  category.replace(/-/g, " ");
}
```

### 2. **Filter Priority**

1. Search query (highest priority)
2. Category filter
3. All products (default)

### 3. **Pagination with Filters**

- Infinite scroll works with category filtering
- Each category has its own pagination
- Switching categories resets pagination

### 4. **Loading States**

- Initial load: Shows skeleton grid
- Category switch: Shows skeleton grid
- Infinite scroll: Shows "Loading more..." text

## 🧪 Testing Scenarios

### Test Cases

1. **Load Categories**

   - ✅ Categories load on page mount
   - ✅ Loading skeleton shows while fetching
   - ✅ All categories display as buttons

2. **Filter by Category**

   - ✅ Click category button filters products
   - ✅ Active category is highlighted
   - ✅ Products match selected category
   - ✅ Pagination works with filtered results

3. **Clear Filter**

   - ✅ Click "All Products" shows all products
   - ✅ Active state updates correctly

4. **Search + Category Interaction**

   - ✅ Selecting category clears search
   - ✅ Searching clears category filter
   - ✅ Only one filter active at a time

5. **Infinite Scroll**

   - ✅ Works with category filter
   - ✅ Loads more products from same category
   - ✅ Stops when all products loaded

6. **Empty States**
   - ✅ Shows message when no products found
   - ✅ Handles API errors gracefully

## 📱 Responsive Design

### Mobile (< 640px)

- Buttons stack and wrap
- Full-width layout
- Touch-friendly button sizes

### Tablet (640px - 1024px)

- Buttons wrap in 2-3 rows
- Comfortable spacing

### Desktop (> 1024px)

- All buttons visible in 1-2 rows
- Optimal spacing and layout

## 🚀 Performance Optimizations

1. **Category Caching**: Categories fetched once on mount
2. **Debounced Fetch**: 500ms debounce on filter changes
3. **Efficient Re-renders**: Only re-fetch when category changes
4. **Skeleton Loading**: Immediate visual feedback

## 📝 Code Examples

### Using the Category Filter

```tsx
import { CategoryFilter } from "@/components/products";

function ProductPage() {
  const [category, setCategory] = useState("");

  return (
    <CategoryFilter
      selectedCategory={category}
      onCategoryChange={setCategory}
    />
  );
}
```

### Fetching Products by Category

```tsx
// Redux action
dispatch(
  fetchProducts({
    category: "smartphones",
    skip: 0,
  })
);

// Direct API call
const { data } = await axiosInstance.get(
  "/products/category/smartphones?limit=10&skip=0"
);
```

## 🎯 Benefits

1. **Better UX**: Users can quickly find products in specific categories
2. **Reduced Load**: Only fetch relevant products
3. **Clear Navigation**: Visual indication of active filter
4. **Flexible**: Works alongside search functionality
5. **Performant**: Efficient API calls and state management

## 🔮 Future Enhancements

Possible improvements:

- Multi-category selection
- Category icons
- Category product counts
- Subcategories
- Save filter preferences
- URL query parameters for shareable filters
- Category search/autocomplete

## 📚 Related Files

- `src/components/products/CategoryFilter.tsx` - Filter component
- `src/redux/features/productSlice.ts` - State management
- `src/app/page.tsx` - Integration
- `src/constants/index.ts` - API endpoints
- `src/components/products/index.ts` - Exports

## ✅ Summary

The category filter feature provides a seamless way for users to browse products by category. It integrates cleanly with existing search functionality, maintains good UX with loading states and visual feedback, and follows the established code organization patterns.

**Key Features:**

- ✅ Fetch and display all categories
- ✅ Filter products by category
- ✅ Clear filter to show all products
- ✅ Visual active state
- ✅ Works with infinite scroll
- ✅ Mutually exclusive with search
- ✅ Responsive design
- ✅ Loading states
- ✅ Empty states
