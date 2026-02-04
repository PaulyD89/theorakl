// Proprietary sign combination interpretations
// When certain signs appear together, they create amplified or specific meanings

export interface SignCombination {
  signs: string[] // Signs that trigger this combination (partial match)
  name: string
  meaning: string
  verdict_lean: 'yes' | 'no' | 'wait' | 'neutral'
  power_level: 1 | 2 | 3 | 4 | 5 // How significant this combination is
}

export const signCombinations: SignCombination[] = [
  // === POWERFUL YES COMBINATIONS ===
  {
    signs: ['111', 'butterfly'],
    name: 'The Manifestation Portal',
    meaning: 'New beginnings and transformation are merging. You are at a rare cosmic intersection where what you want to create and who you want to become are aligning. This is one of the most powerful yes combinations possible. The universe is not just saying yes—it is saying "yes, and here is the door."',
    verdict_lean: 'yes',
    power_level: 5
  },
  {
    signs: ['777', 'gut feeling'],
    name: 'The Lucky Knowing',
    meaning: 'Your intuition has connected to universal luck. When spiritual luck (777) meets bodily knowing, you have accessed a rare channel of certainty. You don\'t just feel this is right—the cosmos confirms it. Trust completely.',
    verdict_lean: 'yes',
    power_level: 5
  },
  {
    signs: ['repeated numbers', 'chills', 'goosebumps'],
    name: 'The Truth Confirmation',
    meaning: 'The universe is sending numerical confirmation while your body validates with truth bumps. This double confirmation—mental (numbers) and physical (chills)—is unmistakable. What you were thinking when this happened IS the answer.',
    verdict_lean: 'yes',
    power_level: 5
  },
  {
    signs: ['rainbow', 'sun broke through'],
    name: 'The Divine Promise',
    meaning: 'Two of nature\'s most positive signs appearing together is extraordinarily rare and powerful. The universe is making you a promise: after the storm (whatever you\'ve been through), not just light but BEAUTY awaits. This is a sacred yes.',
    verdict_lean: 'yes',
    power_level: 5
  },
  {
    signs: ['feather', '444'],
    name: 'The Angelic Confirmation',
    meaning: 'Angels are not just present—they are actively communicating. The feather is their calling card; 444 is their number. You are being watched over with unusual intensity. Whatever you asked, your angels approve and are helping.',
    verdict_lean: 'yes',
    power_level: 5
  },

  // === STRONG YES COMBINATIONS ===
  {
    signs: ['meaningful song', 'thinking of someone'],
    name: 'The Soul Call',
    meaning: 'When a meaningful song plays while you\'re thinking of someone, the universe is confirming a soul connection. This person is significant to your path. If your question involves them, the answer leans strongly yes.',
    verdict_lean: 'yes',
    power_level: 4
  },
  {
    signs: ['stranger said something', 'gut feeling'],
    name: 'The Messenger Moment',
    meaning: 'When a stranger delivers words that hit you AND your gut confirms it, you have received a direct message. The universe used a human mouthpiece and your body as the verification system. The message is for you. Act on it.',
    verdict_lean: 'yes',
    power_level: 4
  },
  {
    signs: ['ran into someone', 'déjà vu'],
    name: 'The Fated Encounter',
    meaning: 'Running into someone while experiencing déjà vu indicates a planned soul intersection. This meeting was scheduled before you were born. This person has a role in your story—possibly a major one. Pay attention.',
    verdict_lean: 'yes',
    power_level: 4
  },
  {
    signs: ['vivid dream', 'the person appeared'],
    name: 'The Dream Visitation',
    meaning: 'When you dream vividly of someone and then they appear (or contact you), the veil between dreaming and waking is thin for you right now. Your psychic channel is open. Trust what comes through it.',
    verdict_lean: 'yes',
    power_level: 4
  },

  // === WARNING COMBINATIONS ===
  {
    signs: ['something broke', 'gut feeling'],
    name: 'The Breaking Point Warning',
    meaning: 'When something breaks and your gut tightens, the universe is showing you a preview. Something in your current situation is fragile and your body knows it. This is a warning to address what\'s breaking BEFORE it shatters.',
    verdict_lean: 'no',
    power_level: 4
  },
  {
    signs: ['left ear ringing', 'lost something'],
    name: 'The Past Warning',
    meaning: 'Left ear (past) combined with loss suggests something from your history is relevant and needs attention. An old pattern may be repeating. A past lesson not learned is resurfacing. Look backward to move forward.',
    verdict_lean: 'wait',
    power_level: 4
  },
  {
    signs: ['nightmare', 'something broke'],
    name: 'The Urgent Warning',
    meaning: 'Your subconscious (nightmare) and your environment (breaking) are both sending warnings. This is not subtle—the universe is being loud. Whatever path you\'re considering, stop and reassess. This is a strong no or wait.',
    verdict_lean: 'no',
    power_level: 5
  },
  {
    signs: ['999', 'lost something'],
    name: 'The Ending Confirmation',
    meaning: 'The universe is confirming that something must end. The loss is not punishment—it is clearing space. If your question is about holding on to something, the answer is: let go. The completion is non-negotiable.',
    verdict_lean: 'no',
    power_level: 4
  },

  // === TRANSFORMATION COMBINATIONS ===
  {
    signs: ['butterfly', '555'],
    name: 'The Metamorphosis Mandate',
    meaning: 'Two powerful transformation symbols together indicate you are not just changing—you are metamorphosing into something unrecognizable from your current form. This change is happening whether you participate willingly or not. Surrender to it.',
    verdict_lean: 'yes',
    power_level: 5
  },
  {
    signs: ['snake', 'dream about death'],
    name: 'The Rebirth Sequence',
    meaning: 'Snake medicine and death dreams together signal a profound shedding. An old version of you is dying so a new version can live. This is uncomfortable but sacred. The answer to your question requires you to become someone new first.',
    verdict_lean: 'wait',
    power_level: 4
  },
  {
    signs: ['eclipse', 'unexpected encounter'],
    name: 'The Destined Crossing',
    meaning: 'Eclipses are fate accelerators. An unexpected encounter during eclipse season is not random—it\'s destiny fast-tracking. This person or situation has entered your life on cosmic schedule.',
    verdict_lean: 'yes',
    power_level: 4
  },

  // === SPIRITUAL COMMUNICATION COMBINATIONS ===
  {
    signs: ['feather', 'familiar scent', 'smell'],
    name: 'The Spirit Visit',
    meaning: 'Feathers and familiar scents together are classic signs of visitation from deceased loved ones. Someone who has passed is making their presence known. They may be answering your question or simply offering comfort and support.',
    verdict_lean: 'yes',
    power_level: 5
  },
  {
    signs: ['electronics glitch', 'lights flicker', 'thinking of deceased'],
    name: 'The Technical Hello',
    meaning: 'Electrical disturbances while thinking of someone who passed are one of the most common and validated forms of after-death communication. They are saying: "I\'m here, I hear you, I love you." If your question involves them, they approve.',
    verdict_lean: 'yes',
    power_level: 5
  },
  {
    signs: ['3am', '4am', 'woke up'],
    name: 'The Witching Hour Download',
    meaning: 'Waking between 3-4am is significant in every spiritual tradition. The veil is thinnest. Your spirit received information that your conscious mind is now processing. What were your first thoughts upon waking? That\'s the message.',
    verdict_lean: 'wait',
    power_level: 3
  },
  {
    signs: ['cardinal', 'deceased', 'loved one'],
    name: 'The Cardinal Messenger',
    meaning: 'Cardinals appearing when you\'re thinking of deceased loved ones is one of the most widely reported forms of spirit communication. "When cardinals appear, loved ones are near." They are watching over you and your question.',
    verdict_lean: 'yes',
    power_level: 5
  },

  // === TIMING COMBINATIONS ===
  {
    signs: ['222', 'delay', 'wait'],
    name: 'The Divine Pause',
    meaning: 'When 222 (divine timing) appears alongside delays, the universe is being explicit: THIS IS NOT YOUR TIMING. The delay is protection or preparation. Fighting it will only exhaust you. Trust and wait.',
    verdict_lean: 'wait',
    power_level: 4
  },
  {
    signs: ['door', 'clock', 'meaningful time'],
    name: 'The Timed Threshold',
    meaning: 'Doors and clocks together suggest a window of opportunity with an expiration. The universe is showing you that timing matters for what you\'re asking. There may be an optimal moment to act—watch for it.',
    verdict_lean: 'yes',
    power_level: 3
  },

  // === RELATIONSHIP COMBINATIONS ===
  {
    signs: ['thinking of someone', 'they called', 'they texted'],
    name: 'The Telepathic Bond',
    meaning: 'Thinking of someone and having them contact you is telepathic connection. Your energies are linked. If your question is about this person, know that you are already communicating beyond words. The connection is real.',
    verdict_lean: 'yes',
    power_level: 4
  },
  {
    signs: ['heart', 'bird', 'pair'],
    name: 'The Love Omen',
    meaning: 'Heart symbols and paired/bird imagery together speak of love and partnership. If your question is about romance, the universe is affirming love is present or coming. Open your heart.',
    verdict_lean: 'yes',
    power_level: 3
  },
  {
    signs: ['ex', 'dream', 'closure'],
    name: 'The Unfinished Chapter',
    meaning: 'Dreams or signs involving exes suggest unfinished energetic business. This doesn\'t necessarily mean reunion—it may mean closure is needed. Your soul is still processing this connection. Complete it.',
    verdict_lean: 'wait',
    power_level: 3
  },

  // === ABUNDANCE COMBINATIONS ===
  {
    signs: ['888', 'found money', 'coin', 'penny'],
    name: 'The Abundance Activation',
    meaning: 'When the abundance number (888) meets physical money finding, financial flow is opening. The universe is showing you that you are a money magnet right now. Expect unexpected financial blessing.',
    verdict_lean: 'yes',
    power_level: 4
  },
  {
    signs: ['four leaf clover', '777'],
    name: 'The Luck Supernova',
    meaning: 'Two of the most powerful luck symbols together create a luck supernova. This is extraordinarily rare. Whatever you\'re asking about—if you have the courage to try—is blessed by unusual fortune. Take the chance.',
    verdict_lean: 'yes',
    power_level: 5
  },

  // === CAUTION COMBINATIONS ===
  {
    signs: ['gut feeling', 'no', 'don\'t'],
    name: 'The Body Veto',
    meaning: 'When your gut says no, that IS the answer. The body doesn\'t lie or rationalize. It knows threat, wrong turns, and bad fits. If your gut is contracting, the answer is no, regardless of logic.',
    verdict_lean: 'no',
    power_level: 5
  },
  {
    signs: ['three', 'same', 'repeated', 'three times'],
    name: 'The Rule of Three',
    meaning: 'When the same sign appears three times, it transforms from notice to necessity. The universe doesn\'t repeat itself for fun. Three is the number of manifestation and confirmation. This sign is your answer—don\'t wait for a fourth.',
    verdict_lean: 'yes',
    power_level: 4
  }
]

// Find all matching combinations for a set of signs
export function findMatchingCombinations(signs: string[]): SignCombination[] {
  const signsLower = signs.map(s => s.toLowerCase())
  const matches: SignCombination[] = []
  
  for (const combo of signCombinations) {
    // Check if all required signs in the combination are present (partial match)
    const comboMatches = combo.signs.every(comboSign => 
      signsLower.some(userSign => userSign.includes(comboSign.toLowerCase()))
    )
    
    if (comboMatches) {
      matches.push(combo)
    }
  }
  
  // Sort by power level descending
  return matches.sort((a, b) => b.power_level - a.power_level)
}

// Get the overall lean based on combinations
export function getCombinationLean(combinations: SignCombination[]): { lean: string; confidence: number } {
  if (combinations.length === 0) {
    return { lean: 'neutral', confidence: 0 }
  }
  
  let yesScore = 0
  let noScore = 0
  let waitScore = 0
  
  for (const combo of combinations) {
    const weight = combo.power_level
    if (combo.verdict_lean === 'yes') yesScore += weight
    if (combo.verdict_lean === 'no') noScore += weight
    if (combo.verdict_lean === 'wait') waitScore += weight
  }
  
  const total = yesScore + noScore + waitScore
  const maxScore = Math.max(yesScore, noScore, waitScore)
  
  let lean = 'neutral'
  if (maxScore === yesScore) lean = 'yes'
  else if (maxScore === noScore) lean = 'no'
  else if (maxScore === waitScore) lean = 'wait'
  
  return {
    lean,
    confidence: Math.round((maxScore / total) * 100)
  }
}