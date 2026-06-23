// Feminization AI Judge - pure scoring logic (Grok Imagine sim + real upload bytes)
export type SissyAnalysis = {
  score: number
  level: string
  commands: string[]
  praise: string
  nextLevel: string
}

export function analyzeSissyLevel(file: { name: string; size: number; type: string; bytesSample?: string }): SissyAnalysis {
  const base = 48
  const sizeFactor = Math.floor((file.size % 72000) / 850)
  const nameFactor = [...file.name.toLowerCase()].reduce((a, c) => a + c.charCodeAt(0), 0) % 28
  let score = Math.max(31, Math.min(98, base + sizeFactor + nameFactor - 3))
  if (file.bytesSample) {
    const sampleScore = Math.floor((file.bytesSample.length % 35) + (file.bytesSample.split('').filter(c => 'pPiInNkK'.includes(c)).length * 1.2))
    score = Math.min(98, score + Math.floor(sampleScore / 2))
  }
  const levels = ["Novice Sissy", "Blushing Bambi", "Trained Doll", "Irreversible Slut", "Perfect Pink Property"]
  const levelIdx = Math.floor((score - 30) / 14)
  const level = levels[Math.min(levelIdx, levels.length - 1)]
  const commands = [
    "Apply 3 extra coats of gloss and take another with tongue out.",
    "Contour cheeks higher + add heart stamp on left cheek.",
    "Widen eyes with white liner, practice 'fuck me' face 30s.",
    "Change to the micro pink cage + shortest thong you own.",
    "Write 'Property of SissyOS' on your inner thigh in lipstick.",
  ].slice(0, 3 + Math.floor(score / 30))
  const praise = score > 85 ? "Fuck. You're already leaking at how far you've fallen. This is who you are now." : "Good girl. Every point is another nail in the old you's coffin."
  return { score, level, commands, praise, nextLevel: levels[Math.min(levelIdx + 1, levels.length - 1)] }
}