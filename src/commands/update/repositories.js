'use strict'

const fs = require('fs')
const path = require('path')

const { execPromise } = require('../../helpers')

const updateRepositories = async () => {
  try {
    const folders = await fs.promises.readdir(process.cwd())
    const basePath = process.cwd()

    const updates = folders
      .filter(folder => fs.existsSync(path.join(basePath, folder, '.git')))
      .map(
        folder => execPromise('git pull', {
          cwd: path.join(basePath, folder)
        }).catch(console.error)
      )

    await Promise.all(updates)
  } catch (error) {
    console.error(error)
  }
}

module.exports = updateRepositories
