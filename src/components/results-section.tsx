import { RequirementAnalysis, RequirementImprovement } from "@/app/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface ResultsSectionProps {
  results: RequirementAnalysis[] | RequirementImprovement[];
}

export function ResultsSection({ results }: ResultsSectionProps) {
  if (!results || results.length === 0) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-slate-400" />
            <CardTitle className="text-xl text-slate-400">
              Resultados da Análise
            </CardTitle>
          </div>
          <CardDescription>
            Os resultados aparecerão aqui após a análise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-slate-400">
            <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Aguardando análise dos requisitos...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-green-600" />
          <CardTitle className="text-xl">Resultados da Análise</CardTitle>
        </div>
        <CardDescription>Análise gerada pela IA</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {results.map((item) => {
            // Verificar se é análise ou melhoria
            const isAnalysis = 'termosAmbiguos' in item;
            const analysisItem = item as RequirementAnalysis;
            const improvementItem = item as RequirementImprovement;
            
            return (
              <div
                key={item.id}
                className="bg-slate-50/50 rounded-lg p-4 border border-slate-200"
              >
                <div className="mb-3">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    #{item.id}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <strong className="text-sm text-slate-800">Requisito:</strong>
                    <p className="text-sm text-slate-600 mt-1">{item.original}</p>
                  </div>
                  
                  {isAnalysis ? (
                    <>
                      <div>
                        <strong className="text-sm text-slate-800">Termos ambíguos:</strong>
                        <div className="mt-1">
                          {analysisItem.termosAmbiguos.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {analysisItem.termosAmbiguos.map((termo: string, index: number) => (
                                <span
                                  key={index}
                                  className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full"
                                >
                                  {termo}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Nenhum termo ambíguo
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <strong className="text-sm text-slate-800">Justificativa:</strong>
                        <p className="text-sm text-slate-600 mt-1">{analysisItem.justificativa}</p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <strong className="text-sm text-slate-800">Versão melhorada:</strong>
                      <p className="text-sm text-slate-600 mt-1">{improvementItem.reescrito}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
