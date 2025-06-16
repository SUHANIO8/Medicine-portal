import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="py-16 px-4 sm:px-6 lg:px-8 bg-green-100 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-green-900 sm:text-6xl lg:text-7xl leading-tight">
              Empowering Health with the Right Medicine
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-green-800">
              Advanced solutions for medication safety, patient care, and digital tracking to improve health outcomes.
            </p>
            <div className="mt-10 flex justify-center md:justify-start gap-6">
              <Link
                to="/register"
                className="px-10 py-4 bg-green-700 text-white font-semibold rounded-lg shadow hover:bg-green-800 transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-10 py-4 border border-green-700 text-green-700 font-semibold rounded-lg hover:bg-green-200 transition"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="mt-10 md:mt-0 md:ml-12">
          </div>
        </div>
      </header>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">
            Our Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Medication Safety",
                description: "Reduce errors with proper medication management and verification.",
                icon: "💊"
              },
              {
                title: "Patient Care",
                description: "Enhance treatment outcomes with accurate prescriptions and monitoring.",
                icon: "❤️"
              },
              {
                title: "Digital Tracking",
                description: "QR-based system for easy medicine verification and tracking.",
                icon: "📱"
              }
            ].map((feature) => (
              <div key={feature.title} className="bg-green-50 p-8 rounded-xl shadow-lg text-center">
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-green-900 mb-2">{feature.title}</h3>
                <p className="text-green-800">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
