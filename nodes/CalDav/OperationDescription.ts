import {
	INodeProperties
} from 'n8n-workflow';

export const operationFields: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
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
            },
        ],
        default: 'getMany',
        required: true,
        description: 'The operation to perform.',
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
        description: 'The calendar to fetch events from.',
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
        description: 'The lower bound of the time range to get events for.',
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
        description: 'The upper bound of the time range to get events for.',
    }
];