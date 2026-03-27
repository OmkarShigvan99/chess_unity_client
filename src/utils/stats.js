// Importing axios for making HTTP requests
import axios from 'axios'
import { getAuthHeaders } from './tokenUtils.js'

/**
 * Asynchronously retrieves player statistics from the server.
 *
 * @param {string} playerId - The ID of the player to get stats for.
 * @param {string} accessToken - The access token for authentication (optional, falls back to sessionStorage)
 * @returns {Promise} - Returns a promise that resolves to the player stats data.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function getPlayerStats(playerId, accessToken) {
    try {
        const headers = accessToken
            ? {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
              }
            : getAuthHeaders()
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/games/stats/player/${playerId}`,
            {
                headers: headers,
                withCredentials: true, // Include cookies for authentication
            }
        )
        return response.data
    } catch (error) {
        console.error('Error retrieving player stats:', error)
        throw error
    }
}

/**
 * Asynchronously retrieves global game statistics from the server.
 *
 * @param {string} accessToken - The access token for authentication (optional, falls back to sessionStorage)
 * @returns {Promise} - Returns a promise that resolves to the global stats data.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function getGlobalStats(accessToken) {
    try {
        const headers = accessToken
            ? {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
              }
            : getAuthHeaders()
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/games/stats/global`,
            {
                headers: headers,
                withCredentials: true, // Include cookies for authentication
            }
        )
        return response.data
    } catch (error) {
        console.error('Error retrieving global stats:', error)
        throw error
    }
}
