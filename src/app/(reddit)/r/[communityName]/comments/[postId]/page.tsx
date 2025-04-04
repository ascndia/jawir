import React from 'react';
import { notFound } from 'next/navigation';
import RedditLayout from '@/components/reddit/layout';
import CommunityInfo from '@/components/reddit/community-info';
import { getPostById, getCommentsForPost, getCommunityData } from '@/lib/reddit-mock-data';
// TODO: Import CommentList and AddCommentForm components when created

interface PostDetailPageProps {
  params: {
    communityName: string; // communityName is in the route but not strictly needed if postData has community
    postId: string;
  };
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { postId } = params;
  const postIdNum = parseInt(postId, 10);

  // Fetch data using mock functions
  const postData = getPostById(postIdNum);
  const communityData = postData ? getCommunityData(postData.community) : undefined;
  const comments = getCommentsForPost(postIdNum);

  // Handle cases where post doesn't exist
  if (isNaN(postIdNum) || !postData) {
    notFound();
  }

  return (
    // Pass CommunityInfo to sidebar if communityData exists
    <RedditLayout sidebarContent={communityData ? <CommunityInfo community={communityData} /> : undefined}>
      {/* Placeholder for Post Detail View - Displaying fetched data */}
      <div className="mb-6 rounded-lg border bg-card p-4">
        {/* TODO: Add voting controls here */}
        <p className="mb-1 text-xs text-muted-foreground">
          Posted by u/{postData.author} in r/{postData.community} • {postData.timeAgo}
        </p>
        <h1 className="mb-3 text-xl font-bold">{postData.title}</h1>
        {postData.imageUrl && (
           <div className="my-3 overflow-hidden rounded-md">
             <img src={postData.imageUrl} alt={postData.title} className="max-h-[500px] w-full object-contain" />
           </div>
         )}
        {/* Render full content */}
        <div className="prose prose-sm dark:prose-invert max-w-none">
           {/* Basic rendering, consider markdown later */}
           {postData.content.split('\n').map((paragraph, index) => (
             <p key={index}>{paragraph}</p>
           ))}
        </div>
        {/* TODO: Add action buttons (comment count, share, save) */}
      </div>

      {/* Placeholder for Add Comment Form */}
      {/* TODO: Replace with AddCommentForm component */}
      <div className="mb-6 rounded-lg border bg-card p-4">
        <p className="text-sm font-semibold mb-2">Leave a comment</p>
        {/* Basic textarea for now */}
        <textarea className="w-full rounded-md border p-2 text-sm bg-background" rows={3} placeholder="What are your thoughts?"></textarea>
        <div className="flex justify-end mt-2">
           <button className="px-3 py-1 text-xs font-semibold rounded bg-primary text-primary-foreground">Comment</button>
        </div>
      </div>

      {/* Placeholder for Comment List */}
      {/* TODO: Replace with CommentList component */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Comments ({comments.length})</h2>
        {comments.length > 0 ? (
          comments.map(comment => (
            // TODO: Replace with CommentCard component
            <div key={comment.id} className="rounded-lg border bg-card p-3 text-sm">
               {/* TODO: Add comment voting controls here */}
              <p className="mb-1 text-xs text-muted-foreground">
                {comment.author} • {comment.timeAgo} • {comment.upvotes} upvotes
              </p>
              <p>{comment.content}</p>
              {/* TODO: Add comment action buttons (reply, share, report) */}
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        )}
      </div>
    </RedditLayout>
  );
}
