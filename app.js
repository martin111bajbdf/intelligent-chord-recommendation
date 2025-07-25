/**
 * 智能和弦推荐系统 - 前端应用
 * Intelligent Chord Recommendation System - Frontend Application
 */

import { MusicTheoryDB } from './musicTheoryDatabase.js';
import { ChordDB } from './chordDatabase.js';
import { ProgressionDB } from './progressionDatabase.js';
import { ChordRecommendationEngine } from './recommendationEngine.js';

class ChordRecommendationApp {
    constructor() {
        this.engine = new ChordRecommendationEngine();
        this.currentProgression = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateScaleDisplay();
        console.log('🎼 Chord Recommendation App Initialized');
    }

    bindEvents() {
        // Key and Mode selectors
        document.getElementById('keySelector').addEventListener('change', () => {
            this.updateScaleDisplay();
            this.analyzeCurrentChord();
        });
        
        document.getElementById('modeSelector').addEventListener('change', () => {
            this.updateScaleDisplay();
            this.analyzeCurrentChord();
        });

        // Current chord input
        document.getElementById('currentChordInput').addEventListener('input', (e) => {
            if (e.target.value.trim()) {
                this.debounceAnalyze();
            }
        });

        // Analyze button
        document.getElementById('analyzeBtn').addEventListener('click', () => {
            this.analyzeCurrentChord();
        });

        // Progression builder
        document.getElementById('clearProgressionBtn').addEventListener('click', () => {
            this.clearProgression();
        });

        document.getElementById('playProgressionBtn').addEventListener('click', () => {
            this.playProgression();
        });

        // Help modal
        document.getElementById('helpBtn').addEventListener('click', () => {
            document.getElementById('helpModal').classList.remove('hidden');
            document.getElementById('helpModal').classList.add('flex');
        });

        document.getElementById('closeHelpBtn').addEventListener('click', () => {
            document.getElementById('helpModal').classList.add('hidden');
            document.getElementById('helpModal').classList.remove('flex');
        });

        // Enter key support
        document.getElementById('currentChordInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.analyzeCurrentChord();
            }
        });
    }

    debounceAnalyze() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.analyzeCurrentChord();
        }, 500);
    }

    updateScaleDisplay() {
        const key = document.getElementById('keySelector').value;
        const mode = document.getElementById('modeSelector').value;
        
        try {
            const scale = MusicTheoryDB.buildScale(key, mode);
            const scaleDisplay = document.getElementById('currentScaleDisplay');
            const scaleNotes = document.getElementById('scaleNotes');
            
            scaleNotes.innerHTML = scale.map(note => 
                `<span class="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">${note}</span>`
            ).join('');
            
            scaleDisplay.classList.remove('hidden');
            
            // Update engine
            this.engine.setKey(key, mode);
        } catch (error) {
            console.error('Error updating scale display:', error);
        }
    }

    analyzeCurrentChord() {
        const chordInput = document.getElementById('currentChordInput').value.trim();
        if (!chordInput) {
            this.clearRecommendations();
            return;
        }

        this.showLoading(true);

        try {
            // Set current chord in engine
            this.engine.setCurrentChord(chordInput);
            
            // Get all recommendations
            const recommendations = this.engine.getAllRecommendations();
            
            // Display recommendations
            this.displayDiatonicRecommendations(recommendations.diatonic);
            this.displaySecondaryDominantRecommendations(recommendations.secondaryDominant);
            this.displayDoubleDominantRecommendations(recommendations.doubleDominant);
            this.displayModalInterchangeRecommendations(recommendations.modalInterchange);
            this.displayChordSubstitutionRecommendations(recommendations.chordSubstitution);
            
            // Display comprehensive recommendations
            const comprehensive = this.engine.getComprehensiveRecommendations(8);
            this.displayComprehensiveRecommendations(comprehensive);
            
        } catch (error) {
            console.error('Error analyzing chord:', error);
            this.showError('和弦分析失败，请检查输入格式');
        } finally {
            this.showLoading(false);
        }
    }

    displayDiatonicRecommendations(recommendations) {
        const container = document.getElementById('diatonicRecommendations');
        
        if (recommendations.length === 0) {
            container.innerHTML = '<div class="text-center text-gray-400 py-4">暂无调内和弦推荐</div>';
            return;
        }

        container.innerHTML = recommendations.slice(0, 6).map(rec => `
            <div class="chord-card diatonic bg-white bg-opacity-10 p-4 rounded-lg cursor-pointer hover:bg-opacity-20 transition-all" 
                 data-chord="${rec.symbol}">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-lg">${rec.symbol}</span>
                    <span class="text-sm opacity-70">${(rec.probability * 100).toFixed(0)}%</span>
                </div>
                <div class="probability-bar mb-2" style="width: ${rec.probability * 100}%"></div>
                <div class="text-xs opacity-80">${rec.romanNumeral} - ${rec.explanation}</div>
            </div>
        `).join('');

        this.bindChordClickEvents(container);
    }

    displaySecondaryDominantRecommendations(recommendations) {
        const container = document.getElementById('secondaryDominantRecommendations');
        
        if (recommendations.length === 0) {
            container.innerHTML = '<div class="text-center text-gray-400 py-4">暂无副属和弦推荐</div>';
            return;
        }

        container.innerHTML = recommendations.slice(0, 6).map(rec => `
            <div class="chord-card secondary-dominant bg-white bg-opacity-10 p-4 rounded-lg cursor-pointer hover:bg-opacity-20 transition-all" 
                 data-chord="${rec.symbol}">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-lg">${rec.symbol}</span>
                    <span class="text-sm opacity-70">${(rec.probability * 100).toFixed(0)}%</span>
                </div>
                <div class="probability-bar mb-2" style="width: ${rec.probability * 100}%"></div>
                <div class="text-xs opacity-80">${rec.progression}</div>
            </div>
        `).join('');

        this.bindChordClickEvents(container);
    }

    displayDoubleDominantRecommendations(recommendations) {
        const container = document.getElementById('doubleDominantRecommendations');
        
        if (recommendations.length === 0) {
            container.innerHTML = '<div class="text-center text-gray-400 py-4">暂无重属和弦推荐</div>';
            return;
        }

        container.innerHTML = recommendations.slice(0, 6).map(rec => `
            <div class="chord-card double-dominant bg-white bg-opacity-10 p-4 rounded-lg cursor-pointer hover:bg-opacity-20 transition-all" 
                 data-chord="${rec.recommendation.symbol}">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-lg">${rec.recommendation.symbol}</span>
                    <span class="text-sm opacity-70">${(rec.probability * 100).toFixed(0)}%</span>
                </div>
                <div class="probability-bar mb-2" style="width: ${rec.probability * 100}%"></div>
                <div class="text-xs opacity-80">${rec.progression}</div>
            </div>
        `).join('');

        this.bindChordClickEvents(container);
    }

    displayModalInterchangeRecommendations(recommendations) {
        const container = document.getElementById('modalInterchangeRecommendations');
        
        if (recommendations.length === 0) {
            container.innerHTML = '<div class="text-center text-gray-400 py-4">暂无调式借用推荐</div>';
            return;
        }

        container.innerHTML = recommendations.slice(0, 6).map(rec => `
            <div class="chord-card modal-interchange bg-white bg-opacity-10 p-4 rounded-lg cursor-pointer hover:bg-opacity-20 transition-all" 
                 data-chord="${rec.symbol}">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-lg">${rec.symbol}</span>
                    <span class="text-sm opacity-70">${(rec.probability * 100).toFixed(0)}%</span>
                </div>
                <div class="probability-bar mb-2" style="width: ${rec.probability * 100}%"></div>
                <div class="text-xs opacity-80">来自 ${rec.sourceModeChinese}</div>
            </div>
        `).join('');

        this.bindChordClickEvents(container);
    }

    displayChordSubstitutionRecommendations(recommendations) {
        const container = document.getElementById('chordSubstitutionRecommendations');
        
        if (recommendations.length === 0) {
            container.innerHTML = '<div class="text-center text-gray-400 py-4">暂无和弦替代推荐</div>';
            return;
        }

        container.innerHTML = recommendations.slice(0, 6).map(rec => `
            <div class="chord-card chord-substitution bg-white bg-opacity-10 p-4 rounded-lg cursor-pointer hover:bg-opacity-20 transition-all" 
                 data-chord="${rec.symbol}">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-lg">${rec.symbol}</span>
                    <span class="text-sm opacity-70">${(rec.probability * 100).toFixed(0)}%</span>
                </div>
                <div class="probability-bar mb-2" style="width: ${rec.probability * 100}%"></div>
                <div class="text-xs opacity-80">${rec.explanation}</div>
            </div>
        `).join('');

        this.bindChordClickEvents(container);
    }

    displayComprehensiveRecommendations(recommendations) {
        const container = document.getElementById('comprehensiveRecommendations');
        
        if (recommendations.length === 0) {
            container.innerHTML = '<div class="text-center text-gray-400 py-4">暂无综合推荐</div>';
            return;
        }

        const typeColors = {
            'diatonic': 'bg-blue-500',
            'secondaryDominant': 'bg-red-500',
            'doubleDominant': 'bg-yellow-500',
            'modalInterchange': 'bg-green-500',
            'chordSubstitution': 'bg-purple-500'
        };

        container.innerHTML = recommendations.map((rec, index) => `
            <div class="chord-card bg-white bg-opacity-10 p-4 rounded-lg cursor-pointer hover:bg-opacity-20 transition-all" 
                 data-chord="${rec.symbol}">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <span class="text-lg font-bold mr-2">${index + 1}.</span>
                        <span class="font-bold text-lg">${rec.symbol}</span>
                    </div>
                    <span class="text-sm opacity-70">${(rec.probability * 100).toFixed(0)}%</span>
                </div>
                <div class="probability-bar mb-2" style="width: ${rec.probability * 100}%"></div>
                <div class="flex items-center justify-between">
                    <div class="text-xs opacity-80">${rec.explanation || rec.progression || '推荐和弦'}</div>
                    <span class="px-2 py-1 ${typeColors[rec.recommendationType] || 'bg-gray-500'} text-xs rounded-full">
                        ${this.getTypeLabel(rec.recommendationType)}
                    </span>
                </div>
            </div>
        `).join('');

        this.bindChordClickEvents(container);
    }

    getTypeLabel(type) {
        const labels = {
            'diatonic': '调内',
            'secondaryDominant': '副属',
            'doubleDominant': '重属',
            'modalInterchange': '借用',
            'chordSubstitution': '替代'
        };
        return labels[type] || type;
    }

    bindChordClickEvents(container) {
        container.querySelectorAll('.chord-card').forEach(card => {
            card.addEventListener('click', () => {
                const chord = card.dataset.chord;
                this.addToProgression(chord);
                
                // Visual feedback
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            });
        });
    }

    addToProgression(chord) {
        this.currentProgression.push(chord);
        this.updateProgressionDisplay();
        
        // Auto-analyze the new chord
        document.getElementById('currentChordInput').value = chord;
        this.analyzeCurrentChord();
    }

    updateProgressionDisplay() {
        const container = document.getElementById('chordProgression');
        
        if (this.currentProgression.length === 0) {
            container.innerHTML = '<div class="text-gray-400 text-center w-full py-4">点击推荐的和弦来构建进行...</div>';
            return;
        }

        container.innerHTML = this.currentProgression.map((chord, index) => `
            <div class="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <span class="font-bold text-lg">${chord}</span>
                <button class="ml-2 text-red-400 hover:text-red-600" onclick="app.removeFromProgression(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    removeFromProgression(index) {
        this.currentProgression.splice(index, 1);
        this.updateProgressionDisplay();
    }

    clearProgression() {
        this.currentProgression = [];
        this.updateProgressionDisplay();
    }

    playProgression() {
        if (this.currentProgression.length === 0) {
            this.showError('请先构建和弦进行');
            return;
        }

        // Simple audio feedback (you can enhance this with Web Audio API)
        this.showSuccess(`播放进行: ${this.currentProgression.join(' - ')}`);
        
        // Here you could integrate with Web Audio API or Tone.js for actual audio playback
        console.log('Playing progression:', this.currentProgression);
    }

    clearRecommendations() {
        const containers = [
            'diatonicRecommendations',
            'secondaryDominantRecommendations', 
            'doubleDominantRecommendations',
            'modalInterchangeRecommendations',
            'chordSubstitutionRecommendations',
            'comprehensiveRecommendations'
        ];

        containers.forEach(id => {
            const container = document.getElementById(id);
            container.innerHTML = '<div class="text-center text-gray-400 py-8"><i class="fas fa-music text-3xl mb-2"></i><p>等待和弦分析...</p></div>';
        });
    }

    showLoading(show) {
        const indicator = document.getElementById('loadingIndicator');
        if (show) {
            indicator.classList.remove('hidden');
        } else {
            indicator.classList.add('hidden');
        }
    }

    showError(message) {
        // Simple error display - you can enhance this with a proper toast system
        const indicator = document.getElementById('loadingIndicator');
        indicator.innerHTML = `<i class="fas fa-exclamation-triangle mr-2"></i>${message}`;
        indicator.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg';
        indicator.classList.remove('hidden');
        
        setTimeout(() => {
            indicator.classList.add('hidden');
            indicator.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>分析中...';
            indicator.className = 'fixed top-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-lg hidden';
        }, 3000);
    }

    showSuccess(message) {
        const indicator = document.getElementById('loadingIndicator');
        indicator.innerHTML = `<i class="fas fa-check mr-2"></i>${message}`;
        indicator.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg';
        indicator.classList.remove('hidden');
        
        setTimeout(() => {
            indicator.classList.add('hidden');
            indicator.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>分析中...';
            indicator.className = 'fixed top-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-lg hidden';
        }, 2000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ChordRecommendationApp();
});

// Export for global access
export default ChordRecommendationApp;