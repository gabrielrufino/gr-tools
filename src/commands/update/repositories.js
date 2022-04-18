'use strict'

const fs = require('fs')
const path = require('path')

const { execPromise } = require('../../helpers')

const updateRepositories = async ({ logs }) => {
  try {
    const folders = await fs.promises.readdir(process.cwd())
    const basePath = process.cwd()

    const promises = folders.map(async folder => {
      const isRepository = fs.existsSync(path.join(basePath, folder, '.git'))

      if (isRepository) {
        console.log(folder)
        await execPromise('git pull', {
          cwd: path.join(basePath, folder)
        })
          .catch(console.error)
      }
    })

    await Promise.all(promises)
  } catch (error) {
    console.error(error)
  }
}

module.exports = updateRepositories
