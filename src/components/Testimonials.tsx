import { UserRound, Quote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "GitStreak helped me build a consistent coding habit. Now I'm coding every day!",
      author: "Sarah Chen",
      role: "Frontend Developer",
    },
    {
      quote: "The streak tracking feature keeps me motivated. Best developer tool I've used!",
      author: "Mike Johnson",
      role: "Full Stack Developer",
    },
    {
      quote: "Perfect for our team to track progress and stay motivated together.",
      author: "Lisa Rodriguez",
      role: "Tech Lead",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Developers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-slate-700 bg-slate-800/50"
            >
              <Quote className="h-8 w-8 text-primary mb-4" />
              <p className="text-lg mb-6">{testimonial.quote}</p>
              <div className="flex items-center gap-3">
                <UserRound className="h-10 w-10 text-slate-400" />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};