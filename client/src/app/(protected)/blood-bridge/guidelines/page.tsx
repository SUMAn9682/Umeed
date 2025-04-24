import { AlertTriangle, CheckCircle, Clock, Heart } from 'lucide-react';

const BloodDonationGuidelines = () => {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-rose-600 via-rose-500 to-amber-500 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <Heart size={48} className="animate-pulse" />
            <h1 className="text-4xl font-bold">Blood Donation Guidelines</h1>
          </div>
          <p className="mt-4 text-center text-xl">Your donation can save up to three lives!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Cannot Donate Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-rose-600 text-center">When You Cannot Donate Blood</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Temporary Conditions Card */}
            <div className="transform rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg 
                dark:bg-zinc-800 dark:border dark:border-amber-500/20">
              <div className="mb-4 flex items-center gap-2">
                <AlertTriangle className="text-amber-500 dark:text-amber-400" />
                <h3 className="text-xl font-semibold text-amber-500 dark:text-amber-400">
                  Temporary Conditions
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-amber-500 dark:text-amber-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Cold, flu, or fever in the last week</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-amber-500 dark:text-amber-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Recent surgery (within 6 months)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-amber-500 dark:text-amber-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Pregnancy or recent childbirth (within 6 weeks)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-amber-500 dark:text-amber-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Recent tattoo or piercing (within 4 months)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-amber-500 dark:text-amber-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Low hemoglobin levels</span>
                </li>
              </ul>
            </div>

            {/* Permanent Conditions Card */}
            <div className="transform rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg 
                dark:bg-zinc-800 dark:border dark:border-rose-500/20">
              <div className="mb-4 flex items-center gap-2">
                <AlertTriangle className="text-rose-500 dark:text-rose-400" />
                <h3 className="text-xl font-semibold text-rose-500 dark:text-rose-400">
                  Permanent Conditions
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-rose-500 dark:text-rose-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Chronic illnesses like HIV, Hepatitis B, or Hepatitis C</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-rose-500 dark:text-rose-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Heart conditions or severe hypertension</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-rose-500 dark:text-rose-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Cancer or history of blood disorders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-rose-500 dark:text-rose-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Use of certain medications</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* After Donation Care Section */}
        <section>
          <h2 className="mb-6 text-3xl font-bold text-teal-600 text-center">After Donation Care</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="transform rounded-lg bg-gradient-to-b from-white to-teal-50 p-6 shadow-md 
                transition-all hover:shadow-lg dark:from-zinc-800 dark:to-teal-900/20">
              <div className="mb-4 flex items-center gap-2">
                <Clock className="text-teal-500 dark:text-teal-400" />
                <h3 className="text-xl font-semibold text-teal-500 dark:text-teal-400">Immediate Care</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-teal-500 dark:text-teal-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Rest for 10-15 minutes after donation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-teal-500 dark:text-teal-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Drink plenty of fluids</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-teal-500 dark:text-teal-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Keep the bandage on for 4-5 hours</span>
                </li>
              </ul>
            </div>

            <div className="transform rounded-lg bg-gradient-to-b from-white to-violet-50 p-6 shadow-md 
                transition-all hover:shadow-lg dark:from-zinc-800 dark:to-violet-900/20">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle className="text-violet-500 dark:text-violet-400" />
                <h3 className="text-xl font-semibold text-violet-500 dark:text-violet-400">Next 24 Hours</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-violet-500 dark:text-violet-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Avoid heavy lifting and strenuous exercise</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-violet-500 dark:text-violet-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Eat iron-rich foods</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-violet-500 dark:text-violet-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Avoid alcohol consumption</span>
                </li>
              </ul>
            </div>

            <div className="transform rounded-lg bg-gradient-to-b from-white to-rose-50 p-6 shadow-md 
                transition-all hover:shadow-lg dark:from-zinc-800 dark:to-rose-900/20">
              <div className="mb-4 flex items-center gap-2">
                <Heart className="text-rose-500 dark:text-rose-400" />
                <h3 className="text-xl font-semibold text-rose-500 dark:text-rose-400">Long-term Care</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-rose-500 dark:text-rose-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Wait at least 56 days before next donation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-rose-500 dark:text-rose-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Maintain a healthy diet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-rose-500 dark:text-rose-400">•</span>
                  <span className="text-zinc-700 dark:text-zinc-300">Stay hydrated regularly</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BloodDonationGuidelines;