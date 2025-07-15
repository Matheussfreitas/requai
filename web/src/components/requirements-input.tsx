"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FileText } from "lucide-react"

interface RequirementsInputProps {
  value: string
  onChange: (value: string) => void
}

export function RequirementsInput({ value, onChange }: RequirementsInputProps) {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-xl">Requisitos do Sistema</CardTitle>
        </div>
        <CardDescription>Cole ou digite os requisitos que deseja analisar, um por linha</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="requirements" className="text-sm font-medium">
            Requisitos (um por linha)
          </Label>
          <Textarea
            id="requirements"
            placeholder={`Exemplo:
O sistema deve ser rápido
O usuário deve conseguir fazer login facilmente
A aplicação deve ter boa performance
O sistema deve ser seguro e confiável`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[200px] resize-none border-slate-200 focus:border-blue-500 focus:ring-blue-500"
            aria-describedby="requirements-help"
          />
          <p id="requirements-help" className="text-xs text-slate-500">
            Dica: Seja específico nos requisitos para obter análises mais precisas
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
