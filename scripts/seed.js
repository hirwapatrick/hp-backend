import "dotenv/config";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";
import Testimonial from "../models/Testimonial.js";
import SiteSetting from "../models/SiteSetting.js";

const args = process.argv.slice(2);

if (args.length < 3) {
  console.log("Usage:");
  console.log("  node scripts/seed.js <name> <email> <password>");
  console.log("");
  console.log("Example:");
  console.log(
    '  node scripts/seed.js "Patrick Hirwa" "hirwap96@gmail.com" "admin@123"',
  );
  process.exit(1);
}

const [name, email, password] = args;

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    ],
    category: "fullstack",
    repoUrl: "https://github.com/patrickhirwa/ecommerce",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: true,
    order: 1,
  },
  {
    title: "Task Management App",
    description:
      "Collaborative project management tool with Kanban boards, real-time updates, and team analytics.",
    technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket", "Docker"],
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    ],
    category: "fullstack",
    repoUrl: "https://github.com/patrickhirwa/taskflow",
    liveUrl: "https://taskflow-demo.vercel.app",
    featured: true,
    order: 2,
  },
  {
    title: "AI Content Generator",
    description:
      "AI-powered content generation platform with GPT integration, template library, and SEO optimization.",
    technologies: ["React", "Python", "FastAPI", "OpenAI", "MongoDB"],
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    ],
    category: "ai",
    repoUrl: "https://github.com/patrickhirwa/aigen",
    liveUrl: "https://aigen-demo.vercel.app",
    featured: true,
    order: 3,
  },
  {
    title: "Real-Time Chat App",
    description:
      "Scalable real-time messaging application with end-to-end encryption and file sharing capabilities.",
    technologies: ["React", "Socket.io", "Node.js", "MongoDB", "AWS S3"],
    images: [
      "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&h=400&fit=crop",
    ],
    category: "fullstack",
    repoUrl: "https://github.com/patrickhirwa/chatify",
    liveUrl: "https://chatify-demo.vercel.app",
    featured: false,
    order: 4,
  },
  {
    title: "Analytics Dashboard",
    description:
      "Comprehensive analytics dashboard with interactive charts, data exports, and custom report builder.",
    technologies: ["React", "D3.js", "Node.js", "ClickHouse", "Redis"],
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    ],
    category: "frontend",
    repoUrl: "https://github.com/patrickhirwa/analytix",
    liveUrl: "https://analytix-demo.vercel.app",
    featured: false,
    order: 5,
  },
  {
    title: "API Gateway Service",
    description:
      "Microservices API gateway with rate limiting, authentication, and service discovery.",
    technologies: ["Go", "Docker", "Kubernetes", "gRPC", "Redis"],
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    ],
    category: "backend",
    repoUrl: "https://github.com/patrickhirwa/gateway",
    liveUrl: null,
    featured: false,
    order: 6,
  },
];

const skillCategories = [
  {
    categoryKey: "frontend",
    title: "Frontend",
    icon: "Code2",
    color: "#6366f1",
    order: 1,
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "JavaScript", level: 93 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Vue.js", level: 75 },
      { name: "HTML / CSS", level: 98 },
    ],
  },
  {
    categoryKey: "backend",
    title: "Backend",
    icon: "Server",
    color: "#06b6d4",
    order: 2,
    skills: [
      { name: "Node.js / Express", level: 92 },
      { name: "Python / Django", level: 80 },
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 82 },
      { name: "GraphQL", level: 78 },
    ],
  },
  {
    categoryKey: "devops",
    title: "DevOps & Tools",
    icon: "Cloud",
    color: "#10b981",
    order: 3,
    skills: [
      { name: "Docker / Kubernetes", level: 80 },
      { name: "AWS / GCP", level: 75 },
      { name: "CI / CD", level: 85 },
      { name: "Git / GitHub", level: 95 },
      { name: "Linux", level: 88 },
    ],
  },
];

const experiences = [
  {
    type: "education",
    title: "Advanced Level Student (Software Development)",
    company: "Msgr. Felicien MUBILIGI CATHOLIC TSS",
    location: "Rwanda",
    period: "2023 - 2026",
    description: "",
    highlights: [
      "Studying Software Development with focus on programming, databases, and web technologies",
      "Built multiple academic and personal software projects using modern web technologies",
      "Participated in practical assignments involving system analysis and application development",
      "Expected to graduate in 2026",
    ],
    order: 1,
  },
  {
    type: "project",
    title: "Full Stack Developer",
    company: "Personal Projects",
    location: "Remote",
    period: "2024 - Present",
    description: "",
    highlights: [
      "Developed full-stack web applications using React, Node.js, Express, and MongoDB",
      "Built responsive user interfaces with Tailwind CSS and modern frontend practices",
      "Implemented authentication, CRUD operations, file uploads, and REST APIs",
      "Deployed projects using modern cloud hosting platforms",
    ],
    order: 2,
  },
  {
    type: "project",
    title: "Freelance & Practice Development",
    company: "Self-Employed",
    location: "Remote",
    period: "2024 - Present",
    description: "",
    highlights: [
      "Created portfolio websites and small business management systems",
      "Worked with clients and peers to gather requirements and deliver solutions",
      "Maintained code using Git and GitHub version control",
      "Focused on writing clean, maintainable, and scalable code",
    ],
    order: 3,
  },
  {
    type: "leadership",
    title: "Technology Enthusiast",
    company: "Student Activities",
    location: "Rwanda",
    period: "2023 - Present",
    description: "",
    highlights: [
      "Actively learning modern web development and software engineering practices",
      "Collaborate with fellow students on programming projects",
      "Continuously improve problem-solving and software design skills",
      "Explore emerging technologies including AI and cloud computing",
    ],
    order: 4,
  },
];

const testimonials = [
  {
    name: "Nishimwe Prince",
    role: "UI/UX Designer",
    image:
      "https://res.cloudinary.com/dpy64b9p8/image/upload/v1780926160/portfolio/fcwj8894xwwydrfvhw5b.jpg",
    content:
      "Patrick is an exceptional developer who delivered our platform ahead of schedule. His technical expertise and attention to detail are remarkable.",
    rating: 5,
    order: 1,
  },
  {
    name: "Maniriho Edward",
    role: "IT Engineer",
    image:
      "https://res.cloudinary.com/dpy64b9p8/image/upload/v1780926400/portfolio/fm0w9nz5farirhqukrfn.jpg",
    content:
      "Working with Patrick was a fantastic experience. He brought innovative solutions to complex problems and was a great team player.",
    rating: 5,
    order: 2,
  },
];

const siteSettings = {
  name: "Hirwa Patrick",
  role: "Full Stack Developer",
  location: "Kigali, Rwanda",
  email: "pazzohirwa0@gmail.com",
  phone: "+250 795 217 927",
  bio: "I'm a passionate full-stack developer with expertise in building modern, scalable web applications. I specialize in React, Node.js, and cloud technologies, delivering high-quality solutions that drive business growth.",
  longBio: `I am a results-driven Full Stack Developer based in Kigali, Rwanda, with a deep passion for crafting elegant, high-performance web applications. With years of experience spanning the entire development lifecycle, I bring ideas to life through clean code, thoughtful architecture, and cutting-edge technologies.

My expertise covers modern frontend frameworks, robust backend systems, and cloud infrastructure. I thrive on solving complex problems and delivering solutions that make a tangible impact. When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers.`,
  github: "https://github.com/hirwapatrick",
  linkedin: "https://www.linkedin.com/in/hirwa-patrick-95567531b/",
  twitter: "https://x.com/hirwapatrick96",
  resumeUrl: "https://github.com/hirwapatrick",
};

async function seed() {
  await connectDB();

  const userExist = await User.findOne({ email });
  if (!userExist) {
    const user = await User.create({ name, email, password });
    console.log(`User created: ${user.email}`);
  } else {
    console.log(`User already exists: ${email}`);
  }

  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany(projects);
    console.log(`Seeded ${projects.length} projects`);
  } else {
    console.log(`Projects already exist (${projectCount}), skipping`);
  }

  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    await Skill.insertMany(skillCategories);
    console.log(`Seeded ${skillCategories.length} skill categories`);
  } else {
    console.log(`Skills already exist (${skillCount}), skipping`);
  }

  const experienceCount = await Experience.countDocuments();
  if (experienceCount === 0) {
    await Experience.insertMany(experiences);
    console.log(`Seeded ${experiences.length} experiences`);
  } else {
    console.log(`Experiences already exist (${experienceCount}), skipping`);
  }

  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany(testimonials);
    console.log(`Seeded ${testimonials.length} testimonials`);
  } else {
    console.log(`Testimonials already exist (${testimonialCount}), skipping`);
  }

  const settingKeys = Object.keys(siteSettings);
  const ops = settingKeys.map((key) => ({
    updateOne: {
      filter: { key },
      update: { $set: { value: siteSettings[key] } },
      upsert: true,
    },
  }));
  await SiteSetting.bulkWrite(ops);
  console.log(`Seeded ${settingKeys.length} site settings`);

  console.log("\nSeed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err.message);
  process.exit(1);
});
