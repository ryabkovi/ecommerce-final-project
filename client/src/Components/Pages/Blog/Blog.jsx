import React from "react";
import { Link } from "react-router-dom";
import "./Blog.css";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Smartphones of 2024 – Which One Should You Buy?",
    date: "March 10, 2024",
    category: "smartphone",
    customImage:
      "https://primeprogressng.com/wp-content/uploads/2025/01/Toms-guide.jpg",
    description:
      "A comparison of the latest flagship smartphones to help you choose the best one for your needs.",
  },
  {
    id: 2,
    title: "Gaming Laptops vs. Desktops – Which One Is Right for You?",
    date: "March 5, 2024",
    category: "gaming",
    customImage:
      "https://www.stonerefurb.co.uk/media/blog/blog_laptop_vs_desktop.jpg",
    description:
      "Explore the pros and cons of gaming laptops vs. desktops and find out which suits your gaming style.",
  },
  {
    id: 3,
    title: "Best Noise-Canceling Headphones in 2024",
    date: "February 28, 2024",
    category: "headphones",
    customImage:
      "https://www.hificorp.co.za/api/catalog/product/w/h/wh_ch520_beige_standard_large_ecommerce_f9bd.png?width=700&height=700&store=hificorporation&image-type=image",
    description:
      "A review of the latest noise-canceling headphones to help you pick the perfect pair.",
  },
  {
    id: 4,
    title: "4K OLED vs. QLED TVs – Which One Offers the Best Picture?",
    date: "February 20, 2024",
    category: "tv-display",
    customImage:
      "https://topchoice.com.mt/wp-content/uploads/2024/03/e0241af4-474b-11ee-bfc9-8ee861fd9236-600x400.webp",
    description:
      "An in-depth comparison of OLED and QLED TVs to find out which one delivers the ultimate home entertainment experience.",
  },
];

// Utility to get image
const getImageUrl = (post) =>
  post.customImage
    ? post.customImage
    : `https://source.unsplash.com/600x400/?${post.category},technology`;

// Utility to create slug
const createSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");

function Blog() {
  return (
    <div className="blog-container">
      <h1>Latest Tech & Electronics News</h1>
      <p>
        Stay updated with the latest product releases, reviews, and buying
        guides.
      </p>

      {/* Featured Post */}
      <div className="featured-post">
        <img
          src={getImageUrl(blogPosts[0])}
          alt={`Image for ${blogPosts[0].title}`}
        />
        <div className="featured-content">
          <h2>{blogPosts[0].title}</h2>
          <p>{blogPosts[0].description}</p>
          <span className="blog-date">{blogPosts[0].date}</span>
        </div>
      </div>

      {/* Blog Post Grid */}
      <div className="blog-grid">
        {blogPosts.slice(1).map((post) => (
          <Link
            to={`/blog/${post.id}-${createSlug(post.title)}`}
            className="blog-card"
            key={post.id}
          >
            <img src={getImageUrl(post)} alt={`Image for ${post.title}`} />
            <div className="blog-info">
              <h3>{post.title}</h3>
              <span className="blog-date">{post.date}</span>
              <p>{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Blog;
