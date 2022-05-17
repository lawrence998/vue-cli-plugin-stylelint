const generateWithPlugin = require('@vue/cli-test-utils/generateWithPlugin');

test('default', async () => {
  const { pkg } = await generateWithPlugin({
    id: '@lawrence_ch/vue-cli-plugin-stylelint',
    apply: require('../generator'),
    options: {}
  });

  expect(pkg.scripts['lint:style']).toBeTruthy();
  expect(pkg.devDependencies).toHaveProperty('stylelint-config-standard');
});

test('standard', async () => {
  const { pkg } = await generateWithPlugin({
    id: '@lawrence_ch/vue-cli-plugin-stylelint',
    apply: require('../generator'),
    options: {
      config: 'stylelint-config-standard'
    }
  });

  expect(pkg.scripts['lint:style']).toBeTruthy();
  expect(pkg.devDependencies).toHaveProperty('stylelint-config-standard');
});

test('primer', async () => {
  const { pkg } = await generateWithPlugin({
    id: '@lawrence_ch/vue-cli-plugin-stylelint',
    apply: require('../generator'),
    options: {
      config: 'stylelint-config-primer'
    }
  });

  expect(pkg.scripts['lint:style']).toBeTruthy();
  expect(pkg.devDependencies).toHaveProperty('stylelint-config-primer');
});

test('lawrence_ch', async () => {
  const { pkg } = await generateWithPlugin({
    id: '@lawrence_ch/vue-cli-plugin-stylelint',
    apply: require('../generator'),
    options: {
      config: '@lawrence_ch/stylelint-config-win'
    }
  });

  expect(pkg.scripts['lint:style']).toBeTruthy();
  expect(pkg.devDependencies).toHaveProperty('@lawrence_ch/stylelint-config-win');
});

test('custom preset', async () => {
  const { pkg } = await generateWithPlugin({
    id: '@lawrence_ch/vue-cli-plugin-stylelint',
    apply: require('../generator'),
    options: {
      config: {
        extends: 'stylelint-config-standard',
        rules: {
          indentation: 2
        }
      }
    }
  });

  expect(pkg.stylelint).toEqual({
    root: true,
    extends: 'stylelint-config-standard',
    rules: {
      indentation: 2
    }
  });
  expect(pkg.devDependencies).not.toHaveProperty('stylelint-config-standard');
});

test('lint on save', async () => {
  const { pkg } = await generateWithPlugin({
    id: '@lawrence_ch/vue-cli-plugin-stylelint',
    apply: require('../generator'),
    options: {
      lintStyleOn: 'build'
    }
  });
  expect(pkg.vue.pluginOptions.lintStyleOnBuild).toEqual(true);
});

test('lint on commit', async () => {
  const { pkg } = await generateWithPlugin({
    id: '@lawrence_ch/vue-cli-plugin-stylelint',
    apply: require('../generator'),
    options: {
      lintStyleOn: 'commit'
    }
  });
  expect(pkg.gitHooks['pre-commit']).toBe('lint-staged');
  expect(pkg.devDependencies).toHaveProperty('lint-staged');
  expect(pkg['lint-staged']).toEqual({
    '*.{vue,htm,html,css,sss,less,scss}': ['vue-cli-service lint:style', 'git add']
  });
  expect(pkg.vue.pluginOptions.lintStyleOnBuild).toEqual(false);
});

test('cancel', async () => {
  const { pkg } = await generateWithPlugin({
    id: '@lawrence_ch/vue-cli-plugin-stylelint',
    apply: require('../generator'),
    options: {
      overwriteConfig: 'abort'
    }
  });

  expect(pkg).toEqual({
    scripts: undefined,
    devDependencies: undefined,
    vue: undefined
  });
});
