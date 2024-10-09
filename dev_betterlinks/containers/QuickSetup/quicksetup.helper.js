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

export const migratePluginsData = async () => {
    // function 
};
