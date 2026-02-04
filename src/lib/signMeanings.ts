// Proprietary sign interpretation database for Theorakl
// Each sign has layered meanings based on context

export interface SignMeaning {
  core: string
  yesEnergy: string
  noEnergy: string
  waitEnergy: string
  emotionalContext: string
  careerContext: string
  relationshipContext: string
  spiritualContext: string
  warnings: string[]
  amplifiers: string[] // Signs that strengthen this one
  contradictors: string[] // Signs that create tension with this one
}

export const signMeanings: Record<string, SignMeaning> = {
  // === NUMBERS ===
  "Repeated numbers (111, 222, 333...)": {
    core: "The universe is sending a direct transmission. This is not random—you are being called to attention.",
    yesEnergy: "Triple numbers are cosmic green lights. The universe is amplifying its YES.",
    noEnergy: "When repeated numbers appear with hesitation in your heart, they're asking you to pause and look deeper.",
    waitEnergy: "The repetition suggests the answer is forming but not yet complete. More signs will come.",
    emotionalContext: "Your emotions are aligned with universal truth right now. Trust what you feel.",
    careerContext: "You're in a flow state professionally. Doors are opening in sequence.",
    relationshipContext: "This connection has karmic significance. Pay attention to the specific numbers.",
    spiritualContext: "Your spiritual guides are actively communicating. You're more connected than usual.",
    warnings: ["Don't force meaning onto every number you see", "The message is about alignment, not specific predictions"],
    amplifiers: ["Strong gut feeling", "Déjà vu", "Meaningful song came on"],
    contradictors: ["Something broke", "Lost something", "Sudden emotion out of nowhere"]
  },

  "Saw my lucky number": {
    core: "A personal wink from the universe. This is your sign specifically—not a generic message.",
    yesEnergy: "Your lucky number appearing is the universe using YOUR language to say yes.",
    noEnergy: "Even lucky numbers can be warnings. Context matters—where did you see it?",
    waitEnergy: "Your number is reminding you that luck favors patience.",
    emotionalContext: "You're being reminded of who you are at your core. Return to your center.",
    careerContext: "A personal opportunity is coming—one that fits YOU specifically.",
    relationshipContext: "This person may be more significant to your life path than you realize.",
    spiritualContext: "You and the universe have a private language. This is intimate communication.",
    warnings: ["Don't share this sign's meaning with others—it's yours alone"],
    amplifiers: ["Found something meaningful", "Right timing", "Stranger said something that hit me"],
    contradictors: ["Nightmare or disturbing dream", "Ringing in left ear"]
  },

  "A specific number kept appearing": {
    core: "Persistence from the universe. When a number stalks you, it carries an urgent message.",
    yesEnergy: "The universe doesn't repeat itself without reason. This persistence is confirmation.",
    noEnergy: "A number appearing obsessively can be a warning to stop and reconsider your path.",
    waitEnergy: "The number is counting down—or up—to something. Timing is key.",
    emotionalContext: "Your subconscious is trying to surface something. What does this number mean to you personally?",
    careerContext: "This number may relate to timing—days, weeks, months until a shift.",
    relationshipContext: "Count the ways this number connects to the person in question.",
    spiritualContext: "Numerology is speaking. Research this specific number's meaning.",
    warnings: ["Write down where and when you see it—the pattern matters"],
    amplifiers: ["Clock at meaningful time", "Transaction total was meaningful number"],
    contradictors: ["Confusion", "Conflicting advice from others"]
  },

  // === ANGEL NUMBERS (Premium) ===
  "111 — New beginnings, manifestation": {
    core: "The universe has opened a portal. Your thoughts are manifesting rapidly—be careful what you focus on.",
    yesEnergy: "111 is the ultimate green light for new starts. Begin NOW.",
    noEnergy: "If you see 111 and feel dread, the 'new beginning' may be an ending you need to accept.",
    waitEnergy: "The portal is open but you must be ready. Prepare yourself.",
    emotionalContext: "Your emotional state is especially powerful right now. Positive thoughts only.",
    careerContext: "A new chapter professionally. Job changes, promotions, or pivots are blessed.",
    relationshipContext: "New relationship energy—or a relationship about to transform into something new.",
    spiritualContext: "You are in a manifestation window. Your spiritual power is amplified.",
    warnings: ["Negative thoughts manifest just as quickly as positive ones right now"],
    amplifiers: ["Butterfly appeared", "Sun broke through clouds", "Door was open"],
    contradictors: ["Something broke", "Lost something", "Door was closed"]
  },

  "222 — Balance, trust, divine timing": {
    core: "Everything is unfolding exactly as it should. Your job is to trust, not push.",
    yesEnergy: "222 says yes, but in its own time. Don't force—allow.",
    noEnergy: "If 222 appears with frustration, the universe is asking you to release control.",
    waitEnergy: "This IS the wait sign. Divine timing is not your timing. Patience.",
    emotionalContext: "Find your center. Balance is needed between heart and mind.",
    careerContext: "Partnerships and collaborations are favored. Don't go it alone.",
    relationshipContext: "This relationship requires balance. Are you giving and receiving equally?",
    spiritualContext: "You are being asked to trust without seeing the full picture.",
    warnings: ["Impatience will delay what you want", "Control is an illusion right now"],
    amplifiers: ["Déjà vu", "Peaceful feeling", "Rainbow appeared"],
    contradictors: ["Anxiety", "Rushing", "Forcing outcomes"]
  },

  "333 — Spiritual support, creativity": {
    core: "The ascended masters and spiritual guides are surrounding you. You are not alone.",
    yesEnergy: "333 is a powerful yes backed by spiritual forces beyond your understanding.",
    noEnergy: "Rarely a no—but may indicate you're being guided away from something for your highest good.",
    waitEnergy: "Your guides are working behind the scenes. Let them.",
    emotionalContext: "Creative expression is your healing right now. Make something.",
    careerContext: "Creative projects are blessed. Trust your artistic instincts.",
    relationshipContext: "This connection has spiritual depth. It may be karmic or past-life related.",
    spiritualContext: "You are being divinely guided. Pay attention to thoughts that feel 'downloaded.'",
    warnings: ["Don't ignore intuitive hits—they're coming from higher sources"],
    amplifiers: ["Felt a presence nearby", "Dream with spiritual significance", "Chills or goosebumps"],
    contradictors: ["Feeling alone", "Disconnected from spirituality"]
  },

  "444 — Angels are near, protection": {
    core: "You are protected. Angels are literally surrounding you at this moment.",
    yesEnergy: "444 is a resounding yes with angelic backing. Proceed with confidence.",
    noEnergy: "Even as a no, 444 promises protection. You're being steered away from harm.",
    waitEnergy: "Protection is in place while you wait. Nothing bad will happen in this pause.",
    emotionalContext: "You are safe to feel whatever you're feeling. You're held.",
    careerContext: "Your career is protected. Even setbacks are setups.",
    relationshipContext: "This relationship is being watched over. Angels approve.",
    spiritualContext: "Your angels are unusually close. Talk to them—they're listening.",
    warnings: ["Don't mistake protection for passivity—you still must act"],
    amplifiers: ["Found a feather", "Felt sudden warmth", "White animal sighting"],
    contradictors: ["Fear", "Feeling unsafe", "Paranoia"]
  },

  "555 — Major change coming": {
    core: "Buckle up. Significant transformation is imminent—ready or not.",
    yesEnergy: "555 says yes to change. Embrace the upheaval—it leads somewhere better.",
    noEnergy: "The change coming may be a no to your current situation. Let it go.",
    waitEnergy: "Change is coming whether you wait or not. Prepare rather than pause.",
    emotionalContext: "Emotional turbulence is normal during 555 periods. Ride the wave.",
    careerContext: "Career upheaval likely. Layoffs, pivots, or unexpected opportunities.",
    relationshipContext: "This relationship is about to shift dramatically. For better or worse.",
    spiritualContext: "You are shedding an old version of yourself. Death and rebirth.",
    warnings: ["Resistance will make this harder", "Change is not optional right now"],
    amplifiers: ["Dream about death or rebirth", "Snake crossed path", "Something broke"],
    contradictors: ["Clinging to old ways", "Refusing to adapt"]
  },

  "777 — Spiritual awakening, luck": {
    core: "You have hit a spiritual jackpot. Luck and enlightenment are converging.",
    yesEnergy: "777 is the universe's most enthusiastic yes. This is blessed beyond measure.",
    noEnergy: "Almost never a no. If it feels like no, you're misreading the situation.",
    waitEnergy: "Luck is building. The longer you wait, the bigger the payoff.",
    emotionalContext: "Joy and spiritual ecstasy are available to you. Let yourself feel good.",
    careerContext: "Professional luck is peaking. Take the risk. Buy the ticket.",
    relationshipContext: "This is a spiritually significant connection. Possibly a soulmate.",
    spiritualContext: "You are awakening to higher truths. Downloads are coming.",
    warnings: ["Don't waste this window on trivial matters"],
    amplifiers: ["Shooting star", "Winning something", "Perfect timing"],
    contradictors: ["Pessimism", "Self-doubt", "Ignoring opportunities"]
  },

  "888 — Abundance flowing to you": {
    core: "The floodgates of abundance are opening. Receive without guilt.",
    yesEnergy: "888 is a yes to prosperity in all forms—money, love, health, opportunity.",
    noEnergy: "May indicate that what you're asking about isn't the true source of abundance.",
    waitEnergy: "Abundance is en route. It's already left the warehouse.",
    emotionalContext: "Emotional abundance—love, joy, connection—is coming.",
    careerContext: "Financial increase likely. Raises, bonuses, new income streams.",
    relationshipContext: "Abundance in love. Either this relationship deepens or a better one comes.",
    spiritualContext: "You are entering a harvest phase. Seeds planted long ago are fruiting.",
    warnings: ["Receiving is a skill—don't block blessings with unworthiness"],
    amplifiers: ["Found money", "Unexpected gift", "Opportunity appeared"],
    contradictors: ["Scarcity thinking", "Refusing help", "Guilt about receiving"]
  },

  "999 — Completion, chapter ending": {
    core: "Something is complete. Honor the ending before rushing to the new beginning.",
    yesEnergy: "999 says yes to closure. End it properly so the new can begin.",
    noEnergy: "This chapter is over. Continuing is not an option.",
    waitEnergy: "Wait for the completion to fully settle before starting anew.",
    emotionalContext: "Grief for endings is appropriate. Don't skip the mourning.",
    careerContext: "A job, project, or career phase is ending. It's time.",
    relationshipContext: "This relationship has served its purpose. That purpose may be complete.",
    spiritualContext: "A soul contract is fulfilling. You're graduating to a new level.",
    warnings: ["Don't cling", "Endings are sacred too"],
    amplifiers: ["Dream about death", "Lost something", "Saying goodbye"],
    contradictors: ["Refusing to let go", "Denial", "Bargaining"]
  },

  "1111 — Portal opening, make a wish": {
    core: "The most powerful angel number. A direct line to the divine is open. Wish carefully.",
    yesEnergy: "1111 is the ultimate cosmic yes. The universe is saying 'whatever you want.'",
    noEnergy: "If 1111 brings unease, your wish may not align with your highest good.",
    waitEnergy: "The portal is open NOW. Don't wait—make your intention.",
    emotionalContext: "What you feel right now is prophetic. Pay attention.",
    careerContext: "Career wishes are especially potent. Dream big.",
    relationshipContext: "Relationship manifestation is powerful. Be specific about what you want.",
    spiritualContext: "You are in direct communication with source energy. Speak your truth.",
    warnings: ["Be careful what you wish for—you will get it", "Clarity of intention matters"],
    amplifiers: ["Strong gut feeling", "Déjà vu", "Everything aligning"],
    contradictors: ["Confusion about what you want", "Mixed intentions"]
  },

  // === ANIMALS ===
  "Bird crossed my path": {
    core: "A messenger has arrived. Birds carry communications between realms.",
    yesEnergy: "Birds flying toward you or crossing left-to-right typically signal yes.",
    noEnergy: "Birds flying away or right-to-left may signal reconsideration needed.",
    waitEnergy: "A hovering or circling bird suggests waiting for more information.",
    emotionalContext: "Freedom is calling. What cage have you built for yourself?",
    careerContext: "Rise above the current situation to see the bigger picture.",
    relationshipContext: "This connection wants to be free. Don't cage it.",
    spiritualContext: "Messages from spirit guides often come through birds.",
    warnings: ["Note the type of bird—each species has different meaning"],
    amplifiers: ["Feather found", "Bird song at meaningful moment"],
    contradictors: ["Dead bird", "Aggressive bird"]
  },

  "Butterfly appeared": {
    core: "Transformation is not coming—it's already happening. You are in the cocoon.",
    yesEnergy: "Butterflies are almost always yes. Transformation leads somewhere beautiful.",
    noEnergy: "Rarely no, but may indicate the transformation required is more than you're ready for.",
    waitEnergy: "Transformation takes time. The butterfly doesn't rush its emergence.",
    emotionalContext: "You are more beautiful than your current form. Trust the process.",
    careerContext: "A career metamorphosis is underway. Old identity is dissolving.",
    relationshipContext: "This relationship is transforming you. Are you willing to become someone new?",
    spiritualContext: "The soul is evolving. This is a significant spiritual passage.",
    warnings: ["Transformation is not comfortable", "You cannot go back to the caterpillar"],
    amplifiers: ["Rainbow appeared", "555 angel number", "Dream about flying"],
    contradictors: ["Resistance to change", "Clinging to old identity"]
  },

  "Unexpected animal encounter": {
    core: "An animal spirit guide has appeared. This is not random—look up its meaning.",
    yesEnergy: "Friendly or calm animal behavior typically signals yes and blessing.",
    noEnergy: "Aggressive, fleeing, or dead animals may signal warning or no.",
    waitEnergy: "An animal watching you silently suggests patience and observation.",
    emotionalContext: "What quality does this animal embody? You need that quality now.",
    careerContext: "The animal's traits may indicate what's needed professionally.",
    relationshipContext: "Consider what this animal symbolizes about the relationship.",
    spiritualContext: "Animal totems are powerful guides. This one chose to reveal itself to you.",
    warnings: ["Research this specific animal's spiritual meaning"],
    amplifiers: ["The animal made eye contact", "Appeared three or more times"],
    contradictors: ["Fear of the animal", "The animal was suffering"]
  },

  // === SOUNDS ===
  "Ringing in my left ear": {
    core: "A warning or message about the past. The left side receives external energy.",
    yesEnergy: "High-pitched left ear ringing can be angelic confirmation.",
    noEnergy: "Low, ominous ringing on the left often signals caution.",
    waitEnergy: "Persistent left ear ringing suggests unfinished business from the past.",
    emotionalContext: "Someone may be talking about you—or thinking of you intensely.",
    careerContext: "Past professional connections may be relevant to your current question.",
    relationshipContext: "An ex or past connection is energetically present. Closure may be needed.",
    spiritualContext: "The left ear receives messages from the spiritual realm.",
    warnings: ["Also check for medical causes", "Note the pitch—high vs low matters"],
    amplifiers: ["Thinking of specific person", "Memory surfacing"],
    contradictors: ["Right ear ringing simultaneously"]
  },

  "Ringing in my right ear": {
    core: "Guidance about the future. The right side projects energy outward.",
    yesEnergy: "Clear, high-pitched right ear ringing is often a yes about future plans.",
    noEnergy: "Uncomfortable right ear ringing may warn against a future path.",
    waitEnergy: "Intermittent ringing suggests the future is still forming.",
    emotionalContext: "You are projecting energy into a situation. Is it the right energy?",
    careerContext: "Your future professional path is being highlighted.",
    relationshipContext: "The future of this relationship is being communicated.",
    spiritualContext: "Higher self or guides are commenting on your trajectory.",
    warnings: ["Your own energy affects the message", "Stay positive to receive positive guidance"],
    amplifiers: ["Clarity about a decision", "Sudden knowing"],
    contradictors: ["Confusion", "Anxiety about the future"]
  },

  "Meaningful song came on": {
    core: "The universe is using music to speak directly to your soul. Listen to the lyrics.",
    yesEnergy: "Uplifting or affirming lyrics are a clear yes from the universe.",
    noEnergy: "Sad or warning lyrics may be asking you to reconsider.",
    waitEnergy: "A song about patience, time, or waiting is clear guidance.",
    emotionalContext: "Music bypasses the mind and speaks to the heart. What did you FEEL?",
    careerContext: "The song's theme may apply to your work situation.",
    relationshipContext: "Love songs are obvious—but pay attention to the specific lyrics.",
    spiritualContext: "Deceased loved ones often communicate through 'their' songs.",
    warnings: ["Write down the lyrics that stood out", "The timing of the song matters as much as the song"],
    amplifiers: ["Song associated with specific person", "Song answered a thought you just had"],
    contradictors: ["You chose the song yourself", "It was on your playlist"]
  },

  "Heard my name called": {
    core: "You are being summoned by the spiritual realm. Something wants your attention.",
    yesEnergy: "A warm, familiar voice calling your name is protective spirits saying yes.",
    noEnergy: "An urgent or warning tone may be a no or a caution.",
    waitEnergy: "A questioning tone (your name as a question) suggests uncertainty.",
    emotionalContext: "You are not alone. Unseen forces know your name.",
    careerContext: "You are being called to something professionally. Pay attention.",
    relationshipContext: "Someone is thinking of you intensely—possibly calling out to you spiritually.",
    spiritualContext: "Hearing your name is a form of clairaudience. You have this gift.",
    warnings: ["Ground yourself after this experience", "Don't dismiss it as imagination"],
    amplifiers: ["Felt a presence", "Temperature change"],
    contradictors: ["Sleep deprivation", "High stress"]
  },

  // === BODY & FEELING ===
  "Strong gut feeling": {
    core: "Your body knows the answer. The gut brain is ancient and wise—trust it.",
    yesEnergy: "Gut expansion, warmth, or 'yes' feeling is the clearest possible yes.",
    noEnergy: "Gut contraction, nausea, or 'no' feeling should never be ignored.",
    waitEnergy: "A neutral gut—neither yes nor no—means more information is needed.",
    emotionalContext: "Your emotional body is wise. It has access to information your mind doesn't.",
    careerContext: "Gut feelings about jobs, people, or deals are highly accurate.",
    relationshipContext: "Your gut knows if this person is safe and right for you.",
    spiritualContext: "The gut is the seat of intuition. You are receiving direct guidance.",
    warnings: ["Never override a strong gut no", "Distinguish gut from fear"],
    amplifiers: ["Chills or goosebumps", "Immediate knowing"],
    contradictors: ["Mind talking you out of it", "Others' opinions"]
  },

  "Chills or goosebumps": {
    core: "Truth bumps. Your body is confirming that something is spiritually significant.",
    yesEnergy: "Chills during a thought or conversation are the universe saying YES, this is true.",
    noEnergy: "Cold, uncomfortable chills may be a warning—trust the quality of the sensation.",
    waitEnergy: "Intermittent chills suggest you're close to truth but not there yet.",
    emotionalContext: "Your body recognizes truth before your mind does.",
    careerContext: "Chills about an opportunity mean it's significant to your path.",
    relationshipContext: "Chills when meeting someone indicate a significant connection.",
    spiritualContext: "Spirit is moving through you. You are channeling.",
    warnings: ["Note WHEN the chills came—what were you thinking or hearing?"],
    amplifiers: ["Tears for no reason", "Hair standing up", "Sudden silence"],
    contradictors: ["Just cold", "Illness"]
  },

  "Déjà vu": {
    core: "A glitch in the matrix. You are on a path you've seen before—possibly in dreams or past lives.",
    yesEnergy: "Déjà vu confirms you're exactly where you're meant to be. Continue.",
    noEnergy: "Rarely a no—but uncomfortable déjà vu may indicate a loop you need to break.",
    waitEnergy: "You've been here before. What happened last time? Learn from it.",
    emotionalContext: "Your soul recognizes this moment. It's significant.",
    careerContext: "You may have dreamed of this situation. It was meant to happen.",
    relationshipContext: "Past life connection likely. This soul is familiar to you.",
    spiritualContext: "You're accessing your soul's memory. This moment was planned.",
    warnings: ["What comes next in the déjà vu? Pay attention."],
    amplifiers: ["Dream you forgot suddenly remembered", "Knowing what someone will say"],
    contradictors: ["Confusion", "Disorientation"]
  },

  "Sudden emotion out of nowhere": {
    core: "You are receiving emotional information—either from your own depth or from someone else.",
    yesEnergy: "Sudden joy, peace, or love is the universe confirming a yes.",
    noEnergy: "Sudden dread, sadness, or fear may be a warning about your path.",
    waitEnergy: "Sudden confusion suggests the situation is more complex than it appears.",
    emotionalContext: "You may be picking up someone else's emotions (empathy) or accessing your truth.",
    careerContext: "Unexpected work emotions are intuitive data. Don't dismiss them.",
    relationshipContext: "You may be feeling what the other person feels. Check in with them.",
    spiritualContext: "Emotions are spiritual messages. What is this feeling trying to tell you?",
    warnings: ["Distinguish between your emotions and absorbed emotions"],
    amplifiers: ["Crying for no reason", "Laughing for no reason"],
    contradictors: ["Hormone changes", "Lack of sleep"]
  },

  // === OBJECTS & ENVIRONMENT ===
  "Found something meaningful": {
    core: "The universe has placed a gift in your path. This object carries a message.",
    yesEnergy: "Finding something beautiful or valuable is a yes and a blessing.",
    noEnergy: "Finding something broken or disturbing may be a warning.",
    waitEnergy: "Finding a piece of something suggests the full picture isn't available yet.",
    emotionalContext: "What does this object mean to you personally? That's the message.",
    careerContext: "Found objects may symbolize resources coming your way.",
    relationshipContext: "Objects associated with love (hearts, pairs) speak to relationship.",
    spiritualContext: "Found feathers, coins, or natural objects are classic spirit signs.",
    warnings: ["The location where you found it matters"],
    amplifiers: ["Object relates to your question", "Found at a meaningful time"],
    contradictors: ["You were looking for it", "Common object with no significance"]
  },

  "Something broke": {
    core: "Energy has been released. Something needed to break for something new to emerge.",
    yesEnergy: "Breaking can be a yes—especially if what broke was limiting you.",
    noEnergy: "Significant breakage, especially of meaningful items, can be a warning.",
    waitEnergy: "A cracked but not shattered object suggests caution, not stopping.",
    emotionalContext: "What broke may represent what's breaking inside you—or needs to.",
    careerContext: "Old structures are falling away. This may feel like loss but creates space.",
    relationshipContext: "Breaking can symbolize the relationship's fragility or needed ending.",
    spiritualContext: "Breaking releases trapped energy. Something is being freed.",
    warnings: ["What broke? The specific object carries meaning.", "Three breaks in a row is a strong warning"],
    amplifiers: ["Broke during significant thought", "Broke at meaningful time"],
    contradictors: ["Old item that was due to break", "Accident with no significance"]
  },

  "Lights flickered": {
    core: "Electrical disruption often signals spiritual presence or energetic intensity.",
    yesEnergy: "Lights flickering during positive thoughts or conversations is confirmation.",
    noEnergy: "Lights going fully out may be a warning or strong spiritual presence requiring attention.",
    waitEnergy: "Intermittent flickering suggests the situation is energetically unstable.",
    emotionalContext: "Your emotional energy may be affecting electronics. You're powerful right now.",
    careerContext: "Workplace flickering may signal instability or coming changes.",
    relationshipContext: "Flickering during conversations about a person indicates spiritual significance.",
    spiritualContext: "Deceased loved ones often communicate through electrical disturbances.",
    warnings: ["Also check for practical electrical issues", "Note what you were thinking when it happened"],
    amplifiers: ["Multiple electronics affected", "Happened at 11:11 or similar time"],
    contradictors: ["Known electrical problems", "Storm or power issues in area"]
  },

  // === PEOPLE ===
  "Ran into someone unexpected": {
    core: "There are no coincidences. This person carries a message or role in your current chapter.",
    yesEnergy: "A joyful, easy encounter suggests this connection is blessed.",
    noEnergy: "An uncomfortable or tense encounter may be warning you about your path.",
    waitEnergy: "A brief or incomplete encounter suggests more will be revealed.",
    emotionalContext: "How did seeing them make you FEEL? That's the message.",
    careerContext: "Unexpected professional contacts may be opening doors.",
    relationshipContext: "Running into exes or romantic interests is never accidental.",
    spiritualContext: "Some souls are scheduled to intersect. This was planned.",
    warnings: ["What did they say? Even small talk may contain your message."],
    amplifiers: ["They mentioned something related to your question", "You were just thinking of them"],
    contradictors: ["Regular location where you'd expect to see them"]
  },

  "Stranger said something that hit me": {
    core: "The universe used a stranger as a mouthpiece. They don't know they delivered a message.",
    yesEnergy: "Affirming words from strangers are powerful yes signals.",
    noEnergy: "Warnings or concerning words from strangers should not be dismissed.",
    waitEnergy: "Cryptic or confusing messages suggest patience for clarity.",
    emotionalContext: "The impact you felt is the message. What did it stir in you?",
    careerContext: "Strangers' offhand comments about work may be prophetic.",
    relationshipContext: "What strangers say about relationships may apply to yours.",
    spiritualContext: "Angels and guides speak through unsuspecting humans constantly.",
    warnings: ["Write down exactly what they said", "The words chose you"],
    amplifiers: ["Words directly addressed your secret question", "Multiple strangers said similar things"],
    contradictors: ["Generic platitude", "Overheard conversation not directed at you"]
  },

  // === DREAMS ===
  "Vivid dream I remembered": {
    core: "Your subconscious broke through. This dream carries an important message.",
    yesEnergy: "Pleasant, clear dreams often confirm you're on the right path.",
    noEnergy: "Disturbing or warning dreams should be examined carefully.",
    waitEnergy: "Incomplete or fragmented dreams suggest the answer isn't ready.",
    emotionalContext: "The FEELING of the dream matters more than the plot.",
    careerContext: "Work-related dreams are processing your professional situation.",
    relationshipContext: "Dreaming of someone indicates they're energetically significant.",
    spiritualContext: "Dreams are the primary channel for spiritual communication.",
    warnings: ["Record the dream immediately—details fade fast"],
    amplifiers: ["Recurring dream", "Dream that felt more real than waking life"],
    contradictors: ["Stress dream with obvious cause", "Medication-induced"]
  },

  "Dream about someone I know": {
    core: "This person is in your psychic field. They may be thinking of you, or representing something.",
    yesEnergy: "Positive dreams about someone may confirm their role in your life.",
    noEnergy: "Negative dreams about someone may be warning you.",
    waitEnergy: "Confusing dreams about someone suggest the relationship is unresolved.",
    emotionalContext: "What did this person represent in the dream? That's often the message.",
    careerContext: "Dreaming of colleagues may reveal hidden workplace dynamics.",
    relationshipContext: "Romantic dreams are rarely literal—look for the symbolism.",
    spiritualContext: "You may have visited this person's energy in the dream state.",
    warnings: ["The person may symbolize a quality, not themselves literally"],
    amplifiers: ["You hadn't thought of them recently", "They contact you after the dream"],
    contradictors: ["You were thinking of them before bed", "Obvious reason for the dream"]
  },

  // === NATURE ===
  "Rainbow appeared": {
    core: "A covenant sign. The universe is promising something—hope, resolution, blessing.",
    yesEnergy: "Rainbows are almost universally yes. Hope is warranted.",
    noEnergy: "Extremely rare as a no—perhaps only if it appeared during bad news.",
    waitEnergy: "The rainbow bridges two states. You're in transition.",
    emotionalContext: "Hope is appropriate. Things will get better.",
    careerContext: "After professional storms, success is coming.",
    relationshipContext: "After relationship difficulties, reconciliation or better is possible.",
    spiritualContext: "You are being given a sign of divine promise and protection.",
    warnings: ["Double rainbows double the message"],
    amplifiers: ["Rainbow appeared right when you asked your question", "Full arc visible"],
    contradictors: ["Forced optimism", "Ignoring real problems"]
  },

  "Sun broke through clouds": {
    core: "Illumination after darkness. Clarity is coming—or has just arrived.",
    yesEnergy: "Light breaking through is one of the clearest yes signs in nature.",
    noEnergy: "Almost never a no. The universe is saying 'I see you.'",
    waitEnergy: "Patchy sun suggests intermittent clarity—more will come.",
    emotionalContext: "Your own inner light is ready to emerge. Step out of the shadows.",
    careerContext: "Professional clarity is arriving. The fog is lifting.",
    relationshipContext: "Light is being shed on this relationship. Truth is emerging.",
    spiritualContext: "Divine attention is on you. You are being illuminated.",
    warnings: ["Note exactly when it happened—the timing is the message"],
    amplifiers: ["Happened during specific thought", "Felt warmth on your face"],
    contradictors: ["Regular weather pattern", "Didn't notice it consciously"]
  }
}

// Get meaning for a sign, with fallback for custom signs
export function getSignMeaning(sign: string): SignMeaning {
  // Check for exact match
  if (signMeanings[sign]) {
    return signMeanings[sign]
  }
  
  // Check for partial match
  for (const [key, meaning] of Object.entries(signMeanings)) {
    if (sign.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
      return meaning
    }
  }
  
  // Default meaning for custom/unknown signs
  return {
    core: "A personal sign that holds meaning specific to your journey. Trust your interpretation.",
    yesEnergy: "If this sign felt positive, trust that feeling as a yes.",
    noEnergy: "If this sign felt like a warning, honor that intuition.",
    waitEnergy: "If you're uncertain what it means, more clarity will come.",
    emotionalContext: "Your emotional response to this sign is the interpretation.",
    careerContext: "Consider how this sign relates to your professional life.",
    relationshipContext: "Consider how this sign relates to your relationships.",
    spiritualContext: "Personal signs are powerful—the universe speaks your unique language.",
    warnings: ["Trust your gut interpretation of this sign"],
    amplifiers: ["Appeared multiple times", "Strong emotional response"],
    contradictors: ["Easily explained by mundane causes"]
  }
}