"use client";

import React from 'react';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Trophy,
  CheckCircle,
  Star,
  Zap,
  Clock,
  Users,
  ChevronRight
} from 'lucide-react';

export default function SkillOutcomesSection() {
  const outcomes = [
    {
      title: 'Critical Thinking',
      description: 'Develop analytical skills and logical reasoning that apply beyond chess.',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      milestones: ['Pattern Recognition', 'Decision Making', 'Problem Solving', 'Logical Analysis'],
      improvement: '85% improvement in 3 months',
    },
    {
      title: 'Strategic Development',
      description: 'Master long-term planning and positional understanding in games.',
      icon: <Target className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      milestones: ['Opening Repertoire', 'Middle Game Plans', 'Endgame Techniques', 'Positional Play'],
      improvement: '100+ rating points average gain',
    },
    {
      title: 'Rating Improvement',
      description: 'Systematic approach to climbing rating levels and achieving milestones.',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-amber-500 to-orange-500',
      milestones: ['Beginner to Intermediate', 'Intermediate to Advanced', 'Advanced to Expert', 'Expert to Master'],
      improvement: 'Consistent 50-100 point gains per quarter',
    },
    {
      title: 'Tournament Readiness',
      description: 'Comprehensive preparation for competitive play at all levels.',
      icon: <Trophy className="w-8 h-8" />,
      color: 'from-emerald-500 to-green-500',
      milestones: ['Time Management', 'Pressure Handling', 'Tournament Strategy', 'Post-Game Analysis'],
      improvement: '94% success rate in first tournaments',
    },
  ];

  const goals = [
    {
      timeframe: '1 Month',
      achievements: [
        'Basic rules & piece movement',
        'Simple checkmates',
        'Opening principles',
        'First rated games'
      ],
      icon: <Star className="w-6 h-6" />,
    },
    {
      timeframe: '3 Months',
      achievements: [
        'Tactical patterns',
        'Basic endgames',
        'Opening repertoire',
        'First tournament participation'
      ],
      icon: <Zap className="w-6 h-6" />,
    },
    {
      timeframe: '6 Months',
      achievements: [
        'Strategic planning',
        'Complex endgames',
        'Tournament success',
        'Rating milestone achievement'
      ],
      icon: <Trophy className="w-6 h-6" />,
    },
    {
      timeframe: '1 Year',
      achievements: [
        'Master-level concepts',
        'Advanced strategy',
        'Consistent tournament wins',
        'Coaching certification opportunity'
      ],
      icon: <Users className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-14 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Skill Development{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Roadmap
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-amber-200 to-yellow-200 transform rotate-[-1deg] z-0"></span>
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A clear path from beginner to champion with measurable milestones and 
            guaranteed progress at every step.
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {outcomes.map((outcome, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${outcome.color} flex items-center justify-center text-white mb-6`}>
                {outcome.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {outcome.title}
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                {outcome.description}
              </p>

              {/* Milestones */}
              <div className="space-y-3 mb-6">
                {outcome.milestones.map((milestone, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{milestone}</span>
                  </div>
                ))}
              </div>

              {/* Improvement */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-purple-600">
                  {outcome.improvement}
                </p>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gray-100 rounded-tr-2xl"></div>
            </div>
          ))}
        </div>

        {/* Timeline Goals */}


        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">3x</p>
              <p className="text-purple-200">Faster Progress</p>
              <p className="text-sm text-purple-300">Compared to self-learning</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">94%</p>
              <p className="text-purple-200">Success Rate</p>
              <p className="text-sm text-purple-300">Students achieve their goals</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">100+</p>
              <p className="text-purple-200">Rating Points</p>
              <p className="text-sm text-purple-300">Average improvement in 6 months</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}