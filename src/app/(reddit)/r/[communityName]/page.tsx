import React from 'react';
import { notFound } from 'next/navigation';
import RedditLayout from '@/components/reddit/layout';
import CommunityHeader from '@/components/reddit/community-header';
import CommunityInfo from '@/components/reddit/community-info';
import PostFeed from '@/components/reddit/post-feed';
import { getCommunityData, getPostsForCommunity } from '@/lib/reddit-mock-data';

interface CommunityPageProps {
  params: { communityName: string };
}

export default function CommunityPage({ params }: CommunityPageProps) {
  const { communityName } = params;

  // Fetch community data and posts using mock functions
  const communityData = getCommunityData(communityName);
  const communityPosts = getPostsForCommunity(communityName);

  // Handle case where community doesn't exist
  if (!communityData) {
    notFound(); // Or return a custom "Community not found" component
  }

  return (
    // Pass CommunityInfo component to the layout's sidebarContent prop
    <RedditLayout sidebarContent={<CommunityInfo community={communityData} />}>
      {/* Render the Community Header */}
      <CommunityHeader community={communityData} />

      {/* Render the Post Feed with filtered posts */}
      <div className="mt-4">
        <PostFeed posts={communityPosts} />
      </div>
    </RedditLayout>
  );
}

// Optional: Generate static paths if you have a known list of communities
// export async function generateStaticParams() {
//   // Fetch or define your list of communities
//   const communities = [{ communityName: 'reactjs' }, { communityName: 'nextjs' }];
//   return communities;
// }
