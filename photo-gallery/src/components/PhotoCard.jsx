import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

// Derived photo categories based on ID for visual context
const PHOTO_CATEGORIES = ["Nature", "Travel", "Sunset", "Architecture", "Portraits", "Fine Art"];

function PhotoCard({ photo, onPreview, index, isFeatured = false }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef(null);

  // Auto assign category & title for exhibition polish
  const categoryIndex = (parseInt(photo.id, 10) || index) % PHOTO_CATEGORIES.length;
  const category = photo.category || PHOTO_CATEGORIES[categoryIndex];
  const photoTitle = photo.title || `Moment #${photo.id}`;

  // Scroll reveal with IntersectionObserver
  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(cardElement);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observer.observe(cardElement);

    return () => {
      if (cardElement) observer.unobserve(cardElement);
      observer.disconnect();
    };
  }, []);

  const handleLike = (e) => {
    e.stopPropagation();
    setLikes((prev) => prev + 1);
    setIsLiked(true);
    setTimeout(() => setIsLiked(false), 200);
  };

  // Stagger reveal delay based on position
  const staggerDelay = `${(index % 6) * 0.08}s`;

  return (
    <article
      ref={cardRef}
      className={`masonry-item ${isFeatured ? "featured-card" : ""} ${
        isVisible ? "is-revealed" : "is-hidden"
      }`}
      style={{ animationDelay: staggerDelay }}
      onClick={() => onPreview({ ...photo, category, title: photoTitle })}
      role="button"
      tabIndex={0}
      aria-label={`View ${photoTitle} by ${photo.author}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onPreview({ ...photo, category, title: photoTitle });
        }
      }}
    >
      <div className={`masonry-image-wrapper ${imageLoaded ? "loaded" : "loading"}`}>
        {/* Blur-up placeholder shimmer */}
        {!imageLoaded && <div className="blur-placeholder-shimmer" />}

        <img
          src={photo.download_url}
          alt={`${photoTitle} by ${photo.author}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`masonry-image ${imageLoaded ? "image-visible" : "image-blur"}`}
        />

        {/* Hover overlay with Title, Category and Author sliding up */}
        <div className="masonry-hover-overlay">
          <div className="hover-slide-content">
            <span className="hover-category-tag">{category}</span>
            <h3 className="hover-photo-title">{photoTitle}</h3>

            <div className="hover-bottom-bar">
              <div className="hover-author-box">
                <span className="author-tag">Author</span>
                <span className="author-name">{photo.author}</span>
              </div>

              <button
                type="button"
                onClick={handleLike}
                className={`masonry-like-btn ${isLiked ? "like-active" : ""}`}
                aria-label="Like photo"
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                <span className="like-count">{likes}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PhotoCard;
