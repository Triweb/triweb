# triweb

The official **triweb.js** library and its documentation - a part of the [triweb platform](https://triweb.com).

It may be used by Triweb App (TWA) developers to enhance the functionality of their apps :muscle:                            

## Status

Triweb has just launched, and the `triweb.js` library is in early beta phase.

It works, and you can use it in your TWAs, but it should be considered unstable - we are likely to introduce breaking changes (and awesome new features) in the near future, so stay tuned for the updates and the first stable release! 

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
   
#### Triweb.Container.installApp(appIdOrManifestUrl)

The installApp method installs the specified TWA to the container.
When a TWA is installed, its assets specified in the `manifest.json` file are copied to the [Cache storage](https://developer.mozilla.org/en-US/docs/Web/API/Cache) in the user's web browser, 
and a [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) is registered that serves them directly from the browser, without a need to communicate with any web servers.

Synopsis:

```javascript

// @param appIdOrManifestUrl (String) - a short TWA identifier for apps in Triweb Apps catalog, 
//                                      or a full URL under which TWA manifest file is available. 
await Triweb.Container.installApp(appIdOrManifestUrl)
```

Example:

```javascript
await Triweb.Container.installApp('https://raw.githubusercontent.com/triweb/triweb-apps-banner/master/manifest.json');
```
