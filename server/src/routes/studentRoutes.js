import { Router } from 'express';

import { getSankeyByStudentId } from '../controllers/studentController.js';

const router = Router();

router.get('/student/sankey/data', getSankeyByStudentId);

export default router;
 