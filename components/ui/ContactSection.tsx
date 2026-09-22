"use client";

import React, { useState } from 'react';
import { 
  Phone, Mail, ArrowRight, MessageSquare, 
  User, AtSign, Smartphone, GraduationCap, ChevronDown, 
  Loader2, CheckCircle, Sparkles 
} from 'lucide-react';

const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    email: '',
    phone: '',
    queryType: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Assuming your endpoint remains the same
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ parentName: '', studentName: '', email: '', phone: '', queryType: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden font-sans" id="contact">
      {/* --- Background Decorative Elements --- */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-32 -z-10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#01539D]/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        {/* --- Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
             <Sparkles className="w-4 h-4 text-[#46B94A]" />
             <span className="text-[10px] font-black text-[#01539D] uppercase tracking-[0.2em]">Enrolment 2024-25</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
             Ready to Build a <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01539D] to-[#46B94A]">
               Future-Ready Mind?
             </span>
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Fill out the form below to book a free demo session or to inquire about our specialized skill programs.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          
          {/* --- LEFT: Contact Info Card --- */}
          <div className="w-full lg:w-5/12">
            <div className="bg-[#01539D] rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20 h-full flex flex-col justify-between">
               {/* Pattern overlay */}
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="contactGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="white"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#contactGrid)" />
                  </svg>
               </div>

               <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-4">Connect With Us</h3>
                  <p className="text-blue-100/70 font-medium mb-12">Our academic counselors are here to guide you through our curriculum and admission process.</p>
                  
                  <div className="space-y-10">
                     <div className="flex items-start gap-5 group">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-[#46B94A] transition-all duration-300">
                           <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Direct Call</p>
                           <p className="text-xl font-bold text-white tracking-tight">+91 98878 21721</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-5 group">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-[#46B94A] transition-all duration-300">
                           <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Email Support</p>
                           <p className="text-xl font-bold text-white tracking-tight">futuremindskills@gmail.com</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mt-16 pt-8 border-t border-white/10 relative z-10">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-50 mb-4 text-white">Our Location</p>
                  <p className="text-sm font-medium leading-relaxed">Nanakramguda, Hyderabad, Telangana</p>
               </div>
            </div>
          </div>

          {/* --- RIGHT: The Form --- */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200/40 border border-slate-50 relative">
               
               {status === 'success' ? (
                 <div className="text-center py-20">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-[#46B94A]" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900">Enquiry Received!</h3>
                    <p className="text-slate-500 mt-4 text-lg font-medium">Thank you for reaching out. Our team will contact you within 24 hours.</p>
                    <button 
                        onClick={() => setStatus('idle')} 
                        className="mt-8 text-[#01539D] font-black uppercase tracking-widest text-sm hover:underline"
                    >
                        Send another enquiry
                    </button>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Parent's Name</label>
                        <div className="relative group">
                           <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-300 group-focus-within:text-[#01539D] transition-colors" />
                           <input required name="parentName" value={formData.parentName} onChange={handleChange} type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#01539D] focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Student's Name</label>
                        <div className="relative group">
                           <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-300 group-focus-within:text-[#01539D] transition-colors" />
                           <input required name="studentName" value={formData.studentName} onChange={handleChange} type="text" placeholder="Child's name" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#01539D] focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative group">
                           <AtSign className="absolute left-4 top-3.5 w-5 h-5 text-slate-300 group-focus-within:text-[#01539D] transition-colors" />
                           <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="futuremindskills@gmail.com" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#01539D] focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                        <div className="relative group">
                           <Smartphone className="absolute left-4 top-3.5 w-5 h-5 text-slate-300 group-focus-within:text-[#01539D] transition-colors" />
                           <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+91 98878 21721" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#01539D] focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300" />
                        </div>
                     </div>

                     {/* --- UPDATED DROPDOWN --- */}
                     <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Select Program Interested</label>
                        <div className="relative group">
                           <GraduationCap className="absolute left-4 top-3.5 w-5 h-5 text-slate-300 group-focus-within:text-[#01539D] pointer-events-none transition-colors" />
                           <select 
                             required
                             name="queryType"
                             value={formData.queryType}
                             onChange={handleChange}
                             className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#01539D] focus:bg-white transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                           >
                              <option value="" disabled>Choose a program</option>
                              <option value="Chess Coaching">Chess Coaching</option>
                              <option value="Coding & AI">Coding & AI Mastery</option>
                              <option value="Logical Reasoning">Logical Reasoning</option>
                              <option value="Memory Mastery">Memory Mastery (Abacus)</option>
                              <option value="Communication">Communication Skills</option>
                              <option value="Other">General Inquiry</option>
                           </select>
                           <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-slate-300 pointer-events-none" />
                        </div>
                     </div>

                     <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Message (Optional)</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Any specific requirements or questions..." className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-[#01539D] focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300 resize-none"></textarea>
                     </div>
                  </div>

                  <div className="pt-6">
                     <button 
                       disabled={status === 'loading'}
                       type="submit" 
                       className="w-full md:w-auto bg-[#01539D] hover:bg-[#01427a] disabled:bg-slate-200 text-white font-black py-5 px-14 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-100 active:scale-95 uppercase tracking-widest text-sm"
                     >
                        {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Request Demo'}
                        <ArrowRight className="w-5 h-5" />
                     </button>
                     {status === 'error' && <p className="text-red-500 text-sm mt-4 font-bold">Failed to send. Please try calling us instead.</p>}
                  </div>
               </form>
               )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;