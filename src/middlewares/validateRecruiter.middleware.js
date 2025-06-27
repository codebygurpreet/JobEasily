import { body, validationResult } from "express-validator";

// can be reused by many routes
const validateRecruiter =  async (req, res, next) => {


        let rules = [
            body('name').notEmpty().withMessage('Name is required please enter'),
            body('email').isEmail().withMessage('Please enter valid email'),
            body('password').optional().isLength({ min: 6 }). withMessage('password invalid length')
        ];

        await Promise.all(rules.map(rule => rule.run(req)));

        let validationErrors = validationResult(req);

        if(!validationErrors.isEmpty()){
            return res.render('landing-page', {errorMessage: validationErrors.array()[0].msg})
        }

        next();
    };

export default validateRecruiter;









// const validateRequest = async (req, res, next) => {
//   console.log(req.body);

//   // 1. Setup rules for validation.
//   const rules = [
//     body("logo").custom((value, { req }) => {
//       if (!req.file) {
//         throw new Error("Image is required");
//       }
//       return true;
//     }),
//   ];

//   // 2. run those rules.
//   await Promise.all(rules.map((rule) => rule.run(req)));

//   // 3. check if there are any errors after running the rules.
//   var validationErrors = validationResult(req);
//   console.log(validationErrors);

//   // 4. if errros, return the error message
//   if (!validationErrors.isEmpty()) {
//     return res.render("new-job", {
//       errorMessage: validationErrors.array()[0].msg,
//     });
//   }
//   next();
// };

// export default validateRequest;