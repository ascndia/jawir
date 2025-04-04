import React from 'react';
import PostCard from './post-card';
import { Post } from '@/lib/reddit-mock-data'; // Import the Post type

interface PostFeedProps {
  posts: Post[]; // Accept posts as a prop
}

export default function PostFeed({ posts }: PostFeedProps) {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-muted-foreground">No posts found.</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id} // Pass the id prop
          community={post.community}
          author={post.author}
          timeAgo={post.timeAgo}
          title={post.title}
          contentPreview={post.contentPreview}
          imageUrl={post.imageUrl}
          upvotes={post.upvotes}
          commentCount={post.commentCount}
        />
      ))}
    </div>
  );
}
