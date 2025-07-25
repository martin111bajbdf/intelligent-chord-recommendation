/**
 * 和弦数据库
 * Comprehensive Chord Database with Extended Chord Types
 */

import { NOTES, getNoteIndex, getTargetNote } from './musicTheoryDatabase.js';

// 扩展和弦类型定义 (包含更多爵士和现代和弦)
export const EXTENDED_CHORD_TYPES = {
  // 基础三和弦
  'maj': {
    name: 'Major Triad',
    symbol: '',
    intervals: [0, 4, 7],
    notes: ['1', '3', '5'],
    function: 'tonic',
    tension: 'stable'
  },
  'min': {
    name: 'Minor Triad',
    symbol: 'm',
    intervals: [0, 3, 7],
    notes: ['1', 'b3', '5'],
    function: 'tonic',
    tension: 'stable'
  },
  'dim': {
    name: 'Diminished Triad',
    symbol: 'dim',
    intervals: [0, 3, 6],
    notes: ['1', 'b3', 'b5'],
    function: 'dominant',
    tension: 'unstable'
  },
  'aug': {
    name: 'Augmented Triad',
    symbol: 'aug',
    intervals: [0, 4, 8],
    notes: ['1', '3', '#5'],
    function: 'dominant',
    tension: 'unstable'
  },

  // 七和弦
  'maj7': {
    name: 'Major 7th',
    symbol: 'maj7',
    intervals: [0, 4, 7, 11],
    notes: ['1', '3', '5', '7'],
    function: 'tonic',
    tension: 'stable'
  },
  'm7': {
    name: 'Minor 7th',
    symbol: 'm7',
    intervals: [0, 3, 7, 10],
    notes: ['1', 'b3', '5', 'b7'],
    function: 'subdominant',
    tension: 'mild'
  },
  '7': {
    name: 'Dominant 7th',
    symbol: '7',
    intervals: [0, 4, 7, 10],
    notes: ['1', '3', '5', 'b7'],
    function: 'dominant',
    tension: 'unstable'
  },
  'm7b5': {
    name: 'Half Diminished',
    symbol: 'm7b5',
    intervals: [0, 3, 6, 10],
    notes: ['1', 'b3', 'b5', 'b7'],
    function: 'subdominant',
    tension: 'unstable'
  },
  'dim7': {
    name: 'Diminished 7th',
    symbol: 'dim7',
    intervals: [0, 3, 6, 9],
    notes: ['1', 'b3', 'b5', 'bb7'],
    function: 'dominant',
    tension: 'very_unstable'
  },
  'mMaj7': {
    name: 'Minor Major 7th',
    symbol: 'mMaj7',
    intervals: [0, 3, 7, 11],
    notes: ['1', 'b3', '5', '7'],
    function: 'tonic',
    tension: 'mild'
  },

  // 扩展和弦 (9th, 11th, 13th)
  'maj9': {
    name: 'Major 9th',
    symbol: 'maj9',
    intervals: [0, 4, 7, 11, 14],
    notes: ['1', '3', '5', '7', '9'],
    function: 'tonic',
    tension: 'colorful'
  },
  'm9': {
    name: 'Minor 9th',
    symbol: 'm9',
    intervals: [0, 3, 7, 10, 14],
    notes: ['1', 'b3', '5', 'b7', '9'],
    function: 'subdominant',
    tension: 'colorful'
  },
  '9': {
    name: 'Dominant 9th',
    symbol: '9',
    intervals: [0, 4, 7, 10, 14],
    notes: ['1', '3', '5', 'b7', '9'],
    function: 'dominant',
    tension: 'colorful'
  },
  'maj11': {
    name: 'Major 11th',
    symbol: 'maj11',
    intervals: [0, 4, 7, 11, 14, 17],
    notes: ['1', '3', '5', '7', '9', '11'],
    function: 'tonic',
    tension: 'very_colorful'
  },
  'm11': {
    name: 'Minor 11th',
    symbol: 'm11',
    intervals: [0, 3, 7, 10, 14, 17],
    notes: ['1', 'b3', '5', 'b7', '9', '11'],
    function: 'subdominant',
    tension: 'very_colorful'
  },
  '11': {
    name: 'Dominant 11th',
    symbol: '11',
    intervals: [0, 4, 7, 10, 14, 17],
    notes: ['1', '3', '5', 'b7', '9', '11'],
    function: 'dominant',
    tension: 'very_colorful'
  },

  // 挂留和弦
  'sus2': {
    name: 'Suspended 2nd',
    symbol: 'sus2',
    intervals: [0, 2, 7],
    notes: ['1', '2', '5'],
    function: 'neutral',
    tension: 'suspended'
  },
  'sus4': {
    name: 'Suspended 4th',
    symbol: 'sus4',
    intervals: [0, 5, 7],
    notes: ['1', '4', '5'],
    function: 'neutral',
    tension: 'suspended'
  },
  '7sus4': {
    name: 'Dominant 7th Suspended 4th',
    symbol: '7sus4',
    intervals: [0, 5, 7, 10],
    notes: ['1', '4', '5', 'b7'],
    function: 'dominant',
    tension: 'suspended'
  },

  // 变化和弦
  '7b5': {
    name: 'Dominant 7th Flat 5',
    symbol: '7b5',
    intervals: [0, 4, 6, 10],
    notes: ['1', '3', 'b5', 'b7'],
    function: 'dominant',
    tension: 'altered'
  },
  '7#5': {
    name: 'Dominant 7th Sharp 5',
    symbol: '7#5',
    intervals: [0, 4, 8, 10],
    notes: ['1', '3', '#5', 'b7'],
    function: 'dominant',
    tension: 'altered'
  },
  '7b9': {
    name: 'Dominant 7th Flat 9',
    symbol: '7b9',
    intervals: [0, 4, 7, 10, 13],
    notes: ['1', '3', '5', 'b7', 'b9'],
    function: 'dominant',
    tension: 'altered'
  },
  '7#9': {
    name: 'Dominant 7th Sharp 9',
    symbol: '7#9',
    intervals: [0, 4, 7, 10, 15],
    notes: ['1', '3', '5', 'b7', '#9'],
    function: 'dominant',
    tension: 'altered'
  },
  'alt': {
    name: 'Altered Dominant',
    symbol: 'alt',
    intervals: [0, 4, 6, 10, 13, 15],
    notes: ['1', '3', 'b5', 'b7', 'b9', '#9'],
    function: 'dominant',
    tension: 'very_altered'
  }
};

// 和弦替代关系
export const CHORD_SUBSTITUTIONS = {
  // 三全音替代
  'tritone': {
    description: '三全音替代 (距离6个半音的属七和弦)',
    rule: (chord) => {
      if (chord.quality === '7') {
        const rootIndex = getNoteIndex(chord.root);
        const substituteIndex = (rootIndex + 6) % 12;
        return {
          root: NOTES[substituteIndex],
          quality: '7',
          symbol: `${NOTES[substituteIndex]}7`,
          type: 'tritone_substitution'
        };
      }
      return null;
    }
  },

  // 相对小调/大调替代
  'relative': {
    description: '相对调替代',
    rule: (chord) => {
      const rootIndex = getNoteIndex(chord.root);
      if (chord.quality === 'maj7') {
        // 大七和弦 -> 相对小调
        const relativeMinorIndex = (rootIndex + 9) % 12;
        return {
          root: NOTES[relativeMinorIndex],
          quality: 'm7',
          symbol: `${NOTES[relativeMinorIndex]}m7`,
          type: 'relative_minor'
        };
      } else if (chord.quality === 'm7') {
        // 小七和弦 -> 相对大调
        const relativeMajorIndex = (rootIndex + 3) % 12;
        return {
          root: NOTES[relativeMajorIndex],
          quality: 'maj7',
          symbol: `${NOTES[relativeMajorIndex]}maj7`,
          type: 'relative_major'
        };
      }
      return null;
    }
  }
};

// 和弦张力等级
export const TENSION_LEVELS = {
  'stable': 0,
  'mild': 1,
  'colorful': 2,
  'suspended': 2,
  'unstable': 3,
  'altered': 4,
  'very_unstable': 4,
  'very_colorful': 3,
  'very_altered': 5
};

// 和弦色彩分类
export const CHORD_COLORS = {
  'bright': ['maj7', 'maj9', 'maj11', '7#11'],
  'warm': ['m7', 'm9', 'm11'],
  'dark': ['m7b5', 'dim7', '7b5', '7b9'],
  'mysterious': ['mMaj7', '7#5', 'alt'],
  'suspended': ['sus2', 'sus4', '7sus4'],
  'jazzy': ['9', '11', '13', '7#9', '7b9'],
  'classical': ['maj', 'min', 'dim', 'aug']
};

/**
 * 工具函数：构建和弦
 */
export function buildChord(rootNote, chordType) {
  const chordInfo = EXTENDED_CHORD_TYPES[chordType];
  if (!chordInfo) {
    throw new Error(`Unknown chord type: ${chordType}`);
  }

  const rootIndex = getNoteIndex(rootNote);
  const chordNotes = chordInfo.intervals.map(interval => {
    const noteIndex = (rootIndex + interval) % 12;
    return NOTES[noteIndex];
  });

  return {
    root: rootNote,
    type: chordType,
    symbol: `${rootNote}${chordInfo.symbol}`,
    notes: chordNotes,
    intervals: chordInfo.intervals,
    function: chordInfo.function,
    tension: chordInfo.tension,
    tensionLevel: TENSION_LEVELS[chordInfo.tension] || 0,
    name: chordInfo.name,
    degreeNotes: chordInfo.notes
  };
}

/**
 * 工具函数：获取和弦的所有可能转位
 */
export function getChordInversions(chord) {
  const inversions = [];
  const notes = [...chord.notes];
  
  for (let i = 0; i < notes.length; i++) {
    const inversionNotes = [...notes.slice(i), ...notes.slice(0, i)];
    inversions.push({
      ...chord,
      notes: inversionNotes,
      bass: inversionNotes[0],
      inversion: i,
      symbol: i === 0 ? chord.symbol : `${chord.symbol}/${inversionNotes[0]}`
    });
  }
  
  return inversions;
}

/**
 * 工具函数：分析和弦进行的张力变化
 */
export function analyzeTensionProgression(chords) {
  return chords.map((chord, index) => {
    const currentTension = TENSION_LEVELS[chord.tension] || 0;
    const nextTension = index < chords.length - 1 ? 
      TENSION_LEVELS[chords[index + 1].tension] || 0 : null;
    
    let movement = 'stable';
    if (nextTension !== null) {
      if (nextTension > currentTension) movement = 'increasing';
      else if (nextTension < currentTension) movement = 'decreasing';
    }
    
    return {
      chord,
      tension: currentTension,
      movement,
      nextTension
    };
  });
}

/**
 * 工具函数：获取和弦的色彩分类
 */
export function getChordColors(chordType) {
  const colors = [];
  for (const [color, types] of Object.entries(CHORD_COLORS)) {
    if (types.includes(chordType)) {
      colors.push(color);
    }
  }
  return colors;
}

// 导出和弦数据库
export const ChordDB = {
  EXTENDED_CHORD_TYPES,
  CHORD_SUBSTITUTIONS,
  TENSION_LEVELS,
  CHORD_COLORS,
  buildChord,
  getChordInversions,
  analyzeTensionProgression,
  getChordColors
};

export default ChordDB;