export interface Project {
  index: string;
  title: string;
  tagline: string;
  tags: string[];
  details: string;
  stack: { name: string; role: string }[];
  highlights: string[];
  url: string;
  repo?: string;
}
