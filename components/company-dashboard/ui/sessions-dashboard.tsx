import * as React from "react";
// DISABLED: import from 'motion/react';
import { Filter, Users, Clock, Zap, ArrowRight, Package, ShoppingCart } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { FlowButton } from "./flow-button";

// Type definitions for component props
interface ActivityStat {
  label: string;
  value: number; // Represents percentage
  color: string; // Tailwind color class e.g., 'bg-blue-400'
}

interface TeamMember {
  id: string;
  name: string;
  avatarUrl: string;
}

interface SessionsDashboardProps {
  title?: string;
  sessionsData: {
    available: number;
    total: number;
    stats: ActivityStat[];
  };
  team: {
    memberCount: number;
    members: TeamMember[];
  };
  cta: {
    title: string;
    text: string;
    buttonText: string;
    onButtonClick: () => void;
  };
  onFilterClick?: () => void;
  className?: string;
}

// Sub-component for animating numbers
const AnimatedNumber = ({ value }: { value: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  React.useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.5,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value, count]);

  return <span>{rounded}</span>;
};

// Main Component
export const SessionsDashboard = React.forwardRef<
  HTMLDivElement,
  SessionsDashboardProps
>(({ 
  title = "Sessions Overview",
  sessionsData,
  team,
  cta,
  onFilterClick,
  className 
}, ref) => {
  
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const hoverTransition = { type: "spring", stiffness: 300, damping: 15 };

  return (
    <div
      ref={ref}
      className={cn("w-full h-full flex flex-col", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div variants={itemVariants} className="flex items-center justify-between mb-4 flex-shrink-0">
        <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>{title}</h2>
        {onFilterClick && (
          <Button variant="ghost" size="icon" onClick={onFilterClick} aria-label="Filter activities" className="text-gray-600 hover:bg-gray-100">
            <Filter className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Main Grid: Left side (2 cards stacked) and Right side (CTA) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Left Column: Stats Cards Stacked */}
        <div className="flex flex-col gap-3 h-full">
          {/* Sessions Available Card */}
          <div 
            variants={itemVariants} 
 
            transition={hoverTransition}
            className="flex-1"
          >
            <Card className="h-full p-4 overflow-hidden rounded-xl bg-gradient-to-br from-blue-900 to-blue-950 border-blue-800">
              <CardContent className="p-2 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-medium text-blue-200" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}>Sessões Disponíveis</p>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                      Ativo
                    </div>
                    <Clock className="w-6 h-6 text-blue-300" />
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-6xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    <AnimatedNumber value={sessionsData.available} />
                  </span>
                </div>
                <p className="text-blue-200 text-base mb-4">Prontas a usar.</p>
                {/* Progress Bar */}
                <div className="w-full h-3 mb-2 overflow-hidden rounded-full bg-slate-800 flex">
                  {sessionsData.stats.map((stat, index) => (
                    <div
                      key={index}
                      className={cn("h-full", stat.color)}

                      animate={{ width: `${stat.value}%` }}

                    />
                  ))}
                </div>
                {/* Legend */}
                <div className="flex items-center justify-between text-xs text-blue-300">
                  {sessionsData.stats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-1.5">
                      <span className={cn("w-2 h-2 rounded-full", stat.color)}></span>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Total Sessions Card */}
          <div 
            variants={itemVariants}
 
            transition={hoverTransition}
            className="flex-1"
          >
            <Card className="h-full p-4 overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardContent className="p-2 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-medium text-slate-200" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}>Total Adquirido</p>
                  <Package className="w-6 h-6 text-slate-300" />
                </div>
                <div className="mb-4">
                  <span className="text-6xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                     <AnimatedNumber value={sessionsData.total} />
                  </span>
                </div>
                <p className="text-slate-300 text-base mb-4">Desde o início do contrato.</p>
                {/* Avatar Stack */}
                <div className="flex -space-x-2">
                  {team.members.slice(0, 4).map((member, index) => (
                    <div
                      key={member.id}



 
                    >
                      <Avatar className="border-2 border-slate-700">
                        <AvatarImage src={member.avatarUrl} alt={member.name} />
                        <AvatarFallback className="bg-slate-600 text-white">{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                  <div



                    className="flex items-center justify-center w-10 h-10 border-2 border-slate-700 rounded-full bg-slate-600 text-white text-xs font-bold"
                  >
                    +{team.memberCount - 4}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column: CTA Banner */}
        <div 
          variants={itemVariants} 
 
          transition={hoverTransition}
          className="flex h-full"
        >
          <div className="p-5 rounded-xl bg-gradient-to-r from-blue-900/50 to-slate-800/50 border border-blue-800/50 flex flex-col justify-between w-full">
            <div className="space-y-4">
              <div className="inline-flex p-3 bg-blue-800/50 rounded-xl">
                <ShoppingCart className="w-8 h-8 text-blue-200" />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-3xl text-white" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 'bold' }}>
                  {cta.title}
                </h3>
                <p className="text-slate-200 text-base max-w-xl" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
                  {cta.text}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <FlowButton onClick={cta.onButtonClick} text={cta.buttonText} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SessionsDashboard.displayName = "SessionsDashboard";
