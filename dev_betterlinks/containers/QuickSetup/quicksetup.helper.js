import axios from 'axios';
import { betterlinks_nonce } from 'utils/helper';

export const GETTING_STARTED = 'getting_started';
export const CONFIGURATION = 'configuration';
export const MIGRATION = 'migration';
export const CREATE_LINK = 'create_link';
export const FINISH = 'finish';

export const getStepCount = (active) => {
	const indexes = {
		[GETTING_STARTED]: 0,
		[CONFIGURATION]: 1,
		[CREATE_LINK]: 2,
		[MIGRATION]: 3,
		[FINISH]: 4,
	};
	return indexes[active];
};

export const migratePluginsData = async (plugins, setMigrationStatus) => {
	// function
	Object.entries(plugins).forEach((plugin) => {
		const [key, value] = plugin;
		if (value) {
			onSubmitHandler(key, setMigrationStatus);
		}
	});
};

const onSubmitHandler = (mode, setMigrationStatus) => {
	let form_data = new FormData();
	if (mode === 'prettylinks') {
		form_data.append('action', 'betterlinks/admin/run_prettylinks_migration');
	} else if (mode === 'simple301redirects') {
		form_data.append('action', 'betterlinks/admin/run_simple301redirects_migration');
	} else if (mode === 'thirstyaffiliates') {
		form_data.append('action', 'betterlinks/admin/run_thirstyaffiliates_migration');
	}
	form_data.append('security', betterlinks_nonce);
	form_data.append('type', 'links');
	setMigrationStatus((prev) => ({
		...prev,
		[mode]: 'in-progress',
	}));
	axios.post(ajaxurl, form_data).then(
		(response) => {
			if (response.data) {
				// btl_prettylinks_migration_running_in_background - pretty links

				console.info(response.data.data);
				setMigrationStatus((prev) => ({
					...prev,
					[mode]: 'complete',
				}));
				return response.data;
				// setMigrateRes(response.data.data);
			}
			setMigrationStatus((prev) => ({
				...prev,
				[mode]: 'failed',
			}));
		},
		(error) => {
			console.log(error);
		}
	);
};
