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
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  LineChart,
  Target,
  Lightbulb
} from "lucide-react";

interface Prediction {
  id: string;
  type: string;
  description: string;
  confidence: number;
  timeframe: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  trend: 'up' | 'down' | 'stable';
  value: number;
  unit: string;
  lastUpdated: string;
}

interface Scenario {
  id: string;
  name: string;
  probability: number;
  impact: string;
  timeframe: string;
  recommendations: string[];
  status: 'monitoring' | 'action_required' | 'resolved';
}

const IAPreditiva = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      id: '1',
      type: 'Demanda Energética',
      description: 'Pico de demanda previsto para próximas 4 horas',
      confidence: 94.2,
      timeframe: '4 horas',
      impact: 'high',
      trend: 'up',
      value: 2850,
      unit: 'MW',
      lastUpdated: '2 min atrás'
    },
    {
      id: '2',
      type: 'Falha de Equipamento',
      description: 'Transformador T-15 com alta probabilidade de falha',
      confidence: 87.5,
      timeframe: '72 horas',
      impact: 'critical',
      trend: 'up',
      value: 87.5,
      unit: '%',
      lastUpdated: '5 min atrás'
    },
    {
      id: '3',
      type: 'Eficiência Operacional',
      description: 'Melhoria na eficiência da rede prevista',
      confidence: 91.8,
      timeframe: '24 horas',
      impact: 'medium',
      trend: 'up',
      value: 96.2,
      unit: '%',
      lastUpdated: '1 min atrás'
    },
    {
      id: '4',
      type: 'Consumo Residencial',
      description: 'Redução no consumo residencial esperada',
      confidence: 89.3,
      timeframe: '12 horas',
      impact: 'low',
      trend: 'down',
      value: 1420,
      unit: 'MWh',
      lastUpdated: '3 min atrás'
    }
  ]);

  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: '1',
      name: 'Sobrecarga na Rede Norte',
      probability: 78.5,
      impact: 'Interrupção parcial do fornecimento',
      timeframe: '6-8 horas',
      recommendations: [
        'Ativar geração de backup',
        'Redistribuir carga para outras subestações',
        'Alertar equipes de manutenção'
      ],
      status: 'action_required'
    },
    {
      id: '2',
      name: 'Pico de Demanda Vespertino',
      probability: 92.1,
      impact: 'Aumento de 15% no consumo',
      timeframe: '17:00-19:00',
      recommendations: [
        'Preparar capacidade adicional',
        'Monitorar temperatura dos transformadores',
        'Ativar protocolo de economia'
      ],
      status: 'monitoring'
    },
    {
      id: '3',
      name: 'Falha Cascata Setor Industrial',
      probability: 23.7,
      impact: 'Desligamento de grandes consumidores',
      timeframe: '48-72 horas',
      recommendations: [
        'Inspeção preventiva de equipamentos críticos',
        'Teste de sistemas de proteção',
        'Comunicação com grandes consumidores'
      ],
      status: 'monitoring'
    }
  ]);

  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [modelAccuracy, setModelAccuracy] = useState({
    demanda: 94.2,
    falhas: 87.5,
    eficiencia: 91.8,
    consumo: 89.3
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-600" />;
      case 'stable': return <BarChart3 className="w-4 h-4 text-blue-600" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'action_required': return 'text-red-600';
      case 'monitoring': return 'text-yellow-600';
      case 'resolved': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'action_required': return <AlertTriangle className="w-4 h-4" />;
      case 'monitoring': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const highConfidencePredictions = predictions.filter(p => p.confidence > 90).length;
  const criticalPredictions = predictions.filter(p => p.impact === 'critical').length;
  const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;
  const actionRequiredScenarios = scenarios.filter(s => s.status === 'action_required').length;

  // Simula atualização de previsões
  useEffect(() => {
    const interval = setInterval(() => {
      setPredictions(prev => prev.map(prediction => ({
        ...prediction,
        confidence: Math.max(70, Math.min(99, prediction.confidence + (Math.random() - 0.5) * 2)),
        value: prediction.value + (Math.random() - 0.5) * prediction.value * 0.05
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">IA Preditiva Avançada</h1>
            <p className="text-lg text-muted-foreground">Previsões inteligentes e análise de cenários para otimização da rede elétrica</p>
          </div>

          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Previsões Ativas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{predictions.length}</div>
                <div className="flex items-center mt-2">
                  <Brain className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Modelos em execução</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Alta Confiança</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{highConfidencePredictions}</div>
                <div className="flex items-center mt-2">
                  <Target className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-muted-foreground">&gt; 90% precisão</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Confiança Média</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{avgConfidence.toFixed(1)}%</div>
                <Progress value={avgConfidence} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Ação Necessária</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{actionRequiredScenarios}</div>
                <div className="flex items-center mt-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Cenários críticos</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="predictions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="predictions" className="text-lg py-3">Previsões</TabsTrigger>
              <TabsTrigger value="scenarios" className="text-lg py-3">Cenários</TabsTrigger>
              <TabsTrigger value="models" className="text-lg py-3">Modelos</TabsTrigger>
              <TabsTrigger value="insights" className="text-lg py-3">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="predictions" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Previsões Ativas</h2>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Próxima 1 hora</SelectItem>
                    <SelectItem value="6h">Próximas 6 horas</SelectItem>
                    <SelectItem value="24h">Próximas 24 horas</SelectItem>
                    <SelectItem value="7d">Próximos 7 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {predictions.map((prediction) => (
                  <Card key={prediction.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getTrendIcon(prediction.trend)}
                          <div>
                            <CardTitle className="text-xl">{prediction.type}</CardTitle>
                            <CardDescription className="text-base mt-1">{prediction.description}</CardDescription>
                          </div>
                        </div>
                        <Badge className={getImpactColor(prediction.impact)}>
                          {prediction.impact === 'critical' ? 'Crítico' :
                           prediction.impact === 'high' ? 'Alto' :
                           prediction.impact === 'medium' ? 'Médio' : 'Baixo'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Valor previsto:</span>
                          <span className="font-bold text-lg">{prediction.value.toFixed(1)} {prediction.unit}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Confiança:</span>
                          <span className="font-medium">{prediction.confidence.toFixed(1)}%</span>
                        </div>
                        <Progress value={prediction.confidence} className="h-2" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Prazo:</span>
                          <span className="font-medium">{prediction.timeframe}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Atualizado:</span>
                          <span className="font-medium">{prediction.lastUpdated}</span>
                        </div>
                        
                        {prediction.impact === 'critical' && (
                          <Alert className="mt-4">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-base">
                              Esta previsão requer atenção imediata. Considere ações preventivas.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scenarios" className="space-y-6">
              <h2 className="text-2xl font-semibold">Análise de Cenários</h2>
              
              <div className="space-y-4">
                {scenarios.map((scenario) => (
                  <Card key={scenario.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={getStatusColor(scenario.status)}>
                            {getStatusIcon(scenario.status)}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{scenario.name}</CardTitle>
                            <CardDescription className="text-base mt-1">
                              Probabilidade: {scenario.probability}% • Prazo: {scenario.timeframe}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge 
                          variant={scenario.status === 'action_required' ? 'destructive' : 
                                  scenario.status === 'monitoring' ? 'secondary' : 'default'}
                        >
                          {scenario.status === 'action_required' ? 'Ação Necessária' :
                           scenario.status === 'monitoring' ? 'Monitorando' : 'Resolvido'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Impacto esperado:</span>
                          <p className="font-medium mt-1">{scenario.impact}</p>
                        </div>
                        
                        <div>
                          <span className="text-sm text-muted-foreground">Probabilidade:</span>
                          <div className="flex items-center gap-3 mt-1">
                            <Progress value={scenario.probability} className="flex-1 h-2" />
                            <span className="font-medium">{scenario.probability}%</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm text-muted-foreground">Recomendações:</span>
                          <ul className="mt-2 space-y-1">
                            {scenario.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {scenario.status === 'action_required' && (
                          <div className="flex gap-2 mt-4">
                            <Button className="flex-1">Executar Ações</Button>
                            <Button variant="outline" className="flex-1">Agendar</Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="models" className="space-y-6">
              <h2 className="text-2xl font-semibold">Performance dos Modelos</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="w-5 h-5" />
                      Modelo de Demanda
                    </CardTitle>
                    <CardDescription>Previsão de consumo energético</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Precisão:</span>
                        <span className="font-bold text-lg">{modelAccuracy.demanda}%</span>
                      </div>
                      <Progress value={modelAccuracy.demanda} className="h-3" />
                      <div className="text-sm text-muted-foreground">
                        Último treinamento: 2 dias atrás
                      </div>
                      <Button variant="outline" className="w-full">Retreinar Modelo</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Modelo de Falhas
                    </CardTitle>
                    <CardDescription>Detecção precoce de problemas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Precisão:</span>
                        <span className="font-bold text-lg">{modelAccuracy.falhas}%</span>
                      </div>
                      <Progress value={modelAccuracy.falhas} className="h-3" />
                      <div className="text-sm text-muted-foreground">
                        Último treinamento: 1 dia atrás
                      </div>
                      <Button variant="outline" className="w-full">Retreinar Modelo</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Modelo de Eficiência
                    </CardTitle>
                    <CardDescription>Otimização operacional</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Precisão:</span>
                        <span className="font-bold text-lg">{modelAccuracy.eficiencia}%</span>
                      </div>
                      <Progress value={modelAccuracy.eficiencia} className="h-3" />
                      <div className="text-sm text-muted-foreground">
                        Último treinamento: 6 horas atrás
                      </div>
                      <Button variant="outline" className="w-full">Retreinar Modelo</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Modelo de Consumo
                    </CardTitle>
                    <CardDescription>Padrões de uso residencial</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Precisão:</span>
                        <span className="font-bold text-lg">{modelAccuracy.consumo}%</span>
                      </div>
                      <Progress value={modelAccuracy.consumo} className="h-3" />
                      <div className="text-sm text-muted-foreground">
                        Último treinamento: 3 dias atrás
                      </div>
                      <Button variant="outline" className="w-full">Retreinar Modelo</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <h2 className="text-2xl font-semibold">Insights Inteligentes</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                      Oportunidades Identificadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Alert>
                        <TrendingUp className="h-4 w-4" />
                        <AlertDescription className="text-base">
                          <strong>Economia de 12% no consumo</strong> pode ser alcançada otimizando 
                          a distribuição durante horários de baixa demanda.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <Target className="h-4 w-4" />
                        <AlertDescription className="text-base">
                          <strong>Manutenção preventiva</strong> em 3 transformadores pode evitar 
                          interrupções nos próximos 30 dias.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <Zap className="h-4 w-4" />
                        <AlertDescription className="text-base">
                          <strong>Balanceamento de carga</strong> automático pode reduzir picos 
                          de demanda em 8%.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-600" />
                      Recomendações da IA
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Curto Prazo (24h)</h4>
                        <p className="text-sm text-blue-800">
                          Ativar protocolo de economia energética entre 18h-20h para reduzir 
                          sobrecarga prevista.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">Médio Prazo (7 dias)</h4>
                        <p className="text-sm text-green-800">
                          Implementar sistema de resposta à demanda para grandes consumidores 
                          industriais.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">Longo Prazo (30 dias)</h4>
                        <p className="text-sm text-purple-800">
                          Investir em armazenamento de energia para suavizar variações de 
                          demanda.
                        </p>
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

export default IAPreditiva;