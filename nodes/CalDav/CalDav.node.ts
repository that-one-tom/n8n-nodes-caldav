/* eslint-disable n8n-nodes-base/node-class-description-credentials-name-unsuffixed */

import {
	IExecuteFunctions,
} from 'n8n-core';

import {
    ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
    operationFields,
} from './OperationDescription';

import {
    getCalendars,
    getEvents,
} from './GenericFunctions';

export class CalDav implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'CalDAV',
        name: 'calDav',
        icon: 'file:calDav.svg',
        group: ['output'],
        version: 1,
        subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
        description: 'Connect n8n to a CalDAV server',
        defaults: {
            name: 'CalDAV',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'calDavBasicAuth',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                options: [
                    {
                        name: 'Calendar',
                        value: 'calendar',
                    },
                    {
                        name: 'Event',
                        value: 'event',
                    }
                ],
                default: 'calendar',
                noDataExpression: true,
                required: true,
            },
            ...operationFields,
        ]
    };

    methods = {
		loadOptions: {
			async getCalendars(
				this: ILoadOptionsFunctions,
			): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const calendars = await getCalendars.call(this);
                
                for (const calendar of calendars) {
                    returnData.push({
                        name: calendar.displayName as string,
                        value: calendar.displayName as string,
                    });
                }
				return returnData;
			},
		},
	};

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        // const items = this.getInputData();
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;
        const results = [];

        if (resource === 'calendar' && operation === 'getMany') {
            const calendars = await getCalendars.call(this);
            for (const calendar of calendars) {
                results.push({
                    json: calendar as any,
                });
            }
        } else if (resource === 'event' && operation === 'getMany') {
            const events = await getEvents.call(
                this,
                this.getNodeParameter('calendar', 0) as string,
                this.getNodeParameter('start', 0) as string,
                this.getNodeParameter('end', 0) as string
            );
            for (const event of events) {
                results.push({
                    json: event as any,
                });
            }
        }

        return this.prepareOutputData(results);        
    }
}
