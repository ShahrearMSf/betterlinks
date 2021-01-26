import React from 'react';
import { Formik, Field, Form } from 'formik';
const TabsTools = () => {
	return (
		<React.Fragment>
			<div className="btl-tab-inner-divider">
				<div className="btl-tab-panel-inner">
					<h3>Choose what to export</h3>
					<Formik
						initialValues={{
							content: 'all',
						}}
						onSubmit={(values) => {
							console.log(values);
						}}
					>
						<Form>
							<div role="group" aria-labelledby="my-radio-group">
								<div>
									<label>
										<Field type="radio" name="content" value="all" />
										All content
									</label>
									<span>This will contain all of your links, analytic and settings.</span>
								</div>
								<div>
									<label>
										<Field type="radio" name="content" value="links" />
										Manage Links
									</label>
								</div>
								<div>
									<label>
										<Field type="radio" name="content" value="analytic" />
										Analytic
									</label>
								</div>
								<div>
									<label>
										<Field type="radio" name="content" value="settings" />
										Settings
									</label>
								</div>
							</div>
							<button type="submit">Download Export File</button>
						</Form>
					</Formik>
				</div>
			</div>
		</React.Fragment>
	);
};
export default TabsTools;
