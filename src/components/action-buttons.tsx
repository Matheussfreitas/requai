"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Sparkles, Loader2 } from "lucide-react"

interface ActionButtonsProps {
  onAnalyzeAmbiguity: () => void
  onImproveRequirements: () => void
  isAnalyzing: boolean
  isImproving: boolean
  disabled: boolean
}

export function ActionButtons({
  onAnalyzeAmbiguity,
  onImproveRequirements,
  isAnalyzing,
  isImproving,
  disabled,
}: ActionButtonsProps) {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Button
            onClick={onAnalyzeAmbiguity}
            disabled={disabled || isAnalyzing || isImproving}
            className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium cursor-pointer"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analisando...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Analisar Ambiguidade
              </>
            )}
          </Button>

          <Button
            onClick={onImproveRequirements}
            disabled={disabled || isAnalyzing || isImproving}
            className="h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium cursor-pointer"
            size="lg"
          >
            {isImproving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Melhorando...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Melhorar Requisitos
              </>
            )}
          </Button>
        </div>

        <div className="mt-4 text-xs text-slate-500 space-y-1">
          <p>
            <strong>Analisar Ambiguidade:</strong> Identifica termos vagos e imprecisos
          </p>
          <p>
            <strong>Melhorar Requisitos:</strong> Reescreve com maior clareza e especificidade
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
