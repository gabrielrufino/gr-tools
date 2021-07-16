'use strict'

const fs = require('fs')
const path = require('path')
const shell = require('shelljs')

const { execPromise } = require('../../helpers')

const updateRepositories = async ({ logs }) => {
  try {
    const folders = await fs.promises.readdir(process.cwd())

    for (const folder of folders) {
      const isRepository = fs.existsSync(
        path.join(process.cwd(), folder, '.git')
      )

      if (isRepository) {
        console.log(folder)
        shell.cd(folder)
        await execPromise('git pull')
          .catch(() => {})
        shell.cd('..')
      }
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = updateRepositories
