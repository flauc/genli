let index = `<html>
    <head>
        <base href="/">
        <title>Geny App</title>
    </head>
    <body>
        <app>Loading...</app>
        <script src="node_modules/es6-shim/es6-shim.min.js"></script>
        <script src="node_modules/systemjs/dist/system-polyfills.js"></script>
        <script src="node_modules/angular2/bundles/angular2-polyfills.js"></script>
        <script src="node_modules/systemjs/dist/system.src.js"></script>
        <script src="node_modules/rxjs/bundles/Rx.js"></script>
        <script src="node_modules/angular2/bundles/angular2.dev.js"></script>
        <script>
            System.config({
                packages: {
                    app: {
                        format: 'register',
                        defaultExtension: 'js'
                    }
                }
            });
            System.import('app/boot')
                    .then(null, console.error.bind(console));
        </script>
    </body>
</html>`;

let boot = `import {bootstrap} from 'angular2/platform/browser'
import {AppComponent} from "./app.component";

bootstrap(AppComponent, []);`;

let app = `import {Component} from 'angular2/core';

@Component({
    selector: 'geny-app',
    template: '<p>We work</p>'
})
export class AppComponent {
    constructor() {}
}`;

module.exports = {
    index: index,
    app: app,
    boot: boot
};