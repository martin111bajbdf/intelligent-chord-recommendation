# 🎼 Music Theory Database

A comprehensive music theory database for intelligent chord recommendation systems, built with JavaScript/ES6 modules.

## 📁 Database Structure

### 1. `musicTheoryDatabase.js` - Core Music Theory
- **Basic Elements**: 12-tone chromatic notes, intervals, modes
- **Mode Definitions**: 9 different modes including Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian, Harmonic Minor, and Melodic Minor
- **Chord Qualities**: Basic chord types with harmonic functions
- **Roman Numeral Analysis**: Automatic roman numeral generation
- **Harmonic Functions**: Tonic, Subdominant, Dominant classifications
- **Progression Weights**: Statistical weights for diatonic chord progressions
- **Secondary Dominants**: Rules for secondary dominant chord targets
- **Modal Interchange**: Common borrowed chords between parallel modes

### 2. `chordDatabase.js` - Extended Chord Library
- **Extended Chord Types**: 25+ chord types from basic triads to complex jazz chords
- **Chord Categories**: 
  - Basic triads (maj, min, dim, aug)
  - Seventh chords (maj7, m7, 7, m7b5, dim7, mMaj7)
  - Extended chords (9th, 11th, 13th)
  - Suspended chords (sus2, sus4, 7sus4)
  - Altered chords (7b5, 7#5, 7b9, 7#9, alt)
- **Chord Substitutions**: Tritone substitution, relative substitution rules
- **Tension Analysis**: Chord tension levels and color classifications
- **Chord Colors**: Emotional/stylistic categorization (bright, warm, dark, mysterious, etc.)

### 3. `progressionDatabase.js` - Chord Progression Patterns
- **Classic Progressions**: 
  - Pop: I-V-vi-IV, vi-IV-I-V, I-vi-IV-V
  - Jazz: ii-V-I, I-vi-ii-V, Circle of Fifths
  - Classical: I-IV-V-I, I-V-I
  - Blues: 12-bar blues, quick-change blues
- **Functional Analysis**: Tonic, Subdominant, Dominant function rules
- **Modal Progressions**: Characteristic progressions for Dorian, Mixolydian, Phrygian
- **Modern Styles**: Neo-soul, R&B, Gospel progressions
- **Tension Analysis**: Emotional impact and resolution strength calculations

## 🔧 Key Features

### Music Theory Engine
```javascript
import { MusicTheoryDB } from './musicTheoryDatabase.js';

// Build a scale
const cMajorScale = MusicTheoryDB.buildScale('C', 'Ionian');
// Result: ['C', 'D', 'E', 'F', 'G', 'A', 'B']

// Build diatonic chords
const cMajorChords = MusicTheoryDB.buildDiatonicChords('C', 'Ionian');
// Result: Array of chord objects with roman numerals and functions
```

### Chord Construction
```javascript
import { ChordDB } from './chordDatabase.js';

// Build a complex chord
const chord = ChordDB.buildChord('C', 'maj9');
// Result: Complete chord object with notes, intervals, function, tension

// Get chord inversions
const inversions = ChordDB.getChordInversions(chord);
```

### Progression Analysis
```javascript
import { ProgressionDB } from './progressionDatabase.js';

// Analyze chord progression function
const analysis = ProgressionDB.analyzeProgressionFunction([1, 5, 6, 4]);

// Calculate tension curve
const tension = ProgressionDB.calculateTensionCurve([1, 5, 6, 4]);

// Get emotional mood
const mood = ProgressionDB.getProgressionMood([1, 5, 6, 4]);
```

## 🎯 Four Recommendation Engine Support

This database is designed to support four types of chord recommendation engines:

### 1. Diatonic Chord Recommendations
- Uses `MODES` and `DIATONIC_PROGRESSION_WEIGHTS`
- Provides scale-based chord suggestions with probability weights

### 2. Secondary Dominant Recommendations
- Uses `SECONDARY_DOMINANT_TARGETS` and `getSecondaryDominant()` function
- Generates V/x → x progressions

### 3. Double Dominant Recommendations
- Supports multi-level dominant chains (V/V/V)
- Uses circle of fifths relationships

### 4. Modal Interchange Recommendations
- Uses `MODAL_INTERCHANGE_CHORDS` and `getParallelModes()`
- Suggests borrowed chords from parallel modes

## 📊 Data Structure Examples

### Mode Definition
```javascript
'Ionian': {
  name: 'Ionian',
  chineseName: '伊奥尼亚调式 (大调)',
  intervals: [0, 2, 4, 5, 7, 9, 11],
  chordQualities: ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'm7b5']
}
```

### Chord Type Definition
```javascript
'maj9': {
  name: 'Major 9th',
  symbol: 'maj9',
  intervals: [0, 4, 7, 11, 14],
  notes: ['1', '3', '5', '7', '9'],
  function: 'tonic',
  tension: 'colorful'
}
```

### Progression Pattern
```javascript
'I-V-vi-IV': {
  name: 'I-V-vi-IV (流行进行)',
  pattern: [1, 5, 6, 4],
  description: '最常见的流行音乐进行，循环性强',
  examples: ['C-G-Am-F', 'G-D-Em-C'],
  mood: 'uplifting',
  genre: ['pop', 'rock', 'country']
}
```

## 🚀 Usage in Chord Recommendation System

1. **Initialize with key and mode**
2. **Get current chord context**
3. **Query appropriate recommendation engine**
4. **Return weighted suggestions with explanations**

## 🎵 Supported Music Styles

- **Classical**: Traditional harmony rules and progressions
- **Jazz**: Extended chords, ii-V-I patterns, circle progressions
- **Pop/Rock**: Common contemporary progressions
- **Blues**: 12-bar patterns and variations
- **Modal**: Characteristic progressions for each mode
- **Modern**: Neo-soul, R&B, Gospel styles

## 📝 Notes

- All chord symbols follow standard jazz notation
- Roman numeral analysis follows traditional music theory
- Tension levels are quantified for algorithmic processing
- Chinese names provided for educational purposes
- Extensible structure for adding new chord types and progressions

This database provides the foundation for building sophisticated music theory-aware applications, particularly chord recommendation systems that understand harmonic context and musical style.