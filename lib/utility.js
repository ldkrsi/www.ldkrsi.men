import { Readable } from 'stream';

export default {
	myStream: (gen) => {
		return () => {
			const stream = new Readable({ objectMode: true });
			stream._read = () => { };

			const p = gen();
			p.then(promises => promises.forEach(f => stream.push(f))).finally(() => stream.push(null));

			return stream;
		};
	}
};