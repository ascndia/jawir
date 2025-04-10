"use client";
import { useState } from 'react';
import { Calendar, Users, BookmarkPlus, Share2, Download } from 'lucide-react';
import { Button } from '@/registry/components/button/select';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Paper = {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  category: string;
  date: string;
  pdfUrl?: string;
};

type CardPaperProps = {
  paper: Paper;
  className?: string;
  showAbstract?: boolean;
};

const CardPaper = ({ paper = {
    id: '1',
    title: 'Attention is All You Need',
    authors: ['Vaswani et al.'],
    abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks in an encoder-decoder configuration. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data.',
    category: 'Category',
    date: '2022-01-01',
    pdfUrl: 'https://example.com'
}, className, showAbstract = true }: Partial<CardPaperProps>) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "group relative bg-background border rounded-xl p-6 transition-all-300",
        isHovered ? "shadow-md border-primary/20" : "shadow-sm",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
            {paper.category}
          </div>
          <div className="flex items-center text-muted-foreground text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            {paper.date}
          </div>
        </div>
        
        <Link href={`/paper/${paper.id}`}>
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
            {paper.title}
          </h3>
        </Link>
        
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <Users className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">
            {paper.authors.join(', ')}
          </span>
        </div>
        
        {showAbstract && (
          <p className="text-muted-foreground text-sm mt-4 line-clamp-3">
            {paper.abstract}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-70 hover:opacity-100">
              <BookmarkPlus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-70 hover:opacity-100">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button  variant="outline" size="sm" className="h-8 text-xs">
              {/* <Link href={`/paper/${paper.id}`}> */}
                View Details
              {/* </Link> */}
            </Button>
            
            {paper.pdfUrl && (
              <Button variant="default" size="sm" className="h-8 text-xs">
                <Download className="h-3 w-3 mr-1" />
                PDF
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div 
        className={cn(
          "absolute inset-0 border-2 border-primary rounded-xl opacity-0 transition-opacity", 
          isHovered ? "opacity-30" : "opacity-0"
        )}
        aria-hidden="true"
      />
    </div>
  );
};

export default CardPaper;
