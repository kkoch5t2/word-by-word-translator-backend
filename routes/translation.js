const router = require("express").Router();
require("dotenv").config();
const { Translate } = require('@google-cloud/translate').v2;
// Google Cloud Translation APIの認証情報
const projectId = process.env.GOOGLE_CLOUD_TRANSLATION_API_PROJECT_ID
const keyFilename = process.env.GOOGLE_CLOUD_TRANSLATION_API_KEY_FILE_NAME;


// 全文翻訳
router.get("/translate/sentence", async(req, res) => {
    try {
        const params = req.query.sentence
        const translate = new Translate({ projectId, keyFilename });

        async function translateText(text, targetLanguage) {
            try {
                // テキストを指定された言語に翻訳します
                const [sentenceTranslation] = await translate.translate(text, targetLanguage);
                return res.status(200).json(sentenceTranslation);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        // テキストとターゲット言語を指定して翻訳を実行します
        translateText(params, 'ja');
    } catch(err) {
        return res.status(500).json(err);
    }
});

// 単語別翻訳
router.get("/translate/word", async(req, res) => {
    try {
        const params = req.query.sentence
        const translate = new Translate({ projectId, keyFilename });

        async function translateText(text, targetLanguage) {
            try {
                // テキストを指定された言語に翻訳します
                const words = text.split(' ');
                const arr = []
                for (var i = 0; i < words.length; i++) {
                    const [wordTranslation] = await translate.translate(words[i], targetLanguage)
                    arr.push(wordTranslation);
                }
                const sentence = arr.join(' ');
                return res.status(200).json(sentence);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        // テキストとターゲット言語を指定して翻訳を実行します
        translateText(params, 'ja');
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
});


module.exports = router;