import type { LucideIcon } from "lucide-react";
import { BookOpenCheck, HeartHandshake, Building2, Sparkles, Target, MessagesSquare, PencilRuler, Trophy } from "lucide-react";

/** Reasons to choose – themes repeated by reviewers on Google Maps (paraphrased). */
export const WHY_CHOOSE: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: BookOpenCheck,
    title: "Clear, step-by-step teaching",
    text: "Reviewers repeatedly mention that concepts are explained simply, even for average students.",
  },
  {
    icon: HeartHandshake,
    title: "Supportive staff",
    text: "Families describe approachable teachers and supporting staff who help students through doubts.",
  },
  {
    icon: Sparkles,
    title: "Confidence building",
    text: "“Confidence building” is one of the most common tags on the institute's Google listing.",
  },
  {
    icon: Building2,
    title: "Good infrastructure",
    text: "A comfortable second-floor learning space in the centre of Jayankondam, near Shivan Kovil.",
  },
];

/** Teaching approach – based on the institute's public listing description. */
export const METHODOLOGY: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Target, title: "Subject-focused classes", text: "Each subject is taught in focused sessions so concepts are built step by step." },
  { icon: PencilRuler, title: "Regular practice", text: "Practice sessions help students apply what they learn and spot gaps early." },
  { icon: MessagesSquare, title: "Study guidance", text: "Guidance on how to study, plan revision and clear doubts with teachers." },
  { icon: Trophy, title: "Exam preparation", text: "Preparation for school exams and competitive-exam aspirants, including NEET." },
];

export const REVIEW_THEMES = [
  "Clear teaching",
  "Confidence building",
  "Supportive staff",
  "Good infrastructure",
  "Tuition",
  "Crash course",
];

export const GALLERY_ITEMS: { title: string; caption: string; src?: string; alt?: string }[] = [
  { title: "Classroom", caption: "Classroom photo to be supplied by the institute" },
  { title: "Study area", caption: "Study area photo to be supplied" },
  { title: "Building entrance", caption: "Entrance on Sannathi Street, near Shivan Kovil" },
  { title: "Teaching in progress", caption: "Photo to be supplied" },
  { title: "Students", caption: "Only with parent/student permission" },
  { title: "Events & activities", caption: "Photo to be supplied" },
];

/** Authentic content only. Empty arrays render clearly-marked placeholders. */
export const FACULTY: { name: string; role: string; qualification: string; experience: string; photo?: string }[] = [];
export const ACHIEVEMENTS: { title: string; detail: string }[] = [];
export const TESTIMONIALS: { quote: string; author: string; role: string }[] = [];
