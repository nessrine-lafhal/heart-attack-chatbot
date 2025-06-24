"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Bot, BarChart3, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-2">
            <div className="bg-red-500 p-3 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">CardioBot AI</h1>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">Assistant IA pour l'Analyse Cardiaque</h2>
            <p className="text-xl text-gray-600">
              Analysez les risques de crise cardiaque avec notre chatbot intelligent basé sur des données médicales
              avancées.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Bot className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-semibold">Chatbot IA</h3>
                <p className="text-sm text-gray-600">Rasa NLU</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <BarChart3 className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="font-semibold">Analyses</h3>
                <p className="text-sm text-gray-600">Données temps réel</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Shield className="h-8 w-8 text-purple-500" />
              <div>
                <h3 className="font-semibold">Sécurisé</h3>
                <p className="text-sm text-gray-600">Données protégées</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login/Register Form */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Bienvenue</CardTitle>
            <CardDescription>Connectez-vous pour accéder à votre assistant cardiaque IA</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="docteur@exemple.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input id="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full bg-red-500 hover:bg-red-600" disabled={isLoading}>
                    {isLoading ? "Connexion..." : "Se connecter"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" placeholder="Jean" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" placeholder="Dupont" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Email</Label>
                    <Input id="registerEmail" type="email" placeholder="docteur@exemple.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Mot de passe</Label>
                    <Input id="registerPassword" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Spécialité</Label>
                    <Input id="specialty" placeholder="Cardiologie" required />
                  </div>
                  <Button type="submit" className="w-full bg-red-500 hover:bg-red-600" disabled={isLoading}>
                    {isLoading ? "Inscription..." : "S'inscrire"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
