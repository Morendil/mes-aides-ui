var moment = require('moment');
var _ = require('lodash');

var situationsFamiliales = [
    'seul',
    'en couple (concubinage)',
    'en couple (mariage ou PACS)'
];

var situationOccupation = [
    'locataire',
    'occupant à titre gratuit',
    'propriétaire',
    'sans domicile fixe'
];

var situationPro = [
    'salarié',
    'travailleur non-salarié',
    'demandeur d\'emploi',
    'apprenti',
    'conjoint collaborateur',
    'retraité'
];

var situationsParticulières = [
    'en détention',
    'congé parental',
    'congé sabbatique',
    'longue maladie',
    'hospitalisation',
    'congé sans solde',
    'étudiant',
    'stagiaire'
];

exports['demandeur.âge'] = {
    required: ['demandeur.dateDeNaissance'],
    getValue: function(dateDeNaissance) {
        return this.respond(moment().diff(dateDeNaissance, 'years'));
    }
};

exports['demandeur.mineur'] = {
    required: ['demandeur.âge'],
    getValue: function(âge) {
        return âge < 18;
    }
};

exports['demandeur.parentIsolé'] = {
    required: ['demandeur.situationFamiliale', 'demandeur.nbEnfantsÀCharge'],
    optional: ['demandeur.enceinte'],
    getValue: function(situationFamiliale, nbEnfantsÀCharge, enceinte) {
        if (situationFamiliale !== 'seul') return this.respond(false);
        if (nbEnfantsÀCharge > 0) return this.respond(true);
        if (_.isUndefined(enceinte)) return this.claim('demandeur.enceinte');
        else if (enceinte) return this.respond(true);
        else return this.respond(false);
    }
};