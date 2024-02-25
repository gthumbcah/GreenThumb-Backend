import jwt from 'jsonwebtoken';
import { UserModel } from '../db.js';
import { JobModel } from '../db.js';

const j_auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(decodedToken.id);
    
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // Check if the user is an admin
    if (user.admin === true) {
      next(); // Allow admin to access all routes
    } else {
      // For non-admin users, check if their ID is associated with the job
      if (req.params.id) {
        const job = await JobModel.findById(req.params.id);
        if (!job) {
          return res.status(404).json({ message: "Job not found" });
        }
        if (job.users.includes(decodedToken.id)) {
          next(); // Allow access if user's ID is in the job's users array
        } else {
          return res.status(403).json({ message: "User not authorized to access this job" });
        }
      } else {
        // For the route '/', return all jobs associated with the user
        const jobs = await JobModel.find({ users: decodedToken.id }).populate('users');
        res.send(jobs);
      }
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid or missing token" });
  }
}

export default j_auth

