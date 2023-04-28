/* eslint-disable n8n-nodes-base/node-param-description-wrong-for-dynamic-options */
/* eslint-disable n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options */

import {
	INodeProperties
} from 'n8n-workflow';

export const operationFields: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: [
                    'calendar',
                    'event'
                ],
            },
        },
        options: [
            {
                name: 'Get Many',
                value: 'getMany',
                action: 'Get multiple available calendars',
            },
        ],
        default: 'getMany',
        required: true,
    },
    {
        displayName: 'Calendar',
        name: 'calendar',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getCalendars',
        },
        displayOptions: {
            show: {
                resource: [
                    'event'
                ],
                operation: [
                    'getMany'
                ],
            },
        },
        default: '',
        description: 'The calendar to fetch events from',
        required: true,
    },
    {
        displayName: 'Start',
        name: 'start',
        type: 'dateTime',
        displayOptions: {
            show: {
                resource: [
                    'event'
                ],
                operation: [
                    'getMany'
                ],
            },
        },
        default: '={{ $now.toISO() }}',
        description: 'The lower bound of the time range to get events for',
    },
    {
        displayName: 'End',
        name: 'end',
        type: 'dateTime',
        displayOptions: {
            show: {
                resource: [
                    'event'
                ],
                operation: [
                    'getMany'
                ],
            },
        },
        default: '={{ $now.plus({ day: 30 }).toISO() }}',
        description: 'The upper bound of the time range to get events for',
    }
];