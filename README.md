## ⚙️ Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/pixisphere.git
cd pixisphere
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the JSON Server
```bash
npm install -g json-server
json-server --watch db.json --port 3001
```

API will be available at:
```
http://localhost:3001/photographers
```

### 5. Run the Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🧠 Filtering, Search & Logic

- **Debounced Search:** uses `useEffect` and `setTimeout` to delay filtering
- **Filters:**
  - Price Range (Slider)
  - Rating (3+, 4+, 4.5+)
  - Styles (Checkbox)
  - City (Dropdown)
- **Sort Options:**
  - Price (Low → High)
  - Rating (High → Low)
  - Recently Added (by ID)
- **Pagination:**
  - "Load More" button loads 6 more photographers at a time
- **Skeleton Loader:**
  - Shows placeholder cards while fetching
- **Context API:**
  - Filters are managed globally using `FilterContext`

---

## 📦 Tech Stack

- **Next.js (React)** — Frontend framework
- **Tailwind CSS** — Styling
- **Axios** — API requests
- **React Context API** — Global state management
- **JSON Server** — Mock REST API
- **react-loading-skeleton** — Loading UI

---

## 🔗 Deployment (Optional)

To deploy on Vercel:
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set build command: `npm run build`
5. Output directory: `.`

**Note:** JSON Server must be hosted separately or replaced with real API.

---

## 📸 Screenshots (Optional)
_Add UI screenshots here if needed._

---

## ✅ To-Do (Bonus)
- [ ] Add IntersectionObserver-based Infinite Scroll
- [ ] Form validation in inquiry modal
- [ ] Mobile drawer filters UI

---

Feel free to fork, improve, and build upon this project!