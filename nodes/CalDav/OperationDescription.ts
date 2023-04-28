import {
	INodeProperties
} from 'n8n-workflow';

export const operationFields: INodeProperties[] = [
    // ----------------------------------
	//         getMany: calendar
	// ----------------------------------
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
            show: {
                resource: [
                    'calendar',
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
    }
];