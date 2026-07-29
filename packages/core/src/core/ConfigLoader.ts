// ConfigLoader.ts

import path from "node:path";
import { pathToFileURL } from "node:url";
import { existsSync } from "node:fs";

import { config as loadDotEnv } from "dotenv";

import { Context } from "./Context.js";

export class ConfigLoader {

    async load(
        projectRoot: string,
        env: string
    ): Promise<Context> {

        const context = new Context();

        //
        // config/default.ts
        //
        const defaultConfigFilePath = path.join(
            projectRoot,
            "config",
            "default.ts"
        );
        const defaultConfigPath = pathToFileURL(defaultConfigFilePath).href;
        
        if (existsSync(defaultConfigFilePath)) {
            const defaultModule =
                await import(defaultConfigPath);

            for (const [key, value]
                of Object.entries(defaultModule.default ?? {})) {

                context.set(key, value);
            }
        }

        //
        // config/dev.ts
        //
        const envConfigFilePath = path.join(
            projectRoot,
            "config",
            `${env}.ts`
        );
        const envConfigPath = pathToFileURL(envConfigFilePath).href;

        if (existsSync(envConfigFilePath)) {
            const envModule =
                await import(envConfigPath);

            for (const [key, value]
                of Object.entries(envModule.default ?? {})) {

                context.set(key, value);
            }
        }

        //
        // .env
        //

        const defaultEnvPath =
            path.join(
                projectRoot,
                ".env"
            );

        if (existsSync(defaultEnvPath)) {
            loadDotEnv({
                path: defaultEnvPath
            });
        }

        //
        // .dev.env
        //

        const envFilePath =
            path.join(
                projectRoot,
                `.${env}.env`
            );

        if (existsSync(envFilePath)) {
            loadDotEnv({
                path: envFilePath,
                override: true
            });
        }

        //
        // process.env -> Context
        //

        for (const [key, value]
            of Object.entries(process.env)) {

            if (value !== undefined) {
                context.set(key, value);
            }
        }

        return context;
    }

}
