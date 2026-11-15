# Photo Gallery

A single-page React photo feed with infinite scrolling and like counters, built with Vite and JavaScript.

## Features Implemented
- Single-column centered layout matching the assignment specification.
- Fetches paginated photos from `https://picsum.photos/v2/list?page={page}` starting at page 1.
- Infinite scrolling implemented with an `IntersectionObserver` observing a sentinel element.
- Prevents duplicate or concurrent requests while fetching.
- Renders `download_url`, `Author: {author}`, and a FontAwesome thumbs-up icon (`faThumbsUp`).
- Per-photo like counter initialized to 0, incrementing on each click with a tap animation.
- Handles end-of-gallery state when no more photos are returned.
- Error handling with a manual retry button.
- Clean and responsive plain CSS styling.

## How to Run

1. Navigate to the project directory:
   ```bash
   cd photo-gallery
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```
