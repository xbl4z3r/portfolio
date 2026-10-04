import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

interface ReviewCardProps {
  img: string
  name: string
  username: string
  body: string
  rating?: number // Rating out of 5
  ratingColor?: string
}

const StarRating = ({
  rating = 0,
  ratingColor = "#FFD700",
}: {
  rating: number
  ratingColor: string
}) => {
  // Ensure rating is between 0 and 5
  const safeRating = Math.min(5, Math.max(0, rating))
  const fullStars = Math.floor(safeRating)

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            color: ratingColor,
          }}
        >
          {i < fullStars ? (
            <Star className="h-3.5 w-3.5 fill-current" />
          ) : (
            <Star className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600" />
          )}
        </span>
      ))}
    </div>
  )
}

export const ReviewCard = ({
  img,
  name,
  username,
  body,
  rating = 0,
  ratingColor = "#FFD700",
}: ReviewCardProps) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <div className="mt-2 mb-1">
        <StarRating rating={rating} ratingColor={ratingColor} />
      </div>
      <blockquote className="text-sm">{body}</blockquote>
    </figure>
  )
}
