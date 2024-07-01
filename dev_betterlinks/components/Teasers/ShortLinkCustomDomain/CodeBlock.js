import { copyToClipboard } from 'utils/helper';
import { useState } from 'react';
import { ReactComponent as CopyIcon } from '../../../../assets/images/copy-icon-1.svg';

const CodeBlock = ({ enableCopy = true, code, copyCode }) => {
	const [copyStatus, setCopyStatus] = useState(false);
	return (
		<div className="btl-code-block" style={{ position: 'relative' }}>
			{enableCopy && (
				<span
					className="copy-btn"
					onClick={() => {
						copyToClipboard(copyCode || code);
						setCopyStatus(true);
						let timer = setTimeout(() => {
							setCopyStatus(false);
							clearTimeout(timer);
						}, 1000);
					}}
				>
					{copyStatus ? <span className="dashicons dashicons-yes" style={{ marginRight: '2px' }} /> : <CopyIcon />}
				</span>
			)}
			<code dangerouslySetInnerHTML={{ __html: code }} />
		</div>
	);
};

export default CodeBlock;
