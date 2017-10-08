function getResolvedPromise(data) {
	return new Promise(()=> data)
}

function immutable(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export {
	getResolvedPromise,
	immutable
}

