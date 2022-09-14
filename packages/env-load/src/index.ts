import chalk from 'chalk';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

function resolveEnv(cwd: string, environment?: string) {
	let envPath = path.join(cwd, `${environment}.env`);

	if (!fs.existsSync(envPath)) {
		envPath = path.join(cwd, '../', `${environment}.env`);

		if (!fs.existsSync(envPath)) {
			return undefined;
		}
	}

	return envPath;
}

function envLoad() {
	const environment = process.env.NODE_ENV || 'development';

	const execPath = fs.realpathSync(process.cwd());

	const path = resolveEnv(execPath, environment);

	const conf = config({ path });

	if (conf.error) {
		console.log(chalk.red('Could not resolve env file from project.'));
		process.exit(1);
	}

	return conf.parsed;
}

export default envLoad;
