import YAML from 'yamljs';

import './lib/ludwig';
import store from './store';


const ludwig = new window.Ludwig({
    repoUrl: 'https://github.com/sgmap/openfisca-france/',
    template: `Précisez si ce test provient :
- [ ] d'un dossier réel
- [ ] du résultat d'une simulation sur un outil métier

NE MODIFIEZ PAS LE CONTENU CI-DESSOUS
---

`,
    prefix: 'test_',
    web:{
        acceptedTestsPath:'/tree/prod/openfisca_france/tests/mes-aides.gouv.fr',
        addPath:'/new/prod/openfisca_france/tests/mes-aides.gouv.fr',
        suggestedTestsPath:'/pulls?utf8=✓&q=is%3Apr+is%3Aopen'
    },
    github:{
        apiEndpoints:{
            createRef:'https://api.github.com/repos/sgmap/openfisca-france/git/refs',
            createContent:'https://api.github.com/repos/sgmap/openfisca-france/contents/',
            createPullRequest:'https://api.github.com/repos/sgmap/openfisca-france/pulls'
        }
    },
});

document.getElementById('createTest').addEventListener('click', event => {
    const url = ludwig.generateSuggestionURL(
        store.getState().openfiscaSituation,
        store.getState().openfiscaSituation,
        (template, actual, expected) => {
            const demoString = YAML.stringify(expected, 20, 2).slice(0, 300);  // work around URI size limit for demo purposes
            return `${template}${demoString}[more content missing…]`;
        }
    );

    window.location = url;
});

document.getElementById('showTests').href = ludwig.acceptedTestsURL();
