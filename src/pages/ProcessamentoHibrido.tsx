import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Cpu, 
  Brain, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Activity,
  Layers
} from "lucide-react";

interface ProcessingTask {
  id: string;
  name: string;
  type: 'edge' | 'cloud' | 'hybrid';
  status: 'running' | 'completed' | 'failed' | 'queued';
  progress: number;
  startTime: string;
  estimatedCompletion: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface AIModel {
  id: string;
  name: string;
  type: string;
  accuracy: number;
  lastTrained: string;
  status: 'active' | 'training' | 'inactive';
  predictions: number;
}

const ProcessamentoHibrido = () => {
  const [processingTasks, setProcessingTasks] = useState<ProcessingTask[]>([
    {
      id: '1',
      name: 'Análise de Padrões de Consumo - Zona Norte',
      type: 'hybrid',
      status: 'running',
      progress: 75,
      startTime: '14:20:15',
      estimatedCompletion: '14:45:30',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Detecção de Anomalias em Tempo Real',
      type: 'edge',
      status: 'running',
      progress: 100,
      startTime: '14:30:00',
      estimatedCompletion: 'Contínuo',
      priority: 'critical'
    },
    {
      id: '3',
      name: 'Previsão de Demanda - 24h',
      type: 'cloud',
      status: 'completed',
      progress: 100,
      startTime: '13:00:00',
      estimatedCompletion: '14:15:00',
      priority: 'medium'
    },
    {
      id: '4',
      name: 'Otimização de Distribuição',
      type: 'hybrid',
      status: 'queued',
      progress: 0,
      startTime: '-',
      estimatedCompletion: '15:30:00',
      priority: 'medium'
    }
  ]);

  const [aiModels, setAiModels] = useState<AIModel[]>([
    {
      id: '1',
      name: 'Preditor de Demanda Neural',
      type: 'Deep Learning',
      accuracy: 94.7,
      lastTrained: '2 dias atrás',
      status: 'active',
      predictions: 15420
    },
    {
      id: '2',
      name: 'Detector de Anomalias RF',
      type: 'Random Forest',
      accuracy: 97.2,
      lastTrained: '1 dia atrás',
      status: 'active',
      predictions: 8750
    },
    {
      id: '3',
      name: 'Otimizador de Rede LSTM',
      type: 'LSTM Network',
      accuracy: 91.8,
      lastTrained: '6 horas atrás',
      status: 'training',
      predictions: 3240
    },
    {
      id: '4',
      name: 'Classificador de Falhas SVM',
      type: 'Support Vector Machine',
      accuracy: 89.5,
      lastTrained: '3 dias atrás',
      status: 'inactive',
      predictions: 1850
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 68,
    memoryUsage: 72,
    gpuUsage: 85,
    networkLatency: 12,
    tasksProcessed: 1247,
    averageProcessingTime: 3.2
  });

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'edge': return 'bg-blue-100 text-blue-800';
      case 'cloud': return 'bg-purple-100 text-purple-800';
      case 'hybrid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-blue-600';
      case 'completed': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'queued': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Activity className="w-4 h-4 animate-pulse" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <AlertTriangle className="w-4 h-4" />;
      case 'queued': return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
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

  const runningTasks = processingTasks.filter(task => task.status === 'running').length;
  const completedTasks = processingTasks.filter(task => task.status === 'completed').length;
  const activeModels = aiModels.filter(model => model.status === 'active').length;
  const avgAccuracy = aiModels.reduce((sum, model) => sum + model.accuracy, 0) / aiModels.length;

  // Simula atualização de métricas em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        cpuUsage: Math.max(30, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(40, Math.min(85, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        gpuUsage: Math.max(50, Math.min(95, prev.gpuUsage + (Math.random() - 0.5) * 12)),
        networkLatency: Math.max(5, Math.min(25, prev.networkLatency + (Math.random() - 0.5) * 4))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Processamento Inteligente Híbrido</h1>
            <p className="text-lg text-muted-foreground">Análise avançada com IA distribuída entre edge computing e cloud</p>
          </div>

          {/* Métricas do Sistema */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Tarefas Ativas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{runningTasks}</div>
                <div className="flex items-center mt-2">
                  <Activity className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Em processamento</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Modelos IA Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{activeModels}/{aiModels.length}</div>
                <div className="flex items-center mt-2">
                  <Brain className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Sistemas inteligentes</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Precisão Média</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{avgAccuracy.toFixed(1)}%</div>
                <Progress value={avgAccuracy} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Uso de GPU</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{systemMetrics.gpuUsage}%</div>
                <Progress value={systemMetrics.gpuUsage} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="tasks" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tasks" className="text-lg py-3">Tarefas de Processamento</TabsTrigger>
              <TabsTrigger value="models" className="text-lg py-3">Modelos de IA</TabsTrigger>
              <TabsTrigger value="performance" className="text-lg py-3">Performance</TabsTrigger>
              <TabsTrigger value="config" className="text-lg py-3">Configuração</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="space-y-6">
              <div className="space-y-4">
                {processingTasks.map((task) => (
                  <Card key={task.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={getStatusColor(task.status)}>
                            {getStatusIcon(task.status)}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{task.name}</CardTitle>
                            <CardDescription className="text-base mt-1">
                              Iniciado às {task.startTime} • Conclusão estimada: {task.estimatedCompletion}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority === 'critical' ? 'Crítica' :
                             task.priority === 'high' ? 'Alta' :
                             task.priority === 'medium' ? 'Média' : 'Baixa'}
                          </Badge>
                          <Badge className={getTaskTypeColor(task.type)}>
                            {task.type === 'edge' ? 'Edge' :
                             task.type === 'cloud' ? 'Cloud' : 'Híbrido'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Progresso:</span>
                          <span className="font-medium">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-3" />
                        {task.status === 'running' && (
                          <div className="flex justify-end">
                            <Button variant="outline" size="sm">
                              Pausar Tarefa
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="models" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {aiModels.map((model) => (
                  <Card key={model.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{model.name}</CardTitle>
                          <CardDescription className="text-base">{model.type}</CardDescription>
                        </div>
                        <Badge 
                          variant={model.status === 'active' ? 'default' : 
                                  model.status === 'training' ? 'secondary' : 'outline'}
                        >
                          {model.status === 'active' ? 'Ativo' :
                           model.status === 'training' ? 'Treinando' : 'Inativo'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Precisão:</span>
                          <span className="font-medium text-lg">{model.accuracy}%</span>
                        </div>
                        <Progress value={model.accuracy} className="h-2" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Último treinamento:</span>
                          <span className="font-medium">{model.lastTrained}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Predições realizadas:</span>
                          <span className="font-medium">{model.predictions.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            {model.status === 'active' ? 'Pausar' : 'Ativar'}
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Retreinar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="w-5 h-5" />
                      Uso de CPU
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">{systemMetrics.cpuUsage}%</div>
                    <Progress value={systemMetrics.cpuUsage} className="mb-2" />
                    <p className="text-sm text-muted-foreground">Processamento distribuído ativo</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="w-5 h-5" />
                      Uso de Memória
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">{systemMetrics.memoryUsage}%</div>
                    <Progress value={systemMetrics.memoryUsage} className="mb-2" />
                    <p className="text-sm text-muted-foreground">Cache de modelos otimizado</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Latência de Rede
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">{systemMetrics.networkLatency}ms</div>
                    <Progress value={100 - systemMetrics.networkLatency * 2} className="mb-2" />
                    <p className="text-sm text-muted-foreground">Comunicação edge-cloud</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Tarefas Processadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">{systemMetrics.tasksProcessed}</div>
                    <p className="text-sm text-muted-foreground">Hoje</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Tempo Médio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">{systemMetrics.averageProcessingTime}s</div>
                    <p className="text-sm text-muted-foreground">Por tarefa</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="config" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuração de Processamento</CardTitle>
                    <CardDescription>Ajuste os parâmetros de distribuição de carga</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <Brain className="h-4 w-4" />
                      <AlertDescription className="text-base">
                        Sistema configurado para balanceamento automático entre edge e cloud.
                        Prioridade: Latência baixa para análises críticas.
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-3">
                      <Button className="w-full text-lg py-6">Configurar Balanceamento</Button>
                      <Button variant="outline" className="w-full text-lg py-6">Ajustar Prioridades</Button>
                      <Button variant="outline" className="w-full text-lg py-6">Gerenciar Recursos</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Modelos de IA</CardTitle>
                    <CardDescription>Gerenciamento e otimização dos algoritmos inteligentes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Auto-retreinamento:</span>
                        <Badge variant="default">Ativo</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Validação cruzada:</span>
                        <Badge variant="default">Habilitada</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Otimização automática:</span>
                        <Badge variant="default">Ativa</Badge>
                      </div>
                    </div>
                    <div className="space-y-3 mt-6">
                      <Button className="w-full text-lg py-6">Adicionar Modelo</Button>
                      <Button variant="outline" className="w-full text-lg py-6">Configurar Treinamento</Button>
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

export default ProcessamentoHibrido;