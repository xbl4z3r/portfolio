import { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, StarHalf } from "lucide-react";
import Form from "next/form";

export function ReviewForm() {
    const [rating, setRating] = useState(5);
    const [ratingText, setRatingText] = useState("Excellent");

    // Update rating text when rating changes
    useEffect(() => {
        if (rating >= 5) setRatingText("Excellent");
        else if (rating >= 4) setRatingText("Very Good");
        else if (rating >= 3) setRatingText("Good");
        else if (rating >= 2) setRatingText("Fair");
        else setRatingText("Poor");
    }, [rating]);

    const handleStarClick = (value: number, half: boolean = false) => {
        const newRating = half ? value - 0.5 : value;
        setRating(newRating);
    };

    const renderStar = (index: number) => {
        const value = index + 1;
        const isFilled = value <= Math.ceil(rating);
        const isHalfFilled = value > rating && value - 0.5 <= rating;

        return (
            <div className="relative" key={value}>
                {/* Full star button */}
                <button
                    type="button"
                    className={`focus:outline-none transition-all duration-300 hover:scale-110 ${
                        isFilled && !isHalfFilled ? "text-[#c754fb]" : "text-gray-300"
                    }`}
                    onClick={() => handleStarClick(value)}
                >
                    <Star className={`h-8 w-8 ${isFilled && !isHalfFilled ? "fill-current" : ""}`} />
                </button>

                {/* Half star button overlay */}
                <button
                    type="button"
                    className="absolute top-0 left-0 w-1/2 h-full opacity-0 hover:opacity-100 focus:outline-none"
                    onClick={() => handleStarClick(value, true)}
                >
                    {isHalfFilled && (
                        <StarHalf className="absolute top-0 left-0 h-8 w-8 text-[#c754fb] fill-current" />
                    )}
                </button>
            </div>
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <p className="text-muted text-center cursor-pointer hover:text-[#c754fb] transition-colors animate-pulse">
                    Leave a review
                </p>
            </DialogTrigger>
            <DialogContent className="backdrop-blur-xl bg-background/80 border border-[#c754fb]/20 shadow-lg shadow-[#c754fb]/10 animate-in fade-in-0 zoom-in-95">
                <DialogHeader>
                    <DialogTitle className="text-transparent bg-clip-text bg-gradient-to-r from-[#c754fb] to-[#db7dfa]">
                        Leave a review
                    </DialogTitle>
                    <DialogDescription>
                        Share your experience with Hyper Bot
                    </DialogDescription>
                </DialogHeader>
                <Form action="/api/hyperbot/review" className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <Input
                            id="name"
                            name="name"
                            required
                            placeholder="Your name"
                            className="transition-all focus-within:border-[#c754fb]/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="username" className="text-sm font-medium">Username</label>
                        <Input
                            id="username"
                            name="username"
                            required
                            placeholder="@username"
                            className="transition-all focus-within:border-[#c754fb]/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="body" className="text-sm font-medium">Review</label>
                        <textarea
                            id="body"
                            name="body"
                            required
                            className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c754fb]/50 transition-all"
                            placeholder="Share your thoughts about Hyper Bot"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="rating" className="text-sm font-medium">Rating</label>
                        <div className="flex items-center gap-2">
                            {[0, 1, 2, 3, 4].map(renderStar)}
                            <input type="hidden" name="rating" value={rating} />
                            <span className="ml-2 text-sm text-muted-foreground animate-in fade-in duration-500">
                {ratingText}
              </span>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-[#c754fb] to-[#db7dfa] hover:opacity-90 transition-all duration-300 hover:scale-105"
                        >
                            Submit Review
                        </Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
}