export const generateWordPrompt = (word: string, language = 'english') => {
	return `
    SYSTEM: You are a multilingual dictionary. Provide strictly verified information only.

    \`{The word "${word}" is in "${language}", provide the following for it:
    Provide phonetic transcription of the word "${word}" in brackets. 
    Provide examples with "${word}" in "${language}" and what part of speech the word "${word}" is in these examples. CHECK that all examples are SPELT CORRECTLY and you have identified the parts of speech in these examples CORRECTLY! 
    List forms of the word "${word}" in "${language}" and transcriptions of these words. If there's only one form of this word, provide only one form and its transcription.
    Provide 3 synonyms for the word "${word}". 
    Provide 3 common phrases with "${word}". 
          
    Present in:
    
    {
      "pronunciation:": "[value]",
      "usageExamples": [{"example": "value", "partOfSpeech": "value"}],
      "forms": [{“form”: “form”, “pronunciation”: “[value]”}, {“form”: “form”, “pronunciation”: “[value]”}],
      "synonyms": ["synonym", "synonym"],
      "commonPhrases": [
        { "phrase": "value", "meaning": "value"},
        { "phrase": "value", "meaning": "value"},
        { "phrase": "value", "meaning": "value"}
      ]
    }\`
  `;
};