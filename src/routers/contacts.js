import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.use(authenticate);
router.get('/', checkRoles(ROLES.ADMIN), ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  checkRoles(ROLES.ADMIN, ROLES.USER),
  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/',
  checkRoles(ROLES.ADMIN),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/:contactId',
  checkRoles(ROLES.ADMIN),
  isValidId,
  ctrlWrapper(deleteContactController),
);
router.put(
  '/:contactId',
  checkRoles(ROLES.ADMIN, ROLES.USER),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(upsertContactController),
);
router.patch(
  '/:contactId',
  checkRoles(ROLES.ADMIN, ROLES.USER),
  isValidId,
  ctrlWrapper(patchContactController),
);

export default router;
