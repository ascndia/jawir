export interface Community {
  name: string;
  description: string;
  memberCount: number;
  icon?: string; // URL or path to icon
  banner?: string; // URL or path to banner image
  rules?: string[];
}

export interface Post {
  id: number;
  community: string; // Community name (matches Community.name)
  author: string;
  timeAgo: string;
  title: string;
  content: string; // Add full content field
  contentPreview?: string; // Keep preview optional
  imageUrl?: string;
  upvotes: number;
  commentCount: number;
}

export const mockCommunities: Community[] = [
  {
    name: 'reactjs',
    description: 'A community for learning and developing with React.',
    memberCount: 2300000,
    icon: '/images/placeholder.svg', // Placeholder
    banner: '/images/placeholder.jpg', // Placeholder
    rules: [
      'Be kind and respectful.',
      'Stay on topic (React and related ecosystem).',
      'No spam or self-promotion without context.',
    ],
  },
  {
    name: 'nextjs',
    description: 'The official Next.js community.',
    memberCount: 150000,
    icon: '/images/placeholder.svg', // Placeholder
    banner: '/images/placeholder.jpg', // Placeholder
    rules: [
      'Questions should be specific.',
      'Showcase projects are welcome.',
      'Follow Next.js code of conduct.',
    ],
  },
  {
    name: 'tailwindcss',
    description: 'Community for Tailwind CSS users.',
    memberCount: 95000,
    icon: '/images/placeholder.svg', // Placeholder
    banner: '/images/placeholder.jpg', // Placeholder
    rules: ['Share tips and tricks.', 'Help others learn.', 'Be constructive.'],
  },
];

export const mockPosts: Post[] = [
  {
    id: 1,
    community: 'reactjs', // Linked to community
    author: 'coolDev123',
    timeAgo: '5 hours ago',
    title: 'Shadcn/ui is amazing for building UIs quickly!',
    contentPreview:
      'Just wanted to share how much I love using shadcn/ui with Tailwind. It makes component building so much faster...',
    content: 'Full post content about Shadcn/ui: \n\nIt integrates seamlessly with Next.js and provides beautifully designed components out of the box. The theming capabilities are also top-notch. Highly recommended!',
    upvotes: 128,
    commentCount: 23,
  },
  {
    id: 2,
    community: 'nextjs', // Linked to community
    author: 'nextFanatic',
    timeAgo: '8 hours ago',
    title: 'Exploring Server Actions in Next.js 15',
    content: 'Server Actions in Next.js 15 simplify data mutations significantly. No need for separate API routes for simple form submissions. Here\'s a quick example...',
    imageUrl: '/images/placeholder.jpg', // Using existing placeholder
    upvotes: 256,
    commentCount: 45,
  },
  {
    id: 3,
    community: 'tailwindcss', // Linked to community
    author: 'utilityFirst',
    timeAgo: '1 day ago',
    title: 'Tips for organizing Tailwind CSS classes',
    contentPreview:
      'Keeping Tailwind classes manageable can be tricky. Here are a few strategies I use in my projects...',
    content: 'Strategies for Tailwind:\n1. Use @apply sparingly.\n2. Component-based organization.\n3. Consistent naming conventions.\n4. Leverage `clsx` or `tailwind-merge`.',
    upvotes: 98,
    commentCount: 15,
  },
  {
    id: 4,
    community: 'reactjs', // Linked to community
    author: 'stateMaster',
    timeAgo: '2 days ago',
    title: 'Managing complex state in large React applications',
    contentPreview: 'Discussing different state management libraries like Zustand, Redux Toolkit, and Jotai...',
    content: 'Choosing the right state management library depends on the project scale and team familiarity. Zustand offers simplicity, while Redux provides robust tooling for very large apps.',
    upvotes: 315,
    commentCount: 68,
  },
];

// Helper function to get community data by name
export const getCommunityData = (name: string): Community | undefined => {
  return mockCommunities.find((c) => c.name.toLowerCase() === name.toLowerCase());
};

// Helper function to get posts for a specific community
export const getPostsForCommunity = (communityName: string): Post[] => {
  return mockPosts.filter((p) => p.community.toLowerCase() === communityName.toLowerCase());
};

// Helper function to get all posts (for the main feed)
export const getAllPosts = (): Post[] => {
  return mockPosts;
};

// --- Comments ---

export interface Comment {
  id: number;
  postId: number; // Link comment to a post
  author: string;
  timeAgo: string;
  content: string;
  upvotes: number;
}

export const mockComments: Comment[] = [
  // Comments for Post 1 (Shadcn)
  { id: 101, postId: 1, author: 'reactFan', timeAgo: '4h ago', content: 'Totally agree! It saved me so much time.', upvotes: 15 },
  { id: 102, postId: 1, author: 'designerDan', timeAgo: '3h ago', content: 'The default styles look great too.', upvotes: 8 },
  // Comments for Post 2 (Next.js Server Actions)
  { id: 201, postId: 2, author: 'serverSideSam', timeAgo: '7h ago', content: 'Server actions are a game changer!', upvotes: 22 },
  { id: 202, postId: 2, author: 'apiAnnie', timeAgo: '6h ago', content: 'Still prefer dedicated API routes for complex logic, but great for simple cases.', upvotes: 12 },
  { id: 203, postId: 2, author: 'nextFanatic', timeAgo: '5h ago', content: 'Good point @apiAnnie, depends on the use case.', upvotes: 5 },
  // Comments for Post 4 (State Management)
  { id: 401, postId: 4, author: 'zustandZoe', timeAgo: '1d ago', content: 'Zustand is my go-to for most projects now.', upvotes: 18 },
];

// Helper function to get a specific post by ID
export const getPostById = (id: number): Post | undefined => {
  return mockPosts.find((p) => p.id === id);
};

// Helper function to get comments for a specific post
export const getCommentsForPost = (postId: number): Comment[] => {
  return mockComments.filter((c) => c.postId === postId);
};
