/**
 * Education Page
 * Display educational content about smoking dangers
 */

import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  BookOpen,
  Video,
  Lightbulb,
  Clock,
  Eye,
  ArrowRight,
  Filter,
  LayoutGrid
} from 'lucide-react'
import { useAdminStore } from '../../store'
import { educationCategories, contentTypes } from '../../data/education'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'

const Education = () => {
  const { education } = useAdminStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  // Filter content
  const filteredContent = useMemo(() => {
    return education.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesType = selectedType === 'all' || item.type === selectedType
      
      return matchesSearch && matchesCategory && matchesType
    })
  }, [education, searchQuery, selectedCategory, selectedType])

  // Get featured content
  const featuredContent = education.filter(item => item.featured).slice(0, 3)

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return BookOpen
      case 'video': return Video
      case 'tips': return Lightbulb
      default: return BookOpen
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'article': return 'primary'
      case 'video': return 'danger'
      case 'tips': return 'success'
      default: return 'default'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="text-primary-400 font-medium mb-4 block">EDUKASI</span>
            <h1 className="text-4xl md:text-5xl font-bold text-dark-100 mb-6">
              Pelajari Bahaya{' '}
              <span className="gradient-text">Rokok</span>
            </h1>
            <p className="text-lg text-dark-300">
              Temukan artikel, video, dan tips kesehatan untuk membantu Anda 
              memahami dampak rokok dan cara berhenti merokok.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      {featuredContent.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-dark-100 mb-8">Konten Pilihan</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {featuredContent.map((item, index) => {
                const TypeIcon = getTypeIcon(item.type)
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/education/${item.slug}`}>
                      <Card variant="hover" className="h-full group">
                        <div className="aspect-video bg-dark-800 rounded-xl mb-4 overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <TypeIcon className="w-12 h-12 text-primary-400/50" />
                          </div>
                          <Badge 
                            variant={getTypeColor(item.type)} 
                            className="absolute top-3 left-3"
                          >
                            {item.type === 'article' ? 'Artikel' : item.type === 'video' ? 'Video' : 'Tips'}
                          </Badge>
                        </div>
                        
                        <h3 className="font-semibold text-dark-100 mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        
                        <p className="text-dark-400 text-sm mb-4 line-clamp-2">
                          {item.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-dark-500">
                          <div className="flex items-center gap-4">
                            {item.readTime && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {item.readTime} menit
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {item.views?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Filter & Search Section */}
      <section className="py-8 border-y border-dark-800/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="text"
                placeholder="Cari artikel, video, tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-800/50 border border-dark-700/50 rounded-xl pl-10 pr-4 py-3 text-dark-100 placeholder-dark-400 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            {/* Type Filter */}
            <div className="flex gap-2">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedType === type.id
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                      : 'bg-dark-800/50 text-dark-400 border border-dark-700/50 hover:text-primary-400'
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            {educationCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'bg-dark-800/30 text-dark-400 hover:text-primary-400'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-dark-400">
              Menampilkan <span className="text-primary-400 font-medium">{filteredContent.length}</span> konten
            </p>
          </div>

          {filteredContent.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item, index) => {
                const TypeIcon = getTypeIcon(item.type)
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={`/education/${item.slug}`}>
                      <Card variant="hover" className="h-full group">
                        <div className="aspect-video bg-dark-800 rounded-xl mb-4 overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <TypeIcon className="w-10 h-10 text-primary-400/30" />
                          </div>
                          <Badge 
                            variant={getTypeColor(item.type)} 
                            size="sm"
                            className="absolute top-3 left-3"
                          >
                            {item.type === 'article' ? 'Artikel' : item.type === 'video' ? 'Video' : 'Tips'}
                          </Badge>
                          {item.featured && (
                            <Badge variant="warning" size="sm" className="absolute top-3 right-3">
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="font-semibold text-dark-100 mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        
                        <p className="text-dark-400 text-sm mb-4 line-clamp-2">
                          {item.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-dark-500">
                          <span>{item.author}</span>
                          <div className="flex items-center gap-3">
                            {item.readTime && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.readTime}m
                              </span>
                            )}
                            {item.duration && (
                              <span className="flex items-center gap-1">
                                <Video className="w-3 h-3" />
                                {item.duration}
                              </span>
                            )}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <LayoutGrid className="w-16 h-16 text-dark-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-dark-300 mb-2">
                Tidak ada konten ditemukan
              </h3>
              <p className="text-dark-400">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Education
