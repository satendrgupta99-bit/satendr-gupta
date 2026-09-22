export type ProjectCategory = 
  | 'all'
  | 'cinematic-reels'
  | 'poetic-edits'
  | 'trending-transitions';

export type AspectRatio = '16:9' | '9:16';

export interface Project {
  id: string;
  title: string;
  client?: string;
  category: 'cinematic-reels' | 'poetic-edits' | 'trending-transitions';
  categoryDisplay?: string;
  aspect: AspectRatio;
  videoUrl: string;
  instagramUrl?: string;
  youtubeId?: string; // For live YouTube / Shorts embed
  embedUrl?: string;  // Direct embed iframe URL
  posterUrl: string;
  audioTrack?: string;
  tags: string[];
  year: string;
  duration: string;
  fps: string;
  resolution: string;
  software: ('CapCut' | 'VN Video Editor' | 'DaVinci Resolve' | 'Alight Motion' | string)[];
  views?: string;
  likes?: string;
  description: string;
  challenge?: string;
  solution?: string;
  beforeAfter?: {
    rawUrl: string;
    gradedUrl: string;
    rawLabel: string;
    gradedLabel: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  highlightMetric: string;
  projectType: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  projectType: 'Instagram Reel' | 'YouTube Video' | 'Personal Project' | string;
  details: string;
}

