"use client"

import { Bot, Cpu, Code, MonitorPlay, Microchip, Wifi, Layers } from "lucide-react"

export default function TechStackSection() {
  
  const techStack = [
    { 
      icon: Bot, 
      label: "Lego Education", 
      desc: "Robotics & Mechanics",
      color: "text-amber-600", 
      bg: "bg-amber-100", 
      border: "hover:border-amber-400",
      shadow: "hover:shadow-amber-100"
    },
    { 
      icon: MonitorPlay, 
      label: "MIT Scratch", 
      desc: "Visual Block Coding",
      color: "text-orange-600", 
      bg: "bg-orange-100", 
      border: "hover:border-orange-400",
      shadow: "hover:shadow-orange-100"
    },
    { 
      icon: Cpu, 
      label: "Arduino", 
      desc: "Circuit Electronics",
      color: "text-teal-600", 
      bg: "bg-teal-100", 
      border: "hover:border-teal-400",
      shadow: "hover:shadow-teal-100"
    },
    { 
      icon: Code, 
      label: "Python", 
      desc: "Real-World Coding",
      color: "text-blue-600", 
      bg: "bg-blue-100", 
      border: "hover:border-blue-400",
      shadow: "hover:shadow-blue-100"
    },
    { 
      icon: Microchip, 
      label: "Raspberry Pi", 
      desc: "Mini-Computer Logic",
      color: "text-rose-600", 
      bg: "bg-rose-100", 
      border: "hover:border-rose-400",
      shadow: "hover:shadow-rose-100"
    },
    { 
      icon: Wifi, 
      label: "IoT & Sensors", 
      desc: "Smart Automation",
      color: "text-purple-600", 
      bg: "bg-purple-100", 
      border: "hover:border-purple-400",
      shadow: "hover:shadow-purple-100"
    },
  ]

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Background: Circuit Board Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f172a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider mb-4 shadow-sm">
            <Layers size={14} className="text-amber-500" /> Technology
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Tech Stack</span> 🛠️
          </h2>
          <p className="text-slate-500 mt-4 text-lg font-medium max-w-2xl mx-auto">
            We use industry-standard tools tailored for young minds to ensure they learn skills that matter.
          </p>
        </div>
        
        {/* Colorful Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {techStack.map((tool, i) => (
            <div 
              key={i} 
              className={`
                group bg-white p-6 rounded-[2rem] border-2 border-slate-50
                shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2
                flex flex-col items-center gap-4 cursor-default
                ${tool.border} ${tool.shadow}
              `}
            >
              {/* Icon Bubble */}
              <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6
                ${tool.bg} ${tool.color}
              `}>
                <tool.icon size={30} strokeWidth={2} />
              </div>
              
              {/* Text Info */}
              <div className="space-y-1">
                <span className="block font-bold text-slate-900 text-base">{tool.label}</span>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide group-hover:text-slate-600 transition-colors">
                  {tool.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}