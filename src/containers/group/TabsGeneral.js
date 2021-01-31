import React from 'react';
import { __ } from '@wordpress/i18n';
import { Formik, Field, Form } from 'formik';
import Select from './../../components/Select';
import { redirectType } from './../../utils/data';
const TabsGeneral = () => {
	return (
		<React.Fragment>
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					email: '',
				}}
				onSubmit={async (values) => {
					await new Promise((r) => setTimeout(r, 500));
					alert(JSON.stringify(values, null, 2));
				}}
			>
				{(props) => (
					<Form>
						<div className="btl-tab-panel-inner">
							<span className="btl-form-group">
								<label className="btl-form-label">Fast Redirect Status</label>
								<button className="button button-primary">Active</button>
							</span>
							<span className="btl-form-group">
								<label className="btl-form-label">Analytic Cache Clear</label>
								<button className="button button-primary">Clear Cache</button>
							</span>
							<span className="btl-form-group">
								<label className="btl-form-label">{__('Redirect Type', 'betterlinks')}</label>
								<Select id="redirect_type" name="redirect_type" value={redirectType} setFieldValue={props.setFieldValue} isMulti={false} />
							</span>
							<span className="btl-form-group">
								<label className="btl-form-label">{__('Link Options', 'betterlinks')}</label>
								<div className="link-options__body">
									<label className="btl-checkbox-field">
										<Field className="btl-check" name="nofollow" type="checkbox" onChange={() => props.setFieldValue('nofollow', !props.values.nofollow)} />
										<span className="text">
											{__('No Follow', 'betterlinks')}
											<div className="btl-tooltip">
												<span className="dashicons dashicons-info-outline"></span>
												<span className="btl-tooltiptext">{__('This will add nofollow attribute to your link. (Recommended)', 'betterlinks')}</span>
											</div>
										</span>
									</label>
									<label className="btl-checkbox-field">
										<Field className="btl-check" name="sponsored" type="checkbox" onChange={() => props.setFieldValue('sponsored', !props.values.sponsored)} />
										<span className="text">
											{__('Sponsored', 'betterlinks')}
											<div className="btl-tooltip">
												<span className="dashicons dashicons-info-outline"></span>
												<span className="btl-tooltiptext">{__('This will add sponsored attribute to your link. (Recommended for Affiliate links)', 'betterlinks')}</span>
											</div>
										</span>
									</label>
									<label className="btl-checkbox-field">
										<Field className="btl-check" name="param_forwarding" type="checkbox" onChange={() => props.setFieldValue('param_forwarding', !props.values.param_forwarding)} />
										<span className="text">
											{__('Parameter Forwarding', 'betterlinks')}
											<div className="btl-tooltip">
												<span className="dashicons dashicons-info-outline"></span>
												<span className="btl-tooltiptext">{__('This will pass the parameters you have set in the target URL', 'betterlinks')}</span>
											</div>
										</span>
									</label>
									<label className="btl-checkbox-field">
										<Field className="btl-check" name="track_me" type="checkbox" onChange={() => props.setFieldValue('track_me', !props.values.track_me)} />
										<span className="text">
											{__('Tracking', 'betterlinks')}
											<div className="btl-tooltip">
												<span className="dashicons dashicons-info-outline"></span>
												<span className="btl-tooltiptext">{__('This will let you check Analytics report of your links', 'betterlinks')}</span>
											</div>
										</span>
									</label>
								</div>
							</span>
							<button className="button-primary" type="submit">
								Save
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</React.Fragment>
	);
};
export default TabsGeneral;
