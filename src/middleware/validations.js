import { check } from 'express-validator';
import { UserModel } from '../db.js';


// Validation for user creation
const newUserValidate = [
    check("email", "Please use a valid email address")
        .trim()
        .escape()
        .isEmail()
        .normalizeEmail()
        .custom(async(value) =>{ // Ensures no dplicate emails
            const existingEmail = await UserModel.findOne({email: value})
            if (existingEmail){
                throw new Error("Email already exists , please check Employee list")
            }
        }),
    check("password", "Please ensure password is at least 10 characters and has a number")
        // .isLength(10)
        .trim() // removes white space 
        .escape(), // Changes HTML symbols for security reasons
        // .matches(/\d/) // macthes a number
    check("name", "Name must be at least 3 characters and first and last name sepearted by a space")
        .isLength({min: 3})
        .trim()
        .escape()
        // .custom(async (value) => {                        // ensures first and last name (at least two words)
        //     const wordInName = value.trim().split(/\s+/)
        //     return wordInName.length >= 2
        // }),
]


const newJobValidate = [
    check("customerDetails")
        .isArray(),
    check("customerDetails.0", "Please check name entered")
        .trim()
        .escape()
        .notEmpty()
        .isLength({min: 2}).withMessage("Needs to be at least 2 characters"),
    //  .custom(async (value) => {                        // ensures first and last name (at least two words)
    //      const wordInName = value.trim().split(/\s+/)
    //      return wordInName.length >= 2
    // }),
    check("customerDetails.1", "Please enter Aus number with no symbols")
        .isNumeric()
        .isLength(10)
        .notEmpty()
        .trim()
        .escape(),
    check("customerDetails.2", "Must be googlemaps shareable URL (condensed)")
        .notEmpty()
        .isLength({max: 50})
        .trim()
        .isURL()
]








export { newUserValidate, newJobValidate }