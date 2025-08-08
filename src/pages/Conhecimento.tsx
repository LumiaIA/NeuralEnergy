import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search, 
  FileText, 
  Video,
  Users,
  Star,
  Clock,
  Download,
  Upload,
  Eye,
  MessageSquare,
  TrendingUp,
  Brain,
  Lightbulb,
  Award
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  category: string;
  type: 'manual' | 'procedure' | 'guide' | 'video' | 'presentation';
  description: string;
  author: string;
  created_at: string;
  updated_at: string;
  views: number;
  rating: number;
  downloads: number;
  tags: string[];
  status: 'published' | 'draft' | 'review' | 'archived';
  size: string;
}

interface Training {
  id: string;
  title: string;
  category: string;
  type: 'course' | 'workshop' | 'webinar' | 'certification';
  description: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  participants: number;
  completion_rate: number;
  rating: number;
  next_session: string;
  status: 'active' | 'upcoming' | 'completed' | 'cancelled';
}

interface Expert {
  id: string;
  name: string;
  role: string;
  department: string;
  expertise: string[];
  experience_years: number;
  rating: number;
  consultations: number;
  availability: 'available' | 'busy' | 'offline';
  response_time: string;
  photo: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  views: number;
  helpful_votes: number;
  created_at: string;
  updated_at: string;
  tags: string[];
}

const Conhecimento = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: 'Manual de Operação - Subestações',
      category: 'Operação',
      type: 'manual',
      description: 'Manual completo para operação de subestações de energia elétrica',
      author: 'João Silva - Engenheiro Sênior',
      created_at: '15/03/2024',
      updated_at: '20/03/2024',
      views: 1247,
      rating: 4.8,
      downloads: 89,
      tags: ['subestação', 'operação', 'segurança', 'procedimentos'],
      status: 'published',
      size: '12.5 MB'
    },
    {
      id: '2',
      title: 'Procedimentos de Emergência',
      category: 'Segurança',
      type: 'procedure',
      description: 'Protocolos de resposta a emergências no sistema elétrico',
      author: 'Maria Santos - Coordenadora de Segurança',
      created_at: '10/03/2024',
      updated_at: '18/03/2024',
      views: 892,
      rating: 4.9,
      downloads: 156,
      tags: ['emergência', 'segurança', 'protocolo', 'resposta'],
      status: 'published',
      size: '8.3 MB'
    },
    {
      id: '3',
      title: 'Treinamento: Manutenção Preventiva',
      category: 'Manutenção',
      type: 'video',
      description: 'Série de vídeos sobre técnicas de manutenção preventiva',
      author: 'Carlos Oliveira - Especialista em Manutenção',
      created_at: '05/03/2024',
      updated_at: '15/03/2024',
      views: 2341,
      rating: 4.7,
      downloads: 0,
      tags: ['manutenção', 'preventiva', 'equipamentos', 'técnicas'],
      status: 'published',
      size: '245 MB'
    },
    {
      id: '4',
      title: 'Guia de Implementação - Smart Grid',
      category: 'Tecnologia',
      type: 'guide',
      description: 'Guia prático para implementação de tecnologias Smart Grid',
      author: 'Ana Costa - Arquiteta de Sistemas',
      created_at: '01/03/2024',
      updated_at: '12/03/2024',
      views: 567,
      rating: 4.6,
      downloads: 43,
      tags: ['smart grid', 'tecnologia', 'implementação', 'inovação'],
      status: 'review',
      size: '15.7 MB'
    }
  ]);

  const [trainings, setTrainings] = useState<Training[]>([
    {
      id: '1',
      title: 'Fundamentos de Sistemas Elétricos',
      category: 'Técnico',
      type: 'course',
      description: 'Curso básico sobre princípios de sistemas elétricos de potência',
      instructor: 'Prof. Roberto Lima',
      duration: '40 horas',
      level: 'beginner',
      participants: 45,
      completion_rate: 87.3,
      rating: 4.8,
      next_session: '01/04/2024',
      status: 'active'
    },
    {
      id: '2',
      title: 'Workshop: Análise de Falhas',
      category: 'Especialização',
      type: 'workshop',
      description: 'Workshop prático sobre identificação e análise de falhas em equipamentos',
      instructor: 'Eng. Patricia Rocha',
      duration: '8 horas',
      level: 'advanced',
      participants: 12,
      completion_rate: 100,
      rating: 4.9,
      next_session: '25/03/2024',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Certificação em Segurança Elétrica',
      category: 'Certificação',
      type: 'certification',
      description: 'Programa de certificação em normas de segurança elétrica',
      instructor: 'Comitê de Segurança',
      duration: '80 horas',
      level: 'intermediate',
      participants: 28,
      completion_rate: 92.1,
      rating: 4.7,
      next_session: '15/04/2024',
      status: 'active'
    }
  ]);

  const [experts, setExperts] = useState<Expert[]>([
    {
      id: '1',
      name: 'Dr. Eduardo Martins',
      role: 'Engenheiro Especialista',
      department: 'Operação de Sistemas',
      expertise: ['Proteção', 'Automação', 'SCADA', 'Análise de Sistemas'],
      experience_years: 15,
      rating: 4.9,
      consultations: 234,
      availability: 'available',
      response_time: '< 2 horas',
      photo: '/api/placeholder/64/64'
    },
    {
      id: '2',
      name: 'Eng. Lucia Fernandes',
      role: 'Coordenadora Técnica',
      department: 'Manutenção',
      expertise: ['Manutenção Preditiva', 'Diagnóstico', 'Equipamentos HV'],
      experience_years: 12,
      rating: 4.8,
      consultations: 189,
      availability: 'busy',
      response_time: '< 4 horas',
      photo: '/api/placeholder/64/64'
    },
    {
      id: '3',
      name: 'Eng. Ricardo Santos',
      role: 'Especialista em Inovação',
      department: 'P&D',
      expertise: ['Smart Grid', 'IoT', 'IA', 'Blockchain'],
      experience_years: 8,
      rating: 4.7,
      consultations: 156,
      availability: 'available',
      response_time: '< 1 hora',
      photo: '/api/placeholder/64/64'
    }
  ]);

  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'Como proceder em caso de sobrecarga no sistema?',
      answer: 'Em caso de sobrecarga, siga o protocolo de emergência: 1) Identifique a origem da sobrecarga, 2) Redistribua a carga quando possível, 3) Acione sistemas de proteção se necessário, 4) Comunique imediatamente ao centro de controle.',
      category: 'Operação',
      views: 1456,
      helpful_votes: 142,
      created_at: '10/03/2024',
      updated_at: '15/03/2024',
      tags: ['sobrecarga', 'emergência', 'protocolo']
    },
    {
      id: '2',
      question: 'Qual a frequência recomendada para manutenção preventiva?',
      answer: 'A frequência varia por equipamento: Transformadores - 6 meses, Disjuntores - 3 meses, Sistemas de proteção - 1 mês, Equipamentos de medição - 2 meses. Consulte sempre o manual específico do fabricante.',
      category: 'Manutenção',
      views: 987,
      helpful_votes: 89,
      created_at: '08/03/2024',
      updated_at: '12/03/2024',
      tags: ['manutenção', 'preventiva', 'frequência']
    },
    {
      id: '3',
      question: 'Como interpretar alarmes do sistema SCADA?',
      answer: 'Alarmes são classificados por prioridade: Críticos (vermelho) - ação imediata, Importantes (amarelo) - ação em 15 min, Informativos (azul) - monitoramento. Sempre verifique o manual de alarmes para códigos específicos.',
      category: 'Tecnologia',
      views: 756,
      helpful_votes: 67,
      created_at: '05/03/2024',
      updated_at: '10/03/2024',
      tags: ['SCADA', 'alarmes', 'interpretação']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [knowledgeScore, setKnowledgeScore] = useState(94.2);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'manual': return <BookOpen className="w-4 h-4" />;
      case 'procedure': return <FileText className="w-4 h-4" />;
      case 'guide': return <Lightbulb className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'presentation': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-600';
      case 'review': return 'text-yellow-600';
      case 'draft': return 'text-blue-600';
      case 'archived': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-600';
      case 'busy': return 'text-yellow-600';
      case 'offline': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalDocuments = documents.length;
  const totalTrainings = trainings.length;
  const totalExperts = experts.filter(e => e.availability === 'available').length;
  const avgRating = documents.reduce((acc, doc) => acc + doc.rating, 0) / documents.length;

  // Simula atualização de dados
  useEffect(() => {
    const interval = setInterval(() => {
      setKnowledgeScore(prev => Math.max(90, Math.min(100, prev + (Math.random() - 0.5) * 1)));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Gestão de Conhecimento</h1>
            <p className="text-lg text-muted-foreground">Central de documentação, treinamentos e expertise técnica</p>
          </div>

          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Score de Conhecimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{knowledgeScore.toFixed(1)}%</div>
                <Progress value={knowledgeScore} className="mt-2" />
                <div className="flex items-center mt-2">
                  <Brain className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Base consolidada</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Documentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{totalDocuments}</div>
                <div className="flex items-center mt-2">
                  <FileText className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Disponíveis</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Especialistas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{totalExperts}</div>
                <div className="flex items-center mt-2">
                  <Users className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Disponíveis</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avaliação Média</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{avgRating.toFixed(1)}</div>
                <div className="flex items-center mt-2">
                  <Star className="w-4 h-4 text-yellow-600 mr-2" />
                  <span className="text-sm text-muted-foreground">Qualidade alta</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Barra de Pesquisa */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Pesquisar documentos, procedimentos, especialistas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-lg py-6"
                  />
                </div>
                <Button className="text-lg px-8 py-6">
                  Pesquisar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="documents" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="documents" className="text-lg py-3">Documentos</TabsTrigger>
              <TabsTrigger value="training" className="text-lg py-3">Treinamentos</TabsTrigger>
              <TabsTrigger value="experts" className="text-lg py-3">Especialistas</TabsTrigger>
              <TabsTrigger value="faq" className="text-lg py-3">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Biblioteca de Documentos</h2>
                <Button className="text-lg px-6 py-3">
                  <Upload className="w-4 h-4 mr-2" />
                  Novo Documento
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {documents.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-blue-600">
                            {getTypeIcon(doc.type)}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{doc.title}</CardTitle>
                            <CardDescription className="text-base mt-1">{doc.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-100 text-blue-800">
                            {doc.category}
                          </Badge>
                          <div className={getStatusColor(doc.status)}>
                            <div className="w-2 h-2 rounded-full bg-current"></div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>Por: {doc.author}</span>
                          <span>{doc.size}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="font-medium">{doc.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4 text-gray-500" />
                              <span>{doc.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="w-4 h-4 text-gray-500" />
                              <span>{doc.downloads}</span>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Atualizado: {doc.updated_at}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            Compartilhar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="training" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Programas de Treinamento</h2>
                <Button className="text-lg px-6 py-3">
                  Novo Treinamento
                </Button>
              </div>
              
              <div className="space-y-6">
                {trainings.map((training) => (
                  <Card key={training.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{training.title}</CardTitle>
                          <CardDescription className="text-base mt-1">{training.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getLevelColor(training.level)}>
                            {training.level === 'beginner' ? 'Iniciante' :
                             training.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-800">
                            {training.type === 'course' ? 'Curso' :
                             training.type === 'workshop' ? 'Workshop' :
                             training.type === 'webinar' ? 'Webinar' : 'Certificação'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-muted-foreground">Instrutor:</span>
                            <p className="font-medium">{training.instructor}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Duração:</span>
                            <p className="font-medium">{training.duration}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Próxima sessão:</span>
                            <p className="font-medium">{training.next_session}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Taxa de conclusão:</span>
                            <span className="font-medium">{training.completion_rate}%</span>
                          </div>
                          <Progress value={training.completion_rate} className="h-2" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Participantes:</span>
                            <span className="font-medium">{training.participants}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Avaliação:</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="font-medium">{training.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-6">
                        <Button size="sm">
                          Inscrever-se
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Detalhes
                        </Button>
                        <Button variant="outline" size="sm">
                          Cronograma
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experts" className="space-y-6">
              <h2 className="text-2xl font-semibold">Rede de Especialistas</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {experts.map((expert) => (
                  <Card key={expert.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-8 h-8 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">{expert.name}</CardTitle>
                          <CardDescription className="text-base">{expert.role}</CardDescription>
                          <p className="text-sm text-muted-foreground mt-1">{expert.department}</p>
                        </div>
                        <div className={getAvailabilityColor(expert.availability)}>
                          <div className="w-3 h-3 rounded-full bg-current"></div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Especialidades:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {expert.expertise.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Experiência:</span>
                            <p className="font-medium">{expert.experience_years} anos</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Consultas:</span>
                            <p className="font-medium">{expert.consultations}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Avaliação:</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="font-medium">{expert.rating}</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Resposta:</span>
                            <p className="font-medium">{expert.response_time}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button 
                            size="sm" 
                            disabled={expert.availability !== 'available'}
                            className="flex-1"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Consultar
                          </Button>
                          <Button variant="outline" size="sm">
                            Perfil
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faq" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Perguntas Frequentes</h2>
                <Button className="text-lg px-6 py-3">
                  Nova Pergunta
                </Button>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <Card key={faq.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl">{faq.question}</CardTitle>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge className="bg-blue-100 text-blue-800">
                              {faq.category}
                            </Badge>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{faq.views} visualizações</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                <span>{faq.helpful_votes} úteis</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-base leading-relaxed">{faq.answer}</p>
                        
                        <div className="flex flex-wrap gap-1">
                          {faq.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              👍 Útil ({faq.helpful_votes})
                            </Button>
                            <Button variant="outline" size="sm">
                              Compartilhar
                            </Button>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Atualizado: {faq.updated_at}
                          </span>
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

export default Conhecimento;