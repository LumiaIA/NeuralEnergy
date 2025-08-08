import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Play, 
  Pause, 
  Square, 
  Zap, 
  CheckCircle,
  AlertCircle,
  Clock,
  Activity,
  Cpu,
  Network,
  Shield
} from "lucide-react";

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'error';
  trigger: string;
  action: string;
  lastExecuted: string;
  executionCount: number;
  successRate: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface SystemProcess {
  id: string;
  name: string;
  type: 'monitoring' | 'control' | 'optimization' | 'maintenance';
  status: 'running' | 'stopped' | 'error' | 'scheduled';
  progress: number;
  startTime: string;
  duration: string;
  resourceUsage: number;
}

interface NetworkNode {
  id: string;
  name: string;
  type: 'substation' | 'transformer' | 'generator' | 'load';
  status: 'online' | 'offline' | 'maintenance' | 'error';
  load: number;
  capacity: number;
  efficiency: number;
  lastUpdate: string;
}

const Orquestracao = () => {
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Balanceamento Automático de Carga',
      description: 'Redistribui carga quando detectada sobrecarga > 85%',
      status: 'active',
      trigger: 'Sobrecarga detectada',
      action: 'Redistribuir para subestações vizinhas',
      lastExecuted: '2 horas atrás',
      executionCount: 247,
      successRate: 98.4,
      priority: 'high'
    },
    {
      id: '2',
      name: 'Resposta à Demanda Crítica',
      description: 'Ativa geração de backup em picos de demanda',
      status: 'active',
      trigger: 'Demanda > 2500 MW',
      action: 'Ativar geradores de backup',
      lastExecuted: '6 horas atrás',
      executionCount: 89,
      successRate: 96.7,
      priority: 'critical'
    },
    {
      id: '3',
      name: 'Otimização Noturna',
      description: 'Reduz capacidade durante baixa demanda (00h-06h)',
      status: 'active',
      trigger: 'Horário programado',
      action: 'Reduzir capacidade em 30%',
      lastExecuted: '8 horas atrás',
      executionCount: 1456,
      successRate: 99.2,
      priority: 'medium'
    },
    {
      id: '4',
      name: 'Isolamento de Falhas',
      description: 'Isola automaticamente setores com falhas detectadas',
      status: 'error',
      trigger: 'Falha de equipamento',
      action: 'Isolar setor afetado',
      lastExecuted: '2 dias atrás',
      executionCount: 23,
      successRate: 87.5,
      priority: 'critical'
    }
  ]);

  const [systemProcesses, setSystemProcesses] = useState<SystemProcess[]>([
    {
      id: '1',
      name: 'Monitoramento Contínuo da Rede',
      type: 'monitoring',
      status: 'running',
      progress: 100,
      startTime: '00:00:00',
      duration: '24h contínuo',
      resourceUsage: 15
    },
    {
      id: '2',
      name: 'Controle de Tensão Automático',
      type: 'control',
      status: 'running',
      progress: 100,
      startTime: '00:00:00',
      duration: '24h contínuo',
      resourceUsage: 22
    },
    {
      id: '3',
      name: 'Otimização de Fluxo de Potência',
      type: 'optimization',
      status: 'running',
      progress: 75,
      startTime: '14:00:00',
      duration: '2h',
      resourceUsage: 45
    },
    {
      id: '4',
      name: 'Manutenção Preventiva Programada',
      type: 'maintenance',
      status: 'scheduled',
      progress: 0,
      startTime: '02:00:00',
      duration: '4h',
      resourceUsage: 0
    }
  ]);

  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([
    {
      id: '1',
      name: 'Subestação Norte',
      type: 'substation',
      status: 'online',
      load: 850,
      capacity: 1000,
      efficiency: 96.2,
      lastUpdate: '1 min atrás'
    },
    {
      id: '2',
      name: 'Transformador Central T-15',
      type: 'transformer',
      status: 'maintenance',
      load: 0,
      capacity: 500,
      efficiency: 0,
      lastUpdate: '2 horas atrás'
    },
    {
      id: '3',
      name: 'Gerador Backup G-03',
      type: 'generator',
      status: 'offline',
      load: 0,
      capacity: 300,
      efficiency: 0,
      lastUpdate: '5 min atrás'
    },
    {
      id: '4',
      name: 'Zona Industrial',
      type: 'load',
      status: 'online',
      load: 1200,
      capacity: 1500,
      efficiency: 94.8,
      lastUpdate: '30 seg atrás'
    }
  ]);

  const [isAutoMode, setIsAutoMode] = useState(true);
  const [systemHealth, setSystemHealth] = useState({
    overall: 94.2,
    automation: 96.8,
    monitoring: 98.1,
    control: 92.5
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'running':
      case 'online':
        return 'text-green-600';
      case 'inactive':
      case 'stopped':
      case 'offline':
        return 'text-gray-600';
      case 'error':
        return 'text-red-600';
      case 'scheduled':
      case 'maintenance':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'running':
      case 'online':
        return <CheckCircle className="w-4 h-4" />;
      case 'inactive':
      case 'stopped':
      case 'offline':
        return <Square className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      case 'scheduled':
      case 'maintenance':
        return <Clock className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'monitoring': return <Activity className="w-5 h-5" />;
      case 'control': return <Settings className="w-5 h-5" />;
      case 'optimization': return <Zap className="w-5 h-5" />;
      case 'maintenance': return <Shield className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  const activeRules = automationRules.filter(rule => rule.status === 'active').length;
  const runningProcesses = systemProcesses.filter(process => process.status === 'running').length;
  const onlineNodes = networkNodes.filter(node => node.status === 'online').length;
  const avgSuccessRate = automationRules.reduce((sum, rule) => sum + rule.successRate, 0) / automationRules.length;

  // Simula atualização de dados em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkNodes(prev => prev.map(node => ({
        ...node,
        load: node.status === 'online' ? 
          Math.max(0, Math.min(node.capacity, node.load + (Math.random() - 0.5) * 50)) : 0,
        efficiency: node.status === 'online' ? 
          Math.max(85, Math.min(99, node.efficiency + (Math.random() - 0.5) * 2)) : 0
      })));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Orquestração Inteligente</h1>
                <p className="text-lg text-muted-foreground">Automação e controle inteligente da infraestrutura elétrica</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Modo Automático</span>
                  <Switch 
                    checked={isAutoMode} 
                    onCheckedChange={setIsAutoMode}
                    className="data-[state=checked]:bg-green-600"
                  />
                </div>
                <Badge 
                  variant={isAutoMode ? 'default' : 'secondary'}
                  className="text-sm px-3 py-1"
                >
                  {isAutoMode ? 'AUTOMÁTICO' : 'MANUAL'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Regras Ativas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{activeRules}/{automationRules.length}</div>
                <div className="flex items-center mt-2">
                  <Settings className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Automações</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Processos Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{runningProcesses}</div>
                <div className="flex items-center mt-2">
                  <Activity className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Em execução</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Nós Online</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{onlineNodes}/{networkNodes.length}</div>
                <div className="flex items-center mt-2">
                  <Network className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Conectados</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Sucesso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{avgSuccessRate.toFixed(1)}%</div>
                <Progress value={avgSuccessRate} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="automation" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="automation" className="text-lg py-3">Automação</TabsTrigger>
              <TabsTrigger value="processes" className="text-lg py-3">Processos</TabsTrigger>
              <TabsTrigger value="network" className="text-lg py-3">Rede</TabsTrigger>
              <TabsTrigger value="control" className="text-lg py-3">Controle</TabsTrigger>
            </TabsList>

            <TabsContent value="automation" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Regras de Automação</h2>
                <Button className="text-lg px-6 py-3">Nova Regra</Button>
              </div>
              
              <div className="space-y-4">
                {automationRules.map((rule) => (
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
                          <Badge className={getPriorityColor(rule.priority)}>
                            {rule.priority === 'critical' ? 'Crítica' :
                             rule.priority === 'high' ? 'Alta' :
                             rule.priority === 'medium' ? 'Média' : 'Baixa'}
                          </Badge>
                          <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                            {rule.status === 'active' ? 'Ativa' : 
                             rule.status === 'error' ? 'Erro' : 'Inativa'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-muted-foreground">Gatilho:</span>
                            <p className="font-medium">{rule.trigger}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Ação:</span>
                            <p className="font-medium">{rule.action}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Execuções:</span>
                            <span className="font-medium">{rule.executionCount}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Taxa de sucesso:</span>
                            <span className="font-medium">{rule.successRate}%</span>
                          </div>
                          <Progress value={rule.successRate} className="h-2" />
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Última execução:</span>
                            <span className="font-medium">{rule.lastExecuted}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button 
                          variant={rule.status === 'active' ? 'outline' : 'default'} 
                          size="sm"
                        >
                          {rule.status === 'active' ? 'Pausar' : 'Ativar'}
                        </Button>
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="outline" size="sm">Testar</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="processes" className="space-y-6">
              <h2 className="text-2xl font-semibold">Processos do Sistema</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {systemProcesses.map((process) => (
                  <Card key={process.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-blue-600">
                            {getTypeIcon(process.type)}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{process.name}</CardTitle>
                            <CardDescription className="text-base">
                              {process.type === 'monitoring' ? 'Monitoramento' :
                               process.type === 'control' ? 'Controle' :
                               process.type === 'optimization' ? 'Otimização' : 'Manutenção'}
                            </CardDescription>
                          </div>
                        </div>
                        <div className={getStatusColor(process.status)}>
                          {getStatusIcon(process.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          <Badge variant={process.status === 'running' ? 'default' : 'secondary'}>
                            {process.status === 'running' ? 'Executando' :
                             process.status === 'stopped' ? 'Parado' :
                             process.status === 'error' ? 'Erro' : 'Agendado'}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Progresso:</span>
                          <span className="font-medium">{process.progress}%</span>
                        </div>
                        <Progress value={process.progress} className="h-2" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Início:</span>
                          <span className="font-medium">{process.startTime}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Duração:</span>
                          <span className="font-medium">{process.duration}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Uso de recursos:</span>
                          <span className="font-medium">{process.resourceUsage}%</span>
                        </div>
                        <Progress value={process.resourceUsage} className="h-2" />
                        
                        <div className="flex gap-2 mt-4">
                          {process.status === 'running' ? (
                            <Button variant="outline" size="sm">
                              <Pause className="w-4 h-4 mr-2" />
                              Pausar
                            </Button>
                          ) : (
                            <Button size="sm">
                              <Play className="w-4 h-4 mr-2" />
                              Iniciar
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Square className="w-4 h-4 mr-2" />
                            Parar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="network" className="space-y-6">
              <h2 className="text-2xl font-semibold">Estado da Rede</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {networkNodes.map((node) => {
                  const loadPercentage = (node.load / node.capacity) * 100;
                  return (
                    <Card key={node.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl">{node.name}</CardTitle>
                            <CardDescription className="text-base">
                              {node.type === 'substation' ? 'Subestação' :
                               node.type === 'transformer' ? 'Transformador' :
                               node.type === 'generator' ? 'Gerador' : 'Carga'}
                            </CardDescription>
                          </div>
                          <div className={getStatusColor(node.status)}>
                            {getStatusIcon(node.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Status:</span>
                            <Badge 
                              variant={node.status === 'online' ? 'default' : 
                                      node.status === 'maintenance' ? 'secondary' : 'outline'}
                            >
                              {node.status === 'online' ? 'Online' :
                               node.status === 'offline' ? 'Offline' :
                               node.status === 'maintenance' ? 'Manutenção' : 'Erro'}
                            </Badge>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Carga atual:</span>
                            <span className="font-medium">{node.load} / {node.capacity} MW</span>
                          </div>
                          <Progress value={loadPercentage} className="h-2" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Eficiência:</span>
                            <span className="font-medium">{node.efficiency.toFixed(1)}%</span>
                          </div>
                          <Progress value={node.efficiency} className="h-2" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Última atualização:</span>
                            <span className="font-medium">{node.lastUpdate}</span>
                          </div>
                          
                          {loadPercentage > 85 && node.status === 'online' && (
                            <Alert>
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription className="text-base">
                                Carga elevada detectada. Considere redistribuição.
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="control" className="space-y-6">
              <h2 className="text-2xl font-semibold">Centro de Controle</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Saúde do Sistema</CardTitle>
                    <CardDescription>Indicadores gerais de performance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Saúde geral:</span>
                        <span className="font-medium text-lg">{systemHealth.overall}%</span>
                      </div>
                      <Progress value={systemHealth.overall} className="h-3" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Automação:</span>
                        <span className="font-medium">{systemHealth.automation}%</span>
                      </div>
                      <Progress value={systemHealth.automation} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Monitoramento:</span>
                        <span className="font-medium">{systemHealth.monitoring}%</span>
                      </div>
                      <Progress value={systemHealth.monitoring} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Controle:</span>
                        <span className="font-medium">{systemHealth.control}%</span>
                      </div>
                      <Progress value={systemHealth.control} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                    <CardDescription>Controles manuais de emergência</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription className="text-base">
                        Modo automático ativo. Intervenções manuais serão registradas.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-3">
                      <Button className="w-full text-lg py-6" variant="destructive">
                        Parada de Emergência
                      </Button>
                      <Button className="w-full text-lg py-6" variant="outline">
                        Balanceamento Manual
                      </Button>
                      <Button className="w-full text-lg py-6" variant="outline">
                        Ativar Backup
                      </Button>
                      <Button className="w-full text-lg py-6" variant="outline">
                        Resetar Sistema
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

export default Orquestracao;