"use client"

import { Calendar, Tag, ChevronRight, AlertTriangle } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  tag: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Selenium vs Playwright: The Ultimate Showdown",
    excerpt: "A deep dive into the two most popular browser automation frameworks and when to use each.",
    date: "2025.12.01",
    tag: "Automation",
    readTime: "8 min",
  },
  {
    id: 2,
    title: "CI/CD Pipeline Testing Strategies",
    excerpt: "How to integrate automated tests into your continuous integration workflow effectively.",
    date: "2025.11.28",
    tag: "DevOps",
    readTime: "6 min",
  },
  {
    id: 3,
    title: "API Testing with Postman & Newman",
    excerpt: "Building robust API test suites that run anywhere in your infrastructure.",
    date: "2025.11.20",
    tag: "API",
    readTime: "10 min",
  },
  {
    id: 4,
    title: "Mobile App Testing: Appium Guide",
    excerpt: "Cross-platform mobile automation testing from setup to advanced patterns.",
    date: "2025.11.15",
    tag: "Mobile",
    readTime: "12 min",
  },
  {
    id: 5,
    title: "Performance Testing with K6",
    excerpt: "Load testing modern applications with developer-friendly JavaScript tooling.",
    date: "2025.11.10",
    tag: "Performance",
    readTime: "7 min",
  },
  {
    id: 6,
    title: "Test Data Management Best Practices",
    excerpt: "Strategies for maintaining clean, reliable test data across environments.",
    date: "2025.11.05",
    tag: "Strategy",
    readTime: "5 min",
  },
]

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative bg-card/90 backdrop-blur-sm border-2 p-6 cursor-pointer corrupted-card blog-card-corruption">
      {/* Corrupted data overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Glitch line decorations - transitions from green to red */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-secondary via-transparent to-secondary opacity-50 group-hover:from-primary group-hover:to-primary transition-all duration-400" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50 group-hover:via-primary transition-all duration-400" />

      {/* Content */}
      <div className="relative z-10">
        {/* System stats header */}
        <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground font-mono">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 corruption-icon" />
            {post.date}
          </span>
          <span className="flex items-center gap-1 corruption-text">
            <Tag className="w-3 h-3" />
            {post.tag}
          </span>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-3 glitch-hover transition-colors duration-400 group-hover:text-primary">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-mono">
            <span className="corruption-text">RUNTIME:</span> {post.readTime}
          </span>
          <span className="flex items-center gap-1 text-sm font-mono group-hover:gap-2 transition-all corruption-text">
            ACCESS
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      <div className="absolute -top-px -right-px px-2 py-0.5 text-xs font-mono flex items-center gap-1 transition-all duration-400 bg-secondary/30 text-secondary group-hover:bg-primary/30 group-hover:text-primary">
        <AlertTriangle className="w-3 h-3" />#{String(post.id).padStart(3, "0")}
      </div>
    </article>
  )
}

export function BlogGrid() {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-secondary font-mono text-sm mb-2 glow-text-matrix">{"// CORRUPTED_DATA_ARCHIVE"}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            BLOG <span className="text-primary glow-text">ENTRIES</span>
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="group px-6 py-3 border-2 border-secondary/50 text-secondary font-mono text-sm uppercase tracking-wider transition-all duration-400 corrupted-card hover:border-primary hover:text-primary hover:neon-border">
            Retrieve More Data Shards...
          </button>
        </div>
      </div>
    </section>
  )
}
