import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import IntegracaoColeta from "./pages/IntegracaoColeta.tsx";
import ProcessamentoHibrido from "./pages/ProcessamentoHibrido.tsx";
import IAPreditiva from "./pages/IAPreditiva.tsx";
import Orquestracao from "./pages/Orquestracao.tsx";
import Compliance from "./pages/Compliance.tsx";
import Conhecimento from "./pages/Conhecimento.tsx";
import Blockchain from "./pages/Blockchain.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/integracao-coleta" element={<IntegracaoColeta />} />
          <Route path="/processamento-hibrido" element={<ProcessamentoHibrido />} />
          <Route path="/ia-preditiva" element={<IAPreditiva />} />
          <Route path="/orquestracao" element={<Orquestracao />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/conhecimento" element={<Conhecimento />} />
          <Route path="/blockchain" element={<Blockchain />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
