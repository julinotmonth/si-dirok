/**
 * Education Detail Page
 * Display single education content
 */

import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Clock,
  Eye,
  Calendar,
  User,
  Share2,
  Bookmark,
  ThumbsUp,
  BookOpen,
  Video,
  Lightbulb,
  Tag
} from 'lucide-react'
import { useAdminStore } from '../../store'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'

const EducationDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getEducationBySlug, incrementEducationViews, education } = useAdminStore()
  
  const content = getEducationBySlug(id)

  useEffect(() => {
    if (content) {
      incrementEducationViews(content.id)
    }
  }, [content?.id])

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dark-100 mb-4">Konten Tidak Ditemukan</h1>
          <p className="text-dark-400 mb-6">Artikel yang Anda cari tidak tersedia.</p>
          <Link to="/education">
            <Button leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Kembali ke Edukasi
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return BookOpen
      case 'video': return Video
      case 'tips': return Lightbulb
      default: return BookOpen
    }
  }

  const TypeIcon = getTypeIcon(content.type)

  // Get related content
  const relatedContent = education
    .filter(item => item.category === content.category && item.id !== content.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={content.type === 'article' ? 'primary' : content.type === 'video' ? 'danger' : 'success'}>
                  <TypeIcon className="w-3 h-3 mr-1" />
                  {content.type === 'article' ? 'Artikel' : content.type === 'video' ? 'Video' : 'Tips'}
                </Badge>
                {content.featured && (
                  <Badge variant="warning">Featured</Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-dark-100 mb-4">
                {content.title}
              </h1>

              <p className="text-lg text-dark-300 mb-6">
                {content.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-dark-400">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {content.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(content.publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                {content.readTime && (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {content.readTime} menit baca
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {content.views?.toLocaleString()} views
                </span>
              </div>
            </div>

            {/* Video Player (if video) */}
            {content.type === 'video' && content.videoUrl && (
              <div className="aspect-video bg-dark-800 rounded-2xl mb-8 overflow-hidden">
                <iframe
                  src={content.videoUrl}
                  title={content.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}

            {/* Article Content */}
            {content.content && (
              <div className="glass-card p-8 mb-8">
                <div 
                  className="prose prose-invert prose-primary max-w-none
                    prose-headings:text-dark-100 prose-headings:font-bold
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-p:text-dark-300 prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:text-dark-300 prose-ul:my-4
                    prose-li:my-1
                    prose-strong:text-primary-400
                    prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: content.content }}
                />
              </div>
            )}

            {/* Tags */}
            {content.tags && content.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <Tag className="w-4 h-4 text-dark-400" />
                {content.tags.map((tag, index) => (
                  <Badge key={index} variant="default" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 pt-8 border-t border-dark-800">
              <Button variant="outline" size="sm" leftIcon={<ThumbsUp className="w-4 h-4" />}>
                Bermanfaat
              </Button>
              <Button variant="ghost" size="sm" leftIcon={<Bookmark className="w-4 h-4" />}>
                Simpan
              </Button>
              <Button variant="ghost" size="sm" leftIcon={<Share2 className="w-4 h-4" />}>
                Bagikan
              </Button>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Author Card */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-dark-100 mb-4">Tentang Penulis</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <User className="w-6 h-6 text-dark-950" />
                </div>
                <div>
                  <p className="font-medium text-dark-100">{content.author}</p>
                  <p className="text-sm text-dark-400">Kontributor SI-DIROK</p>
                </div>
              </div>
            </div>

            {/* Related Content */}
            {relatedContent.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="font-semibold text-dark-100 mb-4">Konten Terkait</h3>
                <div className="space-y-4">
                  {relatedContent.map((item) => (
                    <Link
                      key={item.id}
                      to={`/education/${item.slug}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <div className="w-16 h-16 bg-dark-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          {(() => {
                            const Icon = getTypeIcon(item.type)
                            return <Icon className="w-6 h-6 text-primary-400/50" />
                          })()}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-dark-200 group-hover:text-primary-400 transition-colors line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-xs text-dark-500 mt-1">
                            {item.readTime && `${item.readTime} min`}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="glass-card p-6 bg-gradient-to-br from-primary-500/10 to-transparent border-primary-500/20">
              <h3 className="font-semibold text-dark-100 mb-2">Siap Cek Kesehatan?</h3>
              <p className="text-sm text-dark-400 mb-4">
                Lakukan diagnosis sekarang untuk mengetahui kondisi kesehatan Anda.
              </p>
              <Link to="/login">
                <Button size="sm" fullWidth>
                  Mulai Diagnosis
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default EducationDetail
