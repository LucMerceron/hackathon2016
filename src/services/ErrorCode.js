var ErrorCode = {
  errorMap: {
    '-1': {
        en: 'Authentication error or insufficient rights',
        fr: 'Erreur d\'authentification ou droits insuffisant'
    },
    '-2': {
        en: 'Incomplete or invalid parameters',
        fr: 'Paramètres incomplets ou invalides'
    },
    '-3': {
        en: 'Database error',
        fr: 'Erreur Base de Données'
    },
    '-4': {
        en: 'Syntax error. Please contact the Admin',
        fr: 'Erreur syntaxique. Veuillez contacter l\'administrateur'
    },
    '-5': {
        en: 'Insufficient rights for this action',
        fr: 'Droits insuffisant pour cette action'
    },
    '-99': {
        en: 'Unknown error',
        fr: 'Erreur inconnue'
    }
  },
  getErrorMessage: function(body) {
    if (body && body.code) {
        switch (body.code) {
            case 1 :
                return body.errors.en
                break;
            case -1:
            case -2:
            case -3:
            case -4:
            case -5:
            case -99:
                return this.errorMap[body.code].en
                break;
            default: 
                return true
                break;
        }
    } else {
        return true;
    }
  },
};

module.exports = ErrorCode;