import { useState, useEffect } from 'react';
import { Plus, Search, Building2, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import CompanyDetails from '../CompanyDetails';
import GenerateCodeModal from '../GenerateCodeModal';

interface Company {
  id: string;
  company_name: string;
  industry: string | null;
  email: string;
  phone: string | null;
  employee_seats: number;
  used_seats: number;
  is_active: boolean;
  created_at: string;
}

export default function CompaniesTab() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [showGenerateCode, setShowGenerateCode] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter(company =>
        company.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [searchTerm, companies]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCompanies(data || []);
      setFilteredCompanies(data || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (selectedCompanyId) {
    return (
      <CompanyDetails
        companyId={selectedCompanyId}
        onBack={() => {
          setSelectedCompanyId(null);
          fetchCompanies();
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando empresas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Procurar empresas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => setShowGenerateCode(true)}
          className="bg-[#007AFF] hover:bg-[#0051D5] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Registar Nova Empresa
        </Button>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            {searchTerm ? 'Nenhuma empresa encontrada' : 'Nenhuma empresa registada'}
          </div>
        ) : (
          filteredCompanies.map((company) => (
            <div
              key={company.id}
              onClick={() => setSelectedCompanyId(company.id)}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[#007AFF]/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#007AFF]" />
                </div>
                <Badge variant={company.is_active ? 'default' : 'secondary'}>
                  {company.is_active ? 'Ativa' : 'Inativa'}
                </Badge>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 truncate">{company.company_name}</h3>
              {company.industry && (
                <p className="text-sm text-gray-500 mb-4">{company.industry}</p>
              )}

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{company.used_seats || 0} / {company.employee_seats} colaboradores</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(company.created_at).toLocaleDateString('pt-PT')}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Generate Code Modal */}
      {showGenerateCode && (
        <GenerateCodeModal
          onClose={() => {
            setShowGenerateCode(false);
            fetchCompanies();
          }}
        />
      )}
    </div>
  );
}
