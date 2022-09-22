import { DefinePlugin } from 'webpack';

function includes(map: string[], key: string) {
	return map.some(
		(match) => key.substring(0, match.length).toLowerCase() === match.toLowerCase()
	);
}

function generateEnvMap(envs: Record<string, string | string[]>, includeMap: string[]) {
	return Object.keys(envs).reduce((map, key) => {
		if (includes(includeMap, key)) {
			return {
				...map,
				[`process.env.${key}`]: JSON.stringify(envs[key]),
			};
		}
		return map;
	}, {});
}

class DefineEnvsWebpackPlugin extends DefinePlugin {
	constructor({
		envs = {},
		includeMap = ['APP_'],
	}: {
		envs?: Record<string, string | string[]>;
		includeMap: string[];
	}) {
		super({
			...generateEnvMap(envs, includeMap),
		});
	}
}

// @ts-ignore
export = DefineEnvsWebpackPlugin;
