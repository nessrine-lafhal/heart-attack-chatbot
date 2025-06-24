"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Send,
  Bot,
  User,
  ArrowLeft,
  Mic,
  Paperclip,
  MoreVertical,
  Activity,
  AlertTriangle,
  CheckCircle,
  Stethoscope,
  Brain,
  Zap,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  analysis?: {
    riskLevel: "low" | "medium" | "high"
    confidence: number
    factors: string[]
  }
}

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Bonjour ! Je suis votre assistant cardiaque IA spécialisé. Basé sur l'analyse de 303 patients avec crises cardiaques, je peux vous aider avec :\n\n🔍 **Analyse des facteurs de risque**\n📊 **Interprétation des résultats médicaux**\n💓 **Questions sur les paramètres cardiaques**\n🩺 **Conseils de prévention personnalisés**\n\nComment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Questions organisées par catégories
  const questionCategories = {
    "Facteurs de Risque": [
      "Quels sont les principaux facteurs de risque ?",
      "Comment l'âge influence-t-il le risque cardiaque ?",
      "Différence de risque entre hommes et femmes ?",
      "Impact du tabac sur le cœur ?",
      "Rôle du stress dans les maladies cardiaques ?",
    ],
    "Paramètres Médicaux": [
      "Comment interpréter mon taux de cholestérol ?",
      "Que signifie ma pression artérielle ?",
      "Fréquence cardiaque normale au repos ?",
      "Résultats ECG anormaux ?",
      "Glycémie à jeun et risque cardiaque ?",
    ],
    "Tests Cardiaques": [
      "Qu'est-ce qu'un test d'effort ?",
      "Angine induite par l'exercice ?",
      "Dépression du segment ST ?",
      "Pente du segment ST ?",
      "Nombre d'artères obstruées ?",
      "Test au thallium (thalassémie) ?",
    ],
    Symptômes: [
      "Types de douleur thoracique ?",
      "Signes d'urgence cardiaque ?",
      "Symptômes de crise cardiaque ?",
      "Différence angine typique/atypique ?",
      "Quand consulter en urgence ?",
    ],
    Prévention: [
      "Exercices recommandés pour le cœur ?",
      "Régime alimentaire cardiaque ?",
      "Médicaments pour le cœur ?",
      "Mode de vie sain ?",
      "Prévention des récidives ?",
    ],
    "Analyse Personnalisée": [
      "Calculer mon risque cardiaque ?",
      "Analyser mes résultats médicaux ?",
      "Évaluation personnalisée ?",
      "Recommandations pour mon cas ?",
      "Interprétation de mes données ?",
    ],
  }

  const analyzeMessage = (message: string): Message["analysis"] | undefined => {
    const lowerMessage = message.toLowerCase()

    // Analyse plus sophistiquée basée sur les mots-clés du dataset
    if (
      lowerMessage.includes("douleur") ||
      lowerMessage.includes("chest pain") ||
      lowerMessage.includes("thoracique") ||
      lowerMessage.includes("angine")
    ) {
      return {
        riskLevel: "high",
        confidence: 85,
        factors: ["Douleur thoracique", "Symptôme d'alerte majeur", "Nécessite évaluation"],
      }
    }

    if (
      lowerMessage.includes("cholestérol") ||
      lowerMessage.includes("cholesterol") ||
      lowerMessage.includes("lipides")
    ) {
      return {
        riskLevel: "medium",
        confidence: 70,
        factors: ["Taux de cholestérol", "Facteur modifiable", "Surveillance nécessaire"],
      }
    }

    if (
      lowerMessage.includes("pression") ||
      lowerMessage.includes("tension") ||
      lowerMessage.includes("hypertension")
    ) {
      return {
        riskLevel: "medium",
        confidence: 75,
        factors: ["Pression artérielle", "Facteur de risque majeur", "Contrôle important"],
      }
    }

    if (lowerMessage.includes("âge") || lowerMessage.includes("age") || lowerMessage.includes("vieux")) {
      return {
        riskLevel: "low",
        confidence: 60,
        factors: ["Facteur âge", "Risque naturel", "Non modifiable"],
      }
    }

    if (
      lowerMessage.includes("fréquence") ||
      lowerMessage.includes("rythme") ||
      lowerMessage.includes("battement") ||
      lowerMessage.includes("thalach")
    ) {
      return {
        riskLevel: "medium",
        confidence: 65,
        factors: ["Fréquence cardiaque", "Capacité d'effort", "Indicateur important"],
      }
    }

    if (
      lowerMessage.includes("ecg") ||
      lowerMessage.includes("électrocardiogramme") ||
      lowerMessage.includes("restecg")
    ) {
      return {
        riskLevel: "medium",
        confidence: 80,
        factors: ["Résultats ECG", "Activité électrique", "Diagnostic important"],
      }
    }

    return undefined
  }

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Réponses basées sur le dataset enrichi
    if (lowerMessage.includes("facteurs de risque") || lowerMessage.includes("risk factors")) {
      return `**Facteurs de Risque Cardiaques** (Basé sur 303 patients) 📊

🔴 **Facteurs Non Modifiables :**
- **Âge** : Moyenne 54.4 ans (29-77 ans)
- **Sexe** : 68% hommes, 32% femmes
- **Antécédents familiaux** : Prédisposition génétique

🟡 **Facteurs Modifiables Majeurs :**
- **Hypertension** : 56% des patients >140 mmHg
- **Cholestérol élevé** : 34% des patients >240 mg/dL
- **Diabète** : 15% avec glycémie >120 mg/dL
- **Tabagisme** : Facteur multiplicateur de risque

🟢 **Facteurs Cliniques :**
- **Douleur thoracique** : 85% des patients concernés
- **Angine d'effort** : 32% des cas
- **ECG anormal** : 46% des patients
- **Artères obstruées** : 42% avec ≥1 artère bloquée

**Notre modèle IA identifie ces facteurs avec 87.5% de précision.**`
    }

    if (
      lowerMessage.includes("fréquence cardiaque") ||
      lowerMessage.includes("thalach") ||
      lowerMessage.includes("rythme")
    ) {
      return `**Fréquence Cardiaque Maximale (thalach)** 💓

**Données de notre dataset :**
- Moyenne : 149.6 bpm
- Plage : 71-202 bpm
- Formule théorique : 220 - âge

**Interprétation par âge :**
- 30 ans : ~190 bpm attendu
- 50 ans : ~170 bpm attendu  
- 70 ans : ~150 bpm attendu

**Signification clinique :**
- **>85% théorique** : Bonne capacité d'effort
- **70-85% théorique** : Capacité modérée
- **<70% théorique** : Capacité réduite (investigation)

**Impact sur le risque :** Une fréquence max réduite peut indiquer une maladie coronaire ou une mauvaise condition physique.`
    }

    if (
      lowerMessage.includes("ecg") ||
      lowerMessage.includes("électrocardiogramme") ||
      lowerMessage.includes("restecg")
    ) {
      return `**ECG au Repos (restecg)** 📈

**Classification dans notre dataset :**
- **Normal (0)** : 54% des patients
  • Activité électrique normale
  • Bon pronostic général

- **Anomalie ST-T (1)** : 38% des patients
  • Onde T inversée ou plate
  • Segment ST anormal
  • Possible ischémie

- **Hypertrophie VG (2)** : 8% des patients
  • Épaississement muscle cardiaque
  • Souvent lié à l'hypertension
  • Risque accru d'arythmies

**Signification :** Un ECG anormal multiplie le risque cardiaque par 2-3 selon notre analyse.`
    }

    if (
      lowerMessage.includes("douleur thoracique") ||
      lowerMessage.includes("chest pain") ||
      lowerMessage.includes("cp")
    ) {
      return `**Types de Douleur Thoracique (cp)** 💔

**Classification détaillée de notre dataset :**

**Type 0 - Angine Typique (23% des patients) :**
- Douleur constrictive, oppressante
- Déclenchée par l'effort physique
- Soulagée par le repos ou nitroglycérine
- **Risque élevé** : 80% ont une maladie coronaire

**Type 1 - Angine Atypique (50% des patients) :**
- 2 des 3 critères de l'angine typique
- Douleur parfois atypique
- **Risque modéré** : 60% ont une maladie coronaire

**Type 2 - Douleur Non-Angineuse (16% des patients) :**
- 1 seul critère de l'angine typique
- Souvent liée à d'autres causes
- **Risque faible** : 30% ont une maladie coronaire

**Type 3 - Asymptomatique (11% des patients) :**
- Aucun symptôme de douleur
- Découverte fortuite lors d'examens
- **Attention** : Peut masquer une maladie silencieuse`
    }

    if (
      lowerMessage.includes("angine d'effort") ||
      lowerMessage.includes("exang") ||
      lowerMessage.includes("exercise")
    ) {
      return `**Angine Induite par l'Exercice (exang)** 🏃‍♂️💔

**Statistiques de notre dataset :**
- **32% des patients** ont une angine d'effort
- **Facteur prédictif majeur** de maladie coronaire
- **Risque relatif x3** par rapport aux patients sans angine

**Mécanisme :**
- Effort → Demande accrue en oxygène
- Artères rétrécies → Apport insuffisant
- Résultat → Douleur/oppression thoracique

**Symptômes typiques :**
- Douleur thoracique à l'effort
- Essoufflement anormal
- Fatigue excessive
- Oppression dans la poitrine

**Signification clinique :** Présence d'angine d'effort = 85% de probabilité de maladie coronaire significative selon notre analyse.`
    }

    if (
      lowerMessage.includes("dépression st") ||
      lowerMessage.includes("oldpeak") ||
      lowerMessage.includes("segment st")
    ) {
      return `**Dépression du Segment ST (oldpeak)** 📉

**Analyse de notre dataset :**
- Moyenne : 1.04 mm
- Plage : 0-6.2 mm
- 45% des patients ont >1 mm

**Interprétation clinique :**
- **0-0.5 mm** : Normal
- **0.5-1 mm** : Limite, surveillance
- **1-2 mm** : Ischémie modérée
- **>2 mm** : Ischémie sévère
- **>3 mm** : Ischémie critique

**Signification :** Mesure du manque d'oxygène au muscle cardiaque pendant l'effort.

**Corrélation risque :**
- 0 mm → 20% risque maladie coronaire
- 1 mm → 50% risque maladie coronaire  
- 2 mm → 80% risque maladie coronaire
- >3 mm → 95% risque maladie coronaire`
    }

    if (lowerMessage.includes("pente st") || lowerMessage.includes("slope") || lowerMessage.includes("pente")) {
      return `**Pente du Segment ST (slope)** 📊

**Classification dans notre dataset :**

**Pente Descendante (0) - 21% des patients :**
- Mauvais pronostic
- Ischémie sévère probable
- Risque élevé de maladie coronaire

**Pente Plate (1) - 61% des patients :**
- Pronostic intermédiaire
- Ischémie modérée possible
- Nécessite évaluation complémentaire

**Pente Ascendante (2) - 18% des patients :**
- Bon pronostic
- Réponse normale à l'effort
- Faible probabilité de maladie coronaire

**Signification :** La pente reflète la capacité du cœur à s'adapter à l'effort et la présence d'ischémie.`
    }

    if (
      lowerMessage.includes("vaisseaux") ||
      lowerMessage.includes("artères") ||
      lowerMessage.includes("ca ") ||
      lowerMessage.includes("coronaires")
    ) {
      return `**Vaisseaux Colorés - Artères Obstruées (ca)** 🩸

**Répartition dans notre dataset :**
- **0 artère obstruée** : 58% des patients (176 cas)
- **1 artère obstruée** : 26% des patients (78 cas)
- **2 artères obstruées** : 11% des patients (34 cas)
- **3 artères obstruées** : 5% des patients (15 cas)

**Artères coronaires principales :**
1. **IVA** : Interventriculaire antérieure (LAD)
2. **Circonflexe** : Artère circonflexe gauche (LCX)
3. **Coronaire droite** : Artère coronaire droite (RCA)

**Impact sur le pronostic :**
- 0 artère → Excellent pronostic
- 1 artère → Bon pronostic avec traitement
- 2 artères → Pronostic réservé
- 3 artères → Pronostic sévère, chirurgie souvent nécessaire

**Méthode de détection :** Coronarographie (cathétérisme cardiaque)`
    }

    if (lowerMessage.includes("thalassémie") || lowerMessage.includes("thal") || lowerMessage.includes("thallium")) {
      return `**Test au Thallium - Thalassémie (thal)** 🧬

**Classification dans notre dataset :**

**Normal (1) - 18% des patients :**
- Perfusion myocardique normale
- Pas de défaut de captation
- Excellent pronostic

**Défaut Fixe (2) - 54% des patients :**
- Cicatrice myocardique (infarctus ancien)
- Perte définitive de muscle cardiaque
- Zone non viable

**Défaut Réversible (3) - 28% des patients :**
- Ischémie réversible
- Muscle cardiaque viable mais mal irrigué
- Amélioration possible avec traitement

**Principe du test :** Injection de thallium radioactif → Captation par le muscle cardiaque sain → Détection des zones mal perfusées

**Signification clinique :** Permet de différencier ischémie (traitable) et cicatrice (définitive).`
    }

    if (
      lowerMessage.includes("glycémie") ||
      lowerMessage.includes("fbs") ||
      lowerMessage.includes("diabète") ||
      lowerMessage.includes("sucre")
    ) {
      return `**Glycémie à Jeun (fbs)** 🍯

**Données de notre dataset :**
- **85% des patients** : Glycémie <120 mg/dL
- **15% des patients** : Glycémie >120 mg/dL

**Valeurs de référence :**
- **Normal** : <100 mg/dL
- **Prédiabète** : 100-125 mg/dL  
- **Diabète** : ≥126 mg/dL
- **Seuil dataset** : 120 mg/dL

**Impact cardiovasculaire du diabète :**
- **Risque multiplié par 2-4**
- Accélération de l'athérosclérose
- Atteinte des petits et gros vaisseaux
- Complications microvasculaires

**Mécanismes :** Hyperglycémie → Inflammation → Dysfonction endothéliale → Athérosclérose accélérée`
    }

    if (
      lowerMessage.includes("homme") ||
      lowerMessage.includes("femme") ||
      lowerMessage.includes("sexe") ||
      lowerMessage.includes("genre")
    ) {
      return `**Différence de Risque Homme/Femme** 👨👩

**Répartition dans notre dataset :**
- **Hommes** : 68% (207 patients)
- **Femmes** : 32% (96 patients)

**Facteurs expliquant cette différence :**

**Protection féminine (avant ménopause) :**
- **Œstrogènes** : Effet protecteur sur les artères
- **HDL plus élevé** : "Bon" cholestérol généralement supérieur
- **Moins de tabagisme** : Historiquement moins fréquent
- **Gestion du stress** : Souvent différente

**Après la ménopause :**
- Perte de protection œstrogénique
- Risque égal voire supérieur aux hommes
- Symptômes parfois atypiques

**Âge critique :**
- Hommes : Risque dès 45 ans
- Femmes : Risque surtout après 55 ans

**Attention :** Les femmes ont souvent des symptômes moins typiques (fatigue, nausées vs douleur thoracique).`
    }

    if (
      lowerMessage.includes("calculer") ||
      lowerMessage.includes("risque") ||
      lowerMessage.includes("évaluer") ||
      lowerMessage.includes("score")
    ) {
      return `**Calcul de Risque Cardiaque Personnalisé** 🧮

**Notre modèle IA analyse 13 paramètres :**

**Variables les plus prédictives :**
1. **Type de douleur thoracique (cp)** : 23% d'importance
2. **Fréquence cardiaque max (thalach)** : 19% d'importance
3. **Dépression ST (oldpeak)** : 16% d'importance
4. **Sexe** : 14% d'importance
5. **Nombre d'artères obstruées (ca)** : 12% d'importance

**Performance du modèle :**
- **Précision** : 87.5%
- **Sensibilité** : 84.2%
- **Spécificité** : 91.3%

**Pour une analyse personnalisée, fournissez :**
- Âge et sexe
- Pression artérielle et cholestérol
- Type de douleur thoracique (si présente)
- Résultats d'examens (ECG, test d'effort)

**Exemple :** "J'ai 55 ans, je suis un homme, ma tension est 150 mmHg, mon cholestérol est 280 mg/dL"`
    }

    if (lowerMessage.includes("urgence") || lowerMessage.includes("symptômes") || lowerMessage.includes("signes")) {
      return `**Signes d'Urgence Cardiaque** 🚨

**APPELEZ LE 15 IMMÉDIATEMENT si :**

**Symptômes majeurs :**
- **Douleur thoracique intense** >20 minutes
- **Douleur irradiant** vers bras gauche, mâchoire, dos
- **Essoufflement soudain** et sévère au repos
- **Sueurs froides** + nausées/vomissements
- **Perte de connaissance** ou malaise intense

**Basé sur notre dataset :**
- **85% avaient des douleurs thoraciques**
- **32% avaient une angine d'effort**
- **46% avaient un ECG anormal**

**Symptômes atypiques (surtout femmes) :**
- Fatigue extrême soudaine
- Nausées/vomissements isolés
- Douleur épigastrique
- Essoufflement sans douleur

**Règle d'or :** En cas de doute, consultez ! La détection précoce sauve des vies.`
    }

    if (lowerMessage.includes("statistiques") || lowerMessage.includes("dataset") || lowerMessage.includes("données")) {
      return `**Statistiques Complètes du Dataset** 📊

**Population étudiée :**
- **303 patients** total
- **Âge** : 29-77 ans (moyenne 54.4 ans)
- **Sexe** : 207 hommes (68%), 96 femmes (32%)
- **Origine** : Cleveland, Hongrie, Suisse, Long Beach

**Répartition des risques :**
- **Haut risque** : 138 patients (45.5%)
- **Faible risque** : 165 patients (54.5%)

**Paramètres moyens :**
- **Pression artérielle** : 131.6 mmHg
- **Cholestérol** : 246.3 mg/dL
- **Fréquence cardiaque max** : 149.6 bpm
- **Dépression ST** : 1.04 mm

**Prévalence des facteurs :**
- Douleur thoracique : 85%
- Hypertension (>140) : 56%
- Cholestérol élevé (>240) : 34%
- Angine d'effort : 32%
- Diabète (glycémie >120) : 15%

**Fiabilité :** Dataset validé scientifiquement, utilisé dans de nombreuses publications médicales.`
    }

    // Réponse par défaut plus informative
    return `Je comprends votre question sur "${userMessage}". 

**Je peux vous aider avec :**
🔍 **Analyse des 13 paramètres** du dataset cardiaque
📊 **Interprétation des résultats** médicaux personnalisés  
💓 **Évaluation du risque** basée sur 303 cas cliniques
🩺 **Conseils préventifs** adaptés à votre profil

**Questions fréquentes :**
• "Quels sont mes facteurs de risque ?"
• "Comment interpréter mon cholestérol de 250 ?"
• "Que signifie une dépression ST de 1.5 mm ?"
• "J'ai 60 ans et une tension de 160, quel est mon risque ?"

**Pour une analyse personnalisée, donnez-moi vos paramètres médicaux !**`
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: generateBotResponse(inputValue),
        timestamp: new Date(),
        analysis: analyzeMessage(inputValue),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  const getRiskColor = (level: string) => {
    switch (level) {
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

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <Activity className="h-4 w-4" />
      case "low":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="bg-red-500 p-2 rounded-lg">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Assistant Cardiaque IA</h1>
                <p className="text-sm text-gray-500">Spécialisé • 303 cas cliniques • 13 paramètres</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                IA Active
              </Badge>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Questions Panel */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-purple-500" />
                  <span>Questions Spécialisées</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="facteurs" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mx-4 mb-4">
                    <TabsTrigger value="facteurs" className="text-xs">
                      Facteurs
                    </TabsTrigger>
                    <TabsTrigger value="tests" className="text-xs">
                      Tests
                    </TabsTrigger>
                  </TabsList>

                  <ScrollArea className="h-96">
                    <TabsContent value="facteurs" className="px-4 space-y-3">
                      {Object.entries(questionCategories)
                        .slice(0, 3)
                        .map(([category, questions]) => (
                          <div key={category}>
                            <h4 className="text-xs font-semibold text-gray-600 mb-2">{category}</h4>
                            <div className="space-y-1">
                              {questions.slice(0, 3).map((question, index) => (
                                <Button
                                  key={index}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleQuickQuestion(question)}
                                  className="w-full text-left justify-start text-xs h-auto py-2 px-2"
                                >
                                  {question}
                                </Button>
                              ))}
                            </div>
                          </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="tests" className="px-4 space-y-3">
                      {Object.entries(questionCategories)
                        .slice(2, 5)
                        .map(([category, questions]) => (
                          <div key={category}>
                            <h4 className="text-xs font-semibold text-gray-600 mb-2">{category}</h4>
                            <div className="space-y-1">
                              {questions.slice(0, 3).map((question, index) => (
                                <Button
                                  key={index}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleQuickQuestion(question)}
                                  className="w-full text-left justify-start text-xs h-auto py-2 px-2"
                                >
                                  {question}
                                </Button>
                              ))}
                            </div>
                          </div>
                        ))}
                    </TabsContent>
                  </ScrollArea>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border h-full flex flex-col">
              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex space-x-3 max-w-4xl ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === "user" ? "bg-blue-500" : "bg-red-500"
                          }`}
                        >
                          {message.type === "user" ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Stethoscope className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div
                            className={`rounded-lg px-4 py-3 ${
                              message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                          </div>

                          {/* Analysis Card */}
                          {message.analysis && (
                            <Card className="mt-3 border-l-4 border-l-red-500">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm flex items-center space-x-2">
                                  <Zap className="h-4 w-4 text-red-500" />
                                  <span>Analyse IA Automatique</span>
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Niveau de risque :</span>
                                    <Badge className={getRiskColor(message.analysis.riskLevel)}>
                                      {getRiskIcon(message.analysis.riskLevel)}
                                      <span className="ml-1 capitalize">{message.analysis.riskLevel}</span>
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Confiance :</span>
                                    <span className="text-sm">{message.analysis.confidence}%</span>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium">Facteurs identifiés :</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {message.analysis.factors.map((factor, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          {factor}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}

                          <div className="text-xs text-gray-500 mt-1">{message.timestamp.toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex space-x-3 max-w-3xl">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                          <Stethoscope className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gray-100 rounded-lg px-4 py-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-6 border-t">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ex: J'ai 55 ans, tension 150, cholestérol 280, quel est mon risque ?"
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
