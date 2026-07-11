export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  duration: string;
  description: string;
  longDescription: string;
  thumbnailUrl: string; // We'll make standard stylized gradient placeholders
  videoUrl: string;     // Simulated video/visual config
  roles: string[];      // Roles e.g. ["Direção de Arte", "Edição", "Color Grading", "Sound Design"]
  techniques: string[]; // Techniques e.g. ["Raccord Temporal", "Montagem Paralela", "Match Cut"]
  colorGrading: {
    beforeColor: string; // CSS style or gradient representation for "Before Color Correction"
    afterColor: string;  // CSS style or gradient representation for "After Color Correction"
  };
  stats: {
    cuts: number;
    hoursEditing: number;
    timelineLayers: number;
    audioTracks: number;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  comment: string;
  rating: number;
  projectTitle: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  date: string;
}
