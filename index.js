#!/usr/bin/env node

const pdfreader = require('pdfreader')
const diff = require('deep-object-diff').diff
const args = require('yargs').argv

const file1Path = process.argv[2]
const file2Path = process.argv[3]
const file1Obj = {}
const file2Obj = {}
let key = null
let counter = null
let col = 4
if (args.col) {
  col = args.col - 1
}

async function parseFile (path, object) {
  return new Promise((resolve, reject) => {
    new pdfreader.PdfReader().parseFileItems(path, function (err, item) {
      if (err) reject()
      else if (!item) resolve()
      else if (item.text) {
        const trimmedText = item.text.trim()
        if (counter === null) {
          if (/^D\d+$/.test(trimmedText)) {
            key = trimmedText
            counter = 0
          }
        } else {
          if (counter === col) {
            if (key) {
              object[key] = trimmedText
            }
            key = null
            counter = null
          } else {
            counter++
          }
        }
      }
    })
  })
}

async function run () {
  await parseFile(file1Path, file1Obj)
  await parseFile(file2Path, file2Obj)
  const diffs = diff(file1Obj, file2Obj)
  for (const key in diffs) {
    console.log(`${key}:`)
    console.log(`File 1: ${file1Obj[key]}`)
    console.log(`File 2: ${file2Obj[key]}`)
    console.log('')
  }
}

run()
