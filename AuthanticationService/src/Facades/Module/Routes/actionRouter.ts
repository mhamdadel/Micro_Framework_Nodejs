import express, { Request, Response, NextFunction } from 'express';
import Role from '../Models/Role';
import { NoContent, NotFound } from '@/Utilts/responses';
import Action from '../Models/Action';
import NotFoundException from '@/Utilts/Exceptions/NotFoundException';
// import Action from '../Models/Action';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = await Role.findById(req.params.id).populate('actions');
    if (!role) {
      throw NotFound;
      throw NotFoundException;
    }
    res.json(role);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.json(role);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!role) {
      throw NotFound;
    }
    res.json(role);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      throw NotFound;
    }
    res.status(NoContent.statusCode).json(NoContent);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/clone-actions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { actionIds, fromRoleId } = req.body;
    const role = await Role.findById(req.params.id);
    if (!role) {
      throw NotFound;
    }
    
    let actionsToAdd: any[] = [];
    if (fromRoleId) {
      const fromRole = await Role.findById(fromRoleId);
      if (!fromRole) {
        throw NotFound;
      }
      actionsToAdd = await Action.find({ _id: { $in: fromRole.actions } });
    }
    
    const selectedActions = await Action.find({ _id: { $in: actionIds } });
    actionsToAdd = actionsToAdd.concat(selectedActions);
    role.actions = actionsToAdd.filter((a, i, arr) => arr.findIndex(t => t._id === a._id) === i);
  
    await role.save();
    res.json(role);
  } catch (error) {
    next(error);
  }
});

export default router;
