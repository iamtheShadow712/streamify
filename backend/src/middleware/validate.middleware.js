// import { ZodError } from "zod";
// import CustomError from "../lib/CustomError.js";

// const validate = (schema) => (req, res, next) => {
//     try {
//         schema.parse({
//             body: req.body,
//             query: req.query,
//             params: req.params
//         });
//         next();
//     } catch (error) {
//         if (error instanceof ZodError) {
//             const message = error.flatten().fieldErrors.body.join(', ');
//             return next(new CustomError(400, message));
//         }
//         next(error)
//     }
// }

// export default validate;