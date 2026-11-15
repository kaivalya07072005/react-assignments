import { useState, useEffect, useRef, useCallback } from "react";
import PhotoCard from "./components/PhotoCard";
import ImageModal from "./components/ImageModal";
import ContactSection from "./components/ContactSection";
import MeadowBlush from "./components/MeadowBlush";
import { getMockPicsumPage } from "./mockFeed";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isDiving, setIsDiving] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const sentinelRef = useRef(null);
  const isFetchingRef = useRef(false);

  // Prevent scrolling entirely when only viewing the fullscreen hero page
  useEffect(() => {
    if (!showGallery) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [showGallery]);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fetchPhotos = useCallback(async (pageNumber) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    let fetchedData = null;

    const candidateUrls = [
      `https://picsum.photos/v2/list?page=${pageNumber}`,
      `/api/picsum/v2/list?page=${pageNumber}`,
    ];

    for (const url of candidateUrls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            fetchedData = data;
            break;
          }
        }
      } catch {
        // Fallback
      }
    }

    if (!fetchedData) {
      await new Promise((res) => setTimeout(res, 350));
      fetchedData = getMockPicsumPage(pageNumber, 10);
    }

    if (!Array.isArray(fetchedData) || fetchedData.length === 0) {
      setHasMore(false);
    } else {
      setPhotos((prev) => {
        // Strict deduplication by ID and download_url
        const existingIds = new Set(prev.map((item) => String(item.id)));
        const existingUrls = new Set(prev.map((item) => item.download_url));

        const uniqueItems = fetchedData.filter(
          (item) =>
            !existingIds.has(String(item.id)) &&
            !existingUrls.has(item.download_url)
        );

        return [...prev, ...uniqueItems];
      });
      setPage((prevPage) => prevPage + 1);
    }

    setLoading(false);
    isFetchingRef.current = false;
  }, []);

  useEffect(() => {
    fetchPhotos(1);
  }, [fetchPhotos]);

  // Infinite scroll trigger: listen to both IntersectionObserver and window scroll
  useEffect(() => {
    if (!showGallery) return;

    const handleObserver = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading && !isFetchingRef.current) {
        fetchPhotos(page);
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "600px",
      threshold: 0,
    });

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    const handleWindowScroll = () => {
      if (!hasMore || loading || isFetchingRef.current) return;
      const scrollHeight = document.documentElement.scrollHeight;
      const currentTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight;

      // When within 700px of the bottom, fetch next page
      if (currentTop + clientHeight >= scrollHeight - 700) {
        fetchPhotos(page);
      }
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
      observer.disconnect();
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [fetchPhotos, page, hasMore, loading, showGallery]);

  const handleRetry = () => {
    fetchPhotos(page);
  };

  const handleScrollToGallery = () => {
    document.getElementById("gallery-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleExploreDive = (e) => {
    if (e) e.preventDefault();
    if (isDiving) return;
    setIsDiving(true);

    // Zoom into button, then switch cleanly to the gallery view (not just below)
    setTimeout(() => {
      setShowGallery(true);
      window.scrollTo(0, 0);
    }, 600);

    setTimeout(() => {
      setIsDiving(false);
    }, 1100);
  };

  const handleBackToHero = (e) => {
    if (e) e.preventDefault();
    setShowGallery(false);
    window.scrollTo(0, 0);
  };

  const handleScrollToContact = (e) => {
    if (e) e.preventDefault();
    if (!showGallery) {
      setShowGallery(true);
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Lightbox arrow navigation
  const currentPreviewPhoto =
    previewIndex !== null && photos[previewIndex] ? photos[previewIndex] : null;

  const handleNextPreview = () => {
    if (previewIndex !== null && previewIndex < photos.length - 1) {
      setPreviewIndex((prev) => prev + 1);
    }
  };

  const handlePrevPreview = () => {
    if (previewIndex !== null && previewIndex > 0) {
      setPreviewIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="lumina-page">
      {/* 1. HERO VIEW: Active when showGallery is false */}
      {!showGallery && (
        <header className="lumina-hero">
          {/* 3D Interactive Sunset Meadow with original rich sunset palette */}
          <div className="hero-3d-background">
            <MeadowBlush />
          </div>

          {/* Gentle cinematic contrast overlay allowing the rich sunset colors to shine */}
          <div className="hero-sunset-overlay"></div>

          {/* Top Editorial Navbar */}
          <nav className="hero-editorial-nav">
            <div className="hero-nav-brand">
              <span>SHUTTER STORIES</span>
            </div>

            <div className="hero-nav-links">
              <a
                href="#gallery-section"
                className="hero-nav-item"
                onClick={handleExploreDive}
              >
                GALLERY
              </a>
              <a
                href="#contact"
                className="hero-nav-item"
                onClick={handleScrollToContact}
              >
                CONTACT
              </a>
            </div>
          </nav>

          {/* Restored exact original writings in clean, uncluttered layout */}
          <div className="hero-editorial-center">
            <span className="hero-eyebrow-tag">THE ART OF SEEING</span>

            <h1 className="hero-editorial-title">
              A Gallery of Light &amp; Shadow
            </h1>

            <p className="hero-editorial-subtitle">
              Capturing moments through the lens of artistry and emotion
            </p>

            <button
              type="button"
              className={`hero-studio-cta ${isDiving ? "explore-btn-diving" : ""}`}
              onClick={handleExploreDive}
              aria-label="Explore Gallery"
            >
              <span>Explore Gallery</span>
              <span className="cta-arrow">→</span>
            </button>
          </div>

          {/* Cinematic "Dive inside button" Portal Animation */}
          {isDiving && (
            <div className="portal-dive-overlay" aria-hidden="true">
              <div className="portal-lens-ring"></div>
              <div className="portal-light-stream"></div>
            </div>
          )}
        </header>
      )}

      {/* 2. GALLERY & EXHIBITION VIEW: Displayed inside when Explore Gallery is pressed */}
      {showGallery && (
        <div className="gallery-view-container">
          {/* Top Sticky Header inside Gallery with Home Button on top left */}
          <nav className="gallery-top-nav">
            <button
              type="button"
              className="gallery-home-btn"
              onClick={handleBackToHero}
              aria-label="Back to Home / Hero page"
            >
              <span className="home-icon">⌂</span>
              <span>Home</span>
            </button>

            <div className="gallery-nav-brand" onClick={handleBackToHero}>
              SHUTTER STORIES
            </div>

            <div className="gallery-nav-actions">
              <a
                href="#contact"
                className="gallery-contact-link"
                onClick={handleScrollToContact}
              >
                Contact
              </a>
            </div>
          </nav>

          <section className="gallery-section gallery-entrance-fade" id="gallery-section">
            <div className="gallery-glass-wrapper">
              <div className="section-header">
                <span className="curated-tag">Authentic. Timeless. Captivating.</span>
                <h2 className="section-title">Photography That Tells Your Story</h2>
                <p className="section-subtitle">
                  A curated portfolio of portraits, moments, and visual storytelling.<br />
                  Let's capture something real.
                </p>
                <div className="section-line"></div>
              </div>

              {/* Seamless Flush Mosaic Grid (Attached Photos with Zero Gap) */}
              <div className="masonry-grid asymmetric-grid">
                {photos.map((photo, index) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    index={index}
                    onPreview={() => setPreviewIndex(index)}
                    isFeatured={index % 6 === 4 || index === 0}
                  />
                ))}
              </div>

              {loading && (
                <div className="status-box">
                  <div className="spinner"></div>
                  <span>Loading next page...</span>
                </div>
              )}

              {error && (
                <div className="status-box error-box">
                  <p className="error-text">{error}</p>
                  <button type="button" onClick={handleRetry} className="retry-button">
                    Retry
                  </button>
                </div>
              )}

              {!hasMore && (
                <div className="status-box end-box">
                  <span>You have reached the end of the gallery.</span>
                </div>
              )}

              <div ref={sentinelRef} className="sentinel" aria-hidden="true" />
            </div>
          </section>

          {/* Contact Section */}
          <ContactSection />
        </div>
      )}

      {/* Fullscreen Lightbox with Arrow-Key Navigation */}
      {currentPreviewPhoto && (
        <ImageModal
          photo={currentPreviewPhoto}
          onClose={() => setPreviewIndex(null)}
          onPrev={handlePrevPreview}
          onNext={handleNextPreview}
          hasPrev={previewIndex > 0}
          hasNext={previewIndex < photos.length - 1}
        />
      )}
    </div>
  );
}

export default App;
