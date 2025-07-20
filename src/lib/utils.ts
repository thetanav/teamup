import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Search utility functions
export function sanitizeSearchParam(param: string | undefined): string | null {
  if (!param || typeof param !== "string") return null;
  const trimmed = param.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function parseSkills(skillsParam: string | undefined): string[] {
  const sanitized = sanitizeSearchParam(skillsParam);
  if (!sanitized) return [];

  return sanitized
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 0);
}

export function buildSearchSummary(params: {
  college?: string;
  city?: string;
  course?: string;
  skills?: string;
  q?: string;
}): string {
  const filters = [];

  if (params.q) return `Universal search: "${params.q}"`;
  if (params.college) filters.push(`college: "${params.college}"`);
  if (params.city) filters.push(`city: "${params.city}"`);
  if (params.course) filters.push(`course: "${params.course}"`);
  if (params.skills) filters.push(`skills: "${params.skills}"`);

  if (filters.length === 0) return "Showing all available teammates";
  return `Searching by ${filters.join(", ")}`;
}

// Generate smart search suggestions when no results are found
export function generateSmartSuggestions(searchParams: {
  college?: string;
  city?: string;
  course?: string;
  skills?: string;
}): Array<{ label: string; href: string; type: string }> {
  const suggestions = [];

  // If searching by college, suggest nearby cities or similar colleges
  if (searchParams.college) {
    if (searchParams.college.toLowerCase().includes("iit")) {
      suggestions.push(
        {
          label: "Try other IITs",
          href: "/search?college=IIT",
          type: "college",
        },
        {
          label: "Computer Science students",
          href: "/search?course=Computer%20Science",
          type: "course",
        },
      );
    }
    if (searchParams.college.toLowerCase().includes("nit")) {
      suggestions.push({
        label: "Try other NITs",
        href: "/search?college=NIT",
        type: "college",
      });
    }
  }

  // If searching by city, suggest popular nearby cities
  if (searchParams.city) {
    const cityMap: { [key: string]: string[] } = {
      mumbai: ["Pune", "Nashik"],
      delhi: ["Gurgaon", "Noida", "Ghaziabad"],
      bangalore: ["Chennai", "Hyderabad"],
      chennai: ["Bangalore", "Coimbatore"],
      hyderabad: ["Bangalore", "Chennai"],
      pune: ["Mumbai", "Nashik"],
    };

    const normalizedCity = searchParams.city.toLowerCase();
    const nearbyCities = cityMap[normalizedCity];
    if (nearbyCities) {
      nearbyCities.forEach((city) => {
        suggestions.push({
          label: `Try ${city}`,
          href: `/search?city=${encodeURIComponent(city)}`,
          type: "city",
        });
      });
    }
  }

  // If searching by course, suggest related courses
  if (searchParams.course) {
    const courseMap: { [key: string]: string[] } = {
      "computer science": ["Information Technology", "Software Engineering"],
      "information technology": ["Computer Science", "Data Science"],
      "mechanical engineering": ["Electrical Engineering", "Civil Engineering"],
      "electrical engineering": [
        "Electronics Engineering",
        "Mechanical Engineering",
      ],
    };

    const normalizedCourse = searchParams.course.toLowerCase();
    const relatedCourses = courseMap[normalizedCourse];
    if (relatedCourses) {
      relatedCourses.forEach((course) => {
        suggestions.push({
          label: `Try ${course}`,
          href: `/search?course=${encodeURIComponent(course)}`,
          type: "course",
        });
      });
    }
  }

  // If searching by skills, suggest related skills
  if (searchParams.skills) {
    const skillMap: { [key: string]: string[] } = {
      react: ["JavaScript", "Node.js", "Next.js"],
      python: ["Django", "Flask", "Machine Learning"],
      javascript: ["React", "Vue.js", "Angular"],
      java: ["Spring", "Android", "Kotlin"],
      "machine learning": ["Python", "Data Science", "TensorFlow"],
    };

    const skills = parseSkills(searchParams.skills);
    skills.forEach((skill) => {
      const normalizedSkill = skill.toLowerCase();
      const relatedSkills = skillMap[normalizedSkill];
      if (relatedSkills) {
        relatedSkills.forEach((relatedSkill) => {
          suggestions.push({
            label: `Try ${relatedSkill}`,
            href: `/search?skills=${encodeURIComponent(relatedSkill)}`,
            type: "skills",
          });
        });
      }
    });
  }

  // Always add some fallback suggestions
  if (suggestions.length === 0) {
    suggestions.push(
      {
        label: "Browse all Computer Science students",
        href: "/search?course=Computer%20Science",
        type: "course",
      },
      {
        label: "Find JavaScript developers",
        href: "/search?skills=JavaScript",
        type: "skills",
      },
      {
        label: "Explore Mumbai teammates",
        href: "/search?city=Mumbai",
        type: "city",
      },
    );
  }

  // Remove duplicates and limit to 5 suggestions
  const uniqueSuggestions = suggestions.filter(
    (suggestion, index, self) =>
      index === self.findIndex((s) => s.href === suggestion.href),
  );

  return uniqueSuggestions.slice(0, 5);
}

// Check if search parameters are too specific
export function isSearchTooSpecific(searchParams: {
  college?: string;
  city?: string;
  course?: string;
  skills?: string;
}): boolean {
  const paramCount = Object.values(searchParams).filter(
    (param) => sanitizeSearchParam(param) !== null,
  ).length;

  return paramCount >= 3; // Consider it too specific if 3+ parameters are provided
}
