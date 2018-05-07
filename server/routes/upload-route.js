import fs from 'fs';
const os = require('os');
const path = require('path');

export default async function(ctx, next) {
    const file = ctx.request.body.files.file;
    console.log(ctx.request.body);
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
    reader.pipe(stream);

    console.log('uploading %s -> %s', file.name, stream.path);

    ctx.status = 200;
}
