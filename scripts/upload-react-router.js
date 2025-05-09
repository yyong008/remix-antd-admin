import fs from 'fs';
import { execSync } from 'child_process';
import readline from 'readline';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const prefixes = ['react-router', '@react-router/'];
const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

// 找出我们指定的包
const targetPackages = Object.keys(allDeps).filter(
  (name) => prefixes.some((prefix) => name === prefix || name.startsWith(prefix))
);

if (targetPackages.length === 0) {
  console.log('❌ 没有匹配到任何 react-router 相关依赖');
  process.exit(0);
}

console.log('📦 正在检查以下包是否有更新：');
targetPackages.forEach(name => console.log(`- ${name}`));

const upgrades = [];

for (const name of targetPackages) {
  const currentVersion = allDeps[name].replace(/^[^0-9]*/, ''); // 去掉 ^ ~ 等
  let latestVersion;
  try {
    latestVersion = execSync(`pnpm view ${name} version`).toString().trim();
  } catch (e) {
    console.warn(`❌ 获取 ${name} 最新版本失败`);
    continue;
  }

  if (currentVersion !== latestVersion) {
    upgrades.push({ name, currentVersion, latestVersion });
  }
}

console.log(); // 空行

if (upgrades.length === 0) {
  console.log('✅ 所有指定包均为最新版本');
  process.exit(0);
}

console.log('🔄 以下包可以升级：');
upgrades.forEach(({ name, currentVersion, latestVersion }) => {
  console.log(`- ${name}: ${currentVersion} → ${latestVersion}`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\n⚠️ 是否继续升级这些依赖？(y/n) ', (answer) => {
  if (answer.toLowerCase() === 'y') {
    const names = upgrades.map(pkg => pkg.name).join(' ');
    console.log('\n🚀 正在执行：pnpm up', names);
    try {
      execSync(`pnpm up ${names}`, { stdio: 'inherit' });
      console.log('\n✅ 升级完成');
    } catch (e) {
      console.error('❌ 升级失败:', e.message);
    }
  } else {
    console.log('❌ 已取消升级');
  }
  rl.close();
});
