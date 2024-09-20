
## Deployment steps 

#### These steps are for intended only for package contributors, not for end users / consumers.

1. Convert tsx to jsx using typescript compiler (check package.json)
2. Copy css to typescript build folder
3. Build and bundle the file using rollup
4. Validate if dist folder is generated with declaration files.
5. Do npm publish

## Developer advise

1. Always run npm test before publish, to make sure component does not break.
2. Write clean code with proper declarations.

