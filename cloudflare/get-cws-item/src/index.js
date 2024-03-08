// https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/#element-handlers
// https://developers.cloudflare.com/email-routing/email-workers/
// import { EmailMessage } from 'cloudflare:email';
// import { createMimeMessage } from 'mimetext';
// import puppeteer from '@cloudflare/puppeteer';
// import { parse } from 'node-html-parser';

addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
	const url = new URL(request.url);
	const extensionId = url.pathname.slice(1);
	const cwsUrl = extensionId.startsWith('https') ? extensionId : `https://chromewebstore.google.com/detail/${extensionId}`;
	// const statsUrl = `https://chrome-stats.com/d/${extensionId}`;

	const headers = new Headers();
	headers.append(
		'User-Agent',
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
	);

	const requestOptions = {
		method: 'GET',
		headers: headers,
		redirect: 'follow',
	};

	const response = await fetch(cwsUrl, requestOptions);
	const html = await response.text();

	/* 	//const root = parse(html);
	const extensionIdIndex = html.indexOf(`\\u002F${extensionId}",`);
	console.log('Extension ID index:', extensionIdIndex);

	const userCountIndex = html.indexOf('userCount:', extensionIdIndex) + 'userCount:'.length;
	let userCountValue = html.substring(userCountIndex, html.indexOf(',', userCountIndex));
	console.log('User count value:', userCountValue);

	const lastUpdateIndex = html.indexOf('lastUpdate:"', extensionIdIndex) + 'lastUpdate:"'.length;
	let lastUpdateValue = html.substring(lastUpdateIndex, html.indexOf('"', lastUpdateIndex));
	console.log('Last update value:', lastUpdateValue);

	if (extensionIdIndex === -1 || userCountIndex === -1 || lastUpdateIndex === -1) {
		// await sendErrorMail('Error parsing stats page');
		userCountValue = null;
		lastUpdateValue = null;
	} */

	const userCountValue = parseInt(/(\d{1,3}(?:,\d{3})*) users/.exec(html)[1].replaceAll(',', ''));
	const lastUpdateValue = /Updated<\/div><div>(.*?)<\/div>/.exec(html)[1];

	return new Response(
		JSON.stringify({
			weeklyUsers: userCountValue,
			lastUpdated: lastUpdateValue,
		}),
		{
			headers: {
				'content-type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
			},
		}
	);
}

async function sendErrorMail(data) {
	const msg = createMimeMessage();
	msg.setSender({ name: 'BOT', addr: 'bot@k1k1.com' });
	msg.setRecipient('kristijan.ros@gmail.com');
	msg.setSubject('k1k1.dev: AN ERROR OCCURED');
	msg.addMessage({ contentType: 'text/plain', data });

	var message = new EmailMessage('bot@k1k1.com', 'kristijan.ros@gmail.com', msg.asRaw());
	try {
		await env.SEB.send(message);
	} catch (e) {
		console.log('Error sending email:', e);
	}
	console.log('Email sent');
}
