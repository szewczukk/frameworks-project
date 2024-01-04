import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';

type Props = {
	label: string;
	error?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, Props>(
	({ label, placeholder, error, ...rest }, ref) => {
		return (
			<>
				<label htmlFor={label}>
					{label}
					{rest.required && <span className="text-red-600">*</span>}
				</label>
				<input
					id={label}
					className={`rounded border bg-transparent px-4 py-2 transition-colors focus:border-neutral-500 focus:outline-none ${
						error && 'border-red-500 bg-red-50 focus:border-red-500'
					}`}
					placeholder={placeholder || label}
					{...rest}
					ref={ref}
				/>

				<p className="min-h-[20px] text-sm text-red-500">{error || ' '}</p>
			</>
		);
	},
);

export default InputField;
