import {
	IExecuteFunctions
} from 'n8n-core';

import {
	ILoadOptionsFunctions
} from 'n8n-workflow';

import {
    DAVCalendar,
    DAVClient,
} from 'tsdav';

import {
    parseICS,
} from 'node-ical';

export async function getCalendars(
    this: ILoadOptionsFunctions | IExecuteFunctions,
    client?: DAVClient,
) {
    const credentials = await this.getCredentials('calDavBasicAuth');
    if (!client) {
        client = new DAVClient({
            serverUrl: credentials.serverUrl as string,
            credentials: {
              username: credentials.username as string,
              password: credentials.password as string,
            },
            authMethod: 'Basic',
            defaultAccountType: 'caldav',
        });
        await client.login();

    } 
    const calendars = await client.fetchCalendars();
    return calendars;
}

export async function getEvents(
    this: IExecuteFunctions,
    calendarName: string,
    start: string,
    end: string,
) {
    const credentials = await this.getCredentials('calDavBasicAuth');
    const client = new DAVClient({
        serverUrl: credentials.serverUrl as string,
        credentials: {
          username: credentials.username as string,
          password: credentials.password as string,
        },
        authMethod: 'Basic',
        defaultAccountType: 'caldav',
    });
    await client.login();
    const calendars = await getCalendars.call(this, client);
    const calendar = calendars.find((calendar) => calendar.displayName === calendarName);
    const events = await client.fetchCalendarObjects({
        calendar: calendar as DAVCalendar,
        timeRange: {
            start: start,
            end: end,
        },
        expand: true
    });
    const eventResults = [];
    for (const event of events) {
        const eventData = parseICS(event.data);
        for (const key in eventData) {
            if (key != 'vcalendar') {
                const data = eventData[key] as any;
                eventResults.push({
                    url: event.url,
                    etag: event.etag,
                    ...data
                });
            }
        }
    }
    return eventResults.sort((a, b) => {
        if (a?.start < b?.start) {
            return -1;
        } else if (a?.start > b?.start) {
            return 1;
        } else {
            return 0;
        }
    });
}
