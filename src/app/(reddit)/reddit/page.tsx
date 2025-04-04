import RedditLayout from '@/components/reddit/layout';
import PostFeed from '@/components/reddit/post-feed';
import { getAllPosts } from '@/lib/reddit-mock-data'; // Import function to get posts
import React from 'react';

export default function RedditPage() {
  const allPosts = getAllPosts(); // Fetch all posts

  return (
    <RedditLayout>
      <h1 className="text-2xl font-bold">Reddit Clone Feed</h1>
      <div className="mt-4">
        <PostFeed posts={allPosts} /> {/* Pass posts to the component */}
      </div>
    </RedditLayout>
  );
}
