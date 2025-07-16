"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { RequirementsInput } from "@/components/requirements-input"
import { ActionButtons } from "@/components/action-buttons"
import { ResultsSection } from "@/components/results-section"
import { ExportButton } from "@/components/export-button"
import { api } from "@/lib/axios"
import jsPDF from "jspdf"

export interface RequirementAnalysis {
  id: number;
  original: string;
  termosAmbiguos: string[];
  justificativa: string;
}

export interface RequirementImprovement {
  id: number;
  original: string;
  reescrito: string;
}

interface APIError {
  error: string;
  rawResponse?: string;
}

export default function RequAIPage() {
  const [requirements, setRequirements] = useState("")
  const [results, setResults] = useState<RequirementAnalysis[] | RequirementImprovement[]>([])
  const [resultType, setResultType] = useState<'analysis' | 'improvement'>('analysis')
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
      
      console.log('Resposta recebida:', response.data)
      console.log('Tipo da resposta:', typeof response.data)

      // Verificar se houve erro na API
      if ('error' in response.data) {
        const errorData = response.data as APIError;
        console.error('Erro da API:', errorData.error)
        console.error('Resposta bruta:', errorData.rawResponse)
        throw new Error(errorData.error)
      }

      // A API já retorna o objeto parseado
      const analise: RequirementAnalysis[] = response.data

      // Verificar se é um array válido
      if (!Array.isArray(analise)) {
        console.error('Resposta não é um array:', analise)
        throw new Error('Formato de resposta inválido')
      }

      setResults(analise)
      setResultType('analysis')
      setHasResults(true)
    } catch (error) {
      console.error('Erro ao analisar requisitos:', error)
      // Fallback para mensagem de erro
      setResults([])
      setHasResults(false)
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
      console.log('Resposta recebida:', response.data)
      console.log('Tipo da resposta:', typeof response.data)
      
      // Verificar se houve erro na API
      if ('error' in response.data) {
        const errorData = response.data as APIError;
        console.error('Erro da API:', errorData.error)
        console.error('Resposta bruta:', errorData.rawResponse)
        throw new Error(errorData.error)
      }

      // A API já retorna o objeto parseado
      const melhoramentos: RequirementImprovement[] = response.data

      // Verificar se é um array válido
      if (!Array.isArray(melhoramentos)) {
        console.error('Resposta não é um array:', melhoramentos)
        throw new Error('Formato de resposta inválido')
      }
      
      setResults(melhoramentos)
      setResultType('improvement')
      setHasResults(true)
    } catch (error) {
      console.error('Erro ao melhorar requisitos:', error)
      // Fallback para mensagem de erro
      setResults([])
      setHasResults(false)
    } finally {
      setIsImproving(false)
    }
  }

  const handleExport = () => {
    const doc = new jsPDF()
    
    // Configurar fonte e título
    doc.setFontSize(20)
    doc.text("RequAI - Análise de Requisitos", 20, 20)
    
    // Data e hora
    const now = new Date()
    doc.setFontSize(12)
    doc.text(`Data: ${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR')}`, 20, 35)
    
    // Requisitos originais
    doc.setFontSize(16)
    doc.text("Requisitos Originais:", 20, 55)
    
    doc.setFontSize(11)
    const reqLines = requirements.split('\n').filter(line => line.trim())
    let yPosition = 70
    
    reqLines.forEach((req, index) => {
      const wrappedText = doc.splitTextToSize(`${index + 1}. ${req}`, 170)
      doc.text(wrappedText, 20, yPosition)
      yPosition += wrappedText.length * 5 + 5
    })
    
    // Análise/Resultado
    yPosition += 10
    doc.setFontSize(16)
    doc.text("Análise:", 20, yPosition)
    yPosition += 15
    
    doc.setFontSize(11)
    if (results && results.length > 0) {
      results.forEach((item) => {
        // Título do requisito
        doc.setFontSize(12)
        doc.text(`Requisito #${item.id}`, 20, yPosition)
        yPosition += 10
        
        // Requisito original
        doc.setFontSize(10)
        const originalText = doc.splitTextToSize(`Original: ${item.original}`, 170)
        doc.text(originalText, 20, yPosition)
        yPosition += originalText.length * 5 + 5
        
        if (resultType === 'analysis') {
          const analysisItem = item as RequirementAnalysis
          // Termos ambíguos
          const ambiguousTerms = analysisItem.termosAmbiguos.length > 0 
            ? analysisItem.termosAmbiguos.join(", ") 
            : "Nenhum"
          const ambiguousText = doc.splitTextToSize(`Termos ambíguos: ${ambiguousTerms}`, 170)
          doc.text(ambiguousText, 20, yPosition)
          yPosition += ambiguousText.length * 5 + 5
          
          // Justificativa
          const justificationText = doc.splitTextToSize(`Justificativa: ${analysisItem.justificativa}`, 170)
          doc.text(justificationText, 20, yPosition)
          yPosition += justificationText.length * 5 + 10
        } else if (resultType === 'improvement') {
          const improvementItem = item as RequirementImprovement
          // Versão melhorada
          const improvedText = doc.splitTextToSize(`Versão melhorada: ${improvementItem.reescrito}`, 170)
          doc.text(improvedText, 20, yPosition)
          yPosition += improvedText.length * 5 + 10
        }
        
        // Adicionar nova página se necessário
        if (yPosition > 250) {
          doc.addPage()
          yPosition = 20
        }
      })
    }
    
    // Salvar o PDF
    doc.save(`requai-analysis-${new Date().toISOString().split("T")[0]}.pdf`)
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

            <ExportButton onClick={handleExport} disabled={!hasResults || results.length === 0} />
          </div>
        </div>
      </div>
    </div>
  )
}
