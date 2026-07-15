// Roda no GitHub Actions, uma vez por dia. Le scheduled-posts.json, e para
// cada artigo cuja publishDate ja chegou, faz merge da branch draft/... em
// main e da push (o push dispara o deploy automatico no Vercel).
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const SCHEDULE_FILE = 'scheduled-posts.json';

function run(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });
}

function todayInSaoPaulo() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
}

const schedule = JSON.parse(readFileSync(SCHEDULE_FILE, 'utf8'));
const today = todayInSaoPaulo();

const published = [];
const conflicts = [];

for (const post of schedule.posts) {
  if (post.status !== 'pending') continue;
  if (post.publishDate > today) continue;

  console.log(`Publicando "${post.slug}" (agendado para ${post.publishDate})...`);
  try {
    run(`git fetch origin ${post.branch}`);
    run(`git merge --no-ff origin/${post.branch} -m "chore: publica ${post.slug} (agendado para ${post.publishDate})"`);
    post.status = 'published';
    post.publishedAt = today;
    published.push(post);
  } catch (err) {
    console.error(`Conflito ao publicar "${post.slug}": ${err.message}`);
    try { run('git merge --abort'); } catch {}
    conflicts.push(post);
  }
}

if (published.length > 0) {
  writeFileSync(SCHEDULE_FILE, JSON.stringify(schedule, null, 2) + '\n');
  run(`git add ${SCHEDULE_FILE}`);
  run(`git commit -m "chore: atualiza agendamento (${published.map(p => p.slug).join(', ')})"`);
  run('git push origin main');

  for (const post of published) {
    try { run(`git push origin --delete ${post.branch}`); } catch {}
  }
}

console.log(`published=${published.length}`);
console.log(`conflicts=${JSON.stringify(conflicts.map(p => p.slug))}`);

const summaryLines = [];
if (published.length) summaryLines.push(`Publicados: ${published.map(p => p.slug).join(', ')}`);
if (conflicts.length) summaryLines.push(`CONFLITOS (precisam de ajuste manual): ${conflicts.map(p => p.slug).join(', ')}`);
if (summaryLines.length && process.env.GITHUB_STEP_SUMMARY) {
  writeFileSync(process.env.GITHUB_STEP_SUMMARY, summaryLines.join('\n') + '\n', { flag: 'a' });
}
if (process.env.GITHUB_OUTPUT) {
  writeFileSync(process.env.GITHUB_OUTPUT, `has_conflicts=${conflicts.length > 0}\nconflict_list=${conflicts.map(p => p.slug).join(', ')}\n`, { flag: 'a' });
}
