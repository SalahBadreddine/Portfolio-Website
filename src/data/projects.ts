// ---------- images ----------
import algreeniaHome from "@/assets/algreenia/home.webp";
import algreeniaHome1 from "@/assets/algreenia/home1.webp";
import algreeniaHome2 from "@/assets/algreenia/home2.webp";
import algreeniaCampaigns from "@/assets/algreenia/campaigns.webp";
import algreeniaChatbot from "@/assets/algreenia/chatbot.webp";
import algreeniaIrrigation from "@/assets/algreenia/irrigation.webp";
import algreeniaRegister from "@/assets/algreenia/register.webp";
import ktCart from "@/assets/khedmatayba/cart.webp";
import ktChat from "@/assets/khedmatayba/chat.webp";
import ktHome from "@/assets/khedmatayba/home.webp";
import ktLogin from "@/assets/khedmatayba/login.webp";
import ktOrders from "@/assets/khedmatayba/orders.webp";
import ktProfile from "@/assets/khedmatayba/profile.webp";
import ktSplash from "@/assets/khedmatayba/splash.webp";
import ktTrack from "@/assets/khedmatayba/trackorder.webp";
import jmHome from "@/assets/jobmatching/home.webp";
import jmDashboard from "@/assets/jobmatching/dahboard.webp";
import jmEmployer from "@/assets/jobmatching/employer.webp";
import jmSeeker from "@/assets/jobmatching/seeker.webp";
import bzHome from "@/assets/bazar/home.webp";
import bzOnboarding from "@/assets/bazar/onboarding.webp";
import bzLogin from "@/assets/bazar/login.webp";
import bzSignup from "@/assets/bazar/signup.webp";
import bzVerification from "@/assets/bazar/verification.webp";
import bzCategory from "@/assets/bazar/category.webp";
import bzBook from "@/assets/bazar/book.webp";
import bzVendors from "@/assets/bazar/vendors.webp";
import bzWishlist from "@/assets/bazar/wishlist.webp";
import bzProfile from "@/assets/bazar/profile.webp";
import bzAccount from "@/assets/bazar/account.webp";
import ckHome from "@/assets/chefkit/home.webp";
import ckRecipe from "@/assets/chefkit/recipe.webp";
import ckSearch from "@/assets/chefkit/search.webp";
import ckInventory from "@/assets/chefkit/inventory.webp";
import ckChef from "@/assets/chefkit/chef.webp";
import ckProfile from "@/assets/chefkit/profile.webp";
import ckSignin from "@/assets/chefkit/signin.webp";
import ckOtp from "@/assets/chefkit/otp.webp";
import ckArabic from "@/assets/chefkit/arabic.webp";
import stHome from "@/assets/somatrack/home.webp";
import stAudit from "@/assets/somatrack/audit.webp";
import stModels from "@/assets/somatrack/models.webp";
import stFeatures from "@/assets/somatrack/features.webp";
import stRoc from "@/assets/somatrack/roc.webp";
import crBrowse from "@/assets/crms/browse.webp";
import crSignin from "@/assets/crms/signin.webp";
import crSignup from "@/assets/crms/signup.webp";

export type Category = "ai" | "web" | "mobile" | "data" | "research";

export type Cover =
  | { kind: "image"; src: string; fit?: "cover" | "phone" }
  | { kind: "generative"; variant: "federated" | "graph" | "timeseries" | "cells" | "darija" | "delivery" | "platform" | "agent" | "forecast" };

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  categories: Category[];
  tech: string[];
  year: string;
  status?: "Live" | "In progress" | "Research" | "Team project" | "Competition";
  featured?: boolean;
  cover: Cover;
  gallery?: string[];
  phoneGallery?: boolean;
  github?: string;
  live?: string;
  labLink?: boolean;
}

export const CATEGORY_LABEL: Record<Category | "all", string> = {
  all: "All",
  ai: "AI / ML",
  research: "Research",
  data: "Data & BI",
  web: "Web & SaaS",
  mobile: "Mobile",
};

export const projects: Project[] = [
  {
    id: "federated",
    title: "Federated Learning for Hospitals",
    tagline: "Training medical AI across hospitals without moving any patient data.",
    description:
      "A research project I did with 3 teammates at ENSIA. Each hospital trains the model on its own data and only sends the model updates to a server, which combines them into one global model. We tested it on cardiovascular risk prediction and on chest X-ray classification, and we designed our own aggregation method, FedQBlend, with its full maths.",
    highlights: [
      "Our own aggregation method, FedQBlend, with the full maths",
      "Two medical tasks: cardiovascular risk and chest X-rays",
      "Patient data stays in the hospital, only weights are shared",
      "Full research report in LaTeX",
    ],
    categories: ["ai", "research"],
    tech: ["Python", "Federated Learning", "Deep Learning", "FedAvg", "Healthcare AI", "LaTeX"],
    year: "2025/26",
    status: "Research",
    featured: true,
    cover: { kind: "generative", variant: "federated" },
    labLink: true,
  },
  {
    id: "somatrack",
    title: "SomaTrack",
    tagline: "Predicting back pain, neck strain and headaches from study habits.",
    description:
      "We surveyed 200+ students about how they study, built features like an ergonomics score and a screen-strain index, and trained one model per type of pain. Then we put it online: you describe your study day and it tells you your risk and which habits are causing it.",
    highlights: [
      "200+ survey responses, cleaned and turned into features",
      "One model per pain type, back pain model at about 80% test accuracy",
      "FastAPI backend and React app, deployed online",
      "Shows the risk and the habits behind it",
    ],
    categories: ["ai", "data", "web"],
    tech: ["Python", "scikit-learn", "CatBoost", "FastAPI", "React", "TypeScript"],
    year: "2026",
    status: "Live",
    featured: true,
    cover: { kind: "image", src: stHome },
    gallery: [stHome, stAudit, stModels, stFeatures, stRoc],
    github: "https://github.com/SalahBadreddine/SomaTrack",
    live: "https://somatrackml.netlify.app",
  },
  {
    id: "crms",
    title: "RentoGo, Car Rental SaaS",
    tagline: "A SaaS for car rental companies: fleet, bookings, payments and stats.",
    description:
      "Our Software Engineering team project. We worked in Scrum with one-week sprints and code reviews on every PR. Each rental company gets its own space to manage cars, locations, bookings and payments, and customers get a public site to compare cars and book. There's also an admin console to manage all the companies.",
    highlights: [
      "Multi-tenant: super admin, company admin and customer roles",
      "NestJS REST API with auth, cars, bookings, payments and notifications",
      "Dashboard with fleet and booking stats",
      "Documented with an SRS, API guides and Postman collections",
    ],
    categories: ["web"],
    tech: ["React", "TypeScript", "Tailwind", "NestJS", "PostgreSQL", "Supabase"],
    year: "2025/26",
    status: "Team project",
    featured: true,
    cover: { kind: "image", src: crSignin },
    gallery: [crSignin, crBrowse, crSignup],
    github: "https://github.com/SalahBadreddine/car-rental-management-saas",
  },
  {
    id: "chefkit",
    title: "ChefKit",
    tagline: "Recipes based on what you already have in your kitchen.",
    description:
      "A cooking app for Android and iOS. You add the ingredients you have, and it suggests recipes you can make. You can follow chefs, save favourites, log in with OTP and get a daily notification. It works in English, French and Arabic.",
    highlights: [
      "Recipe suggestions from your ingredients",
      "Flask backend with Supabase, Firebase notifications and Cloudinary",
      "Fast UI that updates before the server answers",
      "Arabic (right to left), French and English",
    ],
    categories: ["mobile"],
    tech: ["Flutter", "BLoC", "Flask", "Supabase", "Firebase", "Cloudinary"],
    year: "2025/26",
    status: "Live",
    featured: true,
    cover: { kind: "image", src: ckHome, fit: "phone" },
    gallery: [ckHome, ckRecipe, ckSearch, ckInventory, ckChef, ckProfile, ckSignin, ckOtp, ckArabic],
    phoneGallery: true,
    github: "https://github.com/SalahBadreddine/Chef-Kit",
    live: "https://chefkit-online.vercel.app/",
  },
  {
    id: "rie",
    title: "BNP Paribas Canteen Forecasting",
    tagline: "Predicting how many meals a company canteen will serve tomorrow.",
    description:
      "A team project for the canteen at BNP Paribas El Djazaïr's headquarters, to cut food waste. The model works in 3 steps: first it predicts how many people will be at the office (using the calendar, history and weather), then what share of them will eat at the canteen (depending on the menu), and then it gives a safe number of meals to prepare. It runs as a Windows app with a FastAPI backend and a Next.js dashboard.",
    highlights: [
      "3 steps: office attendance, then canteen share, then meals to prepare",
      "Off by about 16 meals on average",
      "Uses the menu and the weather",
      "Packaged as a desktop app with Electron",
    ],
    categories: ["ai", "data"],
    tech: ["Python", "LightGBM", "CatBoost", "XGBoost", "FastAPI", "Next.js", "Electron"],
    year: "2026",
    status: "Team project",
    featured: true,
    cover: { kind: "generative", variant: "forecast" },
    github: "https://github.com/Ashreeef/organisation-rie",
  },
  {
    id: "gnn-layout",
    title: "GNNs for Robust Facility Layout",
    tagline: "Using graph neural networks to design factory layouts.",
    description:
      "My one-year research project, supervised by Dr. Soumaya Lekehal. A factory layout is basically a graph: departments are nodes and the flows of material between them are edges. I'm looking at how GNNs can learn layouts that still work well when demand changes.",
    highlights: ["Supervised research, 2026/27", "Graph ML and optimisation", "Layouts that hold up when demand changes"],
    categories: ["research", "ai"],
    tech: ["Graph Neural Networks", "Operations Research", "Python"],
    year: "2026/27",
    status: "In progress",
    featured: true,
    cover: { kind: "generative", variant: "graph" },
  },
  {
    id: "darija",
    title: "Darija Maternal-Health Assistant",
    tagline: "An assistant in Algerian Darija for mothers.",
    description:
      "Our NLP team project. We're building an assistant that understands Algerian Darija and answers mothers' questions about pregnancy and child care. It uses RAG over trusted health content and an LLM fine-tuned on Darija.",
    highlights: ["NLP for Darija, which has very little data", "RAG and LLM fine-tuning", "We're collecting the dataset right now"],
    categories: ["ai"],
    tech: ["LLMs", "RAG", "NLP", "Python"],
    year: "2026",
    status: "In progress",
    cover: { kind: "generative", variant: "darija" },
  },
  {
    id: "water",
    title: "Algeria Water Security 2030",
    tagline: "Will Algeria need more water than rain gives it by 2030?",
    description:
      "A time-series project in R. I modelled rainfall with ARIMA/SARIMA (with all the usual tests), modelled water demand as a trend, and then looked for the point where demand overtakes what rain can supply.",
    highlights: ["ARIMA/SARIMA with full diagnostics", "Trend and seasonality decomposition", "Supply vs demand forecast to 2030"],
    categories: ["data"],
    tech: ["R", "forecast", "tseries", "ggplot2"],
    year: "2026",
    cover: { kind: "generative", variant: "timeseries" },
    github: "https://github.com/SalahBadreddine/Rainfall-vs-Demand-Algeria-2030",
  },
  {
    id: "xenium",
    title: "Spatial Transcriptomics Clustering",
    tagline: "Clustering 167K breast cancer cells by where they are in the tissue.",
    description:
      "A competition on a HER2+ breast cancer dataset (about 167K cells, 313 genes). The goal was to group cells into regions of the tissue. I tried BANKSY with Leiden at several resolutions, consensus clustering, and SpatialLeiden on two graphs.",
    highlights: ["~167K cells × 313 genes", "BANKSY with Leiden", "Consensus and multi-graph clustering"],
    categories: ["ai", "data"],
    tech: ["Python", "BANKSY", "Leiden", "Consensus clustering", "Spatial graphs"],
    year: "2026",
    status: "Competition",
    cover: { kind: "generative", variant: "cells" },
  },
  {
    id: "jobmatching",
    title: "AI Job Matching Platform",
    tagline: "Matching job seekers and employers with search algorithms.",
    description:
      "A job matching platform built on classic AI search: genetic algorithms, informed and uninformed search, local search and constraint satisfaction. Job seekers get ranked offers and employers get a shortlist of candidates.",
    highlights: ["Genetic, informed and local search", "Constraint-satisfaction matching", "Dashboards for seekers and employers"],
    categories: ["ai", "web"],
    tech: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
    year: "2025",
    cover: { kind: "image", src: jmHome },
    gallery: [jmHome, jmDashboard, jmEmployer, jmSeeker],
  },
  {
    id: "algreenia",
    title: "Algreenia",
    tagline: "Helping Algerians join tree planting campaigns.",
    description:
      "A website where people can find and join tree planting campaigns near them. It recommends trees, has a chatbot, and tracks watering and how the new trees are doing.",
    highlights: ["Find and join campaigns", "Tree suggestions and a chatbot", "Irrigation and impact tracking"],
    categories: ["web"],
    tech: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    year: "2024",
    cover: { kind: "image", src: algreeniaHome },
    gallery: [algreeniaHome, algreeniaHome1, algreeniaHome2, algreeniaRegister, algreeniaCampaigns, algreeniaChatbot, algreeniaIrrigation],
    github: "https://github.com/SalahBadreddine/ALGREENIA",
  },
  {
    id: "jibly",
    title: "Jibly",
    tagline: "A food delivery app for Algeria.",
    description:
      "A delivery app where customers order easily and riders manage their orders with live tracking. We took it through pre-incubation at ENSIA's V2V incubator.",
    highlights: ["Customer and rider apps", "Real-time delivery tracking", "ENSIA V2V pre-incubation"],
    categories: ["mobile"],
    tech: ["Flutter", "Dart"],
    year: "2025",
    status: "In progress",
    cover: { kind: "generative", variant: "delivery" },
    github: "https://github.com/SalahBadreddine/Jibly",
  },
  {
    id: "bazar",
    title: "Bazar",
    tagline: "A book reading app. My final project for Master Class 2025.",
    description:
      "A Flutter app on Supabase with sign up and email verification, books by category, vendors, a wishlist and a profile page.",
    highlights: ["Supabase auth and Postgres", "Wishlist and categories", "Email verification flow"],
    categories: ["mobile"],
    tech: ["Flutter", "Supabase", "PostgreSQL", "Dart"],
    year: "2025",
    cover: { kind: "image", src: bzHome, fit: "phone" },
    gallery: [bzOnboarding, bzLogin, bzSignup, bzVerification, bzHome, bzCategory, bzWishlist, bzProfile, bzAccount, bzBook, bzVendors],
    phoneGallery: true,
    github: "https://github.com/SalahBadreddine/Bazar",
  },
  {
    id: "khedmatayba",
    title: "Khedma Tayba",
    tagline: "Order, pay and track meals in real time.",
    description:
      "A food delivery app in Flutter. You browse restaurants nearby, order, chat with the driver and follow your delivery live.",
    highlights: ["Browse restaurants and menus", "Cart, orders and live tracking", "In-app chat"],
    categories: ["mobile"],
    tech: ["Flutter", "Dart"],
    year: "2025",
    cover: { kind: "image", src: ktSplash, fit: "phone" },
    gallery: [ktSplash, ktLogin, ktHome, ktCart, ktProfile, ktOrders, ktTrack, ktChat],
    phoneGallery: true,
    github: "https://github.com/SalahBadreddine/KhedmaTayba",
  },
  {
    id: "skilltell",
    title: "Skill&Tell Platforms",
    tagline: "The club's website, HR desk and missions platform.",
    description:
      "I'm the IT lead of the Skill&Tell Scientific Club, so I build its tools. We redesigned skillntell.com in Next.js, built an HR Desk to review sign ups, put members in departments and email them, and made missions.skillntell.com, a Solo Leveling themed platform for tech challenges.",
    highlights: ["skillntell.com redesign (Next.js)", "HR Desk: review, assign, notify", "missions.skillntell.com challenge platform"],
    categories: ["web"],
    tech: ["Next.js", "TypeScript", "Tailwind", "SMTP"],
    year: "2026",
    status: "Live",
    cover: { kind: "generative", variant: "platform" },
    live: "https://skillntell.com",
  },
];

export const archive = [
  { title: "Ludo Intelligent Agent", desc: "Probabilistic agent that evaluates board states and plays Ludo strategically", tech: "Python · Jupyter", url: "https://github.com/SalahBadreddine/Ludo-Intelligent-Agent" },
  { title: "JP Apex Predators", desc: "SwiftUI app to explore & filter Jurassic Park predators", tech: "Swift · SwiftUI", url: "https://github.com/SalahBadreddine/JPApexPredators17-App" },
  { title: "LOTR Convertor", desc: "SwiftUI currency converter with clean state management", tech: "Swift · SwiftUI", url: "https://github.com/SalahBadreddine/LOTRConvertor17" },
  { title: "DSA II", desc: "Advanced data structures & algorithms labs", tech: "C++", url: "https://github.com/SalahBadreddine/DSA-II" },
  { title: "Coin Toss Game", desc: "Desktop game built with Qt", tech: "C++ · Qt", url: "https://github.com/SalahBadreddine/Coin-Toss-Game-" },
  { title: "News App Backend", desc: "Flask REST backend for a mobile news app", tech: "Python · Flask", url: "https://github.com/SalahBadreddine/flask-app-1" },
  { title: "Poll App", desc: "Software-engineering lab: polling web app", tech: "JavaScript", url: "https://github.com/SalahBadreddine/poll-app" },
  { title: "Team Portfolio (DVCS)", desc: "Collaborative Git workflow simulation", tech: "HTML · CSS · Git", url: "https://github.com/SalahBadreddine/team-portfolio-project" },
];
