import osInfo from 'os';

export function os(arg) {
  switch (arg) {
    case '--EOL':
      console.log(JSON.stringify(osInfo.EOL));
      break;
    case '--cpus':
      const cpus = osInfo.cpus();
      console.log('Number of cpus:', cpus.length);
      console.table(
        Object.fromEntries(
          cpus.map((cpu, index) => [
            `CPU ${index + 1}`,
            {
              Model: cpu.model,
              Speed: `${cpu.speed / 1000} GHz`,
            },
          ])
        )
      );
      break;
    case '--homedir':
      console.log(osInfo.homedir());
      break;
    case '--username':
      console.log(osInfo.userInfo().username);
      break;
    case '--architecture':
      console.log(osInfo.arch());
      break;
    default:
      throw new Error('Invalid input');
  }
}
