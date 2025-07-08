"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { RequirementsInput } from "@/components/requirements-input"
import { ActionButtons } from "@/components/action-buttons"
import { ResultsSection } from "@/components/results-section"
import { ExportButton } from "@/components/export-button"

export interface RequirementAnalysis {
  id: string
  original: string
  status: "clear" | "ambiguous"
  explanation?: string
  improved?: string
}

export default function RequAIPage() {
  const [requirements, setRequirements] = useState("")
  const [results, setResults] = useState<RequirementAnalysis[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isImproving, setIsImproving] = useState(false)
  const [hasResults, setHasResults] = useState(false)

  const handleAnalyzeAmbiguity = async () => {
    if (!requirements.trim()) return

    setIsAnalyzing(true)

    // Simular análise da LLM
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const reqList = requirements.split("\n").filter((req) => req.trim())
    const analysisResults: RequirementAnalysis[] = reqList.map((req, index) => ({
      id: `req-${index}`,
      original: req.trim(),
      status: Math.random() > 0.6 ? "ambiguous" : "clear",
      explanation:
        Math.random() > 0.6
          ? "Este requisito contém termos vagos como 'rápido' e 'fácil' que podem ser interpretados de diferentes formas."
          : undefined,
    }))

    setResults(analysisResults)
    setHasResults(true)
    setIsAnalyzing(false)
  }

  const handleImproveRequirements = async () => {
    if (!requirements.trim()) return

    setIsImproving(true)

    // Simular melhoria da LLM
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const reqList = requirements.split("\n").filter((req) => req.trim())
    const improvedResults: RequirementAnalysis[] = reqList.map((req, index) => ({
      id: `req-${index}`,
      original: req.trim(),
      status: "clear",
      improved: `${req.trim()} [Versão melhorada com critérios específicos e mensuráveis]`,
    }))

    setResults(improvedResults)
    setHasResults(true)
    setIsImproving(false)
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
