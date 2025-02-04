
const headerValidator = require('../../../../utils/headersValidator');
const generateQuestionPaperController = require('../../controllers/admin/providerController')

exports.routerConfig = (app) => {

  app.group('/api/v1/admin', (admin) => {

    admin.get('/test', (req, res) => {
    res.status(200).json({message : 'Testing Admin routes!'})
    });
    admin.get('/generateQuestionPaper', [headerValidator.nonAuthAdminValidation, generateQuestionPaperController.getQuestionPaper ]);
  
  });
};