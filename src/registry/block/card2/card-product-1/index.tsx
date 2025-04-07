import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface CardProduct1AProps {
    product?: {
        id: string;
        name: string;
        brand: string;
        price: number;
        matchScore: number;
    };
}

const defaultProduc= {
    id: '1',
    name: 'Product Name',
    brand: 'Brand Name',
    price: 99.99,
    matchScore: 85,
}

export const CardProduct1A: React.FC<CardProduct1AProps> = ({ product = defaultProduc }) => {
    return (
        <Card key={product.id} className="overflow-hidden group border border-muted hover:shadow-md transition-shadow">
            <div className="relative">
                <div className="aspect-[3/4] bg-accent/30 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                        Product Image
                    </div>
                </div>
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                >
                    <Heart className="h-4 w-4" />
                </Button>
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                    {product.matchScore}% Match
                </div>
            </div>

            <CardContent className="p-4">
                <h3 className="font-serif font-medium mb-1 truncate">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                <div className="flex justify-between items-center">
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                    <Button size="sm" variant="outline" className="text-xs h-8">
                        Add to Bag
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

