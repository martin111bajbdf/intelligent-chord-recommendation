/**
 * 智能和弦推荐引擎
 * Intelligent Chord Recommendation Engine
 */

import { MusicTheoryDB } from './musicTheoryDatabase.js';

/**
 * 主推荐引擎类
 */
export class ChordRecommendationEngine {
  constructor() {
    this.currentKey = 'C';
    this.currentMode = 'Ionian';
    this.currentChord = null;
  }

  /**
   * 设置当前调性和调式
   */
  setKey(key, mode = 'Ionian') {
    this.currentKey = key;
    this.currentMode = mode;
  }

  /**
   * 设置当前和弦
   */
  setCurrentChord(chordSymbol) {
    // 解析和弦符号，简化版本
    const root = chordSymbol.charAt(0) + (chordSymbol.charAt(1) === '#' || chordSymbol.charAt(1) === 'b' ? chordSymbol.charAt(1) : '');
    const quality = chordSymbol.replace(root, '') || 'maj';
    
    this.currentChord = {
      root,
      quality,
      symbol: chordSymbol
    };
  }

  /**
   * 1️⃣ 调内和弦推荐 (Diatonic Recommendations)
   */
  getDiatonicRecommendations() {
    const diatonicChords = MusicTheoryDB.buildDiatonicChords(this.currentKey, this.currentMode);
    const recommendations = [];

    if (!this.currentChord) return recommendations;

    // 找到当前和弦在调内的位置
    const currentChordIndex = diatonicChords.findIndex(chord => 
      chord.root === this.currentChord.root
    );

    if (currentChordIndex === -1) {
      // 当前和弦不在调内，返回所有调内和弦
      return diatonicChords.map(chord => ({
        ...chord,
        probability: 0.5,
        explanation: `${this.currentKey} ${this.currentMode}调内和弦`
      }));
    }

    const currentDegree = currentChordIndex + 1;
    const weights = MusicTheoryDB.DIATONIC_PROGRESSION_WEIGHTS[currentDegree] || {};

    diatonicChords.forEach((chord, index) => {
      const targetDegree = index + 1;
      if (targetDegree !== currentDegree) {
        const probability = weights[targetDegree] || 0.3;
        
        // 增强四度和五度关系
        let enhancedProbability = probability;
        const interval = (targetDegree - currentDegree + 7) % 7;
        if (interval === 3 || interval === 4) { // 四度或五度
          enhancedProbability = Math.min(probability * 1.3, 1.0);
        }

        recommendations.push({
          ...chord,
          probability: enhancedProbability,
          explanation: `从${MusicTheoryDB.getRomanNumeral(currentDegree, this.currentChord.quality)}到${chord.romanNumeral}的调内进行`
        });
      }
    });

    return recommendations.sort((a, b) => b.probability - a.probability);
  }

  /**
   * 2️⃣ 副属和弦推荐 (Secondary Dominant Recommendations)
   */
  getSecondaryDominantRecommendations() {
    const diatonicChords = MusicTheoryDB.buildDiatonicChords(this.currentKey, this.currentMode);
    const recommendations = [];
    const keyType = this.currentMode === 'Ionian' ? 'major' : 'minor';
    const targets = MusicTheoryDB.SECONDARY_DOMINANT_TARGETS[keyType];

    diatonicChords.forEach(targetChord => {
      // 检查目标和弦是否可以有副属和弦
      const targetInterval = MusicTheoryDB.getNoteIndex(targetChord.root) - MusicTheoryDB.getNoteIndex(this.currentKey);
      const normalizedInterval = ((targetInterval % 12) + 12) % 12;
      
      if (targets.includes(normalizedInterval) && targetChord.symbol !== this.currentChord?.symbol) {
        const secondaryDominant = MusicTheoryDB.getSecondaryDominant(targetChord);
        recommendations.push({
          ...secondaryDominant,
          targetChord: targetChord.symbol,
          probability: 0.8,
          type: 'secondary_dominant'
        });
      }
    });

    return recommendations;
  }

  /**
   * 3️⃣ 重属和弦推荐 (Double Dominant Recommendations)
   */
  getDoubleDominantRecommendations() {
    const chains = MusicTheoryDB.buildDoubleDominantChains(this.currentKey, this.currentMode, 3);
    
    return chains.map(chain => ({
      ...chain,
      probability: Math.max(0.9 - (chain.depth * 0.2), 0.3), // 层数越多概率越低
      type: 'double_dominant',
      recommendation: chain.chain[0] // 推荐链的第一个和弦
    }));
  }

  /**
   * 4️⃣ 调式借用推荐 (Modal Interchange Recommendations)
   */
  getModalInterchangeRecommendations() {
    const borrowedChords = MusicTheoryDB.getModalInterchangeChords(this.currentKey, this.currentMode);
    
    return borrowedChords.map(chord => ({
      ...chord,
      probability: 0.6,
      type: 'modal_interchange'
    }));
  }

  /**
   * 5️⃣ 和弦替代推荐 (Chord Substitution Recommendations)
   */
  getChordSubstitutionRecommendations() {
    if (!this.currentChord) return [];

    const substitutions = MusicTheoryDB.getChordSubstitutions(this.currentChord);
    
    return substitutions.map(sub => ({
      ...sub,
      probability: 0.7,
      type: 'chord_substitution'
    }));
  }

  /**
   * 获取所有推荐
   */
  getAllRecommendations() {
    return {
      diatonic: this.getDiatonicRecommendations(),
      secondaryDominant: this.getSecondaryDominantRecommendations(),
      doubleDominant: this.getDoubleDominantRecommendations(),
      modalInterchange: this.getModalInterchangeRecommendations(),
      chordSubstitution: this.getChordSubstitutionRecommendations()
    };
  }

  /**
   * 获取综合推荐 (所有类型混合，按概率排序)
   */
  getComprehensiveRecommendations(limit = 10) {
    const allRecs = this.getAllRecommendations();
    const combined = [];

    // 合并所有推荐
    Object.entries(allRecs).forEach(([type, recommendations]) => {
      recommendations.forEach(rec => {
        combined.push({
          ...rec,
          recommendationType: type
        });
      });
    });

    // 去重（相同和弦符号）
    const unique = combined.filter((rec, index, self) =>
      index === self.findIndex(r => r.symbol === rec.symbol)
    );

    // 按概率排序并限制数量
    return unique
      .sort((a, b) => b.probability - a.probability)
      .slice(0, limit);
  }
}

/**
 * 工具函数：创建推荐引擎实例
 */
export function createRecommendationEngine(key = 'C', mode = 'Ionian') {
  const engine = new ChordRecommendationEngine();
  engine.setKey(key, mode);
  return engine;
}

/**
 * 快速推荐函数
 */
export function getQuickRecommendations(key, currentChord, mode = 'Ionian') {
  const engine = createRecommendationEngine(key, mode);
  engine.setCurrentChord(currentChord);
  return engine.getAllRecommendations();
}

export default ChordRecommendationEngine;