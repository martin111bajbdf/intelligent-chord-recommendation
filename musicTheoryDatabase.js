/**
 * 音乐理论数据库
 * Music Theory Database for Intelligent Chord Recommendation System
 */

// 基础音符 (12个半音)
export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// 音程映射 (半音数)
export const INTERVALS = {
  'P1': 0,   // 纯一度
  'm2': 1,   // 小二度
  'M2': 2,   // 大二度
  'm3': 3,   // 小三度
  'M3': 4,   // 大三度
  'P4': 5,   // 纯四度
  'TT': 6,   // 三全音
  'P5': 7,   // 纯五度
  'm6': 8,   // 小六度
  'M6': 9,   // 大六度
  'm7': 10,  // 小七度
  'M7': 11   // 大七度
};

// 调式定义 (相对于主音的半音间隔)
export const MODES = {
  'Ionian': {
    name: 'Ionian',
    chineseName: '伊奥尼亚调式 (大调)',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    chordQualities: ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'm7b5']
  },
  'Dorian': {
    name: 'Dorian',
    chineseName: '多里安调式',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    chordQualities: ['m7', 'm7', 'maj7', '7', 'm7', 'm7b5', 'maj7']
  },
  'Phrygian': {
    name: 'Phrygian',
    chineseName: '弗里几亚调式',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    chordQualities: ['m7', 'maj7', '7', 'm7', 'm7b5', 'maj7', 'm7']
  },
  'Lydian': {
    name: 'Lydian',
    chineseName: '利底亚调式',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    chordQualities: ['maj7', '7', 'm7', 'm7b5', 'maj7', 'm7', 'm7']
  },
  'Mixolydian': {
    name: 'Mixolydian',
    chineseName: '混合利底亚调式',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    chordQualities: ['7', 'm7', 'm7b5', 'maj7', 'm7', 'm7', 'maj7']
  },
  'Aeolian': {
    name: 'Aeolian',
    chineseName: '爱奥利亚调式 (自然小调)',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    chordQualities: ['m7', 'm7b5', 'maj7', 'm7', 'm7', 'maj7', '7']
  },
  'Locrian': {
    name: 'Locrian',
    chineseName: '洛克里亚调式',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    chordQualities: ['m7b5', 'maj7', 'm7', 'm7', 'maj7', '7', 'm7']
  },
  'HarmonicMinor': {
    name: 'Harmonic Minor',
    chineseName: '和声小调',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    chordQualities: ['mMaj7', 'm7b5', 'maj7#5', 'm7', '7', 'maj7', 'dim7']
  },
  'MelodicMinor': {
    name: 'Melodic Minor',
    chineseName: '旋律小调 (爵士用法)',
    intervals: [0, 2, 3, 5, 7, 9, 11],
    chordQualities: ['mMaj7', 'm7', 'maj7#5', '7', '7', 'm7b5', 'm7b5']
  }
};

// 和弦类型定义
export const CHORD_TYPES = {
  'maj7': {
    name: 'Major 7th',
    symbol: 'maj7',
    intervals: [0, 4, 7, 11],
    function: 'tonic'
  },
  'm7': {
    name: 'Minor 7th',
    symbol: 'm7',
    intervals: [0, 3, 7, 10],
    function: 'subdominant'
  },
  '7': {
    name: 'Dominant 7th',
    symbol: '7',
    intervals: [0, 4, 7, 10],
    function: 'dominant'
  },
  'm7b5': {
    name: 'Half Diminished',
    symbol: 'm7b5',
    intervals: [0, 3, 6, 10],
    function: 'subdominant'
  },
  'mMaj7': {
    name: 'Minor Major 7th',
    symbol: 'mMaj7',
    intervals: [0, 3, 7, 11],
    function: 'tonic'
  },
  'maj7#5': {
    name: 'Major 7th Sharp 5',
    symbol: 'maj7#5',
    intervals: [0, 4, 8, 11],
    function: 'tonic'
  },
  'dim7': {
    name: 'Diminished 7th',
    symbol: 'dim7',
    intervals: [0, 3, 6, 9],
    function: 'dominant'
  }
};

// 罗马数字标记
export const ROMAN_NUMERALS = {
  1: { major: 'I', minor: 'i' },
  2: { major: 'II', minor: 'ii' },
  3: { major: 'III', minor: 'iii' },
  4: { major: 'IV', minor: 'iv' },
  5: { major: 'V', minor: 'v' },
  6: { major: 'VI', minor: 'vi' },
  7: { major: 'VII', minor: 'vii' }
};

// 和声功能定义
export const HARMONIC_FUNCTIONS = {
  'tonic': {
    name: 'Tonic',
    chineseName: '主功能',
    stability: 'stable',
    degrees: [1, 3, 6]
  },
  'subdominant': {
    name: 'Subdominant',
    chineseName: '下属功能',
    stability: 'unstable',
    degrees: [2, 4, 6]
  },
  'dominant': {
    name: 'Dominant',
    chineseName: '属功能',
    stability: 'unstable',
    degrees: [5, 7]
  }
};

// 调内和弦进行概率权重 (基于传统和声学)
export const DIATONIC_PROGRESSION_WEIGHTS = {
  // 从I级和弦的进行概率
  1: { 2: 0.8, 3: 0.6, 4: 0.9, 5: 0.95, 6: 0.85, 7: 0.4 },
  // 从ii级和弦的进行概率
  2: { 1: 0.3, 3: 0.4, 4: 0.6, 5: 0.9, 6: 0.5, 7: 0.7 },
  // 从iii级和弦的进行概率
  3: { 1: 0.4, 2: 0.5, 4: 0.7, 5: 0.6, 6: 0.8, 7: 0.3 },
  // 从IV级和弦的进行概率
  4: { 1: 0.8, 2: 0.7, 3: 0.5, 5: 0.9, 6: 0.6, 7: 0.8 },
  // 从V级和弦的进行概率
  5: { 1: 0.95, 2: 0.4, 3: 0.5, 4: 0.3, 6: 0.7, 7: 0.2 },
  // 从vi级和弦的进行概率
  6: { 1: 0.6, 2: 0.8, 3: 0.7, 4: 0.9, 5: 0.5, 7: 0.4 },
  // 从vii级和弦的进行概率
  7: { 1: 0.9, 2: 0.3, 3: 0.8, 4: 0.4, 5: 0.6, 6: 0.5 }
};

// 副属和弦目标 (按半音间隔定义，哪些音可以有副属和弦)
export const SECONDARY_DOMINANT_TARGETS = {
  // 大调中的副属和弦目标 (相对于主音的半音间隔)
  'major': [2, 4, 7, 9, 10], // D, E, G, A, Bb (ii, iii, V, vi, vii)
  // 小调中的副属和弦目标 (相对于主音的半音间隔)  
  'minor': [0, 2, 5, 7, 10]  // C, D, F, G, Bb (i, ii, iv, v, vii)
};

// 调式借用常见和弦 (从平行调式借用)
export const MODAL_INTERCHANGE_CHORDS = {
  // 大调从小调借用
  'majorFromMinor': {
    'bII': { degree: 'bII', quality: 'maj7', source: 'Phrygian' },
    'bIII': { degree: 'bIII', quality: 'maj7', source: 'Aeolian' },
    'iv': { degree: 'iv', quality: 'm7', source: 'Aeolian' },
    'bVI': { degree: 'bVI', quality: 'maj7', source: 'Aeolian' },
    'bVII': { degree: 'bVII', quality: '7', source: 'Mixolydian' }
  },
  // 小调从大调借用
  'minorFromMajor': {
    'II': { degree: 'II', quality: 'm7', source: 'Dorian' },
    'IV': { degree: 'IV', quality: 'maj7', source: 'Ionian' },
    'VI': { degree: 'VI', quality: 'maj7', source: 'Ionian' },
    'VII': { degree: 'VII', quality: 'maj7', source: 'Ionian' }
  }
};

// 和弦替代规则 (Chord Substitution Rules)
export const CHORD_SUBSTITUTION_RULES = {
  // 属和弦替代
  'dominant_substitutions': {
    // 半减和弦可以替代属七和弦 (共同音多)
    'half_diminished': {
      description: '半减和弦替代属七和弦',
      rule: (dominantChord) => {
        if (dominantChord.quality === '7') {
          const rootIndex = getNoteIndex(dominantChord.root);
          // 上行小二度的半减和弦
          const subIndex = (rootIndex + 1) % 12;
          return {
            root: NOTES[subIndex],
            quality: 'm7b5',
            symbol: `${NOTES[subIndex]}m7b5`,
            explanation: `${dominantChord.symbol}的半减替代`
          };
        }
        return null;
      }
    },
    
    // 减七和弦替代属七和弦
    'diminished': {
      description: '减七和弦替代属七和弦',
      rule: (dominantChord) => {
        if (dominantChord.quality === '7') {
          const rootIndex = getNoteIndex(dominantChord.root);
          // 上行小二度的减七和弦
          const subIndex = (rootIndex + 1) % 12;
          return {
            root: NOTES[subIndex],
            quality: 'dim7',
            symbol: `${NOTES[subIndex]}dim7`,
            explanation: `${dominantChord.symbol}的减七替代`
          };
        }
        return null;
      }
    },
    
    // 增和弦替代属和弦
    'augmented': {
      description: '增和弦替代属和弦',
      rule: (dominantChord) => {
        if (dominantChord.quality === '7') {
          return {
            root: dominantChord.root,
            quality: 'aug',
            symbol: `${dominantChord.root}aug`,
            explanation: `${dominantChord.symbol}的增和弦替代`
          };
        }
        return null;
      }
    },
    
    // 三全音替代
    'tritone': {
      description: '三全音替代',
      rule: (dominantChord) => {
        if (dominantChord.quality === '7') {
          const rootIndex = getNoteIndex(dominantChord.root);
          const subIndex = (rootIndex + 6) % 12; // 三全音距离
          return {
            root: NOTES[subIndex],
            quality: '7',
            symbol: `${NOTES[subIndex]}7`,
            explanation: `${dominantChord.symbol}的三全音替代`
          };
        }
        return null;
      }
    }
  },
  
  // 主和弦替代
  'tonic_substitutions': {
    // 相对小调替代
    'relative_minor': {
      description: '相对小调替代',
      rule: (tonicChord) => {
        if (tonicChord.quality === 'maj7') {
          const rootIndex = getNoteIndex(tonicChord.root);
          const relativeIndex = (rootIndex + 9) % 12; // 下行小三度
          return {
            root: NOTES[relativeIndex],
            quality: 'm7',
            symbol: `${NOTES[relativeIndex]}m7`,
            explanation: `${tonicChord.symbol}的相对小调替代`
          };
        }
        return null;
      }
    }
  }
};

/**
 * 工具函数：获取音符在12音中的索引
 */
export function getNoteIndex(note) {
  const cleanNote = note.replace(/[0-9]/g, ''); // 移除八度标记
  return NOTES.indexOf(cleanNote);
}

/**
 * 工具函数：根据根音和音程计算目标音符
 */
export function getTargetNote(rootNote, semitones) {
  const rootIndex = getNoteIndex(rootNote);
  const targetIndex = (rootIndex + semitones) % 12;
  return NOTES[targetIndex];
}

/**
 * 工具函数：构建调式音阶
 */
export function buildScale(rootNote, modeName) {
  const mode = MODES[modeName];
  if (!mode) throw new Error(`Unknown mode: ${modeName}`);
  
  const rootIndex = getNoteIndex(rootNote);
  return mode.intervals.map(interval => {
    const noteIndex = (rootIndex + interval) % 12;
    return NOTES[noteIndex];
  });
}

/**
 * 工具函数：构建调内和弦
 */
export function buildDiatonicChords(rootNote, modeName) {
  const scale = buildScale(rootNote, modeName);
  const mode = MODES[modeName];
  
  return scale.map((note, index) => {
    const chordQuality = mode.chordQualities[index];
    return {
      root: note,
      quality: chordQuality,
      symbol: `${note}${chordQuality}`,
      degree: index + 1,
      romanNumeral: getRomanNumeral(index + 1, chordQuality),
      function: CHORD_TYPES[chordQuality]?.function || 'unknown'
    };
  });
}

/**
 * 工具函数：获取罗马数字标记
 */
export function getRomanNumeral(degree, quality) {
  const isMinor = quality.includes('m') && !quality.includes('maj');
  const romanBase = ROMAN_NUMERALS[degree];
  
  if (!romanBase) return `${degree}`;
  
  let roman = isMinor ? romanBase.minor : romanBase.major;
  
  // 添加和弦质量标记
  if (quality.includes('7')) roman += '7';
  if (quality.includes('b5')) roman += 'ø'; // 半减和弦符号
  if (quality.includes('dim')) roman += '°';
  
  return roman;
}

/**
 * 工具函数：获取所有平行调式
 */
export function getParallelModes(rootNote) {
  return Object.keys(MODES).map(modeName => ({
    name: modeName,
    chineseName: MODES[modeName].chineseName,
    chords: buildDiatonicChords(rootNote, modeName)
  }));
}

/**
 * 工具函数：计算副属和弦
 */
export function getSecondaryDominant(targetChord) {
  const targetRoot = targetChord.root;
  const targetIndex = getNoteIndex(targetRoot);

  // 副属和弦是目标和弦上方五度 (下方四度)
  const dominantIndex = (targetIndex + 7) % 12;
  const dominantRoot = NOTES[dominantIndex];
  
  return {
    root: dominantRoot,
    quality: '7',
    symbol: `${dominantRoot}7`,
    target: targetChord.symbol,
    progression: `${dominantRoot}7 → ${targetChord.symbol}`,
    explanation: `${targetChord.symbol}的副属和弦`
  };
}

/**
 * 工具函数：构建重属和弦链 (Double Dominants)
 */
export function buildDoubleDominantChains(rootNote, modeName, maxDepth = 3) {
  const diatonicChords = buildDiatonicChords(rootNote, modeName);
  const dominantChords = diatonicChords.filter(chord => 
    CHORD_TYPES[chord.quality]?.function === 'dominant'
  );
  
  const chains = [];
  
  dominantChords.forEach(dominantChord => {
    let currentChain = [dominantChord];
    let currentTarget = dominantChord;
    
    // 构建最多maxDepth层的属和弦链
    for (let depth = 1; depth <= maxDepth; depth++) {
      const nextDominant = getSecondaryDominant(currentTarget);
      currentChain.unshift(nextDominant); // 添加到链的开头
      
      chains.push({
        chain: [...currentChain],
        depth: depth,
        progression: currentChain.map(c => c.symbol).join(' → '),
        target: dominantChord.symbol,
        explanation: `${depth}级重属和弦链，解决到${dominantChord.symbol}`
      });
      
      currentTarget = nextDominant;
    }
  });
  
  return chains;
}

/**
 * 工具函数：获取调式借用和弦 (Modal Interchange)
 */
export function getModalInterchangeChords(rootNote, currentModeName) {
  const currentChords = buildDiatonicChords(rootNote, currentModeName);
  const currentChordSymbols = new Set(currentChords.map(c => c.symbol));
  
  const borrowedChords = [];
  
  // 遍历所有平行调式
  Object.keys(MODES).forEach(modeName => {
    if (modeName !== currentModeName) {
      const modeChords = buildDiatonicChords(rootNote, modeName);
      
      modeChords.forEach(chord => {
        // 如果这个和弦不在当前调式中，则为借用和弦
        if (!currentChordSymbols.has(chord.symbol)) {
          borrowedChords.push({
            ...chord,
            sourceMode: modeName,
            sourceModeChinese: MODES[modeName].chineseName,
            explanation: `从${MODES[modeName].chineseName}借用的${chord.symbol}`
          });
        }
      });
    }
  });
  
  // 去重并按根音排序
  const uniqueBorrowedChords = borrowedChords.filter((chord, index, self) =>
    index === self.findIndex(c => c.symbol === chord.symbol)
  );
  
  return uniqueBorrowedChords.sort((a, b) => 
    getNoteIndex(a.root) - getNoteIndex(b.root)
  );
}

/**
 * 工具函数：获取和弦替代建议
 */
export function getChordSubstitutions(chord) {
  const substitutions = [];
  
  // 根据和弦功能选择替代规则
  const chordFunction = CHORD_TYPES[chord.quality]?.function;
  
  if (chordFunction === 'dominant') {
    // 属功能和弦的替代
    Object.values(CHORD_SUBSTITUTION_RULES.dominant_substitutions).forEach(subRule => {
      const substitution = subRule.rule(chord);
      if (substitution) {
        substitutions.push({
          ...substitution,
          type: 'dominant_substitution',
          originalChord: chord.symbol
        });
      }
    });
  } else if (chordFunction === 'tonic') {
    // 主功能和弦的替代
    Object.values(CHORD_SUBSTITUTION_RULES.tonic_substitutions).forEach(subRule => {
      const substitution = subRule.rule(chord);
      if (substitution) {
        substitutions.push({
          ...substitution,
          type: 'tonic_substitution',
          originalChord: chord.symbol
        });
      }
    });
  }
  
  return substitutions;
}

// 导出完整的数据库对象
export const MusicTheoryDB = {
  NOTES,
  INTERVALS,
  MODES,
  CHORD_TYPES,
  ROMAN_NUMERALS,
  HARMONIC_FUNCTIONS,
  DIATONIC_PROGRESSION_WEIGHTS,
  SECONDARY_DOMINANT_TARGETS,
  MODAL_INTERCHANGE_CHORDS,
  CHORD_SUBSTITUTION_RULES,
  
  // 工具函数
  getNoteIndex,
  getTargetNote,
  buildScale,
  buildDiatonicChords,
  getRomanNumeral,
  getParallelModes,
  getSecondaryDominant,
  buildDoubleDominantChains,
  getModalInterchangeChords,
  getChordSubstitutions
};

export default MusicTheoryDB;