import React from 'react';
import Link from "next/link"; // 'Link' capital hona chahiye

const BlogCard = ({ title, excerpt, image, slug }) => (
  <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 mt-12">
    
    <div className="relative h-56 w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent z-10" />
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
    </div>

    <div className="p-8 bg-gradient-to-b from-white to-gray-50">
      <h4 className="text-blue-900 font-extrabold text-xl text-center uppercase mb-3 tracking-tight">
        {title}
      </h4>
      <p className="text-gray-600 text-sm text-center mb-6 leading-relaxed">
        {excerpt}
      </p>
      
      <div className="text-center">
        {/* Link component ka use */}
        <Link 
          href={`/blog/${slug}`} 
          className="font-bold text-xs uppercase tracking-widest text-gray-800 hover:text-orange-700 transition-colors"
        >
          Read More →
        </Link>
      </div>
    </div>
  </div>
);

const BlogGrid = () => {
  const posts = [
    { slug: "boiler-installation", title: "Boiler Installation", excerpt: "Professional tips for choosing the right boiler for your home.", image: "/boiler.jpg" },
    { slug: "power-flushing", title: "Power Flushing", excerpt: "Keep your central heating system running efficiently like new.", image: "/power.jpg" },
    { slug: "emergency-repairs", title: "Emergency Repairs", excerpt: "Our experts are here 24/7 for any unexpected heating failures.", image: "/boiler-repairs.jpg" }
  ];

  return (
    <div className="bg-slate-100 py-20 ">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-blue-900 mb-2">Our Latest Insights</h2>
        <div className="w-20 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <BlogCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default BlogGrid;