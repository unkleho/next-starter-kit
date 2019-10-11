// Ensure that TS is aware of .scss imports for CSS Modules
declare module '*.scss' {
	const content: { [className: string]: string };
	export default content;
}
