# triweb

The official **triweb.js** library and its documentation - a part of the [triweb platform](https://triweb.com).

It may be used by Triweb App (TWA) developers to enhance the functionality of their apps :muscle:                            

## Status

Triweb has just launched, and the `triweb.js` library is in early beta phase.

It works, and you can use it in your TWAs, but it should be considered unstable - 
we are likely to introduce breaking changes (and awesome new features) in the near future, 
so stay tuned for the updates and the first stable release! 

## Version

The current version is **0.0.1**

## Usage

In production-ready TWAs you should use the triweb.js library that is offered by the target domain's relay server:

```
<script src="/.../triweb.js"></script>
```

During development you may use your local copy of the `triweb.js` library or the one from `triweb.io` relay server:

```
<script src="https://triweb.io/.../triweb.js"></script>
```

## Public API Reference

### Triweb.Container

In triweb, domain names are treated like containers that may be filled with a user-selected Triweb Application (TWA).
The `Triweb.Container` is a namespace under which various container management operations are available. 

**Synopsis:**

```javascript
// Application package management
await Triweb.Container.installApp('banner/themes/default'); // true
await Triweb.Container.installApp('banner/themes/html5up/dimension'); // true
await Triweb.Container.listApps(); // {...: {…}, banner-themes-default: {…}, banner: {…}, banner-themes-html5up-dimension: {…}} 
await Triweb.Container.uninstallApp('banner/themes/default'); // true

```
   
#### async Triweb.Container.installApp(manifestUrl, opts={})

Installs the specified TWA to the container.
When a TWA is installed, its assets specified in the `manifest.json` file are copied to the container in the user's web browser, 
and the browser serves them directly from the container, without a need to communicate with any web servers.
When multiple TWAs have conflicting asset paths (e.g., two TWAs include `/index.html` as asset file), 
the browser will serve the asset from the TWA with lower priority first. 

<details>

```javascript
/**
 * Installs a TWA from a given manifest URL with its dependencies to the local Triweb.Container.
 * 
 * This method supports optional configuration options that can be passed to customize the installation process,
 * including flags to control update behavior and force installation.
 *
 * @param {string} manifestUrl - The URL of the TWA manifest file. This URL should point to a JSON
 *                               file that contains metadata about the application to be installed,
 *                               or to an entry in the TWApps catalog.
 *                               For more details see https://triweb.com/concepts/triweb-app
 *                               
 * @param {Object} [opts={}] - Optional parameters to customize the installation process. Includes:
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