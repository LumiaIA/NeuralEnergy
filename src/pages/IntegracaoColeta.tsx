import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Database, 
  Wifi, 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Zap,
  Thermometer,
  Gauge,
  Battery
} from "lucide-react";

interface DataSource {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error';
  lastUpdate: string;
  dataPoints: number;
  reliability: number;
}

interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  timestamp: string;
}

const IntegracaoColeta = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: '1',
      name: 'Medidores Inteligentes - Zona Norte',
      type: 'Smart Meters',
      status: 'connected',
      lastUpdate: '2 min atrás',
      dataPoints: 15420,
      reliability: 98.5
    },
    {
      id: '2',
      name: 'Sensores IoT - Subestação Central',
      type: 'IoT Sensors',
      status: 'connected',
      lastUpdate: '1 min atrás',
      dataPoints: 8750,
      reliability: 99.2
    },
    {
      id: '3',
      name: 'Sistema SCADA - Distribuição',
      type: 'SCADA',
      status: 'error',
      lastUpdate: '15 min atrás',
      dataPoints: 0,
      reliability: 0
    },
    {
      id: '4',
      name: 'Drones de Inspeção',
      type: 'Aerial Data',
      status: 'disconnected',
      lastUpdate: '2 horas atrás',
      dataPoints: 245,
      reliability: 85.3
    }
  ]);

  const [sensorData, setSensorData] = useState<SensorData[]>([
    {
      id: '1',
      name: 'Temperatura Transformador A1',
      value: 65,
      unit: '°C',
      status: 'normal',
      timestamp: '14:32:15'
    },
    {
      id: '2',
      name: 'Corrente Linha Principal',
      value: 850,
      unit: 'A',
      status: 'warning',
      timestamp: '14:32:10'
    },
    {
      id: '3',
      name: 'Tensão Fase R',
      value: 13.8,
      unit: 'kV',
      status: 'normal',
      timestamp: '14:32:05'
    },
    {
      id: '4',
      name: 'Frequência da Rede',
      value: 59.98,
      unit: 'Hz',
      status: 'normal',
      timestamp: '14:32:00'
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = async () => {
    setIsRefreshing(true);
    // Simula atualização de dados
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Atualiza dados simulados
    setSensorData(prev => prev.map(sensor => ({
      ...sensor,
      value: sensor.value + (Math.random() - 0.5) * 10,
      timestamp: new Date().toLocaleTimeString('pt-BR')
    })));
    
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'normal':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
      case 'critical':
        return 'text-red-600';
      case 'disconnected':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'normal':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4" />;
      case 'error':
      case 'critical':
        return <AlertCircle className="w-4 h-4" />;
      case 'disconnected':
        return <Wifi className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getSensorIcon = (name: string) => {
    if (name.includes('Temperatura')) return <Thermometer className="w-5 h-5" />;
    if (name.includes('Corrente')) return <Zap className="w-5 h-5" />;
    if (name.includes('Tensão')) return <Battery className="w-5 h-5" />;
    if (name.includes('Frequência')) return <Gauge className="w-5 h-5" />;
    return <Activity className="w-5 h-5" />;
  };

  const connectedSources = dataSources.filter(ds => ds.status === 'connected').length;
  const totalDataPoints = dataSources.reduce((sum, ds) => sum + ds.dataPoints, 0);
  const avgReliability = dataSources.reduce((sum, ds) => sum + ds.reliability, 0) / dataSources.length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Integração & Coleta Multimodal</h1>
            <p className="text-lg text-muted-foreground">Monitoramento em tempo real de todas as fontes de dados do sistema elétrico</p>
          </div>

          {/* Estatísticas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Fontes Conectadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{connectedSources}/{dataSources.length}</div>
                <div className="flex items-center mt-2">
                  <Database className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Sistemas ativos</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pontos de Dados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{totalDataPoints.toLocaleString()}</div>
                <div className="flex items-center mt-2">
                  <Activity className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Coletados hoje</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Confiabilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{avgReliability.toFixed(1)}%</div>
                <Progress value={avgReliability} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Última Atualização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">1min</div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={refreshData}
                  disabled={isRefreshing}
                  className="mt-2"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Atualizar
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="sources" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sources" className="text-lg py-3">Fontes de Dados</TabsTrigger>
              <TabsTrigger value="sensors" className="text-lg py-3">Sensores em Tempo Real</TabsTrigger>
              <TabsTrigger value="integration" className="text-lg py-3">Configuração</TabsTrigger>
            </TabsList>

            <TabsContent value="sources" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {dataSources.map((source) => (
                  <Card key={source.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{source.name}</CardTitle>
                        <div className={`flex items-center gap-2 ${getStatusColor(source.status)}`}>
                          {getStatusIcon(source.status)}
                          <Badge variant={source.status === 'connected' ? 'default' : 'destructive'}>
                            {source.status === 'connected' ? 'Conectado' : 
                             source.status === 'error' ? 'Erro' : 'Desconectado'}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-base">{source.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Última atualização:</span>
                          <span className="font-medium">{source.lastUpdate}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Pontos de dados:</span>
                          <span className="font-medium">{source.dataPoints.toLocaleString()}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Confiabilidade:</span>
                            <span className="font-medium">{source.reliability}%</span>
                          </div>
                          <Progress value={source.reliability} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sensors" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sensorData.map((sensor) => (
                  <Card key={sensor.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={getStatusColor(sensor.status)}>
                          {getSensorIcon(sensor.name)}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-sm font-medium leading-tight">{sensor.name}</CardTitle>
                          <CardDescription className="text-xs">{sensor.timestamp}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-foreground mb-1">
                          {sensor.value.toFixed(sensor.unit === 'Hz' ? 2 : 1)}
                        </div>
                        <div className="text-sm text-muted-foreground mb-3">{sensor.unit}</div>
                        <Badge 
                          variant={sensor.status === 'normal' ? 'default' : 
                                  sensor.status === 'warning' ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {sensor.status === 'normal' ? 'Normal' : 
                           sensor.status === 'warning' ? 'Atenção' : 'Crítico'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="integration" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de Integração</CardTitle>
                    <CardDescription>Configure as fontes de dados e protocolos de comunicação</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-base">
                        Sistema configurado para coleta automática a cada 30 segundos. 
                        Protocolos suportados: MQTT, OPC-UA, Modbus, DNP3.
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-3">
                      <Button className="w-full text-lg py-6">Adicionar Nova Fonte</Button>
                      <Button variant="outline" className="w-full text-lg py-6">Configurar Protocolos</Button>
                      <Button variant="outline" className="w-full text-lg py-6">Testar Conectividade</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Qualidade dos Dados</CardTitle>
                    <CardDescription>Monitoramento da integridade e qualidade das informações coletadas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Dados válidos:</span>
                        <span className="font-medium">98.7%</span>
                      </div>
                      <Progress value={98.7} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Latência média:</span>
                        <span className="font-medium">1.2s</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Taxa de erro:</span>
                        <span className="font-medium">0.3%</span>
                      </div>
                      <Progress value={3} className="h-2" />
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

export default IntegracaoColeta;