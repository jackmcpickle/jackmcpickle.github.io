import { defineConfig } from 'oxfmt';

export default defineConfig({
    "semi": true,
    "singleQuote": true,
    "printWidth": 80,
    "jsxSingleQuote": false,
    "bracketSameLine": false,
    "arrowParens": "always",
    "proseWrap": "preserve",
    "singleAttributePerLine": true,
    "htmlWhitespaceSensitivity": "css",
    "useTabs": false,
    "endOfLine": "lf",
    "trailingComma": "all",
    "tabWidth": 4,
    "insertFinalNewline": true,
    "sortTailwindcss": {
        "stylesheet": "./src/styles/global.css",
        "functions": ["cn", "clsx", "cva", "cx"],
        "attributes": ["class", "classList", "className"]
    },
    "sortImports": {
        "groups": [
            ["builtin"],
            ["external", "type-external"],
            ["internal", "type-internal"],
            ["parent", "type-parent"],
            ["sibling", "type-sibling"],
            ["index", "type-index"]
        ],
        "newlinesBetween": false,
    },
    "overrides": [
        {
            "files": ["*.yml", "*.yaml"],
            "options": {
                "tabWidth": 2,
                "singleQuote": false
            }
        },
        {
            "files": ["*.astro"],
            "options": {
                "singleQuote": false
            }
        }
    ],
    "sortPackageJson": true,
    "ignorePatterns": [
        "dist/**",
        ".venv/**",
        ".ruff_cache/**",
        ".uv-cache/**",
        "node_modules/**",
        "src/ui-service-desk/src/routeTree.gen.ts"
    ]
});
