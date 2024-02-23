import jwt from 'jsonwebtoken';
import { UserModel } from '../db.js';
import { JobModel } from '../db.js';

const j_auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(decodedToken.id);
    
    if (user && user.admin === true) {
      next();
    } else {
      const jobs = await JobModel.find({ users: decodedToken.id });
      if (jobs.length > 0) {
        console.log(decodedToken.id);
        console.log(jobs);
        return res.json(jobs);
      } else {
        return res.status(403).json({ message: "No jobs found for this user" });
      }
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid or missing token" });
  }
};

export default j_auth;

// import jwt from 'jsonwebtoken';
// import { UserModel } from '../db.js';
// import { JobModel } from '../db.js';

// const j_auth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await UserModel.findById(decodedToken.id);

//     let jobs;

//     if (user && user.admin === true) {
//       jobs = await JobModel.find();
//     } else {
//       jobs = await JobModel.find({ users: decodedToken.id });
//     }

//     req.jobs = jobs;
//     next(); 
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or missing token" });
//   }
// };

// export default j_auth;

