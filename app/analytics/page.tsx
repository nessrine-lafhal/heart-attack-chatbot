"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Heart,
  Activity,
  AlertTriangle,
  Download,
  Filter,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AnalyticsPage() {
  const router = useRouter()
  const [selectedMetric, setSelectedMetric] = useState("risk-distribution")

  // Simulated data based on heart attack dataset
  const analyticsData = {
    overview: {
      totalPatients: 303,
      highRisk: 138,
      lowRisk: 165,
      avgAge: 54.4,
      maleRatio: 68.3,
      femaleRatio: 31.7,
    },
    riskFactors: [
      { name: "Âge > 60 ans", percentage: 42, count: 127, severity: "medium" },
      { name: "Sexe masculin", percentage: 68, count: 207, severity: "high" },
      { name: "Douleur thoracique", percentage: 85, count: 258, severity: "high" },
      { name: "Hypertension", percentage: 56, count: 170, severity: "high" },
      { name: "Cholestérol élevé", percentage: 34, count: 103, severity: "medium" },
      { name: "Diabète", percentage: 15, count: 45, severity: "medium" },
      { name: "Tabagisme", percentage: 28, count: 85, severity: "high" },
    ],
    ageDistribution: [
      { range: "29-40", count: 45, risk: "low" },
      { range: "41-50", count: 89, risk: "medium" },
      { range: "51-60", count: 102, risk: "medium" },
      { range: "61-70", count: 52, risk: "high" },
      { range: "71-77", count: 15, risk: "high" },
    ],
    clinicalParameters: [
      { name: "Pression artérielle", avg: 131.6, unit: "mmHg", normal: "<120", status: "elevated" },
      { name: "Cholestérol", avg: 246.3, unit: "mg/dL", normal: "<200", status: "high" },
      { name: "Fréquence cardiaque max", avg: 149.6, unit: "bpm", normal: "220-âge", status: "normal" },
      { name: "Dépression ST", avg: 1.04, unit: "mm", normal: "<1", status: "elevated" },
    ],
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "text-red-600"
      case "elevated":
        return "text-yellow-600"
      case "normal":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="bg-blue-500 p-2 rounded-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Analyses Cardiaques</h1>
                <p className="text-sm text-gray-500">Dataset de 303 patients</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.totalPatients}</div>
              <p className="text-xs text-muted-foreground">Échantillon complet analysé</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Haut Risque</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{analyticsData.overview.highRisk}</div>
              <p className="text-xs text-muted-foreground">
                {((analyticsData.overview.highRisk / analyticsData.overview.totalPatients) * 100).toFixed(1)}% du total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Âge Moyen</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.avgAge} ans</div>
              <p className="text-xs text-muted-foreground">Population étudiée</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ratio H/F</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.maleRatio.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Hommes dans l'échantillon</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="risk-factors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="risk-factors">Facteurs de Risque</TabsTrigger>
            <TabsTrigger value="age-analysis">Analyse par Âge</TabsTrigger>
            <TabsTrigger value="clinical-params">Paramètres Cliniques</TabsTrigger>
            <TabsTrigger value="predictions">Prédictions</TabsTrigger>
          </TabsList>

          <TabsContent value="risk-factors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Distribution des Facteurs de Risque</span>
                </CardTitle>
                <CardDescription>Prévalence des facteurs de risque dans la population étudiée</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.riskFactors.map((factor, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{factor.name}</span>
                          <Badge className={getSeverityColor(factor.severity)}>{factor.severity}</Badge>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">{factor.percentage}%</span>
                          <span className="text-sm text-gray-500 ml-2">({factor.count} patients)</span>
                        </div>
                      </div>
                      <Progress value={factor.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="age-analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribution par Âge</CardTitle>
                  <CardDescription>Répartition des patients par tranche d'âge</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.ageDistribution.map((age, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <span className="font-medium">{age.range} ans</span>
                          <Badge className={`ml-2 ${getSeverityColor(age.risk)}`}>{age.risk}</Badge>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">{age.count}</span>
                          <span className="text-sm text-gray-500 ml-1">patients</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analyse du Risque par Âge</CardTitle>
                  <CardDescription>Corrélation entre l'âge et le niveau de risque</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">29-50 ans (Faible risque)</h4>
                      <p className="text-sm text-green-700">
                        134 patients - Facteurs de risque généralement modifiables
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">51-60 ans (Risque modéré)</h4>
                      <p className="text-sm text-yellow-700">102 patients - Surveillance accrue recommandée</p>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">60+ ans (Haut risque)</h4>
                      <p className="text-sm text-red-700">67 patients - Suivi médical régulier nécessaire</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clinical-params" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  <span>Paramètres Cliniques Moyens</span>
                </CardTitle>
                <CardDescription>Valeurs moyennes des paramètres cliniques dans le dataset</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {analyticsData.clinicalParameters.map((param, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{param.name}</h4>
                        <Badge variant="outline" className={getStatusColor(param.status)}>
                          {param.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Moyenne:</span>
                          <span className="font-medium">
                            {param.avg} {param.unit}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Normal:</span>
                          <span className="text-sm">{param.normal}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Corrélations Importantes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">Âge ↔ Pression artérielle</span>
                      <Badge variant="outline">r = 0.68</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">Cholestérol ↔ Risque</span>
                      <Badge variant="outline">r = 0.45</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">Sexe ↔ Risque</span>
                      <Badge variant="outline">r = 0.52</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seuils Critiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-2 border-l-4 border-red-500 bg-red-50">
                      <span className="text-sm font-medium">Pression &gt; 140 mmHg</span>
                      <p className="text-xs text-red-600">Risque élevé identifié</p>
                    </div>
                    <div className="p-2 border-l-4 border-yellow-500 bg-yellow-50">
                      <span className="text-sm font-medium">Cholestérol &gt; 240 mg/dL</span>
                      <p className="text-xs text-yellow-600">Surveillance nécessaire</p>
                    </div>
                    <div className="p-2 border-l-4 border-blue-500 bg-blue-50">
                      <span className="text-sm font-medium">Âge &gt; 65 ans</span>
                      <p className="text-xs text-blue-600">Facteur de risque majeur</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-purple-500" />
                  <span>Modèle Prédictif</span>
                </CardTitle>
                <CardDescription>Performance du modèle d'IA basé sur le dataset</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">87.5%</div>
                    <div className="text-sm text-gray-600">Précision</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">84.2%</div>
                    <div className="text-sm text-gray-600">Sensibilité</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">91.3%</div>
                    <div className="text-sm text-gray-600">Spécificité</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Variables les plus prédictives :</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Douleur thoracique (cp)</span>
                      <Badge variant="outline">Importance: 0.23</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Fréquence cardiaque max (thalach)</span>
                      <Badge variant="outline">Importance: 0.19</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Dépression ST (oldpeak)</span>
                      <Badge variant="outline">Importance: 0.16</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Sexe (sex)</span>
                      <Badge variant="outline">Importance: 0.14</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Matrice de Confusion</CardTitle>
                  <CardDescription>Performance détaillée du modèle</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">142</div>
                      <div className="text-sm text-green-700">Vrais Positifs</div>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">18</div>
                      <div className="text-sm text-red-700">Faux Positifs</div>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">20</div>
                      <div className="text-sm text-red-700">Faux Négatifs</div>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">123</div>
                      <div className="text-sm text-green-700">Vrais Négatifs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommandations IA</CardTitle>
                  <CardDescription>Suggestions d'amélioration du modèle</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-800 text-sm mb-1">Collecte de données</h4>
                      <p className="text-xs text-blue-700">
                        Augmenter l'échantillon de patients féminins (actuellement 31.7%)
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 text-sm mb-1">Variables supplémentaires</h4>
                      <p className="text-xs text-yellow-700">Intégrer l'historique familial et les habitudes de vie</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-800 text-sm mb-1">Validation croisée</h4>
                      <p className="text-xs text-green-700">Tester sur des populations externes pour généralisation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
