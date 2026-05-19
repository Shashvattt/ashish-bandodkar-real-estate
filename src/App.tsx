/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Star, 
  Award, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Compass, 
  ShieldCheck, 
  ArrowUpRight, 
  Menu, 
  X, 
  Calendar, 
  Clock,
  Home, 
  Briefcase, 
  Sparkles,
  Calculator,
  UserCheck,
  Building,
  Wrench,
  ThumbsUp
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

// Interfaces
interface Review {
  id: number;
  author: string;
  timeAgo: string;
  rating: number;
  text: string;
  relationship: string;
  highlightText: string;
}

export default function App() {
  // Mobile Nav State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // General Inquiry Form State
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Residential Purchase',
    budgetRange: '₹1.5 Cr - ₹3.0 Cr',
    specificNeeds: '',
    timeframe: 'Immediate'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Mortgage & Yield Lead Tool State
  const [propertyValue, setPropertyValue] = useState(25000000); // 2.5 Cr default
  const [interestRate, setInterestRate] = useState(8.4); // typical luxury loan rate in India
  const [tenureYears, setTenureYears] = useState(15);
  const [rentalYieldPercent, setRentalYieldPercent] = useState(3.2); // Typical high-end yield in Mumbai

  // Active Testimonial Tab
  const [activeReviewTab, setActiveReviewTab] = useState(0);

  // Photo Carousel in Hero State
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0);

  const formSectionRef = useRef<HTMLDivElement>(null);

  const heroPhotos = [
    {
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1400",
      caption: "Penthouse Drawing Room | Minimalist elegance & bespoke accents"
    },
    {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1400",
      caption: "Private Lounge Study | Curated environments for strategic thinkers"
    },
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1400",
      caption: "Sunset Terrace | Harmonizing natural teak, marble, and Mumbai skies"
    }
  ];

  // Auto transition hero pictures
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroPhotoIndex((prev) => (prev + 1) % heroPhotos.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // Reviews Data
  const reviews: Review[] = [
    {
      id: 1,
      author: "Nazil IK",
      timeAgo: "2 months ago",
      rating: 5,
      text: "I had a great experience associating with Ashish Bandodkar. He was incredibly kind, approachable, and always ready to help. Finding a place can be stressful, but he made it so much easier with his guidance and constant support. He really went the extra mile to ensure I was comfortable with my decision. Highly recommend him if you're looking for someone trustworthy and genuinely helpful!",
      relationship: "Residential Client",
      highlightText: "Trustworthy & Genuinely Helpful"
    },
    {
      id: 2,
      author: "Abhijit Tawde",
      timeAgo: "3 months ago",
      rating: 5,
      text: "Ashish is very cooperative in whole deal . We no need run for any activity in our deal . Also after deal for repairing property and going on rental he help us beyond our expections. Now he became brocker to to our best friend. I highly recommend to anyone . Thanks.",
      relationship: "Owner & Investor",
      highlightText: "Helper Beyond Our Expectations"
    },
    {
      id: 3,
      author: "SAGNIK BISWAS",
      timeAgo: "11 months ago",
      rating: 5,
      text: "I had an amazing experience working with Ashish Bandodkar he helped me find the perfect place that matched all my needs and the best part is, it was well within my budget. His deep knowledge of the market, honesty, and dedication really stood out. Highly recommend to anyone looking for a reliable and efficient real estate broker. Truly grateful for your help!",
      relationship: "First-Time Apartment Buyer",
      highlightText: "Deep Knowledge & Within Budget"
    }
  ];

  // Mortgage & Yield Calculations
  const calculateEMI = () => {
    const P = propertyValue * 0.8; // 80% LTV as standard
    const r = (interestRate / 12) / 100;
    const n = tenureYears * 12;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const calculateYield = () => {
    const annualRent = propertyValue * (rentalYieldPercent / 100);
    const monthlyRent = Math.round(annualRent / 12);
    // Compounded growth locally is approx 8.2% on average over decade in premium Andheri micro-locations
    const tenYearValue = Math.round(propertyValue * Math.pow(1 + 0.082, 10));
    return {
      monthlyRent,
      tenYearValue
    };
  };

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(1)} Lakhs`;
  };

  const handleInquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInquiryForm(prev => ({ ...prev, [name]: value }));
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct WhatsApp Message
    const phoneNumber = "917039447088";
    const text = `*New Confidential Inquiry*\n\n*Name:* ${inquiryForm.name}\n*Phone:* ${inquiryForm.phone}\n*Email:* ${inquiryForm.email || 'N/A'}\n\n*Service Type:* ${inquiryForm.serviceType}\n*Budget Range:* ${inquiryForm.budgetRange}\n*Timeframe:* ${inquiryForm.timeframe}\n\n*Specific Needs:*\n${inquiryForm.specificNeeds || 'N/A'}`;
    
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.open(whatsappUrl, '_blank');
    }, 800);
  };
  return (
    <div className="bg-luxury-cream text-luxury-charcoal selection:bg-luxury-bronze selection:text-white min-h-screen relative font-sans antialiased overflow-x-hidden">
      
      {/* BACKGROUND TEXTURE - SUBTLE GRAIN & GRADIENTS */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A88012_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0"></div>

      {/* HEADER SECTION */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-luxury-cream/85 border-b border-luxury-charcoal/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex flex-col tracking-tight" id="header_home_link">
            <span className="font-serif text-lg md:text-2xl font-semibold tracking-[0.14em] uppercase text-luxury-charcoal">
              Bandodkar <span className="text-luxury-bronze font-light">&amp;</span> Co.
            </span>
            <span className="text-[9px] font-sans uppercase tracking-[0.4em] text-luxury-olive font-medium mt-0.5 pl-0.5">
              Private Realty Advisory
            </span>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10">
            <a href="#services" className="text-xs uppercase tracking-widest font-medium text-luxury-charcoal/85 hover:text-luxury-bronze transition-colors">Services</a>
            <a href="#about-principal" className="text-xs uppercase tracking-widest font-medium text-luxury-charcoal/85 hover:text-luxury-bronze transition-colors">The Principal</a>
            <a href="#calculator" className="text-xs uppercase tracking-widest font-medium text-luxury-charcoal/85 hover:text-luxury-bronze transition-colors">Yield Intelligence</a>
            <a href="#reviews" className="text-xs uppercase tracking-widest font-medium text-luxury-charcoal/85 hover:text-luxury-bronze transition-colors">Client Journals</a>
            <a href="#contact" className="text-xs uppercase tracking-widest font-medium text-luxury-charcoal/85 hover:text-luxury-bronze transition-colors">Inquire</a>
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a 
              href="tel:07039447088" 
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-luxury-olive hover:text-luxury-bronze transition-colors"
              id="cta_header_phone"
            >
              <Phone size={14} className="text-luxury-bronze" />
              <span>070394 47088</span>
            </a>
            <button 
              onClick={() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-2.5 border border-luxury-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-luxury-charcoal hover:text-luxury-cream transition-all duration-300 rounded-sm"
              id="cta_header_book"
            >
              Private Appointment
            </button>
          </div>

          {/* MOBILE NAV BUTTON */}
          <button 
            className="md:hidden text-luxury-charcoal"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            id="mobile_menu_trigger"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-luxury-charcoal/5 bg-luxury-cream overflow-hidden absolute w-full left-0 shadow-lg"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                <a 
                  href="#services" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest font-semibold text-luxury-charcoal hover:text-luxury-bronze"
                >
                  Services
                </a>
                <a 
                  href="#about-principal" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest font-semibold text-luxury-charcoal hover:text-luxury-bronze"
                >
                  The Principal
                </a>
                <a 
                  href="#calculator" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest font-semibold text-luxury-charcoal hover:text-luxury-bronze"
                >
                  Yield Intelligence
                </a>
                <a 
                  href="#reviews" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest font-semibold text-luxury-charcoal hover:text-luxury-bronze"
                >
                  Client Journals
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest font-semibold text-luxury-charcoal hover:text-luxury-bronze"
                >
                  Inquire
                </a>

                <div className="h-[1px] bg-luxury-charcoal/10 my-2"></div>

                <div className="flex flex-col gap-4">
                  <a 
                    href="tel:07039447088" 
                    className="flex items-center gap-3 text-sm font-semibold text-luxury-olive"
                    id="mobile_menu_call"
                  >
                    <Phone size={16} className="text-luxury-bronze" />
                    <span>070394 47088</span>
                  </a>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3 bg-luxury-charcoal text-luxury-cream text-xs uppercase tracking-widest font-semibold text-center rounded-sm"
                    id="mobile_menu_cta"
                  >
                    Schedule Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION - BREATHTAKING EDITORIAL MAGAZINE LAYOUT */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-12 md:py-20 px-6 max-w-7xl mx-auto z-10" id="hero">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Intensely Polish Typography & Subheads */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left max-w-2xl lg:max-w-none">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="h-[1px] w-8 bg-luxury-bronze"></div>
              <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.35em] text-luxury-bronze font-semibold">
                Sophisticated Mumbai Brokerage
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-luxury-charcoal leading-[1.1] tracking-tight mb-8"
              id="hero_headline"
            >
              Curated Living. <br />
              <span className="italic font-normal font-serif text-luxury-bronze">Defined Legacy.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-base text-luxury-charcoal/80 leading-relaxed font-light mb-10 max-w-xl pr-4"
              id="hero_subheadline"
            >
              Led by veteran specialist <strong className="font-semibold text-luxury-charcoal">Ashish Bandodkar</strong>, we provide discreet, fully-managed real estate advisory in Poonam Nagar, Andheri East, and Mumbai’s finest quarters. We translate chaotic transactional work into a curated, stress-free path to premium ownership and investment.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button 
                onClick={() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-luxury-charcoal text-luxury-cream hover:bg-luxury-bronze transition-all duration-300 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-3 shadow-lg shadow-luxury-charcoal/5 rounded-sm"
                id="hero_cta_book"
              >
                <span>Book Private Consultation</span>
                <ChevronRight size={14} />
              </button>
              
              <a 
                href="tel:07039447088"
                className="px-8 py-4 border border-luxury-charcoal/20 hover:border-luxury-charcoal bg-white/20 hover:bg-white/50 backdrop-blur-sm transition-all duration-300 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-3 text-luxury-charcoal rounded-sm"
                id="hero_cta_call"
              >
                <Phone size={14} className="text-luxury-bronze" />
                <span>Call +91 70394 47088</span>
              </a>
            </motion.div>

            {/* Micro Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 pt-8 border-t border-luxury-charcoal/10 grid grid-cols-3 gap-6 max-w-md"
            >
              <div>
                <div className="font-serif text-xl md:text-2xl text-luxury-bronze font-medium">5.0 ★</div>
                <div className="text-[10px] uppercase tracking-widest text-[#7C7466] font-medium mt-1">Google Rating</div>
              </div>
              <div>
                <div className="font-serif text-xl md:text-2xl text-luxury-bronze font-medium">100%</div>
                <div className="text-[10px] uppercase tracking-widest text-[#7C7466] font-medium mt-1">Managed Remodels</div>
              </div>
              <div>
                <div className="font-serif text-xl md:text-2xl text-luxury-bronze font-medium">₹450Cr+</div>
                <div className="text-[10px] uppercase tracking-widest text-[#7C7466] font-medium mt-1">Acquisitions Guided</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Editorial Cover Art Card with Slideover overlay */}
          <div className="lg:col-span-5 relative h-[450px] md:h-[550px] w-full flex items-center justify-center lg:pl-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-luxury-charcoal/10"
            >
              {/* Pictures with crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroPhotoIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${heroPhotos[heroPhotoIndex].url})` }}
                />
              </AnimatePresence>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 via-transparent to-transparent"></div>

              {/* Floating aesthetic quote card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-lg text-white">
                <span className="text-[9px] uppercase tracking-[0.2em] text-luxury-sand font-semibold block mb-1">
                  Featured Space
                </span>
                <p className="font-serif text-sm italic font-light tracking-wide">
                  "{heroPhotos[heroPhotoIndex].caption}"
                </p>
              </div>

              {/* Subtle navigation bullets */}
              <div className="absolute top-6 right-6 flex gap-2">
                {heroPhotos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroPhotoIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === heroPhotoIndex ? 'bg-white w-5' : 'bg-white/40'}`}
                    aria-label={`Show slide ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Decorative Floating Luxury Tag */}
            <div className="absolute -bottom-4 -left-4 bg-luxury-sand border border-luxury-bronze/20 px-6 py-4 rounded-lg shadow-lg hidden md:flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-luxury-olive/10 text-luxury-olive">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="text-xs font-serif font-bold tracking-wide">Privately Vetted</div>
                <div className="text-[10px] text-luxury-charcoal/60">Zero Public Solicitation</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TRUST TICKER SECTION */}
      <section className="bg-luxury-charcoal py-8 overflow-hidden border-y border-white/5 relative z-10 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 text-center md:text-left">
            <span className="text-xs tracking-[0.2em] uppercase text-luxury-sand/60 font-medium">As Highlighted on Maps &amp; Community Circles:</span>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
              <div className="flex items-center gap-2">
                <Star size={14} className="fill-luxury-bronze text-luxury-bronze animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-[#E9E4DC]">Andheri Luxury Leader</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={14} className="text-luxury-bronze" />
                <span className="text-xs uppercase tracking-widest text-[#E9E4DC]">End-to-End Quiet Luxury</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck size={14} className="text-luxury-bronze" />
                <span className="text-xs uppercase tracking-widest text-[#E9E4DC]">Personal Remodelling Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES - BENTO CLASSIFIED GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10" id="services">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-luxury-bronze font-semibold mb-3 block">
            The Selection Criteria
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-luxury-charcoal leading-tight">
            Comprehensive Property Architecture
          </h2>
          <p className="text-sm md:text-base text-luxury-charcoal/70 font-light mt-4 max-w-xl mx-auto">
            Our expertise bypasses standard transactional brokerage. We manage legal safety, design curation, remodeling, and investment yield parameters under one principal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Service Card 1 */}
          <div className="bg-white border border-luxury-charcoal/5 p-8 md:p-10 rounded-2xl flex flex-col justify-between hover:border-luxury-bronze/30 hover:shadow-xl hover:shadow-luxury-charcoal/5 transition-all duration-300 relative group">
            <div className="absolute top-6 right-6 text-luxury-sand group-hover:text-luxury-bronze/20 font-serif text-5xl font-light tracking-widest transition-colors">
              01
            </div>
            <div>
              <div className="w-12 h-12 rounded-lg bg-luxury-cream flex items-center justify-center text-luxury-bronze mb-8">
                <Home size={22} />
              </div>
              <h3 className="font-serif text-xl font-normal text-luxury-charcoal mb-4">
                Bespoke Residential Buying &amp; Sales
              </h3>
              <p className="text-xs md:text-sm text-luxury-charcoal/70 leading-relaxed font-light mb-8">
                Acquisite curated private residential apartments and premium penthouses in Poonam Nagar and Andheri's peaceful pockets. Complete legal vetting, property assessment, and stress-free title curation.
              </p>
            </div>
            <div className="pt-4 border-t border-luxury-charcoal/5 flex justify-between items-center">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-luxury-bronze group-hover:text-luxury-charcoal transition-colors">Private Treaty Portfolio</span>
              <ArrowUpRight size={14} className="text-luxury-bronze group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white border border-luxury-charcoal/5 p-8 md:p-10 rounded-2xl flex flex-col justify-between hover:border-luxury-bronze/30 hover:shadow-xl hover:shadow-luxury-charcoal/5 transition-all duration-300 relative group">
            <div className="absolute top-6 right-6 text-luxury-sand group-hover:text-luxury-bronze/20 font-serif text-5xl font-light tracking-widest transition-colors">
              02
            </div>
            <div>
              <div className="w-12 h-12 rounded-lg bg-luxury-cream flex items-center justify-center text-luxury-bronze mb-8">
                <Compass size={22} />
              </div>
              <h3 className="font-serif text-xl font-normal text-luxury-charcoal mb-4">
                Strategic Investment &amp; High-Yield
              </h3>
              <p className="text-xs md:text-sm text-luxury-charcoal/70 leading-relaxed font-light mb-8">
                Maximize post-tax asset returns. Ashish assists premium clients in locating undervalued assets, negotiate off-market acquisitions, and engineer premium rental yields with verified tenants.
              </p>
            </div>
            <div className="pt-4 border-t border-luxury-charcoal/5 flex justify-between items-center">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-luxury-bronze group-hover:text-luxury-charcoal transition-colors">Yield Analysis Report</span>
              <ArrowUpRight size={14} className="text-luxury-bronze group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="bg-white border border-luxury-charcoal/5 p-8 md:p-10 rounded-2xl flex flex-col justify-between hover:border-luxury-bronze/30 hover:shadow-xl hover:shadow-luxury-charcoal/5 transition-all duration-300 relative group">
            <div className="absolute top-6 right-6 text-luxury-sand group-hover:text-luxury-bronze/20 font-serif text-5xl font-light tracking-widest transition-colors">
              03
            </div>
            <div>
              <div className="w-12 h-12 rounded-lg bg-luxury-cream flex items-center justify-center text-luxury-bronze mb-8">
                <Wrench size={22} />
              </div>
              <h3 className="font-serif text-xl font-normal text-luxury-charcoal mb-4">
                Post-Transaction Curation &amp; Remodels
              </h3>
              <p className="text-xs md:text-sm text-luxury-charcoal/70 leading-relaxed font-light mb-8">
                True quiet luxury is support that extends past the exchange. As client testimonials affirm, we manage contractor vetting, custom woodworks, plumbing, paint setups, and prepare properties for ready occupancy or rentals.
              </p>
            </div>
            <div className="pt-4 border-t border-luxury-charcoal/5 flex justify-between items-center">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-luxury-bronze group-hover:text-luxury-charcoal transition-colors">Before &amp; After Catalog</span>
              <ArrowUpRight size={14} className="text-luxury-bronze group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Service Card 4 */}
          <div className="bg-white border border-luxury-charcoal/5 p-8 md:p-10 rounded-2xl flex flex-col justify-between hover:border-luxury-bronze/30 hover:shadow-xl hover:shadow-luxury-charcoal/5 transition-all duration-300 relative group md:col-span-2 lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 mb-4 bg-luxury-olive/10 text-luxury-olive px-3 py-1 rounded text-[10px] uppercase tracking-wider font-semibold">
                  Exclusive Benefit
                </div>
                <h3 className="font-serif text-xl lg:text-2xl font-normal text-luxury-charcoal mb-3">
                  The "Zero Legwork" Guarantee for Mumbai Relocators
                </h3>
                <p className="text-xs md:text-sm text-luxury-charcoal/70 leading-relaxed font-light max-w-3xl">
                  Whether you are an NRI moving back to Mumbai or upgrading from South Mumbai to luxury areas of Andheri East, we handle physical property searches, utility connections, cleaning, carpentry repairs, and rental management so you experience zero friction.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-end">
                <button 
                  onClick={() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3.5 bg-luxury-olive text-white hover:bg-luxury-bronze transition-colors text-xs uppercase tracking-widest font-semibold rounded-sm w-full lg:w-auto"
                  id="zero_legwork_button"
                >
                  Acquire Vetted Listings
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* INVESTMENT YIELD AND MORTGAGE INTELLIGENCE DASHBOARD (LEAD MAGNET) */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10" id="calculator">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-12 mb-4 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-bronze font-semibold mb-2 block">
              Investment Intelligence
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-luxury-charcoal">
              Mumbai Yield <span className="italic font-normal">&amp;</span> EMI Predictor
            </h2>
            <p className="text-xs md:text-sm text-luxury-charcoal/70 leading-relaxed font-light max-w-xl mx-auto mt-4">
              Premium client decisions demand strict mathematical rigor. Model your property acquisition EMI alongside capital appreciation forecasts in Poonam Nagar.
            </p>
          </div>

          {/* Sliders Block */}
          <div className="lg:col-span-6 bg-white border border-luxury-charcoal/5 p-6 md:p-10 rounded-2xl shadow-xl shadow-luxury-charcoal/5">
            <h3 className="font-serif text-xl font-normal text-luxury-charcoal mb-8 flex items-center gap-3">
              <Calculator size={20} className="text-luxury-bronze" />
              <span>Configure Asset Valuation</span>
            </h3>

            <div className="space-y-8">
              {/* Slider 1: Property Value */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-wide text-luxury-charcoal/60 font-semibold font-sans">Target Asset Value</span>
                  <span className="font-mono font-bold text-luxury-bronze text-sm sm:text-base">
                    {formatCurrency(propertyValue)}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="15000000" // 1.5 Cr
                  max="120000000" // 12 Cr
                  step="500000"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="w-full h-1 bg-luxury-cream rounded-lg appearance-none cursor-pointer accent-luxury-bronze"
                />
                <div className="flex justify-between text-[10px] text-luxury-charcoal/40 font-mono">
                  <span>1.5 Cr</span>
                  <span>5.0 Cr</span>
                  <span>12.0 Cr</span>
                </div>
              </div>

              {/* Slider 2: Interest Rate */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-wide text-luxury-charcoal/60 font-semibold font-sans">Bank Interest Rate</span>
                  <span className="font-mono font-bold text-luxury-bronze text-sm sm:text-base">
                    {interestRate}% per annum
                  </span>
                </div>
                <input 
                  type="range" 
                  min="7.5" 
                  max="11.5" 
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-1 bg-luxury-cream rounded-lg appearance-none cursor-pointer accent-luxury-bronze"
                />
                <div className="flex justify-between text-[10px] text-luxury-charcoal/40 font-mono">
                  <span>7.5%</span>
                  <span>8.5% avg</span>
                  <span>11.5%</span>
                </div>
              </div>

              {/* Slider 3: Rent Yield */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-wide text-luxury-charcoal/60 font-semibold font-sans">Estimated Rental Yield</span>
                  <span className="font-mono font-bold text-luxury-bronze text-sm sm:text-base">
                    {rentalYieldPercent}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="2.0" 
                  max="4.8" 
                  step="0.1"
                  value={rentalYieldPercent}
                  onChange={(e) => setRentalYieldPercent(Number(e.target.value))}
                  className="w-full h-1 bg-luxury-cream rounded-lg appearance-none cursor-pointer accent-luxury-bronze"
                />
                <div className="flex justify-between text-[10px] text-luxury-charcoal/40 font-mono">
                  <span>2.0% (Lounge)</span>
                  <span>3.2% avg</span>
                  <span>4.8% (Commercial)</span>
                </div>
              </div>

              {/* Slider 4: Loan Tenure */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-wide text-luxury-charcoal/60 font-semibold font-sans">Payment Tenure</span>
                  <span className="font-mono font-bold text-luxury-bronze text-sm sm:text-base">
                    {tenureYears} Years
                  </span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="25" 
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-1 bg-luxury-cream rounded-lg appearance-none cursor-pointer accent-luxury-bronze"
                />
                <div className="flex justify-between text-[10px] text-luxury-charcoal/40 font-mono">
                  <span>5 Yrs</span>
                  <span>15 Yrs</span>
                  <span>25 Yrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Block */}
          <div className="lg:col-span-6 bg-luxury-charcoal text-white p-6 md:p-10 rounded-2xl shadow-2xl shadow-luxury-charcoal/30 flex flex-col justify-between h-full min-h-[460px]">
            <div>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-luxury-bronze block mb-4">
                CURATED MODEL PROJECTIONS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-b border-white/10 pb-8">
                <div>
                  <span className="text-xs text-white/50 block font-light">Est. Monthly EMI (80% Loan)</span>
                  <strong className="text-2xl sm:text-3xl font-serif text-[#FAF7F2] font-semibold mt-1 block">
                    {formatCurrency(calculateEMI())}
                  </strong>
                  <span className="text-[10px] text-white/30 block mt-1">Requires 20% downpayment</span>
                </div>

                <div>
                  <span className="text-xs text-white/50 block font-light">Projected Monthly Rent</span>
                  <strong className="text-2xl sm:text-3xl font-serif text-luxury-bronze font-semibold mt-1 block">
                    {formatCurrency(calculateYield().monthlyRent)}
                  </strong>
                  <span className="text-[10px] text-white/30 block mt-1">Passive inflow offset</span>
                </div>
              </div>

              <div className="py-8 space-y-4">
                <h4 className="text-xs uppercase tracking-wider text-luxury-gold text-luxury-sand font-semibold">
                  Andheri East 10-Year Wealth Performance (Historical 8.2% CAGR)
                </h4>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-white/50 font-light">Current Asset Cost:</span>
                  <span className="font-mono text-xs">{formatCurrency(propertyValue)}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-white/50 font-light">Projected Value in 2036:</span>
                  <span className="font-serif font-bold text-luxury-bronze text-lg sm:text-xl">
                    {formatCurrency(calculateYield().tenYearValue)}
                  </span>
                </div>
                <p className="text-[11px] text-white/40 leading-relaxed pt-2 font-light">
                  *Poonam Nagar real estate continues to be bolstered by its serene community layout, low high-rise density, and excellent connectivity to the Western Express Highway & Metro.
                </p>
              </div>
            </div>

            <button 
              onClick={() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-4 border border-white/20 hover:border-white hover:bg-white hover:text-luxury-charcoal transition-all text-xs uppercase tracking-widest font-semibold rounded-sm text-center"
              id="calculator_get_full_report"
            >
              Acquire Exact Asset Valuation Sheet
            </button>
          </div>

        </div>
      </section>

      {/* SOCIAL PROOF - BREATHTAKING REVIEWS GALLERY */}
      <section className="py-24 bg-luxury-sand relative z-10 border-y border-luxury-bronze/10" id="reviews">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
            <div className="lg:col-span-8">
              <span className="text-xs uppercase tracking-[0.25em] text-luxury-bronze font-semibold mb-3 block">
                The Google Maps Chronicles
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-luxury-charcoal leading-tight">
                Reflections of Absolute <br />
                <span className="italic">Discretion &amp; Trust</span>
              </h2>
            </div>
            
            <div className="lg:col-span-4 lg:text-right">
              <div className="inline-flex flex-col items-center lg:items-end">
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className="fill-luxury-bronze text-luxury-bronze" />
                  ))}
                </div>
                <p className="text-xs uppercase tracking-widest font-bold text-luxury-charcoal">
                  5.0 ★ Star Verified Service
                </p>
                <span className="text-[10px] text-luxury-charcoal/50">Andheri East Property Consultancy</span>
              </div>
            </div>
          </div>

          {/* Interactive Tabbed Spotlight Box */}
          <div className="bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-luxury-charcoal/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 space-y-6">
              <p className="text-xs uppercase tracking-wider text-luxury-olive font-semibold">
                CURATED TESTIMONY COHORTS
              </p>
              <div className="flex flex-col gap-3">
                {reviews.map((rev, idx) => (
                  <button
                    key={rev.id}
                    onClick={() => setActiveReviewTab(idx)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      idx === activeReviewTab 
                        ? 'bg-luxury-cream border-luxury-bronze/50 text-luxury-charcoal' 
                        : 'bg-transparent border-transparent text-luxury-charcoal/50 hover:bg-luxury-cream/50'
                    }`}
                  >
                    <div className="text-xs uppercase tracking-widest font-bold">{rev.author}</div>
                    <div className="text-[10px] font-light mt-0.5">{rev.relationship} • {rev.timeAgo}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 bg-luxury-cream/20 p-6 md:p-10 rounded-2xl border border-luxury-bronze/5 min-h-[300px] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1" id={`stars_${reviews[activeReviewTab].author}`}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} className="fill-luxury-bronze text-luxury-bronze" />
                    ))}
                  </div>
                  <span className="font-serif italic text-6xl text-luxury-bronze/10 leading-none">“</span>
                </div>

                <div className="space-y-4">
                  <h4 className="font-serif text-xl font-medium italic text-luxury-bronze">
                    "{reviews[activeReviewTab].highlightText}"
                  </h4>
                  <p className="text-xs md:text-sm text-luxury-charcoal/80 leading-relaxed font-light italic">
                    {reviews[activeReviewTab].text}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-luxury-charcoal/5 flex justify-between items-center text-xs">
                <div>
                  <strong className="text-luxury-charcoal font-semibold">{reviews[activeReviewTab].author}</strong>
                  <span className="text-luxury-charcoal/50 block text-[10px] mt-0.5">{reviews[activeReviewTab].relationship}</span>
                </div>
                <div className="text-[10px] uppercase font-bold text-luxury-olive px-3 py-1 bg-luxury-olive/10 rounded">
                  Verified Client Account
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ABOUT ASHISH BANDODKAR - THE PRINCIPAL PROFILE */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10" id="about-principal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=1400" 
                alt="Ashish Bandodkar Office Consultation Design" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                <span className="font-serif italic text-lg text-luxury-sand block">"From Agent to Trusted Confidant"</span>
              </div>
            </div>

            {/* Accent Circle Badge */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-luxury-charcoal text-white flex flex-col justify-center items-center p-3 text-center border-4 border-luxury-cream shadow-xl">
              <Award size={18} className="text-luxury-bronze mb-1" />
              <span className="text-[8px] font-sans font-semibold tracking-widest uppercase">Expert</span>
              <span className="text-[8px] font-sans font-light opacity-60">Brokerage</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-bronze font-semibold block">
              The Leadership Narrative
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-luxury-charcoal leading-tight">
              Bespoke Guidance, <br />
              <span className="italic">Beyond All Expectations</span>
            </h2>

            <div className="h-[1px] bg-luxury-charcoal/10"></div>

            <div className="space-y-6 text-sm md:text-base text-luxury-charcoal/85 leading-relaxed font-light">
              <p>
                In the complex, fast-moving landscape of Mumbai real estate, a typical broker treats relationships as transactional. At <strong className="font-semibold text-luxury-charcoal">Bandodkar &amp; Co.</strong>, we recognize that your home or portfolio acquisition is central to your peace of mind and legacy. 
              </p>
              <p>
                Founded by <strong className="font-semibold text-luxury-charcoal">Ashish Bandodkar</strong>, this boutique consultancy was born from a simple promise: <em className="italic text-luxury-bronze text-base">To take absolute charge of physical activity in a deal.</em> Our clients do not run for paperwork, contractor coordination, or structural repairing. We secure, polish, and configure your property beyond expectation.
              </p>
              <blockquote className="border-l-2 border-luxury-bronze pl-6 italic font-serif text-lg text-[#5A5243] py-2 bg-luxury-sand/40 pr-4 rounded-r-sm">
                "Our clients typically become life-long friends. We make the stressful pursuit of real estate beautifully smooth and genuinely trustworthy."
              </blockquote>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <Check className="text-luxury-bronze mt-1 shrink-0" size={16} />
                <div>
                  <h4 className="text-xs uppercase font-bold text-luxury-charcoal">Micro-Market Speciality</h4>
                  <p className="text-[11px] text-luxury-charcoal/60 leading-normal font-light">Deep focus in Poonam Nagar &amp; Andheri residential assets.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="text-luxury-bronze mt-1 shrink-0" size={16} />
                <div>
                  <h4 className="text-xs uppercase font-bold text-luxury-charcoal">Zero-Stress Closures</h4>
                  <p className="text-[11px] text-luxury-charcoal/60 leading-normal font-light">End-to-end legal support, utility transfer, and repairs.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DETAILED GEOGRAPHY & PRIVATE INQUIRY SECTION */}
      <section className="py-24 bg-white relative z-10 border-t border-luxury-charcoal/5" id="contact">
        <div className="max-w-7xl mx-auto px-6" ref={formSectionRef}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
            
            {/* Left Box: Client Consultation Request Form */}
            <div className="lg:col-span-6 bg-luxury-sand p-6 md:p-12 rounded-3xl border border-luxury-bronze/10 flex flex-col justify-between" id="inquiry-block">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-luxury-bronze font-semibold mb-3 block">
                  Confidential Inquiry
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl font-light text-luxury-charcoal mb-4">
                  Initiate Your Consultation
                </h3>
                <p className="text-xs text-luxury-charcoal/70 font-light mb-8">
                  For NRIs, corporate tenants, or buyers looking for a trusted partner. Enter your contact details and Ashish Bandodkar will coordinate directly.
                </p>

                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="p-8 bg-white border border-luxury-bronze/20 rounded-2xl text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-luxury-olive/10 text-luxury-olive flex items-center justify-center mx-auto mb-4">
                      <CheckCircleIcon />
                    </div>
                    <h4 className="font-serif text-xl font-normal text-luxury-charcoal">
                      Thank you, {inquiryForm.name}.
                    </h4>
                    <p className="text-xs text-luxury-charcoal/70 leading-relaxed font-light">
                      Your confidential portfolio brief has been logged. Ashish Bandodkar will personally call you at <strong className="font-semibold text-luxury-charcoal">{inquiryForm.phone}</strong> to schedule your exclusive viewing or evaluation session.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-[10px] uppercase tracking-widest text-[#7D766A] hover:underline font-bold pt-4"
                    >
                      Make Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-luxury-charcoal/60 font-semibold mb-1.5 block">Full Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          required 
                          value={inquiryForm.name} 
                          onChange={handleInquiryChange}
                          placeholder="Lord/Lady Sandeep Nair"
                          className="w-full bg-white border border-luxury-charcoal/10 rounded px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-luxury-bronze transition-colors font-light"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-luxury-charcoal/60 font-semibold mb-1.5 block">Phone Number (Click-To-Call Direct)</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          required 
                          value={inquiryForm.phone} 
                          onChange={handleInquiryChange}
                          placeholder="+91 99000 00000"
                          className="w-full bg-white border border-luxury-charcoal/10 rounded px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-luxury-bronze transition-colors font-light"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-luxury-charcoal/60 font-semibold mb-1.5 block">Confidential Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        value={inquiryForm.email} 
                        onChange={handleInquiryChange}
                        placeholder="client@prestigemai.com"
                        className="w-full bg-white border border-luxury-charcoal/10 rounded px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-luxury-bronze transition-colors font-light"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-[#7D766A] font-semibold mb-1.5 block">Service Division</label>
                        <select 
                          name="serviceType" 
                          value={inquiryForm.serviceType} 
                          onChange={handleInquiryChange}
                          className="w-full bg-white border border-luxury-charcoal/10 rounded px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-luxury-bronze transition-colors font-light appearance-none"
                        >
                          <option value="Residential Purchase">Residential Purchase</option>
                          <option value="Corporate/Retail Leasing">Corporate/Retail Leasing</option>
                          <option value="Strategic Investment Advisory">Strategic Investment Advisory</option>
                          <option value="Post-Deal Remodels / Repairs">Post-Deal Remodels / Repairs</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-[#7D766A] font-semibold mb-1.5 block">Budget Band</label>
                        <select 
                          name="budgetRange" 
                          value={inquiryForm.budgetRange} 
                          onChange={handleInquiryChange}
                          className="w-full bg-white border border-luxury-charcoal/10 rounded px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-luxury-bronze transition-colors font-light appearance-none"
                        >
                          <option value="₹1.5 Cr - ₹3.0 Cr">₹1.5 Cr - ₹3.0 Cr</option>
                          <option value="₹3.0 Cr - ₹5.0 Cr">₹3.0 Cr - ₹5.0 Cr</option>
                          <option value="₹5.0 Cr - ₹10.0 Cr">₹5.0 Cr - ₹10.0 Cr</option>
                          <option value="₹10.0 Cr+">₹10.0 Cr+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#7D766A] font-semibold mb-1.5 block">Target Requirements &amp; Timelines</label>
                      <textarea 
                        name="specificNeeds" 
                        rows={4} 
                        value={inquiryForm.specificNeeds} 
                        onChange={handleInquiryChange}
                        placeholder="E.g., Seeking peace in Poonam Nagar. Looking for immediate repair work support & custom cabinetry as part of transaction..."
                        className="w-full bg-white border border-luxury-charcoal/10 rounded px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-luxury-bronze transition-colors font-light"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-4 bg-luxury-charcoal text-luxury-cream hover:bg-luxury-bronze disabled:bg-luxury-charcoal/45 transition-all duration-300 text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2"
                      id="inquiry_form_submit"
                    >
                      {isSubmitting ? 'Securing Portal Connections...' : 'Transmit Secure Request'}
                      <ChevronRight size={14} />
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-luxury-charcoal/10 text-[10px] text-luxury-charcoal/50 leading-relaxed">
                By submitting this portfolio inquiry, you authorize Bandodkar &amp; Co. to verify credentials for private treaty offerings. Complete confidentiality under NDA is guaranteed.
              </div>
            </div>

            {/* Right Box: Geolocation Details & Live Map API */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-luxury-bronze font-semibold mb-3 block">
                    The Physical Headquarters
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl font-light text-luxury-charcoal leading-tight">
                    Shantidham Society, <br />
                    <span className="italic">Andheri East</span>
                  </h3>
                </div>

                {/* Direct Contact Links - Click-To-Call & Direct Map Redirect */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <a 
                    href="tel:07039447088" 
                    className="p-5 bg-luxury-cream/50 hover:bg-luxury-sand border border-luxury-charcoal/5 hover:border-luxury-bronze/35 rounded-2xl flex items-start gap-4 transition-all"
                    id="contact_card_phone"
                  >
                    <div className="p-2.5 rounded-lg bg-luxury-bronze/10 text-luxury-bronze">
                      <Phone size={18} />
                    </div>
                    <div>
                      <strong className="text-xs uppercase tracking-wider text-luxury-charcoal font-semibold block">Primary Advisory</strong>
                      <span className="text-sm font-serif font-bold text-luxury-olive block mt-1 hover:underline">070394 47088</span>
                      <span className="text-[9px] text-luxury-charcoal/50 uppercase mt-0.5 block">Click to call direct</span>
                    </div>
                  </a>

                  <a 
                    href="https://maps.app.goo.gl/q5b716LrdrmUjVSS8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-5 bg-luxury-cream/50 hover:bg-luxury-sand border border-luxury-charcoal/5 hover:border-luxury-bronze/35 rounded-2xl flex items-start gap-4 transition-all"
                    id="contact_card_address"
                  >
                    <div className="p-2.5 rounded-lg bg-luxury-bronze/10 text-luxury-bronze">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <strong className="text-xs uppercase tracking-wider text-luxury-charcoal font-semibold block">Office Location</strong>
                      <span className="text-[11px] font-sans font-medium text-luxury-charcoal block mt-1 leading-normal hover:underline">
                        Shop no 8/A, Ashirvad CHS, Poonam Nagar, Mumbai
                      </span>
                      <span className="text-[9px] text-luxury-bronze uppercase mt-1 block">Inspect on Google Maps ↗</span>
                    </div>
                  </a>
                </div>

                {/* Live Google Maps Embed Iframe */}
                <div className="rounded-2xl overflow-hidden border border-luxury-charcoal/15 bg-luxury-sand relative h-[280px]">
                  <iframe 
                    title="Ashish Bandodkar Property Consultants Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60310.072495922774!2d72.7961441!3d19.1348571!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b74f37119b0f%3A0xd9c8c0708843bda7!2sAshish%20Bandodkar%20real%20estate%20consultant!5e0!3m2!1sen!2sin!4v1779217716534!5m2!1sen!2sin"
                    className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                    allowFullScreen={false} 
                    loading="lazy" 
                    id="contact_maps_iframe"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-luxury-charcoal/5 text-xs text-luxury-charcoal/60 leading-relaxed font-light mt-8">
                <strong>Schedule:</strong> Client coordination operates under appointment only. Monday through Saturday, 10:00 AM to 7:00 PM IST. Private estate walk-throughs can be negotiated on Sundays.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-luxury-charcoal text-white pt-16 pb-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            <div className="md:col-span-5 space-y-4">
              <span className="font-serif text-2xl tracking-[0.14em] uppercase text-[#FAF7F2] font-semibold block">
                Bandodkar <span className="text-luxury-bronze font-light">&amp;</span> Co.
              </span>
              <p className="text-xs text-white/50 leading-relaxed font-light max-w-sm">
                Bespoke property consulting, high-yield investment structures, and comprehensive remodels across Andheri East. Crafting real estate relationships that turn into family bonds.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="https://maps.app.goo.gl/q5b716LrdrmUjVSS8" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-luxury-bronze text-xs flex items-center gap-1.5 transition-colors">
                  <Star size={12} className="fill-luxury-bronze text-luxury-bronze" /> 
                  <span>Review us on Google Maps</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-luxury-bronze font-bold">Key Neighborhoods</h4>
              <ul className="space-y-2 text-xs text-white/50 font-light">
                <li>Poonam Nagar Premium CHS</li>
                <li>Shantidham Society Enclv</li>
                <li>Sher-E-Punjab Colony</li>
                <li>Mahakali Caves Road Bounds</li>
                <li>JVLR Connective Corridor</li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-luxury-bronze font-bold">Corporate Disclosures</h4>
              <p className="text-xs text-white/40 leading-relaxed font-light">
                Shop no 8/A, Ashirvad CHS, Shantidham Society, Poonam Nagar, Andheri East, Mumbai, Maharashtra 400093. Registered Real Estate Consultant under MAHARERA protocols.
              </p>
              <div className="pt-2">
                <a 
                  href="tel:07039447088" 
                  className="inline-flex items-center gap-2 text-xs font-semibold text-luxury-bronze hover:underline"
                  id="footer_tel_link"
                >
                  <Phone size={14} />
                  <span>+91 70394 47088</span>
                </a>
              </div>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-white/40">
            <p>© {new Date().getFullYear()} Bandodkar &amp; Co. All premium rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
              <a href="#" className="hover:text-white transition-colors">Regulatory Compliance</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Engagement</a>
            </div>
          </div>
        </div>
      </footer>

      <Analytics />
    </div>
  );
}

// Icon helpers to keep the component neat
function CheckCircleIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
