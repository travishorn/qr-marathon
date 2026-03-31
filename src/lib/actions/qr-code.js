import QRCodeStyling from 'qr-code-styling';

/**
 * @param {HTMLElement} node
 * @param {{ onInstance?: (instance: import('qr-code-styling').default) => void, [key: string]: any }} options
 */
export function qrCode(node, options) {
	const { onInstance, ...qrOpts } = options;
	const instance = new QRCodeStyling(qrOpts);

	onInstance?.(instance);

	node.replaceChildren();
	instance.append(node);

	return {
		/**
		 * @param {{ onInstance?: (instance: import('qr-code-styling').default) => void, [key: string]: any }} nextOptions
		 */
		update(nextOptions) {
			// eslint-disable-next-line no-unused-vars
			const { onInstance: _, ...nextQrOpts } = nextOptions;
			instance.update(nextQrOpts);
		},
		destroy() {
			node.replaceChildren();
		}
	};
}
