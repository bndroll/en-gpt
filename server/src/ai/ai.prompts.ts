export const generateWordPrompt = (word: string, language = 'english') => {
	return `
    SYSTEM: You are a multilingual dictionary. Provide strictly verified information only.

    The word "${word}" is in "${language}", provide the following for it:
    Specify the initial form of the word "${word}".
    Provide phonetic transcription of the word "${word}" in square brackets. 
    Provide examples with "${word}" in "${language}" and what part of speech the word "${word}" is in these examples. CHECK that all examples are SPELT CORRECTLY and you have identified the parts of speech in these examples CORRECTLY! 
    Provide the list of forms of the word "${word}" in "${language}" and the transcriptions of these words.
    Provide 3 synonyms for the word "${word}". 
    Provide 3 common phrases with "${word}". 
          
    Provide the information as a JSON object:
    {
      "initialForm": "value",
      "pronunciation:": "[value]",
      "usageExamples": [{"example": "value", "partOfSpeech": "value"}],
      "forms": [{“form”: “form”, “pronunciation”: “[value]”}, {“form”: “form”, “pronunciation”: “[value]”}],
      "synonyms": ["synonym", "synonym"],
      "commonPhrases": [
        { "phrase": "value", "meaning": "value"},
        { "phrase": "value", "meaning": "value"},
        { "phrase": "value", "meaning": "value"}
      ]
    }
  `;
};