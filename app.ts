#!/usr/bin/env node
import init from "./init/init";
import * as shell from "shelljs"
import {createComponent} from "./generators/single/component"
import {createPipe} from "./generators/single/pipe"
import {createDirective} from "./generators/single/directive"
import {createService} from "./generators/single/service"
import {readJson} from "./helpers/helpers";

const args = process.argv.slice(2);

// Handling functions
function handleErr(err) {
    console.error("error: ", err);
    process.exit(0)
}

function handleRes(res) {
    console.log(res);
    process.exit(1)
}

function onCall(args: string[]): void {
    
    if (args[0] === "init") {
        init()
            .catch(err => handleErr(err))
            .then((val) => {
                if (!val) shell.exec("npm install", (data) =>  process.exit(1));
                else process.exit(1)
            });
    }
    
    else {
        
        // Read the json config file
        readJson(true).then(
            res => {
                
                let baseLocation = "",
                    bootLocation = "",
                    componentLocation = "",
                    serviceLocation = "",
                    pipeLocation = "",
                    directiveLocation = "",
                    splicedLength = args[1].split("/").length;
                
                if (res) {

                    baseLocation = res["appFolder"] ? `${res["appFolder"]}/` : baseLocation;
                    bootLocation = res["bootLocation"] ? baseLocation + res["bootLocation"] : baseLocation;

                    // If only the name of the folder is passed add the file in to the folder specified in the config
                    if (splicedLength === 1) {
                        componentLocation = res["defaultFolders"].components ? `${baseLocation + res["defaultFolders"].components}/` : componentLocation;
                        serviceLocation = res["defaultFolders"].services ? `${baseLocation + res["defaultFolders"].services}/` : serviceLocation;
                        directiveLocation = res["defaultFolders"].directives ? `${baseLocation + res["defaultFolders"].directives}/` : directiveLocation;
                        pipeLocation = res["defaultFolders"].pipes ? `${baseLocation + res["defaultFolders"].pipes}/` : pipeLocation;
                    }

                    // If the file has a dept set the base as the starting point
                    else {
                        componentLocation = baseLocation;
                        serviceLocation = baseLocation;
                        directiveLocation = baseLocation;
                        pipeLocation = baseLocation;
                    }

                }
                // Check witch function to call
                switch (args[0]) {
                    // Component generation
                    case "c":
                    case "component":

                        // Check if the user specified that a html template should also be created
                        let createHtmlTemplate = args.indexOf("-t") > -1 || args.indexOf("-template") > -1;

                        createComponent(`${componentLocation + args[1]}`, createHtmlTemplate)
                            .catch(err => handleErr(err))
                            .then(val => handleRes(val));

                        break;

                    // Service generation
                    case "s":
                    case "service":

                        // Check if the user specified that the service should be injected in to boot
                        let bootInject = args.indexOf("-i") > -1 || args.indexOf("-inject") > -1;
                        createService(`${serviceLocation + args[1]}`, bootInject, bootLocation)
                            .catch(err => handleErr(err))
                            .then(val => handleRes(val));

                        break;

                    // Pipe generation
                    case "p":
                    case "pipe":

                        createPipe(`${pipeLocation + args[1]}`)
                            .catch(err => handleErr(err))
                            .then(val => handleRes(val));

                        break;

                    // Directive generation
                    case "d":
                    case "directive":

                        createDirective(`${directiveLocation + args[1]}`)
                            .catch(err => handleErr(err))
                            .then(val => handleRes(val));

                        break;

                    default:
                        console.error("Sorry that command isn't recognised.");
                        break;
                }
            }
        )
    }
}

onCall(args);
