// Question analysis for more targeted readings

export interface QuestionAnalysis {
  type: 'yes_no' | 'should_i' | 'will_it' | 'what_should' | 'is_this' | 'open_ended'
  domain: 'relationship' | 'career' | 'health' | 'spiritual' | 'financial' | 'decision' | 'general'
  urgency: 'immediate' | 'near_future' | 'long_term' | 'unknown'
  sentiment: 'hopeful' | 'fearful' | 'neutral' | 'confused'
  wantsPermission: boolean
  wantsValidation: boolean
  wantsWarning: boolean
  keywords: string[]
}

const relationshipKeywords = [
  'relationship', 'partner', 'boyfriend', 'girlfriend', 'husband', 'wife', 
  'marry', 'marriage', 'dating', 'love', 'ex', 'crush', 'soulmate', 
  'twin flame', 'breakup', 'divorce', 'propose', 'engaged', 'together',
  'him', 'her', 'they', 'person', 'someone', 'family', 'friend'
]

const careerKeywords = [
  'job', 'career', 'work', 'promotion', 'boss', 'coworker', 'business',
  'company', 'interview', 'offer', 'salary', 'quit', 'resign', 'hired',
  'fired', 'startup', 'entrepreneur', 'client', 'project', 'profession'
]

const financialKeywords = [
  'money', 'invest', 'investment', 'buy', 'sell', 'house', 'car', 'stock',
  'savings', 'debt', 'loan', 'afford', 'rich', 'wealth', 'financial',
  'purchase', 'expensive', 'price', 'cost', 'pay'
]

const healthKeywords = [
  'health', 'sick', 'illness', 'doctor', 'medical', 'surgery', 'pregnant',
  'baby', 'fertility', 'diagnosis', 'treatment', 'heal', 'recovery',
  'mental health', 'therapy', 'anxiety', 'depression', 'addiction'
]

const spiritualKeywords = [
  'purpose', 'meaning', 'spiritual', 'soul', 'karma', 'past life', 'destiny',
  'fate', 'meant to be', 'sign', 'universe', 'god', 'divine', 'prayer',
  'meditation', 'awakening', 'path', 'journey', 'calling'
]

export function analyzeQuestion(question: string): QuestionAnalysis {
  const q = question.toLowerCase()
  
  // Determine question type
  let type: QuestionAnalysis['type'] = 'open_ended'
  if (q.startsWith('should i') || q.startsWith('shall i')) {
    type = 'should_i'
  } else if (q.startsWith('will') || q.startsWith('is it going to')) {
    type = 'will_it'
  } else if (q.startsWith('is this') || q.startsWith('is he') || q.startsWith('is she') || q.startsWith('is it') || q.startsWith('am i')) {
    type = 'is_this'
  } else if (q.startsWith('what should') || q.startsWith('what do i')) {
    type = 'what_should'
  } else if (q.includes('?') && (q.includes('should') || q.includes('will') || q.includes('is it') || q.includes('can i'))) {
    type = 'yes_no'
  }
  
  // Determine domain
  let domain: QuestionAnalysis['domain'] = 'general'
  const domainScores = {
    relationship: 0,
    career: 0,
    financial: 0,
    health: 0,
    spiritual: 0
  }
  
  for (const keyword of relationshipKeywords) {
    if (q.includes(keyword)) domainScores.relationship += 1
  }
  for (const keyword of careerKeywords) {
    if (q.includes(keyword)) domainScores.career += 1
  }
  for (const keyword of financialKeywords) {
    if (q.includes(keyword)) domainScores.financial += 1
  }
  for (const keyword of healthKeywords) {
    if (q.includes(keyword)) domainScores.health += 1
  }
  for (const keyword of spiritualKeywords) {
    if (q.includes(keyword)) domainScores.spiritual += 1
  }
  
  const maxScore = Math.max(...Object.values(domainScores))
  if (maxScore > 0) {
    if (domainScores.relationship === maxScore) domain = 'relationship'
    else if (domainScores.career === maxScore) domain = 'career'
    else if (domainScores.financial === maxScore) domain = 'financial'
    else if (domainScores.health === maxScore) domain = 'health'
    else if (domainScores.spiritual === maxScore) domain = 'spiritual'
  }
  
  // If it's a should_i type, it's a decision
  if (type === 'should_i' && domain === 'general') {
    domain = 'decision'
  }
  
  // Determine urgency
  let urgency: QuestionAnalysis['urgency'] = 'unknown'
  if (q.includes('today') || q.includes('tonight') || q.includes('now') || q.includes('immediately') || q.includes('soon')) {
    urgency = 'immediate'
  } else if (q.includes('this week') || q.includes('this month') || q.includes('next') || q.includes('upcoming')) {
    urgency = 'near_future'
  } else if (q.includes('ever') || q.includes('future') || q.includes('eventually') || q.includes('someday') || q.includes('one day')) {
    urgency = 'long_term'
  }
  
  // Determine sentiment
  let sentiment: QuestionAnalysis['sentiment'] = 'neutral'
  const hopefulWords = ['hope', 'wish', 'want', 'dream', 'love', 'excited', 'happy', 'positive']
  const fearfulWords = ['afraid', 'scared', 'worried', 'anxious', 'fear', 'nervous', 'concern', 'bad', 'wrong', 'mistake']
  const confusedWords = ['confused', 'unsure', 'don\'t know', 'uncertain', 'lost', 'torn', 'conflicted']
  
  let hopefulScore = 0
  let fearfulScore = 0
  let confusedScore = 0
  
  for (const word of hopefulWords) {
    if (q.includes(word)) hopefulScore++
  }
  for (const word of fearfulWords) {
    if (q.includes(word)) fearfulScore++
  }
  for (const word of confusedWords) {
    if (q.includes(word)) confusedScore++
  }
  
  if (hopefulScore > fearfulScore && hopefulScore > confusedScore) {
    sentiment = 'hopeful'
  } else if (fearfulScore > hopefulScore && fearfulScore > confusedScore) {
    sentiment = 'fearful'
  } else if (confusedScore > 0) {
    sentiment = 'confused'
  }
  
  // Determine psychological needs
  const wantsPermission = type === 'should_i' || q.includes('okay') || q.includes('alright') || q.includes('allowed') || q.includes('can i')
  const wantsValidation = q.includes('right') || q.includes('correct') || q.includes('good idea') || q.includes('made the right') || type === 'is_this'
  const wantsWarning = q.includes('mistake') || q.includes('wrong') || q.includes('bad') || q.includes('regret') || q.includes('careful')
  
  // Extract keywords for personalization
  const keywords: string[] = []
  const words = q.split(/\s+/)
  for (const word of words) {
    if (word.length > 4 && !['should', 'would', 'could', 'about', 'think', 'going', 'really', 'truly'].includes(word)) {
      keywords.push(word)
    }
  }
  
  return {
    type,
    domain,
    urgency,
    sentiment,
    wantsPermission,
    wantsValidation,
    wantsWarning,
    keywords
  }
}

// Generate guidance for the AI based on question analysis
export function getQuestionGuidance(analysis: QuestionAnalysis): string {
  let guidance = ''
  
  // Type-based guidance
  switch (analysis.type) {
    case 'should_i':
      guidance += 'This person is seeking PERMISSION. They likely already know what they want to do and are looking for cosmic validation. If the signs support it, give them that permission clearly. If not, help them understand why the universe is urging caution.\n\n'
      break
    case 'yes_no':
      guidance += 'This is a direct yes/no question. They want CLARITY, not ambiguity. Commit to a direction based on the signs. Even "wait" is better than wishy-washy non-answers.\n\n'
      break
    case 'will_it':
      guidance += 'This person wants to know about OUTCOMES. They\'re trying to see the future. Be honest that signs show tendencies, not certainties—but still give them a confident read on the direction the energy is flowing.\n\n'
      break
    case 'is_this':
      guidance += 'This person wants VALIDATION or REALITY CHECK. They\'re questioning something—possibly a relationship or situation. Help them see clearly what the signs reveal about the truth of their situation.\n\n'
      break
    case 'what_should':
      guidance += 'This person wants GUIDANCE, not just a yes/no. They need direction. Use the signs to paint a path forward, not just confirm or deny.\n\n'
      break
  }
  
  // Domain-based guidance
  switch (analysis.domain) {
    case 'relationship':
      guidance += 'RELATIONSHIP READING: Weight emotional and interpersonal signs heavily (body sensations, dreams about people, unexpected encounters). Look for signs about connection, communication, and heart-centered symbols.\n\n'
      break
    case 'career':
      guidance += 'CAREER READING: Weight timing signs (numbers, clocks), door/path imagery, and signs about direction and movement. Professional decisions often hinge on timing and alignment.\n\n'
      break
    case 'financial':
      guidance += 'FINANCIAL READING: Look for abundance signs (888, found money, gifts). Also pay attention to warning signs (things breaking, loss). Financial questions need both opportunity and caution assessment.\n\n'
      break
    case 'health':
      guidance += 'HEALTH READING: Body sensation signs are especially important. Also note any signs of transformation (butterflies, snakes) which can indicate healing. Be sensitive—do not make medical claims, but speak to the energy.\n\n'
      break
    case 'spiritual':
      guidance += 'SPIRITUAL READING: All signs carry weight here. Look for patterns, synchronicities, and repetition. The person is seeking meaning and connection to something larger.\n\n'
      break
  }
  
  // Sentiment-based guidance
  if (analysis.sentiment === 'fearful') {
    guidance += 'NOTE: This person is approaching from FEAR. Be gentle but honest. If signs are positive, help them release fear. If signs warrant caution, frame it as protective guidance, not confirmation of their worst fears.\n\n'
  } else if (analysis.sentiment === 'hopeful') {
    guidance += 'NOTE: This person is approaching from HOPE. Honor their optimism if signs support it. If signs suggest caution, be kind but clear—don\'t let them walk into something blindly.\n\n'
  } else if (analysis.sentiment === 'confused') {
    guidance += 'NOTE: This person is CONFUSED. They need clarity more than anything. Cut through the fog. Even if the answer is complex, present it with clarity and structure.\n\n'
  }
  
  // Psychological needs
  if (analysis.wantsPermission) {
    guidance += 'PSYCHOLOGICAL NOTE: They want permission. If you can give it based on signs, give it clearly: "The universe is giving you permission to..." If you cannot, explain why gently.\n\n'
  }
  if (analysis.wantsValidation) {
    guidance += 'PSYCHOLOGICAL NOTE: They want validation. If signs validate their choice/feeling, say so explicitly. If not, help them see what they might be missing.\n\n'
  }
  if (analysis.wantsWarning) {
    guidance += 'PSYCHOLOGICAL NOTE: They\'re already worried something is wrong. If signs confirm concerns, validate their intuition. If signs are positive, help them release the worry.\n\n'
  }
  
  return guidance
}