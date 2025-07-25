/**
 * 和弦进行数据库
 * Chord Progression Database with Common Patterns and Rules
 */

import { NOTES, MODES } from './musicTheoryDatabase.js';

// 经典和弦进行模式
export const CLASSIC_PROGRESSIONS = {
  // 流行音乐常用进行
  'pop': {
    'I-V-vi-IV': {
      name: 'I-V-vi-IV (流行进行)',
      pattern: [1, 5, 6, 4],
      description: '最常见的流行音乐进行，循环性强',
      examples: ['C-G-Am-F', 'G-D-Em-C'],
      mood: 'uplifting',
      genre: ['pop', 'rock', 'country']
    },
    'vi-IV-I-V': {
      name: 'vi-IV-I-V (小调开始)',
      pattern: [6, 4, 1, 5],
      description: '从小调开始的流行进行',
      examples: ['Am-F-C-G', 'Em-C-G-D'],
      mood: 'melancholic_to_hopeful',
      genre: ['pop', 'ballad']
    },
    'I-vi-IV-V': {
      name: 'I-vi-IV-V (50年代进行)',
      pattern: [1, 6, 4, 5],
      description: '经典的50年代摇滚进行',
      examples: ['C-Am-F-G', 'F-Dm-Bb-C'],
      mood: 'nostalgic',
      genre: ['doo-wop', 'oldies', 'rock']
    }
  },

  // 爵士常用进行
  'jazz': {
    'ii-V-I': {
      name: 'ii-V-I (爵士基础)',
      pattern: [2, 5, 1],
      description: '爵士音乐最基础的进行',
      examples: ['Dm7-G7-Cmaj7', 'Am7-D7-Gmaj7'],
      mood: 'sophisticated',
      genre: ['jazz', 'bossa nova']
    },
    'I-vi-ii-V': {
      name: 'I-vi-ii-V (爵士标准)',
      pattern: [1, 6, 2, 5],
      description: '爵士标准曲常用进行',
      examples: ['Cmaj7-Am7-Dm7-G7'],
      mood: 'smooth',
      genre: ['jazz', 'swing']
    },
    'iii-vi-ii-V': {
      name: 'iii-vi-ii-V (下行循环)',
      pattern: [3, 6, 2, 5],
      description: '下行五度循环进行',
      examples: ['Em7-Am7-Dm7-G7'],
      mood: 'flowing',
      genre: ['jazz', 'latin']
    },
    'I-IV-vii-iii-vi-ii-V-I': {
      name: '循环进行 (Circle of Fifths)',
      pattern: [1, 4, 7, 3, 6, 2, 5, 1],
      description: '完整的五度循环进行',
      examples: ['Cmaj7-Fmaj7-Bm7b5-Em7-Am7-Dm7-G7-Cmaj7'],
      mood: 'complex',
      genre: ['jazz', 'bebop']
    }
  },

  // 古典音乐进行
  'classical': {
    'I-IV-V-I': {
      name: 'I-IV-V-I (正格终止)',
      pattern: [1, 4, 5, 1],
      description: '古典音乐最基本的终止式',
      examples: ['C-F-G-C', 'G-C-D-G'],
      mood: 'resolved',
      genre: ['classical', 'hymn']
    },
    'I-V-I': {
      name: 'I-V-I (简单终止)',
      pattern: [1, 5, 1],
      description: '最简单的终止进行',
      examples: ['C-G-C', 'F-C-F'],
      mood: 'conclusive',
      genre: ['classical', 'folk']
    },
    'vi-IV-I-V': {
      name: 'vi-IV-I-V (变格进行)',
      pattern: [6, 4, 1, 5],
      description: '从小调开始的古典进行',
      examples: ['Am-F-C-G'],
      mood: 'dramatic',
      genre: ['classical', 'romantic']
    }
  },

  // 布鲁斯进行
  'blues': {
    '12-bar-blues': {
      name: '12小节布鲁斯',
      pattern: [1, 1, 1, 1, 4, 4, 1, 1, 5, 4, 1, 5],
      description: '标准12小节布鲁斯进行',
      examples: ['C7-C7-C7-C7-F7-F7-C7-C7-G7-F7-C7-G7'],
      mood: 'bluesy',
      genre: ['blues', 'rock', 'jazz']
    },
    'quick-change': {
      name: '快速变化布鲁斯',
      pattern: [1, 4, 1, 1, 4, 4, 1, 1, 5, 4, 1, 5],
      description: '第二小节加入IV级的布鲁斯',
      examples: ['C7-F7-C7-C7-F7-F7-C7-C7-G7-F7-C7-G7'],
      mood: 'energetic',
      genre: ['blues', 'boogie']
    }
  }
};

// 和弦功能进行规则
export const FUNCTIONAL_PROGRESSION_RULES = {
  // 主功能和弦 (Tonic)
  'tonic': {
    degrees: [1, 3, 6],
    function: 'stability',
    canGoTo: ['subdominant', 'dominant', 'tonic'],
    commonTargets: [2, 4, 5, 6],
    description: '提供稳定感，可以作为起点和终点'
  },

  // 下属功能和弦 (Subdominant)
  'subdominant': {
    degrees: [2, 4, 6],
    function: 'departure',
    canGoTo: ['dominant', 'tonic'],
    commonTargets: [1, 5, 7],
    description: '离开主和弦，通常导向属和弦'
  },

  // 属功能和弦 (Dominant)
  'dominant': {
    degrees: [5, 7],
    function: 'tension',
    canGoTo: ['tonic', 'subdominant'],
    commonTargets: [1, 6],
    description: '创造张力，强烈倾向于解决到主和弦'
  }
};

// 和弦进行张力分析
export const TENSION_ANALYSIS = {
  'resolution_strength': {
    'V-I': 10,      // 最强解决
    'V-vi': 8,      // 欺骗终止
    'vii-I': 9,     // 导音解决
    'IV-I': 7,      // 变格终止
    'ii-V': 6,      // 准备属和弦
    'I-vi': 5,      // 相对小调
    'vi-IV': 4,     // 下行进行
    'I-V': 3,       // 离开主调
    'iii-vi': 3,    // 小调内进行
    'I-IV': 2       // 上行四度
  },

  'emotional_impact': {
    'ascending': {
      'I-ii': 'gentle_lift',
      'I-iii': 'hopeful_rise',
      'I-IV': 'confident_ascent',
      'I-V': 'building_tension'
    },
    'descending': {
      'I-vii': 'slight_descent',
      'I-vi': 'melancholic_drop',
      'V-IV': 'relaxing_fall',
      'vi-V': 'lifting_from_sadness'
    },
    'circular': {
      'vi-IV-I-V': 'emotional_journey',
      'I-V-vi-IV': 'cyclical_energy',
      'ii-V-I': 'jazz_sophistication'
    }
  }
};

// 调式特色进行
export const MODAL_PROGRESSIONS = {
  'dorian': {
    'i-IV': {
      pattern: [1, 4],
      description: 'Dorian调式特色：小调主和弦到大调IV级',
      example: 'Dm-G (D Dorian)',
      characteristic: 'bittersweet'
    },
    'i-bVII-IV': {
      pattern: [1, 7, 4],
      description: 'Dorian三和弦进行',
      example: 'Dm-C-G (D Dorian)',
      characteristic: 'modal_flavor'
    }
  },

  'mixolydian': {
    'I-bVII': {
      pattern: [1, 7],
      description: 'Mixolydian特色：大调主和弦到降VII级',
      example: 'G-F (G Mixolydian)',
      characteristic: 'rock_modal'
    },
    'I-bVII-IV': {
      pattern: [1, 7, 4],
      description: '摇滚常用的Mixolydian进行',
      example: 'G-F-C (G Mixolydian)',
      characteristic: 'anthemic'
    }
  },

  'phrygian': {
    'i-bII': {
      pattern: [1, 2],
      description: 'Phrygian特色：小调主和弦到降II级',
      example: 'Em-F (E Phrygian)',
      characteristic: 'spanish_flavor'
    },
    'i-bII-bIII': {
      pattern: [1, 2, 3],
      description: 'Phrygian上行进行',
      example: 'Em-F-G (E Phrygian)',
      characteristic: 'exotic'
    }
  }
};

// 现代和弦进行
export const MODERN_PROGRESSIONS = {
  'neo_soul': {
    'imaj7-ii7-iii7-IVmaj7': {
      pattern: [1, 2, 3, 4],
      chordTypes: ['maj7', '7', '7', 'maj7'],
      description: 'Neo-soul风格的七和弦进行',
      example: 'Cmaj7-D7-E7-Fmaj7',
      mood: 'sophisticated_groove'
    }
  },

  'r_and_b': {
    'i7-iv7-V7': {
      pattern: [1, 4, 5],
      chordTypes: ['7', '7', '7'],
      description: 'R&B小调布鲁斯进行',
      example: 'Am7-Dm7-E7',
      mood: 'soulful'
    }
  },

  'gospel': {
    'I-iii-IV-iv': {
      pattern: [1, 3, 4, 4],
      chordTypes: ['maj7', 'm7', 'maj7', 'm7'],
      description: '福音音乐经典进行',
      example: 'Cmaj7-Em7-Fmaj7-Fm7',
      mood: 'spiritual'
    }
  }
};

// 和弦替代建议
export const SUBSTITUTION_SUGGESTIONS = {
  // 三全音替代
  'tritone_substitution': {
    'V7': 'bII7',
    description: '属七和弦的三全音替代',
    example: 'G7 → Db7 (in key of C)',
    usage: 'jazz_reharmonization'
  },

  // 相对调替代
  'relative_substitution': {
    'I': 'vi',
    'vi': 'I',
    description: '相对大小调替代',
    example: 'C → Am, Am → C',
    usage: 'color_variation'
  },

  // 平行调替代
  'parallel_substitution': {
    'I': 'i',
    'IV': 'iv',
    'V': 'v',
    description: '平行大小调替代',
    example: 'C → Cm, F → Fm',
    usage: 'modal_interchange'
  }
};

// 和弦进行生成规则
export const PROGRESSION_GENERATION_RULES = {
  // 开始和弦偏好
  'starting_chords': {
    'major_key': [1, 6, 4], // I, vi, IV
    'minor_key': [1, 6, 4], // i, VI, iv
    'weights': [0.6, 0.25, 0.15]
  },

  // 结束和弦偏好
  'ending_chords': {
    'major_key': [1], // I
    'minor_key': [1], // i
    'weights': [1.0]
  },

  // 进行长度偏好
  'progression_lengths': {
    'short': { bars: 2, weight: 0.2 },
    'medium': { bars: 4, weight: 0.5 },
    'long': { bars: 8, weight: 0.3 }
  },

  // 重复模式
  'repetition_patterns': {
    'AABA': { description: '经典32小节形式', weight: 0.4 },
    'ABAC': { description: '变化重复', weight: 0.3 },
    'ABCD': { description: '完全不重复', weight: 0.3 }
  }
};

/**
 * 工具函数：分析和弦进行的功能
 */
export function analyzeProgressionFunction(progression, key = 'C', mode = 'Ionian') {
  return progression.map((degree, index) => {
    let func = 'unknown';
    
    // 判断和声功能
    if (FUNCTIONAL_PROGRESSION_RULES.tonic.degrees.includes(degree)) {
      func = 'tonic';
    } else if (FUNCTIONAL_PROGRESSION_RULES.subdominant.degrees.includes(degree)) {
      func = 'subdominant';
    } else if (FUNCTIONAL_PROGRESSION_RULES.dominant.degrees.includes(degree)) {
      func = 'dominant';
    }

    // 分析与下一个和弦的关系
    let nextRelation = null;
    if (index < progression.length - 1) {
      const nextDegree = progression[index + 1];
      const interval = (nextDegree - degree + 7) % 7;
      
      switch (interval) {
        case 1: nextRelation = 'step_up'; break;
        case 2: nextRelation = 'third_up'; break;
        case 3: nextRelation = 'fourth_up'; break;
        case 4: nextRelation = 'fifth_up'; break;
        case 5: nextRelation = 'sixth_up'; break;
        case 6: nextRelation = 'step_down'; break;
        default: nextRelation = 'same';
      }
    }

    return {
      degree,
      function: func,
      nextRelation,
      position: index,
      isResolution: func === 'tonic' && index > 0
    };
  });
}

/**
 * 工具函数：计算和弦进行的张力曲线
 */
export function calculateTensionCurve(progression) {
  const tensionValues = progression.map((degree, index) => {
    let baseTension = 0;
    
    // 根据和声功能设定基础张力
    if (FUNCTIONAL_PROGRESSION_RULES.tonic.degrees.includes(degree)) {
      baseTension = 1;
    } else if (FUNCTIONAL_PROGRESSION_RULES.subdominant.degrees.includes(degree)) {
      baseTension = 3;
    } else if (FUNCTIONAL_PROGRESSION_RULES.dominant.degrees.includes(degree)) {
      baseTension = 5;
    }

    // 考虑位置因素
    const positionFactor = index / (progression.length - 1);
    const positionTension = Math.sin(positionFactor * Math.PI) * 2;

    return Math.min(baseTension + positionTension, 7);
  });

  return {
    values: tensionValues,
    peak: Math.max(...tensionValues),
    average: tensionValues.reduce((a, b) => a + b, 0) / tensionValues.length,
    curve_type: tensionValues[0] < tensionValues[tensionValues.length - 1] ? 'ascending' : 'descending'
  };
}

/**
 * 工具函数：获取进行的情绪标签
 */
export function getProgressionMood(progression) {
  const analysis = analyzeProgressionFunction(progression);
  const tensionCurve = calculateTensionCurve(progression);
  
  let mood = 'neutral';
  
  // 基于张力曲线判断情绪
  if (tensionCurve.average < 2) {
    mood = 'peaceful';
  } else if (tensionCurve.average > 4) {
    mood = 'intense';
  } else if (tensionCurve.curve_type === 'ascending') {
    mood = 'building';
  } else {
    mood = 'resolving';
  }

  // 基于功能进行调整
  const tonicCount = analysis.filter(a => a.function === 'tonic').length;
  const dominantCount = analysis.filter(a => a.function === 'dominant').length;
  
  if (dominantCount > tonicCount) {
    mood = mood === 'peaceful' ? 'restless' : 'dramatic';
  }

  return {
    primary: mood,
    intensity: Math.round(tensionCurve.average),
    character: tensionCurve.curve_type,
    stability: tonicCount / progression.length
  };
}

// 导出进行数据库
export const ProgressionDB = {
  CLASSIC_PROGRESSIONS,
  FUNCTIONAL_PROGRESSION_RULES,
  TENSION_ANALYSIS,
  MODAL_PROGRESSIONS,
  MODERN_PROGRESSIONS,
  SUBSTITUTION_SUGGESTIONS,
  PROGRESSION_GENERATION_RULES,
  analyzeProgressionFunction,
  calculateTensionCurve,
  getProgressionMood
};

export default ProgressionDB;