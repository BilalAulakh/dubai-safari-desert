import { SectionSkeleton } from "@/components/common/Skeletons";

// Route-level Suspense fallback: a page-shaped skeleton instead of a blocking spinner
export default function Loading() {
  return (
    <div className="min-h-[60vh] pt-24">
      <SectionSkeleton />
    </div>
  );
}
