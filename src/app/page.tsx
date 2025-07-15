"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { RequirementsInput } from "@/components/requirements-input"
import { ActionButtons } from "@/components/action-buttons"
import { ResultsSection } from "@/components/results-section"
import { ExportButton } from "@/components/export-button"
import { api } from "@/lib/axios"

export interface RequirementAnalysis {
  id: string
  original: string
  status: "clear" | "ambiguous"
  explanation?: string
  improved?: string
}

export default function RequAIPage() {
  const [requirements, setRequirements] = useState("")
  const [results, setResults] = useState<string>("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isImproving, setIsImproving] = useState(false)
  const [hasResults, setHasResults] = useState(false)

  const handleAnalyzeAmbiguity = async () => {
    if (!requirements.trim()) return

    setIsAnalyzing(true)

    try {
      const reqList = requirements.split("\n").filter((req) => req.trim())

      const response = await api.post('/gemini/analyze-ambiguity', {
        requirements: reqList
      })

      if (!response.data) {
        throw new Error('Erro na análise de ambiguidade')
      }
      console.log(response.data)
      
      // Usar resposta direta do backend
      setResults(response.data || "Nenhum resultado retornado")
      setHasResults(true)
    } catch (error) {
      console.error('Erro ao analisar requisitos:', error)
      // Fallback para mensagem de erro
      setResults("Erro ao analisar requisitos. Tente novamente.")
      setHasResults(true)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleImproveRequirements = async () => {
    if (!requirements.trim()) return

    setIsImproving(true)

    try {
      const reqList = requirements.split("\n").filter((req) => req.trim())

      const response = await api.post('/gemini/improve-requirements', {
        requirements: reqList
      })

      if (!response.data) {
        throw new Error('Erro na melhoria de requisitos')
      }
      console.log(response.data)
      
      // Usar resposta direta do backend
      setResults(response.data || "Nenhum resultado retornado")
      setHasResults(true)
    } catch (error) {
      console.error('Erro ao melhorar requisitos:', error)
      // Fallback para mensagem de erro
      setResults("Erro ao melhorar requisitos. Tente novamente.")
      setHasResults(true)
    } finally {
      setIsImproving(false)
    }
  }

  const handleExport = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      originalRequirements: requirements,
      analysis: results,
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `requai-analysis-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <RequirementsInput value={requirements} onChange={setRequirements} />

            <ActionButtons
              onAnalyzeAmbiguity={handleAnalyzeAmbiguity}
              onImproveRequirements={handleImproveRequirements}
              isAnalyzing={isAnalyzing}
              isImproving={isImproving}
              disabled={!requirements.trim()}
            />
          </div>

          <div className="space-y-6">
            <ResultsSection results={results} />

            <ExportButton onClick={handleExport} disabled={!hasResults} />
          </div>
        </div>
      </div>
    </div>
  )
}
