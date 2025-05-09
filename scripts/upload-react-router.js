import fs from 'fs';
import { execSync } from 'child_process';
import readline from 'readline';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const prefixes = ['react-router', '@react-router/'];
const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

const targetPackages = Object.keys(allDeps).filter(
  (name) => prefixes.some((prefix) => name === prefix || name.startsWith(prefix))
);

if (targetPackages.length === 0) {
  console.log('❌ No react-router related dependencies found');
  process.exit(0);
}

console.log('📦 Checking for updates in the following packages:');
targetPackages.forEach(name => console.log(`- ${name}`));

const upgrades = [];

for (const name of targetPackages) {
  const currentVersion = allDeps[name].replace(/^[^0-9]*/, '');
  let latestVersion;
  try {
    latestVersion = execSync(`pnpm view ${name} version`).toString().trim();
  } catch (e) {
    console.warn(`❌ Failed to get latest version for ${name}`);
    continue;
  }

  if (currentVersion !== latestVersion) {
    upgrades.push({ name, currentVersion, latestVersion });
  }
}

console.log();

if (upgrades.length === 0) {
  console.log('✅ All specified packages are up to date');
  process.exit(0);
}

console.log('🔄 The following packages can be upgraded:');
upgrades.forEach(({ name, currentVersion, latestVersion }) => {
  console.log(`- ${name}: ${currentVersion} → ${latestVersion}`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\n⚠️ Do you want to proceed with upgrading these dependencies? (y/n) ', (answer) => {
  if (answer.toLowerCase() === 'y') {
    const names = upgrades.map(pkg => pkg.name).join(' ');
    console.log('\n🚀 Executing: pnpm up', names);
    try {
      execSync(`pnpm up ${names}`, { stdio: 'inherit' });
      console.log('\n✅ Upgrade completed');
    } catch (e) {
      console.error('❌ Upgrade failed:', e.message);
    }
  } else {
    console.log('❌ Upgrade cancelled');
  }
  rl.close();
});
