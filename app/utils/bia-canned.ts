/**
 * Pre-written answers for the suggestion chips in the chat.
 *
 * These four questions are the ones almost every visitor clicks first, and
 * the answers never change, so sending them to the AI would spend tokens
 * generating text we already know. Clicking a chip serves the answer from
 * here instead; only questions typed into the composer reach the API.
 *
 * IMPORTANT: these are BIA speaking, so they must agree with
 * server/utils/portfolio.ts and follow the same rules it sets out, plain
 * text, third person, two to four sentences, no markdown, no em dashes.
 * When you update a fact there, update it here too.
 */
/** Same shape and CDN as the icons in tech-stack.vue, so they read as a set. */
export interface TechIcon {
    name: string
    icon: string
    /** Mono-black marks need inverting to stay visible in the dark theme. */
    invertDark?: boolean
}

/**
 * A single framed logo under the answer, for when one institution is the
 * point. Rendered in the same white tile experience.vue uses, so the school
 * looks the same wherever it appears on the site.
 */
export interface Badge {
    /** Path under /public. */
    logo: string
    label: string
}

/** A project screenshot shown under a canned answer. */
export interface CannedImage {
    /** Path under /public. */
    src: string
    alt: string
    label: string
}

export interface CannedExchange {
    /** Chip label, and the text pushed into the transcript as the question. */
    q: string
    a: string
    /** Optional row of small marks rendered under the answer. */
    icons?: TechIcon[]
    /** Optional single framed logo rendered under the answer. */
    badge?: Badge
    /** Optional project screenshots rendered under the answer. */
    images?: CannedImage[]
}

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'
const LOBE = 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons'

/**
 * A deliberate sample, not the whole stack: the full set is a wall of marks
 * that says less than a handful of recognisable ones plus a way through to
 * the rest. Ordered front end, back end, then the AI tools, so the row reads
 * as the shape of his work rather than as a ranking. Same sources as
 * tech-stack.vue, so the two never disagree about a logo.
 */
const STACK_SAMPLE: TechIcon[] = [
    { name: 'Vue.js', icon: `${DEVICON}/vuejs/vuejs-original.svg` },
    { name: 'React', icon: `${DEVICON}/react/react-original.svg` },
    { name: 'TypeScript', icon: `${DEVICON}/typescript/typescript-original.svg` },
    { name: 'Tailwind CSS', icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
    { name: 'Node.js', icon: `${DEVICON}/nodejs/nodejs-original.svg` },
    { name: 'MySQL', icon: `${DEVICON}/mysql/mysql-original.svg` },
    { name: 'Supabase', icon: `${DEVICON}/supabase/supabase-original.svg` },
    { name: 'Claude Code', icon: `${LOBE}/claude-color.svg` },
    { name: 'Codex', icon: `${LOBE}/openai.svg`, invertDark: true },
]

export const CANNED_EXCHANGES: CannedExchange[] = [
    {
        q: 'What does Jonhyl do?',
        a: 'Jonhyl is a full-stack web developer. He builds production SaaS platforms end to end, from the responsive interfaces people actually click on to the APIs and databases behind them. He is based in the Davao region of the Philippines and works remotely for a Danish company.',
    },
    {
        q: 'Tell me about Flexperience',
        a: 'Flexperience is his capstone project, and it won Best Capstone of the Year. It is a unified fitness platform connecting gym owners, trainers, and members, built to make managing workouts and clients feel effortless. It is the one my boss brings up first, so do ask him about it.',
    },
    {
        q: 'What tech does he use?',
        a: 'On the front end: Vue, React, Next.js, TypeScript, and Tailwind CSS, plus a lot of Nuxt (this site is built with it). On the back end: Node.js, Express, Prisma, MySQL, Socket.IO, and Supabase, and he works in Laravel and PHP at AWORK. Day to day he also lives in Git, Figma, Postman, and AI tools like Claude Code and Codex.',
        icons: STACK_SAMPLE,
    },
    {
        q: 'Where did he graduate?',
        a: 'He graduated from STI College of Davao in July 2025 with a BS in Information Technology, covering software development, database systems, and modern web technologies. His capstone project, Flexperience, won Best Capstone of the Year. My boss is quietly proud of that one.',
        badge: { logo: '/sti-logo.png', label: 'STI College of Davao, 2025' },
    },
    {
        q: 'Where does he work?',
        a: 'He works remotely at AWORK, a Danish company, where he joined as a front-end intern in January 2025 and became a full front-end developer that June. He is now the front-end developer for Obiyen, a business SaaS platform, where he integrates backend functionality and builds intuitive, user-friendly interfaces. Before that, he built features for the CitizenOne website using Laravel, Nuxt, and TypeScript.',
        images: [
            {
                src: '/obiyen%20dashboard.png',
                alt: 'Obiyen business dashboard interface',
                label: 'Obiyen dashboard',
            },
            {
                src: '/obiyen%20login.png',
                alt: 'Obiyen login interface',
                label: 'Obiyen login',
            },
        ],
    },
]
