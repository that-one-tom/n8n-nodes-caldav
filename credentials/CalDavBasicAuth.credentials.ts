import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CalDavBasicAuth implements ICredentialType {
	name = 'calDavBasicAuth';
	displayName = 'CalDAV Basic Auth';
	properties: INodeProperties[] = [
		{
			displayName: 'Server URL',
			name: 'serverUrl',
			type: 'string',
			default: 'https://posteo.de:8443/calendars/max.muster/default',
		},
        {
            displayName: 'Username',
            name: 'username',
            type: 'string',
            default: 'max.muster@posteo.de',
        },
        {
            displayName: 'Password',
            name: 'password',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
        },
	];
}
