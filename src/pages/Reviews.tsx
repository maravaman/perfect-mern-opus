import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rajesh Kumar",
    role: "Business Owner",
    rating: 5,
    review: "Knight21 transformed our online presence completely. Their SEO services increased our website traffic by 300% in just 3 months!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    name: "Priya Sharma",
    role: "Restaurant Owner",
    rating: 5,
    review: "The team created a beautiful website for our restaurant. We've seen a significant increase in online orders since launch.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
  },
  {
    name: "Dr. Amit Patel",
    role: "Hospital Administrator",
    rating: 5,
    review: "Professional and responsive team. They understood our requirements perfectly and delivered an excellent healthcare portal.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
  },
  {
    name: "Anita Reddy",
    role: "School Principal",
    rating: 5,
    review: "Knight21 developed our school management system. Parents and teachers love the user-friendly interface!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
  },
  {
    name: "Vikram Singh",
    role: "Startup Founder",
    rating: 5,
    review: "Their digital marketing expertise helped us acquire our first 1000 customers. Highly recommend their services!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
  },
  {
    name: "Meera Krishnan",
    role: "E-commerce Owner",
    rating: 5,
    review: "The team's dedication and expertise in SEO and content marketing is unmatched. Our sales have doubled!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
  }
];

export default function Reviews() {
  return (
    <div className="font-outfit">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins">
              Client <span className="text-primary">Reviews</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              What our clients say about working with Knight21
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-2xl font-bold">4.9/5.0</span>
              <span className="text-muted-foreground">(15,000+ Reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">{review.review}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "15,000+", label: "Happy Clients" },
              { number: "100+", label: "Projects Completed" },
              { number: "4.9/5", label: "Average Rating" },
              { number: "3+", label: "Years Experience" }
            ].map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
