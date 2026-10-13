import {
  GraduationCap,
  Sparkles,
  Play
} from 'lucide-react';

/**
 * Courses — Educational courses
 */

export default function Courses() {
  const courses = [
    {
      id: 'ai-for-beginners',
      name: 'AI for Beginners',
      description: 'Learn the fundamentals of AI and how to use it effectively',
      icon: Sparkles,
      lessons: 12,
      duration: '4 hours',
      level: 'Beginner',
    },
    {
      id: 'claude-for-beginners',
      name: 'Claude for Beginners',
      description: 'Master Claude AI for productivity and automation',
      icon: GraduationCap,
      lessons: 8,
      duration: '3 hours',
      level: 'Beginner',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">
          Courses
        </h1>
        <p className="text-muted">
          Learn new skills with our curated courses
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {courses.map((course) => {
          const Icon = course.icon;
          return (
            <div
              key={course.id}
              className="bg-surface border border-border rounded-card overflow-hidden hover:border-orange transition-colors group"
            >
              <div className="h-48 bg-gradient-to-br from-orange to-orange-accessible flex items-center justify-center">
                <Icon className="w-20 h-20 text-white opacity-90" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-orange-tint text-orange text-xs font-medium rounded">
                    {course.level}
                  </span>
                  <span className="text-sm text-muted">
                    {course.lessons} lessons · {course.duration}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-xl text-charcoal mb-2">
                  {course.name}
                </h3>
                <p className="text-sm text-muted mb-4">
                  {course.description}
                </p>
                <button className="flex items-center gap-2 px-4 py-2 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors">
                  <Play className="w-4 h-4" />
                  <span>Start Course</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
