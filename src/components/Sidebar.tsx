import { 
  Brain, 
  Database, 
  Zap, 
  Settings, 
  FileText, 
  GraduationCap, 
  Shield,
  BarChart3
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", path: "/" },
  { icon: Brain, label: "Integração & Coleta", path: "/integracao-coleta" },
  { icon: Zap, label: "Processamento Híbrido", path: "/processamento-hibrido" },
  { icon: Database, label: "IA Preditiva", path: "/ia-preditiva" },
  { icon: Settings, label: "Orquestração", path: "/orquestracao" },
  { icon: FileText, label: "Compliance", path: "/compliance" },
  { icon: GraduationCap, label: "Conhecimento", path: "/conhecimento" },
  { icon: Shield, label: "Blockchain", path: "/blockchain" },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-64 h-screen bg-secondary border-r border-border fixed left-0 top-0 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">NeuralEnergy</h1>
        <p className="text-sm text-muted-foreground mt-1">Sistema NeuralEnergy</p>
      </div>
      
      <nav className="space-y-2">
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                isActive 
                  ? "bg-gradient-primary text-primary-foreground shadow-soft" 
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};