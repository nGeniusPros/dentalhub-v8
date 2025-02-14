// src/pages/Landing.tsx
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MessageSquare, 
  Smartphone, 
  Zap, 
  Star, 
  CheckCircle,
  Users,
  DollarSign,
  ShieldCheck
} from 'lucide-react';

export default function Landing() {
  const testimonials = [
    {
      name: "Dr. Sarah Wilson",
      practice: "Wilson Dentistry",
      text: "Recovered $8,000 in missed appointments within 30 days!",
      stars: 5
    },
    // Add more testimonials...
  ];

  const features = [
    {
      icon: <Calendar className="w-12 h-12 text-navy" />,
      title: "Automated Recall Campaigns",
      description: "Send personalized SMS/email reminders"
    },
    // Add more features...
  ];

  return (
    <div className="bg-gray-lighter">
      {/* Hero Section */}
      <section className="bg-gradient-ocean text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            AI-Powered Recall Management for Dental Practices
          </h1>
          <div className="flex justify-center gap-4 mb-12">
            <Link
              to="/signup"
              className="bg-green text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-light"
            >
              Start Free Trial
            </Link>
          </div>
          <div className="flex items-center justify-center gap-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-gold" fill="currentColor" />
            ))}
            <span className="text-lg">Trusted by 1,200+ Practices</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">
            Why Choose RecallGenius?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-lighter p-6 rounded-xl">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-darker">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-glow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-navy rounded-full" />
                  <div>
                    <h4 className="font-semibold text-navy">{testimonial.name}</h4>
                    <p className="text-gray-darker text-sm">{testimonial.practice}</p>
                  </div>
                </div>
                <p className="text-gray-darker mb-4">"{testimonial.text}"</p>
                <div className="flex gap-2">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold" fill="currentColor" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-corporate text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Practice?
          </h2>
          <Link
            to="/signup"
            className="inline-block bg-green text-white px-12 py-4 rounded-xl text-lg font-semibold hover:bg-green-light"
          >
            Start Free Trial
          </Link>
          <p className="mt-6 text-sm opacity-80">
            30-day money-back guarantee • HIPAA Compliant
          </p>
        </div>
      </section>
    </div>
  );
}