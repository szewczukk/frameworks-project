import { DetailedHTMLProps, TextareaHTMLAttributes, forwardRef } from 'react';

type Props = {
	label: string;
	error?: string;
} & DetailedHTMLProps<
	TextareaHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
>;

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
	({ label, placeholder, error, ...rest }, ref) => {
		return (
			<>
				<label htmlFor={label}>
					{label}
					{rest.required && <span className="text-red-600">*</span>}
				</label>
				<textarea
					id={label}
					className={`h-48 resize-none rounded border bg-transparent px-4 py-2 transition-colors focus:border-neutral-500 focus:outline-none ${
						error && 'border-red-500 bg-red-50 focus:border-red-500'
					}`}
					placeholder={placeholder || label}
					{...rest}
					ref={ref}
				/>
			</>
		);
	},
);

export default TextArea;
