import { MutableRefObject, useEffect, useState } from 'react';

interface IntersectionOption {
	threshold?: number;
}

const useIntersection = (
	ref: MutableRefObject<HTMLElement | null>,
	option: IntersectionOption = {
		threshold: 0,
	},
): boolean => {
	const [visible, setVisible] = useState<boolean>(false);

	useEffect(() => {
		if (ref.current) {
			const { threshold = 0 } = option;
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						const {
							isIntersecting,
							boundingClientRect: { y },
						} = entry;
						const responseToTop = y >= 0;
						const AlreadyRendered = y <= 0;
						if (responseToTop) {
							setVisible(isIntersecting);
						} else if (AlreadyRendered) {
							setVisible(true);
							observer.disconnect();
						}
					});
				},
				{ threshold },
			);
			observer.observe(ref.current);
			return () => {
				observer.disconnect();
			};
		}
		return () => undefined;
	}, [option, ref]);
	return visible;
};

export default useIntersection;
