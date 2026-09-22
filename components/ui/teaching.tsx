"use client";

import React, { useState } from 'react';
import { 
  Video, 
  Puzzle, 
  Target, 
  Brain, 
  Users, 
  TrendingUp,
  ChevronRight,
  Sparkles,
  BarChart,
  Gamepad2,
  Lightbulb,
  CheckCircle
} from 'lucide-react';

export default function TeachingMethodologySection() {
  const [activeMethod, setActiveMethod] = useState(0);

  const methodologies = [
    {
      title: 'Live Interactive Coaching',
      description: 'Real-time sessions with expert coaches who provide immediate feedback and personalized guidance.',
      icon: <Video className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      features: [
        'One-on-one attention',
        'Interactive whiteboard',
        'Instant Q&A',
        'Screen sharing'
      ],
    },
    {
      title: 'Practical Game Sessions',
      description: 'Apply learned concepts in real games against peers and coaches in supervised matches.',
      icon: <Gamepad2 className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Live tournaments',
        'Peer matches',
        'Coach-supervised games',
        'Time control practice'
      ],
    },
    {
      title: 'Puzzle-Based Learning',
      description: 'Daily tactical puzzles and strategic challenges to sharpen problem-solving skills.',
      icon: <Puzzle className="w-8 h-8" />,
      color: 'from-amber-500 to-orange-500',
      features: [
        'Daily puzzles',
        'Tactics training',
        'Pattern recognition',
        'Gradual difficulty'
      ],
    },
    {
      title: 'Game Analysis & Evaluation',
      description: 'Detailed analysis of student games with coach feedback and improvement plans.',
      icon: <BarChart className="w-8 h-8" />,
      color: 'from-emerald-500 to-green-500',
      features: [
        'Move-by-move analysis',
        'Opening repertoire review',
        'Endgame technique',
        'Strategic planning'
      ],
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Assessment',
      description: 'Evaluate current skill level and learning style',
      icon: <Brain className="w-6 h-6" />
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Create personalized learning path and goals',
      icon: <Target className="w-6 h-6" />
    },
    {
      step: '03',
      title: 'Execution',
      description: 'Implement structured lessons and practice',
      icon: <Users className="w-6 h-6" />
    },
    {
      step: '04',
      title: 'Review',
      description: 'Regular progress tracking and adjustments',
      icon: <TrendingUp className="w-6 h-6" />
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-800">Our Unique Approach</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Proven Teaching{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Methodology
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-amber-200 to-yellow-200 transform rotate-[-1deg] z-0"></span>
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive approach that combines theory with practice, 
            creating well-rounded chess players ready for competition.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {processSteps.map((step, index) => (
            <div 
              key={index}
              className="relative group"
            >
              {/* Connecting Line */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-200 -translate-x-1/2 -translate-y-1/2 z-0"></div>
              )}
              
              <div className="relative bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {step.step}
                    </span>
                  </div>
                  <div className="text-purple-600">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Methodology Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {methodologies.map((method, index) => (
            <div 
              key={index}
              className={`group relative bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                activeMethod === index ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
              }`}
              onClick={() => setActiveMethod(index)}
            >
              {/* Method Header */}
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-white`}>
                  {method.icon}
                </div>
                {/* <ChevronRight className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                  activeMethod === index ? 'rotate-90 text-purple-600' : ''
                }`} /> */}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {method.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {method.description}
              </p>

              {/* Features List */}
              <div className="space-y-3">
                {method.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10 rounded-2xl`}></div>
            </div>
          ))}
        </div>

        {/* Methodology Description */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-3xl p-8 md:p-12">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Our Methodology Works
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our approach combines structured learning with practical application. 
                Each student receives a personalized blend of theoretical knowledge, 
                tactical training, and game practice. Regular assessments ensure continuous 
                progress, while our experienced coaches provide the guidance needed to 
                overcome plateaus and achieve breakthrough results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}