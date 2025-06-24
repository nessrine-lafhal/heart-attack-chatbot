"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Bot,
  BarChart3,
  Users,
  Activity,
  TrendingUp,
  MessageCircle,
  Database,
  Brain,
  Stethoscope,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalPatients: 303,
    highRiskPatients: 138,
    lowRiskPatients: 165,
    avgAge: 54.4,
    malePatients: 207,
    femalePatients: 96,
  })

  const [recentActivity] = useState([
    { id: 1, type: "chat", message: "Patient consulté pour douleur thoracique", time: "2 min" },
    { id: 2, type: "analysis", message: "Analyse de risque complétée", time: "5 min" },
    { id: 3, type: "alert", message: "Patient à haut risque identifié", time: "12 min" },
    { id: 4, type: "chat", message: "Consultation chatbot terminée", time: "18 min" },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-red-500 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">CardioBot AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Système actif
              </Badge>
              <Button onClick={() => router.push("/chat")} className="bg-red-500 hover:bg-red-600">
                <MessageCircle className="h-4 w-4 mr-2" />
                Ouvrir le Chat
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord Cardiaque</h2>
          <p className="text-gray-600">
            Analysez les données de santé cardiaque et interagissez avec votre assistant IA
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPatients}</div>
              <p className="text-xs text-muted-foreground">Dataset complet analysé</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Haut Risque</CardTitle>
              <Activity className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.highRiskPatients}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.highRiskPatients / stats.totalPatients) * 100).toFixed(1)}% du total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faible Risque</CardTitle>
              <Heart className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.lowRiskPatients}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.lowRiskPatients / stats.totalPatients) * 100).toFixed(1)}% du total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Âge Moyen</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgAge} ans</div>
              <p className="text-xs text-muted-foreground">Population étudiée</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Distribution des Risques</span>
                </CardTitle>
                <CardDescription>Répartition des patients selon le niveau de risque cardiaque</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Haut Risque</span>
                    <span>{stats.highRiskPatients} patients</span>
                  </div>
                  <Progress value={(stats.highRiskPatients / stats.totalPatients) * 100} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Faible Risque</span>
                    <span>{stats.lowRiskPatients} patients</span>
                  </div>
                  <Progress value={(stats.lowRiskPatients / stats.totalPatients) * 100} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Chatbot Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <span>Fonctionnalités du Chatbot</span>
                </CardTitle>
                <CardDescription>Capacités d'analyse basées sur le dataset cardiaque</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <Brain className="h-8 w-8 text-blue-500 mb-2" />
                    <h3 className="font-semibold mb-1">Analyse Prédictive</h3>
                    <p className="text-sm text-gray-600">Évaluation du risque basée sur 13 paramètres cliniques</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Stethoscope className="h-8 w-8 text-green-500 mb-2" />
                    <h3 className="font-semibold mb-1">Consultation Virtuelle</h3>
                    <p className="text-sm text-gray-600">Questions-réponses sur les facteurs de risque cardiaque</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Database className="h-8 w-8 text-purple-500 mb-2" />
                    <h3 className="font-semibold mb-1">Base de Connaissances</h3>
                    <p className="text-sm text-gray-600">303 cas cliniques pour des réponses précises</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Activity className="h-8 w-8 text-red-500 mb-2" />
                    <h3 className="font-semibold mb-1">Monitoring Continu</h3>
                    <p className="text-sm text-gray-600">Suivi des paramètres vitaux et alertes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => router.push("/chat")}
                  className="w-full justify-start bg-red-500 hover:bg-red-600"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Démarrer une Consultation
                </Button>
                <Button onClick={() => router.push("/analytics")} variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Voir les Analyses
                </Button>
                <Button onClick={() => router.push("/patients")} variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Gérer les Patients
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Activité Récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div
                        className={`p-1 rounded-full ${
                          activity.type === "chat"
                            ? "bg-blue-100"
                            : activity.type === "analysis"
                              ? "bg-green-100"
                              : "bg-red-100"
                        }`}
                      >
                        {activity.type === "chat" ? (
                          <MessageCircle className="h-3 w-3 text-blue-600" />
                        ) : activity.type === "analysis" ? (
                          <BarChart3 className="h-3 w-3 text-green-600" />
                        ) : (
                          <Activity className="h-3 w-3 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dataset Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informations Dataset</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Patients masculins:</span>
                  <span className="font-medium">{stats.malePatients}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Patients féminins:</span>
                  <span className="font-medium">{stats.femalePatients}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Variables analysées:</span>
                  <span className="font-medium">13</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Dernière mise à jour:</span>
                  <span className="font-medium">Aujourd'hui</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
