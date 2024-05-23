import React from 'react';
import { createRoot } from 'react-dom/client';
const { plugin_root_url } = window.betterLinksFlbIntegration;

document.addEventListener('DOMContentLoaded', function () {
	// Callback function to execute when mutations are observed
	function handleMutations(mutationsList, observer) {
		let count = 0;
		return (() => {
			for (const mutation of mutationsList) {
				// console.info(count);
				if (mutation.type === 'childList' || mutation.type === 'subtree') {
					const element = document.querySelector('.fbs-task-sidebar-action-btns');
					if (element && count === 0) {
						count += 1;
						// count++;
						// Element found, run your code
						// console.log('.fbs-task-sidebar-action-btns element is now present 1');
						if (!document.getElementById('btl-intflboards-btn-wrapper')) {
							const btlDiv = document.createElement('div');
							btlDiv.id = 'btl-intflboards-btn-wrapper';
							element.append(btlDiv);

							const root = createRoot(document.getElementById('btl-intflboards-btn-wrapper'));
							root.render(<App />);
						}

						// Your custom code here
						// ...

						// Once the element is found, disconnect the observer
						// observer.disconnect();
						// break;
					}
				}
			}
		})();
	}

	const observer = new MutationObserver(handleMutations);
	observer.observe(document.body, { childList: true, subtree: true });
});

const App = () => {
	console.info(plugin_root_url);
	return (
		<>
			<button className="el-button">
				<i className="el-icon">
					<img width="16" src={plugin_root_url + 'assets/images/logo-large.svg'} />
				</i>
				<span>Create BetterLinks</span>
			</button>
		</>
	);
};
