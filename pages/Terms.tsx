// DISABLED: import from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
// DISABLED: import from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { TermsContent } from "@/components/user-dashboard/TermsContent";

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-5xl mx-auto px-6 py-8">

        {/* Back Button */}
        <div


          className="mb-2"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar
          </Button>
        </div>

        {/* Reuse the existing high-quality Terms content component */}
        <TermsContent />

        {/* Footer Note */}
        <div className="mt-8 text-center pb-8">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Melhor Saúde Limitada. Todos os direitos reservados.</p>
        </div>

      </div>
    </div>
  );
}
