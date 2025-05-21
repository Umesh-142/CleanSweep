// import { Link } from "react-router-dom";
// import { Logo } from "../components/shared/Logo";
// import { Button } from "../components/shared/Button";
// import { Sparkles, CheckCircle2, Clock } from "lucide-react";

// export default function HomePage() {
//   return (
//     <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
//       <header className="container flex h-16 items-center justify-between py-4">
//         <Logo />
//         <div className="flex items-center gap-4">
//           <Link to="/login">
//             <Button
//               variant="ghost"
//               className="hover:scale-105 transition-transform duration-200 text-emerald-600"
//             >
//               Login
//             </Button>
//           </Link>
//           <Link to="/register">
//             <Button className="hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-emerald-500/30 bg-emerald-600 hover:bg-emerald-700">
//               Get Started
//             </Button>
//           </Link>
//         </div>
//       </header>
//       <main className="flex-1">
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-6">
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-700">
//                   Track. Tidy. Transform.
//                 </h1>
//                 <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
//                   Simplify your cleaning routine and transform your living space
//                   with{" "}
//                   <span className="font-semibold text-emerald-600">
//                     CleanSweep
//                   </span>
//                   .
//                 </p>
//               </div>
//               <div className="space-x-4">
//                 <Link to="/register">
//                   <Button
//                     size="lg"
//                     className="hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-emerald-500/30 bg-emerald-600 hover:bg-emerald-700"
//                   >
//                     Get Started
//                   </Button>
//                 </Link>
//                 <Link to="/login">
//                   <Button
//                     variant="outline"
//                     size="lg"
//                     className="hover:scale-105 transition-transform duration-200 text-emerald-600 border-emerald-600 hover:bg-emerald-50"
//                   >
//                     Login
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 lg:grid-cols-3 items-stretch">
//               <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1 hover:border-emerald-300">
//                 <div className="flex flex-col items-center text-center space-y-4">
//                   <div className="rounded-full bg-emerald-100 p-3">
//                     <Sparkles className="h-8 w-8 text-emerald-600" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800">
//                     Track Cleanliness
//                   </h3>
//                   <p className="text-gray-600">
//                     Monitor the cleanliness of every area in your home with our
//                     intuitive dashboard.
//                   </p>
//                 </div>
//               </div>
//               <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1 hover:border-emerald-300">
//                 <div className="flex flex-col items-center text-center space-y-4">
//                   <div className="rounded-full bg-emerald-100 p-3">
//                     <CheckCircle2 className="h-8 w-8 text-emerald-600" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800">
//                     Manage Tasks
//                   </h3>
//                   <p className="text-gray-600">
//                     Create, assign, and track cleaning tasks for every member of
//                     your household.
//                   </p>
//                 </div>
//               </div>
//               <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1 hover:border-emerald-300">
//                 <div className="flex flex-col items-center text-center space-y-4">
//                   <div className="rounded-full bg-emerald-100 p-3">
//                     <Clock className="h-8 w-8 text-emerald-600" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800">
//                     Schedule Cleaning
//                   </h3>
//                   <p className="text-gray-600">
//                     Set up recurring cleaning schedules and get reminders when
//                     it's time to clean.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-6 text-center">
//               <div className="space-y-4">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-700">
//                   Ready to transform your cleaning routine?
//                 </h2>
//                 <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
//                   Join thousands of households who have simplified their
//                   cleaning with{" "}
//                   <span className="font-semibold text-emerald-600">
//                     CleanSweep
//                   </span>
//                   .
//                 </p>
//               </div>
//               <div>
//                 <Link to="/register">
//                   <Button
//                     size="lg"
//                     className="hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-emerald-500/30 px-8 py-6 text-lg bg-emerald-600 hover:bg-emerald-700"
//                   >
//                     Start Your Free Trial
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <footer className="border-t border-gray-200 bg-white">
//         <div className="container flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between md:py-6">
//           <p className="text-center text-sm text-gray-500 md:text-left">
//             &copy; {new Date().getFullYear()} CleanSweep. All rights reserved.
//           </p>
//           <div className="flex gap-4 justify-center md:justify-end">
//             <a
//               href="#"
//               className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
//             >
//               Terms
//             </a>
//             <a
//               href="#"
//               className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
//             >
//               Privacy
//             </a>
//             <a
//               href="#"
//               className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
//             >
//               Contact
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

//claud

// import { Link } from "react-router-dom";
// import { Logo } from "../components/shared/Logo";
// import { Button } from "../components/shared/Button";
// import { Sparkles, CheckCircle2, Clock, ArrowRight } from "lucide-react";

// export default function HomePage() {
//   return (
//     <div className="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50 to-white">
//       {/* Enhanced Header with better centering */}
//       <header className="container mx-auto flex h-20 items-center justify-between px-4 py-4 relative z-10">
//         <Logo />
//         <div className="flex items-center gap-4">
//           <Link to="/login">
//             <Button
//               variant="ghost"
//               className="hover:scale-105 transition-transform duration-200 text-emerald-600 font-medium"
//             >
//               Login
//             </Button>
//           </Link>
//           <Link to="/register">
//             <Button className="hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-emerald-500/40 bg-emerald-600 hover:bg-emerald-700 font-medium">
//               Get Started
//             </Button>
//           </Link>
//         </div>
//       </header>

//       <main className="flex-1">
//         {/* Hero Section with background image */}
//         <section className="w-full py-16 md:py-28 lg:py-36 relative">
//           {/* Background image with overlay */}
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: "url('/api/placeholder/1920/1080')",
//               backgroundPosition: "center",
//               backgroundSize: "cover",
//               backgroundRepeat: "no-repeat",
//               opacity: 0.15,
//             }}
//             aria-hidden="true"
//           >
//             {/* This is where a real image would go */}
//           </div>

//           {/* Green gradient overlay */}
//           <div
//             className="absolute inset-0 bg-gradient-to-b from-white via-white to-emerald-50"
//             aria-hidden="true"
//           ></div>

//           <div className="container mx-auto px-4 md:px-6 relative z-10">
//             <div className="flex flex-col items-center justify-center space-y-8 text-center">
//               <div className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800 mb-2 shadow-sm">
//                 Welcome to CleanSweep
//               </div>
//               <div className="space-y-6 max-w-3xl mx-auto">
//                 <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
//                   Track. Tidy. Transform.
//                 </h1>
//                 <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl lg:text-2xl">
//                   Simplify your cleaning routine and transform your living space
//                   with{" "}
//                   <span className="font-semibold text-emerald-600">
//                     CleanSweep
//                   </span>
//                   .
//                 </p>
//               </div>
//               <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
//                 <Link to="/register">
//                   <Button
//                     size="lg"
//                     className="hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-emerald-500/30 bg-emerald-600 hover:bg-emerald-700 px-8 py-6 text-lg font-medium w-full sm:w-auto"
//                   >
//                     Get Started <ArrowRight className="ml-2 h-5 w-5" />
//                   </Button>
//                 </Link>
//                 <Link to="/login">
//                   <Button
//                     variant="outline"
//                     size="lg"
//                     className="hover:scale-105 transition-transform duration-200 text-emerald-600 border-emerald-600 hover:bg-emerald-50 px-8 py-6 text-lg font-medium w-full sm:w-auto"
//                   >
//                     Login
//                   </Button>
//                 </Link>
//               </div>

//               {/* New stylish wave divider */}
//               <div className="w-full h-16 md:h-24 lg:h-32 overflow-hidden relative z-10">
//                 <svg
//                   viewBox="0 0 1200 120"
//                   preserveAspectRatio="none"
//                   className="w-full h-full"
//                 >
//                   <path
//                     d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C58.44,0,104.66,15.38,158.6,35.75c53.92,20.35,113.28,51.35,162.79,56.69Z"
//                     className="fill-white"
//                   ></path>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Features Section with improved cards and background */}
//         <section className="w-full py-16 md:py-24 lg:py-32 bg-white relative">
//           {/* Subtle leafy pattern background */}
//           <div
//             className="absolute inset-0 bg-repeat opacity-5"
//             style={{
//               backgroundImage: "url('/api/placeholder/200/200')",
//               backgroundSize: "200px",
//             }}
//             aria-hidden="true"
//           >
//             {/* This is where a subtle leafy or clean pattern would go */}
//           </div>

//           <div className="container mx-auto px-4 md:px-6 relative z-10">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
//                 Powerful <span className="text-emerald-600">Features</span>
//               </h2>
//               <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
//                 Everything you need to maintain a clean and organized home
//               </p>
//             </div>

//             <div className="grid gap-8 md:grid-cols-3 items-stretch max-w-5xl mx-auto">
//               <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300">
//                 <div className="flex flex-col items-center text-center space-y-4">
//                   <div className="rounded-full bg-emerald-100 p-4">
//                     <Sparkles className="h-10 w-10 text-emerald-600" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800">
//                     Track Cleanliness
//                   </h3>
//                   <p className="text-gray-600">
//                     Monitor the cleanliness of every area in your home with our
//                     intuitive dashboard.
//                   </p>
//                 </div>
//               </div>

//               <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300">
//                 <div className="flex flex-col items-center text-center space-y-4">
//                   <div className="rounded-full bg-emerald-100 p-4">
//                     <CheckCircle2 className="h-10 w-10 text-emerald-600" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800">
//                     Manage Tasks
//                   </h3>
//                   <p className="text-gray-600">
//                     Create, assign, and track cleaning tasks for every member of
//                     your household.
//                   </p>
//                 </div>
//               </div>

//               <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300">
//                 <div className="flex flex-col items-center text-center space-y-4">
//                   <div className="rounded-full bg-emerald-100 p-4">
//                     <Clock className="h-10 w-10 text-emerald-600" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800">
//                     Schedule Cleaning
//                   </h3>
//                   <p className="text-gray-600">
//                     Set up recurring cleaning schedules and get reminders when
//                     it's time to clean.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Call to action with background image */}
//         <section className="w-full py-16 md:py-28 lg:py-36 relative">
//           {/* Background image with overlay */}
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: "url('/api/placeholder/1920/1080')",
//               backgroundPosition: "bottom",
//               backgroundSize: "cover",
//               backgroundRepeat: "no-repeat",
//             }}
//             aria-hidden="true"
//           >
//             {/* This is where a clean living room or green environment image would go */}
//           </div>

//           {/* Gradient overlay */}
//           <div
//             className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-700/80"
//             aria-hidden="true"
//           ></div>

//           <div className="container mx-auto px-4 md:px-6 relative z-10">
//             <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-4xl mx-auto">
//               <div className="space-y-4">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
//                   Ready to transform your cleaning routine?
//                 </h2>
//                 <p className="mx-auto max-w-[800px] text-emerald-50 md:text-xl">
//                   Join thousands of households who have simplified their
//                   cleaning with{" "}
//                   <span className="font-semibold text-white">CleanSweep</span>.
//                 </p>
//               </div>

//               {/* Testimonial */}
//               <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 max-w-xl mx-auto my-8">
//                 <p className="italic text-gray-700">
//                   "CleanSweep has completely changed how our family manages
//                   household chores. Everything is organized and we never forget
//                   to clean anymore!"
//                 </p>
//                 <p className="mt-4 font-medium text-emerald-600">
//                   — Sarah J., Happy Customer
//                 </p>
//               </div>

//               <div className="mt-4">
//                 <Link to="/register">
//                   <Button
//                     size="lg"
//                     className="hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-emerald-300/40 px-8 py-6 text-lg font-medium bg-white text-emerald-700 hover:bg-emerald-50"
//                   >
//                     Start Your Free Trial{" "}
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer with eco-friendly design elements */}
//       <footer className="border-t border-gray-200 bg-white relative overflow-hidden">
//         {/* Subtle leaf pattern background */}
//         <div
//           className="absolute inset-0 bg-repeat opacity-5"
//           style={{
//             backgroundImage: "url('/api/placeholder/100/100')",
//             backgroundSize: "100px",
//           }}
//           aria-hidden="true"
//         >
//           {/* This is where a subtle leaf pattern would go */}
//         </div>

//         {/* Green accent at the bottom */}
//         <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300"></div>

//         <div className="container mx-auto flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between relative z-10">
//           <div className="text-center md:text-left">
//             <Logo />
//             <p className="mt-2 text-sm text-gray-500">
//               &copy; {new Date().getFullYear()} CleanSweep. All rights reserved.
//             </p>
//             <p className="text-xs text-emerald-600 mt-1">
//               Eco-friendly cleaning solutions for a greener planet
//             </p>
//           </div>
//           <div className="flex flex-col items-center md:items-end">
//             <div className="flex gap-6 justify-center md:justify-end mb-4">
//               <a
//                 href="#"
//                 className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
//               >
//                 Terms
//               </a>
//               <a
//                 href="#"
//                 className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
//               >
//                 Privacy
//               </a>
//               <a
//                 href="#"
//                 className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
//               >
//                 Contact
//               </a>
//             </div>
//             <div className="inline-flex items-center text-emerald-700 text-xs">
//               <svg
//                 className="w-4 h-4 mr-1"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M21 9L13.5 3.5L6 9L12 15.5L21 9Z"
//                   fill="#059669"
//                   fillOpacity="0.2"
//                   stroke="#059669"
//                   strokeWidth="2"
//                 />
//                 <path
//                   d="M3 9V19H21V9"
//                   stroke="#059669"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 />
//                 <path d="M9 14V19H15V14" stroke="#059669" strokeWidth="2" />
//               </svg>
//               CleanSweep uses 100% eco-friendly solutions
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { Logo } from "../components/shared/Logo";
import { Button } from "../components/shared/Button";
import { Sparkles, CheckCircle2, Clock, ArrowRight, Leaf } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50 to-white relative">
      {/* Global eco-friendly background element - positioned to appear at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-0 opacity-100 flex justify-center"
        aria-hidden="true"
      >
        <div
          className="w-full max-w-6xl mx-auto h-96 bg-contain bg-bottom bg-no-repeat"
          style={{
            backgroundImage: "url('../../../Pictures/csbg.jpg')",
            backgroundSize: "contain",
            backgroundPosition: "bottom center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(1.2) contrast(1.2) saturate(1.5)", // ✨ make it brighter, sharper, richer
            backdropFilter: "blur(2px)",
          }}
        ></div>
      </div>

      {/* Enhanced Header with better centering */}
      <header className="w-full h-20 flex items-center justify-between px-8 relative z-10">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button
              variant="ghost"
              className="hover:scale-105 transition-transform duration-200 text-emerald-600 font-medium"
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-emerald-500/40 bg-emerald-600 hover:bg-emerald-700 font-medium">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with background image */}
        <section className="w-full py-16 md:py-28 lg:py-36 relative">
          {/* Background image with overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('../../../Pictures/sbg2.jpg')", //MAin one
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              opacity: 3,
            }}
            aria-hidden="true"
          >
            {/* This is where a real image would go */}
          </div>

          {/* Green gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-white via-white to-transparent"
            aria-hidden="true"
          ></div>

          {/* Add the eco-friendly globe image as a decorative element */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 right-0 w-1/3 h-full opacity-20 hidden lg:block"
            style={{
              backgroundImage: "url('/api/placeholder/1200/400')",
              backgroundSize: "contain",
              backgroundPosition: "center right",
              backgroundRepeat: "no-repeat",
              // This is where your green globe earth image would go on larger screens
            }}
            aria-hidden="true"
          ></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800 mb-2 shadow-sm">
                <Leaf className="w-4 h-4 mr-2" /> Welcome to CleanSweep
              </div>
              <div className="space-y-6 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
                  Track. Tidy. Transform.
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl lg:text-2xl">
                  Simplify your cleaning routine and transform your living space
                  with{" "}
                  <span className="font-semibold text-emerald-600">
                    CleanSweep
                  </span>
                  .
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-emerald-500/30 bg-emerald-600 hover:bg-emerald-700 px-8 py-6 text-lg font-medium w-full sm:w-auto"
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="hover:scale-105 transition-transform duration-200 text-emerald-600 border-emerald-600 hover:bg-emerald-50 px-8 py-6 text-lg font-medium w-full sm:w-auto"
                  >
                    Login
                  </Button>
                </Link>
              </div>

              {/* New stylish wave divider */}
              <div className="w-full h-16 md:h-24 lg:h-32 overflow-hidden relative z-10">
                <svg
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                ></svg>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with improved cards and background */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-white relative">
          {/* Subtle leafy pattern background */}
          <div
            className="absolute inset-0 bg-repeat opacity-5"
            style={{
              backgroundImage: "url('/api/placeholder/1200/400')",
              backgroundSize: "200px",
            }}
            aria-hidden="true"
          >
            {/* This is where a subtle leafy or clean pattern would go */}
          </div>

          {/* Add the eco-friendly globe image as a decorative element */}
          <div
            className="absolute -left-32 top-1/2 transform -translate-y-1/2 w-64 h-64 opacity-10 hidden xl:block"
            style={{
              backgroundImage: "url('/api/placeholder/1200/400')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              // This is where your green globe earth image would go
            }}
            aria-hidden="true"
          ></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Powerful <span className="text-emerald-600">Features</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to maintain a clean and organized home
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 items-stretch max-w-5xl mx-auto">
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-emerald-100 p-4">
                    <Sparkles className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Track Cleanliness
                  </h3>
                  <p className="text-gray-600">
                    Monitor the cleanliness of public areas across the city
                    using a real-time complaint tracking dashboard with
                    geolocation-based insights
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-emerald-100 p-4">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Manage Complaints
                  </h3>
                  <p className="text-gray-600">
                    Easily submit, categorize, and track sanitation-related
                    complaints. Admins can assign and resolve issues while
                    updating statuses for transparency.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-emerald-100 p-4">
                    <Clock className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Schedule Cleanup Operations
                  </h3>
                  <p className="text-gray-600">
                    Plan and manage recurring cleanup activities based on
                    complaint patterns and location severity. Receive alerts and
                    prioritize zones requiring immediate attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action with background image */}
        <section className="w-full py-16 md:py-28 lg:py-36 relative">
          {/* Background image with overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('../../../Pictures/csbg.jpg')",
              backgroundPosition: "bottom",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            aria-hidden="true"
          >
            {/* This is where a clean living room or green environment image would go */}
          </div>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-700/80"
            aria-hidden="true"
          ></div>

          {/* Add the eco-friendly globe image as a decorative element */}
          <div
            className="absolute left-0 bottom-0 w-full h-40 md:h-64 opacity-20"
            style={{
              backgroundImage: "url('/api/placeholder/1200/400')",
              backgroundSize: "contain",
              backgroundPosition: "bottom center",
              backgroundRepeat: "no-repeat",
              // This is where your green globe earth image would go as silhouette
            }}
            aria-hidden="true"
          ></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-4xl mx-auto">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to transform your cleaning routine?
                </h2>
                <p className="mx-auto max-w-[800px] text-emerald-50 md:text-xl">
                  Join thousands of households who have simplified their
                  cleaning with{" "}
                  <span className="font-semibold text-white">CleanSweep</span>.
                </p>
              </div>

              {/* Testimonial */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 max-w-xl mx-auto my-8">
                <p className="italic text-gray-700">
                  "CleanSweep has completely changed how our family manages
                  household chores. Everything is organized and we never forget
                  to clean anymore!"
                </p>
                <p className="mt-4 font-medium text-emerald-600">
                  — Umesh Panchal, Happy Customer
                </p>
              </div>

              <div className="mt-4">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-emerald-300/40 px-8 py-6 text-lg font-medium bg-white text-emerald-700 hover:bg-emerald-50 group"
                  >
                    Start your journey{" "}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with eco-friendly design elements */}
      <footer className="border-t border-gray-200 bg-white relative overflow-hidden">
        {/* Subtle leaf pattern background */}
        <div
          className="absolute inset-0 bg-repeat opacity-5"
          style={{
            backgroundImage: "url('/api/placeholder/100/100')",
            backgroundSize: "100px",
          }}
          aria-hidden="true"
        >
          {/* This is where a subtle leaf pattern would go */}
        </div>

        {/* Green accent at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300"></div>

        <div className="container mx-auto flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between relative z-10">
          <div className="text-center md:text-left">
            <Logo />
            <p className="mt-2 text-sm text-gray-500">
              &copy; {new Date().getFullYear()} CleanSweep. All rights reserved.
            </p>
            <p className="text-xs text-emerald-600 mt-1">
              Eco-friendly cleaning solutions for a greener planet
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-6 justify-center md:justify-end mb-4">
              <a
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
              >
                Contact
              </a>
            </div>
            <div className="inline-flex items-center text-emerald-700 text-xs">
              <svg
                className="w-4 h-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 9L13.5 3.5L6 9L12 15.5L21 9Z"
                  fill="#059669"
                  fillOpacity="0.2"
                  stroke="#059669"
                  strokeWidth="2"
                />
                <path
                  d="M3 9V19H21V9"
                  stroke="#059669"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path d="M9 14V19H15V14" stroke="#059669" strokeWidth="2" />
              </svg>
              CleanSweep uses 100% eco-friendly solutions
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
