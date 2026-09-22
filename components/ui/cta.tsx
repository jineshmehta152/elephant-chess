"use client";

import React from 'react';
import { MapPin, Navigation, ExternalLink, Sparkles } from 'lucide-react';

const MapSection = () => {
  const businessName = "Elephant Chess Academy";
  const address = "Elephant Chess Hub, Master Strategic Square, India";
  const googleMapsLink = "https://maps.google.com"; 

  return (
    <section className="py-20 bg-white" id="location">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#29A3DD] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#FDB813]" />
            <span>Exact Location</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Visit Our <span className="text-[#29A3DD]">Academy Hub</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Located in the heart of the city, our premium academy hub is designed for grandmaster excellence.
          </p>
        </div>

        <div className="relative w-full h-[500px] md:h-[650px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-[10px] md:border-[16px] border-slate-50 shadow-2xl">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.843657864883!2d78.3378546!3d17.4192275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e870000001%3A0x6a0f7c706900f0!2sPrestige%20High%20Fields!5e0!3m2!1sen!2sin!4v1715632452312!5m2!1sen!2sin"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Elephant Chess Academy Location"
          ></iframe>

          <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-auto md:w-[400px] bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 z-20">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#01539D] flex items-center justify-center shrink-0 shadow-lg shadow-blue-100">
                <MapPin className="text-white w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-xl leading-tight mb-2">{businessName}</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{address}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#01539D] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#01427a] transition-all"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
              <a 
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-4 bg-slate-50 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;