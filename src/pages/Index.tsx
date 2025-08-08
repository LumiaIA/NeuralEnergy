import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ModuleCard } from "@/components/ModuleCard";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Zap, 
  Shield, 
  Brain, 
  FileText, 
  GraduationCap, 
  Settings,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Cpu,
  Network,
  Thermometer,
  Battery,
  Gauge,
  RefreshCw,
  Bell,
  Eye,
  BarChart3,
  LineChart,
  PieChart,
  Calendar,
  MapPin,
  Wifi
} from "lucide-react";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemHealth, setSystemHealth] = useState({
    overall: 96.8,
    network: 98.2,
    generation: 94.5,
    distribution: 97.1
  });
  const [realTimeData, setRealTimeData] = useState({
    totalGeneration: 2847.5,
    totalConsumption: 2653.2,
    networkLoad: 85.3,
    renewablePercentage: 67.8,
    activeFaults: 3,
    maintenanceScheduled: 12,
    connectedDevices: 2847,
    operationalEfficiency: 94.7
  });
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'warning',
      message: 'Transformador T-15 programado para manutenção em 2 horas',
      time: '14:30',
      priority: 'medium',
      location: 'Subestação Norte'
    },
    {
      id: '2',
      type: 'info',
      message: 'Pico de demanda previsto para 18:00 - 19:00',
      time: '14:25',
      priority: 'low',
      location: 'Zona Central'
    },
    {
      id: '3',
      type: 'success',
      message: 'Sistema de backup ativado com sucesso na Zona Norte',
      time: '14:20',
      priority: 'high',
      location: 'Zona Norte'
    }
  ]);

  // Atualiza o relógio em tempo real
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simula atualização de dados em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        totalGeneration: Math.max(2500, Math.min(3200, prev.totalGeneration + (Math.random() - 0.5) * 50)),
        totalConsumption: Math.max(2400, Math.min(3000, prev.totalConsumption + (Math.random() - 0.5) * 40)),
        networkLoad: Math.max(70, Math.min(95, prev.networkLoad + (Math.random() - 0.5) * 5)),
        renewablePercentage: Math.max(60, Math.min(80, prev.renewablePercentage + (Math.random() - 0.5) * 2)),
        operationalEfficiency: Math.max(90, Math.min(98, prev.operationalEfficiency + (Math.random() - 0.5) * 1))
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const modules = [
    {
      icon: Database,
      title: "Integração & Coleta Multimodal",
      description: "Conecta com todo hardware existente: câmeras, sensores térmicos/acústicos, IoT, drones, robôs, sensores de corrente/tensão.",
      path: "/integracao-coleta",
      features: [
        "Plug & play para dispositivos novos e antigos",
        "IA embarcada com pré-filtragem inteligente",
        "Coleta automática 24/7 segura",
        "Eliminação de deslocamento humano"
      ]
    },
    {
      icon: Cpu,
      title: "Processamento Inteligente Híbrido",
      description: "Análise inicial edge computing com latência quase zero, sincronização inteligente com nuvem para análise preditiva avançada.",
      path: "/processamento-hibrido",
      features: [
        "Detecção de eventos críticos em tempo real",
        "Resiliência operacional offline",
        "Algoritmos de IA avançados na nuvem",
        "Redução de custos de comunicação"
      ]
    },
    {
      icon: Brain,
      title: "Inteligência Neural Preditiva",
      description: "Redes neurais profundas treinadas com históricos, detectando padrões de falha e calculando risco real de ativos.",
      path: "/ia-preditiva",
      features: [
        "Aprendizado contínuo adaptativo",
        "Previsão de tempo de vida útil",
        "Priorização baseada em DEC/FEC",
        "Decisões validadas via blockchain"
      ]
    },
    {
      icon: Settings,
      title: "Orquestração Automatizada",
      description: "Geração automática de ordens de serviço priorizadas, alertas instantâneos e roteiros personalizados para equipes.",
      path: "/orquestracao",
      features: [
        "Priorização por criticidade inteligente",
        "Alertas multi-canal instantâneos",
        "Checklist personalizado por contexto",
        "Registro blockchain de decisões"
      ]
    },
    {
      icon: Shield,
      title: "Compliance & Relatórios",
      description: "Geração automática de relatórios para ANEEL, rastreamento completo do ciclo de vida com integridade garantida.",
      path: "/compliance",
      features: [
        "Relatórios ANEEL automatizados",
        "Rastreabilidade total de decisões",
        "Portal regulatório dedicado",
        "Eliminação de retrabalho"
      ]
    },
    {
      icon: GraduationCap,
      title: "Centralização do Conhecimento",
      description: "Banco central de histórico enriquecido, treinamentos personalizados e gêmeo digital dinâmico dos ativos.",
      path: "/conhecimento",
      features: [
        "Histórico validado e auditável",
        "Treinamentos baseados em eventos reais",
        "Gêmeo digital com contexto visual",
        "Patrimônio institucional preservado"
      ]
    },
    {
      icon: FileText,
      title: "Auditoria Imutável Blockchain",
      description: "Registro via blockchain permissionada de eventos críticos, decisões de IA e alterações relevantes com validação independente.",
      path: "/blockchain",
      features: [
        "Confiança absoluta em registros",
        "Auditabilidade granular não repudiável",
        "Compliance com transparência algorítmica",
        "Eliminação de fraudes e manipulações"
      ]
    }
  ];

  const stats = [
    {
      title: "Eficiência Operacional",
      value: `${realTimeData.operationalEfficiency.toFixed(1)}%`,
      change: "+2.3%",
      trend: "up" as const,
      icon: TrendingUp
    },
    {
      title: "Dispositivos Conectados",
      value: realTimeData.connectedDevices.toLocaleString(),
      change: "+15",
      trend: "up" as const,
      icon: Network
    },
    {
      title: "Alertas Ativos",
      value: realTimeData.activeFaults.toString(),
      change: "-2",
      trend: "down" as const,
      icon: AlertTriangle
    },
    {
      title: "Conformidade",
      value: "99.2%",
      change: "+0.5%",
      trend: "up" as const,
      icon: Shield
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info': return <Bell className="w-5 h-5 text-blue-600" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      case 'success': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho com Data e Hora */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Dashboard - Sistema NeuralEnergy
              </h1>
              <p className="text-xl text-muted-foreground">
                Visão geral completa do sistema inteligente de gestão energética
              </p>
            </div>
          </div>
          </div>

          {/* Painel de Controle Principal */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 h-12">
              <TabsTrigger value="overview" className="text-lg font-medium">Visão Geral</TabsTrigger>
              <TabsTrigger value="realtime" className="text-lg font-medium">Tempo Real</TabsTrigger>
              <TabsTrigger value="alerts" className="text-lg font-medium">Alertas</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Estatísticas Principais */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <StatsCard key={index} {...stat} />
                ))}
              </div>

              {/* Saúde do Sistema */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Activity className="w-7 h-7" />
                      Saúde Geral do Sistema
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Status operacional de todos os componentes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-green-600 mb-3">
                        {systemHealth.overall}%
                      </div>
                      <div className="text-xl text-muted-foreground">Saúde Geral</div>
                    </div>
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">Rede de Distribuição</span>
                        <div className="flex items-center gap-4">
                          <Progress value={systemHealth.network} className="w-32 h-3" />
                          <Badge variant="outline" className="text-green-600 text-base px-3 py-1">{systemHealth.network}%</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">Sistemas de Geração</span>
                        <div className="flex items-center gap-4">
                          <Progress value={systemHealth.generation} className="w-32 h-3" />
                          <Badge variant="outline" className="text-green-600 text-base px-3 py-1">{systemHealth.generation}%</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">Distribuição</span>
                        <div className="flex items-center gap-4">
                          <Progress value={systemHealth.distribution} className="w-32 h-3" />
                          <Badge variant="outline" className="text-green-600 text-base px-3 py-1">{systemHealth.distribution}%</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <BarChart3 className="w-7 h-7" />
                      Indicadores Operacionais
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Métricas principais do sistema elétrico
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-6 bg-blue-50 rounded-xl">
                        <Zap className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-blue-600">
                          {realTimeData.totalGeneration.toFixed(0)}
                        </div>
                        <div className="text-base text-muted-foreground font-medium">MW Gerados</div>
                      </div>
                      <div className="text-center p-6 bg-green-50 rounded-xl">
                        <Activity className="w-10 h-10 text-green-600 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-green-600">
                          {realTimeData.totalConsumption.toFixed(0)}
                        </div>
                        <div className="text-base text-muted-foreground font-medium">MW Consumidos</div>
                      </div>
                      <div className="text-center p-6 bg-yellow-50 rounded-xl">
                        <Gauge className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-yellow-600">
                          {realTimeData.networkLoad.toFixed(1)}%
                        </div>
                        <div className="text-base text-muted-foreground font-medium">Carga da Rede</div>
                      </div>
                      <div className="text-center p-6 bg-emerald-50 rounded-xl">
                        <TrendingUp className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-emerald-600">
                          {realTimeData.renewablePercentage.toFixed(1)}%
                        </div>
                        <div className="text-base text-muted-foreground font-medium">Energia Renovável</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="realtime" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <Thermometer className="w-6 h-6" />
                      Sensores em Tempo Real
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Thermometer className="w-6 h-6 text-red-600" />
                        <span className="text-lg font-medium">Temperatura T-15</span>
                      </div>
                      <div className="text-xl font-bold">65°C</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Zap className="w-6 h-6 text-yellow-600" />
                        <span className="text-lg font-medium">Corrente Principal</span>
                      </div>
                      <div className="text-xl font-bold">850A</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Battery className="w-6 h-6 text-green-600" />
                        <span className="text-lg font-medium">Tensão Fase R</span>
                      </div>
                      <div className="text-xl font-bold">13.8kV</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Gauge className="w-6 h-6 text-blue-600" />
                        <span className="text-lg font-medium">Frequência</span>
                      </div>
                      <div className="text-xl font-bold">59.98Hz</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <Network className="w-6 h-6" />
                      Status da Rede
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <span className="text-lg font-medium">Subestação Norte</span>
                      <Badge className="bg-green-600 text-white text-base px-3 py-1">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <span className="text-lg font-medium">Transformador T-15</span>
                      <Badge className="bg-yellow-600 text-white text-base px-3 py-1">Manutenção</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <span className="text-lg font-medium">Gerador G-03</span>
                      <Badge className="bg-red-600 text-white text-base px-3 py-1">Offline</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <span className="text-lg font-medium">Zona Industrial</span>
                      <Badge className="bg-green-600 text-white text-base px-3 py-1">Online</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <Settings className="w-6 h-6" />
                      Automação Ativa
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <span className="text-lg font-medium">Balanceamento de Carga</span>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <span className="text-lg font-medium">Resposta à Demanda</span>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <span className="text-lg font-medium">Otimização Noturna</span>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <span className="text-lg font-medium">Isolamento de Falhas</span>
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Bell className="w-7 h-7" />
                      Alertas Recentes
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Notificações e eventos importantes do sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {alerts.map((alert) => (
                      <div key={alert.id} className={`p-5 border-l-4 rounded-lg ${getAlertColor(alert.type)}`}>
                        <div className="flex items-start gap-4">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <p className="text-lg font-medium mb-2">{alert.message}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>Às {alert.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{alert.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <AlertTriangle className="w-7 h-7" />
                      Resumo de Alertas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-6 bg-red-50 rounded-xl">
                        <div className="text-4xl font-bold text-red-600 mb-2">{realTimeData.activeFaults}</div>
                        <div className="text-lg text-muted-foreground font-medium">Falhas Ativas</div>
                      </div>
                      <div className="text-center p-6 bg-yellow-50 rounded-xl">
                        <div className="text-4xl font-bold text-yellow-600 mb-2">{realTimeData.maintenanceScheduled}</div>
                        <div className="text-lg text-muted-foreground font-medium">Manutenções Agendadas</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-lg font-medium">Críticos</span>
                        <Badge variant="destructive" className="text-base px-3 py-1">1</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-lg font-medium">Avisos</span>
                        <Badge className="bg-yellow-600 text-base px-3 py-1">5</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="text-lg font-medium">Informativos</span>
                        <Badge className="bg-blue-600 text-base px-3 py-1">12</Badge>
                      </div>
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

export default Index;
