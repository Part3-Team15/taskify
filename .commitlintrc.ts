module.exports = {
  extends: ['git-commit-emoji'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        '⚙️  chore',
        '💬 comment',
        '🎨 design',
        '📝 docs',
        '✨ feat',
        '🛠  fix',
        '❗️ HOTFIX',
        '♻️  refactor',
        '🗑  remove',
        '🚚 rename',
        '↔️  style',
        '✅ test',
      ],
    ],
    'scope-empty': [2, 'never'],
  },
};
