import * as esbuild from "esbuild-wasm";
import { useEffect } from "react";
import { fetchPlugin } from "../plugins/fetch-plugin";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";

let Service = false
const bundler = async (rawCode: string) => {

    if (!Service) {

        await esbuild.initialize({
            worker: true,
            wasmURL: '/esbuild.wasm'
        })
        Service = true;
    }

    const result = await esbuild.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
        define: {
            'process.node.NODE_ENV': "production",
            global: "window"
        }
    })

    return result.outputFiles[0].text;


}

export default bundler;