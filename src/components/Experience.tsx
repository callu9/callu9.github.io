import React from "react";
import { experiences } from "@/data/about";

const Experience: React.FC = () => {
  return (
    <section id="experience" className="section bg-secondary-mint/30">
      <div className="section-container grid gap-12">
        <div className="grid gap-4">
          <h2 className="text-text-primary mb-4 text-4xl font-bold md:text-5xl">
            경력 & 경험
          </h2>
          <p className="text-text-secondary max-w-2xl text-lg">
            프론트엔드 개발 분야에서 다양한 프로젝트를 통해 성장해온
            경험들입니다.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid gap-8 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="relative">
              {/* Timeline Line */}
              {idx !== experiences.length - 1 && (
                <div className="bg-secondary-coral/30 absolute top-12 left-4 h-full w-0.5" />
              )}

              <div className="flex items-start justify-between gap-8">
                {/* Timeline Dot */}
                <div className="bg-secondary-coral border-primary-light relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>

                {/* Content */}
                <div className="card grid grow gap-2 bg-white/50 p-6 pt-2 backdrop-blur-sm transition-colors hover:bg-white/80">
                  <div className="mb-2">
                    <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-baseline">
                      <h3 className="text-text-primary text-2xl font-bold">
                        {exp.position}
                      </h3>
                      <p className="text-secondary-coral font-semibold">
                        {exp.company}
                      </p>
                    </div>
                    <p className="text-text-secondary">{exp.description}</p>
                  </div>

                  <p className="text-text-light text-sm">{exp.period}</p>

                  {/* Achievements */}
                  {exp.achievements.length > 0 && (
                    <ul className="mb-4 space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-text-secondary flex gap-2 text-sm"
                        >
                          <span className="text-secondary-coral flex-shrink-0">
                            →
                          </span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-secondary-peach/50 text-text-primary inline-block rounded-full px-3 py-1 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
