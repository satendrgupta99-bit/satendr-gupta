import { Project, Testimonial } from '../types';

export const SHOWREEL_DATA = {
  title: "LNX EDITOR // 2026 AESTHETIC & CINEMATIC SHOWREEL",
  duration: "01:15",
  fps: "60.000 fps",
  resolution: "4K / 9:16 & 16:9 Multi-Format",
  colorSpace: "Film Emulation & Moody Neon Palette",
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  youtubeId: "aqz-KE-bpKQ", // Big Buck Bunny / Creative Commons sample or aesthetic short
  embedUrl: "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?autoplay=1&rel=0&modestbranding=1",
  posterUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1920&q=80",
  description: "A dynamic montage of high-retention short-form edits, seamless zoom transitions, lyrical poetry cuts, and moody color grades.",
  clientList: ["Spotify Indie Curators", "Urban Aesthetic Apparel", "SoundCloud Creators", "Red Bull Dance", "Travel Vloggers"]
};

export const PROJECTS: Project[] = [
  {
    id: "vfx-compositing-breakdown",
    title: "VFX & Compositing Breakdown",
    client: "LNX Original",
    category: "trending-transitions",
    categoryDisplay: "Trending Transitions & VFX",
    aspect: "9:16",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    instagramUrl: "https://www.instagram.com/reel/DQ0TGKKkoer/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    embedUrl: "https://www.instagram.com/reel/DQ0TGKKkoer/embed/",
    posterUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    audioTrack: "♫ Original VFX Mix & Sound Design",
    tags: ["Trending Transitions & VFX", "Compositing", "Motion Tracking", "VFX Breakdown"],
    year: "2026",
    duration: "00:25",
    fps: "60.000 fps",
    resolution: "1080 × 1920 (9:16)",
    software: ["VN Video Editor", "Alight Motion", "CapCut"],
    description: "Detailed visual effects and compositing breakdown showcasing element isolation, kinetic motion tracking, 3D layer depth, and seamless scene transitions.",
    challenge: "Complex element masking and kinetic tracking with clean edge blending on dynamic movements.",
    solution: "Multi-pass compositing with motion vector blur, custom lumetri color matching, and sub-frame alignment."
  },
  {
    id: "seamless-transition-before-after",
    title: "Seamless Transition: Before vs After",
    client: "LNX Original",
    category: "trending-transitions",
    categoryDisplay: "Trending Transitions",
    aspect: "9:16",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    instagramUrl: "https://www.instagram.com/reel/DcqMHwUxK7f/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    embedUrl: "https://www.instagram.com/reel/DcqMHwUxK7f/embed/",
    posterUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    audioTrack: "♫ Kinetic Beat Sync & Snare Cuts",
    tags: ["Trending Transitions", "Before vs After", "Speed Ramping", "Whip Pan"],
    year: "2026",
    duration: "00:20",
    fps: "60.000 fps",
    resolution: "1080 × 1920 (9:16)",
    software: ["CapCut", "VN Video Editor", "Alight Motion"],
    description: "Side-by-side comparison revealing raw handheld footage transformed into a seamless kinetic whip transition with precision speed ramping.",
    challenge: "Aligning camera trajectory and velocity curves between two distinct takes without jitter.",
    solution: "Bézier curve velocity ramping, optical flow interpolation, and directional motion blur match cutting."
  },
  {
    id: "raw-to-master-color-grade",
    title: "Raw to Master: Color Grade & Edit",
    client: "LNX Original",
    category: "cinematic-reels",
    categoryDisplay: "Cinematic Reels",
    aspect: "9:16",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    instagramUrl: "https://www.instagram.com/reel/DdDmzM7Rkq4/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    embedUrl: "https://www.instagram.com/reel/DdDmzM7Rkq4/embed/",
    posterUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80",
    audioTrack: "♫ Atmospheric Cinematic Score",
    tags: ["Cinematic Reels", "Color Grading", "Raw to Master", "Film Look"],
    year: "2026",
    duration: "00:30",
    fps: "60.000 fps",
    resolution: "1080 × 1920 (9:16)",
    software: ["DaVinci Resolve", "VN Video Editor"],
    description: "Transforming flat log footage into a rich, filmic master with custom contrast curves, highlight rolloff, and deep moody tones.",
    challenge: "Balancing extreme contrast while preserving natural skin tones and organic shadow detail.",
    solution: "Node-based ACEScc color science, subtractive saturation, and Kodak film print emulation."
  },
  {
    id: "dhurandhar-cinematic-cut",
    title: "Dhurandhar: The Cinematic Cut",
    client: "LNX Original",
    category: "cinematic-reels",
    categoryDisplay: "Cinematic Reels",
    aspect: "9:16",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    instagramUrl: "https://www.instagram.com/reel/DYuZBGcopdB/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    embedUrl: "https://www.instagram.com/reel/DYuZBGcopdB/embed/",
    posterUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
    audioTrack: "♫ Intense Bass Impact & Action Rhythms",
    tags: ["Cinematic Reels", "Action Edit", "Impact Cuts", "Sound Design"],
    year: "2026",
    duration: "00:35",
    fps: "60.000 fps",
    resolution: "1080 × 1920 (9:16)",
    software: ["DaVinci Resolve", "CapCut", "VN Video Editor"],
    description: "High-octane dramatic cinematic reel with intense pacing, impactful sound design, punchy beat drops, and sharp visual contrast.",
    challenge: "Delivering relentless pacing without overwhelming the viewer or muddying key narrative beats.",
    solution: "Rhythmic audio-led cutting, micro-zooms on percussive hits, and high-impact color punch."
  },
  {
    id: "aesthetic-birthday-reel",
    title: "Aesthetic Birthday Reel",
    client: "LNX Original",
    category: "poetic-edits",
    categoryDisplay: "Poetic & Song Edits",
    aspect: "9:16",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    instagramUrl: "https://www.instagram.com/reel/DTCehp5CI-E/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    embedUrl: "https://www.instagram.com/reel/DTCehp5CI-E/embed/",
    posterUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    audioTrack: "♫ Warm Lo-Fi & Nostalgic Song Edit",
    tags: ["Poetic & Song Edits", "Aesthetic Birthday", "Vintage Halation", "Lyric Styling"],
    year: "2026",
    duration: "00:28",
    fps: "60.000 fps",
    resolution: "1080 × 1920 (9:16)",
    software: ["CapCut", "Alight Motion"],
    description: "Heartwarming celebration edit crafted with soft vintage film halation, ambient golden bokeh, subtle kinetic typography, and heartfelt musical rhythm.",
    challenge: "Elevating personal celebration moments into a timeless, cinematic, and emotionally resonant memory.",
    solution: "Warm 16mm grain overlays, dreamy lens flares, soft optical transitions, and synchronized typography."
  }
];

export const TOOLKIT_SOFTWARE = [
  {
    name: "CapCut",
    role: "Short-Form Velocity & Mobile Cuts",
    highlight: "Keyframe curves, smooth transitions, beat synchronization & aesthetic lyric styling.",
    badge: "Velocity Suite",
    color: "#00F0FF",
    iconName: "Scissors",
    focus: "Shorts & Reels",
    version: "Velocity Suite"
  },
  {
    name: "VN Video Editor",
    role: "Mobile Cinematic Cuts & Speed Ramps",
    highlight: "Precision timeline editing, custom LUTs application, and smooth curve-based speed ramping on the go.",
    badge: "VN Pro",
    color: "#38BDF8",
    iconName: "Video",
    focus: "Speed Ramps & LUTs",
    version: "Mobile & Desktop"
  },
  {
    name: "DaVinci Resolve",
    role: "Aesthetic Color Grading & Film Looks",
    highlight: "ACES color management, custom film LUTs, halation, skin-tone isolation & HDR scopes.",
    badge: "Color Master",
    color: "#FF9933",
    iconName: "Palette",
    focus: "ACES Color & Nodes",
    version: "Studio 19"
  },
  {
    name: "Alight Motion",
    role: "Mobile Motion Graphics & Transitions",
    highlight: "Vector text animations, custom graph curves, displacement maps & lyrical song effects.",
    badge: "Motion Pro",
    color: "#00FF99",
    iconName: "Sparkles",
    focus: "Lyrical & Curves",
    version: "Mobile & Pad"
  }
];

export const TOOL_STACK = TOOLKIT_SOFTWARE;

export const CAPABILITIES_LIST = [
  {
    title: "Smooth Transitions",
    description: "Seamless whip pans, optical flow zooms, mask-wipes, and seamless match-cuts that feel effortless.",
    tag: "Transitions",
    metric: "60 FPS Fluidity",
    icon: "Film",
    deliverables: ["Whip Pans & Zoom Blurs", "Match-Cuts & Mask Reveals", "Directional Speed Ramps"]
  },
  {
    title: "Aesthetic Color Grading",
    description: "Moody cinematic palettes, Kodak 2383 film grain, halation bloom, and vibrant neon tones.",
    tag: "Color Science",
    metric: "ACES & S-Log3",
    icon: "Palette",
    deliverables: ["Kodak & Fuji Film Emulation", "Cyan/Amber Neon Separation", "ACES Color Space Transform"]
  },
  {
    title: "Beat Syncing",
    description: "Tight rhythmic cuts locked to musical drops, bass kicks, and audio transient micro-beats.",
    tag: "Rhythm & Audio",
    metric: "Sub-Frame Accuracy",
    icon: "Volume2",
    deliverables: ["Sub-Frame Transient Syncing", "Multi-Stem Audio Mastering", "Bass Drop Velocity Ramping"]
  },
  {
    title: "Text Animation",
    description: "Dynamic kinetic typography, aesthetic lyrical subtitles, tracking titles, and neon glow words.",
    tag: "Typography",
    metric: "Motion Styled",
    icon: "Sparkles",
    deliverables: ["Kinetic Subtitles & Lyrics", "3D Camera Spatial Tracking", "Glow Neon & Halation Titles"]
  }
];

export const CAPABILITIES = CAPABILITIES_LIST;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Aiden Cross",
    role: "Content Creator",
    company: "Indie Creator & Filmmaker",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    content: "LNX EDITOR took our raw phone clips and made them look like a cinema piece. The pacing and color grade gave our project an unmistakable, high-end identity.",
    rating: 5,
    highlightMetric: "Cinematic Grade",
    projectType: "Reels & Shorts Cut"
  },
  {
    id: "2",
    name: "Sofia Sterling",
    role: "Indie Singer-Songwriter",
    company: "Independent Artist",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    content: "The poetic song edits LNX crafted for my release gave me chills. The typography was so tasteful and the emotional transitions matched every single vocal breath.",
    rating: 5,
    highlightMetric: "Poetic Flow",
    projectType: "Poetic Song Visualizer"
  },
  {
    id: "3",
    name: "Marcus Drake",
    role: "Creative Lead",
    company: "NeoWave Streetwear",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    content: "Fast turnaround, incredible velocity transitions, and a mood that perfectly speaks to modern aesthetics. Clean craftsmanship throughout the edit.",
    rating: 5,
    highlightMetric: "Smooth Velocity",
    projectType: "Fashion Campaign Edit"
  }
];

export const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Footage Ingestion & Music Curation",
    desc: "Send raw footage via Google Drive, Dropbox, or Telegram. We select or sync the perfect trending or emotional audio track."
  },
  {
    number: "02",
    title: "The Assembly & Beat-Sync Cut",
    desc: "Drafting the primary hook in the first 2 seconds, trimming fat, and locking cuts to musical drops."
  },
  {
    number: "03",
    title: "Aesthetic Color Grade & Film Look",
    desc: "Applying film emulation, moody contrast curves, vibrant neon highlights, and skin tone protection."
  },
  {
    number: "04",
    title: "Smooth Transitions & Text Motion",
    desc: "Adding custom speed ramps, kinetic lyrics, glowing text animations, and subtle camera zooms."
  },
  {
    number: "05",
    title: "Final 60FPS Delivery & Revisions",
    desc: "High-bitrate 1080x1920 60FPS export optimized for Instagram Reels, YouTube Shorts, and TikTok without compression artifacts."
  }
];
