import Image from "next/image";
import type { TeamMember } from "@/features/landing/seo/team";

/**
 * The author's portrait, or their initials when they have no photo.
 *
 * Rendered in three places (byline, "About the author", author page) that
 * previously each carried their own copy of the same ternary.
 *
 * The image is decorative: every call site prints the author's name right
 * beside it, so an `alt` of the name made a screen reader say it twice. The
 * initials fallback is hidden for the same reason.
 */
export function AuthorAvatar({
  author,
  size,
  className,
  fallbackClassName,
  priority,
}: {
  author: TeamMember;
  size: number;
  className?: string;
  fallbackClassName?: string;
  priority?: boolean;
}) {
  if (author.avatar) {
    return (
      <Image
        src={author.avatar}
        alt=""
        width={size}
        height={size}
        className={className}
        priority={priority}
      />
    );
  }
  return (
    <span className={fallbackClassName} aria-hidden="true">
      {author.initials}
    </span>
  );
}
