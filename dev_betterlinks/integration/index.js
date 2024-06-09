import { createRoot } from 'react-dom/client';
import App from './fluent-boards';
import { fbs_settings } from './utils/helper';

document.addEventListener('DOMContentLoaded', function () {
	// Callback function to execute when mutations are observed
	function handleMutations(mutationsList, observer) {
		let isFound = false;
		return (() => {
			for (const mutation of mutationsList) {
				if (mutation.type === 'childList' || mutation.type === 'subtree') {
					const element = document.querySelector('.fbs-task-sidebar-action-btns');
					if (element && !isFound && !document.getElementById('btl-intflboards-btn-wrapper')) {
						isFound = true;
						const btlDiv = document.createElement('div');
						btlDiv.id = 'btl-intflboards-btn-wrapper';
						element.append(btlDiv);

						const root = createRoot(document.getElementById('btl-intflboards-btn-wrapper'));
						root.render(<App />);
					}
				}
			}
		})();
	}
	if (fbs_settings?.enable_fbs) {
		const observer = new MutationObserver(handleMutations);
		observer.observe(document.body, { childList: true, subtree: true });
	}
});
