import { API_ENDPOINTS } from '../config/constants'
import type { RLState, RLAction } from '../interfaces/interfaces'

class RLService {
  private baseUrl: string

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
  }

  async getNextAction(state: RLState): Promise<RLAction> {
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.RL_NEXT_ACTION}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error getting next action:', error)
      // Fallback to a simple heuristic if RL service fails
      return this.getFallbackAction(state)
    }
  }

  async updateModel(state: RLState, reward: number): Promise<void> {
    try {
      await fetch(`${this.baseUrl}${API_ENDPOINTS.RL_UPDATE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state, reward }),
      })
    } catch (error) {
      console.error('Error updating RL model:', error)
    }
  }

  private getFallbackAction(state: RLState): RLAction {
    // Simple heuristic: if performance is good, suggest next topic; if poor, provide more practice
    const avgScore = state.performanceHistory.reduce((sum, p) => sum + p.score, 0) / state.performanceHistory.length

    // If performance is good (score > 0.7), suggest moving to next topic
    // Otherwise, keep practicing current topic
    const nextTopic = avgScore > 0.7 ? 'next-topic' : state.currentTopic

    return {
      nextTopic,
      learningStyle: state.learningStyle,
    }
  }
}

export const rlService = new RLService() 