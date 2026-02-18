import React, { useCallback, useState } from 'react';

import s from './AccordionSection.module.css';

interface AccordionSectionProps {
	title: string;
	icon?: string;
	defaultOpen?: boolean;
	badge?: number;
	children: React.ReactNode;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({
	title,
	icon,
	defaultOpen = false,
	badge,
	children
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	const toggle = useCallback(() => {
		setIsOpen(prev => !prev);
	}, []);

	return (
		<div className={s.section}>
			<button
				type="button"
				className={s.header}
				onClick={toggle}
				aria-expanded={isOpen}
			>
				<span className={s.headerLeft}>
					{icon && <span className={s.icon}>{icon}</span>}
					<span className={s.title}>{title}</span>
					{badge !== undefined && badge > 0 && (
						<span className={s.badge}>{badge}</span>
					)}
				</span>
				<span className={isOpen ? s.chevronOpen : s.chevron}>
					&#9660;
				</span>
			</button>
			<div className={isOpen ? s.bodyOpen : s.body}>
				<div className={s.content}>{children}</div>
			</div>
		</div>
	);
};
