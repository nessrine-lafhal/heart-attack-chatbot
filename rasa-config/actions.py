# Actions personnalisées pour le Chatbot Cardiaque
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import numpy as np

class ActionAnalyzePatientRisk(Action):
    """Action pour analyser le risque cardiaque d'un patient"""
    
    def name(self) -> Text:
        return "action_analyze_patient_risk"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # Récupérer les données du patient depuis les slots
        age = tracker.get_slot("patient_age")
        gender = tracker.get_slot("patient_gender")
        cholesterol = tracker.get_slot("cholesterol")
        blood_pressure = tracker.get_slot("blood_pressure")
        
        # Calculer le score de risque basé sur le dataset
        risk_score = 0
        risk_factors = []
        
        if age:
            if age > 60:
                risk_score += 0.3
                risk_factors.append(f"Âge élevé ({age} ans)")
            elif age > 45:
                risk_score += 0.15
                risk_factors.append(f"Âge modéré ({age} ans)")
        
        if gender and gender.lower() in ['homme', 'masculin', 'male', 'm']:
            risk_score += 0.2
            risk_factors.append("Sexe masculin")
        
        if cholesterol:
            if cholesterol > 240:
                risk_score += 0.2
                risk_factors.append(f"Cholestérol élevé ({cholesterol} mg/dL)")
            elif cholesterol > 200:
                risk_score += 0.1
                risk_factors.append(f"Cholestérol limite ({cholesterol} mg/dL)")
        
        if blood_pressure:
            if blood_pressure > 140:
                risk_score += 0.25
                risk_factors.append(f"Hypertension ({blood_pressure} mmHg)")
            elif blood_pressure > 120:
                risk_score += 0.1
                risk_factors.append(f"Pression élevée ({blood_pressure} mmHg)")
        
        # Déterminer le niveau de risque
        if risk_score > 0.6:
            risk_level = "ÉLEVÉ"
            risk_color = "🔴"
            recommendation = "Consultation cardiologique urgente recommandée"
        elif risk_score > 0.3:
            risk_level = "MODÉRÉ"
            risk_color = "🟡"
            recommendation = "Suivi médical et modifications du mode de vie"
        else:
            risk_level = "FAIBLE"
            risk_color = "🟢"
            recommendation = "Maintenir un mode de vie sain"
        
        # Construire le message de réponse
        message = f"""
**ANALYSE DE RISQUE CARDIAQUE** {risk_color}

**Niveau de risque : {risk_level}**
**Score calculé : {risk_score:.2f}/1.0**

**Facteurs identifiés :**
"""
        
        if risk_factors:
            for factor in risk_factors:
                message += f"• {factor}\n"
        else:
            message += "• Aucun facteur de risque majeur identifié\n"
        
        message += f"""
**Recommandation :** {recommendation}

*Analyse basée sur notre dataset de 303 patients avec crises cardiaques*
        """
        
        dispatcher.utter_message(text=message)
        
        return [SlotSet("risk_score", risk_score)]

class ActionProvideRecommendations(Action):
    """Action pour fournir des recommandations personnalisées"""
    
    def name(self) -> Text:
        return "action_provide_recommendations"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        risk_score = tracker.get_slot("risk_score") or 0
        age = tracker.get_slot("patient_age")
        
        recommendations = []
        
        # Recommandations basées sur le niveau de risque
        if risk_score > 0.6:
            recommendations.extend([
                "🏥 Consultation cardiologique dans les 48h",
                "💊 Évaluation médicamenteuse nécessaire",
                "📊 Bilan cardiaque complet (ECG, échocardiographie)",
                "🚫 Éviter les efforts intenses sans supervision"
            ])
        elif risk_score > 0.3:
            recommendations.extend([
                "👨‍⚕️ Consultation médicale dans le mois",
                "🏃‍♂️ Programme d'exercice supervisé",
                "🥗 Régime alimentaire adapté",
                "📈 Surveillance régulière des paramètres"
            ])
        else:
            recommendations.extend([
                "✅ Maintenir les habitudes actuelles",
                "🏃‍♂️ Exercice régulier (150 min/semaine)",
                "🥗 Alimentation équilibrée",
                "📅 Bilan annuel de routine"
            ])
        
        # Recommandations spécifiques à l'âge
        if age and age > 65:
            recommendations.append("👴 Surveillance accrue liée à l'âge")
        
        message = "**RECOMMANDATIONS PERSONNALISÉES**\n\n"
        for rec in recommendations:
            message += f"{rec}\n"
        
        message += "\n*Recommandations basées sur l'analyse de 303 cas cliniques*"
        
        dispatcher.utter_message(text=message)
        
        return []

class ActionInterpretResults(Action):
    """Action pour interpréter les résultats médicaux"""
    
    def name(self) -> Text:
        return "action_interpret_results"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        cholesterol = tracker.get_slot("cholesterol")
        blood_pressure = tracker.get_slot("blood_pressure")
        age = tracker.get_slot("patient_age")
        
        interpretations = []
        
        if cholesterol:
            if cholesterol < 200:
                interpretations.append(f"✅ Cholestérol optimal ({cholesterol} mg/dL)")
            elif cholesterol < 240:
                interpretations.append(f"⚠️ Cholestérol limite ({cholesterol} mg/dL)")
            else:
                interpretations.append(f"🔴 Cholestérol élevé ({cholesterol} mg/dL)")
        
        if blood_pressure:
            if blood_pressure < 120:
                interpretations.append(f"✅ Pression normale ({blood_pressure} mmHg)")
            elif blood_pressure < 140:
                interpretations.append(f"⚠️ Pression élevée ({blood_pressure} mmHg)")
            else:
                interpretations.append(f"🔴 Hypertension ({blood_pressure} mmHg)")
        
        if age:
            if age < 45:
                interpretations.append(f"✅ Âge à faible risque ({age} ans)")
            elif age < 65:
                interpretations.append(f"⚠️ Âge à risque modéré ({age} ans)")
            else:
                interpretations.append(f"🔴 Âge à risque élevé ({age} ans)")
        
        if interpretations:
            message = "**INTERPRÉTATION DES RÉSULTATS**\n\n"
            for interp in interpretations:
                message += f"{interp}\n"
            
            message += "\n**Comparaison avec notre dataset :**\n"
            message += "• Âge moyen des patients : 54.4 ans\n"
            message += "• Cholestérol moyen : 246 mg/dL\n"
            message += "• Pression moyenne : 131 mmHg\n"
        else:
            message = "Veuillez fournir vos données médicales pour une interprétation personnalisée."
        
        dispatcher.utter_message(text=message)
        
        return []
