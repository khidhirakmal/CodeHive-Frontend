// Notes on jsconfig.json //

.JSON does not support comments. Running it with comments will cause an error.

{
"compilerOptions": {
"baseUrl": "src"
},
"include": ["src"]
}

- "compilerOptions": // instructs the TypeScript compiler how to compile files

- "baseUrl": "src" // specify base directory to the "src" folder

- "include": ["src"] // includes all files in the "src" directory and subdirectories
