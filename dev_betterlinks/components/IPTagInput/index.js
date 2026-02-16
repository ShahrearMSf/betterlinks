import React, { useState, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import { useToast } from '../Toast';

const IPTagInput = ({ name, value = [], setFieldValue, disabled = false }) => {
	const [inputValue, setInputValue] = useState('');
	const inputRef = useRef(null);
	const { error: showErrorToast } = useToast();

	// Parse the initial value to ensure it's an array
	const getIpList = () => {
		if (Array.isArray(value)) {
			return value;
		}
		if (typeof value === 'string' && value.trim()) {
			return value.split(',').map(ip => ip.trim()).filter(ip => ip);
		}
		return [];
	};

	const ipList = getIpList();

	// Validate IP address (supports IPv4 and IPv6)
	const isValidIP = (ip) => {
		// IPv4 pattern
		const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
		// IPv6 pattern (simplified)
		const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,7}:$|^([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}$|^([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}$|^([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}$|^([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}$|^[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})$|^:((:[0-9a-fA-F]{1,4}){1,7}|:)$|^::$/;

		if (ipv4Pattern.test(ip)) {
			// Additional validation for IPv4 - check each octet is 0-255
			const octets = ip.split('.');
			return octets.every(octet => {
				const num = parseInt(octet, 10);
				return num >= 0 && num <= 255;
			});
		}

		return ipv6Pattern.test(ip);
	};

	// Add IP to the list
	const addIP = (ip) => {
		const trimmedIP = ip.trim();
		if (!trimmedIP) return;

		// Check if IP is valid
		if (!isValidIP(trimmedIP)) {
			showErrorToast(__('Invalid IP address: ', 'betterlinks') + trimmedIP, {
				title: __('Validation Error', 'betterlinks'),
				position: 'top-right',
				duration: 4000,
			});
			return;
		}

		// Check if IP already exists
		if (ipList.includes(trimmedIP)) {
			showErrorToast(__('IP address already exists: ', 'betterlinks') + trimmedIP, {
				title: __('Duplicate Entry', 'betterlinks'),
				position: 'top-right',
				duration: 4000,
			});
			return;
		}

		const newList = [...ipList, trimmedIP];
		setFieldValue(name, newList);
		setInputValue('');
	};

	// Process multiple IPs from a string
	const processMultipleIPs = (text) => {
		const ips = text.split(/[,\s\n]+/).map(ip => ip.trim()).filter(ip => ip);
		
		if (ips.length === 0) return;

		const invalidIps = [];
		const newIps = [...ipList];

		ips.forEach(ip => {
			if (!isValidIP(ip)) {
				invalidIps.push(ip);
			} else if (!newIps.includes(ip)) {
				newIps.push(ip);
			}
		});

		if (invalidIps.length > 0) {
			showErrorToast(__('Invalid IP address(es): ', 'betterlinks') + invalidIps.join(', '), {
				title: __('Validation Error', 'betterlinks'),
				position: 'top-right',
				duration: 5000,
			});
		}

		setFieldValue(name, newIps);
		setInputValue('');
	};

	// Remove IP from the list
	const removeIP = (ipToRemove) => {
		const newList = ipList.filter(ip => ip !== ipToRemove);
		setFieldValue(name, newList);
	};

	// Handle input change - check for separators
	const handleChange = (e) => {
		const newValue = e.target.value;
		
		// Check if the last character is a separator (comma or space)
		const lastChar = newValue.slice(-1);
		if (lastChar === ',' || lastChar === ' ') {
			const ipToAdd = newValue.slice(0, -1).trim();
			if (ipToAdd) {
				addIP(ipToAdd);
			}
			return;
		}
		
		setInputValue(newValue);
	};

	// Handle key press - Enter key
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (inputValue.trim()) {
				addIP(inputValue.trim());
			}
		} else if (e.key === 'Backspace' && !inputValue && ipList.length > 0) {
			// Remove last IP when backspace is pressed on empty input
			removeIP(ipList[ipList.length - 1]);
		}
	};

	// Handle paste - process multiple IPs
	const handlePaste = (e) => {
		e.preventDefault();
		const pastedText = e.clipboardData.getData('text');
		processMultipleIPs(pastedText);
	};

	// Focus input when clicking on the container
	const handleContainerClick = () => {
		if (inputRef.current && !disabled) {
			inputRef.current.focus();
		}
	};

	return (
		<div className={`btl-ip-tag-input-wrapper${disabled ? ' btl-ip-tag-input-disabled' : ''}`}>
			<div className={`btl-ip-tag-input-container${disabled ? ' disabled' : ''}`} onClick={handleContainerClick}>
				<div className="btl-ip-tags-list">
					{ipList.map((ip, index) => (
						<span key={index} className="btl-ip-tag">
							<span className="btl-ip-tag-text">{ip}</span>
							{!disabled && (
								<button
									type="button"
									className="btl-ip-tag-remove"
									onClick={(e) => {
										e.stopPropagation();
										removeIP(ip);
									}}
									title={__('Remove IP', 'betterlinks')}
								>
									<span className="dashicons dashicons-no-alt"></span>
								</button>
							)}
						</span>
					))}
					<input
						ref={inputRef}
						type="text"
						className="btl-ip-tag-input"
						value={inputValue}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						onPaste={handlePaste}
						placeholder={ipList.length === 0 ? __('Enter IP addresses (comma, space, or Enter to add)...', 'betterlinks') : ''}
						disabled={disabled}
					/>
				</div>
			</div>

			<div className="btl-ip-tag-hint">
				{__('Separate multiple IPs with comma, space, or press Enter. You can also paste multiple IPs.', 'betterlinks')}
			</div>
		</div>
	);
};

export default IPTagInput;
