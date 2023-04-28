import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
    DAVClient
} from 'tsdav';

import {
    operationFields
} from './OperationDescription';

export class CalDav implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'CalDAV',
        name: 'calDav',
        icon: 'file:calDav.svg',
        group: ['output'],
        version: 1,
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
                    }
                ],
                default: 'calendar',
                noDataExpression: true,
                required: true,
                description: 'The resource to operate on.',
            },
            ...operationFields,
        ]
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        // const items = this.getInputData();
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;
        const credentials = await this.getCredentials('calDavBasicAuth');
        const results = [];

        if (resource === 'calendar' && operation === 'getMany') {
            const client = new DAVClient({
                serverUrl: credentials.serverUrl as string,
                credentials: {
                  username: credentials.username as string,
                  password: credentials.password as string,
                },
                authMethod: 'Basic',
                defaultAccountType: 'caldav',
            });
    
            try {
                await client.login();
                const calendars = await client.fetchCalendars();
                for (const calendar of calendars) {
                    results.push({
                        json: calendar as any,
                    })
                }
            } catch (error) {
                throw new Error(error);
            }
        }

        return this.prepareOutputData(results);        
    }
}
