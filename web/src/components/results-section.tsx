import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, BarChart3 } from "lucide-react"
import type { RequirementAnalysis } from "@/app/page"

interface ResultsSectionProps {
  results: RequirementAnalysis[]
}

export function ResultsSection({ results }: ResultsSectionProps) {
  if (results.length === 0) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-slate-400" />
            <CardTitle className="text-xl text-slate-400">Resultados da Análise</CardTitle>
          </div>
          <CardDescription>Os resultados aparecerão aqui após a análise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-slate-400">
            <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Aguardando análise dos requisitos...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const clearCount = results.filter((r) => r.status === "clear").length
  const ambiguousCount = results.filter((r) => r.status === "ambiguous").length

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-green-600" />
          <CardTitle className="text-xl">Resultados da Análise</CardTitle>
        </div>
        <CardDescription>
          Análise completa de {results.length} requisito{results.length !== 1 ? "s" : ""}
        </CardDescription>

        <div className="flex gap-4 mt-4">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            {clearCount} Claro{clearCount !== 1 ? "s" : ""}
          </Badge>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {ambiguousCount} Ambíguo{ambiguousCount !== 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={result.id} className="border rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {result.status === "clear" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">REQ-{String(index + 1).padStart(2, "0")}</span>
                    <Badge
                      variant={result.status === "clear" ? "default" : "secondary"}
                      className={
                        result.status === "clear" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {result.status === "clear" ? "Claro" : "Ambíguo"}
                    </Badge>
                  </div>

                  <p className="text-sm font-medium text-slate-900">{result.original}</p>

                  {result.explanation && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <p className="text-xs font-medium text-yellow-800 mb-1">Problema identificado:</p>
                      <p className="text-xs text-yellow-700">{result.explanation}</p>
                    </div>
                  )}

                  {result.improved && (
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <p className="text-xs font-medium text-green-800 mb-1">Versão melhorada:</p>
                      <p className="text-xs text-green-700">{result.improved}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
