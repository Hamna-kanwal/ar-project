import React from 'react';
import Image from 'next/image';

const BlogDetailPage = () => {
  // Dummy Blog Data
  const post = {
    title: "Boiler Installation",
    image: "/boiler.jpg",
    content: [
      {
        heading: "Choosing the Right Boiler for Your Home",
        text: "Selecting the correct boiler is essential for maintaining a warm home and keeping your energy bills under control. Whether you are looking at a combi, system, or regular boiler, understanding your household's heating demands is the first step."
      },
      {
        heading: "Energy Efficiency and Long-Term Savings",
        text: "Modern A-rated boilers are significantly more efficient than older models. By upgrading your system, you not only reduce your carbon footprint but also enjoy lower monthly utility costs. We recommend looking for brands with long-term warranties to ensure peace of mind."
      },
      {
        heading: "Why Professional Installation Matters",
        text: "A boiler is a complex piece of equipment. Proper installation by a Gas Safe registered engineer ensures that your system operates safely and complies with all UK building regulations. Improper installation can lead to leaks, inefficiency, and costly repairs down the line."
      }
    ]
  };

  return (
    <article className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2d1b4e] mb-4 tracking-tight">
            {post.title}
          </h1>
          <div className="w-20 h-1.5 bg-[#e77600] mx-auto rounded-full"></div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full h-[400px] mb-12 rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Content Section */}
        <div className="prose prose-lg max-w-none text-gray-700">
          {post.content.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold text-[#2d1b4e] mb-4">{section.heading}</h2>
              <p className="leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 p-8 bg-gray-50 rounded-2xl border-l-4 border-[#e77600]">
          <h3 className="text-xl font-bold text-[#2d1b4e] mb-2">Need Professional Help?</h3>
          <p className="text-gray-600">
            Our Gas Safe engineers are ready to assist you with your boiler installation. 
            Contact us today for a free fixed-price quote.
          </p>
        </div>

      </div>
    </article>
  );
};

export default BlogDetailPage;