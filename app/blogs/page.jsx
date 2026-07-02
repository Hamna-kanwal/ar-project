import React from 'react';
import { Search, Clock3, ChevronRight } from 'lucide-react';

const BlogPage = () => {
  const categories = ['All', 'Energy Saving', 'Water Costs', 'Industry News', 'Case Studies'];
  const blogPosts = [
    { id: 1, title: 'How to reduce your office energy bills by 30% this year', category: 'Energy Saving', date: 'July 2, 2026', readTime: '5 min' },
    { id: 2, title: 'Understanding water consumption: A guide for UK businesses', category: 'Water Costs', date: 'June 28, 2026', readTime: '7 min' },
    { id: 3, title: 'The future of renewable energy in the commercial sector', category: 'Industry News', date: 'June 20, 2026', readTime: '4 min' },
    { id: 4, title: 'How we saved a warehouse £5,000 in annual energy costs', category: 'Case Studies', date: 'June 15, 2026', readTime: '6 min' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white py-16 px-4 text-center border-b border-gray-100">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#027cc1] tracking-tight">Energy Insights</h1>
        <p className="text-gray-600 mt-4 max-w-lg mx-auto">Expert guidance, industry news, and tips to help your business manage energy and water costs more effectively.</p>
        
        {/* Search Bar */}
        <div className="mt-8 max-w-md mx-auto relative">
          <input type="text" placeholder="Search articles..." className="w-full p-4 pl-12 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#027cc1]/20" />
          <Search className="absolute left-4 top-4 text-gray-400" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((cat) => (
            <button key={cat} className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${cat === 'All' ? 'bg-[#027cc1] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className="h-40 bg-gray-100 rounded-2xl mb-6" /> {/* Placeholder Image */}
              <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest">{post.category}</span>
              <h3 className="text-xl font-bold text-gray-900 mt-2 mb-4 group-hover:text-[#027cc1] transition-colors">{post.title}</h3>
              <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
                <div className="flex items-center gap-1"><Clock3 size={14} /> {post.readTime} read</div>
                <div>{post.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-[#0f4b52] rounded-3xl p-10 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">Need a professional energy audit?</h2>
          <p className="mt-4 text-green-100 max-w-xl mx-auto">Our consultants are ready to help you identify savings and improve your business energy efficiency.</p>
          <button className="mt-8 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-bold text-white transition-all transform hover:scale-105">
            Book Your Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;