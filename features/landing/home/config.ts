/* Round 13, item 9: the one place the demo link lives. Every "Book a demo" control reads CAL_URL (content.ts re-exports
   it as DEMO_URL), so changing the event is a one-line change here. TODO: the 15-minute cal.com event URL is still to come
   from Bindu (DECISIONS.md, round 13); until then this is the existing link. No UTM, no trackers. */
import { demoUrl } from "@/lib/demo-url";
export const CAL_URL = demoUrl("home");
