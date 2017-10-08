function getResolvedPromise(data) {
	return new Promise((resolve, reject) => resolve(data))
}

function immutable(obj) {
	return JSON.parse(JSON.stringify(obj))
}

export {
	getResolvedPromise,
	immutable
}

