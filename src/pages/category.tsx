
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getPhotographers } from '@/utils/api'
import { useFilterContext } from '@/context/FilterContext'
import PhotographerCard from '@/components/PhotographerCard'
import FilterSidebar from '@/components/FilterSidebar'
import SearchBar from '@/components/SearchBar'
import CategoryTabs from '@/components/CategoryTabs'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export interface Photographer {
  id: number
  name: string
  location: string
  price: number
  rating: number
  styles: string[]
  tags: string[]
  bio: string
  profilePic: string
  portfolio: string[]
  reviews: {
    name: string
    rating: number
    comment: string
    date: string
  }[]
}

export default function CategoryPage() {
  const [photographers, setPhotographers] = useState<Photographer[]>([])
  const [filtered, setFiltered] = useState<Photographer[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(6)
  const [showFilters, setShowFilters] = useState(false)

  const { filters } = useFilterContext()
  const router = useRouter()
  const selectedTag = typeof router.query.tag === 'string' ? router.query.tag.toLowerCase() : ''

  const titleTag = selectedTag
    ? selectedTag.charAt(0).toUpperCase() + selectedTag.slice(1)
    : 'All'

  useEffect(() => {
    setIsLoading(true)
    getPhotographers().then((res) => {
      setPhotographers(res.data)
      setFiltered(res.data)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      let result = [...photographers]
      const q = searchQuery.toLowerCase()
      if (q) {
        result = result.filter((p) =>
          [p.name, p.location, ...(p.tags || [])].join(' ').toLowerCase().includes(q)
        )
      }
      if (selectedTag) {
        result = result.filter((p) =>
          p.tags.some((t) => t.toLowerCase() === selectedTag)
        )
      }
      result = result.filter(
        (p) =>
          p.price >= filters.price[0] &&
          p.price <= filters.price[1] &&
          p.rating >= filters.rating &&
          (filters.city ? p.location === filters.city : true) &&
          (filters.styles.length === 0 || filters.styles.some((s) => p.styles.includes(s)))
      )
      if (filters.sortBy === 'price') result.sort((a, b) => a.price - b.price)
      if (filters.sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
      if (filters.sortBy === 'recent') result.sort((a, b) => b.id - a.id)
      setFiltered(result)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery, filters, photographers, selectedTag])

  return (
    <>
      <Head>
        <title>{titleTag} Photographers | Pixisphere</title>
      </Head>

      <main className="p-4 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          Find best Photographer for you
        </h1>

        {/* Filters + Search in Row */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setShowFilters(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Filters
          </button>
          <div className="flex-1">
            <SearchBar query={searchQuery} setQuery={setSearchQuery} />
          </div>
        </div>

        {/* Drawer Filter Sidebar */}
        {showFilters && (
          <div className="fixed inset-0 z-50 bg-black/30">
            <div className="fixed top-0 left-0 h-full w-72 bg-white shadow-md p-5 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-900 hover:text-red-900 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <FilterSidebar photographers={photographers} />
            </div>
            {/* click outside to close */}
            <div
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 z-40"
            ></div>
          </div>
        )}
<CategoryTabs />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="p-4 bg-white rounded shadow">
                <Skeleton height={192} />
                <Skeleton count={3} className="mt-2" />
              </div>
            ))
          ) : filtered.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No photographers found.
            </p>
          ) : (
            filtered
              .slice(0, visibleCount)
              .map((p) => <PhotographerCard key={p.id} photographer={p} />)
          )}
        </div>

        {!isLoading && visibleCount < filtered.length && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Load More
            </button>
          </div>
        )}
      </main>
    </>
  );
}
