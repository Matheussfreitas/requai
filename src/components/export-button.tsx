"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download } from "lucide-react"

interface ExportButtonProps {
  onClick: () => void
  disabled: boolean
}

export function ExportButton({ onClick, disabled }: ExportButtonProps) {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="pt-6">
        <Button
          onClick={onClick}
          disabled={disabled}
          className="w-full h-12 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-300 text-white font-medium"
          size="lg"
        >
          <Download className="mr-2 h-4 w-4" />
          Exportar Resultado
        </Button>

        <p className="text-xs text-slate-500 mt-2 text-center">
          {disabled ? "Execute uma análise para habilitar a exportação" : "Baixar análise em formato JSON"}
        </p>
      </CardContent>
    </Card>
  )
}
