const algorithmia = require('algorithmia');
const config = require('../config/config');
const sentenceBoundaryDetection = require('sbd')

async function robot(content) {
    await fetchContentFromWikipedia(content);
    sanitizeContent(content);
    breakContentIntoSentences(content);
    //breakContenIntoSentences(content);

    async function fetchContentFromWikipedia(content) {
        const algorithmiaAuteticated = algorithmia(config.algorithmia.apiKey);
        const wikipediaAlgorithmia = algorithmiaAuteticated.algo("web/WikipediaParser/0.1.2");
        const wikipediaResponse = await wikipediaAlgorithmia.pipe(content.searchTerm);
        const wikipediaContent = wikipediaResponse.get();
        content.sourceContentOriginal = wikipediaContent.content;
    }

    function sanitizeContent(content) {
        const withoutBlankLinesAndMarkdow = removeBlankLineAndMarkdow(content.sourceContentOriginal);
        const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdow);
        
        content.sourceContentSanitized = withoutDatesInParentheses;
        
        function removeBlankLineAndMarkdow(text) {
            const allLines = text.split('\n');
            const withoutBlankLinesAndMarkdow = allLines.filter((line) => {
                if (line.trim().length === 0 || line.trim().startsWith('=')) {
                    return false;
                }
                return true;
            })
            return withoutBlankLinesAndMarkdow.join(' ');
        }        
    }

    function removeDatesInParentheses(text) {
        return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
    }

    function breakContentIntoSentences(content) {
        content.sentences = []
        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach((sentence) => {
            content.sentences.push({
                text: sentence,
                keywords: [],
                images: []
            })
        })
    }
}

module.exports = robot;