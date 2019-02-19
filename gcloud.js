// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'persuasive-pipe-226610';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
});

var program = require('commander');
program.parse(process.argv);
// The text to translate
const text = program.args.join(' ');
// The target language
var target = 'en';
if (/^[a-zA-Z]/.test(text)) {
  target = 'zh-cn';
}

// Translates some text into Russian
translate
  .translate(text, target)
  .then(results => {
    const translation = results[0];

    // console.log(JSON.stringify(results));

    // console.log(`Text: ${text}`);
    // console.log(`Translation: ${translation}`);
    console.log(translation);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// translate