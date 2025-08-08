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
  FileText, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Download,
  Upload,
  Eye,
  Calendar,
  BarChart3,
  TrendingUp
} from "lucide-react";

interface ComplianceRule {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'compliant' | 'non_compliant' | 'warning' | 'pending';
  lastCheck: string;
  nextCheck: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  regulation: string;
  compliance_score: number;
}

interface AuditReport {
  id: string;
  title: string;
  type: 'internal' | 'external' | 'regulatory';
  status: 'completed' | 'in_progress' | 'scheduled' | 'overdue';
  date: string;
  auditor: string;
  findings: number;
  critical_issues: number;
  score: number;
}

interface Violation {
  id: string;
  rule: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  detected_at: string;
  status: 'open' | 'in_progress' | 'resolved' | 'false_positive';
  assigned_to: string;
  due_date: string;
}

const Compliance = () => {
  const [complianceRules, setComplianceRules] = useState<ComplianceRule[]>([
    {
      id: '1',
      name: 'ANEEL - Qualidade do Fornecimento',
      category: 'Qualidade de Energia',
      description: 'Monitoramento contínuo dos indicadores DEC e FEC',
      status: 'compliant',
      lastCheck: '2 horas atrás',
      nextCheck: '6 horas',
      severity: 'high',
      regulation: 'ANEEL Resolução 956/2021',
      compliance_score: 96.8
    },
    {
      id: '2',
      name: 'ONS - Procedimentos de Rede',
      category: 'Operação',
      description: 'Conformidade com procedimentos operacionais do ONS',
      status: 'warning',
      lastCheck: '1 hora atrás',
      nextCheck: '4 horas',
      severity: 'medium',
      regulation: 'ONS Procedimentos de Rede',
      compliance_score: 87.3
    },
    {
      id: '3',
      name: 'LGPD - Proteção de Dados',
      category: 'Privacidade',
      description: 'Proteção de dados pessoais dos consumidores',
      status: 'compliant',
      lastCheck: '30 min atrás',
      nextCheck: '24 horas',
      severity: 'critical',
      regulation: 'Lei 13.709/2018 (LGPD)',
      compliance_score: 98.2
    },
    {
      id: '4',
      name: 'ISO 27001 - Segurança da Informação',
      category: 'Segurança',
      description: 'Gestão de segurança da informação',
      status: 'non_compliant',
      lastCheck: '4 horas atrás',
      nextCheck: '2 horas',
      severity: 'high',
      regulation: 'ISO/IEC 27001:2013',
      compliance_score: 73.5
    },
    {
      id: '5',
      name: 'Tarifação - Estrutura Tarifária',
      category: 'Comercial',
      description: 'Conformidade na aplicação de tarifas',
      status: 'pending',
      lastCheck: '6 horas atrás',
      nextCheck: '1 hora',
      severity: 'medium',
      regulation: 'ANEEL Resolução 1000/2021',
      compliance_score: 0
    }
  ]);

  const [auditReports, setAuditReports] = useState<AuditReport[]>([
    {
      id: '1',
      title: 'Auditoria Anual de Conformidade ANEEL',
      type: 'regulatory',
      status: 'completed',
      date: '15/03/2024',
      auditor: 'ANEEL - Agência Reguladora',
      findings: 12,
      critical_issues: 2,
      score: 87.5
    },
    {
      id: '2',
      title: 'Auditoria Interna - Q1 2024',
      type: 'internal',
      status: 'in_progress',
      date: '20/03/2024',
      auditor: 'Equipe Interna de Auditoria',
      findings: 8,
      critical_issues: 0,
      score: 92.3
    },
    {
      id: '3',
      title: 'Certificação ISO 27001',
      type: 'external',
      status: 'scheduled',
      date: '10/04/2024',
      auditor: 'Bureau Veritas',
      findings: 0,
      critical_issues: 0,
      score: 0
    },
    {
      id: '4',
      title: 'Auditoria LGPD - Proteção de Dados',
      type: 'external',
      status: 'overdue',
      date: '01/03/2024',
      auditor: 'Consultoria Especializada',
      findings: 0,
      critical_issues: 0,
      score: 0
    }
  ]);

  const [violations, setViolations] = useState<Violation[]>([
    {
      id: '1',
      rule: 'ANEEL - Tempo de Resposta',
      description: 'Tempo de resposta a reclamações excedeu 5 dias úteis',
      severity: 'medium',
      detected_at: '22/03/2024 14:30',
      status: 'in_progress',
      assigned_to: 'João Silva - Atendimento',
      due_date: '30/03/2024'
    },
    {
      id: '2',
      rule: 'ISO 27001 - Backup de Dados',
      description: 'Falha no backup automático de dados críticos',
      severity: 'high',
      detected_at: '21/03/2024 09:15',
      status: 'open',
      assigned_to: 'Maria Santos - TI',
      due_date: '25/03/2024'
    },
    {
      id: '3',
      rule: 'ONS - Relatório Operacional',
      description: 'Atraso no envio de relatório mensal ao ONS',
      severity: 'critical',
      detected_at: '20/03/2024 16:45',
      status: 'resolved',
      assigned_to: 'Carlos Oliveira - Operação',
      due_date: '22/03/2024'
    }
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [complianceScore, setComplianceScore] = useState(89.2);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'completed':
      case 'resolved':
        return 'text-green-600';
      case 'warning':
      case 'in_progress':
        return 'text-yellow-600';
      case 'non_compliant':
      case 'overdue':
      case 'open':
        return 'text-red-600';
      case 'pending':
      case 'scheduled':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'completed':
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      case 'non_compliant':
      case 'overdue':
      case 'open':
        return <AlertTriangle className="w-4 h-4" />;
      case 'pending':
      case 'scheduled':
        return <Calendar className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const compliantRules = complianceRules.filter(rule => rule.status === 'compliant').length;
  const nonCompliantRules = complianceRules.filter(rule => rule.status === 'non_compliant').length;
  const openViolations = violations.filter(v => v.status === 'open').length;
  const overdueAudits = auditReports.filter(audit => audit.status === 'overdue').length;

  // Simula atualização de dados
  useEffect(() => {
    const interval = setInterval(() => {
      setComplianceScore(prev => Math.max(80, Math.min(100, prev + (Math.random() - 0.5) * 2)));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Compliance & Auditoria</h1>
            <p className="text-lg text-muted-foreground">Monitoramento de conformidade regulatória e gestão de auditorias</p>
          </div>

          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Score de Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{complianceScore.toFixed(1)}%</div>
                <Progress value={complianceScore} className="mt-2" />
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-muted-foreground">+2.3% este mês</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Regras Conformes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{compliantRules}/{complianceRules.length}</div>
                <div className="flex items-center mt-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Em conformidade</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Violações Abertas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{openViolations}</div>
                <div className="flex items-center mt-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Requer atenção</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Auditorias Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{overdueAudits}</div>
                <div className="flex items-center mt-2">
                  <Calendar className="w-4 h-4 text-yellow-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Em atraso</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="rules" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="rules" className="text-lg py-3">Regras de Compliance</TabsTrigger>
              <TabsTrigger value="audits" className="text-lg py-3">Auditorias</TabsTrigger>
              <TabsTrigger value="violations" className="text-lg py-3">Violações</TabsTrigger>
              <TabsTrigger value="reports" className="text-lg py-3">Relatórios</TabsTrigger>
            </TabsList>

            <TabsContent value="rules" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Regras de Conformidade</h2>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Últimos 7 dias</SelectItem>
                    <SelectItem value="30d">Últimos 30 dias</SelectItem>
                    <SelectItem value="90d">Últimos 90 dias</SelectItem>
                    <SelectItem value="1y">Último ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                {complianceRules.map((rule) => (
                  <Card key={rule.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={getStatusColor(rule.status)}>
                            {getStatusIcon(rule.status)}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{rule.name}</CardTitle>
                            <CardDescription className="text-base mt-1">{rule.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(rule.severity)}>
                            {rule.severity === 'critical' ? 'Crítica' :
                             rule.severity === 'high' ? 'Alta' :
                             rule.severity === 'medium' ? 'Média' : 'Baixa'}
                          </Badge>
                          <Badge 
                            variant={rule.status === 'compliant' ? 'default' : 
                                    rule.status === 'warning' ? 'secondary' : 'destructive'}
                          >
                            {rule.status === 'compliant' ? 'Conforme' :
                             rule.status === 'warning' ? 'Atenção' :
                             rule.status === 'non_compliant' ? 'Não Conforme' : 'Pendente'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-muted-foreground">Categoria:</span>
                            <p className="font-medium">{rule.category}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Regulamentação:</span>
                            <p className="font-medium">{rule.regulation}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Score de conformidade:</span>
                            <span className="font-medium text-lg">{rule.compliance_score}%</span>
                          </div>
                          <Progress value={rule.compliance_score} className="h-2" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Última verificação:</span>
                            <span className="font-medium">{rule.lastCheck}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Próxima verificação:</span>
                            <span className="font-medium">{rule.nextCheck}</span>
                          </div>
                        </div>
                      </div>
                      
                      {rule.status === 'non_compliant' && (
                        <Alert className="mt-4">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription className="text-base">
                            Esta regra está em não conformidade. Ação imediata necessária.
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Detalhes
                        </Button>
                        <Button variant="outline" size="sm">
                          Verificar Agora
                        </Button>
                        <Button variant="outline" size="sm">
                          Histórico
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="audits" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Auditorias</h2>
                <Button className="text-lg px-6 py-3">Nova Auditoria</Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {auditReports.map((audit) => (
                  <Card key={audit.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{audit.title}</CardTitle>
                          <CardDescription className="text-base mt-1">
                            {audit.auditor} • {audit.date}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            className={
                              audit.type === 'regulatory' ? 'bg-red-100 text-red-800' :
                              audit.type === 'external' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }
                          >
                            {audit.type === 'regulatory' ? 'Regulatória' :
                             audit.type === 'external' ? 'Externa' : 'Interna'}
                          </Badge>
                          <div className={getStatusColor(audit.status)}>
                            {getStatusIcon(audit.status)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          <Badge 
                            variant={audit.status === 'completed' ? 'default' : 
                                    audit.status === 'in_progress' ? 'secondary' : 
                                    audit.status === 'overdue' ? 'destructive' : 'outline'}
                          >
                            {audit.status === 'completed' ? 'Concluída' :
                             audit.status === 'in_progress' ? 'Em Andamento' :
                             audit.status === 'overdue' ? 'Em Atraso' : 'Agendada'}
                          </Badge>
                        </div>
                        
                        {audit.status === 'completed' && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Score final:</span>
                              <span className="font-bold text-lg">{audit.score}%</span>
                            </div>
                            <Progress value={audit.score} className="h-2" />
                            
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Achados:</span>
                              <span className="font-medium">{audit.findings}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Questões críticas:</span>
                              <span className="font-medium text-red-600">{audit.critical_issues}</span>
                            </div>
                          </>
                        )}
                        
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Relatório
                          </Button>
                          {audit.status === 'completed' && (
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="violations" className="space-y-6">
              <h2 className="text-2xl font-semibold">Violações de Compliance</h2>
              
              <div className="space-y-4">
                {violations.map((violation) => (
                  <Card key={violation.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={getStatusColor(violation.status)}>
                            {getStatusIcon(violation.status)}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{violation.rule}</CardTitle>
                            <CardDescription className="text-base mt-1">{violation.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(violation.severity)}>
                            {violation.severity === 'critical' ? 'Crítica' :
                             violation.severity === 'high' ? 'Alta' :
                             violation.severity === 'medium' ? 'Média' : 'Baixa'}
                          </Badge>
                          <Badge 
                            variant={violation.status === 'resolved' ? 'default' : 
                                    violation.status === 'in_progress' ? 'secondary' : 'destructive'}
                          >
                            {violation.status === 'resolved' ? 'Resolvida' :
                             violation.status === 'in_progress' ? 'Em Progresso' :
                             violation.status === 'false_positive' ? 'Falso Positivo' : 'Aberta'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-muted-foreground">Detectada em:</span>
                            <p className="font-medium">{violation.detected_at}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Responsável:</span>
                            <p className="font-medium">{violation.assigned_to}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-muted-foreground">Prazo para resolução:</span>
                            <p className="font-medium">{violation.due_date}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Status:</span>
                            <p className="font-medium">
                              {violation.status === 'resolved' ? 'Resolvida' :
                               violation.status === 'in_progress' ? 'Em Progresso' :
                               violation.status === 'false_positive' ? 'Falso Positivo' : 'Aberta'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {violation.severity === 'critical' && violation.status === 'open' && (
                        <Alert className="mt-4">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription className="text-base">
                            Violação crítica! Resolução urgente necessária antes do prazo.
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm">
                          Atribuir
                        </Button>
                        <Button variant="outline" size="sm">
                          Comentar
                        </Button>
                        <Button variant="outline" size="sm">
                          Histórico
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <h2 className="text-2xl font-semibold">Relatórios de Compliance</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Relatórios Disponíveis
                    </CardTitle>
                    <CardDescription>Documentos e relatórios de conformidade</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Relatório Mensal - Março 2024</p>
                          <p className="text-sm text-muted-foreground">Compliance geral do sistema</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Auditoria ANEEL - 2024</p>
                          <p className="text-sm text-muted-foreground">Relatório regulatório completo</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Dashboard Executivo</p>
                          <p className="text-sm text-muted-foreground">Métricas e KPIs de compliance</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Gerar Relatórios
                    </CardTitle>
                    <CardDescription>Criar novos relatórios personalizados</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription className="text-base">
                        Relatórios são gerados automaticamente e podem ser personalizados 
                        conforme necessidades específicas.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-3">
                      <Button className="w-full text-lg py-6">
                        Relatório Personalizado
                      </Button>
                      <Button variant="outline" className="w-full text-lg py-6">
                        Relatório Regulatório
                      </Button>
                      <Button variant="outline" className="w-full text-lg py-6">
                        Dashboard Executivo
                      </Button>
                      <Button variant="outline" className="w-full text-lg py-6">
                        Exportar Dados
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Compliance;