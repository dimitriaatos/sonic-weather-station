const apiKeys = { general: '049E0513', wind: '043E0295' }

const getUrl = (key) =>
	'https://www.symmetron.gr/captum/xml_results.php?search_str=' +
	['babzel', 'auth2018', key, 1111].join('|')

const URLs = {
	general: getUrl(apiKeys.general),
	wind: getUrl(apiKeys.wind),
}

export { URLs }
