export const CATEGORIES = ["All", "Nature", "Travel", "Sunset", "Architecture", "Portraits"];

export const CURATED_MASONRY_PHOTOS = [
  {
    id: "m-1",
    author: "Luca Bravo",
    category: "Nature",
    aspectRatio: "3/4",
    download_url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80",
    caption: "Misty mountains and evergreen wilderness at dawn."
  },
  {
    id: "m-2",
    author: "Sasha Freemind",
    category: "Portraits",
    aspectRatio: "4/5",
    download_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    caption: "Expressive gaze reflecting warmth and quiet confidence."
  },
  {
    id: "m-3",
    author: "Timur Kozmenko",
    category: "Sunset",
    aspectRatio: "16/10",
    download_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    caption: "Golden hour washing over pristine coastline waves."
  },
  {
    id: "m-4",
    author: "Simone Hutsch",
    category: "Architecture",
    aspectRatio: "1/1",
    download_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    caption: "Geometric angles and vibrant contemporary facade."
  },
  {
    id: "m-5",
    author: "Dino Reichmuth",
    category: "Travel",
    aspectRatio: "4/5",
    download_url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80",
    caption: "Open roads curving through desert canyons."
  },
  {
    id: "m-6",
    author: "Bailey Zindel",
    category: "Nature",
    aspectRatio: "16/9",
    download_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    caption: "Mirror lake reflections framed by towering granite."
  },
  {
    id: "m-7",
    author: "Aiony Haust",
    category: "Portraits",
    aspectRatio: "3/4",
    download_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
    caption: "Natural sunlight highlighting candid urban expression."
  },
  {
    id: "m-8",
    author: "Jordan Wozniak",
    category: "Sunset",
    aspectRatio: "4/5",
    download_url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1000&q=80",
    caption: "Radiant crimson clouds hanging low over the horizon."
  },
  {
    id: "m-9",
    author: "Victor Garcia",
    category: "Architecture",
    aspectRatio: "16/11",
    download_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    caption: "Glass skyscraper soaring into crystal azure skies."
  },
  {
    id: "m-10",
    author: "Kal Visuals",
    category: "Travel",
    aspectRatio: "3/4",
    download_url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80",
    caption: "Passport in hand, discovering historic cobbled alleyways."
  },
  {
    id: "m-11",
    author: "Jerry Zhang",
    category: "Sunset",
    aspectRatio: "16/9",
    download_url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1000&q=80",
    caption: "Silhouette of ancient trees against twilight gradients."
  },
  {
    id: "m-12",
    author: "Benjamin Davies",
    category: "Nature",
    aspectRatio: "4/5",
    download_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80",
    caption: "Sunbeams piercing through a dense ancient redwood grove."
  },
  {
    id: "m-13",
    author: "Joel Mott",
    category: "Portraits",
    aspectRatio: "1/1",
    download_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
    caption: "Genuine smile captured with soft bokeh depth."
  },
  {
    id: "m-14",
    author: "Denys Nevozhai",
    category: "Architecture",
    aspectRatio: "4/5",
    download_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    caption: "Minimalist luxury villa design with modern infinity pool."
  },
  {
    id: "m-15",
    author: "Mesut Kaya",
    category: "Travel",
    aspectRatio: "16/10",
    download_url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1000&q=80",
    caption: "Backpacker overlooking an alpine ridge in the early breeze."
  }
];

export function getMasonryBatch(pageNumber, pageSize = 6) {
  const start = (pageNumber - 1) * pageSize;
  if (start >= CURATED_MASONRY_PHOTOS.length) {
    return [];
  }
  return CURATED_MASONRY_PHOTOS.slice(start, start + pageSize);
}

