import fg from "fast-glob";
import { join, extname } from "node:path";
import sharp from "sharp";
import { writeFile, readFile } from 'node:fs/promises';
import { minify } from 'html-minifier-terser';
import { optimize } from 'svgo';
import logUpdate from 'log-update';

export default () => {
	return {
		name: "fast-compress",
		hooks: {
			"astro:build:done": async ({dir}: any) => {
				const dirPath = dir.pathname;
				const files = await fg(join(dirPath, "**/*.(webp|gif|jpg|jpeg|png|html|svg)"));
				let processing = 0;
				let writing = 0;
				let total = 0;


				function logMessage(){
					const processingProgress = 1 - (processing/total);
					const writingProgress = 1 - (writing/total);
					const processingBar = `[${'='.repeat(Math.round(processingProgress * 20))}${' '.repeat(20 - Math.round(processingProgress * 20))}]`;
					const writingBar = `[${'='.repeat(Math.round(writingProgress * 20))}${' '.repeat(20 - Math.round(writingProgress * 20))}]`;

					logUpdate(
`
Processing ${processingBar} ${Math.floor(processingProgress * 100)}% (${total - processing}/${total})
Writing    ${writingBar} ${Math.floor(writingProgress * 100)}% (${total - writing}/${total})
`
					);
				}

				const promises = files.map(async (file) => {
					if(extname(file) === ".webp"){
						const data = await sharp(file, {animated: true})
							.webp({
								effort: 6
							})
							.toBuffer();

						processing--;
						logMessage();
						// console.log(`Processed: ${file}`);
						await writeFile(file, data);
						// console.log(`Written: ${file}`);
						writing--;
						logMessage();

					} else if(extname(file) === ".gif") {
						const data = await sharp(file, {animated: true})
							.gif({
								effort: 10
							})
							.toBuffer();

						processing--;
						logMessage();
						// console.log(`Processed: ${file}`);
						await writeFile(file, data);
						// console.log(`Written: ${file}`);
						writing--;
						logMessage();

					} else if(extname(file) === ".jpg" || extname(file) === ".jpeg") {
						const data = await sharp(file)
							.jpeg({
							})
							.toBuffer();

						processing--;
						logMessage();
						// console.log(`Processed: ${file}`);
						await writeFile(file, data);
						// console.log(`Written: ${file}`);
						writing--;
						logMessage();

					} else if(extname(file) === ".png") {
						const data = await sharp(file)
							.png({
								compressionLevel: 9,
								effort: 10
							})
							.toBuffer();

						processing--;
						logMessage();
						// console.log(`Processed: ${file}`);
						await writeFile(file, data);
						// console.log(`Written: ${file}`);
						writing--;
						logMessage();

					} else if(extname(file) === ".html") {
						const text = await readFile(file, {encoding: "utf8"});

						try{
							const data = await minify(text, {
								caseSensitive: true,
								collapseInlineTagWhitespace: false,
								collapseWhitespace: true,
								continueOnParseError: true,
								html5: true,
								ignoreCustomComments: [
									/^\s*#/,
									/.*\$.*/,
									/^\s*\[/,
									/^\s*\]/,
									/^\s*!/,
									/^\s*\//,
									/^\s*astro:.*/,
									/^\s*astro:end/,
								],
								ignoreCustomFragments: [],
								includeAutoGeneratedTags: true,
								keepClosingSlash: true,
								minifyCSS: true,
								minifyJS: true,
								minifyURLs: false,
								noNewlinesBeforeTagClose: true,
								preventAttributesEscaping: false,
								processConditionalComments: false,
								processScripts: [
									"application/ecmascript",
									"application/javascript",
									"application/json",
									"application/ld+json",
									"application/manifest+json",
									"application/schema+json",
									"application/vnd.geo+json",
									"application/x-web-app-manifest+json",
									"application/xhtml+xml",
									"application/xml",
									"image/svg+xml",
									"template-worker",
									"template",
									"text/css",
									"text/ecmascript",
									"text/html",
									"text/javascript",
									"text/markdown",
									"text/ng-template",
									"text/plain",
									"text/template",
									"text/x-dust",
									"text/x-dustjs",
									"text/x-eco-template",
									"text/x-eco",
									"text/x-handlebars-template",
									"text/x-handlebars",
									"text/x-jade-template",
									"text/x-jade",
									"text/x-less",
									"text/x-lodash-template",
									"text/x-lodash",
									"text/x-markdown",
									"text/x-mustache-template",
									"text/x-mustache",
									"text/x-pug-template",
									"text/x-pug",
									"text/x-sass",
									"text/x-scss",
									"text/x-stylus",
									"text/x-template",
									"text/x-underscore-template",
									"text/x-underscore",
									"text/x-yaml",
									"text/xml",
								],
								quoteCharacter: '"',
								removeAttributeQuotes: true,
								removeComments: true,
								removeScriptTypeAttributes: true,
								removeStyleLinkTypeAttributes: true,
								removeTagWhitespace: false,
								sortAttributes: true,
								sortClassName: true,
								trimCustomFragments: true,
								useShortDoctype: false,
							});

							processing--;
							logMessage();
							// console.log(`Processed: ${file}`);
							await writeFile(file, data);
							// console.log(`Written: ${file}`);
							writing--;
							logMessage();

						}catch(err){
							console.warn(err);
						}

					} else if(extname(file) === ".svg") {
						const text = await readFile(file, {encoding: "utf8"});

						const {data} = optimize(text, {
							path: file,
							multipass: true,
							js2svg: {
								indent: 0,
								pretty: false,
							},
							plugins: ["preset-default"],
						})
						processing--;
						logMessage();

						// console.log(`Processed: ${file}`);
						await writeFile(file, data);
						// console.log(`Written: ${file}`);

						writing--;
						logMessage();
					}
				});

				processing = promises.length;
				writing = promises.length;
				total = promises.length;

				logMessage();

				await Promise.all(promises);
			}
		}
	}
}