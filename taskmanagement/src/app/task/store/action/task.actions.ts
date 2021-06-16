import { createAction, props } from '@ngrx/store';

import {Task} from '../../../models/task';


export const addTasks = createAction(

  '[Task] Add Tasks',

  (task: Task[]) => ({task})

);