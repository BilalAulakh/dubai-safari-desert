// Placeholder blocks shown while server data streams in. Sized like the real
// sections so nothing jumps when content arrives.

function Bar({ className }: { className: string }) {
  return <div className={`rounded-md bg-ink/10 motion-safe:animate-pulse ${className}`} />;
}

export function SectionHeaderSkeleton() {
  return (
    <div className="mb-12 max-w-2xl space-y-5 lg:mb-16">
      <Bar className="h-3 w-40" />
      <Bar className="h-10 w-3/4" />
      <Bar className="h-5 w-full" />
    </div>
  );
}

export function CardGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
          <div className="aspect-[4/3] w-full bg-ink/10 motion-safe:animate-pulse" />
          <div className="space-y-3 p-6">
            <Bar className="h-6 w-3/4" />
            <Bar className="h-4 w-full" />
            <Bar className="h-4 w-5/6" />
            <Bar className="mt-6 h-11 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SectionSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <section className="section-y bg-page" aria-busy="true" aria-label="Loading">
      <div className="container-page">
        <SectionHeaderSkeleton />
        <CardGridSkeleton count={cards} />
      </div>
    </section>
  );
}
