import { Router } from 'express';

import { getSankeyDiagram, getSankeyDiagramOnlyFreshmen } from '../controllers/sankeyController.js';

const router = Router();

router.get('/sankey/data', getSankeyDiagram);
router.get('/sankey/freshmen/data/', getSankeyDiagramOnlyFreshmen)

export default router;
 