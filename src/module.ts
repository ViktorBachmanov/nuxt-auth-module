import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent,
  addComponentsDir,
  addImportsDir,
  installModule,
} from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "my-module",
    configKey: "myModule",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // addPlugin(resolver.resolve("./runtime/plugin.client"));

    // From the runtime directory
    // addComponent({
    //   name: "AuthDialog", // name of the component to be used in vue templates
    //   // export: "AuthDialog", // (optional) if the component is a named (rather than default) export
    //   filePath: resolver.resolve("runtime/components/AuthDialog.vue"),
    // });
    addComponentsDir({
      path: resolver.resolve("runtime/components"),
    });

    // From a library
    addComponent({
      name: "VBCheckbox", // name of the component to be used in vue templates
      export: "VBCheckbox", // (optional) if the component is a named (rather than default) export
      filePath: "vue-lib-vb-1",
    });

    // await installModule("@pinia/nuxt");

    // addImportsDir(resolver.resolve("runtime/composables"));
    addImportsDir(resolver.resolve("runtime/stores"));
  },
});
