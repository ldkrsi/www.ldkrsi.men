const { Readable } = require('stream');

module.exports = {
	myStream: (generator) => {
		return () => {
			let stream = new Readable({ objectMode: true });
			let gen = generator();
			stream._read = () => {
				let { value } = gen.next();
				if (!value) {
					stream.push(null);
					return;
				}
	
				value.then(f => stream.push(f));
			};
	
			return stream;
		};
	}
};