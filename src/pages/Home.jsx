import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { criteriaData } from "../data/criteriaData";
import CategoryList from "../components/CategoryList";
import { 
  CheckCircle, 
  Users, 
  FileText, 
  Clock, 
  Shield, 
  Download,
  Star,
  ArrowRight,
  Play
} from "lucide-react";

export default function Home() {
  const [selected, setSelected] = useState({});
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const totalSelected = Object.values(selected).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const handleNext = () => {
    localStorage.setItem("selectedcat", JSON.stringify(selected));
    navigate("/arrange");
  };

  const handleGetStarted = () => {
    if (user) {
      setShowCategories(true);
    } else {
      navigate("/login");
    }
  };

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Automated Generation",
      description: "Generate professional tender documents automatically with our smart category system."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Collaborative Platform",
      description: "Work together with your team to create comprehensive tender specifications."
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Time Saving",
      description: "Reduce tender preparation time from days to minutes with our streamlined process."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Compliance Ready",
      description: "Ensure all your tenders meet industry standards and regulatory requirements."
    },
    {
      icon: <Download className="w-8 h-8 text-blue-600" />,
      title: "Instant PDF Export",
      description: "Export your completed tenders as professional PDF documents instantly."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      title: "Quality Assurance",
      description: "Built-in quality checks ensure all criteria are properly documented."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Tenders Generated" },
    { number: "500+", label: "Happy Clients" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Procurement Manager",
      company: "TechCorp Solutions",
      content: "This platform has revolutionized our tender preparation process. What used to take us weeks now takes hours.",
      rating: 5
    },
    {
      name: "Michael Chen",
      position: "Operations Director",
      company: "Global Industries",
      content: "The automated categorization and professional output have significantly improved our bid success rate.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      position: "Business Development",
      company: "Innovation Ltd",
      content: "User-friendly interface and comprehensive criteria coverage. Highly recommend for any business.",
      rating: 5
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Select Categories",
      description: "Choose from comprehensive tender categories including technical, financial, and compliance criteria."
    },
    {
      step: "2",
      title: "Customize & Arrange",
      description: "Drag and drop to arrange your selected criteria in the perfect order for your tender."
    },
    {
      step: "3",
      title: "Generate PDF",
      description: "Export your professional tender document with detailed descriptions and formatting."
    }
  ];

  if (showCategories) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Category Selection Section */}
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Select Your Tender Categories
              </h1>
              <p className="text-lg text-gray-600">
                Choose the categories that best fit your tender requirements
              </p>
            </div>
            
            <CategoryList
              data={criteriaData}
              selected={selected}
              setSelected={setSelected}
            />
            
            <div className="flex justify-center gap-4 mt-8">
              <button
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                onClick={() => setShowCategories(false)}
              >
                ← Back to Home
              </button>
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                onClick={handleNext}
                disabled={totalSelected === 0}
              >
                Continue to Arrange
                <ArrowRight className="w-4 h-4" />
                ({totalSelected})
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Automate Your Tender Generation Process
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Create professional, compliant tender documents in minutes with our intelligent platform. 
                Streamline your procurement process and win more bids.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleGetStarted}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  Get Started Now
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1652105425180-3cc628d303cf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWNobm9sb2d5fGVufDB8fHxibHVlfDE3NTI1MTg3OTN8MA&ixlib=rb-4.1.0&q=85"
                alt="Professional working on tender generation"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive tender generation platform provides everything you need to create professional, 
              compliant tender documents quickly and efficiently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our streamlined process makes tender generation simple and efficient
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their tender process
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.position}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Tender Process?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of professionals who trust our platform for their tender generation needs
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            Start Generating Tenders
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
