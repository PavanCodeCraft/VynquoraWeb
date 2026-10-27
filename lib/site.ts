// ─────────────────────────────────────────────────────────────
//  All website text and links live here. Edit this file to update
//  the site — no need to touch the page code.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Vynquora",
  // Registered company name. Leave "" until it's confirmed — the footer
  // then shows just "Vynquora". Example: "Vynquora Global Services".
  legalName: "",
  domain: "vynquora.com",
  url: "https://vynquora.com",
  tagline: "Software development company in Bengaluru",
  description:
    "Vynquora is a software development company in Bengaluru that designs, builds and supports web apps, mobile apps, AI features and cloud infrastructure for businesses.",

  // Logo file in /public. Put your logo there with exactly this name.
  logo: "/vynquora_logo.png",
  // true = the logo image already contains the word "Vynquora",
  // so the text next to it is hidden.
  logoHasName: false,

  email: "info@vynquora.com",          // enquiries, proposals, contact form
  partnerEmail: "team@vynquora.com",   // partnerships & vendor onboarding
  phone: "+91 84272 59874",
  // WhatsApp number: country code + number, digits only
  whatsapp: "918427259874",
  hours: "Mon to Sat, 10am to 7pm IST",

  address: {
    locality: "Koramangala",
    city: "Bengaluru",
    region: "Karnataka",
    country: "IN",
    countryName: "India",
  },
  location: "Koramangala, Bengaluru, India · Working with clients worldwide",

  // Social profiles. Leave "" to hide an icon.
  socials: {
    linkedin: "https://www.linkedin.com/company/vynquora",
    x: "https://x.com/vynquora",
  },
  xHandle: "@vynquora",

  // Paste the code from Google Search Console → HTML tag method
  // (only the content="..." value). Leave "" if not using it.
  googleVerification: "",
};

// Keep these honest — every one should hold up if a client asks.
export const stats = [
  { value: "10+", label: "Products shipped for clients and ourselves" },
  { value: "24h", label: "Reply to every enquiry" },
  { value: "1 week", label: "From first call to a fixed-scope proposal" },
  { value: "30 days", label: "Free support after every launch" },
];

export const services = [
  {
    icon: "app",
    problem: "Chasing payments and dues by hand",
    title: "Web apps & dashboards",
    body: "Admin panels, customer portals, billing and booking systems that replace spreadsheets and WhatsApp groups.",
    tags: ["React", "Next.js", "Node.js", "Python"],
  },
  {
    icon: "ai",
    problem: "Answering the same questions all day",
    title: "AI features & chatbots",
    body: "Assistants that answer your customers, search your documents, or write and design content, built into your product.",
    tags: ["OpenAI", "Gemini", "RAG", "Agents"],
  },
  {
    icon: "phone",
    problem: "Customers who expect an app",
    title: "Mobile apps",
    body: "iOS and Android from one codebase, so you launch on both stores without paying for two apps.",
    tags: ["React Native", "Expo"],
  },
  {
    icon: "globe",
    problem: "A website that brings no enquiries",
    title: "Business websites",
    body: "Fast, search-friendly websites and landing pages that turn visitors into enquiries.",
    tags: ["Next.js", "SEO", "CMS"],
  },
  {
    icon: "cloud",
    problem: "Servers, releases and downtime worries",
    title: "Cloud, DevOps & hosting",
    body: "Automated deployments, monitoring, backups and security on AWS, Vercel or your own servers.",
    tags: ["AWS", "Docker", "CI/CD", "Terraform"],
  },
  {
    icon: "search",
    problem: "Unsure if your code or a quote is sound",
    title: "Code audits & tech guidance",
    body: "A clear second opinion on your codebase, architecture or a vendor's quote, written in plain language.",
    tags: ["Reviews", "Architecture", "Planning"],
  },
];

export type Project = {
  slug: string;            // used in the URL: /work/<slug>
  name: string;
  category: string;        // shown as a filter on the Work page
  kind: string;            // one-line description
  summary: string;         // the problem and what we did
  built: string[];         // key features
  stack: string[];
  image: string;           // main screenshot (1600x1000 works best) in /public/work
  imageAlt: string;
  gallery?: { src: string; alt: string }[]; // extra screenshots for the detail page
  liveUrl?: string;        // leave "" if the project isn't public
  featured?: boolean;      // true = also shown on the homepage (first 3)
  story?: Story;           // Problem -> Solution -> Result block on the detail page
};

export type StoryStep = { title: string; points: string[] };
export type Story = {
  problem: StoryStep;
  solution: StoryStep;
  result: StoryStep;
  stats?: { value: string; label: string }[]; // optional big numbers, only add real ones
};

// ─── HOW TO ADD A PROJECT ───────────────────────────────────
// 1. Put screenshots in /public/work (e.g. /public/work/shopkart-home.webp)
// 2. Copy one block below, paste it at the end, and change the text.
// 3. Give it a unique slug (lowercase, no spaces). The page /work/<slug>
//    is created automatically.
// ────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    slug: "societyos",
    name: "SocietyOS",
    category: "Web platform",
    kind: "Property management platform for a real-estate client",
    summary:
      "Housing societies were collecting maintenance over WhatsApp and tracking visitors in paper registers. We built one platform for the committee, the residents and the security gate.",
    built: [
      "Automatic monthly invoices with direct UPI payment and PDF receipts",
      "Gate console for guards with QR visitor passes and delivery logs",
      "Notices, complaints, staff records and an SOS alert button",
      "Separate apps for admins, residents, tenants and guards",
    ],
    stack: ["React", "FastAPI", "MongoDB", "Cloudflare R2", "Vercel", "Render"],
    image: "/work/societyos-admin.webp",
    imageAlt: "SocietyOS admin dashboard showing maintenance collected, outstanding dues and collection status",
    gallery: [
      { src: "/work/societyos-guard.webp", alt: "SocietyOS gate console where guards check visitors in and out" },
    ],
    liveUrl: "https://society-os-fronted.vercel.app",
    featured: true,
    story: {
      problem: { title: "Managing a society by hand was a mess", points: ["Maintenance was collected over WhatsApp and dues were hard to track", "Visitors were written in paper registers", "No clear record of who lives in each flat, who joined and who left"] },
      solution: { title: "One platform for the whole society", points: ["Automatic invoices with UPI payment and PDF receipts", "QR visitor passes and a digital gate log for guards", "Every flat, resident and tenant recorded in one place"] },
      result: { title: "The society now runs without manual work", points: ["Full record of every flat: who lives there, who joined, who left", "Dues, visitors and notices tracked automatically", "No extra staff needed to manage day-to-day work"] },
    },
  },
  {
    slug: "kriti",
    name: "Kriti",
    category: "AI product",
    kind: "AI studio, our in-house product",
    summary:
      "A ChatGPT-style assistant that writes, explains and creates images, with saved chats, a community gallery and paid credits.",
    built: [
      "AI chat that remembers the conversation, powered by Google Gemini",
      "Text-to-image generation with cloud storage",
      "Credit plans and online checkout with Stripe",
      "Light and dark themes, works on any screen size",
    ],
    stack: ["React", "Node.js", "MongoDB", "Gemini", "Stripe", "Vercel"],
    image: "/work/kriti-chat.webp",
    imageAlt: "Kriti AI chat screen with a drafted payment reminder",
    gallery: [
      { src: "/work/kriti-home.webp", alt: "Kriti home screen with ready-made prompts" },
      { src: "/work/kriti-credits.webp", alt: "Kriti credit plans page" },
    ],
    liveUrl: "https://kriti-ai-web-kappa.vercel.app",
    featured: true,
    story: {
      problem: { title: "Students got stuck with no one to ask", points: ["Study doubts stayed unsolved", "Generic chatbots give long, off-topic answers", "Time was wasted reading things nobody asked for"] },
      solution: { title: "A focused AI assistant for students", points: ["Answers exactly what was asked, nothing extra", "Remembers the chat, so follow-up questions work", "Also explains topics and creates images"] },
      result: { title: "Quick, useful answers any time", points: ["Students can solve study problems on their own", "Less time wasted, more time learning", "Live product with saved chats and credit plans"] },
    },
  },
  {
    slug: "data-verification",
    name: "Large-scale Data Verification System",
    category: "Automation",
    kind: "Automation platform that checks thousands of records a day",
    summary:
      "A research team was checking thousands of records a day by hand against strict quality rules. We built a system that runs the checks automatically and clears the clear-cut cases on its own. Only borderline cases reach a person, on a simple one-click review screen.",
    built: [
      "Automatic rule checks that handle most records with no human effort",
      "Fast review screen with the quality checklist built in",
      "Live admin dashboard: who is online, idle or working, and today's output",
      "Pause and assign controls, activity logs and daily Excel reports",
    ],
    stack: ["React", "Supabase", "Browser automation", "Vercel"],
    image: "/work/verify-admin.webp",
    imageAlt: "Admin dashboard showing reviewers, queue size and records approved today",
    gallery: [
      { src: "/work/verify-review.webp", alt: "One-click review screen with the quality checklist" },
    ],
    liveUrl: "", // internal tool: demo on request
    featured: true,
    story: {
      problem: { title: "Too much data, too much checking by hand", points: ["Thousands of records arrived every day", "Bad data was mixed in with good data", "People spent hours checking each record"] },
      solution: { title: "Automatic checks first, people second", points: ["The system checks every record against the quality rules", "Bad data is rejected, good data is passed on", "Only borderline cases go to a person"] },
      result: { title: "Better data, with far less effort", points: ["The team works only on clean, good-quality data", "Production went up and manual work came down", "Daily reports and activity logs for the admin"] },
      // stats: [
      //   { value: "2x", label: "Higher production" },
      //   { value: "2x", label: "Less manpower needed" },
      // ],
    },
  },
  {
    slug: "depms",
    name: "DEPMS",
    category: "Business software",
    kind: "Performance management system that replaced Excel tracking",
    summary:
      "Daily targets, hourly output and attendance for a whole operations team were tracked in heavy Excel sheets full of formulas. DEPMS moves all of it into one app: employees log their work hour by hour, and every total, target and ranking updates by itself.",
    built: [
      "Separate dashboards for admins, team leaders and employees",
      "Hourly work entry with live progress against the daily target",
      "Automatic monthly totals, achievement % and top-performer rankings",
      "Teams, targets, attendance, reports and a full audit log",
      "Installs on the phone like an app, straight from the browser",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Vercel"],
    image: "/work/depms-entry.webp",
    imageAlt: "DEPMS daily entry screen with hourly output and progress against the daily target",
    gallery: [
      { src: "/work/depms-admin.webp", alt: "DEPMS organisation dashboard for admins" },
    ],
    liveUrl: "https://depms.vercel.app",
    featured: false,
    story: {
      problem: { title: "Running data entry needed a whole team", points: ["2 to 3 people were needed just to manage the process", "Targets and progress were tracked in Excel", "Hard to see who finished how much, and what is pending"] },
      solution: { title: "One dashboard for the whole department", points: ["Assign data and daily targets to each employee", "Track work done, work pending and monthly targets", "Team-wise and person-wise progress in one place"] },
      result: { title: "One person can now run it all", points: ["The admin manages the full department alone", "Live view of daily and monthly target progress", "No extra time spent chasing people for updates"] },
      stats: [
        // { value: "4-5 to 1", label: "People needed to manage the process" },
      ],
    },
  },
  {
    slug: "mini-store",
    name: "Mini Store",
    category: "E-commerce",
    kind: "Online store with catalogue, cart and checkout",
    summary:
      "A fast, clean storefront we use as the starting point for e-commerce builds. It covers the full shopping journey, from browsing categories to checkout, and can be branded for any shop.",
    built: [
      "Product catalogue with categories, search and price sorting",
      "Product pages with stock labels like \"Only 4 left\"",
      "Cart and guest checkout, with free-delivery threshold and returns info",
      "Prices in rupees, mobile-friendly and accessible",
    ],
    stack: ["React", "Vercel"],
    image: "/work/ministore-home.webp",
    imageAlt: "Mini Store home page with featured products",
    liveUrl: "https://ecommerce-platform-nu-dun.vercel.app",
    featured: false,
    story: {
      problem: { title: "Clients find it hard to picture an online store", points: ["E-commerce is hard to explain in words", "Clients want to see a real shopping flow first"] },
      solution: { title: "A ready demo store they can try", points: ["Full journey: browse, cart and checkout", "Clean design that works on mobile", "Easy to brand for any shop"] },
      result: { title: "Clients see it before they decide", points: ["A clear idea of what their own store could look like", "Faster talks about requirements", "A custom store designed around their needs"] },
    },
  },
  // {
  //   slug: "new-project",
  //   name: "Project name",
  //   category: "Web platform",          // or "AI product", "Mobile app", "Website", "Dashboard"
  //   kind: "What it is, in one line",
  //   summary: "The problem the client had, and what we built.",
  //   built: ["Feature one", "Feature two", "Feature three"],
  //   stack: ["React", "Node.js"],
  //   image: "/work/new-project.webp",
  //   imageAlt: "Describe the screenshot",
  //   gallery: [],
  //   liveUrl: "",
  //   featured: false,
  // },
];

// ─── PRINCIPLES (homepage section after the hero) ───────────
// Put the PDF at public/docs/human-in-the-loop.pdf
export const hitlPdf = "/docs/human-in-the-loop.pdf";

export const hitl = {
  title: "Human in the loop: AI proposes, people decide.",
  body: "Nothing AI produces goes live on its own. Every output that carries risk is reviewed by a person with the right expertise, who decides whether it is practical, compliant and safe to use.",
  flow: [
    "AI output",
    "Confidence check",
    "Expert review",
    "Approve, correct or reject",
    "Feedback improves the next output",
  ],
  checks: [
    { q: "Correct?", a: "Is it accurate and grounded in your own data?" },
    { q: "Practical?", a: "Will it work in real operations, at real cost and scale?" },
    { q: "Compliant?", a: "Does it meet the laws, policies and contracts that apply to you?" },
    { q: "Explainable?", a: "Can we show why it decided that, if an auditor asks?" },
  ],
};

export const otherPrinciples = [
  {
    title: "Secure and auditable by design",
    body: "Every decision is logged: what the AI saw, what it suggested, who reviewed it and what they changed. Your data stays yours, access is limited to the people who need it, and you own the code.",
    tags: ["NDA first", "Full audit trail", "You own the code"],
  },
  {
    title: "Pilot first, scale on proof",
    body: "We start with one workflow, measure it against a baseline you agree up front, and expand only when the results hold. Fixed scope and fixed price at every stage.",
    tags: ["Weekly builds", "Agreed success metric", "Fixed price"],
  },
];

export const process = [
  {
    title: "Free discovery call",
    body: "30 minutes to understand your business and what you need. We sign an NDA first if you want one.",
  },
  {
    title: "Fixed-scope proposal",
    body: "Within a week: what we'll build, the timeline, and a fixed price. No hourly surprises.",
  },
  {
    title: "Design & build",
    body: "You see working software every week and can change direction early, not after launch.",
  },
  {
    title: "Launch & support",
    body: "We deploy, train your team and fix anything that comes up for 30 days, free.",
  },
];

export const promises = [
  {
    title: "Talk to the engineers",
    body: "No account managers in between. The people on your calls are the people writing your code.",
  },
  {
    title: "You own everything",
    body: "Code, designs, accounts and data are yours from day one, in your own GitHub and cloud.",
  },
  {
    title: "Fixed scope, fixed price",
    body: "We agree on what gets built before we start. Changes are quoted up front.",
  },
  {
    title: "NDA by default",
    body: "Your idea stays yours. We sign before the first detailed conversation.",
  },
];

export const stack = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI",
  "React Native", "MongoDB", "PostgreSQL", "Redis", "AWS", "Docker",
  "Vercel", "OpenAI", "Gemini", "Stripe", "Razorpay",
];

export const faqs = [
  {
    q: "How much does a project cost?",
    a: "It depends on scope. A business website usually takes a few weeks; a custom web app or dashboard takes one to three months. After a free call we send a fixed price, so you know the full cost before any work starts.",
  },
  {
    q: "How long until we can launch?",
    a: "Websites in two to four weeks. Most apps launch a first version in six to ten weeks, and we keep improving it with you after that.",
  },
  {
    q: "Will we own the code?",
    a: "Yes. Everything is built in your own GitHub and cloud accounts, and full ownership is written into the contract.",
  },
  {
    q: "Can you work on our existing app?",
    a: "Yes. We start with a short code review, tell you honestly what's working and what isn't, and then fix or extend it.",
  },
  {
    q: "Do you work as a vendor or partner for larger companies?",
    a: "Yes. We sign NDAs and vendor agreements, work within your security and access rules, and give you one point of contact who is also an engineer on the project. Write to us at team@vynquora.com for partnership or vendor onboarding.",
  },
  {
    q: "What happens after launch?",
    a: "You get 30 days of free support. After that, you can choose a monthly maintenance plan or call us only when you need something.",
  },
];

// Used on the "How we work" page
export const values = [
  {
    title: "Plain language",
    body: "Proposals, updates and invoices you can read without a technical dictionary. If something is late or hard, we say so early.",
  },
  {
    title: "Working software every week",
    body: "You see progress on a real link, not slides. Feedback goes in while it is still cheap to change direction.",
  },
  {
    title: "Built to be handed over",
    body: "Clean code, documented setup and your own accounts, so your team or any future vendor can pick it up.",
  },
  {
    title: "On time, as agreed",
    body: "Scope, timeline and price are written down before we start. Changes are quoted up front, never added later.",
  },
];

export const partnerPoints = [
  "NDA and vendor agreements signed before detailed discussions",
  "Work in your repositories, cloud and project tools",
  "One accountable point of contact who is also on the build",
  "Written scope, weekly demos and documented hand-over",
];

// Main navigation (header and footer)
export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Solutions" },
  { href: "/how-we-work", label: "How we execute" },
  { href: "/about", label: "About" },
];

export const projectTypes = [
  "Web app or dashboard",
  "AI feature or chatbot",
  "Mobile app",
  "Website",
  "Cloud / DevOps",
  "Something else",
];

// Optional field on the contact form. Kept neutral on purpose.
export const timelines = [
  "As soon as possible",
  "In 1–3 months",
  "Just exploring",
];
