import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

interface ResultsSectionProps {
  results: string
}

export function ResultsSection({ results }: ResultsSectionProps) {
  if (!results || results.trim().length === 0) {
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

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-green-600" />
          <CardTitle className="text-xl">Resultados da Análise</CardTitle>
        </div>
        <CardDescription>
          Análise gerada pela IA
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="bg-slate-50/50 rounded-lg p-4 border">
          <div className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed">
            {results}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
