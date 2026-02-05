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
  amplifiers: string[]
  contradictors: string[]
  verdictWeight: 'positive' | 'negative' | 'neutral' | 'wait'
  weightStrength: 1 | 2 | 3
}

export const signMeanings: Record<string, SignMeaning> = {
  // === POSITIVE SIGNS ===
  "Repeated numbers (111, 222, 333...)": {
    core: "The universe is sending a direct transmission.",
    yesEnergy: "Triple numbers are cosmic green lights.",
    noEnergy: "When repeated numbers appear with hesitation, pause.",
    waitEnergy: "The answer is forming but not yet complete.",
    emotionalContext: "Your emotions are aligned with universal truth.",
    careerContext: "You're in a flow state professionally.",
    relationshipContext: "This connection has karmic significance.",
    spiritualContext: "Your spiritual guides are actively communicating.",
    warnings: ["Don't force meaning onto every number"],
    amplifiers: ["Strong gut feeling", "Déjà vu"],
    contradictors: ["Something broke", "Lost something"],
    verdictWeight: 'positive',
    weightStrength: 2
  },

  "111 — New beginnings, manifestation": {
    core: "The universe has opened a portal. Your thoughts are manifesting rapidly.",
    yesEnergy: "111 is the ultimate green light for new starts.",
    noEnergy: "If you feel dread, the 'new beginning' may be an ending.",
    waitEnergy: "The portal is open but you must be ready.",
    emotionalContext: "Your emotional state is especially powerful right now.",
    careerContext: "A new chapter professionally. Changes are blessed.",
    relationshipContext: "New relationship energy is present.",
    spiritualContext: "You are in a manifestation window.",
    warnings: ["Negative thoughts manifest just as quickly right now"],
    amplifiers: ["Butterfly appeared", "Sun broke through clouds"],
    contradictors: ["Something broke", "Lost something"],
    verdictWeight: 'positive',
    weightStrength: 3
  },

  "222 — Balance, trust, divine timing": {
    core: "Everything is unfolding as it should. Trust, don't push.",
    yesEnergy: "222 says yes, but in its own time.",
    noEnergy: "If 222 appears with frustration, release control.",
    waitEnergy: "This IS the wait sign. Divine timing is not your timing.",
    emotionalContext: "Balance is needed between heart and mind.",
    careerContext: "Partnerships and collaborations are favored.",
    relationshipContext: "This relationship requires balance.",
    spiritualContext: "Trust without seeing the full picture.",
    warnings: ["Impatience will delay what you want"],
    amplifiers: ["Déjà vu", "Rainbow appeared"],
    contradictors: ["Anxiety", "Rushing"],
    verdictWeight: 'wait',
    weightStrength: 3
  },

  "333 — Spiritual support, creativity": {
    core: "Spiritual guides are surrounding you.",
    yesEnergy: "333 is a powerful yes backed by spiritual forces.",
    noEnergy: "You're being guided away for your highest good.",
    waitEnergy: "Your guides are working behind the scenes.",
    emotionalContext: "Creative expression is your healing right now.",
    careerContext: "Creative projects are blessed.",
    relationshipContext: "This connection has spiritual depth.",
    spiritualContext: "Pay attention to thoughts that feel 'downloaded.'",
    warnings: ["Don't ignore intuitive hits"],
    amplifiers: ["Felt a presence", "Chills or goosebumps"],
    contradictors: ["Feeling alone"],
    verdictWeight: 'positive',
    weightStrength: 2
  },

  "444 — Angels are near, protection": {
    core: "You are protected. Angels are surrounding you.",
    yesEnergy: "444 is a resounding yes with angelic backing.",
    noEnergy: "Even as a no, 444 promises protection from harm.",
    waitEnergy: "Protection is in place while you wait.",
    emotionalContext: "You are safe to feel whatever you're feeling.",
    careerContext: "Your career is protected. Setbacks are setups.",
    relationshipContext: "This relationship is being watched over.",
    spiritualContext: "Your angels are unusually close.",
    warnings: ["Don't mistake protection for passivity"],
    amplifiers: ["Found a feather", "Felt sudden warmth"],
    contradictors: ["Fear", "Feeling unsafe"],
    verdictWeight: 'positive',
    weightStrength: 3
  },

  "555 — Major change coming": {
    core: "Significant transformation is imminent.",
    yesEnergy: "555 says yes to change. Embrace it.",
    noEnergy: "The change may be a no to your current situation.",
    waitEnergy: "Change is coming whether you wait or not.",
    emotionalContext: "Emotional turbulence is normal during 555 periods.",
    careerContext: "Major career shifts incoming.",
    relationshipContext: "This relationship is transforming.",
    spiritualContext: "You are being upgraded spiritually.",
    warnings: ["Resistance is futile"],
    amplifiers: ["Butterfly appeared", "Something ended"],
    contradictors: ["Clinging to past"],
    verdictWeight: 'neutral',
    weightStrength: 2
  },

  "666 — Refocus on what matters": {
    core: "Your attention has drifted to the material. Realign.",
    yesEnergy: "If spiritual matters, 666 supports refocusing.",
    noEnergy: "If purely material, reconsider priorities.",
    waitEnergy: "Pause to examine your goals.",
    emotionalContext: "Are you prioritizing external over inner peace?",
    careerContext: "Money isn't the only measure of success.",
    relationshipContext: "Is this relationship feeding your soul?",
    spiritualContext: "The material world is distracting you.",
    warnings: ["Check your priorities"],
    amplifiers: ["Lost something", "Felt empty"],
    contradictors: ["Deep contentment"],
    verdictWeight: 'wait',
    weightStrength: 2
  },

  "777 — Spiritual awakening, luck": {
    core: "Jackpot. Rare alignment with luck and growth.",
    yesEnergy: "777 is one of the most powerful yes signs.",
    noEnergy: "May redirect you to an even better yes.",
    waitEnergy: "Rarely a wait—777 suggests the time is NOW.",
    emotionalContext: "Joy and spiritual depth are available.",
    careerContext: "Professional luck is extremely high.",
    relationshipContext: "A blessed connection. Honor it.",
    spiritualContext: "You are experiencing a spiritual awakening.",
    warnings: ["Don't waste this energy window"],
    amplifiers: ["Four-leaf clover", "Perfect timing"],
    contradictors: ["Self-doubt"],
    verdictWeight: 'positive',
    weightStrength: 3
  },

  "888 — Abundance flowing to you": {
    core: "Financial and energetic abundance is incoming.",
    yesEnergy: "888 says yes especially to abundance questions.",
    noEnergy: "May be asking you to clear blocks to receiving.",
    waitEnergy: "Abundance is coming—not instantly, but in motion.",
    emotionalContext: "You are worthy of abundance.",
    careerContext: "Financial rewards are coming.",
    relationshipContext: "Abundant love is available.",
    spiritualContext: "The universe wants to give to you.",
    warnings: ["Abundance includes non-financial blessings"],
    amplifiers: ["Found money", "Unexpected gift"],
    contradictors: ["Fear of success"],
    verdictWeight: 'positive',
    weightStrength: 3
  },

  "999 — Completion, chapter ending": {
    core: "Something is ending. Necessary for what comes next.",
    yesEnergy: "999 says yes to completion.",
    noEnergy: "999 can be a no to holding on. Let go.",
    waitEnergy: "Wait for the ending to complete.",
    emotionalContext: "Grief for endings is natural. Then release.",
    careerContext: "A job or project is completing.",
    relationshipContext: "This relationship may be ending.",
    spiritualContext: "A spiritual cycle is completing.",
    warnings: ["Don't force endings but don't resist them"],
    amplifiers: ["Something broke", "Lost something"],
    contradictors: ["New beginnings appearing"],
    verdictWeight: 'negative',
    weightStrength: 2
  },

  "1111 — Portal opening, make a wish": {
    core: "The most powerful manifestation number.",
    yesEnergy: "1111 is a mega-yes. Wish now.",
    noEnergy: "Almost impossible as a no.",
    waitEnergy: "Not a wait—1111 is immediate.",
    emotionalContext: "Your emotional frequency is manifesting instantly.",
    careerContext: "Career wishes are being granted.",
    relationshipContext: "Love wishes are powerful right now.",
    spiritualContext: "Rare moment of cosmic alignment.",
    warnings: ["Be careful what you wish for"],
    amplifiers: ["Made a wish", "Set an intention"],
    contradictors: ["Confused desires"],
    verdictWeight: 'positive',
    weightStrength: 3
  },

  "Butterfly appeared": {
    core: "Transformation is here. You are becoming who you're meant to be.",
    yesEnergy: "Butterflies almost always signal yes.",
    noEnergy: "May indicate you're resisting necessary change.",
    waitEnergy: "The cocoon phase requires patience.",
    emotionalContext: "You are transforming emotionally.",
    careerContext: "Professional metamorphosis is happening.",
    relationshipContext: "This relationship is transforming you.",
    spiritualContext: "Butterflies carry souls between worlds.",
    warnings: ["Transformation requires surrender"],
    amplifiers: ["Butterfly landed on you", "Multiple butterflies"],
    contradictors: ["Fear of change"],
    verdictWeight: 'positive',
    weightStrength: 3
  },

  "Ladybug landed on me": {
    core: "Pure good luck. Among the most positive omens.",
    yesEnergy: "Ladybugs are definitive yes signs.",
    noEnergy: "Almost impossible as a no.",
    waitEnergy: "Luck is present but may need action.",
    emotionalContext: "Joy and lightness are available.",
    careerContext: "Professional luck is high.",
    relationshipContext: "Good romantic omens.",
    spiritualContext: "Divine feminine blessing.",
    warnings: ["Receive the blessing"],
    amplifiers: ["Made a wish when it landed"],
    contradictors: ["Felt annoyed by it"],
    verdictWeight: 'positive',
    weightStrength: 3
  },

  "Rainbow appeared": {
    core: "A covenant sign. Hope and blessing.",
    yesEnergy: "Rainbows are almost universally yes.",
    noEnergy: "Extremely rare as a no.",
    waitEnergy: "The rainbow bridges two states. Transition.",
    emotionalContext: "Hope is appropriate. Things will get better.",
    careerContext: "After storms, success is coming.",
    relationshipContext: "After difficulties, reconciliation possible.",
    spiritualContext: "Divine promise and protection.",
    warnings: ["Double rainbows double the message"],
    amplifiers: ["Appeared right when you asked"],
    contradictors: ["Forced optimism"],
    verdictWeight: 'positive',
    weightStrength: 3
  },

  "Sun broke through clouds": {
    core: "Illumination after darkness. Clarity is coming.",
    yesEnergy: "One of the clearest yes signs in nature.",
    noEnergy: "Almost never a no.",
    waitEnergy: "Patchy sun suggests intermittent clarity.",
    emotionalContext: "Your inner light is ready to emerge.",
    careerContext: "Professional clarity is arriving.",
    relationshipContext: "Truth is emerging.",
    spiritualContext: "Divine attention is on you.",
    warnings: ["Note exactly when it happened"],
    amplifiers: ["Happened during specific thought"],
    contradictors: ["Regular weather pattern"],
    verdictWeight: 'positive',
    weightStrength: 2
  },

  "Found a feather": {
    core: "Feathers are calling cards from the spirit realm.",
    yesEnergy: "Almost always positive confirmation.",
    noEnergy: "Extremely rare as negative.",
    waitEnergy: "Reminder you're being watched over.",
    emotionalContext: "You are loved and supported.",
    careerContext: "Career decisions are being guided.",
    relationshipContext: "Someone in spirit may be blessing.",
    spiritualContext: "Angels and deceased loved ones leave feathers.",
    warnings: ["Note the color"],
    amplifiers: ["Inside your home", "Unusual place"],
    contradictors: ["Bird visible nearby"],
    verdictWeight: 'positive',
    weightStrength: 3
  },

  "Chills or goosebumps": {
    core: "Truth bumps. Your body is confirming significance.",
    yesEnergy: "Chills during a thought are powerful yes signals.",
    noEnergy: "Chills can also signal danger.",
    waitEnergy: "Chills of uncertainty suggest more info needed.",
    emotionalContext: "Your body recognized truth.",
    careerContext: "Chills about an opportunity are worth heeding.",
    relationshipContext: "Chills about someone confirm significance.",
    spiritualContext: "Spirit communication often comes with chills.",
    warnings: ["Note exactly what you were thinking"],
    amplifiers: ["Chills that lasted or repeated"],
    contradictors: ["Actually cold"],
    verdictWeight: 'positive',
    weightStrength: 2
  },

  "Meaningful song came on": {
    core: "The universe chose this song for you.",
    yesEnergy: "An uplifting song is a clear yes.",
    noEnergy: "A sad song may be cautioning you.",
    waitEnergy: "A nostalgic song suggests patience.",
    emotionalContext: "The emotional tone IS your guidance.",
    careerContext: "Lyrics may be literal guidance.",
    relationshipContext: "Love songs are rarely coincidences.",
    spiritualContext: "Deceased loved ones communicate through songs.",
    warnings: ["Pay attention to the specific lyrics"],
    amplifiers: ["Song from significant time in your life"],
    contradictors: ["Common song on rotation"],
    verdictWeight: 'positive',
    weightStrength: 2
  },

  "Thought of someone, they called/texted": {
    core: "Telepathic connection confirmed.",
    yesEnergy: "This connection has real energy.",
    noEnergy: "Real doesn't mean healthy. Examine it.",
    waitEnergy: "The connection is active but may need time.",
    emotionalContext: "You and this person share an unusual bond.",
    careerContext: "Professional connections with this energy are significant.",
    relationshipContext: "Romantic telepathic bonds are rare.",
    spiritualContext: "You experienced telepathy. It's real.",
    warnings: ["Real doesn't mean right to act on"],
    amplifiers: ["Happened multiple times"],
    contradictors: ["Regular frequent contact anyway"],
    verdictWeight: 'positive',
    weightStrength: 2
  },

  "Same theme appeared 3+ times today": {
    core: "The Rule of Three. Three times is a message.",
    yesEnergy: "Three times confirms. The universe is certain.",
    noEnergy: "Three warnings mean STOP.",
    waitEnergy: "Three unclear signals mean keep watching.",
    emotionalContext: "What theme? That IS the message.",
    careerContext: "Professional themes repeating are guidance.",
    relationshipContext: "Relationship themes repeating reveal truth.",
    spiritualContext: "Three is the number of manifestation.",
    warnings: ["Don't wait for a fourth sign"],
    amplifiers: ["More than three times"],
    contradictors: ["Actively looking for theme"],
    verdictWeight: 'positive',
    weightStrength: 3
  },

  "Events aligned too perfectly": {
    core: "Synchronicity cluster. The universe is very active.",
    yesEnergy: "Perfect alignment is powerful confirmation.",
    noEnergy: "If alignment felt ominous, it's a warning.",
    waitEnergy: "Alignment showing is different from telling to act.",
    emotionalContext: "You're in cosmic flow.",
    careerContext: "Professional synchronicities are rare and significant.",
    relationshipContext: "Relationship synchronicities indicate destiny.",
    spiritualContext: "The universe's full attention.",
    warnings: ["Synchronicities are guidance, not goals"],
    amplifiers: ["Multiple impossible coincidences"],
    contradictors: ["Could be explained as chance"],
    verdictWeight: 'positive',
    weightStrength: 3
  },

  // === NEGATIVE / WARNING SIGNS ===
  "Something broke": {
    core: "Breakage is never random. Something mirrors this fracture.",
    yesEnergy: "Sometimes things break to make way for better.",
    noEnergy: "Breakage is often a warning. Something is fragile.",
    waitEnergy: "Broken things require repair time.",
    emotionalContext: "What broke? That represents something inner.",
    careerContext: "May indicate professional fragility.",
    relationshipContext: "Breaking during relationship discussions is significant.",
    spiritualContext: "Spirits break things for urgent attention.",
    warnings: ["This is often a warning sign"],
    amplifiers: ["Broke for no reason", "Precious item"],
    contradictors: ["Normal wear and tear"],
    verdictWeight: 'negative',
    weightStrength: 3
  },

  "Lost something": {
    core: "Something was removed from your life. This loss has meaning.",
    yesEnergy: "Sometimes loss creates space for better.",
    noEnergy: "Loss can be a warning you're not in flow.",
    waitEnergy: "Lost objects often return when time is right.",
    emotionalContext: "Losing things can reflect inner loss.",
    careerContext: "Professional losses may be redirections.",
    relationshipContext: "Can symbolize relationship dynamics.",
    spiritualContext: "Spirit sometimes removes things for attention.",
    warnings: ["What did you lose? The object is symbolic."],
    amplifiers: ["Lost something precious", "Unexplained loss"],
    contradictors: ["Careless loss"],
    verdictWeight: 'negative',
    weightStrength: 2
  },

  "Ringing in my left ear": {
    core: "A message from the past or a warning.",
    yesEnergy: "Past validation may be arriving.",
    noEnergy: "Can be warning about repeating past mistakes.",
    waitEnergy: "Something from your past needs attention first.",
    emotionalContext: "Past emotions are surfacing for healing.",
    careerContext: "A past job situation may be relevant.",
    relationshipContext: "Past relationships are influencing present.",
    spiritualContext: "Ancestors may be communicating.",
    warnings: ["What were you thinking when it started?"],
    amplifiers: ["Thinking of someone from your past"],
    contradictors: ["Medical ear condition"],
    verdictWeight: 'negative',
    weightStrength: 2
  },

  "Nightmare that felt like a warning": {
    core: "Your subconscious staged an intervention.",
    yesEnergy: "Almost never positive. Nightmares are warnings.",
    noEnergy: "This is a strong no or danger signal.",
    waitEnergy: "At minimum, pause and reconsider.",
    emotionalContext: "What are you being warned about?",
    careerContext: "Work nightmares may warn of danger.",
    relationshipContext: "May reveal hidden truth.",
    spiritualContext: "Prophetic warnings come through nightmares.",
    warnings: ["Do not dismiss this"],
    amplifiers: ["Recurring nightmare", "Woke up in fear"],
    contradictors: ["Horror movie before bed"],
    verdictWeight: 'negative',
    weightStrength: 3
  },

  "Stomach dropped (intuition warning)": {
    core: "Your gut just sent an emergency signal.",
    yesEnergy: "Almost never positive. This is alarm.",
    noEnergy: "This is a strong no signal.",
    waitEnergy: "At minimum, stop and reconsider.",
    emotionalContext: "Fear is information. What triggered this?",
    careerContext: "About work is a serious warning.",
    relationshipContext: "About someone is your truth about them.",
    spiritualContext: "Your gut brain is protecting you.",
    warnings: ["Do not override this signal"],
    amplifiers: ["Happened suddenly", "Unmistakable"],
    contradictors: ["Anxiety disorder"],
    verdictWeight: 'negative',
    weightStrength: 3
  },

  "Bad feeling I can't explain": {
    core: "Your intuition is alerting you to hidden danger.",
    yesEnergy: "Almost never positive.",
    noEnergy: "This is a no signal. Trust the feeling.",
    waitEnergy: "At minimum, pause until it clarifies.",
    emotionalContext: "Unexplained bad feelings are protection.",
    careerContext: "About work situations are worth heeding.",
    relationshipContext: "About someone are rarely wrong.",
    spiritualContext: "You're sensing something real.",
    warnings: ["Don't rationalize this away"],
    amplifiers: ["Persistent", "Multiple situations"],
    contradictors: ["Anxiety disorder"],
    verdictWeight: 'negative',
    weightStrength: 3
  },

  "Repeated obstacles or delays": {
    core: "The universe is blocking this path.",
    yesEnergy: "Can be tests—but repeated ones are usually redirects.",
    noEnergy: "Multiple obstacles suggest wrong path.",
    waitEnergy: "The timing may be wrong.",
    emotionalContext: "Examine what's being blocked.",
    careerContext: "May be protecting you from wrong moves.",
    relationshipContext: "May be warning you.",
    spiritualContext: "When doors keep closing, look elsewhere.",
    warnings: ["One is a test. Three is a message."],
    amplifiers: ["From multiple directions"],
    contradictors: ["Normal challenges"],
    verdictWeight: 'negative',
    weightStrength: 2
  },

  "Accident or near-miss": {
    core: "A wake-up call. Something got your attention dramatically.",
    yesEnergy: "Survival can confirm you're needed here.",
    noEnergy: "Often warnings to change course.",
    waitEnergy: "Stop and reassess everything.",
    emotionalContext: "What needs to change?",
    careerContext: "May indicate you're off-path.",
    relationshipContext: "During relationship decisions is significant.",
    spiritualContext: "The universe used drama for attention.",
    warnings: ["This is urgent. Something needs to change."],
    amplifiers: ["Unexplainable circumstances"],
    contradictors: ["Obvious cause"],
    verdictWeight: 'negative',
    weightStrength: 3
  },

  "Person gave me a bad vibe": {
    core: "Your energy sensors detected something off.",
    yesEnergy: "Almost never positive about this person.",
    noEnergy: "Trust this. Bad vibes are information.",
    waitEnergy: "Wait before engaging further.",
    emotionalContext: "Your body is warning you.",
    careerContext: "Trust bad vibes about colleagues.",
    relationshipContext: "Bad vibes about romantic interests are reliable.",
    spiritualContext: "You're sensing their true energy.",
    warnings: ["Don't dismiss as being judgmental"],
    amplifiers: ["Instant reaction", "Physical discomfort"],
    contradictors: ["They remind you of past negative person"],
    verdictWeight: 'negative',
    weightStrength: 3
  },

  "Things keep going wrong": {
    core: "A pattern of resistance from the universe.",
    yesEnergy: "Rarely positive. Sometimes clearing.",
    noEnergy: "Usually signals wrong direction.",
    waitEnergy: "Stop all forward motion and reassess.",
    emotionalContext: "The universe is trying to redirect you.",
    careerContext: "Professional wrong turns show this pattern.",
    relationshipContext: "Relationship problems may be warnings.",
    spiritualContext: "When everything fails, listen.",
    warnings: ["How many things? Pattern matters."],
    amplifiers: ["Multiple unrelated failures", "Unusual bad luck"],
    contradictors: ["One bad day"],
    verdictWeight: 'negative',
    weightStrength: 3
  },

  // === WAIT / NEUTRAL SIGNS ===
  "Déjà vu": {
    core: "You've been here before.",
    yesEnergy: "Can confirm you're on your destined path.",
    noEnergy: "With dread may warn of repeated mistake.",
    waitEnergy: "Remember what came next.",
    emotionalContext: "The feeling is more important than content.",
    careerContext: "May indicate you're where you should be.",
    relationshipContext: "With someone suggests soul contract.",
    spiritualContext: "Timeline convergence.",
    warnings: ["What happened after in the 'memory'?"],
    amplifiers: ["Strong déjà vu", "Knew what would happen"],
    contradictors: ["Vague déjà vu"],
    verdictWeight: 'wait',
    weightStrength: 2
  },

  "Heard my name called": {
    core: "Someone in the unseen realm wants attention.",
    yesEnergy: "Gentle calling is 'proceed.'",
    noEnergy: "Harsh calling may be warning.",
    waitEnergy: "Questioning tone suggests pause.",
    emotionalContext: "How did it make you feel?",
    careerContext: "Being called to your purpose.",
    relationshipContext: "Someone is thinking of you intensely.",
    spiritualContext: "Spirit guides call when messages are urgent.",
    warnings: ["Don't dismiss it"],
    amplifiers: ["No one was there"],
    contradictors: ["Someone was actually calling"],
    verdictWeight: 'wait',
    weightStrength: 2
  },

  "Sudden silence": {
    core: "The universe pressed pause.",
    yesEnergy: "Can be holding space for your yes.",
    noEnergy: "Can be pause before warning.",
    waitEnergy: "Asking you to listen, not speak.",
    emotionalContext: "In the silence, what did you feel?",
    careerContext: "Pause before acting professionally.",
    relationshipContext: "What's unsaid may be important.",
    spiritualContext: "The divine speaks in silence.",
    warnings: ["What happened after the silence?"],
    amplifiers: ["Felt presence in the silence"],
    contradictors: ["Regular quiet moment"],
    verdictWeight: 'wait',
    weightStrength: 2
  },

  "Strong gut feeling": {
    core: "Your body knows. The gut doesn't rationalize.",
    yesEnergy: "A gut yes is one of the most reliable signs.",
    noEnergy: "A gut no is your alarm system.",
    waitEnergy: "Neutral gut suggests not enough info.",
    emotionalContext: "Your gut bypasses mental confusion.",
    careerContext: "Gut feelings about jobs are rarely wrong.",
    relationshipContext: "Your gut knows if someone is right.",
    spiritualContext: "The gut is your spiritual antenna.",
    warnings: ["Don't rationalize away gut feelings"],
    amplifiers: ["Immediate physical response"],
    contradictors: ["Anxiety coloring perception"],
    verdictWeight: 'neutral',
    weightStrength: 3
  },

  "Sudden emotion out of nowhere": {
    core: "An emotional download. Information arriving.",
    yesEnergy: "Sudden joy or peace confirms your path.",
    noEnergy: "Sudden dread or fear is warning.",
    waitEnergy: "Sudden confusion suggests waiting.",
    emotionalContext: "The emotion IS the message.",
    careerContext: "During work decisions is guidance.",
    relationshipContext: "About someone reveals truth.",
    spiritualContext: "May be receiving from collective.",
    warnings: ["Don't dismiss as random"],
    amplifiers: ["No apparent trigger"],
    contradictors: ["Obvious trigger"],
    verdictWeight: 'neutral',
    weightStrength: 2
  },

  "Recurring dream theme": {
    core: "Your subconscious is persistent.",
    yesEnergy: "Positive themes confirm consistent path.",
    noEnergy: "Nightmares are persistent warnings.",
    waitEnergy: "Unclear themes suggest working through.",
    emotionalContext: "Processing unresolved emotions.",
    careerContext: "May indicate stress or guidance.",
    relationshipContext: "Reveal deep patterns.",
    spiritualContext: "Messages not fully received yet.",
    warnings: ["What is the theme?"],
    amplifiers: ["Same dream for years"],
    contradictors: ["New dream"],
    verdictWeight: 'wait',
    weightStrength: 2
  },

  "Woke up at 3am or 4am": {
    core: "The witching hours. The veil is thinnest.",
    yesEnergy: "Woke with clarity or peace is positive.",
    noEnergy: "Woke with dread is warning.",
    waitEnergy: "Woke confused means message unclear.",
    emotionalContext: "First thoughts are the message.",
    careerContext: "3-4am insights may be prophetic.",
    relationshipContext: "Thinking of someone is significant.",
    spiritualContext: "Spirit communication is easiest now.",
    warnings: ["Write first thoughts immediately"],
    amplifiers: ["Woke suddenly with no cause"],
    contradictors: ["Bathroom need", "Noise"],
    verdictWeight: 'wait',
    weightStrength: 2
  },

  "Someone from my past reached out": {
    core: "The past is knocking. Has meaning for present.",
    yesEnergy: "Positive reconnection may be unfinished business.",
    noEnergy: "If stomach dropped, trust that.",
    waitEnergy: "May need to process before moving forward.",
    emotionalContext: "How did it feel to hear from them?",
    careerContext: "Past contacts may bring opportunities.",
    relationshipContext: "Past romantic contacts are never random.",
    spiritualContext: "Unfinished soul business completing.",
    warnings: ["Why now? Timing is significant."],
    amplifiers: ["You were just thinking of them"],
    contradictors: ["Expected contact"],
    verdictWeight: 'wait',
    weightStrength: 2
  },

  "Technology kept malfunctioning": {
    core: "Repeated tech issues suggest interference or spirit.",
    yesEnergy: "Spirit may be communicating approval.",
    noEnergy: "Repeated malfunctions can be warnings.",
    waitEnergy: "May be asking you to pause digital activity.",
    emotionalContext: "Your energy may be interfering.",
    careerContext: "Work tech issues may indicate stress.",
    relationshipContext: "During communication may be significant.",
    spiritualContext: "Spirit uses technology to communicate.",
    warnings: ["Rule out practical causes first"],
    amplifiers: ["Multiple devices", "Significant moments"],
    contradictors: ["Old equipment"],
    verdictWeight: 'wait',
    weightStrength: 2
  },

  "Delay that turned into protection": {
    core: "Frustration was actually rescue.",
    yesEnergy: "Confirms you're being looked after.",
    noEnergy: "May be saying no to your timeline.",
    waitEnergy: "More delays may come. Trust protection.",
    emotionalContext: "Gratitude is appropriate.",
    careerContext: "May be protecting from wrong moves.",
    relationshipContext: "May be preventing wrong connections.",
    spiritualContext: "Even obstacles are help.",
    warnings: ["What were you being protected from?"],
    amplifiers: ["Later discovered protection benefit"],
    contradictors: ["Delay caused genuine harm"],
    verdictWeight: 'wait',
    weightStrength: 2
  },

  // === NEUTRAL SIGNS (depends on context) ===
  "Bird crossed my path": {
    core: "A messenger from the sky.",
    yesEnergy: "Flying upward signals yes.",
    noEnergy: "Flying into something may be warning.",
    waitEnergy: "Hovering suggests patience.",
    emotionalContext: "Freedom and perspective offered.",
    careerContext: "A message about professional life.",
    relationshipContext: "News may be coming.",
    spiritualContext: "Spirit guides take bird form.",
    warnings: ["Note the type of bird"],
    amplifiers: ["Feather found after", "Rare bird"],
    contradictors: ["Common bird in common place"],
    verdictWeight: 'positive',
    weightStrength: 1
  },

  "Unexpected animal encounter": {
    core: "An animal crossed your path with intention.",
    yesEnergy: "Peaceful encounter signals approval.",
    noEnergy: "Aggressive animal may be warning.",
    waitEnergy: "Fleeting encounter suggests patience.",
    emotionalContext: "What does this animal represent to you?",
    careerContext: "During work decisions carry guidance.",
    relationshipContext: "May represent someone.",
    spiritualContext: "Power animals appear when needed.",
    warnings: ["Research the animal's meaning"],
    amplifiers: ["Eye contact", "Rare animal"],
    contradictors: ["Common animal in usual habitat"],
    verdictWeight: 'neutral',
    weightStrength: 1
  },

  "Ringing in my right ear": {
    core: "A message about the future or confirmation.",
    yesEnergy: "Often confirms your current path.",
    noEnergy: "If urgent, heed the warning.",
    waitEnergy: "Future info is downloading.",
    emotionalContext: "Your future self may be encouraging.",
    careerContext: "Future developments previewed.",
    relationshipContext: "Future relationship info arriving.",
    spiritualContext: "Higher guidance about your path.",
    warnings: ["Note what you were thinking"],
    amplifiers: ["Clear, high tone"],
    contradictors: ["Medical ear condition"],
    verdictWeight: 'positive',
    weightStrength: 1
  },

  "Vivid dream I remembered": {
    core: "Your subconscious broke through.",
    yesEnergy: "Pleasant dreams confirm right path.",
    noEnergy: "Disturbing dreams should be examined.",
    waitEnergy: "Incomplete dreams mean answer isn't ready.",
    emotionalContext: "The FEELING matters more than plot.",
    careerContext: "Work dreams process your situation.",
    relationshipContext: "Dreaming of someone indicates significance.",
    spiritualContext: "Primary channel for spiritual communication.",
    warnings: ["Record immediately"],
    amplifiers: ["Recurring", "Felt more real than waking"],
    contradictors: ["Stress dream with obvious cause"],
    verdictWeight: 'neutral',
    weightStrength: 2
  },

  "Door was open/closed meaningfully": {
    core: "Doors are powerful symbols.",
    yesEnergy: "Open doors are invitations.",
    noEnergy: "Closed doors are boundaries.",
    waitEnergy: "Ajar suggests not quite ready.",
    emotionalContext: "Doors represent choices.",
    careerContext: "Career doors are literal signs.",
    relationshipContext: "Opportunities opening or closing.",
    spiritualContext: "Doors can be portals.",
    warnings: ["Note whether open or closed"],
    amplifiers: ["Moved on its own"],
    contradictors: ["Someone opened/closed it"],
    verdictWeight: 'neutral',
    weightStrength: 2
  },

  "Lights flickered": {
    core: "Classic spirit communication.",
    yesEnergy: "During positive thoughts may be confirmation.",
    noEnergy: "As warnings should be heeded.",
    waitEnergy: "Intermittent suggests incomplete message.",
    emotionalContext: "What were you feeling?",
    careerContext: "At work may relate to professional messages.",
    relationshipContext: "Thinking of someone confirms connection.",
    spiritualContext: "Deceased loved ones use electricity.",
    warnings: ["Check practical causes first"],
    amplifiers: ["Multiple electronics", "At 11:11"],
    contradictors: ["Known electrical problems"],
    verdictWeight: 'neutral',
    weightStrength: 1
  },

  "Ran into someone unexpected": {
    core: "No coincidences. This person carries a message.",
    yesEnergy: "Joyful encounter suggests blessing.",
    noEnergy: "Uncomfortable encounter may be warning.",
    waitEnergy: "Brief encounter suggests more to come.",
    emotionalContext: "How did seeing them make you FEEL?",
    careerContext: "Unexpected contacts may open doors.",
    relationshipContext: "Running into exes is never accidental.",
    spiritualContext: "Souls scheduled to intersect.",
    warnings: ["What did they say?"],
    amplifiers: ["Related to your question"],
    contradictors: ["Regular location"],
    verdictWeight: 'neutral',
    weightStrength: 1
  },

  "Stranger said something that hit me": {
    core: "The universe used a stranger as mouthpiece.",
    yesEnergy: "Affirming words are powerful yes signals.",
    noEnergy: "Warnings should not be dismissed.",
    waitEnergy: "Cryptic messages suggest patience.",
    emotionalContext: "The impact you felt is the message.",
    careerContext: "Comments about work may be prophetic.",
    relationshipContext: "About relationships may apply to yours.",
    spiritualContext: "Angels speak through unsuspecting humans.",
    warnings: ["Write down exactly what they said"],
    amplifiers: ["Directly addressed your secret question"],
    contradictors: ["Generic platitude"],
    verdictWeight: 'neutral',
    weightStrength: 2
  },

  "Found something meaningful": {
    core: "The universe placed this in your path.",
    yesEnergy: "Finding meaningful objects is blessing.",
    noEnergy: "What you found may carry warning.",
    waitEnergy: "Some found objects hint at what's coming.",
    emotionalContext: "How did finding it make you feel?",
    careerContext: "Can be signs about career direction.",
    relationshipContext: "Can remind you of people for a reason.",
    spiritualContext: "Deceased loved ones leave objects.",
    warnings: ["What is the object?"],
    amplifiers: ["Directly relates to question"],
    contradictors: ["You were looking for it"],
    verdictWeight: 'positive',
    weightStrength: 2
  },

  "Smelled a familiar scent": {
    core: "Scent visitation from deceased loved one.",
    yesEnergy: "Comforting scent is blessing and approval.",
    noEnergy: "Concerning scent may be warning.",
    waitEnergy: "Faint scents suggest partial communication.",
    emotionalContext: "They want you to know they're with you.",
    careerContext: "Deceased mentor may be offering guidance.",
    relationshipContext: "Passed loved one commenting.",
    spiritualContext: "Scent is powerful spirit communication.",
    warnings: ["Who wore this scent?"],
    amplifiers: ["No source found", "Their signature scent"],
    contradictors: ["Logical source found"],
    verdictWeight: 'positive',
    weightStrength: 3
  },

  "Felt a presence nearby": {
    core: "You're not alone. Someone in spirit is with you.",
    yesEnergy: "Comforting presence is support.",
    noEnergy: "Uncomfortable presence may be warning.",
    waitEnergy: "Quiet presence is accompanying you.",
    emotionalContext: "Trust what you felt.",
    careerContext: "Spiritual helpers assisting.",
    relationshipContext: "Deceased visit during relationship moments.",
    spiritualContext: "Your spiritual senses are opening.",
    warnings: ["Did it feel benevolent?"],
    amplifiers: ["Physical sensation", "Temperature change"],
    contradictors: ["High anxiety state"],
    verdictWeight: 'positive',
    weightStrength: 2
  },

  "Looked at clock at meaningful time": {
    core: "You were prompted to check at that exact moment.",
    yesEnergy: "Positive sequences confirm your path.",
    noEnergy: "Some times carry warnings.",
    waitEnergy: "Times like 2:22 mean wait.",
    emotionalContext: "You and universe are synchronized.",
    careerContext: "Career timing may be significant.",
    relationshipContext: "Relationship timing may be guided.",
    spiritualContext: "You're in divine flow.",
    warnings: ["What were you thinking?"],
    amplifiers: ["Same time multiple days"],
    contradictors: ["Checking time regularly"],
    verdictWeight: 'positive',
    weightStrength: 2
  }
}

// Get meaning for a sign, with fallback for custom signs
export function getSignMeaning(sign: string): SignMeaning {
  if (signMeanings[sign]) {
    return signMeanings[sign]
  }
  
  // Check for partial match
  const signLower = sign.toLowerCase()
  for (const [key, meaning] of Object.entries(signMeanings)) {
    const keyWords = key.toLowerCase().split(' ')
    if (keyWords.some(word => word.length > 3 && signLower.includes(word))) {
      return meaning
    }
  }
  
  // Default for custom/unknown signs - will be analyzed by AI for sentiment
  return {
    core: "A personal sign that holds meaning specific to your journey.",
    yesEnergy: "If this sign felt positive, trust that feeling.",
    noEnergy: "If this sign felt like a warning, honor that intuition.",
    waitEnergy: "If you're uncertain, more clarity will come.",
    emotionalContext: "Your emotional response is the interpretation.",
    careerContext: "Consider how this relates to your professional life.",
    relationshipContext: "Consider how this relates to your relationships.",
    spiritualContext: "Personal signs are powerful—the universe speaks your language.",
    warnings: ["Trust your gut interpretation"],
    amplifiers: ["Appeared multiple times", "Strong emotional response"],
    contradictors: ["Easily explained by mundane causes"],
    verdictWeight: 'neutral',
    weightStrength: 1
  }
}

// Calculate overall sign weights for verdict determination
export function calculateSignWeights(signs: string[]): { 
  positiveScore: number
  negativeScore: number
  waitScore: number
  neutralCount: number
  totalWeight: number
} {
  let positiveScore = 0
  let negativeScore = 0
  let waitScore = 0
  let neutralCount = 0
  
  for (const sign of signs) {
    const meaning = getSignMeaning(sign)
    const strength = meaning.weightStrength
    
    switch (meaning.verdictWeight) {
      case 'positive':
        positiveScore += strength
        break
      case 'negative':
        negativeScore += strength
        break
      case 'wait':
        waitScore += strength
        break
      case 'neutral':
        neutralCount++
        break
    }
  }
  
  return {
    positiveScore,
    negativeScore,
    waitScore,
    neutralCount,
    totalWeight: positiveScore + negativeScore + waitScore
  }
}

// Determine if there are enough signs for a confident reading
export function hasEnoughSigns(signs: string[]): {
  sufficient: boolean
  confidence: 'low' | 'medium' | 'high'
  reason: string
} {
  const count = signs.length
  const weights = calculateSignWeights(signs)
  
  if (count <= 1) {
    return {
      sufficient: false,
      confidence: 'low',
      reason: 'Only one sign is not enough for the universe to speak clearly. The Orakl needs more data to give you a meaningful answer.'
    }
  }
  
  if (count === 2 && weights.totalWeight < 4) {
    return {
      sufficient: false,
      confidence: 'low', 
      reason: 'Two signs give only a whisper from the universe. For a clearer message, continue watching for more signs or consider a 5-day deep reading.'
    }
  }
  
  if (count >= 3 && count <= 4) {
    return {
      sufficient: true,
      confidence: 'medium',
      reason: 'The universe is beginning to form a message. A reading is possible, though more signs would strengthen the clarity.'
    }
  }
  
  if (count >= 5) {
    return {
      sufficient: true,
      confidence: 'high',
      reason: 'The universe has spoken clearly through multiple signs. A confident reading is possible.'
    }
  }
  
  return {
    sufficient: true,
    confidence: 'medium',
    reason: 'Sufficient signs for a reading.'
  }
}

// Determine verdict lean based on sign weights
export function determineVerdictLean(signs: string[]): {
  lean: 'yes' | 'no' | 'wait' | 'insufficient'
  confidence: number
  reasoning: string
} {
  const signCheck = hasEnoughSigns(signs)
  
  if (!signCheck.sufficient) {
    return {
      lean: 'insufficient',
      confidence: 0,
      reasoning: signCheck.reason
    }
  }
  
  const weights = calculateSignWeights(signs)
  const total = weights.totalWeight
  
  // If mostly neutral signs, lean toward wait
  if (weights.neutralCount > signs.length / 2 && total < 3) {
    return {
      lean: 'wait',
      confidence: 40,
      reasoning: 'The signs are ambiguous. The universe is not yet ready to give a clear answer.'
    }
  }
  
  // Calculate percentages
  const positivePercent = total > 0 ? (weights.positiveScore / total) * 100 : 0
  const negativePercent = total > 0 ? (weights.negativeScore / total) * 100 : 0
  const waitPercent = total > 0 ? (weights.waitScore / total) * 100 : 0
  
  // Determine the lean
  if (weights.negativeScore >= 6 || (negativePercent > 50 && weights.negativeScore >= 4)) {
    // Strong negative signals
    return {
      lean: 'no',
      confidence: Math.min(90, 50 + negativePercent * 0.4),
      reasoning: 'The signs carry clear warnings. The universe is advising against this path.'
    }
  }
  
  if (positivePercent > 60 && weights.positiveScore >= 4) {
    return {
      lean: 'yes',
      confidence: Math.min(90, 50 + positivePercent * 0.4),
      reasoning: 'The signs align positively. The universe is giving its blessing.'
    }
  }
  
  if (waitPercent > 40 || (weights.positiveScore > 0 && weights.negativeScore > 0)) {
    // Mixed signals or timing signs
    return {
      lean: 'wait',
      confidence: Math.min(70, 40 + waitPercent * 0.3),
      reasoning: 'The signs suggest the timing is not yet right, or the situation needs more clarity.'
    }
  }
  
  // Default to yes if positive outweighs negative
  if (weights.positiveScore > weights.negativeScore) {
    return {
      lean: 'yes',
      confidence: Math.min(75, 50 + (positivePercent - negativePercent) * 0.3),
      reasoning: 'The signs lean positive, though the message could be clearer with more signs.'
    }
  }
  
  // Default to wait if unclear
  return {
    lean: 'wait',
    confidence: 50,
    reasoning: 'The universe has not yet formed a clear answer. Continue watching for signs.'
  }
}