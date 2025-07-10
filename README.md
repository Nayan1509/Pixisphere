# 📸 Pixisphere - Photographer Booking Platform

Pixisphere is a responsive and elegant web platform to discover and book photographers for weddings, maternity, family portraits, and more. It features a beautiful landing page, category-based listings, real-time filtering, animations, and clean UI.

---

## 🚀 Setup Instructions

### 1. **Clone the repository**
```bash
git clone [https://github.com/Nayan1509/Pixisphere.git]
cd pixisphere
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Run the development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧱 Project Structure

```
├── components/         # Reusable UI components (Navbar, Card, Filters, Modal)
├── context/            # Global FilterContext (price, city, styles, sort, etc.)
├── pages/              # Next.js route-based pages (landing, category, profile)
├── public/             # Static assets like images
├── utils/api.ts        # Simulated API for photographer data
├── styles/             # Tailwind and global styles
```

---

## 🧠 Filtering, Debounce & Logic

### 🔍 Debounced Filtering
- The `CategoryPage` implements **debounced filtering** using `setTimeout` and `clearTimeout` inside a `useEffect`.
- This ensures filter/search logic is not called on every keystroke, but only **after 300ms** of inactivity.

### 🎛️ Filtering Logic
Photographers are filtered based on:

- **Search Query** – Matches `name`, `location`, or `tags`
- **Category Tab** – Filters photographers by selected `tag`
- **Filters Sidebar** – Filters by:
  - Price range
  - Rating (minimum)
  - Styles (checkboxes)
  - City (dropdown)
  - Sort by: Price, Rating, or Recently Added

```ts
result = photographers.filter(p =>
  p.price >= filters.price[0] &&
  p.price <= filters.price[1] &&
  p.rating >= filters.rating &&
  (filters.city ? p.location === filters.city : true) &&
  (filters.styles.length === 0 || filters.styles.some(style => p.styles.includes(style)))
);
```

### ⏱️ Sorting
Results can be sorted by:
- **Price (Low → High)**
- **Rating (High → Low)**
- **Recently Added (by ID)**

---

## 💎 Features

- 🖼️ Masonry photo gallery with lightbox
- 🎯 Tag/category-based tabs
- ⚙️ Filter sidebar as animated drawer
- 🧠 Debounced search logic
- 📱 Fully responsive & mobile-friendly
- 💌 Modal inquiry form with validation + toast
- ⚡ Framer Motion animations

---

## 📦 Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hot Toast](https://react-hot-toast.com/)
- [React Loading Skeleton](https://github.com/dvtng/react-loading-skeleton)

---

## 📸 Credits

Mock photographer data and sample images are for demonstration purposes only.

---

