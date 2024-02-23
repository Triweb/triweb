# triweb

The official **triweb.js** library and developer documentation for the [triweb platform](https://triweb.com).

It may be used by Triweb App (TWA) developers to enhance the functionality of their apps :muscle:                            

## Status

Triweb has just launched and the `triweb.js` library is in early beta phase.

The described API works, and you can use it in your TWAs, but it should be considered unstable - 
we are likely to introduce breaking changes (and awesome new features) in the near future, 
so stay tuned for the updates and the first stable release! 

## Version

The current version is **0.0.1**

## Usage

In production-ready TWAs you can use the triweb.js library that is offered by the target domain's relay server:

```
<script src="/.../triweb.js"></script>
```

During development you may use your local copy of the `triweb.js` library or the one from `triweb.io` relay server:

```
<script src="https://triweb.io/.../triweb.js"></script>
```

## API Reference

### Triweb.Container

In triweb, domain names are treated like containers that may be filled with a user-selected Triweb Application (TWA).
The `Triweb.Container` is a namespace under which various container management operations are available. 

**Synopsis:**

```javascript
// Runtime envrionment
await Triweb.Container.init()
Triweb.Container.args // Array of container runtime arguments as read from DNS TXT records
                      // {{key: string, value: string, options: Record<string, string>}[]}

// Application package management
await Triweb.Container.installApp('banner/themes/default'); // true
await Triweb.Container.installApp('banner/themes/html5up/dimension'); // true
await Triweb.Container.listApps(); // {...: {…}, banner-themes-default: {…}, banner: {…}, banner-themes-html5up-dimension: {…}} 
await Triweb.Container.uninstallApp('banner/themes/default'); // true

```

#### async Triweb.Container.init()

Initializes the container by populating the `args` property.
This method should be called at the start of the interaction with the `Triweb.Container` interface.

<details>

```javascript
/**
 * Initializes the `Triweb.Container` for the current domain. This method sets up
 * the necessary environment, dependencies, or state required for the container to
 * function correctly. It should be called before using any functionalities offered
 * by the `Triweb.Container`.
 * 
 * @async
 * @returns {Promise<void>} A promise that resolves when the container has been
 * successfully initialized. If the initialization fails, the promise will be
 * rejected with an error detailing the failure.
 * 
 * @example
 * // Initialize the Triweb.Container before usage
 * await Triweb.Container.init().then(() => {
 *   console.log('Container initialized successfully.');
 * }).catch((error) => {
 *   console.error('Container initialization failed:', error);
 * });
 */
async Triweb.Container.init()

```

</details>

#### Triweb.Container.args

Holds an array of runtime arguments for the Container as read from DNS TXT records.
This includes the record with `app` key that has been used to setup the current TWA for the domain.
The array is populated by `Triweb.Container.init()` and can be reloaded 
with `Triweb.Container.reloadArgs()`.

<details>

```javascript
/**
 * Holds an array of runtime arguments for the `Triweb.Container` that have been extracted
 * from DNS TXT records associated with the domain name prefixed by "_triweb.". These
 * arguments provide configuration or operational parameters for the container,
 * derived from the DNS TXT records of the form "keyword1 keyword1-value option1=val1 option2=val2".
 *
 * Each entry in the array represents a single TXT record, parsed into an object with
 * a `key`, a `value`, and an `options` object. The `options` object maps option
 * names to their respective values.
 *
 * @type {{key: string, value: string, options: Record<string, string>}[]}
 *
 * @example
 * // Example of accessing the Triweb.Container.args
 * const args = Triweb.Container.args;
 *
 * args.forEach(arg => {
 *   console.log(`Key: ${arg.key}, Value: ${arg.value}`);
 *   Object.entries(arg.options).forEach(([key, value]) => {
 *     console.log(`Option: ${key}, Value: ${value}`);
 *   });
 * });
 *
 * @note The `args` variable is populated at the initialization phase of the Container.
 * Ensure `Triweb.Container.init()` has been successfully called before accessing it.
 */
Triweb.Container.args
```

</details>

#### async Triweb.Container.reloadArgs()

Reloads the runtime arguments stored in `Triweb.Container.args` by re-fetching the DNS TXT records.

<details>

```javascript
/**
 * Reloads the runtime arguments stored in `Triweb.Container.args` by re-fetching
 * the DNS TXT records for the domain name prefixed with "_triweb.". This operation
 * updates the container's runtime arguments to reflect any changes in the DNS TXT
 * records, accommodating new configurations or options added since the initial load
 * or the last reload. It's particularly useful when runtime configurations might
 * change frequently or when fresh values are necessary without restarting the container
 * or the application.
 * 
 * This method performs DNS-over-HTTPS (DoH) resolution using the resolver specified
 * in `Triweb.Container.resolver`. It ensures that `Triweb.Container.args` contains
 * the most up-to-date information fetched from the DNS TXT records.
 * 
 * @async
 * @returns {Promise<{key: string, value: string, options: Record<string, string>}[]>} 
 *            A promise that resolves with the reloaded arguments array when the args have 
 *            been successfully reloaded. The promise may be rejected with an error 
 *            detailing the failure, especially in cases of failed `fetch()` calls due to 
 *            issues with DoH resolution or connectivity problems with the 
 *            `Triweb.Container.resolver` used for DNS resolution.
 * 
 * @throws {Error} Throws an exception if the DNS TXT record fetch fails, which can occur 
 *                 due to network issues, incorrect DNS setup, 
 *                 or problems with the DoH resolver.
 * 
 * @example
 * // Reload the Triweb.Container.args and handle the updated arguments or errors
 * Triweb.Container.reloadArgs().then((updatedArgs) => {
 *   console.log('Arguments reloaded successfully:', updatedArgs);
 * }).catch((error) => {
 *   console.error('Failed to reload arguments:', error);
 * });
 */
async Triweb.Container.reloadArgs()
```

</details>

#### async Triweb.Container.installApp(manifestUrl, opts={})

Installs the specified TWA to the local Triweb.Container.
When a TWA is installed, its assets specified in the `manifest.json` file are copied to the container in the user's web browser, 
and the browser serves them directly from the container, without a need to communicate with any web servers.
When multiple TWAs have conflicting asset paths (e.g., two TWAs include `/index.html` as asset file), 
the browser will serve the asset from the TWA with lower priority first. 

<details>

```javascript
/**
 * Installs a TWA from a given manifest URL with its dependencies to the Triweb.Container.
 * 
 * This method supports optional configuration options that can be passed to customize the 
 * installation process, including flags to control update behavior and force installation.
 *
 * @param {string} manifestUrl - The URL of the TWA manifest file. This URL should point to
 *                               a JSON file that contains metadata about the application 
 *                               to be installed, or to an entry in the TWApps catalog.
 *                               For more details see https://triweb.com/concepts/triweb-app
 *                               
 * @param {Object} [opts={}] - Optional parameters to customize the installation process.
 * 
 *   @param {boolean} [opts.update=false] - If set to true, the method will attempt to update the application
 *                                          if it is already installed.
 *                                          
 *   @param {boolean} [opts.force=false] - If set to true, the installation will proceed even if the application
 *                                         with the same ID is already installed in the container, overwriting it.
 *                                         You can use it to force reinstallation, or to overwrite an existing TWA
 *                                         with a conflicting app ID.
 *                                         
 *   @param {boolean} [opts.priority=null] - A numeric priority of this TWA. When there are conflicting asset files,
 *                                           upon request, the browser will serve the asset from the TWA with a lower 
 *                                           priority first. When left as null, the app will be installed after all
 *                                           previously installed TWAs.
 *
 * @returns {Triweb.Container.Jobs.AppInstall} An `AppInstallJob` thenable object that provides methods and properties 
 *                                             to monitor the installation progress and status. This object resolves to
 *                                             the installed app ID upon successful installation or update, or
 *                                             to false when update was requested but the app is at the latest version.
 *                                             
 *                          
 * @throws {Triweb.Container.Jobs.AppInstall.Error} Various error codes may be thrown during the installation process:
 *   - `manifestUrlInvalid`: The URL of the manifest file is not valid.
 *   - `manifestDownloadError`: The application manifest file could not be downloaded.
 *   - `manifestParsingError`: The application manifest file is not a valid JSON document.
 *   - `manifestValidationError`: The application manifest file structure is not valid.
 *   - `assetDownloadError`: An application asset could not be downloaded.
 *   - `alreadyInstalled`: An application is already installed in the container.
 *   - `circularDependency`: A circular dependency was detected during installation.
 *   - `missingDependency`: A required dependency's manifest could not be fetched.
 *   - `invalidDependency`: A dependency's application ID does not match the declared ID.
 *
 *
 * @example
 *   // Install an app with default options
 *   await Triweb.Container.installApp('https://example.com/manifest.json');
 *
 * @example 
 *   // Install an app from TWApps catalog with the option to update if already installed
 *   let job = Triweb.Container.installApp('banner/themes/default', { update: true });
 *   job.on('progressChange', console.log);
 *   job.on('stateChange', console.log);
 *   await job;
 *
 */
async Triweb.Container.installApp(manifestUrl, opts={})
```

</details>

#### async Triweb.Container.listApps()

Lists the TWAs that have been installed into the Container. The results are returned as a dictionary object, 
with app IDs as keys and app details as values. App details object may be used to access TWA assets, manifest,
and additional meta information. 

<details>

```javascript
/**
 * Lists the TWAs that are present in the Container into a dictionary object.
 *
 * @returns {Promise<Record<string, {
 *             id: string,                          // The app's unique identifier as defined in its manifest file.
 *             assets: Triweb.Container.AppAssets,  // App asset files.
 *             manifest: Object,                    // Application manifest data.
 *             manifestUrl: string,                 // The URL from which the manifest file was originally downloaded.
 *             version: string,                     // The installed version of the application.
 *           }>>} A promise that resolves with a dictionary object.
 *                The keys of the dictionary are app IDs, and the values are objects
 *                containing details about each app.
 *
 * @example
 *   const apps = await Triweb.Container.listApps();
 *   console.log(apps);
 */
async Triweb.Container.listApps()
```

</details>

#### async Triweb.Container.uninstallApp(appId, opts={})

Uninstalls the TWA with a given id from the Container.

<details>

```javascript
/**
 * Uninstalls a TWA from the container. This operation removes all the TWA's assets from the container,
 * effectively deleting the application from the user's browser. If the application is not installed,
 * this method will silently fail without any errors. This ensures idempotency of the uninstall operation.
 * 
 * @param {string} appId - The unique identifier of the TWA to be uninstalled. This ID should match
 *                         the app's ID as defined in its manifest file and as used in the container's
 *                         application list.
 *
 * @param {Object} [opts={}] - Optional parameters to customize the uninstallation process. Includes:
 * 
 *   @param {boolean} [opts.recursive=false] - If set to true, uninstall the app and its dependencies.
 *   @param {boolean} [opts.prune=false]     - If set to true, uninstall any apps that depend on this app.
 *   @param {boolean} [opts.force=false]     - If set to true, force uninstallation, ignoring dependency checks.
 * 
 * @returns {Triweb.Container.Jobs.AppUninstall} An `AppUninstall` thenable object that provides methods and properties 
 *                                               to monitor the installation progress and status. 
 *                                               This object resolves to `true` if the application was successfully uninstalled, 
 *                                               or `false` if the application was not found in the container.
 * 
 * @throws {Triweb.Container.Jobs.AppUninstall.Error} Various error codes may be thrown during the uninstallation process:
 *   - `dependencyConflict`: The provided app ID is required as a dependency by another installed app. 
 *                           You can use `prune` or `force` flags to overcome this. 
 * 
 * @example
 *   // Uninstall an app by its ID
 *   let success = await Triweb.Container.uninstallApp('triweb-banner', {force:true});
 *   if (success) {
 *     console.log('Application successfully uninstalled.');
 *   } else {
 *     console.log('Application not found.');
 *   }
 */
async Triweb.Container.uninstallApp(appId)
```

</details>