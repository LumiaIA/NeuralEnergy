import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Link, 
  Shield, 
  Zap, 
  FileText,
  Coins,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  Users,
  Database,
  Lock,
  Unlock,
  Eye,
  Download
} from "lucide-react";

interface Transaction {
  id: string;
  hash: string;
  type: 'energy_trade' | 'contract_execution' | 'payment' | 'audit_log' | 'certificate';
  from: string;
  to: string;
  amount: number;
  currency: string;
  timestamp: string;
  status: 'confirmed' | 'pending' | 'failed';
  block_number: number;
  gas_used: number;
  description: string;
}

interface SmartContract {
  id: string;
  name: string;
  address: string;
  type: 'energy_trading' | 'billing' | 'maintenance' | 'compliance' | 'carbon_credits';
  description: string;
  status: 'active' | 'paused' | 'deployed' | 'testing';
  created_at: string;
  last_execution: string;
  executions_count: number;
  gas_limit: number;
  owner: string;
  version: string;
}

interface Block {
  id: string;
  number: number;
  hash: string;
  previous_hash: string;
  timestamp: string;
  transactions_count: number;
  miner: string;
  gas_used: number;
  gas_limit: number;
  size: string;
  difficulty: string;
}

interface CarbonCredit {
  id: string;
  certificate_id: string;
  project_name: string;
  credits_amount: number;
  price_per_credit: number;
  total_value: number;
  issuer: string;
  buyer: string;
  issue_date: string;
  expiry_date: string;
  status: 'active' | 'retired' | 'transferred' | 'expired';
  verification_standard: string;
}

const Blockchain = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      type: 'energy_trade',
      from: 'Usina Solar Norte',
      to: 'Distribuidora Central',
      amount: 1500.75,
      currency: 'MWh',
      timestamp: '2024-03-22 14:30:25',
      status: 'confirmed',
      block_number: 15847,
      gas_used: 21000,
      description: 'Venda de energia solar excedente'
    },
    {
      id: '2',
      hash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
      type: 'contract_execution',
      from: 'Sistema Automático',
      to: 'Contrato Manutenção #456',
      amount: 0,
      currency: 'ETH',
      timestamp: '2024-03-22 13:45:12',
      status: 'confirmed',
      block_number: 15846,
      gas_used: 45000,
      description: 'Execução automática de contrato de manutenção'
    },
    {
      id: '3',
      hash: '0x3c4d5e6f7890abcdef1234567890abcdef123456',
      type: 'payment',
      from: 'Cliente Residencial #789',
      to: 'Equatorial Energia',
      amount: 245.80,
      currency: 'BRL',
      timestamp: '2024-03-22 12:15:08',
      status: 'pending',
      block_number: 0,
      gas_used: 0,
      description: 'Pagamento de fatura mensal'
    },
    {
      id: '4',
      hash: '0x4d5e6f7890abcdef1234567890abcdef12345678',
      type: 'certificate',
      from: 'Certificadora Verde',
      to: 'Projeto Eólico Sul',
      amount: 500,
      currency: 'Carbon Credits',
      timestamp: '2024-03-22 11:20:33',
      status: 'confirmed',
      block_number: 15845,
      gas_used: 32000,
      description: 'Emissão de créditos de carbono'
    }
  ]);

  const [smartContracts, setSmartContracts] = useState<SmartContract[]>([
    {
      id: '1',
      name: 'Contrato de Energia Renovável',
      address: '0xA1B2C3D4E5F6789012345678901234567890ABCD',
      type: 'energy_trading',
      description: 'Automatiza compra e venda de energia renovável entre produtores e distribuidoras',
      status: 'active',
      created_at: '2024-01-15',
      last_execution: '2024-03-22 14:30:25',
      executions_count: 1247,
      gas_limit: 500000,
      owner: 'Equatorial Energia',
      version: '2.1.0'
    },
    {
      id: '2',
      name: 'Sistema de Faturamento Inteligente',
      address: '0xB2C3D4E5F6789012345678901234567890ABCDEF',
      type: 'billing',
      description: 'Gera e processa faturas automaticamente baseado no consumo medido',
      status: 'active',
      created_at: '2024-02-01',
      last_execution: '2024-03-22 12:15:08',
      executions_count: 8934,
      gas_limit: 300000,
      owner: 'Equatorial Energia',
      version: '1.8.2'
    },
    {
      id: '3',
      name: 'Contratos de Manutenção Preditiva',
      address: '0xC3D4E5F6789012345678901234567890ABCDEF12',
      type: 'maintenance',
      description: 'Agenda e executa manutenções baseado em dados de sensores IoT',
      status: 'active',
      created_at: '2024-02-20',
      last_execution: '2024-03-22 13:45:12',
      executions_count: 456,
      gas_limit: 400000,
      owner: 'Departamento de Manutenção',
      version: '1.3.1'
    },
    {
      id: '4',
      name: 'Auditoria de Compliance',
      address: '0xD4E5F6789012345678901234567890ABCDEF1234',
      type: 'compliance',
      description: 'Registra e verifica conformidade com regulamentações do setor',
      status: 'testing',
      created_at: '2024-03-10',
      last_execution: '2024-03-21 16:22:45',
      executions_count: 23,
      gas_limit: 250000,
      owner: 'Departamento Legal',
      version: '0.9.5'
    }
  ]);

  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: '1',
      number: 15847,
      hash: '0x1234567890abcdef1234567890abcdef12345678',
      previous_hash: '0x0987654321fedcba0987654321fedcba09876543',
      timestamp: '2024-03-22 14:30:25',
      transactions_count: 12,
      miner: 'Validator Node #3',
      gas_used: 245000,
      gas_limit: 500000,
      size: '2.3 KB',
      difficulty: '15.2T'
    },
    {
      id: '2',
      number: 15846,
      hash: '0x0987654321fedcba0987654321fedcba09876543',
      previous_hash: '0xabcdef1234567890abcdef1234567890abcdef12',
      timestamp: '2024-03-22 14:28:15',
      transactions_count: 8,
      miner: 'Validator Node #1',
      gas_used: 180000,
      gas_limit: 500000,
      size: '1.8 KB',
      difficulty: '15.1T'
    },
    {
      id: '3',
      number: 15845,
      hash: '0xabcdef1234567890abcdef1234567890abcdef12',
      previous_hash: '0x567890abcdef1234567890abcdef1234567890ab',
      timestamp: '2024-03-22 14:26:08',
      transactions_count: 15,
      miner: 'Validator Node #2',
      gas_used: 320000,
      gas_limit: 500000,
      size: '2.9 KB',
      difficulty: '15.0T'
    }
  ]);

  const [carbonCredits, setCarbonCredits] = useState<CarbonCredit[]>([
    {
      id: '1',
      certificate_id: 'VCS-2024-001',
      project_name: 'Parque Eólico Nordeste',
      credits_amount: 1000,
      price_per_credit: 15.50,
      total_value: 15500,
      issuer: 'Verra Registry',
      buyer: 'Empresa Sustentável Ltda',
      issue_date: '2024-03-15',
      expiry_date: '2027-03-15',
      status: 'active',
      verification_standard: 'VCS (Verified Carbon Standard)'
    },
    {
      id: '2',
      certificate_id: 'GS-2024-002',
      project_name: 'Usina Solar Sertão',
      credits_amount: 750,
      price_per_credit: 18.20,
      total_value: 13650,
      issuer: 'Gold Standard Registry',
      buyer: 'Corporação Verde S.A.',
      issue_date: '2024-03-10',
      expiry_date: '2027-03-10',
      status: 'transferred',
      verification_standard: 'Gold Standard'
    },
    {
      id: '3',
      certificate_id: 'CDM-2024-003',
      project_name: 'Bioenergia Amazônia',
      credits_amount: 500,
      price_per_credit: 22.00,
      total_value: 11000,
      issuer: 'UN CDM Registry',
      buyer: 'Indústria Responsável Inc.',
      issue_date: '2024-03-05',
      expiry_date: '2027-03-05',
      status: 'retired',
      verification_standard: 'CDM (Clean Development Mechanism)'
    }
  ]);

  const [networkStats, setNetworkStats] = useState({
    total_transactions: 45678,
    active_contracts: 23,
    network_hash_rate: '125.4 TH/s',
    avg_block_time: '12.3s',
    total_value_locked: 2450000,
    carbon_credits_issued: 15750
  });

  const [selectedPeriod, setSelectedPeriod] = useState('24h');

  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case 'energy_trade': return <Zap className="w-4 h-4" />;
      case 'contract_execution': return <FileText className="w-4 h-4" />;
      case 'payment': return <Coins className="w-4 h-4" />;
      case 'audit_log': return <Shield className="w-4 h-4" />;
      case 'certificate': return <CheckCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'active':
      case 'deployed':
        return 'text-green-600';
      case 'pending':
      case 'testing':
        return 'text-yellow-600';
      case 'failed':
      case 'paused':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'active':
      case 'deployed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
      case 'testing':
        return <Clock className="w-4 h-4" />;
      case 'failed':
      case 'paused':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getContractTypeColor = (type: string) => {
    switch (type) {
      case 'energy_trading': return 'bg-green-100 text-green-800';
      case 'billing': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'compliance': return 'bg-purple-100 text-purple-800';
      case 'carbon_credits': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCreditStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'transferred': return 'bg-blue-100 text-blue-800';
      case 'retired': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const confirmedTransactions = transactions.filter(t => t.status === 'confirmed').length;
  const activeContracts = smartContracts.filter(c => c.status === 'active').length;
  const totalCarbonCredits = carbonCredits.reduce((acc, credit) => acc + credit.credits_amount, 0);
  const latestBlock = blocks[0];

  // Simula atualização de dados em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStats(prev => ({
        ...prev,
        total_transactions: prev.total_transactions + Math.floor(Math.random() * 5),
        network_hash_rate: `${(125 + Math.random() * 10).toFixed(1)} TH/s`,
        avg_block_time: `${(12 + Math.random() * 2).toFixed(1)}s`,
        total_value_locked: prev.total_value_locked + Math.floor(Math.random() * 1000)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Blockchain & Contratos Inteligentes</h1>
            <p className="text-lg text-muted-foreground">Transparência, automação e rastreabilidade descentralizada</p>
          </div>

          {/* Métricas da Rede */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Transações Totais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{networkStats.total_transactions.toLocaleString()}</div>
                <div className="flex items-center mt-2">
                  <Activity className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-muted-foreground">+{Math.floor(Math.random() * 50)} hoje</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Contratos Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{activeContracts}</div>
                <div className="flex items-center mt-2">
                  <FileText className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Executando</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Hash Rate da Rede</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{networkStats.network_hash_rate}</div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Estável</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Valor Bloqueado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">R$ {(networkStats.total_value_locked / 1000).toFixed(0)}K</div>
                <div className="flex items-center mt-2">
                  <Lock className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Em contratos</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transactions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="transactions" className="text-lg py-3">Transações</TabsTrigger>
              <TabsTrigger value="contracts" className="text-lg py-3">Contratos</TabsTrigger>
              <TabsTrigger value="blocks" className="text-lg py-3">Blocos</TabsTrigger>
              <TabsTrigger value="carbon" className="text-lg py-3">Créditos de Carbono</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Transações Recentes</h2>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Última hora</SelectItem>
                    <SelectItem value="24h">Últimas 24 horas</SelectItem>
                    <SelectItem value="7d">Últimos 7 dias</SelectItem>
                    <SelectItem value="30d">Últimos 30 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <Card key={tx.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-blue-600">
                            {getTransactionTypeIcon(tx.type)}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{tx.description}</CardTitle>
                            <CardDescription className="text-base mt-1">
                              Hash: {tx.hash.substring(0, 20)}...
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={
                            tx.type === 'energy_trade' ? 'bg-green-100 text-green-800' :
                            tx.type === 'contract_execution' ? 'bg-blue-100 text-blue-800' :
                            tx.type === 'payment' ? 'bg-yellow-100 text-yellow-800' :
                            tx.type === 'certificate' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {tx.type === 'energy_trade' ? 'Energia' :
                             tx.type === 'contract_execution' ? 'Contrato' :
                             tx.type === 'payment' ? 'Pagamento' :
                             tx.type === 'certificate' ? 'Certificado' : 'Auditoria'}
                          </Badge>
                          <div className={getStatusColor(tx.status)}>
                            {getStatusIcon(tx.status)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-muted-foreground">De:</span>
                            <p className="font-medium">{tx.from}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Para:</span>
                            <p className="font-medium">{tx.to}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Valor:</span>
                            <p className="font-medium">{tx.amount} {tx.currency}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-muted-foreground">Timestamp:</span>
                            <p className="font-medium">{tx.timestamp}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Bloco:</span>
                            <p className="font-medium">{tx.block_number || 'Pendente'}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Gas usado:</span>
                            <p className="font-medium">{tx.gas_used.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Detalhes
                        </Button>
                        <Button variant="outline" size="sm">
                          Verificar Hash
                        </Button>
                        <Button variant="outline" size="sm">
                          Explorar Bloco
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contracts" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Contratos Inteligentes</h2>
                <Button className="text-lg px-6 py-3">
                  Novo Contrato
                </Button>
              </div>
              
              <div className="space-y-6">
                {smartContracts.map((contract) => (
                  <Card key={contract.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{contract.name}</CardTitle>
                          <CardDescription className="text-base mt-1">{contract.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getContractTypeColor(contract.type)}>
                            {contract.type === 'energy_trading' ? 'Energia' :
                             contract.type === 'billing' ? 'Faturamento' :
                             contract.type === 'maintenance' ? 'Manutenção' :
                             contract.type === 'compliance' ? 'Compliance' : 'Créditos'}
                          </Badge>
                          <div className={getStatusColor(contract.status)}>
                            {getStatusIcon(contract.status)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-muted-foreground">Endereço:</span>
                            <p className="font-mono text-sm">{contract.address}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Proprietário:</span>
                            <p className="font-medium">{contract.owner}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Versão:</span>
                            <p className="font-medium">{contract.version}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-muted-foreground">Criado em:</span>
                            <p className="font-medium">{contract.created_at}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Última execução:</span>
                            <p className="font-medium">{contract.last_execution}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Execuções:</span>
                            <p className="font-medium">{contract.executions_count.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Limite de Gas:</span>
                          <span className="font-medium">{contract.gas_limit.toLocaleString()}</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      
                      {contract.status === 'testing' && (
                        <Alert className="mt-4">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription className="text-base">
                            Este contrato está em fase de testes. Use com cautela em produção.
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar Código
                        </Button>
                        <Button variant="outline" size="sm">
                          Histórico
                        </Button>
                        <Button variant="outline" size="sm">
                          Executar
                        </Button>
                        {contract.status === 'active' && (
                          <Button variant="outline" size="sm">
                            Pausar
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="blocks" className="space-y-6">
              <h2 className="text-2xl font-semibold">Explorador de Blocos</h2>
              
              <div className="space-y-4">
                {blocks.map((block) => (
                  <Card key={block.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">Bloco #{block.number}</CardTitle>
                          <CardDescription className="text-base mt-1">
                            Hash: {block.hash.substring(0, 30)}...
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-100 text-blue-800">
                            {block.transactions_count} transações
                          </Badge>
                          <div className="text-green-600">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-muted-foreground">Hash anterior:</span>
                            <p className="font-mono text-sm">{block.previous_hash.substring(0, 30)}...</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Minerador:</span>
                            <p className="font-medium">{block.miner}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Timestamp:</span>
                            <p className="font-medium">{block.timestamp}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-muted-foreground">Tamanho:</span>
                            <p className="font-medium">{block.size}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Dificuldade:</span>
                            <p className="font-medium">{block.difficulty}</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Gas usado:</span>
                            <span className="font-medium">{block.gas_used.toLocaleString()} / {block.gas_limit.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Progress value={(block.gas_used / block.gas_limit) * 100} className="h-2" />
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Transações
                        </Button>
                        <Button variant="outline" size="sm">
                          Detalhes Técnicos
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Exportar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="carbon" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Créditos de Carbono</h2>
                <Button className="text-lg px-6 py-3">
                  Emitir Créditos
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {carbonCredits.map((credit) => (
                  <Card key={credit.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{credit.project_name}</CardTitle>
                          <CardDescription className="text-base mt-1">
                            Certificado: {credit.certificate_id}
                          </CardDescription>
                        </div>
                        <Badge className={getCreditStatusColor(credit.status)}>
                          {credit.status === 'active' ? 'Ativo' :
                           credit.status === 'transferred' ? 'Transferido' :
                           credit.status === 'retired' ? 'Aposentado' : 'Expirado'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm text-muted-foreground">Créditos:</span>
                            <p className="font-bold text-lg">{credit.credits_amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Valor total:</span>
                            <p className="font-bold text-lg">R$ {credit.total_value.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Preço por crédito:</span>
                            <span className="font-medium">R$ {credit.price_per_credit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Emissor:</span>
                            <span className="font-medium">{credit.issuer}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Comprador:</span>
                            <span className="font-medium">{credit.buyer}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Data de emissão:</span>
                            <span className="font-medium">{credit.issue_date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Data de expiração:</span>
                            <span className="font-medium">{credit.expiry_date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Padrão:</span>
                            <span className="font-medium">{credit.verification_standard}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Certificado
                          </Button>
                          <Button variant="outline" size="sm">
                            Transferir
                          </Button>
                          <Button variant="outline" size="sm">
                            Histórico
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Blockchain;