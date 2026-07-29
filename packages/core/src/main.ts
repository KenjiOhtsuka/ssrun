#!/usr/bin/env node

// Main entry point for the application
// Import necessary modules
import path from "node:path"
import { pathToFileURL } from "node:url";

import { ConfigLoader } from "./core/ConfigLoader.js";
import { RequestExecutor } from "./core/RequestExecutor.js";
import { ScenarioExecutor } from "./core/ScenarioExecutor.js";
import { SuiteExecutor } from "./core/SuiteExecutor.js";
import type { RequestResult } from "./core/Result.js";

// Argument parsing
const envIndex = process.argv.indexOf("--env");
const env: string = envIndex !== -1 && process.argv.length > envIndex + 1
    ? (process.argv[envIndex + 1] ?? "dev")
    : "dev";

// Determine project root directory
const projectIndex: number = process.argv.indexOf("--project");
const projectRoot: string = projectIndex !== -1 && process.argv.length > projectIndex + 1
    ? (process.argv[projectIndex + 1] ?? "")
    : process.cwd()
const projectRootURL = pathToFileURL(projectRoot + path.sep).href;

// Load configuration
const configLoader = new ConfigLoader();
const globalContext = await configLoader.load(projectRoot, env);

/*
Expected Usage:
  (1) npx tsx src/main.ts --project <projectRoot> --env <environment> \
        --run scenario:<scenarioName>
        --run suite:<suiteName>

      Users can specify multiple --run flags to execute multiple scenarios, or suites in sequence.

  (2) npx tsx src/main.ts --project <projectRoot> --env <environment> \
        --run request:<requestName> \
        --origin <origin> \
        --path <path1> --path <path2> ... \
        --query <query1> --query <query2> ... \
        --header <header1> --header <header2> ... \
        --body <body>

      Users can specify only one --run request:<requestName> flag at a time, and can provide additional parameters for the request.
      --path is for path parameters, --query is for query parameters, --header is for headers, and --body is for the request body.
      --path, --query, --header can be specified multiple times to provide multiple parameters.

  (3) npx tsx src/main.ts --project <projectRoot> --env <environment> \
        --run request:<requestName> --input <inputName>

      Users can speficy only one --run request:<requestName> flag at a time, and can provide an input name to use predefined RequestInput for the request.
 */

const runTargets: string[] = [];
for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === "--run" && i + 1 < process.argv.length) {
        runTargets.push(process.argv[i + 1]!!.toString());
    }
}

if (runTargets.length === 0) {
    throw new Error("No --run targets specified.");
}

const requestExecutor = new RequestExecutor();
const scenarioExecutor = new ScenarioExecutor(requestExecutor);
const suiteExecutor = new SuiteExecutor(scenarioExecutor);

let hasFailures = false;

function reportRequestResult(result: RequestResult): void {
    console.log(`  [${result.success ? "PASS" : "FAIL"}] ${result.status} (${result.duration}ms)${result.error ? " — " + result.error : ""}\n`);
    if (!result.success) hasFailures = true;
}

for (const target of runTargets) {
    const [type, name] = target.split(":");
    switch (type) {
        case "request": {
            const modulePath = new URL(`./request/${name}.ts`, projectRootURL);
            const module = await import(modulePath.href);
            // if input is specified, we need to resolve the input and pass it to the request executor
            if (process.argv.includes("--input")) {
                const inputIndex = process.argv.indexOf("--input");
                if (inputIndex !== -1 && process.argv.length > inputIndex + 1) {
                    const inputName = process.argv[inputIndex + 1]!!.toString();
                    const inputModulePath = new URL(`./request/input/${inputName}.ts`, projectRootURL);
                    const inputModule = await import(inputModulePath.href);
                    const input = inputModule.default ?? Object.values(inputModule)[0];
                    console.log(`[REQUEST] ${name}`);
                    const result = await requestExecutor.execute(module.default ?? Object.values(module)[0], input, globalContext);
                    reportRequestResult(result);
                    break;
                }
             } else {
                // if input is not specified,
                // compose RequestInput from --origin, --path, --query, --header, --body flags
                const originIndex = process.argv.indexOf("--origin");
                const origin = originIndex !== -1 && process.argv.length > originIndex + 1
                    ? process.argv[originIndex + 1]!!.toString()
                    : "";
                const pathParams: Record<string, string | number | boolean | null> = {};
                const queryParams: Record<string, string | number | boolean | null> = {};
                const headers: Record<string, string | number | boolean | null> = {};
                let body: unknown = undefined;
                const pathFlag = "--path";
                const queryFlag = "--query";
                const headerFlag = "--header";
                const bodyFlag = "--body";

                for (let i = 0; i < process.argv.length; i++) {
                    if (process.argv[i] === pathFlag && i + 1 < process.argv.length) {
                        const [key, value] = process.argv[i + 1]!!.toString().split("=");
                        if (key && value !== undefined) {
                            pathParams[key] = value;
                        }
                    } else if (process.argv[i] === queryFlag && i + 1 < process.argv.length) {
                        const [key, value] = process.argv[i + 1]!!.toString().split("=");
                        if (key && value !== undefined) {
                            queryParams[key] = value;
                        }
                    } else if (process.argv[i] === headerFlag && i + 1 < process.argv.length) {
                        const [key, value] = process.argv[i + 1]!!.toString().split("=");
                        if (key && value !== undefined) {
                            headers[key] = value;
                        }
                    } else if (process.argv[i] === bodyFlag && i + 1 < process.argv.length) {
                        body = JSON.parse(process.argv[i + 1]!!.toString());
                    }
                }

                const requestInput = {
                    path: pathParams,
                    query: queryParams,
                    headers: headers,
                    body: body
                };

                console.log(`[REQUEST] ${name}`);
                const result = await requestExecutor.execute(module.default ?? Object.values(module)[0], requestInput, globalContext);
                reportRequestResult(result);
                break;
            }
        }
        case "scenario": {
            const scenarioModulePath = new URL(`./scenario/${name}.ts`, projectRootURL);
            const scenarioModule = await import(scenarioModulePath.href);
            const scenario = scenarioModule.default ?? Object.values(scenarioModule)[0];
            console.log(`[SCENARIO] ${name}`);
            const scenarioResult = await scenarioExecutor.execute(scenario, globalContext);
            if (!scenarioResult.success) hasFailures = true;
            break;
        }
        case "suite": {
            const suiteModulePath = new URL(`./suite/${name}.ts`, projectRootURL);
            const suiteModule = await import(suiteModulePath.href);
            const suite = suiteModule.default ?? Object.values(suiteModule)[0];
            const suiteResult = await suiteExecutor.execute(suite, globalContext);
            if (!suiteResult.success) hasFailures = true;
            break;
        }
        default:
            throw new Error(`Unknown run target type: ${type}`);
    }
}

if (hasFailures) {
    process.exit(1);
}
