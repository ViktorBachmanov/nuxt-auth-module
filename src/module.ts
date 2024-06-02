import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent,
  addComponentsDir,
  addImports,
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
      name: "CheckboxVB", // name of the component to be used in vue templates
      export: "CheckboxVB", // (optional) if the component is a named (rather than default) export
      filePath: "@vbachm/vue-lib",
    });

    addComponent({
      name: "InputVB", // name of the component to be used in vue templates
      export: "InputVB", // (optional) if the component is a named (rather than default) export
      filePath: "@vbachm/vue-lib",
    });

    // addComponent({
    //   name: "IconTelegram", // name of the component to be used in vue templates
    //   export: "IconTelegram", // (optional) if the component is a named (rather than default) export
    //   filePath: "@vbachm/vue-icons-plasm",
    // });

    // addImportsDir(resolver.resolve("runtime/composables"));

    addImports({
      name: "useAuthDialog", // name of the composable to be used
      as: "useAuthDialog",
      from: resolver.resolve("runtime/composables/useAuthDialog"), // path of composable
    });

    // addImportsDir(resolver.resolve("runtime/utils"));
  },
});
