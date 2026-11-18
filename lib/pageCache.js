import { cache } from "react";
import { getPage } from "@/lib/pages";

// Ek request mein generateMetadata aur JsonLd dono page maangte hain: DB ko sirf ek baar jata hai
export const getPageCached = cache(getPage);
