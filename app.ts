import * as core from '@actions/core'
import { exec } from '@actions/exec'
import * as fs from 'node:fs/promises'
import path from 'node:path'

async function run() {
	try {
		const release = await getMeteorVersion()
		const installUrl = `https://install.meteor.com/?release=${release}`
		await exec(`curl "${installUrl}" | sh`)
	} catch (err) {
		if (err instanceof Error) {
			core.setFailed(err.message)
			return
		}

		core.setFailed(`Something unexpected went wrong: ${err}`)
	}
}

void run()

async function getMeteorVersion() {
	const versionInput = core.getInput('meteor-version')
	const versionFileInput = core.getInput('meteor-version-file')

	if (!versionFileInput && !versionInput) {
		throw new Error(
			'Received no meteor-version or meteor-version-file input, specifying a version is required'
		)
	}

	if (versionFileInput && versionInput) {
		core.warning(
			'Both meteor-version and meteor-version-file inputs are specified, only meteor-version will be used'
		)
	}

	if (versionInput) {
		return versionInput
	}

	const versionFilePath = path.join(
		process.env.GITHUB_WORKSPACE!,
		versionFileInput
	)

	try {
		await fs.access(versionFilePath, fs.constants.F_OK)
	} catch (_) {
		throw new Error(
			`The specified meteor-version-file is not readable or does not exist at "${versionFilePath}"`
		)
	}

	const fileContents = await fs.readFile(versionFilePath, 'utf-8')
	const [, version] = fileContents.split('@')
	if (!version) {
		throw new Error(
			`The meteor-version-file does not contain a valid version, received: ${version}`
		)
	}

	return version
}
