
import { ColorfulBentoGrid } from "@/components/ui/colorful-bento-grid";

export function DashboardContent({ onNavigate }: { onNavigate: (page: string) => void }) {
  // The ColorfulBentoGrid now handles the entire layout
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] md:p-8">
      {/* Wrapper to ensure centering and correct background if needed */}
      <ColorfulBentoGrid onNavigate={onNavigate} />
    </div>
  );
}