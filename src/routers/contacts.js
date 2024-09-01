import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

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
router.get(
  '/',

  ctrlWrapper(getContactsController),
);

router.get(
  '/:contactId',

  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/',

  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/:contactId',

  isValidId,
  ctrlWrapper(deleteContactController),
);
router.put(
  '/:contactId',

  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(upsertContactController),
);
router.patch(
  '/:contactId',

  isValidId,
  ctrlWrapper(patchContactController),
);

export default router;
