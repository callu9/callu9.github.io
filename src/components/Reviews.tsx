import React from "react";
import { reviews } from "@/data/reviews";

const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="section bg-secondary-sage/20">
      <div className="section-container grid gap-8">
        <div className="grid gap-4">
          <h2 className="text-text-primary mb-4 text-4xl font-bold md:text-5xl">
            리뷰
          </h2>
          <p className="text-text-secondary max-w-2xl text-lg">
            함께 일했던 동료들과 리더들의 평가입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="card border-secondary-coral flex h-full flex-col justify-between gap-4 border-l-4 bg-white/70 p-8 backdrop-blur-sm transition-all hover:shadow-lg"
            >
              {/* Review Content */}
              <p className="text-text-secondary mb-6 leading-relaxed italic">
                &ldquo;
                {review.content.split(" ").map((word, idx) =>
                  review.highlights.some((h) => word.includes(h)) ? (
                    <span
                      key={idx}
                      className="highlight font-semibold not-italic"
                    >
                      {word}
                    </span>
                  ) : (
                    <span key={idx}>{word} </span>
                  ),
                )}
                &rdquo;
              </p>

              {/* Reviewer Info */}
              <div className="border-secondary-peach/30 border-t pt-6">
                <p className="text-text-primary mb-2 font-bold">
                  {review.name}
                </p>
                <p className="text-text-secondary mb-1 text-sm">
                  {review.title}
                </p>
                <p className="text-text-light text-xs">{review.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
