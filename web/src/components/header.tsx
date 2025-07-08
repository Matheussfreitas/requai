import { Brain, Zap } from "lucide-react"

export function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="relative">
          <Brain className="h-10 w-10 text-blue-600" />
          <Zap className="h-5 w-5 text-yellow-500 absolute -top-1 -right-1" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          RequAI
        </h1>
      </div>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
        Sistema inteligente para validação e melhoria de requisitos de software
      </p>
      <p className="text-sm text-slate-500 mt-2">Versão 0.1 - Análise de ambiguidade e otimização com IA</p>
    </header>
  )
}
