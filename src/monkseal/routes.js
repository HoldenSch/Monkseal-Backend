const { Router } = require('express');
const controller = require('./controller')

const router = Router();

router.get("/", controller.getMonkseals);
router.post("/", controller.addSeal);
router.get("/:id", controller.getSealById);
router.put("/:id", controller.updateSeal);
router.delete("/:id", controller.removeSeal);

module.exports = router;