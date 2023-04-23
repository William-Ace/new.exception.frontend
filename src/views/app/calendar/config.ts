/**
 * Application configuration
 */

import { AppEventModel } from './event.model';
import { BryntumSchedulerProps } from '@bryntum/scheduler-react';

const schedulerConfig: BryntumSchedulerProps = {
  resourceImagePath: 'users/',

  startDate: new Date(2018, 1, 7, 8),
  endDate: new Date(2018, 1, 7, 22),

  viewPreset: 'hourAndDay',

  crudManager: {
    eventStore: {
      modelClass: AppEventModel
    },
    transport: {
      load: {
        url: 'data/data.json'
      }
    },
    autoLoad: true
  },

  timeRangesFeature: {
    narrowThreshold: 10
  },

  columns: [
    {
      type: 'resourceInfo',
      text: 'Staff',
      showImage: true,
      width: 130
    },
    {
      text: 'Type',
      field: 'role',
      width: 130
    }
  ]
};

export { schedulerConfig };
