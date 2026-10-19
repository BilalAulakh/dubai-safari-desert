import Link from "next/link";
import { Star, MessageSquarePlus, ArrowRight, Quote } from "lucide-react";
import { Review } from "@/types";
import { formatDate } from "@/lib/utils";
import ScrollReveal from "@/components/common/ScrollReveal";

interface HomeReviewsProps {
  reviews: Review[];
}

function Stars({ rating, size = "h-4 w-4" }: { rating: number; size?: string }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${size} ${i < rating ? "fill-amber-500 text-amber-500" : "text-line"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function HomeReviews({ reviews }: HomeReviewsProps) {
  const displayReviews = (reviews || []).slice(0, 3);

  return (
    <section className="section-y bg-page">
      <div className="container-page">
        <ScrollReveal>
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-16">
            <div className="max-w-2xl">
              <p className="kicker">Guest Experiences</p>
              <h2 className="mt-5 font-display text-h2 font-semibold text-ink">
                Stories from the <span className="italic text-accent">dunes</span>
              </h2>
              <p className="mt-4 text-body-lg text-muted">Feedback from guests who rode the dunes with us.</p>
            </div>
            <Link href="/review" className="btn-outline shrink-0">
              <MessageSquarePlus className="h-4 w-4 text-accent" aria-hidden="true" />
              <span>Leave a Review</span>
            </Link>
          </div>
        </ScrollReveal>

        {displayReviews.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {displayReviews.map((rev, i) => (
              <ScrollReveal key={rev.id} delay={i * 100}>
                <figure className="card card-hover relative flex h-full flex-col p-7">
                  <Quote className="absolute right-6 top-6 h-10 w-10 text-amber-500/20" aria-hidden="true" />
                  <Stars rating={rev.rating} />
                  <blockquote className="mt-5 flex-1 font-display text-[1.125rem] italic leading-relaxed text-ink">
                    &ldquo;{rev.comment}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dune-900 font-display text-base font-semibold text-amber-300">
                        {rev.customer_name.trim().charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink">{rev.customer_name}</p>
                        {rev.country && <p className="text-xs text-muted">{rev.country}</p>}
                      </div>
                    </div>
                    <span className="text-xs text-muted">{formatDate(rev.created_at)}</span>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="card mx-auto max-w-xl space-y-4 px-6 py-12 text-center">
            <div className="flex justify-center">
              <Stars rating={5} size="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-ink">Be our next featured reviewer</h3>
            <p className="text-sm text-muted">
              Have you experienced our Dubai Desert Safari? We would love to hear your feedback.
            </p>
            <Link href="/review" className="btn-gold">
              <span>Write a Review</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}

        {displayReviews.length > 0 && (
          <div className="mt-12 text-center">
            <Link href="/reviews" className="link-arrow">
              <span>Read all guest reviews</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
