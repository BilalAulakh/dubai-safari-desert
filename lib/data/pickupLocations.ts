import { PickupLocation } from "@/types";

export const initialPickupLocations: PickupLocation[] = [
  { id: "loc-downtown", name: "Downtown Dubai (Burj Khalifa area)", active: true, sort_order: 1 },
  { id: "loc-marina", name: "Dubai Marina & JBR (Jumeirah Beach Residence)", active: true, sort_order: 2 },
  { id: "loc-business-bay", name: "Business Bay", active: true, sort_order: 3 },
  { id: "loc-palm", name: "Palm Jumeirah & Madinat Jumeirah", active: true, sort_order: 4 },
  { id: "loc-deira", name: "Deira & Dubai Creek", active: true, sort_order: 5 },
  { id: "loc-bur-dubai", name: "Bur Dubai & Al Karama", active: true, sort_order: 6 },
  { id: "loc-barsha", name: "Al Barsha & Mall of Emirates area", active: true, sort_order: 7 },
  { id: "loc-jlt", name: "Jumeirah Lake Towers (JLT) & Dubai Media City", active: true, sort_order: 8 },
  { id: "loc-dubai-hills", name: "Dubai Hills Estate & Meydan", active: true, sort_order: 9 },
  { id: "loc-other", name: "Other Hotel / Private Residence in Dubai", active: true, sort_order: 10 },
];
