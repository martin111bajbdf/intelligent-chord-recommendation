/**
 * Debug and Test Script for Music Theory Database
 */

import { MusicTheoryDB } from './musicTheoryDatabase.js';
import { ChordDB } from './chordDatabase.js';
import { ProgressionDB } from './progressionDatabase.js';
import { ChordRecommendationEngine } from './recommendationEngine.js';

console.log('🎼 Starting Music Theory Database Debug...\n');

// Test 1: Basic Database Functions
console.log('=== Test 1: Basic Database Functions ===');
try {
  const cMajorScale = MusicTheoryDB.buildScale('C', 'Ionian');
  console.log('✅ C Major Scale:', cMajorScale);
  
  const cMajorChords = MusicTheoryDB.buildDiatonicChords('C', 'Ionian');
  console.log('✅ C Major Chords:', cMajorChords.map(c => c.symbol));
  
  const secondaryDom = MusicTheoryDB.getSecondaryDominant(cMajorChords[5]); // Am
  console.log('✅ Secondary Dominant of Am:', secondaryDom);
} catch (error) {
  console.error('❌ Test 1 Failed:', error.message);
}

// Test 2: Double Dominants
console.log('\n=== Test 2: Double Dominants ===');
try {
  const doubleDominants = MusicTheoryDB.buildDoubleDominantChains('C', 'Ionian', 2);
  console.log('✅ Double Dominant Chains:', doubleDominants.length, 'chains found');
  doubleDominants.slice(0, 3).forEach(chain => {
    console.log('  -', chain.progression);
  });
} catch (error) {
  console.error('❌ Test 2 Failed:', error.message);
}

// Test 3: Modal Interchange
console.log('\n=== Test 3: Modal Interchange ===');
try {
  const borrowedChords = MusicTheoryDB.getModalInterchangeChords('C', 'Ionian');
  console.log('✅ Borrowed Chords:', borrowedChords.length, 'chords found');
  borrowedChords.slice(0, 5).forEach(chord => {
    console.log('  -', chord.symbol, 'from', chord.sourceMode);
  });
} catch (error) {
  console.error('❌ Test 3 Failed:', error.message);
}

// Test 4: Chord Substitutions
console.log('\n=== Test 4: Chord Substitutions ===');
try {
  const testChord = { root: 'G', quality: '7', symbol: 'G7' };
  const substitutions = MusicTheoryDB.getChordSubstitutions(testChord);
  console.log('✅ G7 Substitutions:', substitutions.length, 'found');
  substitutions.forEach(sub => {
    console.log('  -', sub.symbol, ':', sub.explanation);
  });
} catch (error) {
  console.error('❌ Test 4 Failed:', error.message);
}

// Test 5: Extended Chord Database
console.log('\n=== Test 5: Extended Chord Database ===');
try {
  const cmaj9 = ChordDB.buildChord('C', 'maj9');
  console.log('✅ Cmaj9 Chord:', cmaj9);
  
  const inversions = ChordDB.getChordInversions(cmaj9);
  console.log('✅ Cmaj9 Inversions:', inversions.length, 'inversions');
} catch (error) {
  console.error('❌ Test 5 Failed:', error.message);
}

// Test 6: Progression Analysis
console.log('\n=== Test 6: Progression Analysis ===');
try {
  const progression = [1, 5, 6, 4]; // I-V-vi-IV
  const analysis = ProgressionDB.analyzeProgressionFunction(progression);
  console.log('✅ I-V-vi-IV Analysis:', analysis.map(a => a.function));
  
  const tension = ProgressionDB.calculateTensionCurve(progression);
  console.log('✅ Tension Curve:', tension.values);
  
  const mood = ProgressionDB.getProgressionMood(progression);
  console.log('✅ Mood Analysis:', mood);
} catch (error) {
  console.error('❌ Test 6 Failed:', error.message);
}

// Test 7: Complete Recommendation Engine
console.log('\n=== Test 7: Complete Recommendation Engine ===');
try {
  const engine = new ChordRecommendationEngine();
  engine.setKey('C', 'Ionian');
  engine.setCurrentChord('Am');
  
  const recommendations = engine.getAllRecommendations();
  console.log('✅ Recommendation Engine Working');
  console.log('  - Diatonic:', recommendations.diatonic.length);
  console.log('  - Secondary Dominant:', recommendations.secondaryDominant.length);
  console.log('  - Double Dominant:', recommendations.doubleDominant.length);
  console.log('  - Modal Interchange:', recommendations.modalInterchange.length);
  console.log('  - Chord Substitution:', recommendations.chordSubstitution.length);
  
  const comprehensive = engine.getComprehensiveRecommendations(5);
  console.log('✅ Top 5 Comprehensive Recommendations:');
  comprehensive.forEach((rec, i) => {
    console.log(`  ${i+1}. ${rec.symbol} (${(rec.probability * 100).toFixed(0)}%) - ${rec.recommendationType}`);
  });
} catch (error) {
  console.error('❌ Test 7 Failed:', error.message);
}

console.log('\n🎼 Debug Complete!');