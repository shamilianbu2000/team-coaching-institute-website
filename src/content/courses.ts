export type Course = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  audience: string;
  /** null = not published by the institute yet (shown as "Client confirmation required") */
  subjects: string[] | null;
  timings: string | null;
  fee: string | null;
  eligibility: string | null;
  methodology: string[];
  source: string;
};

/**
 * Classes/courses are inferred from public listings and Google review tags only.
 * Classes 1–7 are intentionally NOT listed: no source mentions them.
 * Every field that is not stated publicly is null and flagged on the page.
 */
export const COURSES: Course[] = [
  {
    slug: "school-tuition-classes-8-12",
    title: "School Tuition (Classes 8–12)",
    category: "School Tuition",
    summary: "Subject-focused classes and study guidance for school students.",
    description:
      "Regular classes that follow the school syllabus, with step-by-step explanation of concepts, practice sessions and guidance on how to study. Public reviews mention students attending from Class 8 up to Class 12.",
    audience: "School students (standards to be confirmed by the institute)",
    subjects: null,
    timings: null,
    fee: null,
    eligibility: null,
    methodology: [
      "Concepts explained step by step",
      "Regular practice and revision",
      "Doubt clearing and study guidance",
    ],
    source: "Google Maps review tags and MassClick description",
  },
  {
    slug: "neet-coaching",
    title: "NEET Coaching",
    category: "Competitive Exams",
    summary: "Focused preparation for medical-entrance aspirants.",
    description:
      "Exam-oriented coaching for students preparing for NEET, combining concept clarity with regular practice. A public review mentions NEET coaching at the institute; the exact programme structure is to be confirmed.",
    audience: "NEET aspirants",
    subjects: null,
    timings: null,
    fee: null,
    eligibility: null,
    methodology: [
      "Concept-first teaching",
      "Practice sessions for exam readiness",
      "Study guidance and doubt clearing",
    ],
    source: "Google Maps review (mention of NEET coaching)",
  },
  {
    slug: "competitive-exam-preparation",
    title: "Competitive Exam Preparation",
    category: "Competitive Exams",
    summary: "Exam preparation and practice for competitive-exam aspirants.",
    description:
      "Coaching and academic support for competitive-exam aspirants, with exam preparation and practice sessions. Which exams are covered is to be confirmed by the institute.",
    audience: "Competitive-exam aspirants",
    subjects: null,
    timings: null,
    fee: null,
    eligibility: null,
    methodology: [
      "Exam-focused preparation",
      "Practice sessions",
      "Guidance on study planning",
    ],
    source: "MassClick description",
  },
  {
    slug: "crash-course",
    title: "Crash Course",
    category: "Short-term",
    summary: "Short, intensive revision before exams.",
    description:
      "A short-term, intensive programme to revise key topics before exams. A Google review tag mentions a crash course; duration, subjects and schedule are to be confirmed.",
    audience: "Students preparing for upcoming exams",
    subjects: null,
    timings: null,
    fee: null,
    eligibility: null,
    methodology: [
      "Focused revision of key topics",
      "Intensive practice",
      "Last-mile doubt clearing",
    ],
    source: "Google Maps review tag (crash course)",
  },
];

export const getCourse = (slug: string) => COURSES.find((c) => c.slug === slug);
