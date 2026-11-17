/** Stand-in for `@shelley/ui/lib/utils` (mapped in tsconfig.json paths). Same
 *  implementation as the shelley package. */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
