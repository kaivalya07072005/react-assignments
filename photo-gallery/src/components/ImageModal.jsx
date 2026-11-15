import { useEffect } from "react";

function ImageModal({ photo, onClose, onPrev, onNext, hasPrev, hasNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, onPrev, onNext]);

  if (!photo) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      {/* Navigation Arrow Left */}
      {hasPrev && (
        <button
          type="button"
          className="modal-nav-arrow arrow-left"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous photo"
        >
          ‹
        </button>
      )}

      {/* Navigation Arrow Right */}
      {hasNext && (
        <button
          type="button"
          className="modal-nav-arrow arrow-right"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next photo"
        >
          ›
        </button>
      )}

      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close preview"
        >
          ✕
        </button>

        <div className="modal-image-container">
          <img
            src={photo.download_url}
            alt={photo.title || `Photo by ${photo.author}`}
            className="modal-image"
          />
        </div>

        <div className="modal-details">
          <div className="modal-info-left">
            {photo.category && (
              <span className="modal-category">{photo.category}</span>
            )}
            <h3 className="modal-author">{photo.title || `Photograph by ${photo.author}`}</h3>
            <p className="modal-caption">
              Captured by <span className="highlight-author">{photo.author}</span> &bull; ID #{photo.id} &bull; Use ← → keys to browse
            </p>
          </div>

          <a
            href={photo.download_url}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-download-link"
          >
            Full Resolution ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
