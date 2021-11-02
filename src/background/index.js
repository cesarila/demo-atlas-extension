// If your extension doesn't need a background script, just leave this file empty

messageInBackground()

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export function messageInBackground() {
  console.log('I can run your javascript like any other code in your project')
  console.log('just do not forget, I cannot render anything !')
}
chrome.downloads.onDeterminingFilename.addListener(function (item, __suggest) {
  function suggest(filename, conflictAction) {
    __suggest({
      filename: filename,
      conflictAction: conflictAction,
      conflict_action: conflictAction,
    })
  }
  let demoRegex = /^([A-Za-z0-9]+_\d+_)(\d+)\.dem$/
  if (demoRegex.test(item.filename)) {
    let matchInfo = item.filename.match(demoRegex)
    fetch(`http://localhost:5000/${matchInfo[2]}`)
      .then((response) => response.json())
      .then((data) => {
        suggest(`${matchInfo[1]}${data.displayName}.dem`)
      })
  }
  return true
})
