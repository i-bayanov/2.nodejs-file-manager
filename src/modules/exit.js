export function exit(userName, exitCode = 0) {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(exitCode);
}
